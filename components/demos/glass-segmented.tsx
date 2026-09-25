"use client"

import { FolderIcon, HeartIcon, ImageIcon, SearchIcon } from "lucide-react"

import { GlassSegmented, GlassSegmentedItem } from "@/registry/opaline/ui/glass-segmented"

export default function GlassSegmentedDemo() {
  return (
    <GlassSegmented defaultValue="photos" aria-label="Library">
      <GlassSegmentedItem value="photos" icon={<ImageIcon />} label="Photos" />
      <GlassSegmentedItem value="albums" icon={<FolderIcon />} label="Albums" />
      <GlassSegmentedItem value="favourites" icon={<HeartIcon />} label="Favourites" />
      <GlassSegmentedItem value="search" icon={<SearchIcon />} label="Search" />
    </GlassSegmented>
  )
}
