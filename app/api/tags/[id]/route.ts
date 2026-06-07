import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * PUT /api/tags/[id]
 * 更新标签
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
    const { name, color } = body

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "标签名不能为空" },
        { status: 400 }
      )
    }

    // 检查是否有重名标签
    const existingName = await prisma.tag.findUnique({ where: { name: name.trim() } })
    if (existingName && existingName.id !== id) {
      return NextResponse.json(
        { success: false, error: "标签名已存在" },
        { status: 409 }
      )
    }

    const tag = await prisma.tag.update({
      where: { id },
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
    console.error("更新标签失败:", error)
    return NextResponse.json(
      { success: false, error: "更新标签失败" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/tags/[id]
 * 删除标签
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

    await prisma.tag.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("删除标签失败:", error)
    return NextResponse.json(
      { success: false, error: "删除标签失败" },
      { status: 500 }
    )
  }
}
