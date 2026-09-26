"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"

import type { Control, Value } from "@/components/customize/types"
import { cn } from "@/lib/utils"

const round = (v: number, step = 1) => {
  const digits = Math.max(0, -Math.floor(Math.log10(step)))
  return v.toFixed(Math.min(digits, 3))
}

export function Field({
  control,
  value,
  onChange,
}: {
  control: Control
  value: Value
  onChange: (value: Value) => void
}) {
  const id = React.useId()
  const readout =
    control.kind === "number"
      ? value === null
        ? control.auto
        : `${round(Number(value), control.step)}${control.unit ?? ""}`
      : null

  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-2xl border border-border bg-background/60 px-3.5 py-3">
      <div className="flex items-center justify-between gap-2 text-[12.5px]">
        <label htmlFor={id} className="truncate font-medium text-foreground">
          {control.label}
        </label>
        {readout ? (
          <span className="flex items-center gap-1 font-mono text-[11.5px] text-muted-foreground tabular-nums">
            {readout}
            {control.kind === "number" && control.auto && value !== null ? (
              <ClearButton label={`Reset ${control.label} to ${control.auto}`} onClick={() => onChange(null)} />
            ) : null}
          </span>
        ) : null}
      </div>
      <Input id={id} control={control} value={value} onChange={onChange} />
    </div>
  )
}

function ClearButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid size-4 cursor-pointer place-items-center rounded-full text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
    >
      <HugeiconsIcon icon={Cancel01Icon} className="size-3" />
    </button>
  )
}

function Input({
  id,
  control: c,
  value,
  onChange,
}: {
  id: string
  control: Control
  value: Value
  onChange: (value: Value) => void
}) {
  switch (c.kind) {
    case "number": {
      const v = value === null ? (c.default ?? (c.min + c.max) / 2) : Number(value)
      const pct = ((v - c.min) / (c.max - c.min)) * 100
      return (
        <input
          id={id}
          type="range"
          min={c.min}
          max={c.max}
          step={c.step ?? 1}
          value={v}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn("customize-range", value === null && "opacity-50")}
          style={{ "--fill": `${pct}%` } as React.CSSProperties}
        />
      )
    }
    case "select":
      return (
        <div className="relative">
          <select
            id={id}
            value={String(value)}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-full cursor-pointer appearance-none rounded-lg border border-border bg-background pr-8 pl-2.5 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            {c.options.map((o) => {
              const opt = typeof o === "string" ? { value: o, label: o } : o
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              )
            })}
          </select>
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      )
    case "boolean":
      return (
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={Boolean(value)}
          onClick={() => onChange(!value)}
          className="flex h-8 cursor-pointer items-center justify-between rounded-lg border border-border bg-background px-2.5 text-[13px] text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          {value ? "On" : "Off"}
          <span
            className={cn(
              "relative h-[18px] w-8 rounded-full transition-colors",
              value ? "bg-[oklch(0.72_0.19_148)]" : "bg-foreground/15"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 size-3.5 rounded-full bg-white shadow transition-transform duration-200",
                value && "translate-x-3.5"
              )}
            />
          </span>
        </button>
      )
    case "color":
      return <ColorInput id={id} control={c} value={value as string | null} onChange={onChange} />
    case "text":
      return (
        <input
          id={id}
          type="text"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-full rounded-lg border border-border bg-background px-2.5 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      )
  }
}

function ColorInput({
  id,
  control,
  value,
  onChange,
}: {
  id: string
  control: Extract<Control, { kind: "color" }>
  value: string | null
  onChange: (value: Value) => void
}) {
  const [draft, setDraft] = React.useState(value ?? "")
  React.useEffect(() => setDraft(value ?? ""), [value])
  const hex = value && /^#[0-9a-f]{6}$/i.test(value) ? value : "#ffffff"

  return (
    <div className="flex h-8 items-center gap-2 rounded-lg border border-border bg-background pr-1.5 pl-1 focus-within:ring-2 focus-within:ring-ring/40">
      <label
        className="relative size-6 shrink-0 cursor-pointer overflow-hidden rounded-md border border-border"
        style={{
          background: value ?? "repeating-conic-gradient(var(--muted) 0 25%, transparent 0 50%) 0 0 / 8px 8px",
        }}
      >
        <input
          type="color"
          aria-label={`${control.label} picker`}
          value={hex}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 size-full cursor-pointer opacity-0"
        />
      </label>
      <input
        id={id}
        type="text"
        spellCheck={false}
        value={draft}
        placeholder={control.auto ?? ""}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          const v = draft.trim()
          if (!v && control.auto) onChange(null)
          else if (v && CSS.supports("color", v)) onChange(v)
          else setDraft(value ?? "")
        }}
        onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
        className="h-full min-w-0 flex-1 bg-transparent font-mono text-[12px] outline-none placeholder:text-muted-foreground"
      />
      {control.auto && value !== null ? (
        <ClearButton label={`Reset ${control.label} to ${control.auto}`} onClick={() => onChange(null)} />
      ) : null}
    </div>
  )
}
