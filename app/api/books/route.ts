import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/books
 * 获取书籍列表，支持筛选、搜索和排序
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const tagId = searchParams.get("tag")
    const rating = searchParams.get("rating")
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
        { title: { contains: search } },
        { author: { contains: search } },
        { publisher: { contains: search } },
        { isbn: { contains: search } },
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

    // 构建排序
    let orderBy: Record<string, string> = {}
    switch (sort) {
      case "title":
        orderBy = { title: "asc" }
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

    const [books, total] = await Promise.all([
      prisma.book.findMany({
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
      prisma.book.count({ where: where as any }),
    ])

    // 转换数据格式
    const formattedBooks = books.map((book) => ({
      ...book,
      createdAt: book.createdAt.toISOString(),
      updatedAt: book.updatedAt.toISOString(),
      startDate: book.startDate?.toISOString() || null,
      finishDate: book.finishDate?.toISOString() || null,
      tags: book.tags.map((bt) => ({
        id: bt.tag.id,
        name: bt.tag.name,
        color: bt.tag.color,
        createdAt: bt.tag.createdAt.toISOString(),
      })),
    }))

    return NextResponse.json({
      success: true,
      data: formattedBooks,
      total,
      page,
      pageSize,
    })
  } catch (error) {
    console.error("获取书籍列表失败:", error)
    return NextResponse.json(
      { success: false, error: "获取书籍列表失败" },
      { status: 500 }
    )
  }
}

/**
 * POST /api/books
 * 创建新书籍
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, author, tagIds, startDate, finishDate, ...rest } = body

    if (!title || !author) {
      return NextResponse.json(
        { success: false, error: "书名和作者为必填项" },
        { status: 400 }
      )
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        ...rest,
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
        ...book,
        createdAt: book.createdAt.toISOString(),
        updatedAt: book.updatedAt.toISOString(),
        startDate: book.startDate?.toISOString() || null,
        finishDate: book.finishDate?.toISOString() || null,
        tags: book.tags.map((bt) => ({
          id: bt.tag.id,
          name: bt.tag.name,
          color: bt.tag.color,
          createdAt: bt.tag.createdAt.toISOString(),
        })),
      },
    })
  } catch (error) {
    console.error("创建书籍失败:", error)
    return NextResponse.json(
      { success: false, error: "创建书籍失败" },
      { status: 500 }
    )
  }
}
