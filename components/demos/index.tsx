"use client"

// List of demo components, keyed by registry item name.

import ActivityRingsDemo from "./activity-rings"
import GlassBadgeDemo from "./glass-badge"
import GlassButtonDemo from "./glass-button"
import GlassCardDemo from "./glass-card"
import GlassClockDemo from "./glass-clock"
import GlassCommandDemo from "./glass-command"
import GlassControlCenterDemo from "./glass-control-center"
import GlassDialogDemo from "./glass-dialog"
import GlassDockDemo from "./glass-dock"
import GlassInputDemo from "./glass-input"
import GlassKnobDemo from "./glass-knob"
import GlassLensDemo from "./glass-lens"
import GlassMenuDemo from "./glass-menu"
import GlassNotificationDemo from "./glass-notification"
import GlassPlayerDemo from "./glass-player"
import GlassPopoverDemo from "./glass-popover"
import GlassSelectDemo from "./glass-select"
import GlassSheetDemo from "./glass-sheet"
import GlassSidebarDemo from "./glass-sidebar"
import GlassSliderDemo from "./glass-slider"
import GlassStackDemo from "./glass-stack"
import GlassSwitchDemo from "./glass-switch"
import GlassTabBarDemo from "./glass-tab-bar"
import GlassTabsDemo from "./glass-tabs"
import GlassTextDemo from "./glass-text"
import GlassToastDemo from "./glass-toast"
import GlassToolbarDemo from "./glass-toolbar"
import GlassTooltipDemo from "./glass-tooltip"
import LiquidGlassDemo from "./liquid-glass"
import MeshGradientDemo from "./mesh-gradient"
import RollingNumberDemo from "./rolling-number"
import ShimmerTextDemo from "./shimmer-text"
import SpinnerDemo from "./spinner"

const demos: Record<string, React.ComponentType> = {
  "activity-rings": ActivityRingsDemo,
  "glass-badge": GlassBadgeDemo,
  "glass-button": GlassButtonDemo,
  "glass-card": GlassCardDemo,
  "glass-clock": GlassClockDemo,
  "glass-command": GlassCommandDemo,
  "glass-control-center": GlassControlCenterDemo,
  "glass-dialog": GlassDialogDemo,
  "glass-dock": GlassDockDemo,
  "glass-input": GlassInputDemo,
  "glass-knob": GlassKnobDemo,
  "glass-lens": GlassLensDemo,
  "glass-menu": GlassMenuDemo,
  "glass-notification": GlassNotificationDemo,
  "glass-player": GlassPlayerDemo,
  "glass-popover": GlassPopoverDemo,
  "glass-select": GlassSelectDemo,
  "glass-sheet": GlassSheetDemo,
  "glass-sidebar": GlassSidebarDemo,
  "glass-slider": GlassSliderDemo,
  "glass-stack": GlassStackDemo,
  "glass-switch": GlassSwitchDemo,
  "glass-tab-bar": GlassTabBarDemo,
  "glass-tabs": GlassTabsDemo,
  "glass-text": GlassTextDemo,
  "glass-toast": GlassToastDemo,
  "glass-toolbar": GlassToolbarDemo,
  "glass-tooltip": GlassTooltipDemo,
  "liquid-glass": LiquidGlassDemo,
  "mesh-gradient": MeshGradientDemo,
  "rolling-number": RollingNumberDemo,
  "shimmer-text": ShimmerTextDemo,
  "spinner": SpinnerDemo,
}

export function Demo({ name }: { name: string }) {
  const Component = demos[name]
  return Component ? <Component /> : null
}
