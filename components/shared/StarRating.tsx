"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  value?: number | null
  onChange?: (value: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
  maxStars?: number
}

/**
 * 星级评分组件
 * 支持1-10星评分，支持只读和交互模式
 */
export function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
  maxStars = 10,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  const [isHovering, setIsHovering] = React.useState(false)

  const sizeClasses = {
    sm: "w-3.5 h-3.5 sm:w-3 sm:h-3",
    md: "w-4 h-4 sm:w-4 sm:h-4",
    lg: "w-5 h-5 sm:w-5 sm:h-5",
  }

  const displayValue = isHovering && hoverValue !== null ? hoverValue : (value ?? null)

  const handleStarClick = (starIndex: number) => {
    if (readonly || !onChange) return
    if (value === starIndex) {
      onChange(0) // 取消评分
    } else {
      onChange(starIndex)
    }
  }

  return (
    <div
      className={cn("flex items-center gap-0.5", readonly ? "cursor-default" : "cursor-pointer")}
      onMouseLeave={() => {
        setIsHovering(false)
        setHoverValue(null)
      }}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const starIndex = i + 1
        const filled = displayValue !== null && displayValue > 0 && starIndex <= displayValue

        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            className={cn(
              "transition-colors p-0.5 sm:p-0",
              readonly ? "cursor-default" : "hover:scale-110 transition-transform",
              filled ? "text-yellow-400" : "text-muted-foreground/30"
            )}
            onClick={() => handleStarClick(starIndex)}
            onMouseEnter={() => {
              if (!readonly) {
                setIsHovering(true)
                setHoverValue(starIndex)
              }
            }}
            aria-label={`${starIndex}星`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                filled ? "fill-yellow-400" : "fill-none"
              )}
            />
          </button>
        )
      })}
      {!readonly && value && value > 0 && (
        <span className="ml-2 text-sm font-medium text-muted-foreground">
          {value}/10
        </span>
      )}
    </div>
  )
}
