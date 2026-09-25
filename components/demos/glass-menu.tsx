"use client"

import * as React from "react"
import { ArchiveIcon, CopyIcon, PencilIcon, TrashIcon } from "lucide-react"

import { GlassButton } from "@/registry/opaline/ui/glass-button"
import {
  GlassMenu,
  GlassMenuCheckboxItem,
  GlassMenuContent,
  GlassMenuItem,
  GlassMenuLabel,
  GlassMenuSeparator,
  GlassMenuShortcut,
  GlassMenuTrigger,
} from "@/registry/opaline/ui/glass-menu"

export default function GlassMenuDemo() {
  const [pinned, setPinned] = React.useState(true)
  return (
    <GlassMenu>
      <GlassMenuTrigger asChild>
        <GlassButton>Actions</GlassButton>
      </GlassMenuTrigger>
      <GlassMenuContent>
        <GlassMenuLabel>Document</GlassMenuLabel>
        <GlassMenuItem>
          <PencilIcon /> Rename <GlassMenuShortcut>⌘R</GlassMenuShortcut>
        </GlassMenuItem>
        <GlassMenuItem>
          <CopyIcon /> Duplicate <GlassMenuShortcut>⌘D</GlassMenuShortcut>
        </GlassMenuItem>
        <GlassMenuItem>
          <ArchiveIcon /> Archive
        </GlassMenuItem>
        <GlassMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
          Pin to top
        </GlassMenuCheckboxItem>
        <GlassMenuSeparator />
        <GlassMenuItem variant="destructive">
          <TrashIcon /> Delete
        </GlassMenuItem>
      </GlassMenuContent>
    </GlassMenu>
  )
}
