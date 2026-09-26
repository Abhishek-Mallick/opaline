"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Share08Icon } from "@hugeicons/core-free-icons"

import { GlassButton } from "@/registry/opaline/ui/glass-button"
import {
  GlassDialog,
  GlassDialogClose,
  GlassDialogContent,
  GlassDialogDescription,
  GlassDialogFooter,
  GlassDialogHeader,
  GlassDialogTitle,
  GlassDialogTrigger,
} from "@/registry/opaline/ui/glass-dialog"

export default function GlassDialogDemo() {
  return (
    <GlassDialog>
      <GlassDialogTrigger asChild>
        <GlassButton>Open dialog</GlassButton>
      </GlassDialogTrigger>
      <GlassDialogContent>
        <GlassDialogHeader>
          <GlassDialogTitle>Share with friends</GlassDialogTitle>
          <GlassDialogDescription>
            Anyone with the link can view this collection. You can change access at any time.
          </GlassDialogDescription>
        </GlassDialogHeader>
        <GlassDialogFooter>
          <GlassDialogClose asChild>
            <GlassButton size="sm">Cancel</GlassButton>
          </GlassDialogClose>
          <GlassDialogClose asChild>
            <GlassButton size="sm" variant="prominent">
              <HugeiconsIcon icon={Share08Icon} /> Copy link
            </GlassButton>
          </GlassDialogClose>
        </GlassDialogFooter>
      </GlassDialogContent>
    </GlassDialog>
  )
}
