"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { SunCloud01Icon } from "@hugeicons/core-free-icons"

import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/registry/opaline/ui/glass-card"

const hours = [
  ["Now", "72°"],
  ["1PM", "74°"],
  ["2PM", "75°"],
  ["3PM", "73°"],
  ["4PM", "70°"],
]

export default function GlassCardDemo() {
  return (
    <GlassCard className="w-full max-w-[280px]">
      <GlassCardHeader>
        <GlassCardDescription className="flex items-center gap-1.5 font-medium">
          <HugeiconsIcon icon={SunCloud01Icon} className="size-4" /> Cupertino
        </GlassCardDescription>
        <GlassCardTitle className="text-5xl font-light tracking-[-0.04em]">72°</GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent className="flex justify-between text-center text-[13px]">
        {hours.map(([time, temp]) => (
          <div key={time} className="flex flex-col gap-1">
            <span className="opacity-60">{time}</span>
            <span className="font-medium">{temp}</span>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  )
}
