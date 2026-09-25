"use client"

import * as React from "react"
import { BoldIcon, HighlighterIcon, ItalicIcon, LinkIcon, UnderlineIcon } from "lucide-react"

import {
  GlassToolbar,
  GlassToolbarButton,
  GlassToolbarSeparator,
} from "@/registry/opaline/ui/glass-toolbar"

const tools = [
  { id: "bold", icon: <BoldIcon /> },
  { id: "italic", icon: <ItalicIcon /> },
  { id: "underline", icon: <UnderlineIcon /> },
  { id: "highlight", icon: <HighlighterIcon /> },
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
        <LinkIcon />
      </GlassToolbarButton>
    </GlassToolbar>
  )
}
