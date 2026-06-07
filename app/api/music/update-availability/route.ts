import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * POST /api/music/update-availability
 * body: { musicId: number, canPlayFull: boolean }  单首更新
 * body: { updates: [{ id: number, canPlayFull: boolean }] }  批量更新
 * 供浏览器端获取 pay 信息后更新数据库
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 批量更新模式
    if (body.updates && Array.isArray(body.updates)) {
      let count = 0
      // 分批并行更新（每批20首）
      const BATCH = 20
      for (let i = 0; i < body.updates.length; i += BATCH) {
        const chunk = body.updates.slice(i, i + BATCH)
        const results = await Promise.all(
          chunk.map((u: { id: number; canPlayFull: boolean }) =>
            prisma.music.update({
              where: { id: u.id },
              data: { canPlayFull: u.canPlayFull },
            }).catch(() => null) // 跳过失败的
          )
        )
        count += results.filter(Boolean).length
      }
      return NextResponse.json({ success: true, updated: count })
    }

    // 单首更新模式（向后兼容）
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
