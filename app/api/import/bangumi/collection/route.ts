import { NextRequest, NextResponse } from "next/server"
import { getBangumiCollections } from "@/lib/bangumi"

/**
 * GET /api/import/bangumi/collection?username=
 * 获取Bangumi用户收藏列表
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username || !username.trim()) {
      return NextResponse.json(
        { success: false, error: "请输入Bangumi用户名" },
        { status: 400 }
      )
    }

    const collections = await getBangumiCollections(username.trim())

    return NextResponse.json({
      success: true,
      data: collections,
      total: collections.length,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "获取收藏失败" },
      { status: 500 }
    )
  }
}
