"use client"

import * as React from "react"
import Image from "next/image"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Music,
  ChevronUp,
} from "lucide-react"
import { useAudioPlayer } from "@/contexts/AudioPlayerContext"

/**
 * 底部固定播放器条
 * 仅在有歌曲播放时显示
 */
export function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    streamType,
    isLoading,
    error,
    queue,
    queueIndex,
    togglePlay,
    next,
    prev,
    seek,
    audioRef,
  } = useAudioPlayer()

  const [dialogOpen, setDialogOpen] = React.useState(false)

  // 播放器显示时为 body 添加底部间距
  React.useEffect(() => {
    document.body.style.paddingBottom = "72px"
    return () => {
      document.body.style.paddingBottom = ""
    }
  }, [])

  if (!currentTrack) return null

  const displayDuration = streamType === "preview" ? Math.min(duration || 30, 30) : duration
  const progress = displayDuration > 0 ? (currentTime / displayDuration) * 100 : 0

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const newTime = ratio * (displayDuration || 0)
    seek(newTime)
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg">
        {/* 进度条（细线） */}
        <div
          className="h-1 bg-muted cursor-pointer group/progress"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-primary transition-all duration-100"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex items-center gap-3 px-3 py-2 max-w-[1600px] mx-auto">
          {/* 封面 + 点击展开详情 */}
          <button
            className="flex items-center gap-3 flex-1 min-w-0"
            onClick={() => setDialogOpen(true)}
          >
            <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden bg-muted">
              {currentTrack.coverUrl ? (
                <Image
                  src={currentTrack.coverUrl}
                  alt={currentTrack.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Music className="h-5 w-5 text-muted-foreground/40" />
                </div>
              )}
            </div>
            <div className="min-w-0 text-left">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium line-clamp-1">
                  {currentTrack.title}
                </p>
                {streamType === "preview" && (
                  <span className="text-[10px] px-1 py-0.5 rounded bg-orange-500/90 text-white flex-shrink-0">
                    试听
                  </span>
                )}
                {isLoading && (
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">
                    加载中...
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {currentTrack.artist}
                {error && (
                  <span className="text-red-500 ml-1">{error}</span>
                )}
              </p>
            </div>
          </button>

          {/* 时间 */}
          <span className="text-[10px] text-muted-foreground hidden sm:block w-[72px] text-right tabular-nums">
            {formatTime(currentTime)} / {formatTime(displayDuration || 0)}
          </span>

          {/* 控制按钮 */}
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              className="h-8 w-8 flex items-center justify-center rounded hover:bg-muted transition-colors"
              title="上一首"
            >
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              onClick={togglePlay}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              title={isPlaying ? "暂停" : "播放"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </button>
            <button
              onClick={next}
              className="h-8 w-8 flex items-center justify-center rounded hover:bg-muted transition-colors"
              title="下一首"
            >
              <SkipForward className="h-4 w-4" />
            </button>

            {/* 队列信息 */}
            {queue.length > 1 && (
              <button
                onClick={() => setDialogOpen(true)}
                className="h-8 w-8 hidden sm:flex items-center justify-center rounded hover:bg-muted transition-colors"
                title="播放队列"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* 展开弹窗 */}
        {dialogOpen && (
          <AudioPlayerDialog onClose={() => setDialogOpen(false)} />
        )}
      </div>
    </>
  )
}

/**
 * 播放器详情弹窗
 */
function AudioPlayerDialog({ onClose }: { onClose: () => void }) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    streamType,
    isLoading,
    error,
    queue,
    queueIndex,
    togglePlay,
    next,
    prev,
    seek,
    playQueue,
  } = useAudioPlayer()

  const displayDuration = streamType === "preview" ? Math.min(duration || 30, 30) : duration
  const progress = displayDuration > 0 ? (currentTime / displayDuration) * 100 : 0

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const newTime = ratio * (displayDuration || 0)
    seek(newTime)
  }

  return (
    <div
      className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex flex-col"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* 顶部栏 */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onClose}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          收起
        </button>
        <span className="text-xs text-muted-foreground">
          播放队列 ({queue.length})
        </span>
        <div className="w-8" />
      </div>

      {/* 封面 + 信息 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-xl overflow-hidden bg-muted shadow-lg">
          {currentTrack?.coverUrl ? (
            <Image
              src={currentTrack.coverUrl}
              alt={currentTrack?.title || ""}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="h-16 w-16 text-muted-foreground/40" />
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-lg font-bold">{currentTrack?.title}</h2>
            {streamType === "preview" && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-orange-500/90 text-white">
                试听
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {currentTrack?.artist}
          </p>
          {isLoading && (
            <p className="text-xs text-muted-foreground mt-1">加载中...</p>
          )}
          {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </div>

        {/* 进度条 */}
        <div className="w-full max-w-md space-y-1">
          <div
            className="h-1.5 bg-muted rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-100 relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full scale-0 hover:scale-100 transition-transform" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(displayDuration || 0)}</span>
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <SkipBack className="h-6 w-6" />
          </button>
          <button
            onClick={togglePlay}
            className="h-14 w-14 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {isPlaying ? (
              <Pause className="h-7 w-7" />
            ) : (
              <Play className="h-7 w-7 ml-0.5" />
            )}
          </button>
          <button
            onClick={next}
            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <SkipForward className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* 队列列表 */}
      <div className="max-h-[40vh] overflow-y-auto border-t">
        <div className="max-w-2xl mx-auto p-3 space-y-1">
          {queue.map((track, idx) => (
            <button
              key={`${track.musicId}-${idx}`}
              onClick={() => playQueue(queue, idx)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
                idx === queueIndex
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted"
              }`}
            >
              <span className="text-xs text-muted-foreground w-5 text-right tabular-nums">
                {idx + 1}
              </span>
              <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden bg-muted">
                {track.coverUrl ? (
                  <Image
                    src={track.coverUrl}
                    alt={track.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music className="h-4 w-4 text-muted-foreground/40" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-1">
                  {track.title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {track.artist}
                </p>
              </div>
              {idx === queueIndex && isPlaying && (
                <span className="text-[10px] text-primary">正在播放</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
