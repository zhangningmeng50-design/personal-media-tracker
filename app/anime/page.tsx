"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import toast from "react-hot-toast"
import { MainLayout } from "@/components/layout/MainLayout"
import { AnimeGrid } from "@/components/anime/AnimeGrid"
import { AnimeForm } from "@/components/anime/AnimeForm"
import { AnimeFilters } from "@/components/anime/AnimeFilters"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { Pagination } from "@/components/shared/Pagination"
import { Button } from "@/components/ui/button"
import { useAnime } from "@/hooks/useAnime"
import { useTags } from "@/hooks/useTags"
import type { Anime, AnimeInput, Tag } from "@/lib/types"

export const dynamic = "force-dynamic"

/**
 * 动画列表页面内容组件
 */
function AnimeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { anime, loading, total, page, pageSize, setPage, fetchAnime, createAnime, updateAnime, deleteAnime } = useAnime()
  const { tags, fetchTags, createTag } = useTags()

  const [formOpen, setFormOpen] = React.useState(false)
  const [editingAnime, setEditingAnime] = React.useState<Anime | null>(null)
  const [deletingAnime, setDeletingAnime] = React.useState<Anime | null>(null)

  const status = searchParams.get("status") || ""
  const search = searchParams.get("search") || ""
  const tag = searchParams.get("tag") || ""
  const rating = searchParams.get("rating") || ""
  const year = searchParams.get("year") || ""
  const sort = searchParams.get("sort") || ""

  React.useEffect(() => {
    setPage(1)
    fetchAnime({ status, search, tag, rating, year, sort }, 1)
    fetchTags("anime")
  }, [fetchAnime, fetchTags, status, search, tag, rating, year, sort])

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/anime?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/anime")
  }

  const handleEdit = (item: Anime) => {
    setEditingAnime(item)
    setFormOpen(true)
  }

  const handleCreate = () => {
    setEditingAnime(null)
    setFormOpen(true)
  }

  const handleSubmit = async (data: AnimeInput): Promise<Anime | null> => {
    if (editingAnime) {
      const result = await updateAnime(editingAnime.id, data)
      if (result) {
        toast.success("动画已更新")
        fetchAnime({ status, search, tag, rating, year, sort })
      } else {
        toast.error("更新失败")
      }
      return result
    } else {
      const result = await createAnime(data)
      if (result) {
        toast.success("动画已添加")
        fetchAnime({ status, search, tag, rating, year, sort })
      } else {
        toast.error("添加失败")
      }
      return result
    }
  }

  const handleDelete = async () => {
    if (!deletingAnime) return
    const success = await deleteAnime(deletingAnime.id)
    if (success) {
      toast.success("动画已删除")
      fetchAnime({ status, search, tag, rating, year, sort })
    } else {
      toast.error("删除失败")
    }
  }

  const handleCreateTag = async (name: string, color: string): Promise<Tag | null> => {
    const result = await createTag(name, color)
    if (result) fetchTags("anime")
    return result
  }

  return (
    <MainLayout>
      <div className="max-w-[1600px] mx-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">动画</h1>
            {search && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                搜索: &quot;{search}&quot;
              </p>
            )}
          </div>
          <Button onClick={handleCreate} className="gap-1">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">添加动画</span>
          </Button>
        </div>

        <AnimeFilters
          currentStatus={status}
          currentTag={tag}
          currentRating={rating}
          currentYear={year}
          currentSort={sort}
          tags={tags}
          onStatusChange={(v) => updateParam("status", v)}
          onTagChange={(v) => updateParam("tag", v)}
          onRatingChange={(v) => updateParam("rating", v)}
          onYearChange={(v) => updateParam("year", v)}
          onSortChange={(v) => updateParam("sort", v)}
          onClear={clearFilters}
        />

        <AnimeGrid
          anime={anime}
          onEdit={handleEdit}
          onDelete={(a) => setDeletingAnime(a)}
          loading={loading}
        />

        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onChange={(p) => fetchAnime({ status, search, tag, rating, year, sort }, p)}
        />

        <AnimeForm
          open={formOpen}
          onOpenChange={setFormOpen}
          onSubmit={handleSubmit}
          anime={editingAnime}
          tags={tags}
          onCreateTag={handleCreateTag}
        />

        <ConfirmDialog
          open={!!deletingAnime}
          onOpenChange={() => setDeletingAnime(null)}
          title="删除动画"
          description={`确定要删除「${deletingAnime?.titleCn}」吗？此操作不可撤销。`}
          confirmText="删除"
          variant="destructive"
          onConfirm={handleDelete}
        />
      </div>
    </MainLayout>
  )
}

/**
 * 动画列表页面（带Suspense边界）
 */
export default function AnimePage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="max-w-[1600px] mx-auto p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="cover-container bg-muted rounded-card" />
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    }>
      <AnimeContent />
    </Suspense>
  )
}
