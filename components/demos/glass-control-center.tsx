"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { BluetoothIcon, CastIcon, KeyboardIcon, MoonIcon, PanelsTopLeftIcon, PauseIcon, PlayIcon, Radar01Icon, SkipBackIcon, SkipForwardIcon, Sun01Icon, SunDimIcon, Timer01Icon, VolumeHighIcon, VolumeLowIcon, Wifi01Icon } from "@hugeicons/core-free-icons"

import {
  GlassControlButton,
  GlassControlCenter,
  GlassControlTile,
  GlassControlToggle,
} from "@/registry/opaline/ui/glass-control-center"
import { GlassSlider } from "@/registry/opaline/ui/glass-slider"

export default function GlassControlCenterDemo() {
  const [playing, setPlaying] = React.useState(true)
  const [stage, setStage] = React.useState(false)

  return (
    <GlassControlCenter>
      <GlassControlTile rows={2} className="justify-around">
        <GlassControlToggle icon={<HugeiconsIcon icon={Wifi01Icon} />} label="Wi-Fi" status="Opaline_5G" defaultPressed />
        <GlassControlToggle icon={<HugeiconsIcon icon={BluetoothIcon} />} label="Bluetooth" defaultPressed />
        <GlassControlToggle icon={<HugeiconsIcon icon={Radar01Icon} />} label="AirDrop" status="Contacts" />
      </GlassControlTile>

      <GlassControlTile rows={2} className="justify-between">
        <div className="size-12 rounded-xl bg-[conic-gradient(from_200deg,#ff6b9a,#ffb56b,#6bd2ff,#a36bff,#ff6b9a)] shadow-[0_6px_16px_-6px_rgb(0_0_0/0.4)]" />
        <div className="leading-tight">
          <div className="truncate text-[13px] font-semibold">Midnight City</div>
          <div className="truncate text-[11px] opacity-60">M83</div>
        </div>
        <div className="flex items-center justify-between px-1 [&_button]:cursor-pointer [&_button]:transition-transform [&_button]:active:scale-85 [&_svg]:size-5 [&_svg]:fill-current">
          <button type="button" aria-label="Previous"><HugeiconsIcon icon={SkipBackIcon} /></button>
          <button type="button" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}>
            {playing ? <HugeiconsIcon icon={PauseIcon} strokeWidth={0} /> : <HugeiconsIcon icon={PlayIcon} strokeWidth={0} />}
          </button>
          <button type="button" aria-label="Next"><HugeiconsIcon icon={SkipForwardIcon} /></button>
        </div>
      </GlassControlTile>

      <GlassControlTile>
        <GlassControlToggle icon={<HugeiconsIcon icon={MoonIcon} />} label="Focus" status="Do Not Disturb" color="#5e5ce6" defaultPressed />
      </GlassControlTile>
      <GlassControlTile cols={1}>
        <GlassControlButton aria-label="Stage Manager" active={stage} onClick={() => setStage(!stage)}>
          <HugeiconsIcon icon={PanelsTopLeftIcon} />
        </GlassControlButton>
      </GlassControlTile>
      <GlassControlTile cols={1}>
        <GlassControlButton aria-label="Screen Mirroring">
          <HugeiconsIcon icon={CastIcon} />
        </GlassControlButton>
      </GlassControlTile>

      <GlassControlTile cols={4}>
        <span className="px-1 text-[13px] font-semibold tracking-[-0.01em]">Display</span>
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={SunDimIcon} className="size-4 shrink-0 opacity-60" />
          <GlassSlider defaultValue={[72]} aria-label="Display" className="flex-1" />
          <HugeiconsIcon icon={Sun01Icon} className="size-4 shrink-0 opacity-60" />
        </div>
      </GlassControlTile>
      <GlassControlTile cols={4}>
        <span className="px-1 text-[13px] font-semibold tracking-[-0.01em]">Sound</span>
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={VolumeLowIcon} className="size-4 shrink-0 opacity-60" />
          <GlassSlider defaultValue={[45]} aria-label="Sound" className="flex-1" />
          <HugeiconsIcon icon={VolumeHighIcon} className="size-4 shrink-0 opacity-60" />
        </div>
      </GlassControlTile>

      <GlassControlTile cols={1}>
        <GlassControlButton aria-label="Timer">
          <HugeiconsIcon icon={Timer01Icon} />
        </GlassControlButton>
      </GlassControlTile>
      <GlassControlTile cols={3}>
        <span className="px-1 text-[13px] font-semibold tracking-[-0.01em]">Keyboard</span>
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={KeyboardIcon} className="size-4 shrink-0 opacity-60" />
          <GlassSlider defaultValue={[30]} aria-label="Keyboard" className="flex-1" />
        </div>
      </GlassControlTile>
    </GlassControlCenter>
  )
}
