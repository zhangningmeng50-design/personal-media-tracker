import { NextRequest, NextResponse } from "next/server"
import { searchBangumiSubjects } from "@/lib/bangumi"

/**
 * GET /api/import/bangumi/search?q=&limit=
 * 搜索Bangumi动画
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

    const results = await searchBangumiSubjects(q.trim(), limit)

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
    })
  } catch (error: any) {
    console.error("Bangumi搜索接口错误:", error.message)
    return NextResponse.json(
      { success: false, error: error.message || "搜索失败" },
      { status: 500 }
    )
  }
}
