"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Folder01Icon, HeartIcon, Image01Icon, Search01Icon } from "@hugeicons/core-free-icons"

import { GlassSegmented, GlassSegmentedItem } from "@/registry/opaline/ui/glass-segmented"

export default function GlassSegmentedDemo() {
  return (
    <GlassSegmented defaultValue="photos" aria-label="Library">
      <GlassSegmentedItem value="photos" icon={<HugeiconsIcon icon={Image01Icon} />} label="Photos" />
      <GlassSegmentedItem value="albums" icon={<HugeiconsIcon icon={Folder01Icon} />} label="Albums" />
      <GlassSegmentedItem value="favourites" icon={<HugeiconsIcon icon={HeartIcon} />} label="Favourites" />
      <GlassSegmentedItem value="search" icon={<HugeiconsIcon icon={Search01Icon} />} label="Search" />
    </GlassSegmented>
  )
}
