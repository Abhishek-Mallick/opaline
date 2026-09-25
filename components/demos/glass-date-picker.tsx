"use client"

import * as React from "react"

import { GlassCalendar, GlassDatePicker } from "@/registry/opaline/ui/glass-date-picker"

export default function GlassDatePickerDemo() {
  const [date, setDate] = React.useState<Date>()
  React.useEffect(() => setDate(new Date()), [])

  return (
    <div className="flex flex-col items-center gap-5">
      <GlassDatePicker value={date} onValueChange={setDate} />
      <GlassCalendar value={date} onValueChange={setDate} />
    </div>
  )
}
