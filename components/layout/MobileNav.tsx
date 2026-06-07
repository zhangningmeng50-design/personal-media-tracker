"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, Tv, Music, Tags } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * 移动端底部导航栏
 * 在小于768px宽度的屏幕上显示
 */
export function MobileNav() {
  const pathname = usePathname()

  const items = [
    { href: "/", label: "首页", icon: LayoutDashboard },
    { href: "/books", label: "书籍", icon: BookOpen },
    { href: "/anime", label: "动画", icon: Tv },
    { href: "/music", label: "音乐", icon: Music },
    { href: "/tags", label: "标签", icon: Tags },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden safe-bottom">
      <div className="flex items-center justify-around h-14 pb-safe">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full h-full text-xs transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
