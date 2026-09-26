"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon, MessageCircleIcon, MusicIcon } from "@hugeicons/core-free-icons"

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
    <div className="flex h-[260px] w-full max-w-sm items-start">
      <GlassNotificationStack>
        <GlassNotification
          icon={<AppIcon from="#6ef08a" to="#1fbf4a"><HugeiconsIcon icon={MessageCircleIcon} /></AppIcon>}
          title="Ava"
          time="now"
        >
          Dinner at 8? I found a place with a view of the bay.
        </GlassNotification>
        <GlassNotification
          icon={<AppIcon from="#6cc6ff" to="#1666e0"><HugeiconsIcon icon={Mail01Icon} /></AppIcon>}
          title="Design Review"
          time="5m ago"
        >
          The new glass tokens are approved for release.
        </GlassNotification>
        <GlassNotification
          icon={<AppIcon from="#ff6b8a" to="#fa2d48"><HugeiconsIcon icon={MusicIcon} /></AppIcon>}
          title="New Music"
          time="1h ago"
        >
          Your weekly mix is ready.
        </GlassNotification>
      </GlassNotificationStack>
    </div>
  )
}
