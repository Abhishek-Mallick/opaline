"use client"

import { Spinner } from "@/registry/opaline/ui/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-8 text-muted-foreground">
      <Spinner />
      <Spinner className="size-8" />
      <Spinner className="size-12 text-foreground" />
    </div>
  )
}
