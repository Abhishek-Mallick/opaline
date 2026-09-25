"use client"

import { GlassButton } from "@/registry/opaline/ui/glass-button"
import { MeshGradient } from "@/registry/opaline/ui/mesh-gradient"

export default function MeshGradientDemo() {
  return (
    <MeshGradient className="grid h-64 w-full max-w-md place-items-center rounded-[28px]">
      <GlassButton size="lg">Glass on a mesh</GlassButton>
    </MeshGradient>
  )
}
