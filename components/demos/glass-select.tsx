"use client"

import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectGroup,
  GlassSelectItem,
  GlassSelectLabel,
  GlassSelectSeparator,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/registry/opaline/ui/glass-select"

export default function GlassSelectDemo() {
  return (
    <GlassSelect defaultValue="system">
      <GlassSelectTrigger className="w-52">
        <GlassSelectValue placeholder="Appearance" />
      </GlassSelectTrigger>
      <GlassSelectContent>
        <GlassSelectGroup>
          <GlassSelectLabel>Appearance</GlassSelectLabel>
          <GlassSelectItem value="light">Light</GlassSelectItem>
          <GlassSelectItem value="dark">Dark</GlassSelectItem>
          <GlassSelectItem value="system">Automatic</GlassSelectItem>
        </GlassSelectGroup>
        <GlassSelectSeparator />
        <GlassSelectItem value="high-contrast">High contrast</GlassSelectItem>
      </GlassSelectContent>
    </GlassSelect>
  )
}
