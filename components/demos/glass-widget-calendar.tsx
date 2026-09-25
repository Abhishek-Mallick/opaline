"use client"

import { GlassWidgetCalendar } from "@/registry/opaline/ui/glass-widget-calendar"

const events = [
  { title: "Design review", time: "2:00 – 3:00 PM", color: "#ff9f0a" },
  { title: "Opaline launch", time: "4:30 PM", color: "#bf5af2" },
  { title: "Gym", time: "6:30 PM", color: "#30d158" },
]

export default function GlassWidgetCalendarDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <GlassWidgetCalendar events={events} />
      <GlassWidgetCalendar size="medium" events={events} />
    </div>
  )
}
