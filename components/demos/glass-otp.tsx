"use client"

import * as React from "react"

import { GlassOTP } from "@/registry/opaline/ui/glass-otp"

export default function GlassOTPDemo() {
  const [code, setCode] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle")

  return (
    <div className="flex flex-col items-center gap-4">
      <GlassOTP
        aria-label="Verification code"
        value={code}
        group={3}
        status={status}
        onValueChange={(v) => {
          setCode(v)
          setStatus("idle")
        }}
        onComplete={(v) => setStatus(v === "123456" ? "success" : "error")}
      />
      <p className="rounded-full bg-black/25 px-3 py-1 text-[13px] font-medium text-white backdrop-blur-sm">
        {status === "success" ? "Verified" : status === "error" ? "Wrong code, try again" : "Try 123456"}
      </p>
    </div>
  )
}
