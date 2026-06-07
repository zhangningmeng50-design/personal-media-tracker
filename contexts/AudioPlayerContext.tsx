"use client"

import * as React from "react"
import type { PlayerTrack } from "@/lib/types"

// ============ JSONP 辅助：浏览器直连QQ音乐绕过CORS ============

interface StreamResult {
  url: string
  type: "full" | "preview"
}

/**
 * 通过 JSONP (动态 script 标签) 调用 QQ 音乐 vkey API
 * 浏览器直连，绕过 Vercel 服务端 IP 封锁和 CORS 限制
 */
function fetchStreamUrlJsonp(songmid: string): Promise<StreamResult | null> {
  return new Promise((resolve) => {
    const callbackName =
      "_qqmusic_cb_" + Date.now() + "_" + Math.random().toString(36).slice(2)
    let settled = false

    const timeoutId = setTimeout(() => {
      if (settled) return
      settled = true
      cleanup()
      resolve(null)
    }, 12000)

    const cleanup = () => {
      clearTimeout(timeoutId)
      delete (window as any)[callbackName]
      const el = document.getElementById(callbackName)
      if (el) el.remove()
    }

    ;(window as any)[callbackName] = (data: any) => {
      if (settled) return
      settled = true
      cleanup()

      try {
        const info = data?.req_0?.data?.midurlinfo?.[0]
        const sip = data?.req_0?.data?.sip
        if (info && sip?.length) {
          const baseUrl = sip[0].replace(/^http:\/\//, "https://")
          if (info.purl) {
            resolve({ url: baseUrl + info.purl, type: "full" })
            return
          } else if (info.opi30surl) {
            resolve({ url: baseUrl + info.opi30surl, type: "preview" })
            return
          }
        }
        resolve(null)
      } catch {
        resolve(null)
      }
    }

    const params = {
      req_0: {
        module: "vkey.GetVkeyServer",
        method: "CgiGetVkey",
        param: {
          guid: "0",
          songmid: [songmid],
          songtype: [0],
          uin: "0",
          loginflag: 1,
          platform: "20",
        },
      },
    }
    const dataParam = encodeURIComponent(JSON.stringify(params))
    const script = document.createElement("script")
    script.id = callbackName
    script.src = `https://u.y.qq.com/cgi-bin/musicu.fcg?callback=${callbackName}&format=jsonp&data=${dataParam}`
    script.onerror = () => {
      if (settled) return
      settled = true
      cleanup()
      resolve(null)
    }
    document.head.appendChild(script)
  })
}

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

      // 策略1：JSONP 直连 QQ 音乐（浏览器在中国，不受IP封锁影响，绕过CORS）
      if (track.qqMusicMid) {
        const result = await fetchStreamUrlJsonp(track.qqMusicMid)
        if (result) {
          streamUrl = result.url
          streamType = result.type
        }
      }

      // 策略2：JSONP 失败时，使用服务端代理端点
      if (!streamUrl) {
        streamUrl = `/api/music/play?id=${track.musicId}`
      }

      audio.src = streamUrl
      audio.load()

      // 尝试自动播放
      audio.play().catch(() => {
        // 浏览器可能阻止自动播放（用户需手动点击播放按钮）
      })

      setState((prev) => ({
        ...prev,
        isLoading: false,
        streamType,
      }))

      // 后台更新 canPlayFull 到数据库（非阻塞，fire-and-forget）
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
