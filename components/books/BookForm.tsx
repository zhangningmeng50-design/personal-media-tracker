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
import { BOOK_STATUS_OPTIONS } from "@/lib/constants"
import type { Book, BookInput, Tag } from "@/lib/types"

interface BookFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: BookInput) => Promise<Book | null>
  book?: Book | null
  tags: Tag[]
  onCreateTag: (name: string, color: string) => Promise<Tag | null>
}

/**
 * 书籍编辑表单对话框
 */
export function BookForm({ open, onOpenChange, onSubmit, book, tags, onCreateTag }: BookFormProps) {
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState<BookInput>({
    title: "",
    author: "",
  })

  React.useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        publisher: book.publisher || "",
        publishYear: book.publishYear || undefined,
        isbn: book.isbn || "",
        coverUrl: book.coverUrl || "",
        description: book.description || "",
        status: book.status as BookInput["status"],
        rating: book.rating || undefined,
        notes: book.notes || "",
        startDate: book.startDate || "",
        finishDate: book.finishDate || "",
        tagIds: book.tags.map((t) => t.id),
      })
    } else {
      setForm({ title: "", author: "" })
    }
  }, [book, open])

  const handleSubmit = async () => {
    if (!form.title?.trim() || !form.author?.trim()) return
    setLoading(true)
    // 清理空字符串
    const payload: BookInput = {
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      publisher: form.publisher?.trim() || undefined,
      isbn: form.isbn?.trim() || undefined,
      coverUrl: form.coverUrl?.trim() || undefined,
      description: form.description?.trim() || undefined,
      notes: form.notes?.trim() || undefined,
      startDate: form.startDate || undefined,
      finishDate: form.finishDate || undefined,
      publishYear: form.publishYear || undefined,
      rating: form.rating || undefined,
    }
    await onSubmit(payload)
    setLoading(false)
    onOpenChange(false)
  }

  const updateField = <K extends keyof BookInput>(field: K, value: BookInput[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{book ? "编辑书籍" : "添加书籍"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* 书名 */}
          <div className="space-y-1.5">
            <Label htmlFor="title">书名 *</Label>
            <Input
              id="title"
              value={form.title || ""}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="输入书名"
            />
          </div>

          {/* 作者 */}
          <div className="space-y-1.5">
            <Label htmlFor="author">作者 *</Label>
            <Input
              id="author"
              value={form.author || ""}
              onChange={(e) => updateField("author", e.target.value)}
              placeholder="输入作者"
            />
          </div>

          {/* 出版社 + 出版年份 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="publisher">出版社</Label>
              <Input
                id="publisher"
                value={form.publisher || ""}
                onChange={(e) => updateField("publisher", e.target.value)}
                placeholder="出版社"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="publishYear">出版年份</Label>
              <Input
                id="publishYear"
                type="number"
                value={form.publishYear || ""}
                onChange={(e) => updateField("publishYear", e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="2024"
              />
            </div>
          </div>

          {/* ISBN + 封面URL */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                value={form.isbn || ""}
                onChange={(e) => updateField("isbn", e.target.value)}
                placeholder="ISBN"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coverUrl">封面URL</Label>
              <Input
                id="coverUrl"
                value={form.coverUrl || ""}
                onChange={(e) => updateField("coverUrl", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* 简介 */}
          <div className="space-y-1.5">
            <Label htmlFor="description">简介</Label>
            <Textarea
              id="description"
              value={form.description || ""}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="书籍简介..."
              rows={2}
            />
          </div>

          {/* 状态 */}
          <div className="space-y-1.5">
            <Label>阅读状态</Label>
            <StatusSelect
              value={form.status || "WANT_TO_READ"}
              onChange={(v) => updateField("status", v as BookInput["status"])}
              options={BOOK_STATUS_OPTIONS as any}
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
              <Label htmlFor="startDate">开始阅读日期</Label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate ? form.startDate.slice(0, 10) : ""}
                onChange={(e) => updateField("startDate", e.target.value ? new Date(e.target.value).toISOString() : undefined)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="finishDate">完成阅读日期</Label>
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
            <Label htmlFor="notes">阅读笔记</Label>
            <Textarea
              id="notes"
              value={form.notes || ""}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="记录你的阅读感想..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !form.title?.trim() || !form.author?.trim()}>
            {loading ? "保存中..." : book ? "保存修改" : "添加书籍"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
