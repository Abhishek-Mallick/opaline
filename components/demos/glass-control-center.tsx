"use client"

import * as React from "react"
import {
  BluetoothIcon,
  CastIcon,
  KeyboardIcon,
  MoonIcon,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SunIcon,
  SunDimIcon,
  TimerIcon,
  Volume1Icon,
  Volume2Icon,
  WifiIcon,
  RadarIcon,
  PanelsTopLeftIcon,
} from "lucide-react"

import {
  GlassControlButton,
  GlassControlCenter,
  GlassControlSlider,
  GlassControlTile,
  GlassControlToggle,
} from "@/registry/opaline/ui/glass-control-center"

export default function GlassControlCenterDemo() {
  const [playing, setPlaying] = React.useState(true)
  const [stage, setStage] = React.useState(false)

  return (
    <GlassControlCenter>
      <GlassControlTile rows={2} className="justify-around">
        <GlassControlToggle icon={<WifiIcon />} label="Wi-Fi" status="Opaline_5G" defaultPressed />
        <GlassControlToggle icon={<BluetoothIcon />} label="Bluetooth" defaultPressed />
        <GlassControlToggle icon={<RadarIcon />} label="AirDrop" status="Contacts" />
      </GlassControlTile>

      <GlassControlTile rows={2} className="justify-between">
        <div className="size-12 rounded-xl bg-[conic-gradient(from_200deg,#ff6b9a,#ffb56b,#6bd2ff,#a36bff,#ff6b9a)] shadow-[0_6px_16px_-6px_rgb(0_0_0/0.4)]" />
        <div className="leading-tight">
          <div className="truncate text-[13px] font-semibold">Midnight City</div>
          <div className="truncate text-[11px] opacity-60">M83</div>
        </div>
        <div className="flex items-center justify-between px-1 [&_button]:cursor-pointer [&_button]:transition-transform [&_button]:active:scale-85 [&_svg]:size-5 [&_svg]:fill-current">
          <button type="button" aria-label="Previous"><SkipBackIcon /></button>
          <button type="button" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}>
            {playing ? <PauseIcon strokeWidth={0} /> : <PlayIcon strokeWidth={0} />}
          </button>
          <button type="button" aria-label="Next"><SkipForwardIcon /></button>
        </div>
      </GlassControlTile>

      <GlassControlTile>
        <GlassControlToggle icon={<MoonIcon />} label="Focus" status="Do Not Disturb" color="#5e5ce6" defaultPressed />
      </GlassControlTile>
      <GlassControlTile cols={1}>
        <GlassControlButton aria-label="Stage Manager" active={stage} onClick={() => setStage(!stage)}>
          <PanelsTopLeftIcon />
        </GlassControlButton>
      </GlassControlTile>
      <GlassControlTile cols={1}>
        <GlassControlButton aria-label="Screen Mirroring">
          <CastIcon />
        </GlassControlButton>
      </GlassControlTile>

      <GlassControlTile cols={4}>
        <GlassControlSlider label="Display" icon={<SunDimIcon />} endIcon={<SunIcon />} defaultValue={72} />
      </GlassControlTile>
      <GlassControlTile cols={4}>
        <GlassControlSlider label="Sound" icon={<Volume1Icon />} endIcon={<Volume2Icon />} defaultValue={45} />
      </GlassControlTile>

      <GlassControlTile cols={1}>
        <GlassControlButton aria-label="Timer">
          <TimerIcon />
        </GlassControlButton>
      </GlassControlTile>
      <GlassControlTile cols={3}>
        <GlassControlSlider label="Keyboard" icon={<KeyboardIcon />} defaultValue={30} />
      </GlassControlTile>
    </GlassControlCenter>
  )
}
