"use client"

import * as React from "react"
import Image from "next/image"
import { MoreVertical, Edit, Trash2, Music } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { StarRating } from "@/components/shared/StarRating"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Music as MusicType } from "@/lib/types"

interface MusicCardProps {
  music: MusicType
  onEdit?: (music: MusicType) => void
  onDelete?: (music: MusicType) => void
  className?: string
  priority?: boolean
}

/**
 * 音乐卡片组件
 * 显示封面、歌名、歌手、专辑、状态、评分
 */
export function MusicCard({
  music,
  onEdit,
  onDelete,
  className,
  priority = false,
}: MusicCardProps) {
  return (
    <Card className={cn("media-card group", className)}>
      {/* 封面图片 */}
      <div className="cover-container">
        {music.coverUrl ? (
          <Image
            src={music.coverUrl}
            alt={music.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className="object-cover"
            unoptimized
            priority={priority}
            loading={priority ? undefined : "lazy"}
            decoding={priority ? undefined : "async"}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Music className="h-8 w-8 text-muted-foreground/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>

      <CardContent className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
        {/* 状态标签和菜单 */}
        <div className="flex items-start justify-between gap-1">
          <StatusBadge status={music.status} />
          {(onEdit || onDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="h-7 w-7 sm:h-6 sm:w-6 inline-flex items-center justify-center rounded bg-muted hover:bg-accent transition-colors"
                  onClick={(e) => e.preventDefault()}
                  aria-label="更多操作"
                >
                  <MoreVertical className="h-4 w-4 text-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(music)}>
                    <Edit className="h-4 w-4 mr-2" />
                    编辑
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => onDelete(music)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    删除
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* 歌名 */}
        <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 leading-tight">
          {music.title}
        </h3>

        {/* 歌手 / 专辑 */}
        <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1">
          {music.artist}
          {music.album && ` · ${music.album}`}
        </p>

        {/* 评分 */}
        <StarRating value={music.rating} readonly size="sm" />
      </CardContent>
    </Card>
  )
}
