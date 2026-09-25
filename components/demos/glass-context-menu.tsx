"use client"

import * as React from "react"
import {
  CopyIcon,
  FolderIcon,
  InfoIcon,
  PencilIcon,
  ShareIcon,
  StarIcon,
  TagIcon,
  TrashIcon,
} from "lucide-react"

import {
  GlassContextMenu,
  GlassContextMenuAction,
  GlassContextMenuActions,
  GlassContextMenuCheckboxItem,
  GlassContextMenuContent,
  GlassContextMenuItem,
  GlassContextMenuSeparator,
  GlassContextMenuShortcut,
  GlassContextMenuSub,
  GlassContextMenuSubContent,
  GlassContextMenuSubTrigger,
  GlassContextMenuTrigger,
} from "@/registry/opaline/ui/glass-context-menu"

const tags = [
  { name: "Red", color: "#ff453a" },
  { name: "Orange", color: "#ff9f0a" },
  { name: "Green", color: "#30d158" },
  { name: "Blue", color: "#0a84ff" },
]

export default function GlassContextMenuDemo() {
  const [favourite, setFavourite] = React.useState(true)
  return (
    <GlassContextMenu>
      <GlassContextMenuTrigger className="grid h-40 w-64 place-items-center rounded-[24px] border-2 border-dashed border-current/20 text-sm font-medium opacity-80 select-none">
        Right-click or long-press here
      </GlassContextMenuTrigger>
      <GlassContextMenuContent>
        <GlassContextMenuActions>
          <GlassContextMenuAction icon={<CopyIcon />} label="Copy" />
          <GlassContextMenuAction icon={<ShareIcon />} label="Share" />
          <GlassContextMenuAction icon={<PencilIcon />} label="Edit" />
          <GlassContextMenuAction icon={<TrashIcon />} label="Delete" variant="destructive" />
        </GlassContextMenuActions>
        <GlassContextMenuItem>
          <InfoIcon /> Get Info <GlassContextMenuShortcut>⌘I</GlassContextMenuShortcut>
        </GlassContextMenuItem>
        <GlassContextMenuItem>
          <FolderIcon /> Move to…
        </GlassContextMenuItem>
        <GlassContextMenuSub>
          <GlassContextMenuSubTrigger>
            <TagIcon /> Tags
          </GlassContextMenuSubTrigger>
          <GlassContextMenuSubContent>
            {tags.map((t) => (
              <GlassContextMenuItem key={t.name}>
                <span className="size-3 rounded-full" style={{ background: t.color }} /> {t.name}
              </GlassContextMenuItem>
            ))}
          </GlassContextMenuSubContent>
        </GlassContextMenuSub>
        <GlassContextMenuSeparator />
        <GlassContextMenuCheckboxItem checked={favourite} onCheckedChange={setFavourite}>
          <StarIcon /> Favourite
        </GlassContextMenuCheckboxItem>
      </GlassContextMenuContent>
    </GlassContextMenu>
  )
}
