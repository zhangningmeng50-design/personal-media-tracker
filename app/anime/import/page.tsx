"use client"

import * as React from "react"
import { Search, Download, Loader2, Check, AlertCircle } from "lucide-react"
import toast from "react-hot-toast"
import Image from "next/image"
import axios from "axios"
import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/EmptyState"
import type { BangumiSearchResult, BangumiCollectionItem, ApiResponse } from "@/lib/types"
import { bangumiTypeToStatus, bangumiRateToRating } from "@/lib/constants"

/**
 * Bangumi动画导入页面
 * 支持搜索导入和收藏列表导入
 */
export default function AnimeImportPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searching, setSearching] = React.useState(false)
  const [results, setResults] = React.useState<BangumiSearchResult[]>([])
  const [importing, setImporting] = React.useState<Set<number>>(new Set())

  // 收藏列表导入
  const [username, setUsername] = React.useState("")
  const [collections, setCollections] = React.useState<BangumiCollectionItem[]>([])
  const [loadingCollections, setLoadingCollections] = React.useState(false)
  const [importedCollections, setImportedCollections] = React.useState<Set<number>>(new Set())

  // 搜索动画
  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setSearching(true)
    try {
      const { data } = await axios.get<ApiResponse<BangumiSearchResult[]>>(
        `/api/import/bangumi/search?q=${encodeURIComponent(searchQuery.trim())}&limit=10`
      )
      if (data.success && data.data) {
        setResults(data.data)
      } else {
        toast.error(data.error || "搜索失败")
      }
    } catch {
      toast.error("搜索失败，请检查网络连接")
    } finally {
      setSearching(false)
    }
  }

  // 导入单个动画
  const handleImport = async (item: BangumiSearchResult) => {
    setImporting((prev) => new Set(prev).add(item.id))
    try {
      const { data } = await axios.post<ApiResponse<any>>("/api/anime", {
        titleCn: item.name_cn || item.name,
        titleJp: item.name_cn ? item.name : null,
        coverUrl: item.image || null,
        summary: item.summary || null,
        airDate: item.air_date ? new Date(item.air_date).toISOString() : null,
        totalEpisodes: item.eps || null,
        status: "WANT_TO_WATCH",
      })
      if (data.success) {
        toast.success(`已导入: ${item.name_cn || item.name}`)
      } else {
        toast.error("导入失败")
      }
    } catch {
      toast.error("导入失败")
    } finally {
      setImporting((prev) => {
        const next = new Set(prev)
        next.delete(item.id)
        return next
      })
    }
  }

  // 获取收藏列表
  const handleLoadCollections = async () => {
    if (!username.trim()) return
    setLoadingCollections(true)
    const loadingToast = toast.loading("正在获取收藏列表...")
    try {
      const { data } = await axios.get<ApiResponse<BangumiCollectionItem[]>>(
        `/api/import/bangumi/collection?username=${encodeURIComponent(username.trim())}`,
        { timeout: 60000 } // 大量收藏需要较长时间
      )
      toast.dismiss(loadingToast)
      if (data.success && data.data) {
        setCollections(data.data)
        toast.success(`获取到${data.data.length}条收藏记录`)
      } else {
        toast.error(data.error || "获取收藏失败")
      }
    } catch {
      toast.dismiss(loadingToast)
      toast.error("获取收藏失败，请检查用户名是否正确")
    } finally {
      setLoadingCollections(false)
    }
  }

  // 导入单个收藏项
  const handleImportCollection = async (item: BangumiCollectionItem) => {
    setImportedCollections((prev) => new Set(prev).add(item.subject_id))
    try {
      const status = bangumiTypeToStatus(item.type)
      const rating = bangumiRateToRating(item.rate)
      const sub = item.subject

      const { data } = await axios.post<ApiResponse<any>>("/api/anime", {
        titleCn: sub.name_cn || sub.name,
        titleJp: sub.name_cn ? sub.name : null,
        coverUrl: sub.images?.large || sub.images?.common || null,
        airDate: sub.air_date ? new Date(sub.air_date).toISOString() : null,
        totalEpisodes: sub.eps || null,
        bangumiId: sub.id,
        status,
        rating,
      })
      if (data.success) {
        toast.success(`已导入: ${sub.name_cn || sub.name}`)
      }
    } catch {
      toast.error("导入失败")
    } finally {
      setImportedCollections((prev) => {
        const next = new Set(prev)
        next.delete(item.subject_id)
        return next
      })
    }
  }

  // 批量导入所有收藏
  const handleImportAll = async () => {
    let count = 0
    for (const item of collections) {
      const status = bangumiTypeToStatus(item.type)
      const rating = bangumiRateToRating(item.rate)
      const sub = item.subject
      try {
        await axios.post("/api/anime", {
          titleCn: sub.name_cn || sub.name,
          titleJp: sub.name_cn ? sub.name : null,
          coverUrl: sub.images?.large || sub.images?.common || null,
          airDate: sub.air_date ? new Date(sub.air_date).toISOString() : null,
          totalEpisodes: sub.eps || null,
          bangumiId: sub.id,
          status,
          rating,
        })
        count++
      } catch {
        // skip errors in batch
      }
    }
    toast.success(`成功导入${count}个动画`)
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">导入动画</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">从Bangumi搜索并导入动画信息</p>
        </div>

        {/* 搜索导入 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="font-semibold">搜索导入</h2>
            <div className="flex gap-2">
              <Input
                placeholder="搜索动画名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={searching}>
                {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                <span className="ml-1 hidden sm:inline">搜索</span>
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
                    <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden bg-muted">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name_cn || item.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-1">
                        {item.name_cn || item.name}
                      </h3>
                      {item.name_cn && (
                        <p className="text-xs text-muted-foreground line-clamp-1">{item.name}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.air_date && `${item.air_date}`}
                        {item.eps && ` · ${item.eps}集`}
                      </p>
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
              <EmptyState title="未找到结果" description="尝试其他关键词" />
            )}
          </CardContent>
        </Card>

        {/* 收藏列表导入 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="font-semibold">从Bangumi收藏列表导入</h2>
            <div className="flex gap-2">
              <Input
                placeholder="输入Bangumi用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLoadCollections()}
                className="flex-1"
              />
              <Button onClick={handleLoadCollections} disabled={loadingCollections}>
                {loadingCollections ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                <span className="ml-1 hidden sm:inline">获取收藏</span>
              </Button>
            </div>

            {collections.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {collections.length} 条收藏记录
                  </p>
                  <Button size="sm" onClick={handleImportAll}>
                    一键全部导入
                  </Button>
                </div>
                <div className="max-h-[400px] overflow-y-auto space-y-2">
                  {collections.map((item) => {
                    const sub = item.subject
                    const isDone = importedCollections.has(item.subject_id)
                    return (
                      <div
                        key={item.subject_id}
                        className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30"
                      >
                        <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden bg-muted">
                          {sub.images?.common && (
                            <Image
                              src={sub.images.common}
                              alt={sub.name_cn || sub.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm line-clamp-1">
                            {sub.name_cn || sub.name}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {sub.name_cn ? sub.name : ""}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant={isDone ? "outline" : "default"}
                          onClick={() => handleImportCollection(item)}
                          disabled={isDone}
                        >
                          {isDone ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
