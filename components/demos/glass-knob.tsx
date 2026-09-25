"use client"

import * as React from "react"

import { GlassKnob } from "@/registry/opaline/ui/glass-knob"

export default function GlassKnobDemo() {
  const [temp, setTemp] = React.useState(22)
  return (
    <div className="flex items-center gap-8">
      <GlassKnob defaultValue={64} label="Volume" />
      <GlassKnob
        value={temp}
        onValueChange={setTemp}
        min={16}
        max={30}
        size={112}
        color="oklch(0.75 0.17 50)"
        label="Temperature"
        formatValue={(v) => `${v}°`}
      />
    </div>
  )
}
