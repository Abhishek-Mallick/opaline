"use client"

import { SlidersHorizontalIcon } from "lucide-react"

import { GlassButton } from "@/registry/opaline/ui/glass-button"
import {
  GlassPopover,
  GlassPopoverContent,
  GlassPopoverTrigger,
} from "@/registry/opaline/ui/glass-popover"
import { GlassSlider } from "@/registry/opaline/ui/glass-slider"

export default function GlassPopoverDemo() {
  return (
    <GlassPopover>
      <GlassPopoverTrigger asChild>
        <GlassButton>
          <SlidersHorizontalIcon /> Adjust
        </GlassButton>
      </GlassPopoverTrigger>
      <GlassPopoverContent className="flex flex-col gap-4">
        <div>
          <div className="text-[15px] font-semibold tracking-[-0.015em]">Adjust photo</div>
          <div className="text-[13px] opacity-65">Changes apply instantly.</div>
        </div>
        {["Exposure", "Warmth", "Vignette"].map((label, i) => (
          <div key={label} className="grid gap-1 text-[13px] font-medium">
            {label}
            <GlassSlider defaultValue={[30 + i * 20]} aria-label={label} />
          </div>
        ))}
      </GlassPopoverContent>
    </GlassPopover>
  )
}
