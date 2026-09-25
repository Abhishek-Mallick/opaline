"use client"

import { HouseIcon, LibraryIcon, RadioIcon, SparklesIcon } from "lucide-react"

import { GlassTabBar, GlassTabBarItem } from "@/registry/opaline/ui/glass-tab-bar"

export default function GlassTabBarDemo() {
  return (
    <GlassTabBar defaultValue="home">
      <GlassTabBarItem value="home" icon={<HouseIcon />} label="Home" />
      <GlassTabBarItem value="new" icon={<SparklesIcon />} label="New" />
      <GlassTabBarItem value="radio" icon={<RadioIcon />} label="Radio" />
      <GlassTabBarItem value="library" icon={<LibraryIcon />} label="Library" />
    </GlassTabBar>
  )
}
