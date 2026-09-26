"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Home01Icon, LibraryIcon, RadioIcon, SparklesIcon } from "@hugeicons/core-free-icons"

import { GlassTabBar, GlassTabBarItem } from "@/registry/opaline/ui/glass-tab-bar"

export default function GlassTabBarDemo() {
  return (
    <GlassTabBar defaultValue="home">
      <GlassTabBarItem value="home" icon={<HugeiconsIcon icon={Home01Icon} />} label="Home" />
      <GlassTabBarItem value="new" icon={<HugeiconsIcon icon={SparklesIcon} />} label="New" />
      <GlassTabBarItem value="radio" icon={<HugeiconsIcon icon={RadioIcon} />} label="Radio" />
      <GlassTabBarItem value="library" icon={<HugeiconsIcon icon={LibraryIcon} />} label="Library" />
    </GlassTabBar>
  )
}
