"use client"

import {
  GlassTabs,
  GlassTabsList,
  GlassTabsTrigger,
} from "@/registry/opaline/ui/glass-tabs"

export default function GlassTabsDemo() {
  return (
    <GlassTabs defaultValue="week">
      <GlassTabsList>
        <GlassTabsTrigger value="day">Day</GlassTabsTrigger>
        <GlassTabsTrigger value="week">Week</GlassTabsTrigger>
        <GlassTabsTrigger value="month">Month</GlassTabsTrigger>
        <GlassTabsTrigger value="year">Year</GlassTabsTrigger>
      </GlassTabsList>
    </GlassTabs>
  )
}
