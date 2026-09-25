"use client"

import { MicIcon, SearchIcon } from "lucide-react"

import { GlassInput } from "@/registry/opaline/ui/glass-input"

export default function GlassInputDemo() {
  return (
    <GlassInput
      className="max-w-[300px]"
      placeholder="Search"
      aria-label="Search"
      startIcon={<SearchIcon />}
      endAdornment={<MicIcon />}
    />
  )
}
