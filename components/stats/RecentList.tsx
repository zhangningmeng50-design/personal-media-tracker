import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { StarRating } from "@/components/shared/StarRating"
import type { Book, Anime } from "@/lib/types"

interface RecentBooksProps {
  books: Book[]
}

interface RecentAnimeProps {
  anime: Anime[]
}

/**
 * 最近添加的书籍列表
 */
export function RecentBooks({ books }: RecentBooksProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">最近添加的书籍</CardTitle>
        <Link href="/books" className="text-sm text-primary hover:underline">查看全部</Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {books.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">暂无书籍</p>
        ) : (
          books.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="relative w-10 h-14 flex-shrink-0 rounded overflow-hidden bg-muted">
                <Image
                  src={book.coverUrl || "/placeholder-cover.svg"}
                  alt={book.title}
                  fill
                  className="object-cover"
                  unoptimized={!!book.coverUrl}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-1">{book.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={book.status} />
                  <StarRating value={book.rating} readonly size="sm" />
                </div>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  )
}

/**
 * 最近添加的动画列表
 */
export function RecentAnime({ anime }: RecentAnimeProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">最近添加的动画</CardTitle>
        <Link href="/anime" className="text-sm text-primary hover:underline">查看全部</Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {anime.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">暂无动画</p>
        ) : (
          anime.map((item) => (
            <Link
              key={item.id}
              href={`/anime/${item.id}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="relative w-10 h-14 flex-shrink-0 rounded overflow-hidden bg-muted">
                <Image
                  src={item.coverUrl || "/placeholder-cover.svg"}
                  alt={item.titleCn}
                  fill
                  className="object-cover"
                  unoptimized={!!item.coverUrl}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-1">{item.titleCn}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{item.studio || item.titleJp || ""}</p>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={item.status} />
                  <StarRating value={item.rating} readonly size="sm" />
                </div>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  )
}
