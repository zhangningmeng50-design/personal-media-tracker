import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/music
 * 获取音乐列表，支持筛选、搜索和排序
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const tagId = searchParams.get("tag")
    const rating = searchParams.get("rating")
    const availability = searchParams.get("availability")
    const sort = searchParams.get("sort") || "updatedAt"
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "20")

    const where: Record<string, unknown> = {}

    if (status) {
      where.status = status
    }

    if (availability === "free") {
      where.canPlayFull = true
    } else if (availability === "vip") {
      where.canPlayFull = false
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { artist: { contains: search } },
        { album: { contains: search } },
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

    let orderBy: Record<string, string> = {}
    switch (sort) {
      case "title":
        orderBy = { title: "asc" }
        break
      case "artist":
        orderBy = { artist: "asc" }
        break
      case "rating":
        orderBy = { rating: "desc" }
        break
      case "createdAt":
        orderBy = { createdAt: "desc" }
        break
      default:
        orderBy = { updatedAt: "desc" }
    }

    const [music, total] = await Promise.all([
      prisma.music.findMany({
        where: where as any,
        include: {
          tags: { include: { tag: true } },
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.music.count({ where: where as any }),
    ])

    const formatted = music.map((m) => ({
      ...m,
      createdAt: m.createdAt.toISOString(),
      updatedAt: m.updatedAt.toISOString(),
      tags: m.tags.map((mt) => ({
        id: mt.tag.id,
        name: mt.tag.name,
        color: mt.tag.color,
        createdAt: mt.tag.createdAt.toISOString(),
      })),
    }))

    return NextResponse.json({
      success: true,
      data: formatted,
      total,
      page,
      pageSize,
    })
  } catch (error) {
    console.error("获取音乐列表失败:", error)
    return NextResponse.json(
      { success: false, error: "获取音乐列表失败" },
      { status: 500 }
    )
  }
}

/**
 * POST /api/music
 * 创建新音乐
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, artist, tagIds, ...rest } = body

    if (!title || !artist) {
      return NextResponse.json(
        { success: false, error: "歌名和歌手为必填项" },
        { status: 400 }
      )
    }

    const music = await prisma.music.create({
      data: {
        title,
        artist,
        ...rest,
        tags: tagIds?.length
          ? {
              create: tagIds.map((tagId: number) => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
      },
      include: {
        tags: { include: { tag: true } },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        ...music,
        createdAt: music.createdAt.toISOString(),
        updatedAt: music.updatedAt.toISOString(),
        tags: music.tags.map((mt) => ({
          id: mt.tag.id,
          name: mt.tag.name,
          color: mt.tag.color,
          createdAt: mt.tag.createdAt.toISOString(),
        })),
      },
    })
  } catch (error) {
    console.error("创建音乐失败:", error)
    return NextResponse.json(
      { success: false, error: "创建音乐失败" },
      { status: 500 }
    )
  }
}
