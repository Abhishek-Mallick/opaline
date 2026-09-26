"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { BoldIcon, HighlighterIcon, ItalicIcon, LinkIcon, UnderlineIcon } from "@hugeicons/core-free-icons"

import {
  GlassToolbar,
  GlassToolbarButton,
  GlassToolbarSeparator,
} from "@/registry/opaline/ui/glass-toolbar"

const tools = [
  { id: "bold", icon: <HugeiconsIcon icon={BoldIcon} /> },
  { id: "italic", icon: <HugeiconsIcon icon={ItalicIcon} /> },
  { id: "underline", icon: <HugeiconsIcon icon={UnderlineIcon} /> },
  { id: "highlight", icon: <HugeiconsIcon icon={HighlighterIcon} /> },
]

export default function GlassToolbarDemo() {
  const [active, setActive] = React.useState<string[]>(["bold"])
  const toggle = (id: string) =>
    setActive((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))

  return (
    <GlassToolbar>
      {tools.map((tool) => (
        <GlassToolbarButton
          key={tool.id}
          aria-label={tool.id}
          active={active.includes(tool.id)}
          onClick={() => toggle(tool.id)}
        >
          {tool.icon}
        </GlassToolbarButton>
      ))}
      <GlassToolbarSeparator />
      <GlassToolbarButton aria-label="Link">
        <HugeiconsIcon icon={LinkIcon} />
      </GlassToolbarButton>
    </GlassToolbar>
  )
}
