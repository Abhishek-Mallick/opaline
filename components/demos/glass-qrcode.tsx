"use client"

import { GlassQRCode } from "@/registry/opaline/ui/opaline/glass-qrcode"

export default function GlassQRCodeDemo() {
  return (
    <GlassQRCode
      value="https://opaline.buildlab.in"
      size={200}
      label="opaline.buildlab.in"
      lens
      logo={
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/icon.svg" alt="" />
      }
    />
  )
}
