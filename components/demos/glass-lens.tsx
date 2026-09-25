"use client"

import { GlassBadge } from "@/registry/opaline/ui/glass-badge"
import { GlassLens } from "@/registry/opaline/ui/glass-lens"

export default function GlassLensDemo() {
  return (
    <div className="relative h-[300px] w-full">
      <GlassLens size={150} defaultPosition={{ x: 60, y: 60 }} />
      <GlassBadge className="pointer-events-none absolute right-0 bottom-0">
        Drag the lens
      </GlassBadge>
    </div>
  )
}
