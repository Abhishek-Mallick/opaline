"use client"

import { BellIcon } from "lucide-react"

import { GlassButton } from "@/registry/opaline/ui/glass-button"
import { toast } from "@/registry/opaline/ui/glass-toast"

// <GlassToaster /> is mounted once in the root layout.
export default function GlassToastDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <GlassButton onClick={() => toast("AirPods Pro connected", { icon: <BellIcon /> })}>
        Default
      </GlassButton>
      <GlassButton
        onClick={() =>
          toast.success("Saved", { description: "Your changes are live." })
        }
      >
        Success
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
