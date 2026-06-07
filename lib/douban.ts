import axios from "axios"
import * as cheerio from "cheerio"

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getHeaders() {
  return {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
  }
}

export interface DoubanSearchResult {
  id: string
  title: string
  author: string
  coverUrl?: string
  rating?: number
  year?: string
}

export interface DoubanBookDetail {
  title: string
  author: string
  publisher?: string
  publishYear?: number
  isbn?: string
  coverUrl?: string
  description?: string
  rating?: number
}

function decode(s: string): string {
  return s
    .replace(/\\u([0-9a-fA-F]{4})/g, (_: string, c: string) =>
      String.fromCharCode(parseInt(c, 16))
    )
    .replace(/\\\//g, "/")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
}

export async function searchDoubanBooks(
  query: string,
  limit: number = 10
): Promise<DoubanSearchResult[]> {
  await delay(800)

  try {
    const q = encodeURIComponent(query)
    const response = await axios.get(
      "https://book.douban.com/subject_search?search_text=" + q,
      { headers: getHeaders(), timeout: 15000 }
    )

    const html = response.data as string
    const results: DoubanSearchResult[] = []
    const seen = new Set<string>()

    // 豆瓣新版搜索页数据嵌入在 HTML 中的 JSON，结构为:
    // {"title":"书名","...":"...","url":"https:\/\/book.douban.com\/subject\/ID\/"}
    // 使用字符串搜索在所有 subject/ID/ 附近找 title

    const subjectPrefix = "subject/"
    let idx = 0
    while (idx < html.length && results.length < limit) {
      // 找下一个 subject/
      const subPos = html.indexOf(subjectPrefix, idx)
      if (subPos === -1) break

      // 提取 subject ID
      const idStart = subPos + subjectPrefix.length
      const idEnd = html.indexOf("/", idStart)
      idx = idEnd > 0 ? idEnd : idStart + 1
      if (idEnd === -1) continue

      const subjectId = html.substring(idStart, idEnd)
      if (!subjectId.match(/^\d+$/)) continue

      if (seen.has(subjectId)) continue

      // 向前搜索 title（在同一个 JSON blob 中，title 在 url 前面）
      const lookStart = Math.max(0, subPos - 2000)
      const chunk = html.substring(lookStart, subPos)

      // 找 "title": " (JSON 格式带空格)
      const titleTag = '"title": "'
      const titleTagPos = chunk.lastIndexOf(titleTag)
      if (titleTagPos === -1) continue

      const valStart = titleTagPos + titleTag.length
      let valEnd = valStart
      while (valEnd < chunk.length) {
        if (chunk[valEnd] === "\\" && valEnd + 1 < chunk.length) {
          valEnd += 2 // skip escaped char
        } else if (chunk[valEnd] === '"') {
          break
        } else {
          valEnd++
        }
      }

      const titleRaw = chunk.substring(valStart, valEnd)
      const title = decode(titleRaw)

      // 将 chunk 周围的整个 JSON 段用于提取其他字段
      // 找 abstract
      const absTag = '"abstract": "'
      const absTagPos = chunk.lastIndexOf(absTag)
      let abstract = ""
      if (absTagPos >= 0) {
        const aStart = absTagPos + absTag.length
        let aEnd = aStart
        while (aEnd < chunk.length) {
          if (chunk[aEnd] === "\\" && aEnd + 1 < chunk.length) { aEnd += 2 }
          else if (chunk[aEnd] === '"') { break }
          else { aEnd++ }
        }
        abstract = decode(chunk.substring(aStart, aEnd))
      }

      // 找 cover_url
      const coverTag = '"cover_url": "'
      const coverTagPos = chunk.lastIndexOf(coverTag)
      let coverUrl: string | undefined
      if (coverTagPos >= 0) {
        const cStart = coverTagPos + coverTag.length
        let cEnd = cStart
        while (cEnd < chunk.length) {
          if (chunk[cEnd] === "\\" && cEnd + 1 < chunk.length) { cEnd += 2 }
          else if (chunk[cEnd] === '"') { break }
          else { cEnd++ }
        }
        const raw = chunk.substring(cStart, cEnd)
        coverUrl = raw ? decode(raw) : undefined
      }

      // 找 rating value
      const ratingMatch = chunk.match(/"value":([\d.]+)/)
      const rating = ratingMatch ? parseFloat(ratingMatch[1]) : undefined

      if (title) {
        seen.add(subjectId)
        const parts = abstract.split(" / ")
        const author = parts[0] || ""
        const yearMatch = abstract.match(/(\d{4})/)
        const year = yearMatch ? yearMatch[1] : undefined
        results.push({ id: subjectId, title, author, coverUrl, rating, year })
      }
    }

    return results
  } catch (error: any) {
    console.error("豆瓣搜索失败:", error.message)
    throw new Error("豆瓣搜索失败，请检查网络连接")
  }
}

export async function getDoubanBookDetail(
  subjectId: string
): Promise<DoubanBookDetail | null> {
  await delay(500)

  try {
    const url = "https://book.douban.com/subject/" + subjectId + "/"
    const response = await axios.get(url, {
      headers: getHeaders(),
      timeout: 15000,
    })

    const $ = cheerio.load(response.data)

    const title = $("#wrapper h1 span").first().text().trim()
    const coverUrl = $("#mainpic img").first().attr("src") || undefined

    const infoText = $("#info").text()
    const authorMatch = infoText.match(/作者[:\s]*([^\n]+)/)
    const author = authorMatch?.[1]?.trim() || ""
    const publisherMatch = infoText.match(/出版社[:\s]*([^\n]+)/)
    const publisher = publisherMatch?.[1]?.trim() || undefined
    const isbnMatch = infoText.match(/ISBN[:\s]*([^\n]*?)([\d\-Xx]+)/)
    const isbn = isbnMatch?.[2]?.trim() || undefined
    const yearMatch = infoText.match(/出版年[:\s]*[^\n]*?(\d{4})/)
    const publishYear = yearMatch?.[1] ? parseInt(yearMatch[1]) : undefined

    const introEl = $("#link-report .intro, .related_info .intro")
    const description = introEl.first().text().trim() || undefined

    const ratingText = $(".rating_num").first().text().trim()
    const rating = ratingText ? parseFloat(ratingText) : undefined

    return {
      title: title || "",
      author: author || "未知作者",
      publisher,
      publishYear,
      isbn,
      coverUrl,
      description,
      rating,
    }
  } catch (error: any) {
    console.error("获取豆瓣图书详情失败:", error.message)
    throw new Error("获取图书详情失败")
  }
}
