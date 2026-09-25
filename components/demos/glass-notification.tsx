"use client"

import { MailIcon, MessageCircleIcon, MusicIcon } from "lucide-react"

import {
  GlassNotification,
  GlassNotificationStack,
} from "@/registry/opaline/ui/glass-notification"

function AppIcon({ from, to, children }: { from: string; to: string; children: React.ReactNode }) {
  return (
    <span
      className="grid place-items-center text-white [&_svg]:size-[50%]"
      style={{ background: `linear-gradient(180deg, ${from}, ${to})` }}
    >
      {children}
    </span>
  )
}

export default function GlassNotificationDemo() {
  return (
    <div className="flex h-[260px] w-full max-w-sm items-start pt-4">
      <GlassNotificationStack>
        <GlassNotification
          icon={<AppIcon from="#6ef08a" to="#1fbf4a"><MessageCircleIcon /></AppIcon>}
          title="Ava"
          time="now"
        >
          Dinner at 8? I found a place with a view of the bay.
        </GlassNotification>
        <GlassNotification
          icon={<AppIcon from="#6cc6ff" to="#1666e0"><MailIcon /></AppIcon>}
          title="Design Review"
          time="5m ago"
        >
          The new glass tokens are approved for release.
        </GlassNotification>
        <GlassNotification
          icon={<AppIcon from="#ff6b8a" to="#fa2d48"><MusicIcon /></AppIcon>}
          title="New Music"
          time="1h ago"
        >
          Your weekly mix is ready.
        </GlassNotification>
      </GlassNotificationStack>
    </div>
  )
}
