import axios from "axios"
import { HttpsProxyAgent } from "https-proxy-agent"
import { BANGUMI_CONFIG } from "./constants"
import type { BangumiSearchResult, BangumiSubject, BangumiCollectionItem } from "./types"

/**
 * Bangumi API 客户端
 * 封装搜索、条目详情和用户收藏接口
 */

let lastRequestTime = 0

/**
 * 获取 HTTP 代理配置
 * 国内网络环境需要代理才能访问 Bangumi API
 */
function getProxyAgent(): HttpsProxyAgent<string> | undefined {
  const proxyUrl = process.env.BANGUMI_PROXY || process.env.HTTPS_PROXY || process.env.HTTP_PROXY
  if (proxyUrl) {
    return new HttpsProxyAgent(proxyUrl)
  }
  return undefined
}

/**
 * 限速函数：确保两次请求之间有足够延迟
 */
async function rateLimit(): Promise<void> {
  const now = Date.now()
  const elapsed = now - lastRequestTime
  if (elapsed < BANGUMI_CONFIG.rateLimitDelay) {
    await new Promise((resolve) =>
      setTimeout(resolve, BANGUMI_CONFIG.rateLimitDelay - elapsed)
    )
  }
  lastRequestTime = Date.now()
}

/**
 * 搜索Bangumi动画
 * API 变更 (2026): 由 GET 改为 POST，请求体为 JSON
 */
export async function searchBangumiSubjects(
  keyword: string,
  limit: number = 10
): Promise<BangumiSearchResult[]> {
  await rateLimit()
  try {
    const httpsAgent = getProxyAgent()
    const response = await axios.post(
      `${BANGUMI_CONFIG.baseUrl}/search/subjects`,
      {
        keyword,
        filter: { type: [2] }, // type: 2 = 动画
        sort: "match",
      },
      {
        params: { limit },
        headers: {
          "User-Agent": BANGUMI_CONFIG.userAgent,
          "Content-Type": "application/json",
        },
        httpsAgent,
        timeout: 10000,
      }
    )

    const body = response.data
    // 新 API 返回分页格式: { data: [...], total, limit, offset }
    if (body && body.data) {
      return body.data.map((item: any) => ({
        id: item.id,
        name: item.name || "",
        name_cn: item.name_cn || "",
        image: item.image || item.images?.large || item.images?.common || "",
        summary: item.summary || "",
        air_date: item.date || item.air_date || "",  // 新字段名 date, 兼容旧字段名
        eps: item.eps || item.eps_count || undefined,
      }))
    }
    return []
  } catch (error: any) {
    console.error("Bangumi搜索失败:", error?.response?.status, error?.message)
    if (error?.response?.status === 429) {
      throw new Error("请求过于频繁，请稍后再试")
    }
    throw new Error("Bangumi搜索失败，请检查网络连接")
  }
}

/**
 * 获取Bangumi条目详情
 */
export async function getBangumiSubject(
  subjectId: number
): Promise<BangumiSubject | null> {
  await rateLimit()
  try {
    const httpsAgent = getProxyAgent()
    const response = await axios.get(
      `${BANGUMI_CONFIG.baseUrl}/subjects/${subjectId}`,
      {
        headers: {
          "User-Agent": BANGUMI_CONFIG.userAgent,
        },
        httpsAgent,
        timeout: 10000,
      }
    )

    const item = response.data
    if (!item) return null

    return {
      id: item.id,
      name: item.name || "",
      name_cn: item.name_cn || "",
      summary: item.summary || "",
      images: item.images || {},
      eps: item.eps || item.eps_count || 0,
      air_date: item.date || item.air_date || "",  // 新字段名 date
      staff: (item.staff || item.crt || []).map((s: any) => ({
        name: s.name || "",
        role: s.role_name || s.job || "",
      })),
    }
  } catch (error: any) {
    console.error("获取Bangumi条目详情失败:", error?.response?.status)
    if (error?.response?.status === 404) {
      return null
    }
    throw new Error("获取条目详情失败")
  }
}

/**
 * 获取用户Bangumi收藏列表（自动翻页获取全部）
 * API 变更 (2026): 返回分页格式 { data, total, limit, offset }
 * 收藏中的条目使用 SlimSubject 格式 (short_summary 替代 summary, 无 air_date)
 */
export async function getBangumiCollections(
  username: string
): Promise<BangumiCollectionItem[]> {
  await rateLimit()
  const httpsAgent = getProxyAgent()
  const LIMIT = 50
  const allItems: BangumiCollectionItem[] = []

  try {
    // 首次请求，获取 total
    const firstResponse = await axios.get(
      `${BANGUMI_CONFIG.baseUrl}/users/${username}/collections`,
      {
        params: {
          subject_type: 2,
          limit: LIMIT,
          offset: 0,
        },
        headers: { "User-Agent": BANGUMI_CONFIG.userAgent },
        httpsAgent,
        timeout: 15000,
      }
    )

    const firstBody = firstResponse.data
    if (!firstBody || !firstBody.data) return []

    // 添加第一页数据
    allItems.push(...firstBody.data)
    const total = firstBody.total || 0

    // 如果还有更多页，继续请求
    let offset = LIMIT
    while (offset < total) {
      await rateLimit()
      const response = await axios.get(
        `${BANGUMI_CONFIG.baseUrl}/users/${username}/collections`,
        {
          params: {
            subject_type: 2,
            limit: LIMIT,
            offset,
          },
          headers: { "User-Agent": BANGUMI_CONFIG.userAgent },
          httpsAgent,
          timeout: 15000,
        }
      )
      const body = response.data
      if (body && body.data) {
        allItems.push(...body.data)
      }
      offset += LIMIT
    }

    // 映射到返回格式
    return allItems.map((item: any) => ({
      subject_id: item.subject_id,
      subject: item.subject
        ? {
            id: item.subject.id,
            name: item.subject.name || "",
            name_cn: item.subject.name_cn || "",
            images: item.subject.images || {},
            eps: item.subject.eps || item.subject.eps_count || 0,
            air_date: "",
          }
        : null,
      rate: item.rate || 0,
      type: item.type || 1,
      comment: item.comment || "",
    }))
  } catch (error: any) {
    console.error("获取Bangumi收藏失败:", error?.response?.status)
    if (error?.response?.status === 404) {
      throw new Error("用户不存在或收藏列表为空")
    }
    if (error?.response?.status === 401) {
      throw new Error("该用户收藏为私有，无法获取")
    }
    throw new Error("获取收藏列表失败，请检查用户名是否正确")
  }
}

// 辅助函数 bangumiTypeToStatus / bangumiRateToRating 已移至 @/lib/constants
// 避免在客户端组件中引入 Node.js 依赖 (https-proxy-agent)
