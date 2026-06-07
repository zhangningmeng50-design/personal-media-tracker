import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/tags
 * 获取标签列表，可按类型筛选
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            books: type === "anime" ? false : true,
            animes: type === "book" ? false : true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    const formattedTags = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
      createdAt: tag.createdAt.toISOString(),
      bookCount: tag._count.books,
      animeCount: tag._count.animes,
    }))

    return NextResponse.json({
      success: true,
      data: formattedTags,
    })
  } catch (error) {
    console.error("获取标签列表失败:", error)
    return NextResponse.json(
      { success: false, error: "获取标签列表失败" },
      { status: 500 }
    )
  }
}

/**
 * POST /api/tags
 * 创建新标签
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, color } = body

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "标签名不能为空" },
        { status: 400 }
      )
    }

    // 检查名称是否已存在
    const existing = await prisma.tag.findUnique({ where: { name: name.trim() } })
    if (existing) {
      return NextResponse.json(
        { success: false, error: "标签名已存在" },
        { status: 409 }
      )
    }

    const tag = await prisma.tag.create({
      data: {
        name: name.trim(),
        color: color || "#165DFF",
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: tag.id,
        name: tag.name,
        color: tag.color,
        createdAt: tag.createdAt.toISOString(),
      },
    })
  } catch (error) {
    console.error("创建标签失败:", error)
    return NextResponse.json(
      { success: false, error: "创建标签失败" },
      { status: 500 }
    )
  }
}
