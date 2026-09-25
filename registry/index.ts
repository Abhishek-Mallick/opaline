// Registry manifest — the single source of truth for every Opaline item.
// `scripts/generate-registry.mts` turns it into registry.json, llms.txt and
// per-component markdown; the site reads it for pages, search and commands.

export type Category = "foundation" | "glass" | "accent"

export type Item = {
  name: string
  title: string
  description: string
  category: Category
  type: "registry:ui" | "registry:lib" | "registry:hook" | "registry:theme" | "registry:item"
  files: { path: string; type: string }[]
  dependencies?: string[]
  /** Other Opaline items (by name) — resolved to absolute URLs at build time. */
  internal?: string[]
  /** Needs the glass design tokens. */
  glass?: boolean
  /** Keyframes this item needs, from `keyframes` below. */
  keyframes?: string[]
  /** Usage snippet shown on the docs page and in llms.txt. */
  usage?: string
}

export const categoryLabels: Record<Category, string> = {
  foundation: "Foundations",
  glass: "Liquid Glass",
  accent: "Accents",
}

export const keyframes: Record<string, Record<string, Record<string, string>>> = {
  "opaline-spoke": { from: { opacity: "1" }, to: { opacity: "0.15" } },
  "opaline-sheen": {
    from: { "background-position": "100% 0" },
    to: { "background-position": "-150% 0" },
  },
  // Blobs are centred with the `translate` property, so this only drifts.
  "opaline-drift": {
    "0%": { transform: "translate(0, 0) scale(1)" },
    "50%": { transform: "translate(var(--dx1), var(--dy1)) scale(1.18)" },
    "100%": { transform: "translate(var(--dx2), var(--dy2)) scale(0.92)" },
  },
}

const ui = (name: string) => ({
  path: `registry/opaline/ui/${name}.tsx`,
  type: "registry:ui",
})

const glass = (
  name: string,
  title: string,
  description: string,
  usage: string,
  extra: Partial<Item> = {}
): Item => ({
  name,
  title,
  description,
  category: "glass",
  type: "registry:ui",
  files: [ui(name)],
  internal: ["liquid-glass"],
  glass: true,
  usage,
  ...extra,
})

const accent = (
  name: string,
  title: string,
  description: string,
  usage: string,
  extra: Partial<Item> = {}
): Item => ({
  name,
  title,
  description,
  category: "accent",
  type: "registry:ui",
  files: [ui(name)],
  usage,
  ...extra,
})

