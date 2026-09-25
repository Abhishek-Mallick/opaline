"use client"

import { BellIcon, HeartIcon, ShareIcon } from "lucide-react"

import { GlassButton } from "@/registry/opaline/ui/glass-button"
import {
  GlassTooltip,
  GlassTooltipContent,
  GlassTooltipTrigger,
} from "@/registry/opaline/ui/glass-tooltip"

const actions = [
  { label: "Notifications", icon: <BellIcon /> },
  { label: "Favourite", icon: <HeartIcon /> },
  { label: "Share", icon: <ShareIcon /> },
]

export default function GlassTooltipDemo() {
  return (
    <div className="flex gap-3">
      {actions.map((a) => (
        <GlassTooltip key={a.label}>
          <GlassTooltipTrigger asChild>
            <GlassButton size="icon" aria-label={a.label}>
              {a.icon}
            </GlassButton>
          </GlassTooltipTrigger>
          <GlassTooltipContent>{a.label}</GlassTooltipContent>
        </GlassTooltip>
      ))}
    </div>
  )
}
