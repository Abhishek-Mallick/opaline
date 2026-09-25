"use client"

import { GlassStepper } from "@/registry/opaline/ui/glass-stepper"

export default function GlassStepperDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <GlassStepper defaultValue={2} min={1} max={8} label="Guests" />
      <GlassStepper
        defaultValue={21.5}
        min={16}
        max={30}
        step={0.5}
        format={{ style: "unit", unit: "celsius", minimumFractionDigits: 1 }}
        label="Temperature"
      />
    </div>
  )
}
