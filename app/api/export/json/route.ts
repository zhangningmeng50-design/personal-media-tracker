import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/export/json
 * 导出所有数据为JSON格式
 */
export async function GET() {
  try {
    const [books, anime, tags] = await Promise.all([
      prisma.book.findMany({
        include: {
          tags: { include: { tag: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.anime.findMany({
        include: {
          tags: { include: { tag: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.tag.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ])

    const exportData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      books: books.map((b) => ({
        ...b,
        createdAt: b.createdAt.toISOString(),
        updatedAt: b.updatedAt.toISOString(),
        startDate: b.startDate?.toISOString() || null,
        finishDate: b.finishDate?.toISOString() || null,
        tags: b.tags.map((bt) => ({
          id: bt.tag.id,
          name: bt.tag.name,
          color: bt.tag.color,
        })),
      })),
      anime: anime.map((a) => ({
        ...a,
        createdAt: a.createdAt.toISOString(),
        updatedAt: a.updatedAt.toISOString(),
        airDate: a.airDate?.toISOString() || null,
        startDate: a.startDate?.toISOString() || null,
        finishDate: a.finishDate?.toISOString() || null,
        tags: a.tags.map((at) => ({
          id: at.tag.id,
          name: at.tag.name,
          color: at.tag.color,
        })),
      })),
      tags: tags.map((t) => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
      })),
    }

    const jsonStr = JSON.stringify(exportData, null, 2)

    return new NextResponse(jsonStr, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="media-tracker-backup-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    })
  } catch (error) {
    console.error("导出JSON失败:", error)
    return NextResponse.json(
      { success: false, error: "导出失败" },
      { status: 500 }
    )
  }
}
