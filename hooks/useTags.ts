"use client"

import { useState, useCallback } from "react"
import type { Tag, ApiResponse } from "@/lib/types"
import axios from "axios"

/**
 * 标签数据管理 Hook
 */
export function useTags() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTags = useCallback(async (type?: "book" | "anime" | "music") => {
    setLoading(true)
    setError(null)
    try {
      const params = type ? `?type=${type}` : ""
      const { data } = await axios.get<ApiResponse<Tag[]>>(`/api/tags${params}`)
      if (data.success && data.data) {
        setTags(data.data)
      }
    } catch {
      setError("获取标签失败")
    } finally {
      setLoading(false)
    }
  }, [])

  const createTag = useCallback(async (name: string, color: string): Promise<Tag | null> => {
    setError(null)
    try {
      const { data } = await axios.post<ApiResponse<Tag>>("/api/tags", { name, color })
      if (data.success && data.data) return data.data
      setError(data.error || "创建失败")
      return null
    } catch {
      setError("网络错误")
      return null
    }
  }, [])

  const updateTag = useCallback(async (id: number, name: string, color: string): Promise<Tag | null> => {
    setError(null)
    try {
      const { data } = await axios.put<ApiResponse<Tag>>(`/api/tags/${id}`, { name, color })
      if (data.success && data.data) return data.data
      setError(data.error || "更新失败")
      return null
    } catch {
      setError("网络错误")
      return null
    }
  }, [])

  const deleteTag = useCallback(async (id: number): Promise<boolean> => {
    setError(null)
    try {
      const { data } = await axios.delete<ApiResponse<null>>(`/api/tags/${id}`)
      return data.success
    } catch {
      setError("网络错误")
      return false
    }
  }, [])

  return { tags, loading, error, fetchTags, createTag, updateTag, deleteTag, setError }
}
