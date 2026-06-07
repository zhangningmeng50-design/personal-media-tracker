import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/music/playlists
 * 获取已导入的歌单列表（按 playlistId 分组）
 */
export async function GET() {
  try {
    const grouped = await prisma.music.groupBy({
      by: ["playlistId"],
      where: { playlistId: { not: null } },
      _count: { id: true },
      _min: { title: true },
    })

    const playlists = grouped.map((g) => ({
      playlistId: g.playlistId!,
      playlistName: "歌单",
      songCount: g._count.id,
    }))

    return NextResponse.json({ success: true, data: playlists })
  } catch (error) {
    console.error("获取歌单列表失败:", error)
    return NextResponse.json(
      { success: false, error: "获取歌单列表失败" },
      { status: 500 }
    )
  }
}
