"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { STATUS_COLOR_MAP, BOOK_STATUS_LABELS } from "@/lib/constants"
import type { BookStatus, AnimeStatus } from "@/lib/types"

interface StatusDistribution {
  status: string
  count: number
}

interface StatusPieChartProps {
  data: StatusDistribution[]
  title: string
}

/**
 * 状态分布饼图（纯CSS实现，不依赖图表库）
 */
export function StatusPieChart({ data, title }: StatusPieChartProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0)

  if (total === 0) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">暂无数据</p>
        </CardContent>
      </Card>
    )
  }

  // 计算圆形图参数
  const conicSegments = data
    .filter((d) => d.count > 0)
    .reduce((acc, d, i) => {
      const startPercent = acc.reduce((sum, a) => sum + a.percent, 0)
      const percent = (d.count / total) * 100
      acc.push({ ...d, startPercent, percent })
      return acc
    }, [] as (StatusDistribution & { startPercent: number; percent: number })[])

  const colorClasses = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-gray-400",
  ]

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* 环形图 */}
          <div className="relative w-36 h-36 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              {conicSegments.reduce((acc, seg, i) => {
                const circumference = 2 * Math.PI * 15.915
                const offset = (seg.startPercent / 100) * circumference
                const dash = (seg.percent / 100) * circumference
                acc.push(
                  <circle
                    key={i}
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke={conicSegments.length <= 1 ? "#e5e7eb" : colorClasses[i % colorClasses.length].replace("bg-", "#").replace("-500", "").replace("gray-400", "#9ca3af")}
                    strokeWidth="3"
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    strokeDashoffset={-offset}
                    className="transition-all duration-500"
                  />
                )
                return acc
              }, [] as React.ReactElement[])}
              {total > 0 && conicSegments.length <= 1 && conicSegments.map((seg, i) => (
                <circle
                  key={`fill-${i}`}
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke={colorClasses[i % colorClasses.length].replace("bg-", "#").replace("-500", "").replace("gray-400", "#9ca3af")}
                  strokeWidth="3"
                  strokeDasharray={`${(seg.percent / 100) * (2 * Math.PI * 15.915)} ${(1 - seg.percent / 100) * (2 * Math.PI * 15.915)}`}
                  strokeDashoffset="0"
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">{total}</span>
            </div>
          </div>

          {/* 图例 */}
          <div className="flex-1 space-y-2">
            {data.map((item, i) => {
              const label = BOOK_STATUS_LABELS[item.status as BookStatus] || item.status
              const percent = total > 0 ? Math.round((item.count / total) * 100) : 0
              return (
                <div key={item.status} className="flex items-center gap-2 text-sm">
                  <span className={`w-3 h-3 rounded-full ${colorClasses[i % colorClasses.length]}`} />
                  <span className="flex-1">{label}</span>
                  <span className="text-muted-foreground">{item.count} ({percent}%)</span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
