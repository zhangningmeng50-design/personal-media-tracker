"use client"

import * as React from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StatusSelect } from "@/components/shared/StatusSelect"
import { ANIME_STATUS_OPTIONS } from "@/lib/constants"
import type { Tag } from "@/lib/types"

interface AnimeFiltersProps {
  currentStatus?: string
  currentTag?: string
  currentRating?: string
  currentYear?: string
  currentSort?: string
  tags: Tag[]
  onStatusChange: (status: string) => void
  onTagChange: (tag: string) => void
  onRatingChange: (rating: string) => void
  onYearChange: (year: string) => void
  onSortChange: (sort: string) => void
  onClear: () => void
}

/**
 * 动画筛选器组件
 */
export function AnimeFilters({
  currentStatus,
  currentTag,
  currentRating,
  currentYear,
  currentSort,
  tags,
  onStatusChange,
  onTagChange,
  onRatingChange,
  onYearChange,
  onSortChange,
  onClear,
}: AnimeFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const hasActiveFilters = currentStatus || currentTag || currentRating || currentYear || currentSort

  const currentYearNum = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYearNum - i)

  return (
    <div className="space-y-2 sm:space-y-3">
      <StatusSelect
        value={currentStatus || ""}
        onChange={onStatusChange}
        options={[
          { value: "", label: "全部", color: "bg-muted text-muted-foreground" },
          ...ANIME_STATUS_OPTIONS.map((opt) => ({
            value: opt.value,
            label: opt.label,
            color: opt.color,
          })),
        ]}
      />

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
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" /> 清除
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="flex flex-wrap gap-2 sm:gap-3 p-2.5 sm:p-3 border rounded-lg bg-muted/30 animate-slide-up">
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
                  <option key={tag.id} value={tag.id.toString()}>{tag.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">播出年份</label>
            <select
              value={currentYear || ""}
              onChange={(e) => onYearChange(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">不限</option>
              {years.map((y) => (
                <option key={y} value={y.toString()}>{y}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">最低评分</label>
            <select
              value={currentRating || ""}
              onChange={(e) => onRatingChange(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">不限</option>
              {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r.toString()}>≥ {r} 星</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">排序方式</label>
            <select
              value={currentSort || ""}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="updatedAt">最近更新</option>
              <option value="createdAt">最近添加</option>
              <option value="titleCn">名称</option>
              <option value="rating">评分</option>
              <option value="airDate">播出日期</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
