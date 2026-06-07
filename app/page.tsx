"use client"

import * as React from "react"
import { Download, Upload, FileJson, FileSpreadsheet } from "lucide-react"
import toast from "react-hot-toast"
import { MainLayout } from "@/components/layout/MainLayout"
import { StatsOverview } from "@/components/stats/StatsOverview"
import { StatusPieChart } from "@/components/stats/StatusPieChart"
import { RecentBooks, RecentAnime } from "@/components/stats/RecentList"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import type { Stats, ApiResponse } from "@/lib/types"

/**
 * 仪表盘首页
 * 显示统计概览、状态分布和最近添加
 */
export default function DashboardPage() {
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get<ApiResponse<Stats>>("/api/stats")
        if (data.success && data.data) {
          setStats(data.data)
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  // 导出JSON
  const handleExportJSON = () => {
    window.open("/api/export/json", "_blank")
  }

  // 导出CSV
  const handleExportCSV = (type: string) => {
    window.open(`/api/export/csv?type=${type}`, "_blank")
  }

  // 导入JSON文件
  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      try {
        const text = await file.text()
        const json = JSON.parse(text)

        const { data } = await axios.post<ApiResponse<any>>("/api/import-data", json)
        if (data.success) {
          const result = data.data
          toast.success(
            `导入完成！书籍 ${result.booksImported} 本，动画 ${result.animeImported} 部，标签 ${result.tagsImported} 个`
          )
          // 刷新统计数据
          window.location.reload()
        } else {
          toast.error(data.error || "导入失败")
        }
      } catch {
        toast.error("导入失败，请检查文件格式")
      }
    }
    input.click()
  }

  return (
    <MainLayout>
      <div className="max-w-[1600px] mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* 页面标题和操作按钮 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">仪表盘</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
              阅读与观看数据概览
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">数据管理</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>导出数据</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleExportJSON}>
                <FileJson className="h-4 w-4 mr-2" /> 导出JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportCSV("books")}>
                <FileSpreadsheet className="h-4 w-4 mr-2" /> 导出书籍CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportCSV("anime")}>
                <FileSpreadsheet className="h-4 w-4 mr-2" /> 导出动画CSV
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>导入数据</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleImport}>
                <Upload className="h-4 w-4 mr-2" /> 导入JSON文件
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 统计概览 */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-card animate-pulse" />
            ))}
          </div>
        ) : stats ? (
          <>
            <StatsOverview
              bookCount={stats.bookCount}
              animeCount={stats.animeCount}
              musicCount={stats.musicCount}
              booksThisMonth={stats.booksReadThisMonth}
              animeThisMonth={stats.animeWatchedThisMonth}
              avgBookRating={stats.averageBookRating}
              avgAnimeRating={stats.averageAnimeRating}
              avgMusicRating={stats.averageMusicRating}
            />

            {/* 状态分布 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <StatusPieChart
                data={stats.bookStatusDistribution}
                title="书籍状态分布"
              />
              <StatusPieChart
                data={stats.animeStatusDistribution}
                title="动画状态分布"
              />
            </div>

            {/* 最近添加 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <RecentBooks books={stats.recentBooks} />
              <RecentAnime anime={stats.recentAnime} />
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>无法加载统计数据</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              重新加载
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
