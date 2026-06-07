import * as React from "react"
import { cn } from "@/lib/utils"
import { BOOK_STATUS_LABELS, ANIME_STATUS_LABELS, MUSIC_STATUS_LABELS, STATUS_COLOR_MAP } from "@/lib/constants"
import type { BookStatus, AnimeStatus, MusicStatus } from "@/lib/types"

interface StatusBadgeProps {
  status: BookStatus | AnimeStatus | MusicStatus
  className?: string
}

/**
 * 状态标签组件
 * 不同状态显示不同颜色
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const label = BOOK_STATUS_LABELS[status as BookStatus]
    || ANIME_STATUS_LABELS[status as AnimeStatus]
    || MUSIC_STATUS_LABELS[status as MusicStatus]
    || status
  const colorClass = STATUS_COLOR_MAP[status] || "status-want"

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[11px] sm:text-xs font-medium",
        colorClass,
        className
      )}
    >
      {label}
    </span>
  )
}
