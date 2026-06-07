import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TagBadgeProps {
  name: string
  color: string
  onRemove?: () => void
  onClick?: () => void
  className?: string
}

/**
 * 标签徽章组件
 * 显示彩色标签，可选移除按钮
 */
export function TagBadge({ name, color, onRemove, onClick, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium text-white transition-opacity",
        onClick && "cursor-pointer hover:opacity-80",
        className
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {name}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="hover:bg-white/20 rounded-full p-0.5"
          aria-label={`移除标签${name}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
}
