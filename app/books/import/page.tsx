"use client"

import * as React from "react"
import { Search, Download, Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import Image from "next/image"
import axios from "axios"
import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/EmptyState"
import type { ApiResponse } from "@/lib/types"

interface DoubanResult {
  id: string
  title: string
  author: string
  coverUrl?: string
  rating?: number
  year?: string
}

/**
 * 豆瓣图书导入页面
 */
export default function BookImportPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searching, setSearching] = React.useState(false)
  const [results, setResults] = React.useState<DoubanResult[]>([])
  const [importing, setImporting] = React.useState<Set<string>>(new Set())

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setSearching(true)
    try {
      const { data } = await axios.get<ApiResponse<DoubanResult[]>>(
        `/api/import/zlib/search?q=${encodeURIComponent(searchQuery.trim())}&limit=15`
      )
      if (data.success && data.data) {
        setResults(data.data)
        if (data.data.length === 0) {
          toast("未找到匹配的书籍，请尝试其他关键词")
        }
      } else {
        toast.error(data.error || "搜索失败")
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "搜索失败，请检查网络连接")
    } finally {
      setSearching(false)
    }
  }

  const handleImport = async (item: DoubanResult) => {
    setImporting((prev) => new Set(prev).add(item.id))
    try {
      // 先获取详情
      let detail: any = {}
      try {
        const detailRes = await axios.get(`/api/import/zlib/detail?id=${item.id}`)
        if (detailRes.data.success && detailRes.data.data) {
          detail = detailRes.data.data
        }
      } catch {
        // 详情获取失败不影响导入
      }

      const postData = {
        title: detail.title || item.title,
        author: detail.author || item.author || "未知作者",
        publisher: detail.publisher || null,
        publishYear: detail.publishYear || (item.year ? parseInt(item.year) : null),
        isbn: detail.isbn || null,
        coverUrl: detail.coverUrl || item.coverUrl || null,
        description: detail.description || null,
        rating: detail.rating || item.rating || null,
      }

      const { data } = await axios.post<ApiResponse<any>>("/api/books", postData)
      if (data.success) {
        toast.success(`已导入: ${postData.title}`)
      } else {
        toast.error("导入失败")
      }
    } catch {
      toast.error("导入时出错")
    } finally {
      setImporting((prev) => {
        const next = new Set(prev)
        next.delete(item.id)
        return next
      })
    }
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">导入书籍</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">从豆瓣搜索并导入书籍信息</p>
        </div>

        {/* 搜索 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="搜索书名、作者或ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={searching}>
                {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                <span className="ml-1">搜索</span>
              </Button>
            </div>

            {/* 搜索结果 */}
            {results.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">找到 {results.length} 个结果</p>
                {results.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30"
                  >
                    <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden bg-muted">
                      {item.coverUrl ? (
                        <Image
                          src={item.coverUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          无封面
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {item.author || "未知作者"}
                        {item.year && ` · ${item.year}`}
                      </p>
                      {item.rating && (
                        <p className="text-xs text-yellow-600">★ {item.rating}</p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleImport(item)}
                      disabled={importing.has(item.id)}
                    >
                      {importing.has(item.id) ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      <span className="ml-1 hidden sm:inline">导入</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {!searching && results.length === 0 && searchQuery && (
              <EmptyState
                title="未找到结果"
                description="请尝试其他关键词"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
