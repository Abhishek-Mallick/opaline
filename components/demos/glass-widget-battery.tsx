"use client"

import { GlassWidgetBattery } from "@/registry/opaline/ui/glass-widget-battery"

const devices = [
  { name: "iPhone", level: 82, kind: "phone" as const, charging: true },
  { name: "Apple Watch", level: 64, kind: "watch" as const },
  { name: "AirPods Pro", level: 18, kind: "headphones" as const },
  { name: "iPad", level: 47, kind: "tablet" as const },
]

export default function GlassWidgetBatteryDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <GlassWidgetBattery devices={devices} />
      <GlassWidgetBattery size="medium" devices={devices} />
    </div>
  )
}
