"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onChange: (page: number) => void
}

/**
 * 分页控件
 */
export function Pagination({ page, pageSize, total, onChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  if (totalPages <= 1) return null

  const pages: (number | "...")[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (page > 3) pages.push("...")
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i)
    }
    if (page < totalPages - 2) pages.push("...")
    pages.push(totalPages)
  }

  return (
    <div className="flex items-center justify-between pt-4 gap-2">
      <p className="text-xs sm:text-sm text-muted-foreground">
        <span className="hidden sm:inline">共 {total} 条，第 {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} 条</span>
        <span className="sm:hidden">{page}/{totalPages} 页</span>
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          className="h-8 w-8 sm:h-9 sm:w-auto sm:min-w-[40px]"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {/* 桌面端显示页码按钮 */}
        <span className="hidden sm:flex items-center gap-1">
          {pages.map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="px-2 text-sm text-muted-foreground">
                ...
              </span>
            ) : (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="sm"
                className={cn("min-w-[36px]", p === page && "pointer-events-none")}
                onClick={() => onChange(p as number)}
              >
                {p}
              </Button>
            )
          )}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          className="h-8 w-8 sm:h-9 sm:w-auto sm:min-w-[40px]"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
