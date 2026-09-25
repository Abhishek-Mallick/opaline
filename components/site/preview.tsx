"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { CodeFrame } from "@/components/site/code"
import { cn } from "@/lib/utils"

/** Preview card with a collapsible "View Code" panel underneath. */
export function Preview({
  stage,
  html,
  code,
}: {
  stage: React.ReactNode
  html: string
  code: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-card">
      {stage}
      {code ? (
        <div className="relative border-t border-border">
          <CodeFrame
            html={html}
            code={code}
            className="rounded-none border-0"
            bodyClassName={cn(open ? "max-h-[560px]" : "max-h-[140px] overflow-hidden")}
          />
          {!open ? (
            <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center bg-gradient-to-b from-transparent via-card/70 to-card pb-5">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background px-4 text-[13px] font-medium shadow-[0_2px_8px_-2px_rgb(0_0_0/0.12)] transition-transform active:scale-95"
              >
                View code <ChevronDownIcon className="size-4" />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
