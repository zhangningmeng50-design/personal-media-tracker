/**
 * 数据迁移脚本：SQLite → PostgreSQL
 *
 * 用法：
 *   1. 先确保 PostgreSQL 可用，设置 DATABASE_URL 和 DIRECT_URL
 *   2. npx tsx scripts/migrate-to-postgres.ts
 *
 * 这会把本地 SQLite 里的所有数据复制到 PostgreSQL。
 */

import { PrismaClient as SQLiteClient } from "@prisma/client"

// 动态创建指向 SQLite 的 Prisma 客户端
const sqlite = new SQLiteClient({
  datasources: {
    db: { url: "file:./prisma/media-tracker.db" },
  },
})

// 用环境变量里的 PostgreSQL 连接
const { prisma: pg } = await import("../lib/prisma")

async function migrate() {
  console.log("开始迁移数据...")

  // 1. 迁移标签
  console.log("\n📌 迁移标签...")
  const tags = await sqlite.tag.findMany()
  for (const t of tags) {
    await pg.tag.upsert({
      where: { name: t.name },
      create: { name: t.name, color: t.color, createdAt: t.createdAt },
      update: { color: t.color },
    })
  }
  console.log(`   ✅ ${tags.length} 个标签已迁移`)

  // 2. 迁移书籍
  console.log("\n📚 迁移书籍...")
  const books = await sqlite.book.findMany({ include: { tags: true } })
  const pgTags = await pg.tag.findMany()
  const tagMap = new Map(pgTags.map((t) => [t.name, t.id]))

  for (const b of books) {
    await pg.book.create({
      data: {
        title: b.title,
        author: b.author,
        publisher: b.publisher,
        publishYear: b.publishYear,
        isbn: b.isbn,
        coverUrl: b.coverUrl,
        description: b.description,
        status: b.status,
        rating: b.rating,
        notes: b.notes,
        startDate: b.startDate,
        finishDate: b.finishDate,
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
        tags: {
          create: b.tags
            .filter((bt) => tagMap.has(bt.tag?.name ?? ""))
            .map((bt) => ({ tagId: tagMap.get(bt.tag?.name ?? "")! })),
        },
      },
    })
  }
  console.log(`   ✅ ${books.length} 本书籍已迁移`)
  console.log("   ⚠️ BookTag 关联需手动处理（如需要）")

  // 3. 迁移动画
  console.log("\n🎬 迁移动画...")
  const animes = await sqlite.anime.findMany({ include: { tags: true } })
  for (const a of animes) {
    await pg.anime.create({
      data: {
        titleCn: a.titleCn,
        titleJp: a.titleJp,
        coverUrl: a.coverUrl,
        summary: a.summary,
        studio: a.studio,
        airDate: a.airDate,
        totalEpisodes: a.totalEpisodes,
        watchedEpisodes: a.watchedEpisodes,
        bangumiId: a.bangumiId,
        status: a.status,
        rating: a.rating,
        notes: a.notes,
        startDate: a.startDate,
        finishDate: a.finishDate,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      },
    })
  }
  console.log(`   ✅ ${animes.length} 部动画已迁移`)

  // 4. 迁移音乐
  console.log("\n🎵 迁移音乐...")
  const musics = await sqlite.music.findMany({ include: { tags: true } })
  for (const m of musics) {
    await pg.music.create({
      data: {
        title: m.title,
        artist: m.artist,
        album: m.album,
        coverUrl: m.coverUrl,
        qqMusicId: m.qqMusicId,
        playlistId: m.playlistId,
        duration: m.duration,
        status: m.status,
        rating: m.rating,
        notes: m.notes,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
      },
    })
  }
  console.log(`   ✅ ${musics.length} 首音乐已迁移`)

  console.log("\n🎉 迁移完成！")
}

migrate()
  .catch(console.error)
  .finally(() => {
    sqlite.$disconnect()
    pg.$disconnect()
  })
