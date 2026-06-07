import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * POST /api/import-data
 * 从JSON文件导入数据
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "无效的数据格式" },
        { status: 400 }
      )
    }

    let bookCount = 0
    let animeCount = 0
    let tagCount = 0

    // 先导入标签
    if (body.tags && Array.isArray(body.tags)) {
      for (const tag of body.tags) {
        try {
          const existing = await prisma.tag.findUnique({ where: { name: tag.name } })
          if (!existing) {
            await prisma.tag.create({
              data: {
                name: tag.name,
                color: tag.color || "#165DFF",
              },
            })
            tagCount++
          }
        } catch {
          // skip duplicates
        }
      }
    }

    // 获取标签映射
    const allTags = await prisma.tag.findMany()
    const tagNameMap = new Map(allTags.map((t) => [t.name, t.id]))

    // 导入书籍
    if (body.books && Array.isArray(body.books)) {
      for (const book of body.books) {
        try {
          const tagIds = (book.tags || [])
            .map((t: any) => tagNameMap.get(t.name || t))
            .filter(Boolean)

          await prisma.book.create({
            data: {
              title: book.title,
              author: book.author || "未知作者",
              publisher: book.publisher,
              publishYear: book.publishYear,
              isbn: book.isbn,
              coverUrl: book.coverUrl,
              description: book.description,
              status: book.status || "WANT_TO_READ",
              rating: book.rating,
              notes: book.notes,
              startDate: book.startDate ? new Date(book.startDate) : null,
              finishDate: book.finishDate ? new Date(book.finishDate) : null,
              tags: tagIds.length
                ? { create: tagIds.map((id: number) => ({ tag: { connect: { id } } })) }
                : undefined,
            },
          })
          bookCount++
        } catch {
          // skip errors
        }
      }
    }

    // 导入动画
    if (body.anime && Array.isArray(body.anime)) {
      for (const item of body.anime) {
        try {
          const tagIds = (item.tags || [])
            .map((t: any) => tagNameMap.get(t.name || t))
            .filter(Boolean)

          await prisma.anime.create({
            data: {
              titleCn: item.titleCn,
              titleJp: item.titleJp,
              coverUrl: item.coverUrl,
              summary: item.summary,
              studio: item.studio,
              airDate: item.airDate ? new Date(item.airDate) : null,
              totalEpisodes: item.totalEpisodes,
              watchedEpisodes: item.watchedEpisodes || 0,
              bangumiId: item.bangumiId,
              status: item.status || "WANT_TO_WATCH",
              rating: item.rating,
              notes: item.notes,
              startDate: item.startDate ? new Date(item.startDate) : null,
              finishDate: item.finishDate ? new Date(item.finishDate) : null,
              tags: tagIds.length
                ? { create: tagIds.map((id: number) => ({ tag: { connect: { id } } })) }
                : undefined,
            },
          })
          animeCount++
        } catch {
          // skip errors
        }
      }
    }

    let musicCount = 0

    // 导入音乐
    if (body.musics && Array.isArray(body.musics)) {
      for (const item of body.musics) {
        try {
          const tagIds = (item.tags || [])
            .map((t: any) => tagNameMap.get(t.name || t))
            .filter(Boolean)

          await prisma.music.create({
            data: {
              title: item.title,
              artist: item.artist || "未知歌手",
              album: item.album,
              coverUrl: item.coverUrl,
              qqMusicId: item.qqMusicId,
              playlistId: item.playlistId,
              duration: item.duration,
              status: item.status || "WANT_TO_LISTEN",
              rating: item.rating,
              notes: item.notes,
              tags: tagIds.length
                ? { create: tagIds.map((id: number) => ({ tag: { connect: { id } } })) }
                : undefined,
            },
          })
          musicCount++
        } catch {
          // skip errors
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        tagsImported: tagCount,
        booksImported: bookCount,
        animeImported: animeCount,
        musicImported: musicCount,
      },
    })
  } catch (error) {
    console.error("导入数据失败:", error)
    return NextResponse.json(
      { success: false, error: "导入数据失败，请检查文件格式" },
      { status: 500 }
    )
  }
}
