"use client"

import { PlaneIcon, SparklesIcon, TicketIcon } from "lucide-react"

import { GlassStack, GlassStackCard } from "@/registry/opaline/ui/glass-stack"

export default function GlassStackDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <GlassStack className="h-48 w-72">
        <GlassStackCard>
          <SparklesIcon className="size-6" />
          <div className="mt-auto text-sm opacity-60">Opaline Card</div>
          <div className="font-mono text-lg tracking-widest">•••• 4721</div>
        </GlassStackCard>
        <GlassStackCard>
          <PlaneIcon className="size-6" />
          <div className="mt-auto text-sm opacity-60">SFO → HND · Gate 12</div>
          <div className="text-lg font-semibold">Boarding 9:40</div>
        </GlassStackCard>
        <GlassStackCard>
          <TicketIcon className="size-6" />
          <div className="mt-auto text-sm opacity-60">Row F · Seat 18</div>
          <div className="text-lg font-semibold">Midnight Premiere</div>
        </GlassStackCard>
      </GlassStack>
      <span className="text-xs font-medium text-white/80">Swipe the top card</span>
    </div>
  )
}
