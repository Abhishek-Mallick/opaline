"use client"

import { GlassTweetCard } from "@/registry/opaline/ui/opaline/glass-tweet-card"

export default function GlassTweetCardDemo() {
  return (
    <GlassTweetCard
      author={{ name: "Opaline", handle: "opalineui", verified: true }}
      content={"Liquid glass for the web, with real refraction.\n\nnpx shadcn@latest add @opaline/all\n\nBuilt with @shadcn #react #tailwindcss https://opaline.buildlab.in"}
      media={["/wallpapers/dunes.jpg"]}
      date="2026-10-04T09:41:00Z"
      stats={{ replies: 24, reposts: 112, likes: 1840, views: 52300 }}
    />
  )
}
