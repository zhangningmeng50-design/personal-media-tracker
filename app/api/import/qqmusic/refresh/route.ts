import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

/**
 * POST /api/import/qqmusic/refresh
 * body: { playlistId: string }
 * 刷新歌单：获取最新歌曲列表，自动导入数据库中不存在的歌曲
 * pay/VIP 检测由浏览器端完成（Vercel IP 拿不到完整 pay 数据）
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

    // 构建 songid → songmid 映射
    const songidToMid = new Map<string, string>()
    const songIds: string[] = []

    // 统计 pay 字段（诊断用，Vercel IP 可能拿不到）
    let payAvailable = false
    let payVipCount = 0

    for (const song of songs) {
      const sid = String(song.songid || "")
      const smid = String(song.songmid || "")
      if (!sid || !smid) continue

      songIds.push(sid)
      songidToMid.set(sid, smid)

      // 检测 pay 字段是否可用
      if (song.pay && (song.pay.payplay === 1 || song.pay.payplay === 0)) {
        payAvailable = true
        if (song.pay.payplay === 1) payVipCount++
      }
    }

    // 查询数据库中已存在的歌曲
    const existing = await prisma.music.findMany({
      where: { qqMusicId: { in: songIds } },
      select: { qqMusicId: true },
    })
    const existingIds = new Set(existing.map((m) => m.qqMusicId))

    // ====== 分批并行补填已有歌曲的 qqMusicMid ======
    const entries = Array.from(songidToMid.entries())
    const CHUNK = 20

    let updatedCount = 0
    for (let i = 0; i < entries.length; i += CHUNK) {
      const chunk = entries.slice(i, i + CHUNK)
      const results = await Promise.all(
        chunk.map(([songid, songmid]) =>
          prisma.music.updateMany({
            where: { qqMusicId: songid, qqMusicMid: null },
            data: { qqMusicMid: songmid },
          })
        )
      )
      updatedCount += results.reduce((sum, r) => sum + r.count, 0)
    }

    // ====== 批量导入新歌曲 ======
    const newSongs = songs.filter(
      (s: any) => !existingIds.has(String(s.songid))
    )

    let imported = 0
    if (newSongs.length > 0) {
      const coverBase = "https://y.qq.com/music/photo_new/T002R300x300M000"

      const createData = newSongs.map((song: any) => ({
        title: song.songname || "未知歌曲",
        artist: (song.singer || []).map((s: any) => s.name).join(" / "),
        album: song.albumname || null,
        coverUrl: song.albummid ? `${coverBase}${song.albummid}.jpg` : null,
        qqMusicId: String(song.songid),
        qqMusicMid: String(song.songmid || ""),
        playlistId,
        duration: song.interval || null,
      }))

      const result = await prisma.music.createMany({ data: createData })
      imported = result.count
    }

    return NextResponse.json({
      success: true,
      data: {
        imported,
        updated: updatedCount,
        totalSongs: songs.length,
        // 诊断信息：服务端是否拿到了 pay 数据
        payAvailable,
        payVipCount,
        payFreeCount: payAvailable ? songs.length - payVipCount : 0,
        message: imported > 0
          ? `成功导入 ${imported} 首新歌`
          : "歌单没有新歌曲",
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
