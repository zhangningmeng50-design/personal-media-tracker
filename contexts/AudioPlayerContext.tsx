"use client"

import * as React from "react"
import type { PlayerTrack } from "@/lib/types"

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
      const track = state.currentTrack!
      setState((prev) => ({ ...prev, isLoading: true, error: null, streamType: null }))

      const audio = audioRef.current!
      let streamUrl: string | null = null
      let streamType: "full" | "preview" = "full"

      // 策略1：通过 Edge Function 从边缘节点调用QQ音乐API（绕过地域封锁）
      if (track.qqMusicMid) {
        try {
          const res = await fetch(
            `/api/qqmusic/stream-url?songmid=${encodeURIComponent(track.qqMusicMid)}`
          )
          const json = await res.json()
          if (json.success && json.data?.url) {
            streamUrl = json.data.url
            streamType = json.data.type
          }
        } catch {
          // Edge Function 失败，继续尝试其他方式
        }
      }

      // 策略2：Edge Function 失败时，使用服务端代理端点
      if (!streamUrl) {
        streamUrl = `/api/music/play?id=${track.musicId}`
      }

      audio.src = streamUrl
      audio.load()

      // 播放音频
      audio.play().catch(() => {
        // 浏览器可能阻止自动播放（用户需要手动点击播放）
      })

      setState((prev) => ({
        ...prev,
        isLoading: false,
        streamType,
      }))

      // 后台更新 canPlayFull 到数据库（非阻塞）
      if (track.qqMusicMid) {
        fetch(`/api/music/stream?id=${track.musicId}`).catch(() => {})
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
