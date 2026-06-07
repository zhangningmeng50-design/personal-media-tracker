"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Download, RefreshCw, Loader2, Trash2, ShieldCheck } from "lucide-react"
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

// ============ 浏览器端批量 VIP 检测（JSONP 直连 u.y.qq.com，无 Referer 限制）============

const VIP_BATCH_SIZE = 50 // 每次 JSONP 请求最多 50 首歌

interface VipCheckItem {
  id: number
  qqMusicMid: string
}

interface VipCheckResult {
  id: number
  canPlayFull: boolean
}

/**
 * 单批 JSONP 请求：传入 songmids，返回每个 songmid 的 purl 信息
 */
function fetchVkeyBatchJsonp(songmids: string[]): Promise<any | null> {
  return new Promise((resolve) => {
    const callbackName =
      "_qqmusic_vip_" + Date.now() + "_" + Math.random().toString(36).slice(2)
    let settled = false

    const timeoutId = setTimeout(() => {
      if (settled) return
      settled = true
      cleanup()
      resolve(null)
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
      resolve(data)
    }

    const params = {
      req_0: {
        module: "vkey.GetVkeyServer",
        method: "CgiGetVkey",
        param: {
          guid: "0",
          songmid: songmids,
          songtype: Array(songmids.length).fill(0),
          uin: "0",
          loginflag: 1,
          platform: "20",
        },
      },
    }
    const dataParam = encodeURIComponent(JSON.stringify(params))
    const script = document.createElement("script")
    script.id = callbackName
    script.src = `https://u.y.qq.com/cgi-bin/musicu.fcg?callback=${callbackName}&format=jsonp&data=${dataParam}`
    script.onerror = () => {
      if (settled) return
      settled = true
      cleanup()
      resolve(null)
    }
    document.head.appendChild(script)
  })
}

/**
 * 浏览器端批量检测 VIP 状态
 * - 调用 u.y.qq.com vkey API（无 Referer 限制，浏览器直连）
 * - purl 非空 → 免费完整播放 (canPlayFull = true)
 * - purl 为空 → VIP 不可完整播放 (canPlayFull = false)
 */
async function batchCheckVipJsonp(
  songs: VipCheckItem[],
  onProgress?: (checked: number, total: number) => void
): Promise<VipCheckResult[]> {
  const results: VipCheckResult[] = []

  for (let i = 0; i < songs.length; i += VIP_BATCH_SIZE) {
    const batch = songs.slice(i, i + VIP_BATCH_SIZE)
    const songmids = batch.map((s) => s.qqMusicMid)

    const data = await fetchVkeyBatchJsonp(songmids)

    if (data) {
      // 构建 songmid → purl 映射
      const midurlinfo = data?.req_0?.data?.midurlinfo || []
      const infoMap = new Map<string, string>()
      for (const info of midurlinfo) {
        if (info.songmid) {
          infoMap.set(info.songmid, info.purl || "")
        }
      }

      for (const song of batch) {
        const purl = infoMap.get(song.qqMusicMid)
        if (purl !== undefined) {
          // purl 非空字符串 → 免费完整播放
          results.push({
            id: song.id,
            canPlayFull: purl.length > 0,
          })
        }
      }
    }

    onProgress?.(Math.min(i + VIP_BATCH_SIZE, songs.length), songs.length)
  }

  return results
}

// ============ 页面组件 ============

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
  const [checkingVip, setCheckingVip] = React.useState(false)
  const [vipProgress, setVipProgress] = React.useState("")

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

  // ============ 浏览器端 VIP 检测 ============

  const handleCheckVip = async () => {
    setCheckingVip(true)
    setVipProgress("正在获取歌曲列表...")

    try {
      // 1. 从服务端获取所有需要检测的歌曲（id + qqMusicMid）
      const { data: songsData } = await axios.get<
        ApiResponse<VipCheckItem[]>
      >("/api/music/for-vip-check")

      if (!songsData.success || !songsData.data?.length) {
        toast.error("没有需要检测的歌曲（请先刷新歌单获取歌曲MID）")
        return
      }

      const songs = songsData.data
      setVipProgress(`正在检测 0/${songs.length}...`)

      // 2. 浏览器端 JSONP 批量检测（u.y.qq.com 无 Referer 限制）
      const results = await batchCheckVipJsonp(songs, (checked, total) => {
        setVipProgress(`正在检测 ${checked}/${total}...`)
      })

      if (results.length === 0) {
        toast.error("VIP检测失败：无法获取歌曲播放信息，请稍后重试")
        return
      }

      // 3. 批量写入数据库（分批 POST，每批 50 首）
      const DB_BATCH = 50
      for (let i = 0; i < results.length; i += DB_BATCH) {
        const chunk = results.slice(i, i + DB_BATCH)
        await axios.post("/api/music/update-availability", {
          updates: chunk.map((r) => ({ id: r.id, canPlayFull: r.canPlayFull })),
        })
      }

      const freeCount = results.filter((r) => r.canPlayFull).length
      const vipCount = results.length - freeCount
      toast.success(`VIP检测完成：${freeCount}首免费，${vipCount}首VIP`)

      // 4. 刷新页面数据
      fetchMusic({ status, search, tag, rating, availability, sort })
    } catch {
      toast.error("VIP检测失败，请检查网络")
    } finally {
      setCheckingVip(false)
      setVipProgress("")
    }
  }

  // 刷新歌单（服务端同步歌曲 + 自动触发浏览器端 VIP 检测）
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
        toast.success(data.data.message)
        fetchMusic({ status, search, tag, rating, availability, sort })
        fetchPlaylists()

        // 自动触发浏览器端 VIP 检测（Vercel 服务端拿不到 pay 字段）
        if (data.data.totalSongs > 0 && !data.data.payAvailable) {
          // 延迟一小段时间让 toast 先显示，然后自动检测
          setTimeout(() => handleCheckVip(), 500)
        }
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
        <div className="flex items-center gap-1.5 flex-wrap">
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
          <div className="w-px h-5 bg-border mx-1" />
          <Button
            size="sm"
            variant="outline"
            onClick={handleCheckVip}
            disabled={checkingVip}
            className="gap-1 h-7 text-xs"
            title="通过浏览器直连QQ音乐检测VIP状态"
          >
            {checkingVip ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <ShieldCheck className="h-3 w-3" />
            )}
            {checkingVip ? (vipProgress || "检测中...") : "检测VIP"}
          </Button>
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
