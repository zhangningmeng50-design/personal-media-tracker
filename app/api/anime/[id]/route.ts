import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/anime/[id]
 * 获取单个动画详情
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

    const anime = await prisma.anime.findUnique({
      where: { id },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    })

    if (!anime) {
      return NextResponse.json(
        { success: false, error: "动画不存在" },
        { status: 404 }
      )
    }

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
    console.error("获取动画详情失败:", error)
    return NextResponse.json(
      { success: false, error: "获取动画详情失败" },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/anime/[id]
 * 更新动画信息
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
    const { tagIds, airDate, startDate, finishDate, ...rest } = body

    const existing = await prisma.anime.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "动画不存在" },
        { status: 404 }
      )
    }

    await prisma.anime.update({
      where: { id },
      data: {
        ...rest,
        airDate: airDate ? new Date(airDate) : airDate === null ? null : undefined,
        startDate: startDate ? new Date(startDate) : startDate === null ? null : undefined,
        finishDate: finishDate ? new Date(finishDate) : finishDate === null ? null : undefined,
      },
    })

    // 更新标签关联
    if (tagIds !== undefined) {
      await prisma.animeTag.deleteMany({ where: { animeId: id } })
      if (tagIds.length > 0) {
        await prisma.animeTag.createMany({
          data: tagIds.map((tagId: number) => ({ animeId: id, tagId })),
        })
      }
    }

    // 重新获取更新后的数据
    const updatedAnime = await prisma.anime.findUnique({
      where: { id },
      include: {
        tags: { include: { tag: true } },
      },
    })

    if (!updatedAnime) {
      return NextResponse.json(
        { success: false, error: "动画不存在" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...updatedAnime,
        createdAt: updatedAnime.createdAt.toISOString(),
        updatedAt: updatedAnime.updatedAt.toISOString(),
        airDate: updatedAnime.airDate?.toISOString() || null,
        startDate: updatedAnime.startDate?.toISOString() || null,
        finishDate: updatedAnime.finishDate?.toISOString() || null,
        tags: updatedAnime.tags.map((at) => ({
          id: at.tag.id,
          name: at.tag.name,
          color: at.tag.color,
          createdAt: at.tag.createdAt.toISOString(),
        })),
      },
    })
  } catch (error) {
    console.error("更新动画失败:", error)
    return NextResponse.json(
      { success: false, error: "更新动画失败" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/anime/[id]
 * 删除动画
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

    const existing = await prisma.anime.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "动画不存在" },
        { status: 404 }
      )
    }

    await prisma.anime.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("删除动画失败:", error)
    return NextResponse.json(
      { success: false, error: "删除动画失败" },
      { status: 500 }
    )
  }
}
