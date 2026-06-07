"use client"

import { useState, useCallback, useRef } from "react"
import type { Music, MusicInput, FilterParams, ApiResponse } from "@/lib/types"
import axios from "axios"

/**
 * 音乐数据管理 Hook
 */
export function useMusic() {
  const [music, setMusic] = useState<Music[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)

  const pageRef = useRef(page)
  pageRef.current = page

  const fetchMusic = useCallback(
    async (params?: FilterParams, pageNum?: number) => {
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
        const { data } = await axios.get<ApiResponse<Music[]>>(
          `/api/music?${searchParams.toString()}`
        )
        if (data.success && data.data) {
          setMusic(data.data)
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
    },
    [pageSize]
  )

  const createMusic = useCallback(
    async (input: MusicInput): Promise<Music | null> => {
      setError(null)
      try {
        const { data } = await axios.post<ApiResponse<Music>>(
          "/api/music",
          input
        )
        if (data.success && data.data) {
          return data.data
        }
        setError(data.error || "创建失败")
        return null
      } catch {
        setError("网络错误，请稍后重试")
        return null
      }
    },
    []
  )

  const updateMusic = useCallback(
    async (id: number, input: Partial<MusicInput>): Promise<Music | null> => {
      setError(null)
      try {
        const { data } = await axios.put<ApiResponse<Music>>(
          `/api/music/${id}`,
          input
        )
        if (data.success && data.data) {
          return data.data
        }
        setError(data.error || "更新失败")
        return null
      } catch {
        setError("网络错误，请稍后重试")
        return null
      }
    },
    []
  )

  const deleteMusic = useCallback(async (id: number): Promise<boolean> => {
    setError(null)
    try {
      const { data } = await axios.delete<ApiResponse<null>>(
        `/api/music/${id}`
      )
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
    music,
    loading,
    error,
    total,
    page,
    pageSize,
    setPage,
    fetchMusic,
    createMusic,
    updateMusic,
    deleteMusic,
    setError,
  }
}
