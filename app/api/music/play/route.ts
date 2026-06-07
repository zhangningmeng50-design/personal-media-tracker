import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

/**
 * GET /api/music/play?id={musicId}
 * 代理音频流，解决 HTTP 混内容问题
 * 从 QQ Music CDN 获取音频并通过 HTTPS 返回给浏览器
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
      select: { qqMusicMid: true, canPlayFull: true },
    })

    if (!music?.qqMusicMid) {
      return NextResponse.json(
        { success: false, error: "该歌曲不支持在线播放（缺少QQ音乐标识）" },
        { status: 400 }
      )
    }

    // 调用QQ音乐 vkey API 获取播放链接
    const vkeyRes = await fetch("https://u.y.qq.com/cgi-bin/musicu.fcg", {
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

    if (!vkeyRes.ok) {
      return NextResponse.json(
        { success: false, error: "QQ音乐接口异常" },
        { status: 502 }
      )
    }

    const json = await vkeyRes.json()
    const info = json?.req_0?.data?.midurlinfo?.[0]
    const sip = json?.req_0?.data?.sip

    if (!info || !sip?.length) {
      return NextResponse.json(
        { success: false, error: "暂无可用音源" },
        { status: 404 }
      )
    }

    // 构造流URL（先用HTTPS，不行的CDN节点会回退到HTTP由服务器代理）
    let streamUrl: string | null = null
    let canPlayFull: boolean | null = null

    if (info.purl) {
      streamUrl = sip[0].replace(/^http:\/\//, "https://") + info.purl
      canPlayFull = true
    } else if (info.opi30surl) {
      streamUrl = sip[0].replace(/^http:\/\//, "https://") + info.opi30surl
      canPlayFull = false
    }

    if (!streamUrl) {
      return NextResponse.json(
        { success: false, error: "暂无可用音源" },
        { status: 404 }
      )
    }

    // 顺便更新 canPlayFull
    if (canPlayFull !== null && music.canPlayFull === null) {
      prisma.music
        .update({
          where: { id: parseInt(id) },
          data: { canPlayFull },
        })
        .catch(() => {})
    }

    // 获取音频流
    let audioRes: Response
    try {
      audioRes = await fetch(streamUrl, {
        headers: {
          "User-Agent": USER_AGENT,
          Referer: "https://y.qq.com/",
        },
      })
    } catch {
      // HTTPS 失败时，回退到 HTTP（服务器代理不受混内容限制）
      const httpUrl = streamUrl.replace(/^https:\/\//, "http://")
      try {
        audioRes = await fetch(httpUrl, {
          headers: {
            "User-Agent": USER_AGENT,
            Referer: "https://y.qq.com/",
          },
        })
      } catch {
        return NextResponse.json(
          { success: false, error: "获取音频流失败" },
          { status: 502 }
        )
      }
    }

    if (!audioRes.ok) {
      return NextResponse.json(
        { success: false, error: "音频资源不可用" },
        { status: 502 }
      )
    }

    // 转发音频流给浏览器
    const headers = new Headers()
    const contentType = audioRes.headers.get("content-type") || "audio/m4a"
    headers.set("Content-Type", contentType)
    const contentLength = audioRes.headers.get("content-length")
    if (contentLength) headers.set("Content-Length", contentLength)
    headers.set("Accept-Ranges", "bytes")
    headers.set("Cache-Control", "public, max-age=7200, s-maxage=7200")

    // 支持 Range 请求（拖动进度条）
    const rangeHeader = request.headers.get("range")
    if (rangeHeader && audioRes.body) {
      // 对于简单的 Range 请求，直接转发完整内容
      // 浏览器会自动处理（大多数情况下足够了）
      headers.set("Content-Range", `bytes 0-${parseInt(contentLength || "0") - 1}/${contentLength}`)
      return new NextResponse(audioRes.body, {
        status: 206,
        headers,
      })
    }

    return new NextResponse(audioRes.body, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("代理音频流失败:", error)
    return NextResponse.json(
      { success: false, error: "获取播放链接失败" },
      { status: 500 }
    )
  }
}
