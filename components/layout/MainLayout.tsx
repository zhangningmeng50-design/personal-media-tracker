"use client"

import * as React from "react"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import { MobileNav } from "./MobileNav"

interface MainLayoutProps {
  children: React.ReactNode
}

/**
 * 主布局容器
 * 包含导航栏、侧边栏和移动端底部导航
 */
export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-h-[calc(100vh-3.5rem)] pb-16 lg:pb-0">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
