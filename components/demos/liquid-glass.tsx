"use client"

import { LiquidGlass } from "@/registry/opaline/ui/liquid-glass"

export default function LiquidGlassDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <LiquidGlass className="grid size-36 place-items-center rounded-[36px] text-sm font-medium">
        Clear
      </LiquidGlass>
      <LiquidGlass
        variant="frosted"
        className="grid size-36 place-items-center rounded-full text-sm font-medium"
      >
        Frosted
      </LiquidGlass>
      <LiquidGlass
        bezel={40}
        thickness={3.2}
        dispersion={0.2}
        className="grid h-36 w-24 place-items-center rounded-full text-sm font-medium"
      >
        Deep
      </LiquidGlass>
    </div>
  )
}
