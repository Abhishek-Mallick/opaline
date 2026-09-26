"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Mic01Icon, Search01Icon } from "@hugeicons/core-free-icons"

import { GlassInput } from "@/registry/opaline/ui/glass-input"

export default function GlassInputDemo() {
  return (
    <GlassInput
      className="max-w-[300px]"
      placeholder="Search"
      aria-label="Search"
      startIcon={<HugeiconsIcon icon={Search01Icon} />}
      endAdornment={<HugeiconsIcon icon={Mic01Icon} />}
    />
  )
}
