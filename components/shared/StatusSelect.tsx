"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StatusOption {
  value: string
  label: string
  color: string
}

interface StatusSelectProps {
  value: string
  onChange: (value: string) => void
  options: readonly StatusOption[]
}

/**
 * 状态选择器
 * 按钮组形式，每个按钮带有不同颜色
 */
export function StatusSelect({ value, onChange, options }: StatusSelectProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2",
            value === option.value
              ? `${option.color} border-current`
              : "border-transparent bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
