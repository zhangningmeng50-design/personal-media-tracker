import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/export/csv?type=books|anime
 * 导出数据为CSV格式
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "books"

    if (type === "anime") {
      const items = await prisma.anime.findMany({
        include: { tags: { include: { tag: true } } },
        orderBy: { createdAt: "desc" },
      })

      const headers = [
        "ID", "中文名", "日文名", "制作公司", "播出日期", "总集数",
        "已看集数", "状态", "评分", "笔记", "开始日期", "完成日期", "标签"
      ]
      const rows = items.map((a) => [
        a.id,
        `"${a.titleCn.replace(/"/g, '""')}"`,
        a.titleJp ? `"${a.titleJp.replace(/"/g, '""')}"` : "",
        a.studio ? `"${a.studio.replace(/"/g, '""')}"` : "",
        a.airDate?.toISOString().slice(0, 10) || "",
        a.totalEpisodes || "",
        a.watchedEpisodes,
        a.status,
        a.rating || "",
        a.notes ? `"${a.notes.replace(/"/g, '""')}"` : "",
        a.startDate?.toISOString().slice(0, 10) || "",
        a.finishDate?.toISOString().slice(0, 10) || "",
        a.tags.map((t) => t.tag.name).join(";"),
      ])

      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
      const BOM = "﻿"

      return new NextResponse(BOM + csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="anime-export-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      })
    } else {
      const items = await prisma.book.findMany({
        include: { tags: { include: { tag: true } } },
        orderBy: { createdAt: "desc" },
      })

      const headers = [
        "ID", "书名", "作者", "出版社", "出版年份", "ISBN",
        "状态", "评分", "笔记", "开始日期", "完成日期", "标签"
      ]
      const rows = items.map((b) => [
        b.id,
        `"${b.title.replace(/"/g, '""')}"`,
        `"${b.author.replace(/"/g, '""')}"`,
        b.publisher ? `"${b.publisher.replace(/"/g, '""')}"` : "",
        b.publishYear || "",
        b.isbn || "",
        b.status,
        b.rating || "",
        b.notes ? `"${b.notes.replace(/"/g, '""')}"` : "",
        b.startDate?.toISOString().slice(0, 10) || "",
        b.finishDate?.toISOString().slice(0, 10) || "",
        b.tags.map((t) => t.tag.name).join(";"),
      ])

      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
      const BOM = "﻿"

      return new NextResponse(BOM + csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="books-export-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      })
    }
  } catch (error) {
    console.error("导出CSV失败:", error)
    return NextResponse.json(
      { success: false, error: "导出失败" },
      { status: 500 }
    )
  }
}
