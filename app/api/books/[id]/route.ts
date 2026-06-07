import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/books/[id]
 * 获取单本书详情
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "无效的ID" },
        { status: 400 }
      )
    }

    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    })

    if (!book) {
      return NextResponse.json(
        { success: false, error: "书籍不存在" },
        { status: 404 }
      )
    }

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
    console.error("获取书籍详情失败:", error)
    return NextResponse.json(
      { success: false, error: "获取书籍详情失败" },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/books/[id]
 * 更新书籍信息
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "无效的ID" },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { tagIds, startDate, finishDate, ...rest } = body

    // 先检查书籍是否存在
    const existing = await prisma.book.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "书籍不存在" },
        { status: 404 }
      )
    }

    // 更新书籍
    const book = await prisma.book.update({
      where: { id },
      data: {
        ...rest,
        startDate: startDate ? new Date(startDate) : startDate === null ? null : undefined,
        finishDate: finishDate ? new Date(finishDate) : finishDate === null ? null : undefined,
      },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    })

    // 如果提供了 tagIds，更新标签关联
    if (tagIds !== undefined) {
      // 删除旧关联
      await prisma.bookTag.deleteMany({ where: { bookId: id } })
      // 创建新关联
      if (tagIds.length > 0) {
        await prisma.bookTag.createMany({
          data: tagIds.map((tagId: number) => ({ bookId: id, tagId })),
        })
      }

      // 重新获取包含新标签的书籍
      const updatedBook = await prisma.book.findUnique({
        where: { id },
        include: {
          tags: { include: { tag: true } },
        },
      })

      if (updatedBook) {
        return NextResponse.json({
          success: true,
          data: {
            ...updatedBook,
            createdAt: updatedBook.createdAt.toISOString(),
            updatedAt: updatedBook.updatedAt.toISOString(),
            startDate: updatedBook.startDate?.toISOString() || null,
            finishDate: updatedBook.finishDate?.toISOString() || null,
            tags: updatedBook.tags.map((bt) => ({
              id: bt.tag.id,
              name: bt.tag.name,
              color: bt.tag.color,
              createdAt: bt.tag.createdAt.toISOString(),
            })),
          },
        })
      }
    }

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
    console.error("更新书籍失败:", error)
    return NextResponse.json(
      { success: false, error: "更新书籍失败" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/books/[id]
 * 删除书籍
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "无效的ID" },
        { status: 400 }
      )
    }

    const existing = await prisma.book.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "书籍不存在" },
        { status: 404 }
      )
    }

    await prisma.book.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("删除书籍失败:", error)
    return NextResponse.json(
      { success: false, error: "删除书籍失败" },
      { status: 500 }
    )
  }
}
