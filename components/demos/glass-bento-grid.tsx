"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  CommandIcon,
  Layers01Icon,
  PaintBoardIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons"

import { GlassBentoCard, GlassBentoGrid } from "@/registry/opaline/ui/opaline/glass-bento-grid"

const Blobs = ({ a, b }: { a: string; b: string }) => (
  <div className="absolute inset-0">
    <div className="absolute -top-10 -left-6 size-48 rounded-full opacity-70 blur-2xl" style={{ background: a }} />
    <div className="absolute top-4 right-0 size-40 rounded-full opacity-60 blur-2xl" style={{ background: b }} />
  </div>
)

export default function GlassBentoGridDemo() {
  return (
    <GlassBentoGrid className="max-w-3xl auto-rows-[15rem]">
      <GlassBentoCard
        className="md:col-span-2"
        name="Real refraction"
        description="Light is traced through the rim with Snell's law, not faked with blur."
        icon={<HugeiconsIcon icon={SparklesIcon} />}
        href="#"
        background={
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/wallpapers/dunes.jpg" alt="" className="size-full object-cover" />
        }
      />
      <GlassBentoCard
        name="Tune it"
        description="One provider sets the optics for everything."
        icon={<HugeiconsIcon icon={PaintBoardIcon} />}
        href="#"
        background={<Blobs a="#ff7ab6" b="#7aa8ff" />}
      />
      <GlassBentoCard
        name="⌘K ready"
        description="Search, command and menus on glass."
        icon={<HugeiconsIcon icon={CommandIcon} />}
        href="#"
        background={<Blobs a="#ffc46b" b="#8f7bff" />}
      />
      <GlassBentoCard
        className="md:col-span-2"
        name="50+ components"
        description="Install one, or all of them, with the shadcn CLI."
        icon={<HugeiconsIcon icon={Layers01Icon} />}
        href="#"
        background={
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/wallpapers/sunset.jpg" alt="" className="size-full object-cover" />
        }
      />
    </GlassBentoGrid>
  )
}
