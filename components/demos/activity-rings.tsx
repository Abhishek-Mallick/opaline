"use client"

import { ActivityRings } from "@/registry/opaline/ui/activity-rings"

const stats = [
  { label: "Move", value: "410/500 kcal", color: "text-[#fa114f]" },
  { label: "Exercise", value: "19/30 min", color: "text-[#7ecb00]" },
  { label: "Stand", value: "11/12 hrs", color: "text-[#00b8d4]" },
]

export default function ActivityRingsDemo() {
  return (
    <div className="flex items-center gap-6">
      <ActivityRings
        size={132}
        stroke={14}
        rings={[
          { value: 0.82, color: "#fa114f", label: "Move" },
          { value: 0.64, color: "#a6ff00", label: "Exercise" },
          { value: 0.9, color: "#00e0ff", label: "Stand" },
        ]}
      />
      <div className="flex flex-col gap-2 text-[13px] leading-tight">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-muted-foreground">{s.label}</div>
            <div className={`font-semibold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
