"use client"

import * as React from "react"

import {
  GlassMessage,
  GlassMessageContent,
  GlassMessageList,
  GlassMessageTyping,
} from "@/registry/opaline/ui/opaline/glass-message"

const replies = [
  "Day 1: Fushimi Inari at sunrise, then Nishiki Market.",
  "Day 2: Arashiyama bamboo grove and a tea ceremony in Gion.",
]

export default function GlassMessageDemo() {
  const [shown, setShown] = React.useState(0)
  React.useEffect(() => {
    const id = setInterval(() => setShown((n) => (n >= replies.length + 1 ? 0 : n + 1)), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <GlassMessageList className="w-full max-w-md">
      <GlassMessage avatar="AI" name="Assistant">
        <GlassMessageContent>Hi! Where are you headed?</GlassMessageContent>
      </GlassMessage>
      <GlassMessage from="user" footer="Read 9:41">
        <GlassMessageContent>Plan a weekend in Kyoto 🍵</GlassMessageContent>
      </GlassMessage>
      {shown === 0 ? (
        <GlassMessageTyping />
      ) : (
        <GlassMessage avatar="AI">
          {replies.slice(0, shown).map((r) => (
            <GlassMessageContent key={r}>{r}</GlassMessageContent>
          ))}
        </GlassMessage>
      )}
    </GlassMessageList>
  )
}
