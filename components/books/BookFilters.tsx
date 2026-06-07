"use client"

import * as React from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StatusSelect } from "@/components/shared/StatusSelect"
import { BOOK_STATUS_OPTIONS } from "@/lib/constants"
import type { Tag } from "@/lib/types"

interface BookFiltersProps {
  currentStatus?: string
  currentTag?: string
  currentRating?: string
  currentSort?: string
  tags: Tag[]
  onStatusChange: (status: string) => void
  onTagChange: (tag: string) => void
  onRatingChange: (rating: string) => void
  onSortChange: (sort: string) => void
  onClear: () => void
}

/**
 * 书籍筛选器组件
 */
export function BookFilters({
  currentStatus,
  currentTag,
  currentRating,
  currentSort,
  tags,
  onStatusChange,
  onTagChange,
  onRatingChange,
  onSortChange,
  onClear,
}: BookFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const hasActiveFilters = currentStatus || currentTag || currentRating || currentSort

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* 状态筛选按钮组 */}
      <StatusSelect
        value={currentStatus || ""}
        onChange={onStatusChange}
        options={[
          { value: "", label: "全部", color: "bg-muted text-muted-foreground" },
          ...BOOK_STATUS_OPTIONS.map((opt) => ({
            value: opt.value,
            label: opt.label,
            color: opt.color,
          })),
        ]}
      />

      {/* 更多筛选 */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={cn("h-8 sm:h-9 text-xs sm:text-sm", isOpen ? "bg-muted" : "")}
        >
          <SlidersHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
          筛选
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 sm:h-9 text-xs sm:text-sm text-muted-foreground"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
            清除
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="flex flex-wrap gap-2 sm:gap-3 p-2.5 sm:p-3 border rounded-lg bg-muted/30 animate-slide-up">
          {/* 标签筛选 */}
          {tags.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">标签</label>
              <select
                value={currentTag || ""}
                onChange={(e) => onTagChange(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">全部标签</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id.toString()}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 评分筛选 */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">最低评分</label>
            <select
              value={currentRating || ""}
              onChange={(e) => onRatingChange(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">不限</option>
              {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r.toString()}>
                  ≥ {r} 星
                </option>
              ))}
            </select>
          </div>

          {/* 排序 */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">排序方式</label>
            <select
              value={currentSort || ""}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="updatedAt">最近更新</option>
              <option value="createdAt">最近添加</option>
              <option value="title">书名</option>
              <option value="rating">评分</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
