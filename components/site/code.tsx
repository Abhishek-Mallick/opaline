"use client"

import * as React from "react"

import { CopyIconSwap, useCopy } from "@/components/site/install-mode"
import { cn } from "@/lib/utils"

export function CopyButton({
  value,
  className,
  label = "Copy",
}: {
  value: string
  className?: string
  label?: string
}) {
  const { copied, copy } = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={label}
      className={cn(
        "grid size-7 shrink-0 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground",
        className
      )}
    >
      <CopyIconSwap copied={copied} />
    </button>
  )
}

/** Presentational frame for pre-highlighted (Shiki) HTML. */
export function CodeFrame({
  html,
  code,
  title,
  lineNumbers = true,
  className,
  bodyClassName,
  toolbar,
}: {
  html: string
  code: string
  title?: React.ReactNode
  lineNumbers?: boolean
  className?: string
  bodyClassName?: string
  toolbar?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-muted/40",
        className
      )}
    >
      {title || toolbar ? (
        <div className="flex h-11 items-center gap-2 border-b border-border pr-2 pl-4 text-[12.5px] text-muted-foreground">
          <div className="flex min-w-0 flex-1 items-center gap-2">{title}</div>
          {toolbar}
          <CopyButton value={code} />
        </div>
      ) : (
        <CopyButton value={code} className="absolute top-2.5 right-2.5 z-10" />
      )}
      <div
        className={cn(
          "code-block overflow-auto py-4 font-mono text-[12.5px] leading-[1.7]",
          lineNumbers && "code-lines",
          bodyClassName
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
