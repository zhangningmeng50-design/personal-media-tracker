"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Download, RefreshCw, Loader2, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { MainLayout } from "@/components/layout/MainLayout"
import { MusicGrid } from "@/components/music/MusicGrid"
import { MusicFilters } from "@/components/music/MusicFilters"
import { AudioPlayer } from "@/components/music/AudioPlayer"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { Pagination } from "@/components/shared/Pagination"
import { Button } from "@/components/ui/button"
import { useMusic } from "@/hooks/useMusic"
import { useTags } from "@/hooks/useTags"
import { useAudioPlayer } from "@/contexts/AudioPlayerContext"
import { AVAILABILITY_OPTIONS } from "@/lib/constants"
import type { Music, ImportedPlaylist, ApiResponse, AvailabilityFilter } from "@/lib/types"

export const dynamic = "force-dynamic"

/**
 * JSONP 从浏览器调用歌单API获取 pay 字段判断VIP状态
 * 浏览器在中国能拿到完整数据（Vercel海外IP拿不到pay字段）
 */
function fetchPlaylistPayFromBrowser(playlistId: string): Promise<Map<string, boolean>> {
  return new Promise((resolve) => {
    const callbackName =
      "_qq_pl_cb_" + Date.now() + "_" + Math.random().toString(36).slice(2)
    let settled = false

    const timeoutId = setTimeout(() => {
      if (settled) return
      settled = true
      cleanup()
      resolve(new Map())
    }, 15000)

    const cleanup = () => {
      clearTimeout(timeoutId)
      delete (window as any)[callbackName]
      const el = document.getElementById(callbackName)
      if (el) el.remove()
    }

    ;(window as any)[callbackName] = (data: any) => {
      if (settled) return
      settled = true
      cleanup()
      const result = new Map<string, boolean>()
      try {
        const songs = data?.cdlist?.[0]?.songlist || []
        for (const song of songs) {
          const sid = String(song.songid || "")
          if (!sid) continue
          const pay = song.pay
          if (pay && (pay.payplay !== undefined)) {
            // payplay=1 表示VIP才能播放
            result.set(sid, pay.payplay !== 1)
          }
        }
      } catch {
        // ignore parse errors
      }
      resolve(result)
    }

    const script = document.createElement("script")
    script.id = callbackName
    script.src = `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=${encodeURIComponent(playlistId)}&callback=${callbackName}`
    script.onerror = () => {
      if (settled) return
      settled = true
      cleanup()
      resolve(new Map())
    }
    document.head.appendChild(script)
  })
}

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
  const { playQueue } = useAudioPlayer()

  const [deletingMusic, setDeletingMusic] = React.useState<Music | null>(null)
  const [playlists, setPlaylists] = React.useState<ImportedPlaylist[]>([])
  const [refreshing, setRefreshing] = React.useState<string | null>(null)
  const [deletingPlaylist, setDeletingPlaylist] = React.useState<string | null>(null)

  // 筛选状态
  const status = searchParams.get("status") || ""
  const search = searchParams.get("search") || ""
  const tag = searchParams.get("tag") || ""
  const rating = searchParams.get("rating") || ""
  const availability = (searchParams.get("availability") || "") as AvailabilityFilter
  const sort = searchParams.get("sort") || ""

  // 加载数据
  React.useEffect(() => {
    setPage(1)
    fetchMusic({ status, search, tag, rating, availability, sort }, 1)
    fetchTags("music")
    fetchPlaylists()
  }, [fetchMusic, fetchTags, status, search, tag, rating, availability, sort])

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

  // 播放处理
  const handlePlay = (track: Music) => {
    // 仅将确认免费的歌曲加入播放队列
    const playableTracks = music
      .filter((m) => m.canPlayFull === true)
      .map((m) => ({
        musicId: m.id,
        title: m.title,
        artist: m.artist,
        coverUrl: m.coverUrl,
        qqMusicMid: m.qqMusicMid,
        duration: m.duration,
      }))
    const startIndex = playableTracks.findIndex((t) => t.musicId === track.id)
    playQueue(playableTracks, startIndex >= 0 ? startIndex : 0)
  }

  // 刷新歌单
  const handleRefresh = async (playlistId: string) => {
    setRefreshing(playlistId)
    try {
      const { data } = await axios.post<
        ApiResponse<{
          imported: number
          updated: number
          totalSongs: number
          payAvailable: boolean
          payVipCount: number
          payFreeCount: number
          message: string
        }>
      >("/api/import/qqmusic/refresh", { playlistId })

      if (data.success && data.data) {
        const result = data.data

        // 服务端拿不到 pay 数据时，浏览器端JSONP获取（中国IP能看到）
        if (!result.payAvailable && result.totalSongs > 0) {
          toast.loading("正在从浏览器检测VIP状态...", { id: "vip-check" })

          const payMap = await fetchPlaylistPayFromBrowser(playlistId)

          if (payMap.size > 0) {
            // 获取所有歌曲，匹配 qqMusicId → db id
            const { data: listData } = await axios.get<ApiResponse<Music[]>>(
              "/api/music?pageSize=2000"
            )
            const allSongs = listData.data || []

            const updates: { id: number; canPlayFull: boolean }[] = []
            for (const song of allSongs) {
              if (song.qqMusicId && payMap.has(song.qqMusicId)) {
                updates.push({
                  id: song.id,
                  canPlayFull: payMap.get(song.qqMusicId)!,
                })
              }
            }

            if (updates.length > 0) {
              await axios.post("/api/music/update-availability", { updates })
              const freeCount = updates.filter((u) => u.canPlayFull).length
              const vipCount = updates.filter((u) => !u.canPlayFull).length
              toast.success(
                `${result.message}，检测完成：${freeCount}首免费 ${vipCount}首VIP`,
                { id: "vip-check" }
              )
            } else {
              toast.success(result.message, { id: "vip-check" })
            }
          } else {
            toast.success(result.message + "（VIP状态需点击播放时检测）", {
              id: "vip-check",
            })
          }
        } else if (result.payAvailable) {
          // 服务端拿到了 pay 数据，直接显示结果
          toast.success(
            `${result.message}，${result.payFreeCount}首免费 ${result.payVipCount}首VIP`
          )
        } else {
          toast.success(result.message)
        }

        fetchMusic({ status, search, tag, rating, availability, sort })
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

  const handleDeletePlaylist = async () => {
    if (!deletingPlaylist) return
    try {
      const { data } = await axios.delete<ApiResponse<{ deleted: number }>>(
        `/api/music/playlists?playlistId=${deletingPlaylist}`
      )
      if (data.success && data.data) {
        toast.success(`已删除 ${data.data.deleted} 首歌曲`)
        fetchMusic({ status, search, tag, rating, availability, sort })
        fetchPlaylists()
      } else {
        toast.error(data.error || "删除失败")
      }
    } catch {
      toast.error("删除失败，请检查网络")
    }
  }

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    // 切换筛选时重置分页
    if (key !== "page") {
      params.delete("page")
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
      fetchMusic({ status, search, tag, rating, availability, sort })
    }
  }

  const handleDelete = async () => {
    if (!deletingMusic) return
    const success = await deleteMusic(deletingMusic.id)
    if (success) {
      toast.success("音乐已删除")
      fetchMusic({ status, search, tag, rating, availability, sort })
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
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                  onClick={() => setDeletingPlaylist(pl.playlistId)}
                  title="删除歌单"
                >
                  <Trash2 className="h-3.5 w-3.5" />
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

        {/* 可播放性筛选标签 + VIP检测按钮 */}
        <div className="flex items-center gap-1.5">
          {AVAILABILITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam("availability", opt.value)}
              className={`px-3 py-1 rounded-full text-xs sm:text-sm transition-colors ${
                availability === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* 音乐网格 */}
        <MusicGrid
          music={music}
          onDelete={(m) => setDeletingMusic(m)}
          onPlay={handlePlay}
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

        {/* 删除音乐确认 */}
        <ConfirmDialog
          open={!!deletingMusic}
          onOpenChange={() => setDeletingMusic(null)}
          title="删除音乐"
          description={`确定要删除「${deletingMusic?.title}」吗？此操作不可撤销。`}
          confirmText="删除"
          variant="destructive"
          onConfirm={handleDelete}
        />

        {/* 删除歌单确认 */}
        <ConfirmDialog
          open={!!deletingPlaylist}
          onOpenChange={() => setDeletingPlaylist(null)}
          title="删除歌单"
          description={`确定要删除歌单「${deletingPlaylist}」中的所有歌曲吗？此操作不可撤销。`}
          confirmText="全部删除"
          variant="destructive"
          onConfirm={handleDeletePlaylist}
        />

        {/* 底部播放器 */}
        <AudioPlayer />
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
