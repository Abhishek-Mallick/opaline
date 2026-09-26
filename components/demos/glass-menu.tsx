"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArchiveIcon, CopyIcon, PencilIcon, TrashIcon } from "@hugeicons/core-free-icons"

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
          <HugeiconsIcon icon={PencilIcon} /> Rename <GlassMenuShortcut>⌘R</GlassMenuShortcut>
        </GlassMenuItem>
        <GlassMenuItem>
          <HugeiconsIcon icon={CopyIcon} /> Duplicate <GlassMenuShortcut>⌘D</GlassMenuShortcut>
        </GlassMenuItem>
        <GlassMenuItem>
          <HugeiconsIcon icon={ArchiveIcon} /> Archive
        </GlassMenuItem>
        <GlassMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
          Pin to top
        </GlassMenuCheckboxItem>
        <GlassMenuSeparator />
        <GlassMenuItem variant="destructive">
          <HugeiconsIcon icon={TrashIcon} /> Delete
        </GlassMenuItem>
      </GlassMenuContent>
    </GlassMenu>
  )
}
