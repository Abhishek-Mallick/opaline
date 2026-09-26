"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { CalculatorIcon, Calendar01Icon, MoonIcon, Search01Icon, Settings01Icon, SmileIcon, UserIcon } from "@hugeicons/core-free-icons"

import { GlassButton } from "@/registry/opaline/ui/glass-button"
import {
  GlassCommandDialog,
  GlassCommandEmpty,
  GlassCommandGroup,
  GlassCommandInput,
  GlassCommandItem,
  GlassCommandList,
  GlassCommandSeparator,
  GlassCommandShortcut,
} from "@/registry/opaline/ui/glass-command"

export default function GlassCommandDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <GlassButton onClick={() => setOpen(true)}>
        <HugeiconsIcon icon={Search01Icon} /> Open palette
      </GlassButton>
      <GlassCommandDialog open={open} onOpenChange={setOpen}>
        <GlassCommandInput placeholder="Type a command or search…" />
        <GlassCommandList>
          <GlassCommandEmpty>No results found.</GlassCommandEmpty>
          <GlassCommandGroup heading="Suggestions">
            <GlassCommandItem>
              <HugeiconsIcon icon={Calendar01Icon} /> Calendar
            </GlassCommandItem>
            <GlassCommandItem>
              <HugeiconsIcon icon={SmileIcon} /> Search emoji
            </GlassCommandItem>
            <GlassCommandItem>
              <HugeiconsIcon icon={CalculatorIcon} /> Calculator
            </GlassCommandItem>
          </GlassCommandGroup>
          <GlassCommandSeparator />
          <GlassCommandGroup heading="Settings">
            <GlassCommandItem>
              <HugeiconsIcon icon={UserIcon} /> Profile <GlassCommandShortcut>⌘P</GlassCommandShortcut>
            </GlassCommandItem>
            <GlassCommandItem>
              <HugeiconsIcon icon={MoonIcon} /> Toggle dark mode <GlassCommandShortcut>⌘D</GlassCommandShortcut>
            </GlassCommandItem>
            <GlassCommandItem>
              <HugeiconsIcon icon={Settings01Icon} /> Settings <GlassCommandShortcut>⌘,</GlassCommandShortcut>
            </GlassCommandItem>
          </GlassCommandGroup>
        </GlassCommandList>
      </GlassCommandDialog>
    </>
  )
}