export const items: Item[] = [
  {
    name: "theme",
    title: "Opaline Theme",
    description:
      "Minimal, premium design tokens — Apple system typography, neutral palette and glass materials for light and dark.",
    category: "foundation",
    type: "registry:theme",
    files: [],
    glass: true,
  },
  {
    name: "liquid-glass",
    title: "Liquid Glass",
    description:
      "The primitive behind every glass component. Refracts the backdrop through an SVG displacement map, with a frosted fallback.",
    category: "foundation",
    type: "registry:ui",
    files: [
      ui("liquid-glass"),
      { path: "registry/opaline/lib/glass-refraction.ts", type: "registry:lib" },
    ],
    dependencies: ["radix-ui"],
    glass: true,
    usage: `import { LiquidGlass } from "@/components/ui/liquid-glass"

<LiquidGlass className="rounded-3xl p-6" bezel={24} refraction={40}>
  Anything you like
</LiquidGlass>`,
  },
  {
    name: "use-active-indicator",
    title: "useActiveIndicator",
    description: "Hook that tracks the active item's box to animate a selection bubble.",
    category: "foundation",
    type: "registry:hook",
    files: [
      { path: "registry/opaline/hooks/use-active-indicator.ts", type: "registry:hook" },
    ],
  },

  glass(
    "glass-dock",
    "Glass Dock",
    "macOS-style dock with smooth magnification and hover labels.",
    `import { GlassDock, GlassDockItem, GlassDockSeparator } from "@/components/ui/glass-dock"

<GlassDock>
  <GlassDockItem label="Finder" active>
    <img src="/icons/finder.png" alt="" />
  </GlassDockItem>
  <GlassDockItem label="Mail">
    <img src="/icons/mail.png" alt="" />
  </GlassDockItem>
  <GlassDockSeparator />
  <GlassDockItem label="Trash">
    <img src="/icons/trash.png" alt="" />
  </GlassDockItem>
</GlassDock>`
  ),
  glass(
    "glass-button",
    "Glass Button",
    "Pill button made of liquid glass with a pointer-tracked highlight.",
    `import { GlassButton } from "@/components/ui/glass-button"

<GlassButton>Continue</GlassButton>
<GlassButton variant="prominent">Get started</GlassButton>
<GlassButton size="icon" aria-label="Like">
  <HeartIcon />
</GlassButton>`,
    { dependencies: ["class-variance-authority"] }
  ),
  glass(
    "glass-lens",
    "Glass Lens",
    "Draggable magnifying lens that bends whatever is beneath it.",
    `import { GlassLens } from "@/components/ui/glass-lens"

<div className="relative h-80">
  <h1 className="text-8xl font-bold">Opaline</h1>
  <GlassLens size={150} defaultPosition={{ x: 40, y: 40 }} />
</div>`
  ),
  glass(
    "glass-sidebar",
    "Glass Sidebar",
    "Floating source list with a sliding glass selection and icon-only mode.",
    `import {
  GlassSidebar,
  GlassSidebarGroup,
  GlassSidebarHeader,
  GlassSidebarItem,
  GlassSidebarToggle,
} from "@/components/ui/glass-sidebar"

<GlassSidebar>
  <GlassSidebarHeader>
    <GlassSidebarToggle />
  </GlassSidebarHeader>
  <GlassSidebarGroup label="Library">
    <GlassSidebarItem icon={<HouseIcon />} active>Home</GlassSidebarItem>
    <GlassSidebarItem icon={<InboxIcon />} badge={4}>Inbox</GlassSidebarItem>
  </GlassSidebarGroup>
</GlassSidebar>`,
    { dependencies: ["radix-ui", "lucide-react"], internal: ["liquid-glass", "use-active-indicator"] }
  ),
  glass(
    "glass-command",
    "Glass Command",
    "⌘K command palette on a frosted glass sheet, powered by cmdk.",
    `import {
  GlassCommandDialog,
  GlassCommandEmpty,
  GlassCommandGroup,
  GlassCommandInput,
  GlassCommandItem,
  GlassCommandList,
} from "@/components/ui/glass-command"

const [open, setOpen] = React.useState(false)

React.useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }
  document.addEventListener("keydown", onKey)
  return () => document.removeEventListener("keydown", onKey)
}, [])

<GlassCommandDialog open={open} onOpenChange={setOpen}>
  <GlassCommandInput placeholder="Search…" />
  <GlassCommandList>
    <GlassCommandEmpty>No results.</GlassCommandEmpty>
    <GlassCommandGroup heading="Suggestions">
      <GlassCommandItem>Calendar</GlassCommandItem>
      <GlassCommandItem>Settings</GlassCommandItem>
    </GlassCommandGroup>
  </GlassCommandList>
</GlassCommandDialog>`,
    { dependencies: ["cmdk", "radix-ui", "lucide-react"] }
  ),
  glass(
    "glass-player",
    "Glass Player",
    "Now-playing widget with scrubber, transport controls and volume.",
    `import { GlassPlayer } from "@/components/ui/glass-player"

<GlassPlayer title="Midnight City" artist="M83" duration={243} artwork="/cover.jpg" />`,
    { dependencies: ["lucide-react"] }
  ),
  glass(
    "glass-card",
    "Glass Card",
    "Frosted card surface with header, content and footer slots.",
    `import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from "@/components/ui/glass-card"

<GlassCard className="w-80">
  <GlassCardHeader>
    <GlassCardDescription>Cupertino</GlassCardDescription>
    <GlassCardTitle>72°</GlassCardTitle>
  </GlassCardHeader>
  <GlassCardContent>Mostly sunny</GlassCardContent>
</GlassCard>`
  ),
  glass(
    "glass-knob",
    "Glass Knob",
    "Rotary dial with a glass cap — drag around it or use the arrow keys.",
    `import { GlassKnob } from "@/components/ui/glass-knob"

<GlassKnob defaultValue={64} label="Volume" />
<GlassKnob
  value={temp}
  onValueChange={setTemp}
  min={16}
  max={30}
  formatValue={(v) => \`\${v}°\`}
/>`
  ),
  glass(
    "glass-clock",
    "Glass Clock",
    "Analog clock on a liquid glass face with a sweeping second hand.",
    `import { GlassClock } from "@/components/ui/glass-clock"

<GlassClock />
<GlassClock timeZone="Asia/Tokyo" label="Tokyo" size={140} />`
  ),
  glass(
    "glass-stack",
    "Glass Stack",
    "A deck of glass cards — swipe the top one away to reveal the next.",
    `import { GlassStack, GlassStackCard } from "@/components/ui/glass-stack"

<GlassStack className="h-52 w-80">
  <GlassStackCard>Apple Card</GlassStackCard>
  <GlassStackCard>Boarding pass</GlassStackCard>
  <GlassStackCard>Membership</GlassStackCard>
</GlassStack>`
  ),
  glass(
    "glass-switch",
    "Glass Switch",
    "iOS switch whose thumb turns into a glass lens while pressed.",
    `import { GlassSwitch } from "@/components/ui/glass-switch"

<GlassSwitch defaultChecked aria-label="Wi-Fi" />`,
    { dependencies: ["radix-ui"] }
  ),
  glass(
    "glass-slider",
    "Glass Slider",
    "Slider whose thumb becomes a refracting lens while dragging.",
    `import { GlassSlider } from "@/components/ui/glass-slider"

<GlassSlider defaultValue={[60]} aria-label="Volume" />`,
    { dependencies: ["radix-ui"] }
  ),
  glass(
    "glass-tabs",
    "Glass Tabs",
    "Segmented control with a glass bubble that glides between tabs.",
    `import {
  GlassTabs,
  GlassTabsContent,
  GlassTabsList,
  GlassTabsTrigger,
} from "@/components/ui/glass-tabs"

<GlassTabs defaultValue="week">
  <GlassTabsList>
    <GlassTabsTrigger value="day">Day</GlassTabsTrigger>
    <GlassTabsTrigger value="week">Week</GlassTabsTrigger>
    <GlassTabsTrigger value="month">Month</GlassTabsTrigger>
  </GlassTabsList>
  <GlassTabsContent value="week">…</GlassTabsContent>
</GlassTabs>`,
    { dependencies: ["radix-ui"], internal: ["liquid-glass", "use-active-indicator"] }
  ),
  glass(
    "glass-tab-bar",
    "Glass Tab Bar",
    "Floating iOS 26 tab bar with a sliding liquid selection.",
    `import { GlassTabBar, GlassTabBarItem } from "@/components/ui/glass-tab-bar"

<GlassTabBar defaultValue="home" onValueChange={console.log}>
  <GlassTabBarItem value="home" icon={<HouseIcon />} label="Home" />
  <GlassTabBarItem value="search" icon={<SearchIcon />} label="Search" />
</GlassTabBar>`,
    { internal: ["liquid-glass", "use-active-indicator"] }
  ),
  glass(
    "glass-sheet",
    "Glass Sheet",
    "Floating side sheet, or a drag-to-dismiss bottom drawer with side=\"bottom\".",
    `import {
  GlassSheet,
  GlassSheetContent,
  GlassSheetDescription,
  GlassSheetHeader,
  GlassSheetTitle,
  GlassSheetTrigger,
} from "@/components/ui/glass-sheet"

<GlassSheet>
  <GlassSheetTrigger>Open</GlassSheetTrigger>
  <GlassSheetContent side="right">
    <GlassSheetHeader>
      <GlassSheetTitle>Settings</GlassSheetTitle>
      <GlassSheetDescription>Tune your workspace.</GlassSheetDescription>
    </GlassSheetHeader>
  </GlassSheetContent>
</GlassSheet>`,
    { dependencies: ["radix-ui", "lucide-react"] }
  ),
  glass(
    "glass-toast",
    "Glass Toast",
    "Imperative toasts on glass that drop in from the top.",
    `import { GlassToaster, toast } from "@/components/ui/glass-toast"

// once, in your root layout
<GlassToaster />

// anywhere
toast("Message sent")
toast.success("Saved", { description: "Your changes are live." })
toast("File deleted", { action: { label: "Undo", onClick: restore } })`,
    { dependencies: ["lucide-react"] }
  ),
  glass(
    "glass-popover",
    "Glass Popover",
    "Rich popover content on a frosted glass surface.",
    `import {
  GlassPopover,
  GlassPopoverContent,
  GlassPopoverTrigger,
} from "@/components/ui/glass-popover"

<GlassPopover>
  <GlassPopoverTrigger>Details</GlassPopoverTrigger>
  <GlassPopoverContent>Anything goes here.</GlassPopoverContent>
</GlassPopover>`,
    { dependencies: ["radix-ui"] }
  ),
  glass(
    "glass-select",
    "Glass Select",
    "Capsule select with a frosted glass option list.",
    `import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/components/ui/glass-select"

<GlassSelect defaultValue="system">
  <GlassSelectTrigger className="w-48">
    <GlassSelectValue placeholder="Appearance" />
  </GlassSelectTrigger>
  <GlassSelectContent>
    <GlassSelectItem value="light">Light</GlassSelectItem>
    <GlassSelectItem value="dark">Dark</GlassSelectItem>
    <GlassSelectItem value="system">System</GlassSelectItem>
  </GlassSelectContent>
</GlassSelect>`,
    { dependencies: ["radix-ui", "lucide-react"] }
  ),
  glass(
    "glass-menu",
    "Glass Menu",
    "Dropdown menu rendered on liquid glass.",
    `import {
  GlassMenu,
  GlassMenuContent,
  GlassMenuItem,
  GlassMenuSeparator,
  GlassMenuTrigger,
} from "@/components/ui/glass-menu"

<GlassMenu>
  <GlassMenuTrigger>Actions</GlassMenuTrigger>
  <GlassMenuContent>
    <GlassMenuItem>Rename</GlassMenuItem>
    <GlassMenuItem>Duplicate</GlassMenuItem>
    <GlassMenuSeparator />
    <GlassMenuItem variant="destructive">Delete</GlassMenuItem>
  </GlassMenuContent>
</GlassMenu>`,
    { dependencies: ["radix-ui", "lucide-react"] }
  ),
  glass(
    "glass-dialog",
    "Glass Dialog",
    "Modal on a frosted glass sheet with springy transform-only motion.",
    `import {
  GlassDialog,
  GlassDialogContent,
  GlassDialogDescription,
  GlassDialogHeader,
  GlassDialogTitle,
  GlassDialogTrigger,
} from "@/components/ui/glass-dialog"

<GlassDialog>
  <GlassDialogTrigger>Open</GlassDialogTrigger>
  <GlassDialogContent>
    <GlassDialogHeader>
      <GlassDialogTitle>Share with friends</GlassDialogTitle>
      <GlassDialogDescription>Anyone with the link can view.</GlassDialogDescription>
    </GlassDialogHeader>
  </GlassDialogContent>
</GlassDialog>`,
    { dependencies: ["radix-ui", "lucide-react"] }
  ),
  glass(
    "glass-notification",
    "Glass Notification",
    "iOS notification banner plus a stack that fans out on hover.",
    `import {
  GlassNotification,
  GlassNotificationStack,
} from "@/components/ui/glass-notification"

<GlassNotificationStack>
  <GlassNotification title="Ava" time="now">Dinner at 8?</GlassNotification>
  <GlassNotification title="Mail" time="5m ago">Your invoice is ready.</GlassNotification>
</GlassNotificationStack>`
  ),
  glass(
    "glass-input",
    "Glass Input",
    "Capsule text field with icon and adornment slots — made for search.",
    `import { GlassInput } from "@/components/ui/glass-input"

<GlassInput placeholder="Search" startIcon={<SearchIcon />} endAdornment={<MicIcon />} />`
  ),
  glass(
    "glass-toolbar",
    "Glass Toolbar",
    "Floating capsule toolbar that groups icon actions.",
    `import {
  GlassToolbar,
  GlassToolbarButton,
  GlassToolbarSeparator,
} from "@/components/ui/glass-toolbar"

<GlassToolbar>
  <GlassToolbarButton aria-label="Bold" active><BoldIcon /></GlassToolbarButton>
  <GlassToolbarButton aria-label="Italic"><ItalicIcon /></GlassToolbarButton>
  <GlassToolbarSeparator />
  <GlassToolbarButton aria-label="Link"><LinkIcon /></GlassToolbarButton>
</GlassToolbar>`
  ),
  glass(
    "glass-tooltip",
    "Glass Tooltip",
    "Capsule tooltip that springs out of its trigger.",
    `import {
  GlassTooltip,
  GlassTooltipContent,
  GlassTooltipTrigger,
} from "@/components/ui/glass-tooltip"

<GlassTooltip>
  <GlassTooltipTrigger>Hover me</GlassTooltipTrigger>
  <GlassTooltipContent>Notifications</GlassTooltipContent>
</GlassTooltip>`,
    { dependencies: ["radix-ui"] }
  ),
  glass(
    "glass-badge",
    "Glass Badge",
    "Small glass chip with an optional glowing status dot.",
    `import { GlassBadge } from "@/components/ui/glass-badge"

<GlassBadge dot="#34c759">Live</GlassBadge>`
  ),

  accent(
    "mesh-gradient",
    "Mesh Gradient",
    "Slowly drifting, grain-textured colour field — the perfect backdrop for glass.",
    `import { MeshGradient } from "@/components/ui/mesh-gradient"

<MeshGradient className="h-96 rounded-3xl" colors={["#ff7ab6", "#6bd2ff", "#8f7bff"]}>
  {/* put glass components here */}
</MeshGradient>`,
    { keyframes: ["opaline-drift"] }
  ),
  accent(
    "rolling-number",
    "Rolling Number",
    "Odometer-style number where every digit rolls to its new value.",
    `import { RollingNumber } from "@/components/ui/rolling-number"

<RollingNumber value={1284.5} format={{ style: "currency", currency: "USD" }} />`
  ),
  accent(
    "activity-rings",
    "Activity Rings",
    "Concentric progress rings in the spirit of Apple Watch.",
    `import { ActivityRings } from "@/components/ui/activity-rings"

<ActivityRings
  rings={[
    { value: 0.82, color: "#fa114f", label: "Move" },
    { value: 0.64, color: "#a6ff00", label: "Exercise" },
    { value: 0.9, color: "#00e0ff", label: "Stand" },
  ]}
/>`
  ),
  accent(
    "shimmer-text",
    "Shimmer Text",
    "Text with a slow specular sweep, like light catching glass.",
    `import { ShimmerText } from "@/components/ui/shimmer-text"

<ShimmerText className="text-2xl font-semibold">Thinking…</ShimmerText>`,
    { keyframes: ["opaline-sheen"] }
  ),
  accent(
    "spinner",
    "Spinner",
    "Apple-style eight-spoke activity indicator.",
    `import { Spinner } from "@/components/ui/spinner"

<Spinner />
<Spinner className="size-8 text-muted-foreground" />`,
    { keyframes: ["opaline-spoke"] }
  ),
]

export const itemsByName = Object.fromEntries(items.map((i) => [i.name, i]))

/** Items that get a docs page and a tile, in display order. */
export const docItems = items.filter((i) => i.name !== "theme" && i.type !== "registry:hook")
