"use client"

import * as React from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { MainLayout } from "@/components/layout/MainLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TagBadge } from "@/components/shared/TagBadge"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { EmptyState } from "@/components/shared/EmptyState"
import { useTags } from "@/hooks/useTags"
import { TAG_COLORS } from "@/lib/constants"
import type { Tag } from "@/lib/types"
import { Separator } from "@/components/ui/separator"

/**
 * 标签管理页面
 */
export default function TagsPage() {
  const { tags, loading, fetchTags, createTag, updateTag, deleteTag } = useTags()
  const [newName, setNewName] = React.useState("")
  const [newColor, setNewColor] = React.useState(TAG_COLORS[0])
  const [editingTag, setEditingTag] = React.useState<Tag | null>(null)
  const [editName, setEditName] = React.useState("")
  const [editColor, setEditColor] = React.useState("")
  const [deleteTarget, setDeleteTarget] = React.useState<Tag | null>(null)

  React.useEffect(() => {
    fetchTags()
  }, [fetchTags])

  const handleCreate = async () => {
    if (!newName.trim()) return
    const result = await createTag(newName.trim(), newColor)
    if (result) {
      toast.success("标签已创建")
      setNewName("")
      fetchTags()
    } else {
      toast.error("创建失败")
    }
  }

  const handleUpdate = async () => {
    if (!editingTag || !editName.trim()) return
    const result = await updateTag(editingTag.id, editName.trim(), editColor)
    if (result) {
      toast.success("标签已更新")
      setEditingTag(null)
      fetchTags()
    } else {
      toast.error("更新失败")
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    const success = await deleteTag(deleteTarget.id)
    if (success) {
      toast.success("标签已删除")
      fetchTags()
    } else {
      toast.error("删除失败")
    }
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">标签管理</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">创建和管理书籍与动画的分类标签</p>
        </div>

        {/* 创建新标签 */}
        <Card>
          <CardHeader><CardTitle className="text-base">创建新标签</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 items-end">
              <div className="space-y-1.5 flex-1 min-w-[200px]">
                <label className="text-xs text-muted-foreground">标签名称</label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="输入标签名"
                  className="h-9"
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">颜色</label>
                <div className="flex gap-1.5">
                  {TAG_COLORS.slice(0, 8).map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`w-6 h-6 rounded-full transition-transform ${newColor === c ? "ring-2 ring-offset-2 ring-primary scale-110" : "hover:scale-105"}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setNewColor(c)}
                    />
                  ))}
                </div>
              </div>
              <Button size="sm" onClick={handleCreate} className="gap-1">
                <Plus className="h-4 w-4" /> 创建
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* 标签列表 */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse" />
            ))}
          </div>
        ) : tags.length === 0 ? (
          <EmptyState
            title="还没有标签"
            description="创建一个标签来分类你的书籍和动画"
          />
        ) : (
          <div className="space-y-2">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                {/* 编辑模式 */}
                {editingTag?.id === tag.id ? (
                  <div className="flex flex-wrap items-center gap-3 flex-1">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-8 max-w-[200px]"
                      autoFocus
                      onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
                    />
                    <div className="flex gap-1">
                      {TAG_COLORS.slice(0, 8).map((c) => (
                        <button
                          key={c}
                          type="button"
                          className={`w-5 h-5 rounded-full ${editColor === c ? "ring-2 ring-offset-1 ring-primary" : ""}`}
                          style={{ backgroundColor: c }}
                          onClick={() => setEditColor(c)}
                        />
                      ))}
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" className="h-7 text-xs" onClick={handleUpdate}>保存</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingTag(null)}>取消</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <TagBadge name={tag.name} color={tag.color} />
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          setEditingTag(tag)
                          setEditName(tag.name)
                          setEditColor(tag.color)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => setDeleteTarget(tag)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={() => setDeleteTarget(null)}
          title="删除标签"
          description={`确定要删除标签「${deleteTarget?.name}」吗？`}
          confirmText="删除"
          variant="destructive"
          onConfirm={handleDelete}
        />
      </div>
    </MainLayout>
  )
}
