"use client"

import * as React from "react"
import { Search, Download, Loader2, Music, ExternalLink } from "lucide-react"
import toast from "react-hot-toast"
import Image from "next/image"
import axios from "axios"
import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/EmptyState"
import type { QQMusicSong, ApiResponse } from "@/lib/types"

interface PlaylistData {
  playlistId: string
  playlistName: string
  songs: QQMusicSong[]
}

interface SearchData {
  songs: QQMusicSong[]
  keyword: string
}

/**
 * QQ音乐导入页面
 */
export default function MusicImportPage() {
  // 歌单导入
  const [playlistId, setPlaylistId] = React.useState("")
  const [loadingPlaylist, setLoadingPlaylist] = React.useState(false)
  const [playlistData, setPlaylistData] = React.useState<PlaylistData | null>(null)
  const [importing, setImporting] = React.useState<Set<string>>(new Set())

  // 搜索导入
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searching, setSearching] = React.useState(false)
  const [searchResults, setSearchResults] = React.useState<QQMusicSong[]>([])

  // 从歌单链接中提取ID
  const extractPlaylistId = (input: string): string => {
    // 支持直接输入ID或粘贴完整链接
    // https://y.qq.com/n/ryqq/playlist/123456
    const match = input.match(/playlist\/(\d+)/)
    if (match) return match[1]
    // 纯数字就是ID
    if (/^\d+$/.test(input.trim())) return input.trim()
    return input.trim()
  }

  // 获取歌单
  const handleLoadPlaylist = async () => {
    if (!playlistId.trim()) return
    const id = extractPlaylistId(playlistId)
    setLoadingPlaylist(true)
    try {
      const { data } = await axios.get<ApiResponse<PlaylistData>>(
        `/api/import/qqmusic/playlist?id=${encodeURIComponent(id)}`
      )
      if (data.success && data.data) {
        setPlaylistData(data.data)
        toast.success(`获取到 ${data.data.songs.length} 首歌曲`)
      } else {
        toast.error(data.error || "获取歌单失败")
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "获取歌单失败")
    } finally {
      setLoadingPlaylist(false)
    }
  }

  // 导入单首歌曲（从歌单）
  const handleImportSong = async (song: QQMusicSong) => {
    setImporting((prev) => new Set(prev).add(song.songid))
    try {
      const { data } = await axios.post<ApiResponse<any>>("/api/music", {
        title: song.songname,
        artist: song.singer,
        album: song.albumname || null,
        coverUrl: song.albummid
          ? `https://y.qq.com/music/photo_new/T002R300x300M000${song.albummid}.jpg`
          : null,
        qqMusicId: song.songid,
        playlistId: playlistData?.playlistId || null,
        duration: song.interval || null,
      })
      if (data.success) {
        toast.success(`已导入: ${song.songname}`)
      } else {
        toast.error("导入失败")
      }
    } catch {
      toast.error("导入失败")
    } finally {
      setImporting((prev) => {
        const next = new Set(prev)
        next.delete(song.songid)
        return next
      })
    }
  }

  // 一键导入歌单全部歌曲
  const handleImportAll = async () => {
    if (!playlistData) return
    let count = 0
    for (const song of playlistData.songs) {
      try {
        await axios.post("/api/music", {
          title: song.songname,
          artist: song.singer,
          album: song.albumname || null,
          coverUrl: song.albummid
            ? `https://y.qq.com/music/photo_new/T002R300x300M000${song.albummid}.jpg`
            : null,
          qqMusicId: song.songid,
          playlistId: playlistData.playlistId,
          duration: song.interval || null,
        })
        count++
      } catch {
        // skip errors in batch
      }
    }
    toast.success(`成功导入${count}首歌曲`)
  }

  // 搜索
  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setSearching(true)
    try {
      const { data } = await axios.get<ApiResponse<SearchData>>(
        `/api/import/qqmusic/search?q=${encodeURIComponent(searchQuery.trim())}`
      )
      if (data.success && data.data) {
        setSearchResults(data.data.songs)
        if (data.data.songs.length === 0) {
          toast("未找到匹配的歌曲")
        }
      } else {
        toast.error(data.error || "搜索失败")
      }
    } catch {
      toast.error("搜索失败，请检查网络连接")
    } finally {
      setSearching(false)
    }
  }

  // 导入搜索结果中的歌曲
  const handleImportSearchSong = async (song: QQMusicSong) => {
    setImporting((prev) => new Set(prev).add(song.songid))
    try {
      const { data } = await axios.post<ApiResponse<any>>("/api/music", {
        title: song.songname,
        artist: song.singer,
        album: song.albumname || null,
        coverUrl: song.albummid
          ? `https://y.qq.com/music/photo_new/T002R300x300M000${song.albummid}.jpg`
          : null,
        qqMusicId: song.songid,
        duration: song.interval || null,
      })
      if (data.success) {
        toast.success(`已导入: ${song.songname}`)
      }
    } catch {
      toast.error("导入失败")
    } finally {
      setImporting((prev) => {
        const next = new Set(prev)
        next.delete(song.songid)
        return next
      })
    }
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">导入音乐</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
            从QQ音乐歌单或搜索导入歌曲
          </p>
        </div>

        {/* 歌单导入 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="font-semibold">从QQ音乐歌单导入</h2>
            <p className="text-xs text-muted-foreground">
              支持 QQ 音乐歌单链接或歌单 ID
              <a
                href="https://y.qq.com/n/ryqq/playlist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary inline-flex items-center gap-0.5 ml-1"
              >
                前往QQ音乐 <ExternalLink className="h-3 w-3" />
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="输入歌单链接或歌单ID"
                value={playlistId}
                onChange={(e) => setPlaylistId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLoadPlaylist()}
                className="flex-1"
              />
              <Button onClick={handleLoadPlaylist} disabled={loadingPlaylist}>
                {loadingPlaylist ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span className="ml-1 hidden sm:inline">获取歌单</span>
              </Button>
            </div>

            {/* 歌单结果 */}
            {playlistData && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    歌单: {playlistData.playlistName} · {playlistData.songs.length} 首
                  </p>
                  <Button size="sm" onClick={handleImportAll}>
                    一键全部导入
                  </Button>
                </div>
                <div className="max-h-[400px] overflow-y-auto space-y-2">
                  {playlistData.songs.map((song) => (
                    <div
                      key={song.songid}
                      className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-muted">
                        {song.albummid ? (
                          <Image
                            src={`https://y.qq.com/music/photo_new/T002R300x300M000${song.albummid}.jpg`}
                            alt={song.albumname}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Music className="h-5 w-5 text-muted-foreground/40" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-1">
                          {song.songname}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {song.singer}
                          {song.albumname && ` · ${song.albumname}`}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleImportSong(song)}
                        disabled={importing.has(song.songid)}
                      >
                        {importing.has(song.songid) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loadingPlaylist && !playlistData && playlistId && (
              <EmptyState title="未获取歌单" description={'点击"获取歌单"按钮加载'} />
            )}
          </CardContent>
        </Card>

        {/* 搜索导入 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="font-semibold">搜索导入</h2>
            <div className="flex gap-2">
              <Input
                placeholder="搜索歌曲名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={searching}>
                {searching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span className="ml-1 hidden sm:inline">搜索</span>
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  找到 {searchResults.length} 个结果
                </p>
                {searchResults.map((song) => (
                  <div
                    key={song.songid}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30"
                  >
                    <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-muted">
                      {song.albummid ? (
                        <Image
                          src={`https://y.qq.com/music/photo_new/T002R300x300M000${song.albummid}.jpg`}
                          alt={song.albumname}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music className="h-5 w-5 text-muted-foreground/40" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-1">
                        {song.songname}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {song.singer}
                        {song.albumname && ` · ${song.albumname}`}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleImportSearchSong(song)}
                      disabled={importing.has(song.songid)}
                    >
                      {importing.has(song.songid) ? (
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

            {!searching && searchResults.length === 0 && searchQuery && (
              <EmptyState title="未找到结果" description="尝试其他关键词" />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
