"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUp02Icon, AttachmentIcon, Mic01Icon } from "@hugeicons/core-free-icons"

import { GlassButton } from "@/registry/opaline/ui/opaline/glass-button"
import { GlassTextarea } from "@/registry/opaline/ui/opaline/glass-textarea"
import { toast } from "@/registry/opaline/ui/opaline/glass-toast"

export default function GlassTextareaDemo() {
  const [text, setText] = React.useState("")
  const send = (value: string) => {
    if (!value.trim()) return
    toast.success("Sent", { description: value.slice(0, 60) })
    setText("")
  }
  return (
    <GlassTextarea
      containerClassName="max-w-md"
      aria-label="Message"
      placeholder="Ask anything… (⌘ + Enter to send)"
      value={text}
      onChange={(e) => setText(e.target.value)}
      maxLength={280}
      showCount
      minRows={2}
      maxRows={6}
      onSubmitShortcut={send}
      footer={
        <>
          <GlassButton size="icon-sm" aria-label="Attach">
            <HugeiconsIcon icon={AttachmentIcon} />
          </GlassButton>
          <GlassButton size="icon-sm" aria-label="Dictate">
            <HugeiconsIcon icon={Mic01Icon} />
          </GlassButton>
          <GlassButton
            size="icon-sm"
            variant="prominent"
            aria-label="Send"
            className="ml-auto"
            disabled={!text.trim()}
            onClick={() => send(text)}
          >
            <HugeiconsIcon icon={ArrowUp02Icon} />
          </GlassButton>
        </>
      }
    />
  )
}
