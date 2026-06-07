"use client"

import * as React from "react"
import { BookCard } from "./BookCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { BookOpen } from "lucide-react"
import type { Book } from "@/lib/types"

interface BookGridProps {
  books: Book[]
  onEdit?: (book: Book) => void
  onDelete?: (book: Book) => void
  loading?: boolean
}

/**
 * 书籍网格布局
 * 响应式网格：移动端2列，平板3列，桌面4列，宽屏5列
 */
export function BookGrid({ books, onEdit, onDelete, loading = false }: BookGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="cover-container bg-muted rounded-card" />
            <div className="p-2 sm:p-3 space-y-1.5">
              <div className="h-4 sm:h-5 bg-muted rounded w-12 sm:w-16" />
              <div className="h-3 sm:h-4 bg-muted rounded w-3/4" />
              <div className="h-2.5 sm:h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <EmptyState
        icon={<BookOpen className="h-8 w-8 text-muted-foreground" />}
        title="还没有添加书籍"
        description="你可以手动添加书籍，或从豆瓣搜索导入"
      />
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
      {books.map((book, index) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
          priority={index < 4}
        />
      ))}
    </div>
  )
}
