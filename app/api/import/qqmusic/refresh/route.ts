import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

/**
 * POST /api/import/qqmusic/refresh
 * body: { playlistId: string }
 * 刷新歌单：获取最新歌曲列表，自动导入数据库中不存在的歌曲
 * 同时从歌单API的 pay 字段获取VIP/免费状态（比 vkey API 更可靠）
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { playlistId } = body

    if (!playlistId) {
      return NextResponse.json(
        { success: false, error: "请提供歌单ID" },
        { status: 400 }
      )
    }

    // 获取歌单最新数据（15秒超时）
    const apiUrl = `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=${encodeURIComponent(playlistId)}`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    let response: Response
    try {
      response = await fetch(apiUrl, {
        headers: {
          Referer: "https://y.qq.com/",
          "User-Agent": USER_AGENT,
        },
        signal: controller.signal,
      })
    } catch (e: any) {
      clearTimeout(timeoutId)
      return NextResponse.json(
        { success: false, error: e?.name === "AbortError" ? "QQ音乐接口超时，请稍后重试" : "QQ音乐接口不可达" },
        { status: 502 }
      )
    }
    clearTimeout(timeoutId)

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "QQ音乐接口返回错误" },
        { status: 502 }
      )
    }

    const text = await response.text()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json(
        { success: false, error: "解析歌单数据失败" },
        { status: 502 }
      )
    }

    const data = JSON.parse(jsonMatch[0])

    if (data.code !== 0 || !data.cdlist?.length) {
      return NextResponse.json(
        { success: false, error: "歌单不存在或为空" },
        { status: 404 }
      )
    }

    const cd = data.cdlist[0]
    const songs = cd.songlist || []

    // 构建 songid → { songmid, canPlayFull } 映射
    // canPlayFull 从歌单API的 pay 字段获取（比 vkey API purl 检测准确得多）
    const songidToInfo = new Map<string, { songmid: string; canPlayFull: boolean | null }>()
    const songIds: string[] = []

    for (const song of songs) {
      const sid = String(song.songid || "")
      const smid = String(song.songmid || "")
      if (!sid || !smid) continue

      songIds.push(sid)

      // 从 pay 字段判断是否需要VIP
      const pay = song.pay
      let canPlayFull: boolean | null = null
      if (pay) {
        // payplay: 1=VIP才能播放, paymonth: 1=付费包
        const needsVip = pay.payplay === 1 || pay.paymonth === 1
        canPlayFull = !needsVip
      }

      songidToInfo.set(sid, { songmid: smid, canPlayFull })
    }

    // 查询数据库中已存在的歌曲
    const existing = await prisma.music.findMany({
      where: { qqMusicId: { in: songIds } },
      select: { qqMusicId: true },
    })
    const existingIds = new Set(existing.map((m) => m.qqMusicId))

    // ====== 分批并行补填已有歌曲的 qqMusicMid 和 canPlayFull ======
    const entries = Array.from(songidToInfo.entries())
    const CHUNK = 20 // 每批20首并行，避免耗尽DB连接池

    let updatedCount = 0
    for (let i = 0; i < entries.length; i += CHUNK) {
      const chunk = entries.slice(i, i + CHUNK)
      const results = await Promise.all(
        chunk.map(([songid, info]) => {
          const updateData: Record<string, unknown> = { qqMusicMid: info.songmid }
          // 只有从 pay 字段获取到明确信息时才更新 canPlayFull
          if (info.canPlayFull !== null) {
            updateData.canPlayFull = info.canPlayFull
          }
          return prisma.music.updateMany({
            where: { qqMusicId: songid },
            data: updateData,
          })
        })
      )
      updatedCount += results.reduce((sum, r) => sum + r.count, 0)
    }

    // ====== 批量导入新歌曲 ======
    const newSongs = songs.filter(
      (s: any) => !existingIds.has(String(s.songid))
    )

    if (newSongs.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          imported: 0,
          updated: updatedCount,
          message: updatedCount > 0
            ? `歌单没有新歌曲，更新了 ${updatedCount} 首已有歌曲的VIP状态`
            : "歌单没有新歌曲",
        },
      })
    }

    const coverBase = "https://y.qq.com/music/photo_new/T002R300x300M000"

    // 使用 createMany 一次性批量导入（比逐个 create 快10倍+）
    const createData = newSongs.map((song: any) => {
      const info = songidToInfo.get(String(song.songid))
      return {
        title: song.songname || "未知歌曲",
        artist: (song.singer || []).map((s: any) => s.name).join(" / "),
        album: song.albumname || null,
        coverUrl: song.albummid ? `${coverBase}${song.albummid}.jpg` : null,
        qqMusicId: String(song.songid),
        qqMusicMid: info?.songmid || String(song.songmid || ""),
        playlistId,
        duration: song.interval || null,
        canPlayFull: info?.canPlayFull ?? null,
      }
    })

    const result = await prisma.music.createMany({ data: createData })

    return NextResponse.json({
      success: true,
      data: {
        imported: result.count,
        updated: updatedCount,
        message: `成功导入 ${result.count} 首新歌，更新 ${updatedCount} 首已有歌曲`,
      },
    })
  } catch (error) {
    console.error("刷新歌单失败:", error)
    return NextResponse.json(
      { success: false, error: "刷新歌单失败" },
      { status: 500 }
    )
  }
}
