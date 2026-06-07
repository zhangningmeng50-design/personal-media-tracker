import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * DELETE /api/music/clear
 * 清空所有音乐数据
 * 可选参数: ?keep=playlistId 保留指定歌单
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const keepPlaylistId = searchParams.get("keep")

    if (keepPlaylistId) {
      // 只保留指定歌单，删除其他歌单和空歌单的音乐
      const toDelete = await prisma.music.findMany({
        where: { OR: [{ playlistId: { not: keepPlaylistId } }, { playlistId: null }] },
        select: { id: true },
      })
      const ids = toDelete.map((m) => m.id)

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
        data: { deleted: result.count, kept: keepPlaylistId },
      })
    }

    // 清空全部
    await prisma.musicTag.deleteMany()
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
