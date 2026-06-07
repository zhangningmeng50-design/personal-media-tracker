"use client"

import * as React from "react"
import { Toaster } from "react-hot-toast"

/**
 * Toast通知提供者
 * 全局通知提示，支持成功/错误/加载状态
 */
export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "8px",
          background: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
        },
        success: {
          iconTheme: {
            primary: "#00B42A",
            secondary: "white",
          },
        },
        error: {
          iconTheme: {
            primary: "#F53F3F",
            secondary: "white",
          },
        },
      }}
    />
  )
}
