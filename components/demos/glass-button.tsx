"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, HeartIcon, Mic01Icon, Share01Icon } from "@hugeicons/core-free-icons"

import { GlassButton } from "@/registry/opaline/ui/glass-button"

export default function GlassButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <GlassButton>Continue</GlassButton>
        <GlassButton variant="prominent">
          Get started <HugeiconsIcon icon={ArrowRight01Icon} />
        </GlassButton>
      </div>
      <div className="flex items-center gap-3">
        <GlassButton size="icon" aria-label="Like">
          <HugeiconsIcon icon={HeartIcon} />
        </GlassButton>
        <GlassButton size="icon" aria-label="Share">
          <HugeiconsIcon icon={Share01Icon} />
        </GlassButton>
        <GlassButton size="icon-lg" aria-label="Record">
          <HugeiconsIcon icon={Mic01Icon} />
        </GlassButton>
      </div>
    </div>
  )
}
