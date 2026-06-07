"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import toast from "react-hot-toast"
import { MainLayout } from "@/components/layout/MainLayout"
import { BookGrid } from "@/components/books/BookGrid"
import { BookForm } from "@/components/books/BookForm"
import { BookFilters } from "@/components/books/BookFilters"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { Pagination } from "@/components/shared/Pagination"
import { Button } from "@/components/ui/button"
import { useBooks } from "@/hooks/useBooks"
import { useTags } from "@/hooks/useTags"
import type { Book, BookInput, Tag } from "@/lib/types"

export const dynamic = "force-dynamic"

/**
 * 书籍列表页面内容组件
 */
function BooksContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { books, loading, total, page, pageSize, setPage, fetchBooks, createBook, updateBook, deleteBook } = useBooks()
  const { tags, fetchTags, createTag } = useTags()

  const [formOpen, setFormOpen] = React.useState(false)
  const [editingBook, setEditingBook] = React.useState<Book | null>(null)
  const [deletingBook, setDeletingBook] = React.useState<Book | null>(null)

  // 筛选状态
  const status = searchParams.get("status") || ""
  const search = searchParams.get("search") || ""
  const tag = searchParams.get("tag") || ""
  const rating = searchParams.get("rating") || ""
  const sort = searchParams.get("sort") || ""

  // 加载数据（筛选变化时重置到第1页）
  React.useEffect(() => {
    setPage(1)
    fetchBooks({ status, search, tag, rating, sort }, 1)
    fetchTags("book")
  }, [fetchBooks, fetchTags, status, search, tag, rating, sort])

  // 更新URL参数
  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/books?${params.toString()}`)
  }

  // 清除所有筛选
  const clearFilters = () => {
    router.push("/books")
  }

  // 打开编辑表单
  const handleEdit = (book: Book) => {
    setEditingBook(book)
    setFormOpen(true)
  }

  // 新建书籍
  const handleCreate = () => {
    setEditingBook(null)
    setFormOpen(true)
  }

  // 提交表单
  const handleSubmit = async (data: BookInput): Promise<Book | null> => {
    if (editingBook) {
      const result = await updateBook(editingBook.id, data)
      if (result) {
        toast.success("书籍已更新")
        fetchBooks({ status, search, tag, rating, sort })
      } else {
        toast.error("更新失败")
      }
      return result
    } else {
      const result = await createBook(data)
      if (result) {
        toast.success("书籍已添加")
        fetchBooks({ status, search, tag, rating, sort })
      } else {
        toast.error("添加失败")
      }
      return result
    }
  }

  // 删除书籍
  const handleDelete = async () => {
    if (!deletingBook) return
    const success = await deleteBook(deletingBook.id)
    if (success) {
      toast.success("书籍已删除")
      fetchBooks({ status, search, tag, rating, sort })
    } else {
      toast.error("删除失败")
    }
  }

  // 创建标签回调
  const handleCreateTag = async (name: string, color: string): Promise<Tag | null> => {
    const result = await createTag(name, color)
    if (result) {
      fetchTags("book")
    }
    return result
  }

  return (
    <MainLayout>
      <div className="max-w-[1600px] mx-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
        {/* 页面标题和添加按钮 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">书籍</h1>
            {search && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                搜索: &quot;{search}&quot;
              </p>
            )}
          </div>
          <Button onClick={handleCreate} className="gap-1">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">添加书籍</span>
          </Button>
        </div>

        {/* 筛选器 */}
        <BookFilters
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

        {/* 书籍网格 */}
        <BookGrid
          books={books}
          onEdit={handleEdit}
          onDelete={(b) => setDeletingBook(b)}
          loading={loading}
        />

        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onChange={(p) => fetchBooks({ status, search, tag, rating, sort }, p)}
        />

        {/* 编辑/添加表单 */}
        <BookForm
          open={formOpen}
          onOpenChange={setFormOpen}
          onSubmit={handleSubmit}
          book={editingBook}
          tags={tags}
          onCreateTag={handleCreateTag}
        />

        {/* 删除确认 */}
        <ConfirmDialog
          open={!!deletingBook}
          onOpenChange={() => setDeletingBook(null)}
          title="删除书籍"
          description={`确定要删除「${deletingBook?.title}」吗？此操作不可撤销。`}
          confirmText="删除"
          variant="destructive"
          onConfirm={handleDelete}
        />
      </div>
    </MainLayout>
  )
}

/**
 * 书籍列表页面（带Suspense边界）
 */
export default function BooksPage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="max-w-[1600px] mx-auto p-4 lg:p-6">
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
      <BooksContent />
    </Suspense>
  )
}
