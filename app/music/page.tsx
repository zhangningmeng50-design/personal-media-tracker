"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Download, RefreshCw, Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { MainLayout } from "@/components/layout/MainLayout"
import { MusicGrid } from "@/components/music/MusicGrid"
import { MusicFilters } from "@/components/music/MusicFilters"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { Pagination } from "@/components/shared/Pagination"
import { Button } from "@/components/ui/button"
import { useMusic } from "@/hooks/useMusic"
import { useTags } from "@/hooks/useTags"
import type { Music, ImportedPlaylist, ApiResponse } from "@/lib/types"

export const dynamic = "force-dynamic"

function MusicContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    music,
    loading,
    total,
    page,
    pageSize,
    setPage,
    fetchMusic,
    updateMusic,
    deleteMusic,
  } = useMusic()
  const { tags, fetchTags } = useTags()

  const [deletingMusic, setDeletingMusic] = React.useState<Music | null>(null)
  const [playlists, setPlaylists] = React.useState<ImportedPlaylist[]>([])
  const [refreshing, setRefreshing] = React.useState<string | null>(null)

  // 筛选状态
  const status = searchParams.get("status") || ""
  const search = searchParams.get("search") || ""
  const tag = searchParams.get("tag") || ""
  const rating = searchParams.get("rating") || ""
  const sort = searchParams.get("sort") || ""

  // 加载数据
  React.useEffect(() => {
    setPage(1)
    fetchMusic({ status, search, tag, rating, sort }, 1)
    fetchTags("music")
    fetchPlaylists()
  }, [fetchMusic, fetchTags, status, search, tag, rating, sort])

  // 获取已导入歌单列表
  const fetchPlaylists = async () => {
    try {
      const { data } = await axios.get<ApiResponse<ImportedPlaylist[]>>(
        "/api/music/playlists"
      )
      if (data.success && data.data) {
        setPlaylists(data.data)
      }
    } catch {
      // silently fail
    }
  }

  // 刷新歌单
  const handleRefresh = async (playlistId: string) => {
    setRefreshing(playlistId)
    try {
      const { data } = await axios.post<ApiResponse<{ imported: number; message: string }>>(
        "/api/import/qqmusic/refresh",
        { playlistId }
      )
      if (data.success && data.data) {
        toast.success(data.data.message)
        fetchMusic({ status, search, tag, rating, sort })
        fetchPlaylists()
      } else {
        toast.error(data.error || "刷新失败")
      }
    } catch {
      toast.error("刷新失败，请检查网络")
    } finally {
      setRefreshing(null)
    }
  }

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/music?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/music")
  }

  // 快速切换状态
  const handleStatusChange = async (item: Music, newStatus: string) => {
    const result = await updateMusic(item.id, { status: newStatus as any })
    if (result) {
      fetchMusic({ status, search, tag, rating, sort })
    }
  }

  const handleDelete = async () => {
    if (!deletingMusic) return
    const success = await deleteMusic(deletingMusic.id)
    if (success) {
      toast.success("音乐已删除")
      fetchMusic({ status, search, tag, rating, sort })
      fetchPlaylists()
    } else {
      toast.error("删除失败")
    }
  }

  return (
    <MainLayout>
      <div className="max-w-[1600px] mx-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">音乐</h1>
            {search && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                搜索: &quot;{search}&quot;
              </p>
            )}
          </div>
          <Button
            onClick={() => router.push("/music/import")}
            className="gap-1"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">导入音乐</span>
          </Button>
        </div>

        {/* 已导入歌单 - 刷新区域 */}
        {playlists.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {playlists.map((pl) => (
              <div
                key={pl.playlistId}
                className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm bg-muted/30"
              >
                <span className="text-muted-foreground">
                  歌单 {pl.playlistId}
                </span>
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {pl.songCount}首
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => handleRefresh(pl.playlistId)}
                  disabled={refreshing === pl.playlistId}
                  title="刷新歌单"
                >
                  {refreshing === pl.playlistId ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* 筛选器 */}
        <MusicFilters
          currentStatus={status}
          currentTag={tag}
          currentRating={rating}
          currentSort={sort}
          tags={tags}
          onStatusChange={(v) => updateParam("status", v)}
          onTagChange={(v) => updateParam("tag", v)}
          onRatingChange={(v) => updateParam("rating", v)}
          onSortChange={(v) => updateParam("sort", v)}
          onClear={clearFilters}
        />

        {/* 音乐网格 */}
        <MusicGrid
          music={music}
          onDelete={(m) => setDeletingMusic(m)}
          loading={loading}
        />

        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onChange={(p) =>
            fetchMusic({ status, search, tag, rating, sort }, p)
          }
        />

        {/* 删除确认 */}
        <ConfirmDialog
          open={!!deletingMusic}
          onOpenChange={() => setDeletingMusic(null)}
          title="删除音乐"
          description={`确定要删除「${deletingMusic?.title}」吗？此操作不可撤销。`}
          confirmText="删除"
          variant="destructive"
          onConfirm={handleDelete}
        />
      </div>
    </MainLayout>
  )
}

export default function MusicPage() {
  return (
    <Suspense
      fallback={
        <MainLayout>
          <div className="max-w-[1600px] mx-auto p-4 lg:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="cover-container bg-muted rounded-card" />
                </div>
              ))}
            </div>
          </div>
        </MainLayout>
      }
    >
      <MusicContent />
    </Suspense>
  )
}
