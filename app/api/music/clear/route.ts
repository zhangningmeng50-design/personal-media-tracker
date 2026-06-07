import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * DELETE /api/music/clear
 * 清空所有音乐数据
 */
export async function DELETE(request: NextRequest) {
  try {
    // 先删除音乐标签关联
    await prisma.musicTag.deleteMany()
    // 再删除音乐
    const result = await prisma.music.deleteMany()

    return NextResponse.json({
      success: true,
      data: { deleted: result.count },
    })
  } catch (error) {
    console.error("清空音乐失败:", error)
    return NextResponse.json(
      { success: false, error: "清空音乐失败" },
      { status: 500 }
    )
  }
}
