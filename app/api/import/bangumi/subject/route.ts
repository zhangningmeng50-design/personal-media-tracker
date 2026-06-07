import { NextRequest, NextResponse } from "next/server"
import { getBangumiSubject } from "@/lib/bangumi"

/**
 * GET /api/import/bangumi/subject?id=
 * 获取Bangumi条目详情
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get("id") || "")

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "请输入有效的条目ID" },
        { status: 400 }
      )
    }

    const subject = await getBangumiSubject(id)

    if (!subject) {
      return NextResponse.json(
        { success: false, error: "未找到该条目" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: subject })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "获取条目详情失败" },
      { status: 500 }
    )
  }
}
