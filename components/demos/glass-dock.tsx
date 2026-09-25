"use client"

import {
  CalendarIcon,
  CameraIcon,
  CompassIcon,
  MailIcon,
  MapIcon,
  MessageCircleIcon,
  MusicIcon,
  SettingsIcon,
  SparklesIcon,
} from "lucide-react"

import {
  GlassDock,
  GlassDockItem,
  GlassDockSeparator,
} from "@/registry/opaline/ui/glass-dock"

function AppIcon({ from, to, children }: { from: string; to: string; children: React.ReactNode }) {
  return (
    <span
      className="grid place-items-center text-white [&_svg]:size-[46%]"
      style={{ background: `linear-gradient(180deg, ${from}, ${to})` }}
    >
      {children}
    </span>
  )
}

const apps = [
  { label: "Finder", from: "#6cc6ff", to: "#1e7cf2", icon: <SparklesIcon /> },
  { label: "Safari", from: "#ffffff", to: "#dfe7f1", icon: <CompassIcon className="text-[#1e7cf2]" /> },
  { label: "Messages", from: "#6ef08a", to: "#1fbf4a", icon: <MessageCircleIcon /> },
  { label: "Mail", from: "#6cc6ff", to: "#1666e0", icon: <MailIcon /> },
  { label: "Maps", from: "#9ef08a", to: "#38b24a", icon: <MapIcon /> },
  { label: "Photos", from: "#ffd76b", to: "#ff6b8a", icon: <CameraIcon /> },
  { label: "Calendar", from: "#ffffff", to: "#eceff3", icon: <CalendarIcon className="text-[#ff3b30]" /> },
  { label: "Music", from: "#ff6b8a", to: "#fa2d48", icon: <MusicIcon /> },
]

export default function GlassDockDemo() {
  return (
    <div className="flex h-44 items-end max-md:scale-[0.62] md:max-lg:scale-90">
      <GlassDock>
        {apps.map((app, i) => (
          <GlassDockItem key={app.label} label={app.label} active={i < 3}>
            <AppIcon from={app.from} to={app.to}>
              {app.icon}
            </AppIcon>
          </GlassDockItem>
        ))}
        <GlassDockSeparator />
        <GlassDockItem label="Settings">
          <AppIcon from="#d5d8de" to="#8e939c">
            <SettingsIcon />
          </AppIcon>
        </GlassDockItem>
      </GlassDock>
    </div>
  )
}
