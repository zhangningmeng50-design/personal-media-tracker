import type { BookStatus, AnimeStatus, MusicStatus } from "./types"

/**
 * 书籍状态映射
 */
export const BOOK_STATUS_LABELS: Record<BookStatus, string> = {
  WANT_TO_READ: "想看",
  READING: "在读",
  READ: "已读",
  DROPPED: "弃读",
}

/**
 * 动画状态映射
 */
export const ANIME_STATUS_LABELS: Record<AnimeStatus, string> = {
  WANT_TO_WATCH: "想看",
  WATCHING: "在看",
  WATCHED: "已看",
  DROPPED: "弃看",
}

/**
 * 状态列表配置（含颜色）
 */
export const BOOK_STATUS_OPTIONS = [
  { value: "WANT_TO_READ", label: "想看", color: "status-want" },
  { value: "READING", label: "在读", color: "status-progress" },
  { value: "READ", label: "已读", color: "status-done" },
  { value: "DROPPED", label: "弃读", color: "status-dropped" },
] as const

export const MUSIC_STATUS_LABELS: Record<MusicStatus, string> = {
  WANT_TO_LISTEN: "想听",
  LISTENING: "在听",
  LISTENED: "已听",
  DROPPED: "弃听",
}

export const MUSIC_STATUS_OPTIONS = [
  { value: "WANT_TO_LISTEN", label: "想听", color: "status-want" },
  { value: "LISTENING", label: "在听", color: "status-progress" },
  { value: "LISTENED", label: "已听", color: "status-done" },
  { value: "DROPPED", label: "弃听", color: "status-dropped" },
] as const

/**
 * 可播放性筛选选项
 */
export const AVAILABILITY_OPTIONS = [
  { value: "", label: "全部歌曲" },
  { value: "free", label: "免费歌曲" },
  { value: "vip", label: "VIP歌曲" },
] as const

export const ANIME_STATUS_OPTIONS = [
  { value: "WANT_TO_WATCH", label: "想看", color: "status-want" },
  { value: "WATCHING", label: "在看", color: "status-progress" },
  { value: "WATCHED", label: "已看", color: "status-done" },
  { value: "DROPPED", label: "弃看", color: "status-dropped" },
] as const

/**
 * 状态CSS类映射
 */
export const STATUS_COLOR_MAP: Record<string, string> = {
  WANT_TO_READ: "status-want",
  READING: "status-progress",
  READ: "status-done",
  DROPPED: "status-dropped",
  WANT_TO_WATCH: "status-want",
  WATCHING: "status-progress",
  WATCHED: "status-done",
  WANT_TO_LISTEN: "status-want",
  LISTENING: "status-progress",
  LISTENED: "status-done",
}

/**
 * 预设标签颜色列表
 */
export const TAG_COLORS = [
  "#165DFF",
  "#FF7D00",
  "#00B42A",
  "#722ED1",
  "#F53F3F",
  "#14C9C9",
  "#F7BA1E",
  "#3491FA",
  "#F77234",
  "#7BE188",
  "#9FDB1D",
  "#D91AD9",
]

/**
 * Z-Library 镜像地址列表
 */
export const ZLIB_MIRRORS = [
  "https://singlelogin.re",
  "https://1lib.sk",
  "https://z-lib.io",
  "https://singlelogin.se",
]

/**
 * Bangumi API 基础配置
 */
export const BANGUMI_CONFIG = {
  baseUrl: "https://api.bgm.tv/v0",
  userAgent: "PersonalMediaTracker/1.0 (https://github.com/zhaoqi99/media-tracker)",
  rateLimitDelay: 350, // 毫秒，每秒最多约3次请求
  searchLimit: 10,
} as const

/**
 * Bangumi 收藏类型映射到应用状态
 */
export function bangumiTypeToStatus(type: number): string {
  const map: Record<number, string> = {
    1: "WANT_TO_WATCH",
    2: "WATCHED",
    3: "WATCHING",
    4: "DROPPED", // 搁置
    5: "DROPPED", // 抛弃
  }
  return map[type] || "WANT_TO_WATCH"
}

/**
 * Bangumi 评分映射 (1-10 -> 1-10)
 */
export function bangumiRateToRating(rate: number): number | null {
  if (rate === 0) return null
  return Math.round(rate)
}

/**
 * 导航菜单配置
 */
export const NAV_ITEMS = [
  { href: "/", label: "仪表盘", icon: "LayoutDashboard" },
  { href: "/books", label: "书籍", icon: "BookOpen" },
  { href: "/anime", label: "动画", icon: "Tv" },
  { href: "/music", label: "音乐", icon: "Music" },
  { href: "/tags", label: "标签", icon: "Tags" },
] as const
