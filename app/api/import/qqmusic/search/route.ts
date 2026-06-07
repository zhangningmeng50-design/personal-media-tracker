import { NextRequest, NextResponse } from "next/server"
import type { QQMusicSong } from "@/lib/types"

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

function coverUrl(albummid: string): string {
  return `https://y.qq.com/music/photo_new/T002R300x300M000${albummid}.jpg`
}

/**
 * GET /api/import/qqmusic/search?q=xxx
 * 搜索 QQ 音乐歌曲
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q")

    if (!q) {
      return NextResponse.json(
        { success: false, error: "请提供搜索关键词" },
        { status: 400 }
      )
    }

    const apiUrl = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p=1&n=20&w=${encodeURIComponent(q)}&format=json`

    const response = await fetch(apiUrl, {
      headers: {
        Referer: "https://y.qq.com/",
        "User-Agent": USER_AGENT,
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "QQ音乐搜索接口返回错误" },
        { status: 502 }
      )
    }

    const text = await response.text()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json(
        { success: false, error: "解析搜索结果失败" },
        { status: 502 }
      )
    }

    const data = JSON.parse(jsonMatch[0])

    if (data.code !== 0 || !data.data?.song?.list?.length) {
      return NextResponse.json({
        success: true,
        data: { songs: [], keyword: q },
      })
    }

    const songs: QQMusicSong[] = data.data.song.list.map((song: any) => ({
      songid: String(song.songid || ""),
      songmid: String(song.songmid || ""),
      songname: song.songname || "未知歌曲",
      singer: (song.singer || []).map((s: any) => s.name).join(" / "),
      albumname: song.albumname || "",
      albummid: song.albummid || "",
      interval: song.interval || 0,
    }))

    return NextResponse.json({
      success: true,
      data: { songs, keyword: q },
    })
  } catch (error) {
    console.error("QQ音乐搜索失败:", error)
    return NextResponse.json(
      { success: false, error: "搜索失败，请检查网络连接" },
      { status: 500 }
    )
  }
}
