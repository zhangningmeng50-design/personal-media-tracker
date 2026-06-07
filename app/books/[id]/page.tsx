"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, BookOpen, Building2 } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { StarRating } from "@/components/shared/StarRating"
import { TagBadge } from "@/components/shared/TagBadge"
import { BookForm } from "@/components/books/BookForm"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { useTags } from "@/hooks/useTags"
import { BOOK_STATUS_OPTIONS } from "@/lib/constants"
import type { Book, BookInput, Tag, ApiResponse } from "@/lib/types"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

/**
 * 书籍详情页面
 */
export default function BookDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = parseInt(params.id as string)

  const [book, setBook] = React.useState<Book | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [formOpen, setFormOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [statusUpdating, setStatusUpdating] = React.useState(false)
  const { tags, fetchTags, createTag } = useTags()

  // 加载书籍数据
  const loadBook = React.useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await axios.get<ApiResponse<Book>>(`/api/books/${id}`)
      if (data.success && data.data) {
        setBook(data.data)
      }
    } catch {
      toast.error("获取书籍信息失败")
    } finally {
      setLoading(false)
    }
  }, [id])

  React.useEffect(() => {
    loadBook()
    fetchTags("book")
  }, [loadBook, fetchTags])

  // 快速切换状态
  const handleStatusChange = async (newStatus: string) => {
    if (!book || statusUpdating) return
    setStatusUpdating(true)
    try {
      const { data } = await axios.put<ApiResponse<Book>>(`/api/books/${book.id}`, {
        status: newStatus,
        finishDate: newStatus === "READ" ? new Date().toISOString() : book.finishDate,
      })
      if (data.success && data.data) {
        setBook(data.data)
        toast.success("状态已更新")
      }
    } catch {
      toast.error("更新失败")
    } finally {
      setStatusUpdating(false)
    }
  }

  // 更新评分
  const handleRatingChange = async (rating: number) => {
    if (!book) return
    try {
      const { data } = await axios.put<ApiResponse<Book>>(`/api/books/${book.id}`, {
        rating: rating === 0 ? null : rating,
      })
      if (data.success && data.data) {
        setBook(data.data)
      }
    } catch {
      toast.error("评分更新失败")
    }
  }

  // 更新笔记
  const handleNotesUpdate = async (notes: string) => {
    if (!book) return
    try {
      const { data } = await axios.put<ApiResponse<Book>>(`/api/books/${book.id}`, { notes })
      if (data.success && data.data) {
        setBook(data.data)
        toast.success("笔记已保存")
      }
    } catch {
      toast.error("笔记保存失败")
    }
  }

  // 提交编辑表单
  const handleFormSubmit = async (input: BookInput): Promise<Book | null> => {
    try {
      const { data } = await axios.put<ApiResponse<Book>>(`/api/books/${id}`, input)
      if (data.success && data.data) {
        setBook(data.data)
        toast.success("书籍已更新")
        return data.data
      }
      return null
    } catch {
      toast.error("更新失败")
      return null
    }
  }

  // 删除
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/books/${id}`)
      toast.success("书籍已删除")
      router.push("/books")
    } catch {
      toast.error("删除失败")
    }
  }

  // 创建标签
  const handleCreateTag = async (name: string, color: string): Promise<Tag | null> => {
    const result = await createTag(name, color)
    if (result) fetchTags("book")
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

  if (!book) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-4 lg:p-6 text-center py-16">
          <h2 className="text-xl font-semibold">未找到该书籍</h2>
          <Button className="mt-4" onClick={() => router.push("/books")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> 返回书籍列表
          </Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
        {/* 返回按钮 */}
        <Button variant="ghost" onClick={() => router.push("/books")} className="gap-1">
          <ArrowLeft className="h-4 w-4" /> 返回书籍列表
        </Button>

        {/* 主信息区 */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* 封面 */}
          <div className="flex-shrink-0 w-48 mx-auto sm:mx-0">
            <div className="cover-container rounded-card overflow-hidden shadow-lg">
              <Image
                src={book.coverUrl || "/placeholder-cover.svg"}
                alt={book.title}
                fill
                className="object-cover"
                unoptimized={!!book.coverUrl}
              />
            </div>
          </div>

          {/* 信息 */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-start gap-2">
                <h1 className="text-2xl font-bold flex-1">{book.title}</h1>
                <Button variant="outline" size="sm" onClick={() => setFormOpen(true)}>
                  编辑
                </Button>
              </div>
              <p className="text-muted-foreground">{book.author}</p>
            </div>

            {/* 状态 */}
            <div>
              <div className="flex flex-wrap gap-1.5">
                {BOOK_STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={statusUpdating}
                    onClick={() => handleStatusChange(opt.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2 ${
                      book.status === opt.value
                        ? `${opt.color} border-current`
                        : "border-transparent bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 评分 */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">评分</p>
              <StarRating value={book.rating} onChange={handleRatingChange} size="lg" />
            </div>

            {/* 元信息 */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {book.publisher && (
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" /> {book.publisher}
                </span>
              )}
              {book.publishYear && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {book.publishYear}
                </span>
              )}
              {book.isbn && <span>ISBN: {book.isbn}</span>}
            </div>

            {/* 日期 */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {book.startDate && (
                <span>
                  开始阅读: {format(new Date(book.startDate), "yyyy年MM月dd日", { locale: zhCN })}
                </span>
              )}
              {book.finishDate && (
                <span>
                  完成阅读: {format(new Date(book.finishDate), "yyyy年MM月dd日", { locale: zhCN })}
                </span>
              )}
            </div>

            {/* 标签 */}
            {book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {book.tags.map((tag) => (
                  <TagBadge key={tag.id} name={tag.name} color={tag.color} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 简介 */}
        {book.description && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">简介</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{book.description}</p>
            </CardContent>
          </Card>
        )}

        {/* 笔记 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              <BookOpen className="h-5 w-5 inline mr-1" />
              阅读笔记
            </CardTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteOpen(true)}
            >
              删除此书
            </Button>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full min-h-[120px] p-3 rounded-md border bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="记录你的阅读感想..."
              value={book.notes || ""}
              onChange={(e) => setBook({ ...book, notes: e.target.value })}
              onBlur={(e) => {
                if (e.target.value !== (book.notes || "")) {
                  handleNotesUpdate(e.target.value)
                }
              }}
            />
          </CardContent>
        </Card>

        {/* 编辑表单 */}
        <BookForm
          open={formOpen}
          onOpenChange={setFormOpen}
          onSubmit={handleFormSubmit}
          book={book}
          tags={tags}
          onCreateTag={handleCreateTag}
        />

        {/* 删除确认 */}
        <ConfirmDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title="删除书籍"
          description={`确定要删除「${book.title}」吗？此操作不可撤销。`}
          confirmText="删除"
          variant="destructive"
          onConfirm={handleDelete}
        />
      </div>
    </MainLayout>
  )
}
