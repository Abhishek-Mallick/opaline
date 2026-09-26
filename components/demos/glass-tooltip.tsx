"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { BellIcon, HeartIcon, Share01Icon } from "@hugeicons/core-free-icons"

import { GlassButton } from "@/registry/opaline/ui/glass-button"
import {
  GlassTooltip,
  GlassTooltipContent,
  GlassTooltipTrigger,
} from "@/registry/opaline/ui/glass-tooltip"

const actions = [
  { label: "Notifications", icon: <HugeiconsIcon icon={BellIcon} /> },
  { label: "Favourite", icon: <HugeiconsIcon icon={HeartIcon} /> },
  { label: "Share", icon: <HugeiconsIcon icon={Share01Icon} /> },
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
