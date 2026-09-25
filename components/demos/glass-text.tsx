"use client"

import { GlassText } from "@/registry/opaline/ui/glass-text"

export default function GlassTextDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <GlassText className="text-[88px] leading-none font-extrabold tracking-[-0.05em]">
        Opaline
      </GlassText>
      <GlassText
        bevel={6}
        refraction={16}
        shine={false}
        className="text-4xl font-bold tracking-[-0.03em]"
      >
        bends the light
      </GlassText>
    </div>
  )
}
