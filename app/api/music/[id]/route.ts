import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface Params {
  params: { id: string }
}

/**
 * GET /api/music/[id]
 * 获取单条音乐
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "无效的ID" },
        { status: 400 }
      )
    }

    const music = await prisma.music.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } } },
    })

    if (!music) {
      return NextResponse.json(
        { success: false, error: "未找到该音乐" },
        { status: 404 }
      )
    }

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
    console.error("获取音乐失败:", error)
    return NextResponse.json(
      { success: false, error: "获取音乐失败" },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/music/[id]
 * 更新音乐
 */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "无效的ID" },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { tagIds, ...rest } = body

    // 处理标签关联: 先删后建
    if (tagIds !== undefined) {
      await prisma.musicTag.deleteMany({ where: { musicId: id } })
    }

    const music = await prisma.music.update({
      where: { id },
      data: {
        ...rest,
        tags: tagIds?.length
          ? {
              create: tagIds.map((tagId: number) => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
      },
      include: { tags: { include: { tag: true } } },
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
    console.error("更新音乐失败:", error)
    return NextResponse.json(
      { success: false, error: "更新音乐失败" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/music/[id]
 * 删除音乐
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "无效的ID" },
        { status: 400 }
      )
    }

    await prisma.music.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("删除音乐失败:", error)
    return NextResponse.json(
      { success: false, error: "删除音乐失败" },
      { status: 500 }
    )
  }
}
