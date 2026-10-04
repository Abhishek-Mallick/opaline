"use client"

import * as React from "react"

import {
  GlassTerminal,
  GlassTerminalLine,
  GlassTerminalTyping,
} from "@/registry/opaline/ui/opaline/glass-terminal"

export default function GlassTerminalDemo() {
  const [run, setRun] = React.useState(0)
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-3">
      <GlassTerminal title="~/my-app — zsh" replay={run}>
        <GlassTerminalTyping>npx shadcn@latest add @opaline/all</GlassTerminalTyping>
        <GlassTerminalLine className="text-[oklch(0.72_0.17_150)]">✔ Checking registry.</GlassTerminalLine>
        <GlassTerminalLine className="text-[oklch(0.72_0.17_150)]">✔ Installing dependencies.</GlassTerminalLine>
        <GlassTerminalLine className="text-[oklch(0.72_0.17_150)]">✔ Created 50 files in components/ui/opaline</GlassTerminalLine>
        <GlassTerminalLine>&nbsp;</GlassTerminalLine>
        <GlassTerminalTyping>pnpm dev</GlassTerminalTyping>
        <GlassTerminalLine className="opacity-70">▲ Ready on http://localhost:3000</GlassTerminalLine>
      </GlassTerminal>
      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="cursor-pointer rounded-full bg-black/25 px-3 py-1 text-[12.5px] font-medium text-white backdrop-blur-sm"
      >
        Replay
      </button>
    </div>
  )
}
