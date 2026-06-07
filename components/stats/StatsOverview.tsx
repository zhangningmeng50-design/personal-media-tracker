import * as React from "react"
import { BookOpen, Tv, Music, Star, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsOverviewProps {
  bookCount: number
  animeCount: number
  musicCount: number
  booksThisMonth: number
  animeThisMonth: number
  avgBookRating: number
  avgAnimeRating: number
  avgMusicRating: number
}

const statItems = [
  { key: "bookCount", label: "书籍总数", icon: BookOpen, color: "text-blue-500" },
  { key: "animeCount", label: "动画总数", icon: Tv, color: "text-orange-500" },
  { key: "musicCount", label: "音乐总数", icon: Music, color: "text-purple-500" },
  { key: "booksThisMonth", label: "本月读完", icon: TrendingUp, color: "text-green-500" },
  { key: "animeThisMonth", label: "本月看完", icon: TrendingUp, color: "text-cyan-500" },
] as const

/**
 * 统计概览卡片网格
 */
export function StatsOverview({
  bookCount,
  animeCount,
  musicCount,
  booksThisMonth,
  animeThisMonth,
  avgBookRating,
  avgAnimeRating,
  avgMusicRating,
}: StatsOverviewProps) {
  const values = {
    bookCount,
    animeCount,
    musicCount,
    booksThisMonth,
    animeThisMonth,
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {statItems.map(({ key, label, icon: Icon, color }) => (
        <Card key={key}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold mt-1">{values[key]}</p>
              </div>
              <div className={cn("p-2 rounded-full bg-muted", color)}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card className="col-span-1 lg:col-span-3">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">书籍平均评分</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold">{avgBookRating || "-"}</span>
                <span className="text-sm text-muted-foreground">/10</span>
              </div>
            </div>
            <div className="border-l pl-4">
              <p className="text-xs text-muted-foreground">动画平均评分</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold">{avgAnimeRating || "-"}</span>
                <span className="text-sm text-muted-foreground">/10</span>
              </div>
            </div>
            <div className="border-l pl-4">
              <p className="text-xs text-muted-foreground">音乐平均评分</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold">{avgMusicRating || "-"}</span>
                <span className="text-sm text-muted-foreground">/10</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
