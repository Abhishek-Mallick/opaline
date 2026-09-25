"use client"

import { ArrowRightIcon, HeartIcon, MicIcon, ShareIcon } from "lucide-react"

import { GlassButton } from "@/registry/opaline/ui/glass-button"

export default function GlassButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <GlassButton>Continue</GlassButton>
        <GlassButton variant="prominent">
          Get started <ArrowRightIcon />
        </GlassButton>
      </div>
      <div className="flex items-center gap-3">
        <GlassButton size="icon" aria-label="Like">
          <HeartIcon />
        </GlassButton>
        <GlassButton size="icon" aria-label="Share">
          <ShareIcon />
        </GlassButton>
        <GlassButton size="icon-lg" aria-label="Record">
          <MicIcon />
        </GlassButton>
      </div>
    </div>
  )
}
