"use client"

import * as React from "react"
import axios from "axios"
import type { PlayerTrack, StreamData, ApiResponse } from "@/lib/types"

interface AudioPlayerState {
  currentTrack: PlayerTrack | null
  queue: PlayerTrack[]
  queueIndex: number
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isLoading: boolean
  streamType: "full" | "preview" | null
  error: string | null
}

interface AudioPlayerContextValue extends AudioPlayerState {
  play: (track: PlayerTrack) => void
  playQueue: (tracks: PlayerTrack[], startIndex?: number) => void
  addToQueue: (tracks: PlayerTrack[]) => void
  togglePlay: () => void
  next: () => void
  prev: () => void
  seek: (time: number) => void
  setVolume: (v: number) => void
  clearQueue: () => void
  audioRef: React.RefObject<HTMLAudioElement | null>
}

const AudioPlayerContext = React.createContext<AudioPlayerContextValue | null>(null)

export function useAudioPlayer(): AudioPlayerContextValue {
  const ctx = React.useContext(AudioPlayerContext)
  if (!ctx) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider")
  }
  return ctx
}

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const [state, setState] = React.useState<AudioPlayerState>({
    currentTrack: null,
    queue: [],
    queueIndex: -1,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isLoading: false,
    streamType: null,
    error: null,
  })

  // 创建 audio 元素
  React.useEffect(() => {
    const audio = new Audio()
    audio.volume = state.volume
    audioRef.current = audio

    const onTimeUpdate = () => {
      setState((prev) => ({ ...prev, currentTime: audio.currentTime }))
    }
    const onDurationChange = () => {
      setState((prev) => ({ ...prev, duration: audio.duration || 0 }))
    }
    const onEnded = () => {
      // 自动播放下一首
      setState((prev) => {
        const nextIdx = prev.queueIndex + 1
        if (nextIdx < prev.queue.length) {
          return { ...prev, queueIndex: nextIdx, currentTrack: prev.queue[nextIdx], isPlaying: true, currentTime: 0, duration: 0, streamType: null, error: null }
        }
        return { ...prev, isPlaying: false }
      })
    }
    const onPlay = () => setState((prev) => ({ ...prev, isPlaying: true }))
    const onPause = () => setState((prev) => ({ ...prev, isPlaying: false }))

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("durationchange", onDurationChange)
    audio.addEventListener("ended", onEnded)
    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("durationchange", onDurationChange)
      audio.removeEventListener("ended", onEnded)
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
      audio.pause()
      audio.src = ""
    }
  }, [])

  // 同步音量
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume
    }
  }, [state.volume])

  // 当 currentTrack 变化且非空时，加载并播放流URL
  React.useEffect(() => {
    if (!state.currentTrack || !audioRef.current) return

    const loadStream = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null, streamType: null }))
      try {
        // 先获取流类型信息（用于展示"试听"标签）
        const streamPromise = axios.get<ApiResponse<StreamData>>(
          `/api/music/stream?id=${state.currentTrack!.musicId}`
        )

        // 同时设置音频源为代理端点（确保HTTPS，无混内容问题）
        const audio = audioRef.current!
        audio.src = `/api/music/play?id=${state.currentTrack!.musicId}`
        audio.load()

        const { data } = await streamPromise
        if (data.success && data.data) {
          audio.play().catch(() => {
            // 浏览器可能阻止自动播放
          })
          setState((prev) => ({
            ...prev,
            isLoading: false,
            streamType: data.data!.type,
          }))
        } else {
          // 流信息获取失败，但代理端点可能仍然可用
          audio.play().catch(() => {})
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: data.error || null,
          }))
        }
      } catch {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "获取播放链接失败",
        }))
      }
    }

    loadStream()
  }, [state.currentTrack?.musicId])

  const play = React.useCallback((track: PlayerTrack) => {
    setState((prev) => ({
      ...prev,
      currentTrack: track,
      queue: [track],
      queueIndex: 0,
      currentTime: 0,
      duration: 0,
      streamType: null,
      error: null,
    }))
  }, [])

  const playQueue = React.useCallback(
    (tracks: PlayerTrack[], startIndex = 0) => {
      if (!tracks.length) return
      const idx = Math.max(0, Math.min(startIndex, tracks.length - 1))
      setState((prev) => ({
        ...prev,
        currentTrack: tracks[idx],
        queue: tracks,
        queueIndex: idx,
        currentTime: 0,
        duration: 0,
        streamType: null,
        error: null,
      }))
    },
    []
  )

  const addToQueue = React.useCallback((tracks: PlayerTrack[]) => {
    setState((prev) => ({
      ...prev,
      queue: [...prev.queue, ...tracks],
    }))
  }, [])

  const togglePlay = React.useCallback(() => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [])

  const next = React.useCallback(() => {
    setState((prev) => {
      const nextIdx = prev.queueIndex + 1
      if (nextIdx < prev.queue.length) {
        return {
          ...prev,
          queueIndex: nextIdx,
          currentTrack: prev.queue[nextIdx],
          currentTime: 0,
          duration: 0,
          streamType: null,
          error: null,
        }
      }
      return prev
    })
  }, [])

  const prev = React.useCallback(() => {
    if (!audioRef.current) return
    // 播放超过3秒则从头播放，否则切上一首
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0
      return
    }
    setState((prev) => {
      const prevIdx = prev.queueIndex - 1
      if (prevIdx >= 0) {
        return {
          ...prev,
          queueIndex: prevIdx,
          currentTrack: prev.queue[prevIdx],
          currentTime: 0,
          duration: 0,
          streamType: null,
          error: null,
        }
      }
      return prev
    })
  }, [])

  const seek = React.useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }, [])

  const setVolume = React.useCallback((v: number) => {
    setState((prev) => ({ ...prev, volume: Math.max(0, Math.min(1, v)) }))
  }, [])

  const clearQueue = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }
    setState((prev) => ({
      ...prev,
      currentTrack: null,
      queue: [],
      queueIndex: -1,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      streamType: null,
      error: null,
    }))
  }, [])

  const value = React.useMemo(
    () => ({
      ...state,
      play,
      playQueue,
      addToQueue,
      togglePlay,
      next,
      prev,
      seek,
      setVolume,
      clearQueue,
      audioRef,
    }),
    [state, play, playQueue, addToQueue, togglePlay, next, prev, seek, setVolume, clearQueue]
  )

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  )
}
