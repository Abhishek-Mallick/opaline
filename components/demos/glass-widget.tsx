"use client"

import { GlassWidget } from "@/registry/opaline/ui/glass-widget"

export default function GlassWidgetDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <GlassWidget size="small" className="justify-between">
        <span className="text-[12px] font-semibold tracking-wide uppercase opacity-60">Small</span>
        <span className="text-[34px] leading-none font-light tracking-[-0.04em]">164²</span>
      </GlassWidget>
      <GlassWidget size="medium" className="justify-between">
        <span className="text-[12px] font-semibold tracking-wide uppercase opacity-60">Medium</span>
        <span className="text-[34px] leading-none font-light tracking-[-0.04em]">344 × 164</span>
      </GlassWidget>
    </div>
  )
}
