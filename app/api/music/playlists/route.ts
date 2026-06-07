import { NextRequest, NextResponse } from "next/server"
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

/**
 * DELETE /api/music/playlists?playlistId=xxx
 * 删除指定歌单的所有歌曲
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const playlistId = searchParams.get("playlistId")

    if (!playlistId) {
      return NextResponse.json(
        { success: false, error: "缺少 playlistId 参数" },
        { status: 400 }
      )
    }

    // 查找该歌单的所有音乐 ID
    const toDelete = await prisma.music.findMany({
      where: { playlistId },
      select: { id: true },
    })
    const ids = toDelete.map((m) => m.id)

    if (ids.length === 0) {
      return NextResponse.json({
        success: true,
        data: { deleted: 0, playlistId },
      })
    }

    // 删除关联的标签
    await prisma.musicTag.deleteMany({
      where: { musicId: { in: ids } },
    })
    // 删除音乐
    const result = await prisma.music.deleteMany({
      where: { id: { in: ids } },
    })

    return NextResponse.json({
      success: true,
      data: { deleted: result.count, playlistId },
    })
  } catch (error) {
    console.error("删除歌单失败:", error)
    return NextResponse.json(
      { success: false, error: "删除歌单失败" },
      { status: 500 }
    )
  }
}
