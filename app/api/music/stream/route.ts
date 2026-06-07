import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { StreamData } from "@/lib/types"

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

/**
 * GET /api/music/stream?id={musicId}
 * 获取歌曲的流媒体播放URL
 * 自动降级：完整播放 → 30秒试听 → 不可用
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, error: "请提供音乐ID" },
        { status: 400 }
      )
    }

    // 查找歌曲的 songmid
    const music = await prisma.music.findUnique({
      where: { id: parseInt(id) },
      select: { qqMusicMid: true, title: true, artist: true },
    })

    if (!music) {
      return NextResponse.json(
        { success: false, error: "歌曲不存在" },
        { status: 404 }
      )
    }

    if (!music.qqMusicMid) {
      return NextResponse.json(
        { success: false, error: "该歌曲不支持在线播放（缺少QQ音乐标识）" },
        { status: 400 }
      )
    }

    // 调用QQ音乐 vkey API 获取播放链接
    const response = await fetch("https://u.y.qq.com/cgi-bin/musicu.fcg", {
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
            songmid: [music.qqMusicMid],
            songtype: [0],
            uin: "0",
            loginflag: 1,
            platform: "20",
          },
        },
      }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "QQ音乐接口异常" },
        { status: 502 }
      )
    }

    const json = await response.json()
    const info = json?.req_0?.data?.midurlinfo?.[0]
    const sip = json?.req_0?.data?.sip

    if (!info || !sip?.length) {
      return NextResponse.json(
        { success: false, error: "暂无可用音源" },
        { status: 404 }
      )
    }

    const baseUrl = sip[0]
    let streamData: StreamData | null = null

    // 优先完整播放
    if (info.purl) {
      streamData = {
        url: baseUrl + info.purl,
        type: "full",
      }
    }
    // 降级为30秒试听
    else if (info.opi30surl) {
      streamData = {
        url: baseUrl + info.opi30surl,
        type: "preview",
      }
    }

    if (!streamData) {
      return NextResponse.json(
        { success: false, error: "暂无可用音源" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: streamData,
    })
  } catch (error) {
    console.error("获取流媒体URL失败:", error)
    return NextResponse.json(
      { success: false, error: "获取播放链接失败" },
      { status: 500 }
    )
  }
}
