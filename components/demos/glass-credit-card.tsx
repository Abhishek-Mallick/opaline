"use client"

import { GlassCreditCard } from "@/registry/opaline/ui/opaline/glass-credit-card"

export default function GlassCreditCardDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <GlassCreditCard number="4242 4242 4242 4242" name="Jony Ive" expiry="09/29" cvc="123" />
      <p className="rounded-full bg-black/25 px-3 py-1 text-[12.5px] font-medium text-white backdrop-blur-sm">
        Tap the card to flip it
      </p>
    </div>
  )
}
