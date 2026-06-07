import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

/**
 * POST /api/music/sync-availability
 * 批量检测所有歌曲的VIP状态并更新到数据库
 * 可选 body: { playlistId?: string } 只同步指定歌单
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { playlistId } = body || {}

    // 查找需要检测的歌曲
    const where: any = {
      qqMusicMid: { not: null },
    }
    if (playlistId) {
      where.playlistId = playlistId
    }

    const songs = await prisma.music.findMany({
      where,
      select: { id: true, qqMusicMid: true },
    })

    if (!songs.length) {
      return NextResponse.json({
        success: true,
        data: { checked: 0, free: 0, vip: 0 },
      })
    }

    // 收集所有 songmid
    const songMids = songs
      .map((s) => s.qqMusicMid!)
      .filter(Boolean)

    // 批量检测（每批50首）
    const BATCH_SIZE = 50
    let freeCount = 0
    let vipCount = 0

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
            if (!info.songmid) continue
            let canPlayFull: boolean | null = null
            if (info.purl) {
              canPlayFull = true
              freeCount++
            } else if (info.opi30surl) {
              canPlayFull = false
              vipCount++
            }
            // null = 不可用，不改数据库

            if (canPlayFull !== null) {
              await prisma.music.updateMany({
                where: { qqMusicMid: info.songmid },
                data: { canPlayFull },
              })
            }
          }
        }
      } catch {
        // 批次失败，继续下一批
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        checked: songMids.length,
        free: freeCount,
        vip: vipCount,
      },
    })
  } catch (error) {
    console.error("同步VIP状态失败:", error)
    return NextResponse.json(
      { success: false, error: "同步失败" },
      { status: 500 }
    )
  }
}
