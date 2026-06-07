import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

/**
 * 批量检测歌曲VIP状态
 * 返回 Map<qqMusicMid, canPlayFull>
 */
async function batchCheckVip(
  songMids: string[]
): Promise<Map<string, boolean>> {
  const result = new Map<string, boolean>()
  if (!songMids.length) return result

  // 分批处理，每批最多50首
  const BATCH_SIZE = 50
  for (let i = 0; i < songMids.length; i += BATCH_SIZE) {
    const batch = songMids.slice(i, i + BATCH_SIZE)
    try {
      const response = await fetch(
        "https://u.y.qq.com/cgi-bin/musicu.fcg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Referer: "https://y.qq.com/",
            "User-Agent": USER_AGENT,
          },
          body: JSON.stringify({
            req_0: {
              module: "vkey.GetVkeyServer",
              method: "CgiGetVkey",
              param: {
                guid: "0",
                songmid: batch,
                songtype: [0],
                uin: "0",
                loginflag: 1,
                platform: "20",
              },
            },
          }),
        }
      )
      const json = await response.json()
      const data = json?.req_0?.data
      if (data?.midurlinfo) {
        for (const info of data.midurlinfo) {
          if (info.songmid) {
            if (info.purl) {
              result.set(info.songmid, true) // 免费完整播放
            } else if (info.opi30surl) {
              result.set(info.songmid, false) // VIP仅试听
            }
            // 两者都空不放入 map（保持 unknown/null）
          }
        }
      }
    } catch {
      // 批次失败跳过，继续下一批
    }
  }
  return result
}

/**
 * POST /api/import/qqmusic/refresh
 * body: { playlistId: string }
 * 刷新歌单：获取最新歌曲列表，自动导入数据库中不存在的歌曲
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

    // 获取歌单最新数据
    const apiUrl = `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=${encodeURIComponent(playlistId)}`

    const response = await fetch(apiUrl, {
      headers: {
        Referer: "https://y.qq.com/",
        "User-Agent": USER_AGENT,
      },
    })

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

    // 获取数据库中已存在的 qqMusicId
    const songIds = songs
      .map((s: any) => String(s.songid))
      .filter(Boolean)

    const existing = await prisma.music.findMany({
      where: { qqMusicId: { in: songIds } },
      select: { qqMusicId: true },
    })
    const existingIds = new Set(existing.map((m) => m.qqMusicId))

    // 过滤出新歌曲
    const newSongs = songs.filter(
      (s: any) => !existingIds.has(String(s.songid))
    )

    if (newSongs.length === 0) {
      return NextResponse.json({
        success: true,
        data: { imported: 0, message: "歌单没有新歌曲" },
      })
    }

    // 批量检测VIP状态（所有歌单歌曲，不仅是新歌）
    const allSongMids = songs
      .map((s: any) => String(s.songmid || ""))
      .filter(Boolean)
    const vipMap = await batchCheckVip(allSongMids)

    // 批量更新已有歌曲的VIP状态
    const vipEntries: [string, boolean][] = []
    vipMap.forEach((canPlayFull, songmid) => {
      vipEntries.push([songmid, canPlayFull])
    })
    for (let i = 0; i < vipEntries.length; i++) {
      const songmid = vipEntries[i][0]
      const canPlayFull = vipEntries[i][1]
      await prisma.music.updateMany({
        where: { qqMusicMid: songmid },
        data: { canPlayFull },
      })
    }

    // 批量导入新歌曲
    const coverBase = "https://y.qq.com/music/photo_new/T002R300x300M000"
    let imported = 0
    for (const song of newSongs) {
      try {
        await prisma.music.create({
          data: {
            title: song.songname || "未知歌曲",
            artist: (song.singer || [])
              .map((s: any) => s.name)
              .join(" / "),
            album: song.albumname || null,
            coverUrl: song.albummid
              ? `${coverBase}${song.albummid}.jpg`
              : null,
            qqMusicId: String(song.songid),
            qqMusicMid: String(song.songmid || ""),
            playlistId,
            duration: song.interval || null,
            canPlayFull: vipMap.get(String(song.songmid || "")) ?? undefined,
          },
        })
        imported++
      } catch {
        // 跳过失败的
      }
    }

    return NextResponse.json({
      success: true,
      data: { imported, message: `成功导入 ${imported} 首新歌` },
    })
  } catch (error) {
    console.error("刷新歌单失败:", error)
    return NextResponse.json(
      { success: false, error: "刷新歌单失败" },
      { status: 500 }
    )
  }
}
