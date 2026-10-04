"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { BellIcon } from "@hugeicons/core-free-icons"

import { GlassButton } from "@/registry/opaline/ui/opaline/glass-button"
import { toast } from "@/registry/opaline/ui/opaline/glass-toast"

const wait = (ms: number, fail = false) =>
  new Promise<void>((resolve, reject) => setTimeout(fail ? reject : resolve, ms))

// <GlassToaster /> is mounted once in the root layout.
export default function GlassToastDemo() {
  return (
    <div className="flex max-w-md flex-wrap justify-center gap-3">
      <GlassButton onClick={() => toast("AirPods Pro connected", { icon: <HugeiconsIcon icon={BellIcon} /> })}>
        Default
      </GlassButton>
      <GlassButton onClick={() => toast.success("Saved", { description: "Your changes are live." })}>
        Success
      </GlassButton>
      <GlassButton onClick={() => toast.warning("Battery low", { description: "10% remaining." })}>
        Warning
      </GlassButton>
      <GlassButton
        onClick={() =>
          toast.promise(wait(1800), {
            loading: "Uploading photo…",
            success: "Photo uploaded",
            error: "Upload failed",
          })
        }
      >
        Promise
      </GlassButton>
      <GlassButton
        variant="prominent"
        onClick={() =>
          toast("Photo deleted", {
            action: { label: "Undo", onClick: () => toast("Restored") },
          })
        }
      >
        With action
      </GlassButton>
    </div>
  )
}
