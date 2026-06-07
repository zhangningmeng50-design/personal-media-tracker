"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { TagBadge } from "./TagBadge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { TAG_COLORS } from "@/lib/constants"
import type { Tag } from "@/lib/types"

interface TagPickerProps {
  tags: Tag[]
  selectedTagIds: number[]
  onChange: (tagIds: number[]) => void
  onCreateTag: (name: string, color: string) => Promise<Tag | null>
}

/**
 * 标签选择器
 * 多选标签，支持快速创建新标签
 */
export function TagPicker({ tags, selectedTagIds, onChange, onCreateTag }: TagPickerProps) {
  const [newTagName, setNewTagName] = React.useState("")
  const [newTagColor, setNewTagColor] = React.useState(TAG_COLORS[0])
  const [isCreating, setIsCreating] = React.useState(false)

  const selectedTags = tags.filter((t) => selectedTagIds.includes(t.id))
  const availableTags = tags.filter((t) => !selectedTagIds.includes(t.id))

  const toggleTag = (tagId: number) => {
    if (selectedTagIds.includes(tagId)) {
      onChange(selectedTagIds.filter((id) => id !== tagId))
    } else {
      onChange([...selectedTagIds, tagId])
    }
  }

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return
    const newTag = await onCreateTag(newTagName.trim(), newTagColor)
    if (newTag) {
      onChange([...selectedTagIds, newTag.id])
      setNewTagName("")
      setIsCreating(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {/* 已选标签 */}
      {selectedTags.map((tag) => (
        <TagBadge
          key={tag.id}
          name={tag.name}
          color={tag.color}
          onRemove={() => toggleTag(tag.id)}
        />
      ))}

      {/* 标签选择下拉 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-7 gap-1">
            <Plus className="h-3.5 w-3.5" />
            添加标签
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {availableTags.length > 0 ? (
            <>
              {availableTags.map((tag) => (
                <DropdownMenuItem key={tag.id} onClick={() => toggleTag(tag.id)}>
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: tag.color }}
                  />
                  {tag.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </>
          ) : (
            <div className="text-sm text-muted-foreground px-2 py-1.5">
              所有标签已添加
            </div>
          )}

          {/* 创建新标签 */}
          {isCreating ? (
            <div className="p-2 space-y-2">
              <Input
                placeholder="输入标签名"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="h-7 text-xs"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateTag()
                  if (e.key === "Escape") setIsCreating(false)
                }}
              />
              <div className="flex gap-1 flex-wrap">
                {TAG_COLORS.slice(0, 8).map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="w-5 h-5 rounded-full border-2 transition-transform"
                    style={{
                      backgroundColor: color,
                      borderColor: newTagColor === color ? "#fff" : "transparent",
                    }}
                    onClick={() => setNewTagColor(color)}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                <Button size="sm" className="h-7 text-xs flex-1" onClick={handleCreateTag}>
                  创建
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setIsCreating(false)}>
                  取消
                </Button>
              </div>
            </div>
          ) : (
            <DropdownMenuItem onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              创建新标签
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
