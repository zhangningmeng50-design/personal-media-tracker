"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  Tv,
  Music,
  Download,
  Tags,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const navItems = [
  { href: "/", label: "仪表盘", icon: LayoutDashboard },
  { href: "/books", label: "书籍", icon: BookOpen },
  { href: "/anime", label: "动画", icon: Tv },
  { href: "/music", label: "音乐", icon: Music },
  { href: "/books/import", label: "导入书籍", icon: Download },
  { href: "/anime/import", label: "导入动画", icon: Download },
  { href: "/music/import", label: "导入音乐", icon: Download },
  { href: "/tags", label: "标签管理", icon: Tags },
]

/**
 * 侧边栏导航
 * 桌面端固定显示，移动端抽屉式弹出
 */
export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* 移动端遮罩 */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-background border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b lg:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-primary">
            <BookOpen className="h-6 w-6" />
            <span>MediaTracker</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
