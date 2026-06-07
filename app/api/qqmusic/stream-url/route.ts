import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

/**
 * GET /api/qqmusic/stream-url?songmid=XXX
 * Edge Function — 从离用户最近的边缘节点调用QQ音乐vkey API
 * 规避 Vercel 美东节点被 QQ 音乐封锁的问题
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const songmid = searchParams.get("songmid")

    if (!songmid) {
      return NextResponse.json(
        { success: false, error: "请提供 songmid" },
        { status: 400 }
      )
    }

    // 从边缘节点调用QQ音乐 vkey API
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
            songmid: [songmid],
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

    // 强制使用 HTTPS CDN
    const baseUrl = sip[0].replace(/^http:\/\//, "https://")

    let url: string | null = null
    let type: "full" | "preview" = "full"

    if (info.purl) {
      url = baseUrl + info.purl
      type = "full"
    } else if (info.opi30surl) {
      url = baseUrl + info.opi30surl
      type = "preview"
    }

    if (!url) {
      return NextResponse.json(
        { success: false, error: "暂无可用音源" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { url, type },
    })
  } catch (error) {
    console.error("Edge Function 获取流URL失败:", error)
    return NextResponse.json(
      { success: false, error: "获取播放链接失败" },
      { status: 500 }
    )
  }
}
