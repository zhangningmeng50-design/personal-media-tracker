import { NextRequest, NextResponse } from "next/server"
import { getDoubanBookDetail } from "@/lib/douban"

/** 将豆瓣封面URL重写为图片代理地址，避免浏览器端防盗链403 */
function proxyCoverUrl(url?: string): string | undefined {
  if (!url) return undefined
  return `/api/proxy/image?url=${encodeURIComponent(url)}`
}

/**
 * GET /api/import/zlib/detail?id=
 * 获取豆瓣图书详情（原 Z-Library 接口，已改用豆瓣）
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, error: "请提供书籍ID" },
        { status: 400 }
      )
    }

    const detail = await getDoubanBookDetail(id)

    if (!detail) {
      return NextResponse.json(
        { success: false, error: "获取书籍详情失败" },
        { status: 404 }
      )
    }

    // 将豆瓣 CDN 封面链接替换为代理地址
    const proxied = {
      ...detail,
      coverUrl: proxyCoverUrl(detail.coverUrl),
    }

    return NextResponse.json({ success: true, data: proxied })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "获取详情失败" },
      { status: 500 }
    )
  }
}
