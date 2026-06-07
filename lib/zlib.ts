import axios from "axios"
import * as cheerio from "cheerio"
import { HttpsProxyAgent } from "https-proxy-agent"
import { ZLIB_MIRRORS } from "./constants"
import type { ZLibSearchResult, ZLibBookDetail } from "./types"

/**
 * Z-Library 网页解析器
 * 使用 cheerio 解析搜索结果和详情页面
 *
 * 免责声明：
 * 此功能仅用于个人学习研究目的。请遵守当地法律法规，
 * 尊重版权，仅导入你拥有合法访问权限的内容。
 */

/**
 * 延迟函数
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 获取代理配置（与 Bangumi 共用）
 */
function getProxyAgent(): HttpsProxyAgent<string> | undefined {
  const proxyUrl = process.env.BANGUMI_PROXY || process.env.HTTPS_PROXY || process.env.HTTP_PROXY
  if (proxyUrl) {
    return new HttpsProxyAgent(proxyUrl)
  }
  return undefined
}

/**
 * 尝试使用多个镜像访问Z-Library
 */
async function tryWithMirrors<T>(
  fetcher: (mirror: string) => Promise<T>
): Promise<T> {
  for (const mirror of ZLIB_MIRRORS) {
    try {
      return await fetcher(mirror)
    } catch (error: any) {
      // 尝试下一个镜像
      console.warn(`Z-Library镜像 ${mirror} 访问失败:`, error.message)
    }
  }
  throw new Error("所有Z-Library镜像均无法访问，请检查网络连接或更换镜像")
}

/**
 * 搜索Z-Library书籍
 */
export async function searchZLibBooks(
  query: string,
  mirror?: string
): Promise<ZLibSearchResult[]> {
  const doSearch = async (baseUrl: string) => {
    await delay(1000) // 请求延迟

    const searchUrl = `${baseUrl}/s/${encodeURIComponent(query)}`
    const httpsAgent = getProxyAgent()
    const response = await axios.get(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
      httpsAgent,
      timeout: 20000,
    })

    const $ = cheerio.load(response.data)
    const results: ZLibSearchResult[] = []

    // 解析搜索结果（适配不同版本的Z-Library页面结构）
    $(".book-item, .resItemBox, .brick").each((_i, el) => {
      const $el = $(el)
      const title =
        $el.find("h3 a, .book-title, .title").text().trim() ||
        $el.find("a[href*='/book/']").first().text().trim()
      const author =
        $el.find(".author, .book-author, [itemprop='author']").text().trim()
      const cover =
        $el.find("img").first().attr("src") ||
        $el.find("img").first().attr("data-src") ||
        undefined
      const detailLink =
        $el.find("h3 a, a[href*='/book/']").first().attr("href") || ""
      const id = detailLink.split("/").pop()?.split("-")[0] || ""

      if (title) {
        results.push({
          id,
          title,
          author,
          coverUrl: cover,
          detailUrl: detailLink.startsWith("http")
            ? detailLink
            : `${baseUrl}${detailLink}`,
        })
      }
    })

    return results
  }

  if (mirror) {
    try {
      return await doSearch(mirror)
    } catch (error: any) {
      throw new Error(`搜索失败: ${error.message}`)
    }
  }

  return tryWithMirrors(doSearch)
}

/**
 * 获取Z-Library书籍详情
 */
export async function getZLibBookDetail(
  url: string
): Promise<ZLibBookDetail | null> {
  await delay(1000)

  try {
    const httpsAgent = getProxyAgent()
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
      httpsAgent,
      timeout: 20000,
    })

    const $ = cheerio.load(response.data)

    const title =
      $("h1, .book-title, .detail-title").first().text().trim()
    const author =
      $(".author, .book-author, [itemprop='author']")
        .first()
        .text()
        .replace("by ", "")
        .trim()
    const publisher =
      $(".publisher, [itemprop='publisher']").first().text().trim() || undefined
    const publishYearStr =
      $(".year, .property_year .property_value")
        .first()
        .text()
        .trim()
    const publishYear = publishYearStr
      ? parseInt(publishYearStr.match(/\d{4}/)?.[0] || "")
      : undefined
    const isbn =
      $(".isbn, .property_isbn .property_value")
        .first()
        .text()
        .trim() || undefined
    const coverUrl =
      $(".book-cover img, .detail-cover img, #cover img")
        .first()
        .attr("src") || undefined
    const description =
      $(".description, .book-description, #description, .fullDescription")
        .first()
        .text()
        .trim() || undefined

    return {
      title: title || "",
      author: author || "未知作者",
      publisher: publisher || undefined,
      publishYear: isNaN(publishYear as number) ? undefined : publishYear,
      isbn,
      coverUrl,
      description,
    }
  } catch (error) {
    console.error("获取Z-Library书籍详情失败:", error)
    throw new Error("获取书籍详情失败")
  }
}
