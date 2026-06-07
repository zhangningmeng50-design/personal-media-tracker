"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { MoreVertical, Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { StarRating } from "@/components/shared/StarRating"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Book } from "@/lib/types"

interface BookCardProps {
  book: Book
  onEdit?: (book: Book) => void
  onDelete?: (book: Book) => void
  className?: string
  priority?: boolean
}

/**
 * 书籍卡片组件
 * 显示封面、书名、作者、状态、评分
 */
export function BookCard({ book, onEdit, onDelete, className, priority = false }: BookCardProps) {
  return (
    <Card className={cn("media-card group", className)}>
      <Link href={`/books/${book.id}`} className="block">
        {/* 封面图片 */}
        <div className="cover-container">
          <Image
            src={book.coverUrl || "/placeholder-cover.svg"}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className="object-cover"
            unoptimized={!!book.coverUrl}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            decoding={priority ? undefined : "async"}
          />
          {/* 悬停遮罩层 */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        </div>
      </Link>

      <CardContent className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
        {/* 状态标签和菜单 */}
        <div className="flex items-start justify-between gap-1">
          <StatusBadge status={book.status} />
          {(onEdit || onDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="opacity-0 group-hover:opacity-100 h-7 w-7 sm:h-6 sm:w-6 inline-flex items-center justify-center rounded hover:bg-muted transition-opacity touch:opacity-100"
                  onClick={(e) => e.preventDefault()}
                  aria-label="更多操作"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(book)}>
                    <Edit className="h-4 w-4 mr-2" />
                    编辑
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => onDelete(book)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    删除
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* 书名 */}
        <Link href={`/books/${book.id}`} className="block">
          <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 leading-tight hover:text-primary transition-colors">
            {book.title}
          </h3>
        </Link>

        {/* 作者 */}
        <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1">
          {book.author}
          {book.publisher && ` / ${book.publisher}`}
        </p>

        {/* 评分 */}
        <StarRating value={book.rating} readonly size="sm" />
      </CardContent>
    </Card>
  )
}
