"use client"

import { GlassButton } from "@/registry/opaline/ui/glass-button"
import {
  GlassSheet,
  GlassSheetClose,
  GlassSheetContent,
  GlassSheetDescription,
  GlassSheetFooter,
  GlassSheetHeader,
  GlassSheetTitle,
  GlassSheetTrigger,
} from "@/registry/opaline/ui/glass-sheet"
import { GlassSlider } from "@/registry/opaline/ui/glass-slider"
import { GlassSwitch } from "@/registry/opaline/ui/glass-switch"

export default function GlassSheetDemo() {
  return (
    <div className="flex gap-3">
      <GlassSheet>
        <GlassSheetTrigger asChild>
          <GlassButton>Side sheet</GlassButton>
        </GlassSheetTrigger>
        <GlassSheetContent side="right">
          <GlassSheetHeader>
            <GlassSheetTitle>Display</GlassSheetTitle>
            <GlassSheetDescription>Tune how everything looks.</GlassSheetDescription>
          </GlassSheetHeader>
          <div className="flex flex-col gap-5 pt-2">
            <label className="flex items-center justify-between text-[15px] font-medium">
              True Tone <GlassSwitch defaultChecked />
            </label>
            <label className="flex items-center justify-between text-[15px] font-medium">
              Night Shift <GlassSwitch />
            </label>
            <div className="grid gap-2 text-[15px] font-medium">
              Brightness
              <GlassSlider defaultValue={[70]} aria-label="Brightness" />
            </div>
          </div>
          <GlassSheetFooter>
            <GlassSheetClose asChild>
              <GlassButton variant="prominent">Done</GlassButton>
            </GlassSheetClose>
          </GlassSheetFooter>
        </GlassSheetContent>
      </GlassSheet>

      <GlassSheet>
        <GlassSheetTrigger asChild>
          <GlassButton>Drawer</GlassButton>
        </GlassSheetTrigger>
        <GlassSheetContent side="bottom">
          <GlassSheetHeader>
            <GlassSheetTitle>Share</GlassSheetTitle>
            <GlassSheetDescription>Drag the handle down to dismiss.</GlassSheetDescription>
          </GlassSheetHeader>
          <div className="grid grid-cols-4 gap-4 py-2 text-center text-xs font-medium">
            {["AirDrop", "Messages", "Mail", "Notes"].map((app, i) => (
              <div key={app} className="flex flex-col items-center gap-2">
                <span
                  className="size-14 rounded-[16px] shadow-sm"
                  style={{
                    background: ["#0a84ff", "#34c759", "#5ac8fa", "#ffcc00"][i],
                  }}
                />
                {app}
              </div>
            ))}
          </div>
        </GlassSheetContent>
      </GlassSheet>
    </div>
  )
}
