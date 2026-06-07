import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { ToastProvider } from "@/components/providers/ToastProvider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MediaTracker - 个人媒体记录",
  description: "记录和管理你读过的书籍和看过的动画",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

/**
 * 根布局
 * 提供主题、Toast、Tooltip、AudioPlayer等全局Provider
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <AudioPlayerProvider>
              <ToastProvider />
              {children}
            </AudioPlayerProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
