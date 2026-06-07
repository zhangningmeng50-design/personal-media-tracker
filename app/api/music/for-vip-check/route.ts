import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/music/for-vip-check
 * 返回所有需要 VIP 检测的歌曲（仅 id + qqMusicMid，轻量查询）
 * 供浏览器端通过 u.y.qq.com JSONP 批量检测 VIP 状态使用
 */
export async function GET() {
  try {
    const music = await prisma.music.findMany({
      where: {
        qqMusicMid: { not: null },
      },
      select: {
        id: true,
        qqMusicMid: true,
      },
      orderBy: { id: "asc" },
    })

    return NextResponse.json({
      success: true,
      data: music,
      total: music.length,
    })
  } catch (error) {
    console.error("获取VIP检测列表失败:", error)
    return NextResponse.json(
      { success: false, error: "获取歌曲列表失败" },
      { status: 500 }
    )
  }
}
