"use client"

import { CopyIconSwap, useCopy } from "@/components/site/install-mode"

export function CopyPageButton({ markdown }: { markdown: string }) {
  const { copied, copy } = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(markdown)}
      title="Copy this page as Markdown (for LLMs)"
      className="flex h-8 cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-2.5 text-[13px] font-medium transition-colors hover:bg-foreground/[0.04]"
    >
      <CopyIconSwap copied={copied} />
      Copy page
    </button>
  )
}
