"use client"

import { GlassButton } from "@/registry/opaline/ui/opaline/glass-button"
import {
  GlassAlert,
  GlassAlertAction,
  GlassAlertDescription,
  GlassAlertTitle,
} from "@/registry/opaline/ui/opaline/glass-alert"

export default function GlassAlertDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <GlassAlert variant="success">
        <GlassAlertTitle>Payment received</GlassAlertTitle>
        <GlassAlertDescription>Your Pro plan renews on 12 November.</GlassAlertDescription>
      </GlassAlert>
      <GlassAlert variant="warning">
        <GlassAlertTitle>Storage almost full</GlassAlertTitle>
        <GlassAlertDescription>You've used 92% of your 50 GB.</GlassAlertDescription>
        <GlassAlertAction>
          <GlassButton size="sm">Upgrade</GlassButton>
        </GlassAlertAction>
      </GlassAlert>
      <GlassAlert variant="destructive">
        <GlassAlertTitle>Couldn't sync</GlassAlertTitle>
        <GlassAlertDescription>Check your connection and try again.</GlassAlertDescription>
      </GlassAlert>
    </div>
  )
}
