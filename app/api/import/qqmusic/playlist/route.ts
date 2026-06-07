import { NextRequest, NextResponse } from "next/server"
import type { QQMusicSong } from "@/lib/types"

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

/**
 * QQ音乐封面图URL
 */
function coverUrl(albummid: string): string {
  return `https://y.qq.com/music/photo_new/T002R300x300M000${albummid}.jpg`
}

/**
 * GET /api/import/qqmusic/playlist?id=xxx
 * 解析 QQ 音乐歌单，返回歌曲列表
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, error: "请提供歌单ID" },
        { status: 400 }
      )
    }

    // 调用 QQ 音乐歌单 API
    const apiUrl = `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=${encodeURIComponent(id)}`

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
    // QQ音乐返回的是 JSONP 格式: jsonCallback({...})
    // 提取 JSON 部分
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
    const playlistName = cd.dissname || "未知歌单"
    const songs: QQMusicSong[] = (cd.songlist || []).map((song: any) => {
      // 从 pay 字段判断VIP状态
      const pay = song.pay
      let canPlayFull: boolean | null = null
      if (pay) {
        const needsVip = pay.payplay === 1 || pay.paymonth === 1
        canPlayFull = !needsVip
      }
      return {
        songid: String(song.songid || ""),
        songmid: String(song.songmid || ""),
        songname: song.songname || "未知歌曲",
        singer: (song.singer || []).map((s: any) => s.name).join(" / "),
        albumname: song.albumname || "",
        albummid: song.albummid || "",
        interval: song.interval || 0,
        canPlayFull,
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        playlistId: id,
        playlistName,
        songs,
      },
    })
  } catch (error) {
    console.error("获取QQ音乐歌单失败:", error)
    return NextResponse.json(
      { success: false, error: "获取歌单失败，请检查网络连接" },
      { status: 500 }
    )
  }
}
