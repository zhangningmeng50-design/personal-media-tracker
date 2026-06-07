import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/anime
 * 获取动画列表，支持筛选、搜索和排序
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const tagId = searchParams.get("tag")
    const rating = searchParams.get("rating")
    const year = searchParams.get("year")
    const studio = searchParams.get("studio")
    const sort = searchParams.get("sort") || "updatedAt"
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "20")

    // 构建 where 条件
    const where: Record<string, unknown> = {}

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { titleCn: { contains: search } },
        { titleJp: { contains: search } },
        { summary: { contains: search } },
        { studio: { contains: search } },
      ]
    }

    if (tagId) {
      where.tags = {
        some: {
          tagId: parseInt(tagId),
        },
      }
    }

    if (rating) {
      const minRating = parseInt(rating)
      if (!isNaN(minRating)) {
        where.rating = { gte: minRating }
      }
    }

    if (studio) {
      where.studio = { contains: studio }
    }

    if (year) {
      const yearNum = parseInt(year)
      if (!isNaN(yearNum)) {
        const startDate = new Date(yearNum, 0, 1)
        const endDate = new Date(yearNum, 11, 31, 23, 59, 59)
        where.airDate = { gte: startDate, lte: endDate }
      }
    }

    // 构建排序
    let orderBy: Record<string, string> = {}
    switch (sort) {
      case "titleCn":
        orderBy = { titleCn: "asc" }
        break
      case "rating":
        orderBy = { rating: "desc" }
        break
      case "airDate":
        orderBy = { airDate: "desc" }
        break
      case "createdAt":
        orderBy = { createdAt: "desc" }
        break
      default:
        orderBy = { updatedAt: "desc" }
    }

    const [anime, total] = await Promise.all([
      prisma.anime.findMany({
        where: where as any,
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.anime.count({ where: where as any }),
    ])

    const formattedAnime = anime.map((a) => ({
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
    }))

    return NextResponse.json({
      success: true,
      data: formattedAnime,
      total,
      page,
      pageSize,
    })
  } catch (error) {
    console.error("获取动画列表失败:", error)
    return NextResponse.json(
      { success: false, error: "获取动画列表失败" },
      { status: 500 }
    )
  }
}

/**
 * POST /api/anime
 * 创建新动画
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { titleCn, tagIds, airDate, startDate, finishDate, ...rest } = body

    if (!titleCn) {
      return NextResponse.json(
        { success: false, error: "中文名称为必填项" },
        { status: 400 }
      )
    }

    const anime = await prisma.anime.create({
      data: {
        titleCn,
        ...rest,
        airDate: airDate ? new Date(airDate) : null,
        startDate: startDate ? new Date(startDate) : null,
        finishDate: finishDate ? new Date(finishDate) : null,
        tags: tagIds?.length
          ? {
              create: tagIds.map((tagId: number) => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
      },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        ...anime,
        createdAt: anime.createdAt.toISOString(),
        updatedAt: anime.updatedAt.toISOString(),
        airDate: anime.airDate?.toISOString() || null,
        startDate: anime.startDate?.toISOString() || null,
        finishDate: anime.finishDate?.toISOString() || null,
        tags: anime.tags.map((at) => ({
          id: at.tag.id,
          name: at.tag.name,
          color: at.tag.color,
          createdAt: at.tag.createdAt.toISOString(),
        })),
      },
    })
  } catch (error) {
    console.error("创建动画失败:", error)
    return NextResponse.json(
      { success: false, error: "创建动画失败" },
      { status: 500 }
    )
  }
}
