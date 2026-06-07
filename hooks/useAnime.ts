"use client"

import { useState, useCallback, useRef } from "react"
import type { Anime, AnimeInput, FilterParams, ApiResponse } from "@/lib/types"
import axios from "axios"

/**
 * 动画数据管理 Hook
 * 提供动画的CRUD操作和状态管理
 */
export function useAnime() {
  const [anime, setAnime] = useState<Anime[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)
  // 用 ref 存 page，避免 fetchAnime 引用随 page 变化导致 useEffect 循环重置
  const pageRef = useRef(page)
  pageRef.current = page

  const fetchAnime = useCallback(async (params?: FilterParams, pageNum?: number) => {
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
      const { data } = await axios.get<ApiResponse<Anime[]>>(
        `/api/anime?${searchParams.toString()}`
      )
      if (data.success && data.data) {
        setAnime(data.data)
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

  const createAnime = useCallback(async (input: AnimeInput): Promise<Anime | null> => {
    setError(null)
    try {
      const { data } = await axios.post<ApiResponse<Anime>>("/api/anime", input)
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

  const updateAnime = useCallback(async (id: number, input: Partial<AnimeInput>): Promise<Anime | null> => {
    setError(null)
    try {
      const { data } = await axios.put<ApiResponse<Anime>>(`/api/anime/${id}`, input)
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

  const deleteAnime = useCallback(async (id: number): Promise<boolean> => {
    setError(null)
    try {
      const { data } = await axios.delete<ApiResponse<null>>(`/api/anime/${id}`)
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
    anime,
    loading,
    error,
    total,
    page,
    pageSize,
    setPage,
    fetchAnime,
    createAnime,
    updateAnime,
    deleteAnime,
    setError,
  }
}
