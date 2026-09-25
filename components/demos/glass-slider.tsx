"use client"

import { GlassSlider } from "@/registry/opaline/ui/glass-slider"

export default function GlassSliderDemo() {
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-6">
      <GlassSlider defaultValue={[62]} aria-label="Volume" />
      <GlassSlider defaultValue={[28]} aria-label="Brightness" />
    </div>
  )
}
