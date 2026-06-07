/**
 * 导出本地 SQLite 数据为 JSON
 * 用法: npx tsx scripts/export-sqlite.ts > export.json
 */

import { PrismaClient } from "@prisma/client"

const sqlite = new PrismaClient({
  datasources: { db: { url: "file:./prisma/prisma/media-tracker.db" } },
})

async function exportData() {
  // 导出标签
  const tags = await sqlite.tag.findMany()

  // 导出书籍（含标签）
  const books = await sqlite.book.findMany({
    include: { tags: { include: { tag: true } } },
  })
  const booksOut = books.map((b) => ({
    ...b,
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
    startDate: b.startDate?.toISOString() ?? null,
    finishDate: b.finishDate?.toISOString() ?? null,
    tags: b.tags.map((bt) => bt.tag),
  }))

  // 导出动��（含标签）
  const animes = await sqlite.anime.findMany({
    include: { tags: { include: { tag: true } } },
  })
  const animesOut = animes.map((a) => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    airDate: a.airDate?.toISOString() ?? null,
    startDate: a.startDate?.toISOString() ?? null,
    finishDate: a.finishDate?.toISOString() ?? null,
    tags: a.tags.map((at) => at.tag),
  }))

  // 导出音乐（含标签）
  const musics = await sqlite.music.findMany({
    include: { tags: { include: { tag: true } } },
  })
  const musicsOut = musics.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
    updatedAt: m.updatedAt.toISOString(),
    tags: m.tags.map((mt) => mt.tag),
  }))

  const result = {
    tags,
    books: booksOut,
    anime: animesOut,
    musics: musicsOut,
  }

  console.log(JSON.stringify(result))
}

exportData()
  .catch(console.error)
  .finally(() => sqlite.$disconnect())
