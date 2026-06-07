import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * POST /api/music/update-availability
 * body: { musicId: number, canPlayFull: boolean }
 * 供浏览器端 JSONP 检测后更新数据库
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { musicId, canPlayFull } = body

    if (!musicId || typeof canPlayFull !== "boolean") {
      return NextResponse.json(
        { success: false, error: "请提供 musicId 和 canPlayFull" },
        { status: 400 }
      )
    }

    await prisma.music.update({
      where: { id: musicId },
      data: { canPlayFull },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("更新VIP状态失败:", error)
    return NextResponse.json(
      { success: false, error: "更新失败" },
      { status: 500 }
    )
  }
}
