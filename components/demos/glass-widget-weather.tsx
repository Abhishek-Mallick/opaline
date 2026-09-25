"use client"

import { GlassWidgetWeather } from "@/registry/opaline/ui/glass-widget-weather"

export default function GlassWidgetWeatherDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <GlassWidgetWeather
        location="Tokyo"
        temperature={54}
        condition="rain"
        high={58}
        low={49}
      />
      <GlassWidgetWeather
        size="medium"
        location="Cupertino"
        temperature={72}
        condition="partly-cloudy"
        high={76}
        low={58}
        hourly={[
          { time: "Now", temperature: 72, condition: "partly-cloudy" },
          { time: "2PM", temperature: 74, condition: "sunny" },
          { time: "3PM", temperature: 75, condition: "sunny" },
          { time: "4PM", temperature: 73, condition: "cloudy" },
          { time: "5PM", temperature: 69, condition: "rain" },
          { time: "6PM", temperature: 64, condition: "night" },
        ]}
      />
    </div>
  )
}
