import { NextRequest, NextResponse } from "next/server"

/**
 * GET /api/proxy/image?url=
 * 图片代理 — 服务端转发豆瓣图片，绕过防盗链限制
 * 豆瓣 CDN 检查 Referer 头，非豆瓣域名直接返回 403
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get("url")

    if (!url) {
      return new NextResponse("Missing url parameter", { status: 400 })
    }

    // 只允许豆瓣图片 CDN
    if (
      !url.includes("doubanio.com") &&
      !url.includes("douban.com")
    ) {
      return new NextResponse("Unauthorized domain", { status: 403 })
    }

    const response = await fetch(url, {
      headers: {
        Referer: "https://book.douban.com/",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    if (!response.ok) {
      return new NextResponse("Image fetch failed", { status: response.status })
    }

    const contentType =
      response.headers.get("content-type") || "image/jpeg"
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, immutable",
      },
    })
  } catch (error: any) {
    console.error("图片代理失败:", error.message)
    return new NextResponse("Proxy error", { status: 500 })
  }
}
