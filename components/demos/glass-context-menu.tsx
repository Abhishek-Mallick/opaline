"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { CopyIcon, Folder01Icon, InfoIcon, PencilIcon, Share01Icon, StarIcon, Tag01Icon, TrashIcon } from "@hugeicons/core-free-icons"

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
          <GlassContextMenuAction icon={<HugeiconsIcon icon={CopyIcon} />} label="Copy" />
          <GlassContextMenuAction icon={<HugeiconsIcon icon={Share01Icon} />} label="Share" />
          <GlassContextMenuAction icon={<HugeiconsIcon icon={PencilIcon} />} label="Edit" />
          <GlassContextMenuAction icon={<HugeiconsIcon icon={TrashIcon} />} label="Delete" variant="destructive" />
        </GlassContextMenuActions>
        <GlassContextMenuItem>
          <HugeiconsIcon icon={InfoIcon} /> Get Info <GlassContextMenuShortcut>⌘I</GlassContextMenuShortcut>
        </GlassContextMenuItem>
        <GlassContextMenuItem>
          <HugeiconsIcon icon={Folder01Icon} /> Move to…
        </GlassContextMenuItem>
        <GlassContextMenuSub>
          <GlassContextMenuSubTrigger>
            <HugeiconsIcon icon={Tag01Icon} /> Tags
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
          <HugeiconsIcon icon={StarIcon} /> Favourite
        </GlassContextMenuCheckboxItem>
      </GlassContextMenuContent>
    </GlassContextMenu>
  )
}
