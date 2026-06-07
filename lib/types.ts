/**
 * 书籍状态枚举
 */
export type BookStatus = "WANT_TO_READ" | "READING" | "READ" | "DROPPED"

/**
 * 动画状态枚举
 */
export type AnimeStatus = "WANT_TO_WATCH" | "WATCHING" | "WATCHED" | "DROPPED"

/**
 * 音乐状态枚举
 */
export type MusicStatus = "WANT_TO_LISTEN" | "LISTENING" | "LISTENED" | "DROPPED"

/**
 * 状态联合类型
 */
export type MediaStatus = BookStatus | AnimeStatus | MusicStatus

/**
 * 书籍数据结构
 */
export interface Book {
  id: number
  title: string
  author: string
  publisher?: string | null
  publishYear?: number | null
  isbn?: string | null
  coverUrl?: string | null
  description?: string | null
  status: BookStatus
  rating?: number | null
  notes?: string | null
  startDate?: string | null
  finishDate?: string | null
  createdAt: string
  updatedAt: string
  tags: Tag[]
}

/**
 * 动画数据结构
 */
export interface Anime {
  id: number
  titleCn: string
  titleJp?: string | null
  coverUrl?: string | null
  summary?: string | null
  studio?: string | null
  airDate?: string | null
  totalEpisodes?: number | null
  watchedEpisodes: number
  bangumiId?: number | null
  status: AnimeStatus
  rating?: number | null
  notes?: string | null
  startDate?: string | null
  finishDate?: string | null
  createdAt: string
  updatedAt: string
  tags: Tag[]
}

/**
 * 音乐数据结构
 */
export interface Music {
  id: number
  title: string
  artist: string
  album?: string | null
  coverUrl?: string | null
  qqMusicId?: string | null
  qqMusicMid?: string | null
  playlistId?: string | null
  duration?: number | null
  canPlayFull?: boolean | null
  status: MusicStatus
  rating?: number | null
  notes?: string | null
  createdAt: string
  updatedAt: string
  tags: Tag[]
}

/**
 * 标签数据结构
 */
export interface Tag {
  id: number
  name: string
  color: string
  createdAt: string
}

/**
 * 创建/更新书籍的输入类型
 */
export interface BookInput {
  title: string
  author: string
  publisher?: string
  publishYear?: number
  isbn?: string
  coverUrl?: string
  description?: string
  status?: BookStatus
  rating?: number
  notes?: string
  startDate?: string
  finishDate?: string
  tagIds?: number[]
}

/**
 * 创建/更新动画的输入类型
 */
export interface AnimeInput {
  titleCn: string
  titleJp?: string
  coverUrl?: string
  summary?: string
  studio?: string
  airDate?: string
  totalEpisodes?: number
  watchedEpisodes?: number
  bangumiId?: number
  status?: AnimeStatus
  rating?: number
  notes?: string
  startDate?: string
  finishDate?: string
  tagIds?: number[]
}

/**
 * 创建/更新音乐的输入类型
 */
export interface MusicInput {
  title: string
  artist: string
  album?: string
  coverUrl?: string
  qqMusicId?: string
  qqMusicMid?: string
  playlistId?: string
  duration?: number
  canPlayFull?: boolean | null
  status?: MusicStatus
  rating?: number
  notes?: string
  tagIds?: number[]
}

/**
 * QQ音乐歌单中的歌曲
 */
export interface QQMusicSong {
  songid: string
  songmid: string
  songname: string
  singer: string
  albumname: string
  albummid: string
  interval?: number
}

/**
 * 已导入歌单
 */
export interface ImportedPlaylist {
  playlistId: string
  playlistName: string
  songCount: number
}

/**
 * 统计数据
 */
export interface Stats {
  bookCount: number
  animeCount: number
  musicCount: number
  booksReadThisMonth: number
  animeWatchedThisMonth: number
  averageBookRating: number
  averageAnimeRating: number
  averageMusicRating: number
  bookStatusDistribution: { status: string; count: number }[]
  animeStatusDistribution: { status: string; count: number }[]
  musicStatusDistribution: { status: string; count: number }[]
  recentBooks: Book[]
  recentAnime: Anime[]
  recentMusic: Music[]
}

/**
 * Bangumi搜索结果
 */
export interface BangumiSearchResult {
  id: number
  name: string
  name_cn: string
  image: string
  summary: string
  air_date: string
  eps?: number
}

/**
 * Bangumi条目详情
 */
export interface BangumiSubject {
  id: number
  name: string
  name_cn: string
  summary: string
  images: {
    large: string
    common: string
    medium: string
    small: string
  }
  eps: number
  air_date: string
  staff: Array<{ name: string; role: string }>
}

/**
 * Bangumi收藏项
 */
export interface BangumiCollectionItem {
  subject_id: number
  subject: {
    id: number
    name: string
    name_cn: string
    images: { large: string; common: string; medium: string; small: string }
    eps: number
    air_date: string
  }
  rate: number
  type: number // 1=想看 2=看过 3=在看 4=搁置 5=抛弃
  comment?: string
}

/**
 * Z-Library搜索结果
 */
export interface ZLibSearchResult {
  id: string
  title: string
  author: string
  coverUrl?: string
  detailUrl: string
}

/**
 * Z-Library书籍详情
 */
export interface ZLibBookDetail {
  title: string
  author: string
  publisher?: string
  publishYear?: number
  isbn?: string
  coverUrl?: string
  description?: string
}

/**
 * 筛选参数
 */
export interface FilterParams {
  status?: string
  search?: string
  tag?: string
  rating?: string
  sort?: string
  year?: string
  page?: string
  availability?: string
}

/**
 * API响应包装
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  total?: number
  page?: number
  pageSize?: number
}

/**
 * 播放器 — 播放队列中的单首歌曲
 */
export interface PlayerTrack {
  musicId: number
  title: string
  artist: string
  coverUrl?: string | null
  qqMusicMid?: string | null
  duration?: number | null
}

/**
 * 播放器 — 流媒体URL及类型
 */
export interface StreamData {
  url: string
  type: "full" | "preview"
}

/**
 * 可播放性筛选
 */
export type AvailabilityFilter = "" | "free" | "vip"
