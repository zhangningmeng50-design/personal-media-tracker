"use client"

import { useState, useCallback, useRef } from "react"
import type { Book, BookInput, FilterParams, ApiResponse } from "@/lib/types"
import axios from "axios"

/**
 * 书籍数据管理 Hook
 * 提供书籍的CRUD操作和状态管理
 */
export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)
  // 用 ref 存 page，避免 fetchBooks 引用随 page 变化导致 useEffect 循环重置
  const pageRef = useRef(page)
  pageRef.current = page

  /**
   * 获取书籍列表
   */
  const fetchBooks = useCallback(async (params?: FilterParams, pageNum?: number) => {
    setLoading(true)
    setError(null)
    const p = pageNum ?? pageRef.current
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("page", String(p))
      searchParams.set("pageSize", String(pageSize))
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) searchParams.set(key, value)
        })
      }
      const { data } = await axios.get<ApiResponse<Book[]>>(
        `/api/books?${searchParams.toString()}`
      )
      if (data.success && data.data) {
        setBooks(data.data)
        setPage(p)
        if (data.total !== undefined) setTotal(data.total)
      } else {
        setError(data.error || "获取数据失败")
      }
    } catch {
      setError("网络错误，请稍后重试")
    } finally {
      setLoading(false)
    }
  }, [pageSize])

  /**
   * 创建书籍
   */
  const createBook = useCallback(async (input: BookInput): Promise<Book | null> => {
    setError(null)
    try {
      const { data } = await axios.post<ApiResponse<Book>>("/api/books", input)
      if (data.success && data.data) {
        return data.data
      }
      setError(data.error || "创建失败")
      return null
    } catch {
      setError("网络错误，请稍后重试")
      return null
    }
  }, [])

  /**
   * 更新书籍
   */
  const updateBook = useCallback(async (id: number, input: Partial<BookInput>): Promise<Book | null> => {
    setError(null)
    try {
      const { data } = await axios.put<ApiResponse<Book>>(`/api/books/${id}`, input)
      if (data.success && data.data) {
        return data.data
      }
      setError(data.error || "更新失败")
      return null
    } catch {
      setError("网络错误，请稍后重试")
      return null
    }
  }, [])

  /**
   * 删除书籍
   */
  const deleteBook = useCallback(async (id: number): Promise<boolean> => {
    setError(null)
    try {
      const { data } = await axios.delete<ApiResponse<null>>(`/api/books/${id}`)
      if (data.success) {
        return true
      }
      setError(data.error || "删除失败")
      return false
    } catch {
      setError("网络错误，请稍后重试")
      return false
    }
  }, [])

  return {
    books,
    loading,
    error,
    total,
    page,
    pageSize,
    setPage,
    fetchBooks,
    createBook,
    updateBook,
    deleteBook,
    setError,
  }
}
