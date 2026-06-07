"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { MoreVertical, Edit, Trash2 } from "lucide-react"
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
import type { Anime } from "@/lib/types"

interface AnimeCardProps {
  anime: Anime
  onEdit?: (anime: Anime) => void
  onDelete?: (anime: Anime) => void
  className?: string
  priority?: boolean
}

/**
 * 动画卡片组件
 */
export function AnimeCard({ anime, onEdit, onDelete, className, priority = false }: AnimeCardProps) {
  return (
    <Card className={cn("media-card group", className)}>
      <Link href={`/anime/${anime.id}`} className="block">
        <div className="cover-container">
          <Image
            src={anime.coverUrl || "/placeholder-cover.svg"}
            alt={anime.titleCn}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className="object-cover"
            unoptimized={!!anime.coverUrl}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            decoding={priority ? undefined : "async"}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        </div>
      </Link>

      <CardContent className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
        <div className="flex items-start justify-between gap-1">
          <StatusBadge status={anime.status} />
          {(onEdit || onDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="opacity-0 group-hover:opacity-100 h-7 w-7 sm:h-6 sm:w-6 inline-flex items-center justify-center rounded hover:bg-muted transition-opacity touch:opacity-100"
                  onClick={(e) => e.preventDefault()}
                  aria-label="更多操作"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(anime)}>
                    <Edit className="h-4 w-4 mr-2" /> 编辑
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => onDelete(anime)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> 删除
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <Link href={`/anime/${anime.id}`} className="block">
          <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 leading-tight hover:text-primary transition-colors">
            {anime.titleCn}
          </h3>
        </Link>

        {anime.titleJp && (
          <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1">{anime.titleJp}</p>
        )}

        <div className="flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground">
          <span className="line-clamp-1">{anime.studio || "未知制作公司"}</span>
          {anime.totalEpisodes ? (
            <span className="flex-shrink-0 ml-1 sm:ml-2">
              {anime.watchedEpisodes}/{anime.totalEpisodes} 集
            </span>
          ) : null}
        </div>

        <StarRating value={anime.rating} readonly size="sm" />
      </CardContent>
    </Card>
  )
}
