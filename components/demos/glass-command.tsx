"use client"

import * as React from "react"
import {
  CalendarIcon,
  CalculatorIcon,
  MoonIcon,
  SearchIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from "lucide-react"

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
        <SearchIcon /> Open palette
      </GlassButton>
      <GlassCommandDialog open={open} onOpenChange={setOpen}>
        <GlassCommandInput placeholder="Type a command or search…" />
        <GlassCommandList>
          <GlassCommandEmpty>No results found.</GlassCommandEmpty>
          <GlassCommandGroup heading="Suggestions">
            <GlassCommandItem>
              <CalendarIcon /> Calendar
            </GlassCommandItem>
            <GlassCommandItem>
              <SmileIcon /> Search emoji
            </GlassCommandItem>
            <GlassCommandItem>
              <CalculatorIcon /> Calculator
            </GlassCommandItem>
          </GlassCommandGroup>
          <GlassCommandSeparator />
          <GlassCommandGroup heading="Settings">
            <GlassCommandItem>
              <UserIcon /> Profile <GlassCommandShortcut>⌘P</GlassCommandShortcut>
            </GlassCommandItem>
            <GlassCommandItem>
              <MoonIcon /> Toggle dark mode <GlassCommandShortcut>⌘D</GlassCommandShortcut>
            </GlassCommandItem>
            <GlassCommandItem>
              <SettingsIcon /> Settings <GlassCommandShortcut>⌘,</GlassCommandShortcut>
            </GlassCommandItem>
          </GlassCommandGroup>
        </GlassCommandList>
      </GlassCommandDialog>
    </>
  )
}
