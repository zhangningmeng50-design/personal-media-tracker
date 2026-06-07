"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { BookOpen, Menu, Moon, Sun, Plus, Film, Music, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onMenuClick: () => void
}

/** 根据路径获取页面信息 */
function getPageInfo(pathname: string) {
  if (pathname === "/") return { label: "仪表盘", href: null }
  if (pathname.startsWith("/books/import")) return { label: "导入书籍", href: "/books/import" }
  if (pathname.startsWith("/books")) return { label: "书籍", href: "/books" }
  if (pathname.startsWith("/anime/import")) return { label: "导入动画", href: "/anime/import" }
  if (pathname.startsWith("/anime")) return { label: "动画", href: "/anime" }
  if (pathname.startsWith("/music/import")) return { label: "导入音乐", href: "/music/import" }
  if (pathname.startsWith("/music")) return { label: "音乐", href: "/music" }
  if (pathname.startsWith("/tags")) return { label: "标签管理", href: "/tags" }
  return { label: "MediaTracker", href: null }
}

/**
 * 顶部导航栏
 * 包含Logo、当前页面名称/快捷操作、主题切换
 */
export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const pageInfo = getPageInfo(pathname)
  const isBooksPage = pathname.startsWith("/books") && !pathname.startsWith("/books/import")
  const isAnimePage = pathname.startsWith("/anime") && !pathname.startsWith("/anime/import")
  const isMusicPage = pathname.startsWith("/music") && !pathname.startsWith("/music/import")

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        {/* 左侧: Logo和菜单按钮 */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
            aria-label="打开菜单"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary shrink-0">
            <BookOpen className="h-6 w-6" />
            <span className="hidden sm:inline">MediaTracker</span>
          </Link>
        </div>

        {/* 中间: 当前页面 + 快捷操作 */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* 面包屑 */}
          <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              首页
            </Link>
            {pageInfo.href && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href={pageInfo.href} className="hover:text-foreground transition-colors font-medium text-foreground">
                  {pageInfo.label}
                </Link>
              </>
            )}
          </div>

          {/* 快捷添加按钮 */}
          {isBooksPage && (
            <Button
              size="sm"
              className="gap-1 h-8"
              onClick={() => router.push("/books/import")}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">导入书籍</span>
            </Button>
          )}
          {isAnimePage && (
            <Button
              size="sm"
              className="gap-1 h-8"
              onClick={() => router.push("/anime/import")}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">导入动画</span>
            </Button>
          )}
          {isMusicPage && (
            <Button
              size="sm"
              className="gap-1 h-8"
              onClick={() => router.push("/music/import")}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">导入音乐</span>
            </Button>
          )}
          {pathname === "/books/import" && (
            <Button
              size="sm"
              variant="outline"
              className="gap-1 h-8"
              onClick={() => router.push("/books")}
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">书籍列表</span>
            </Button>
          )}
          {pathname === "/anime/import" && (
            <Button
              size="sm"
              variant="outline"
              className="gap-1 h-8"
              onClick={() => router.push("/anime")}
            >
              <Film className="h-4 w-4" />
              <span className="hidden sm:inline">动画列表</span>
            </Button>
          )}
          {pathname === "/music/import" && (
            <Button
              size="sm"
              variant="outline"
              className="gap-1 h-8"
              onClick={() => router.push("/music")}
            >
              <Music className="h-4 w-4" />
              <span className="hidden sm:inline">音乐列表</span>
            </Button>
          )}
        </div>

        {/* 右侧: 主题切换 */}
        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="切换主题"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
