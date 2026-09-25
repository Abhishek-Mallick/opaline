"use client"

import * as React from "react"

import { RollingNumber } from "@/registry/opaline/ui/rolling-number"

export default function RollingNumberDemo() {
  const [value, setValue] = React.useState(1284.5)

  React.useEffect(() => {
    const id = setInterval(() => setValue(Math.round(Math.random() * 99999) / 10), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[13px] font-medium text-muted-foreground">Balance</span>
      <RollingNumber
        value={value}
        format={{ style: "currency", currency: "USD" }}
        className="text-5xl font-semibold tracking-[-0.04em]"
      />
    </div>
  )
}
