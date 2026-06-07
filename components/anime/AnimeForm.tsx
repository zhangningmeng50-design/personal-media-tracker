"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StatusSelect } from "@/components/shared/StatusSelect"
import { StarRating } from "@/components/shared/StarRating"
import { TagPicker } from "@/components/shared/TagPicker"
import { ANIME_STATUS_OPTIONS } from "@/lib/constants"
import type { Anime, AnimeInput, Tag } from "@/lib/types"

interface AnimeFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: AnimeInput) => Promise<Anime | null>
  anime?: Anime | null
  tags: Tag[]
  onCreateTag: (name: string, color: string) => Promise<Tag | null>
}

/**
 * 动画编辑表单对话框
 */
export function AnimeForm({ open, onOpenChange, onSubmit, anime, tags, onCreateTag }: AnimeFormProps) {
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState<AnimeInput>({ titleCn: "" })

  React.useEffect(() => {
    if (anime) {
      setForm({
        titleCn: anime.titleCn,
        titleJp: anime.titleJp || "",
        coverUrl: anime.coverUrl || "",
        summary: anime.summary || "",
        studio: anime.studio || "",
        airDate: anime.airDate || "",
        totalEpisodes: anime.totalEpisodes || undefined,
        watchedEpisodes: anime.watchedEpisodes,
        bangumiId: anime.bangumiId || undefined,
        status: anime.status as AnimeInput["status"],
        rating: anime.rating || undefined,
        notes: anime.notes || "",
        startDate: anime.startDate || "",
        finishDate: anime.finishDate || "",
        tagIds: anime.tags.map((t) => t.id),
      })
    } else {
      setForm({ titleCn: "" })
    }
  }, [anime, open])

  const handleSubmit = async () => {
    if (!form.titleCn?.trim()) return
    setLoading(true)
    const payload: AnimeInput = {
      ...form,
      titleCn: form.titleCn.trim(),
      titleJp: form.titleJp?.trim() || undefined,
      coverUrl: form.coverUrl?.trim() || undefined,
      summary: form.summary?.trim() || undefined,
      studio: form.studio?.trim() || undefined,
      notes: form.notes?.trim() || undefined,
      airDate: form.airDate || undefined,
      startDate: form.startDate || undefined,
      finishDate: form.finishDate || undefined,
      totalEpisodes: form.totalEpisodes || undefined,
      rating: form.rating || undefined,
    }
    await onSubmit(payload)
    setLoading(false)
    onOpenChange(false)
  }

  const updateField = <K extends keyof AnimeInput>(field: K, value: AnimeInput[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{anime ? "编辑动画" : "添加动画"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* 中文名称 */}
          <div className="space-y-1.5">
            <Label htmlFor="titleCn">中文名称 *</Label>
            <Input
              id="titleCn"
              value={form.titleCn || ""}
              onChange={(e) => updateField("titleCn", e.target.value)}
              placeholder="动画中文名"
            />
          </div>

          {/* 日文名称 */}
          <div className="space-y-1.5">
            <Label htmlFor="titleJp">日文名称</Label>
            <Input
              id="titleJp"
              value={form.titleJp || ""}
              onChange={(e) => updateField("titleJp", e.target.value)}
              placeholder="日文原名"
            />
          </div>

          {/* 制作公司 + 播出日期 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="studio">制作公司</Label>
              <Input
                id="studio"
                value={form.studio || ""}
                onChange={(e) => updateField("studio", e.target.value)}
                placeholder="制作公司"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="airDate">播出日期</Label>
              <Input
                id="airDate"
                type="date"
                value={form.airDate ? form.airDate.slice(0, 10) : ""}
                onChange={(e) => updateField("airDate", e.target.value ? new Date(e.target.value).toISOString() : undefined)}
              />
            </div>
          </div>

          {/* 总集数 + 已看集数 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="totalEpisodes">总集数</Label>
              <Input
                id="totalEpisodes"
                type="number"
                value={form.totalEpisodes || ""}
                onChange={(e) => updateField("totalEpisodes", e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="12"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="watchedEpisodes">已看集数</Label>
              <Input
                id="watchedEpisodes"
                type="number"
                value={form.watchedEpisodes ?? 0}
                onChange={(e) => updateField("watchedEpisodes", parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* 封面URL */}
          <div className="space-y-1.5">
            <Label htmlFor="coverUrl">封面URL</Label>
            <Input
              id="coverUrl"
              value={form.coverUrl || ""}
              onChange={(e) => updateField("coverUrl", e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* 简介 */}
          <div className="space-y-1.5">
            <Label htmlFor="summary">简介</Label>
            <Textarea
              id="summary"
              value={form.summary || ""}
              onChange={(e) => updateField("summary", e.target.value)}
              placeholder="动画简介..."
              rows={2}
            />
          </div>

          {/* 状态 */}
          <div className="space-y-1.5">
            <Label>观看状态</Label>
            <StatusSelect
              value={form.status || "WANT_TO_WATCH"}
              onChange={(v) => updateField("status", v as AnimeInput["status"])}
              options={ANIME_STATUS_OPTIONS as any}
            />
          </div>

          {/* 评分 */}
          <div className="space-y-1.5">
            <Label>评分</Label>
            <StarRating
              value={form.rating || null}
              onChange={(v) => updateField("rating", v === 0 ? undefined : v)}
              size="lg"
            />
          </div>

          {/* 日期 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="startDate">开始观看日期</Label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate ? form.startDate.slice(0, 10) : ""}
                onChange={(e) => updateField("startDate", e.target.value ? new Date(e.target.value).toISOString() : undefined)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="finishDate">完成观看日期</Label>
              <Input
                id="finishDate"
                type="date"
                value={form.finishDate ? form.finishDate.slice(0, 10) : ""}
                onChange={(e) => updateField("finishDate", e.target.value ? new Date(e.target.value).toISOString() : undefined)}
              />
            </div>
          </div>

          {/* 标签 */}
          <div className="space-y-1.5">
            <Label>标签</Label>
            <TagPicker
              tags={tags}
              selectedTagIds={form.tagIds || []}
              onChange={(ids) => updateField("tagIds", ids)}
              onCreateTag={onCreateTag}
            />
          </div>

          {/* 笔记 */}
          <div className="space-y-1.5">
            <Label htmlFor="notes">观看笔记</Label>
            <Textarea
              id="notes"
              value={form.notes || ""}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="记录你的观看感想..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>取消</Button>
          <Button onClick={handleSubmit} disabled={loading || !form.titleCn?.trim()}>
            {loading ? "保存中..." : anime ? "保存修改" : "添加动画"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
