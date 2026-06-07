import { NextRequest, NextResponse } from "next/server"
import { searchDoubanBooks } from "@/lib/douban"

/** 将豆瓣封面URL重写为图片代理地址，避免浏览器端防盗链403 */
function proxyCoverUrl(url?: string): string | undefined {
  if (!url) return undefined
  return `/api/proxy/image?url=${encodeURIComponent(url)}`
}

/**
 * GET /api/import/zlib/search?q=&limit=
 * 搜索豆瓣图书（原 Z-Library 接口，已改用豆瓣）
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q")
    const limit = parseInt(searchParams.get("limit") || "10")

    if (!q || q.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "请输入搜索关键词" },
        { status: 400 }
      )
    }

    const results = await searchDoubanBooks(q.trim(), limit)

    // 将豆瓣 CDN 封面链接替换为代理地址
    const proxied = results.map((r) => ({
      ...r,
      coverUrl: proxyCoverUrl(r.coverUrl),
    }))

    return NextResponse.json({
      success: true,
      data: proxied,
      total: proxied.length,
    })
  } catch (error: any) {
    console.error("豆瓣搜索接口错误:", error.message)
    return NextResponse.json(
      { success: false, error: error.message || "搜索失败" },
      { status: 500 }
    )
  }
}
