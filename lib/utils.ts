import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并CSS类名，支持条件类和Tailwind冲突解决
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
