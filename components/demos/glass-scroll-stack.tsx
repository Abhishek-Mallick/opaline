"use client"

import { GlassScrollStack, GlassScrollStackItem } from "@/registry/opaline/ui/opaline/glass-scroll-stack"

const cards = [
  { title: "Bend", body: "Every surface refracts what's behind it.", accent: "#ff7ab6" },
  { title: "Tune", body: "Index of refraction, thickness, surface profile.", accent: "#7aa8ff" },
  { title: "Ship", body: "Install with the shadcn CLI and make it yours.", accent: "#ffc46b" },
  { title: "Repeat", body: "Fifty components and counting.", accent: "#5ef0c0" },
]

export default function GlassScrollStackDemo() {
  return (
    <GlassScrollStack height={380} className="w-full max-w-md px-1 pt-2" stackTop={12}>
      {cards.map((c, i) => (
        <GlassScrollStackItem key={c.title} className="flex h-56 flex-col justify-between">
          <span className="text-[13px] font-semibold opacity-60">0{i + 1}</span>
          <div>
            <div className="text-[34px] font-semibold tracking-[-0.04em]" style={{ color: c.accent }}>
              {c.title}
            </div>
            <p className="text-[15px] opacity-75">{c.body}</p>
          </div>
        </GlassScrollStackItem>
      ))}
    </GlassScrollStack>
  )
}
