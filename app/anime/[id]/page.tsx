"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, Tv, Building2, MonitorPlay } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { StarRating } from "@/components/shared/StarRating"
import { TagBadge } from "@/components/shared/TagBadge"
import { AnimeForm } from "@/components/anime/AnimeForm"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { useTags } from "@/hooks/useTags"
import { ANIME_STATUS_OPTIONS } from "@/lib/constants"
import type { Anime, AnimeInput, Tag, ApiResponse } from "@/lib/types"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

/**
 * 动画详情页面
 */
export default function AnimeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = parseInt(params.id as string)

  const [anime, setAnime] = React.useState<Anime | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [formOpen, setFormOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [statusUpdating, setStatusUpdating] = React.useState(false)
  const { tags, fetchTags, createTag } = useTags()

  const loadAnime = React.useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await axios.get<ApiResponse<Anime>>(`/api/anime/${id}`)
      if (data.success && data.data) setAnime(data.data)
    } catch {
      toast.error("获取动画信息失败")
    } finally {
      setLoading(false)
    }
  }, [id])

  React.useEffect(() => {
    loadAnime()
    fetchTags("anime")
  }, [loadAnime, fetchTags])

  const handleStatusChange = async (newStatus: string) => {
    if (!anime || statusUpdating) return
    setStatusUpdating(true)
    try {
      const { data } = await axios.put<ApiResponse<Anime>>(`/api/anime/${anime.id}`, {
        status: newStatus,
        finishDate: newStatus === "WATCHED" ? new Date().toISOString() : anime.finishDate,
      })
      if (data.success && data.data) {
        setAnime(data.data)
        toast.success("状态已更新")
      }
    } catch {
      toast.error("更新失败")
    } finally {
      setStatusUpdating(false)
    }
  }

  const handleRatingChange = async (rating: number) => {
    if (!anime) return
    try {
      const { data } = await axios.put<ApiResponse<Anime>>(`/api/anime/${anime.id}`, {
        rating: rating === 0 ? null : rating,
      })
      if (data.success && data.data) setAnime(data.data)
    } catch {
      toast.error("评分更新失败")
    }
  }

  const handleWatchedEpisodesChange = async (episodes: number) => {
    if (!anime) return
    try {
      const { data } = await axios.put<ApiResponse<Anime>>(`/api/anime/${anime.id}`, {
        watchedEpisodes: episodes,
      })
      if (data.success && data.data) setAnime(data.data)
    } catch {
      toast.error("更新失败")
    }
  }

  const handleNotesUpdate = async (notes: string) => {
    if (!anime) return
    try {
      const { data } = await axios.put<ApiResponse<Anime>>(`/api/anime/${anime.id}`, { notes })
      if (data.success && data.data) {
        setAnime(data.data)
        toast.success("笔记已保存")
      }
    } catch {
      toast.error("笔记保存失败")
    }
  }

  const handleFormSubmit = async (input: AnimeInput): Promise<Anime | null> => {
    try {
      const { data } = await axios.put<ApiResponse<Anime>>(`/api/anime/${id}`, input)
      if (data.success && data.data) {
        setAnime(data.data)
        toast.success("动画已更新")
        return data.data
      }
      return null
    } catch {
      toast.error("更新失败")
      return null
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/anime/${id}`)
      toast.success("动画已删除")
      router.push("/anime")
    } catch {
      toast.error("删除失败")
    }
  }

  const handleCreateTag = async (name: string, color: string): Promise<Tag | null> => {
    const result = await createTag(name, color)
    if (result) fetchTags("anime")
    return result
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-32" />
            <div className="flex gap-6">
              <div className="w-48 h-72 bg-muted rounded-card" />
              <div className="flex-1 space-y-3">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-5 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-full" />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!anime) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-4 lg:p-6 text-center py-16">
          <h2 className="text-xl font-semibold">未找到该动画</h2>
          <Button className="mt-4" onClick={() => router.push("/anime")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> 返回动画列表
          </Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
        <Button variant="ghost" onClick={() => router.push("/anime")} className="gap-1">
          <ArrowLeft className="h-4 w-4" /> 返回动画列表
        </Button>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0 w-48 mx-auto sm:mx-0">
            <div className="cover-container rounded-card overflow-hidden shadow-lg">
              <Image
                src={anime.coverUrl || "/placeholder-cover.svg"}
                alt={anime.titleCn}
                fill
                className="object-cover"
                unoptimized={!!anime.coverUrl}
              />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-start gap-2">
                <h1 className="text-2xl font-bold flex-1">{anime.titleCn}</h1>
                <Button variant="outline" size="sm" onClick={() => setFormOpen(true)}>编辑</Button>
              </div>
              {anime.titleJp && (
                <p className="text-muted-foreground text-sm">{anime.titleJp}</p>
              )}
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5">
                {ANIME_STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={statusUpdating}
                    onClick={() => handleStatusChange(opt.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2 ${
                      anime.status === opt.value
                        ? `${opt.color} border-current`
                        : "border-transparent bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">评分</p>
              <StarRating value={anime.rating} onChange={handleRatingChange} size="lg" />
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {anime.studio && (
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" /> {anime.studio}
                </span>
              )}
              {anime.airDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(anime.airDate), "yyyy年MM月", { locale: zhCN })}
                </span>
              )}
            </div>

            {/* 集数跟踪 */}
            {anime.totalEpisodes ? (
              <Card className="max-w-xs">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <MonitorPlay className="h-4 w-4" /> 观看进度
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {anime.watchedEpisodes} / {anime.totalEpisodes} 集
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={anime.totalEpisodes}
                      value={anime.watchedEpisodes}
                      onChange={(e) => handleWatchedEpisodesChange(parseInt(e.target.value))}
                      className="flex-1 accent-primary"
                    />
                    <input
                      type="number"
                      min={0}
                      max={anime.totalEpisodes}
                      value={anime.watchedEpisodes}
                      onChange={(e) => handleWatchedEpisodesChange(parseInt(e.target.value) || 0)}
                      className="w-16 h-8 text-center text-sm border rounded"
                    />
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {anime.startDate && (
              <span className="text-sm text-muted-foreground">
                开始观看: {format(new Date(anime.startDate), "yyyy年MM月dd日", { locale: zhCN })}
              </span>
            )}
            {anime.finishDate && (
              <span className="text-sm text-muted-foreground">
                完成观看: {format(new Date(anime.finishDate), "yyyy年MM月dd日", { locale: zhCN })}
              </span>
            )}

            {anime.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {anime.tags.map((tag) => (
                  <TagBadge key={tag.id} name={tag.name} color={tag.color} />
                ))}
              </div>
            )}
          </div>
        </div>

        {anime.summary && (
          <Card>
            <CardHeader><CardTitle className="text-lg">简介</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{anime.summary}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              <Tv className="h-5 w-5 inline mr-1" /> 观看笔记
            </CardTitle>
            <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)}>
              删除此动画
            </Button>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full min-h-[120px] p-3 rounded-md border bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="记录你的观看感想..."
              value={anime.notes || ""}
              onChange={(e) => setAnime({ ...anime, notes: e.target.value })}
              onBlur={(e) => {
                if (e.target.value !== (anime.notes || "")) {
                  handleNotesUpdate(e.target.value)
                }
              }}
            />
          </CardContent>
        </Card>

        <AnimeForm
          open={formOpen}
          onOpenChange={setFormOpen}
          onSubmit={handleFormSubmit}
          anime={anime}
          tags={tags}
          onCreateTag={handleCreateTag}
        />

        <ConfirmDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title="删除动画"
          description={`确定要删除「${anime.titleCn}」吗？此操作不可撤销。`}
          confirmText="删除"
          variant="destructive"
          onConfirm={handleDelete}
        />
      </div>
    </MainLayout>
  )
}
