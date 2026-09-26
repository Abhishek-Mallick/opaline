"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { SparklesIcon } from "@hugeicons/core-free-icons"

import { GlassBadge } from "@/registry/opaline/ui/glass-badge"

export default function GlassBadgeDemo() {
  return (
    <div className="flex max-w-[280px] flex-wrap items-center justify-center gap-2">
      <GlassBadge dot="#34c759">Live</GlassBadge>
      <GlassBadge dot="#ff9f0a">Syncing</GlassBadge>
      <GlassBadge>
        <HugeiconsIcon icon={SparklesIcon} /> New
      </GlassBadge>
      <GlassBadge dot="#ff3b30">Recording</GlassBadge>
      <GlassBadge>v1.0</GlassBadge>
    </div>
  )
}
