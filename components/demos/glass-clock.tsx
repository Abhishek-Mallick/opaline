"use client"

import { GlassClock } from "@/registry/opaline/ui/glass-clock"

export default function GlassClockDemo() {
  return (
    <div className="flex items-center gap-6">
      <GlassClock size={150} />
      <GlassClock size={112} timeZone="Asia/Tokyo" label="Tokyo" />
    </div>
  )
}
