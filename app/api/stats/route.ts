import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/stats
 * 获取统计数据
 */
export async function GET() {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [
      bookCount,
      animeCount,
      musicCount,
      booksReadThisMonth,
      animeWatchedThisMonth,
      booksByStatus,
      animeByStatus,
      musicByStatus,
      recentBooks,
      recentAnime,
      recentMusic,
      avgBookRating,
      avgAnimeRating,
      avgMusicRating,
    ] = await Promise.all([
      // 总书籍数
      prisma.book.count(),
      // 总动画数
      prisma.anime.count(),
      // 总音乐数
      prisma.music.count(),
      // 本月读完的书
      prisma.book.count({
        where: {
          status: "READ",
          finishDate: { gte: startOfMonth },
        },
      }),
      // 本月看完的动画
      prisma.anime.count({
        where: {
          status: "WATCHED",
          finishDate: { gte: startOfMonth },
        },
      }),
      // 书籍状态分布
      prisma.book.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
      // 动画状态分布
      prisma.anime.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
      // 音乐状态分布
      prisma.music.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
      // 最近添加的书籍
      prisma.book.findMany({
        include: { tags: { include: { tag: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      // 最近添加的动画
      prisma.anime.findMany({
        include: { tags: { include: { tag: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      // 最近添加的音乐
      prisma.music.findMany({
        include: { tags: { include: { tag: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      // 书籍平均评分
      prisma.book.aggregate({
        _avg: { rating: true },
        where: { rating: { not: null } },
      }),
      // 动画平均评分
      prisma.anime.aggregate({
        _avg: { rating: true },
        where: { rating: { not: null } },
      }),
      // 音乐平均评分
      prisma.music.aggregate({
        _avg: { rating: true },
        where: { rating: { not: null } },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        bookCount,
        animeCount,
        musicCount,
        booksReadThisMonth,
        animeWatchedThisMonth,
        averageBookRating: Math.round((avgBookRating._avg.rating || 0) * 10) / 10,
        averageAnimeRating: Math.round((avgAnimeRating._avg.rating || 0) * 10) / 10,
        averageMusicRating: Math.round((avgMusicRating._avg.rating || 0) * 10) / 10,
        bookStatusDistribution: booksByStatus.map((s) => ({
          status: s.status,
          count: s._count.id,
        })),
        animeStatusDistribution: animeByStatus.map((s) => ({
          status: s.status,
          count: s._count.id,
        })),
        musicStatusDistribution: musicByStatus.map((s) => ({
          status: s.status,
          count: s._count.id,
        })),
        recentBooks: recentBooks.map((b) => ({
          ...b,
          createdAt: b.createdAt.toISOString(),
          updatedAt: b.updatedAt.toISOString(),
          startDate: b.startDate?.toISOString() || null,
          finishDate: b.finishDate?.toISOString() || null,
          tags: b.tags.map((bt) => ({
            id: bt.tag.id,
            name: bt.tag.name,
            color: bt.tag.color,
            createdAt: bt.tag.createdAt.toISOString(),
          })),
        })),
        recentAnime: recentAnime.map((a) => ({
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
            createdAt: at.tag.createdAt.toISOString(),
          })),
        })),
        recentMusic: recentMusic.map((m) => ({
          ...m,
          createdAt: m.createdAt.toISOString(),
          updatedAt: m.updatedAt.toISOString(),
          tags: m.tags.map((mt) => ({
            id: mt.tag.id,
            name: mt.tag.name,
            color: mt.tag.color,
            createdAt: mt.tag.createdAt.toISOString(),
          })),
        })),
      },
    })
  } catch (error) {
    console.error("获取统计数据失败:", error)
    return NextResponse.json(
      { success: false, error: "获取统计数据失败" },
      { status: 500 }
    )
  }
}
