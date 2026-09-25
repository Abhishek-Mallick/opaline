"use client"

import { GlassCard } from "@/registry/opaline/ui/glass-card"
import { GlassSwitch } from "@/registry/opaline/ui/glass-switch"

const settings = [
  { label: "Wi-Fi", on: true },
  { label: "Bluetooth", on: true },
  { label: "Airplane Mode", on: false },
]

export default function GlassSwitchDemo() {
  return (
    <GlassCard className="w-full max-w-[260px] gap-0 py-2">
      {settings.map((s) => (
        <label
          key={s.label}
          className="flex items-center justify-between gap-4 px-5 py-2.5 text-[15px] font-medium"
        >
          {s.label}
          <GlassSwitch defaultChecked={s.on} aria-label={s.label} />
        </label>
      ))}
    </GlassCard>
  )
}
