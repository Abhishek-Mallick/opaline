"use client"

import * as React from "react"

import { Field } from "@/components/customize/controls"
import type { Control, Value } from "@/components/customize/types"
import { Wallpaper } from "@/components/site/wallpaper"
import { cn } from "@/lib/utils"
import {
  createDisplacementMap,
  createSpecularMap,
  DEFAULT_THICKNESS_RATIO,
  displacementProfile,
  refract,
  surfaces,
  surfaceSlope,
  type GlassSurface,
} from "@/registry/opaline/lib/glass-refraction"
import { LiquidGlass } from "@/registry/opaline/ui/liquid-glass"

const BLUE = "oklch(0.62 0.19 255)"
const ORANGE = "oklch(0.72 0.18 50)"
const GREEN = "oklch(0.7 0.17 150)"
const RED = "oklch(0.64 0.22 27)"
const deg = (r: number) => (r * 180) / Math.PI
const rad = (d: number) => (d * Math.PI) / 180
const SURFACES = ["squircle", "circle", "concave", "lip"] as const

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Figure({
  children,
  controls,
  caption,
  className,
}: {
  children: React.ReactNode
  controls?: React.ReactNode
  caption?: React.ReactNode
  className?: string
}) {
  return (
    <figure className="not-prose my-2 overflow-hidden rounded-[24px] border border-border bg-card">
      <div className={cn("relative flex items-center justify-center p-4 sm:p-6", className)}>{children}</div>
      {controls ? (
        <div className="grid grid-cols-1 gap-2 border-t border-border p-3 sm:grid-cols-2 lg:grid-cols-3">
          {controls}
        </div>
      ) : null}
      {caption ? (
        <figcaption className="border-t border-border px-4 py-3 text-[13px] leading-relaxed text-muted-foreground [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

/** Local state for a set of controls, rendered with the Customize panel's fields. */
function useControls<T extends Record<string, Value>>(controls: Control[]) {
  const [values, setValues] = React.useState(
    () => Object.fromEntries(controls.map((c) => [c.key, c.default])) as T
  )
  const fields = controls.map((c) => (
    <Field
      key={c.key}
      control={c}
      value={values[c.key]}
      onChange={(v) => setValues((s) => ({ ...s, [c.key]: v }))}
    />
  ))
  return [values, fields] as const
}

const surfaceControl: Control = {
  kind: "select",
  key: "surface",
  label: "Surface",
  default: "squircle",
  options: SURFACES,
}
const iorControl: Control = {
  kind: "number",
  key: "ior",
  label: "Refractive index n",
  default: 1.5,
  min: 1,
  max: 2.6,
  step: 0.01,
}
const thicknessControl: Control = {
  kind: "number",
  key: "thickness",
  label: "Thickness h / bezel",
  default: DEFAULT_THICKNESS_RATIO,
  min: 0.2,
  max: 3,
  step: 0.1,
  unit: "×",
}

function Readout({ items }: { items: [string, React.ReactNode][] }) {
  return (
    <dl className="absolute top-3 left-3 flex flex-col gap-0.5 rounded-xl bg-background/80 px-3 py-2 font-mono text-[11.5px] backdrop-blur-sm">
      {items.map(([k, v]) => (
        <div key={k} className="flex gap-2">
          <dt className="text-muted-foreground">{k}</dt>
          <dd className="tabular-nums">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Signed distance inside a rounded rect (positive inside) and the outward normal. */
function roundedRect(px: number, py: number, hw: number, hh: number, r: number) {
  const qx = Math.abs(px) - (hw - r)
  const qy = Math.abs(py) - (hh - r)
  if (qx > 0 && qy > 0) {
    const len = Math.hypot(qx, qy)
    return { dist: r - len, nx: (qx / len) * Math.sign(px), ny: (qy / len) * Math.sign(py) }
  }
  if (qx > qy) return { dist: r - qx, nx: Math.sign(px), ny: 0 }
  return { dist: r - qy, nx: 0, ny: Math.sign(py) }
}

/* ------------------------------------------------------------------ */
/* 1 · Snell's law                                                     */
/* ------------------------------------------------------------------ */

export function SnellFigure() {
  const [v, fields] = useControls<{ angle: number; n1: number; n2: number }>([
    { kind: "number", key: "angle", label: "Incidence θ₁", default: 40, min: 0, max: 89, unit: "°" },
    { kind: "number", key: "n1", label: "Medium above n₁", default: 1, min: 1, max: 2.5, step: 0.01 },
    { kind: "number", key: "n2", label: "Medium below n₂", default: 1.5, min: 1, max: 2.5, step: 0.01 },
  ])
  const t1 = rad(v.angle)
  const t2 = refract(t1, v.n1, v.n2)
  const critical = v.n1 > v.n2 ? deg(Math.asin(v.n2 / v.n1)) : null
  const O = { x: 240, y: 150 }
  const L = 130
  const inc = { x: O.x - L * Math.sin(t1), y: O.y - L * Math.cos(t1) }
  const refl = { x: O.x + L * Math.sin(t1), y: O.y - L * Math.cos(t1) }
  const out = t2 === null ? null : { x: O.x + L * Math.sin(t2), y: O.y + L * Math.cos(t2) }
  const arc = (from: number, to: number, r: number, down = false) => {
    const s = down ? 1 : -1
    const a = { x: O.x + r * Math.sin(from), y: O.y + s * r * Math.cos(from) }
    const b = { x: O.x + r * Math.sin(to), y: O.y + s * r * Math.cos(to) }
    return `M${a.x} ${a.y} A${r} ${r} 0 0 ${(to > from) !== down ? 0 : 1} ${b.x} ${b.y}`
  }

  return (
    <Figure
      controls={fields}
      caption={
        <>
          A ray crossing into a denser medium bends <em>towards</em> the normal. Going the other way,
          past the critical angle θ<sub>c</sub> = asin(n₂ / n₁), no light gets through: total internal
          reflection.
        </>
      }
    >
      <svg viewBox="0 0 480 300" className="w-full max-w-[520px]" role="img" aria-label="Snell's law diagram">
        <rect x="0" y="150" width="480" height="150" fill={BLUE} opacity={0.06 + (v.n2 - 1) * 0.12} />
        <rect x="0" y="0" width="480" height="150" fill={BLUE} opacity={(v.n1 - 1) * 0.12} />
        <line x1="0" x2="480" y1="150" y2="150" stroke="currentColor" strokeOpacity="0.35" />
        <line x1="240" x2="240" y1="10" y2="290" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="4 4" />
        <text x="12" y="24" className="fill-muted-foreground text-[12px]">n₁ = {v.n1.toFixed(2)}</text>
        <text x="12" y="176" className="fill-muted-foreground text-[12px]">n₂ = {v.n2.toFixed(2)}</text>

        <line x1={O.x} y1={O.y} x2={refl.x} y2={refl.y} stroke={RED} strokeWidth={t2 === null ? 3 : 1.5} strokeOpacity={t2 === null ? 1 : 0.25} />
        <line x1={inc.x} y1={inc.y} x2={O.x} y2={O.y} stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
        {out ? <line x1={O.x} y1={O.y} x2={out.x} y2={out.y} stroke={BLUE} strokeWidth="3" strokeLinecap="round" /> : null}

        {v.angle > 2 ? <path d={arc(0, -t1, 42)} fill="none" stroke={ORANGE} strokeWidth="1.5" /> : null}
        {t2 !== null && t2 > 0.03 ? <path d={arc(0, t2, 48, true)} fill="none" stroke={BLUE} strokeWidth="1.5" /> : null}
        <text x={O.x - 60} y={O.y - 50} className="text-[13px]" fill={ORANGE}>θ₁ {v.angle.toFixed(0)}°</text>
        <text x={O.x + 18} y={O.y + 72} className="text-[13px]" fill={t2 === null ? RED : BLUE}>
          {t2 === null ? "total internal reflection" : `θ₂ ${deg(t2).toFixed(1)}°`}
        </text>
        {critical !== null ? (
          <text x="468" y="24" textAnchor="end" className="fill-muted-foreground text-[12px]">
            θc = {critical.toFixed(1)}°
          </text>
        ) : null}
      </svg>
    </Figure>
  )
}

/* ------------------------------------------------------------------ */
/* 2 · Surface profiles                                                */
/* ------------------------------------------------------------------ */

const equations: Record<GlassSurface, string> = {
  squircle: "y = ⁴√(1 − (1 − t)⁴)",
  circle: "y = √(1 − (1 − t)²)",
  concave: "y = 1 − squircle(t)",
  lip: "y = mix(convex, concave, smootherstep(t))",
}

export function ProfilesFigure() {
  const [v, fields] = useControls<{ t: number }>([
    { kind: "number", key: "t", label: "Position t across the bezel", default: 0.3, min: 0, max: 1, step: 0.01 },
  ])
  const W = 200
  const H = 120
  const pad = 14
  const x = (t: number) => pad + t * (W - pad * 2)
  const y = (h: number) => H - pad - h * (H - pad * 2)

  return (
    <Figure
      controls={fields}
      caption="Each profile is a height y(t), with t = 0 at the outer edge and t = 1 where the flat top starts. The tangent's slope decides how steeply the surface meets an incoming ray."
    >
      <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
        {SURFACES.map((s) => {
          const f = surfaces[s]
          const pts = Array.from({ length: 81 }, (_, i) => i / 80)
          const t = Math.min(0.999, Math.max(0.001, v.t))
          const slope = surfaceSlope(s, t)
          // Tangent drawn in plot space.
          const k = (slope * (H - pad * 2)) / (W - pad * 2)
          const len = 34 / Math.hypot(1, k)
          return (
            <div key={s} className="flex flex-col gap-1.5 rounded-2xl border border-border bg-background/60 p-2">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`${s} profile`}>
                <path
                  d={`M${x(0)} ${y(0)} ${pts.map((p) => `L${x(p)} ${y(f(p))}`).join(" ")} L${x(1)} ${y(0)} Z`}
                  fill={BLUE}
                  fillOpacity="0.12"
                />
                <path d={pts.map((p, i) => `${i ? "L" : "M"}${x(p)} ${y(f(p))}`).join(" ")} fill="none" stroke={BLUE} strokeWidth="2" />
                <line
                  x1={x(t) - len}
                  y1={y(f(t)) + len * k}
                  x2={x(t) + len}
                  y2={y(f(t)) - len * k}
                  stroke={ORANGE}
                  strokeWidth="1.5"
                />
                <circle cx={x(t)} cy={y(f(t))} r="3.5" fill={ORANGE} />
              </svg>
              <div className="flex items-baseline justify-between gap-2 px-1 text-[12px]">
                <span className="font-medium capitalize">{s}</span>
                <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                  slope {Math.abs(slope) > 99 ? "∞" : slope.toFixed(2)}
                </span>
              </div>
              <div className="px-1 font-mono text-[10.5px] text-muted-foreground">{equations[s]}</div>
            </div>
          )
        })}
      </div>
    </Figure>
  )
}

/* ------------------------------------------------------------------ */
/* 3 · Ray tracing through the bezel                                   */
/* ------------------------------------------------------------------ */

export function RayFigure() {
  const [v, fields] = useControls<{ surface: GlassSurface; ior: number; thickness: number }>([
    surfaceControl,
    iorControl,
    thicknessControl,
  ])
  const B = 100
  const flat = 160
  const T = B * v.thickness
  const W = B * 2 + flat
  const margin = 20
  const floor = T + 40
  const f = surfaces[v.surface]
  const { values, max } = displacementProfile({ surface: v.surface, ior: v.ior, thickness: T, bezel: B })

  // Height of the glass at any x across the cross-section.
  const heightAt = (x: number) => {
    const d = Math.min(x, W - x)
    return d >= B ? T * f(1) : T * f(Math.max(0, d / B))
  }
  const outline = Array.from({ length: 121 }, (_, i) => (i / 120) * W)
    .map((x) => `L${margin + x} ${floor - heightAt(x)}`)
    .join(" ")

  const rays = Array.from({ length: 13 }, (_, i) => (i + 0.5) * (B / 13))
  const trace = (d: number, mirror: boolean) => {
    const t = d / B
    const i = Math.round(t * (values.length - 1))
    const shift = values[i]
    const x0 = mirror ? W - d : d
    const top = floor - T * f(t)
    const x1 = x0 + (mirror ? -shift : shift)
    return { x0: margin + x0, top, x1: margin + x1, shift }
  }

  const plotH = 90
  const plot = Array.from(values)
    .map((d, i) => `${i ? "L" : "M"}${margin + (i / (values.length - 1)) * B} ${floor + 40 + plotH / 2 - (max ? (d / max) * (plotH / 2 - 6) : 0)}`)
    .join(" ")

  return (
    <Figure
      controls={fields}
      caption={
        <>
          Vertical rays hit the rim, refract by Snell&apos;s law and land on the backdrop shifted by
          Δ = h · tan(θ₁ − θ₂). The curve below is that shift across the bezel, divided by its largest
          value Δ<sub>max</sub>. Raise n or the thickness and the light bends further.
        </>
      }
    >
      <Readout
        items={[
          ["Δmax", `${max.toFixed(1)} px`],
          ["scale = 2Δmax", `${(max * 2).toFixed(1)}`],
        ]}
      />
      <svg
        viewBox={`0 0 ${W + margin * 2} ${floor + 50 + plotH}`}
        className="max-h-[520px] w-full max-w-[560px]"
        role="img"
        aria-label="Cross-section of the glass with refracted rays"
      >
        <path d={`M${margin} ${floor} ${outline} L${margin + W} ${floor} Z`} fill={BLUE} fillOpacity="0.14" stroke={BLUE} strokeWidth="1.5" />
        <line x1="0" x2={W + margin * 2} y1={floor} y2={floor} stroke="currentColor" strokeOpacity="0.4" />
        {rays.flatMap((d) =>
          [false, true].map((mirror) => {
            const r = trace(d, mirror)
            return (
              <g key={`${d}${mirror}`}>
                <line x1={r.x0} x2={r.x0} y1="4" y2={r.top} stroke={ORANGE} strokeOpacity="0.55" strokeWidth="1.2" />
                <line x1={r.x0} x2={r.x1} y1={r.top} y2={floor} stroke={ORANGE} strokeWidth="1.2" />
                <circle cx={r.x1} cy={floor} r="2" fill={ORANGE} />
              </g>
            )
          })
        )}
        {[B + flat / 3, B + (flat * 2) / 3].map((x) => (
          <line key={x} x1={margin + x} x2={margin + x} y1="4" y2={floor} stroke={ORANGE} strokeOpacity="0.4" strokeWidth="1.2" />
        ))}

        <g>
          <line x1={margin} x2={margin + B} y1={floor + 40 + plotH / 2} y2={floor + 40 + plotH / 2} stroke="currentColor" strokeOpacity="0.25" />
          <path d={plot} fill="none" stroke={GREEN} strokeWidth="2" />
          <text x={margin + B + 10} y={floor + 40 + plotH / 2 + 4} className="fill-muted-foreground text-[11px]">
            Δ(t) / Δmax — edge → flat top
          </text>
        </g>
      </svg>
    </Figure>
  )
}

/* ------------------------------------------------------------------ */
/* 4 · Displacement vector field                                       */
/* ------------------------------------------------------------------ */

export function VectorFieldFigure() {
  const [v, fields] = useControls<{ surface: GlassSurface; bezel: number; radius: number }>([
    surfaceControl,
    { kind: "number", key: "bezel", label: "Bezel", default: 44, min: 8, max: 90, unit: "px" },
    { kind: "number", key: "radius", label: "Corner radius", default: 70, min: 0, max: 100, unit: "px" },
  ])
  const W = 360
  const H = 220
  const step = 14
  const { values, max } = displacementProfile({ surface: v.surface, bezel: v.bezel })
  const arrows: React.ReactNode[] = []
  for (let y = step / 2; y < H; y += step) {
    for (let x = step / 2; x < W; x += step) {
      const { dist, nx, ny } = roundedRect(x - W / 2, y - H / 2, W / 2, H / 2, Math.min(v.radius, H / 2))
      if (dist <= 0 || dist >= v.bezel || !max) continue
      const t = dist / v.bezel
      const m = values[Math.round(t * (values.length - 1))] / max
      if (Math.abs(m) < 0.03) continue
      const len = m * (step * 1.15)
      const dx = -nx * len
      const dy = -ny * len
      arrows.push(
        <line
          key={`${x}:${y}`}
          x1={x - dx / 2}
          y1={y - dy / 2}
          x2={x + dx / 2}
          y2={y + dy / 2}
          stroke={m > 0 ? BLUE : ORANGE}
          strokeOpacity={0.35 + Math.abs(m) * 0.65}
          strokeWidth="1.6"
          markerEnd={`url(#arrow-${m > 0 ? "in" : "out"})`}
        />
      )
    }
  }

  return (
    <Figure
      controls={fields}
      caption="Walking the shape pixel by pixel: the distance to the nearest edge gives t, the edge's normal gives the direction. Blue arrows pull the backdrop inwards (convex); orange ones push it out (concave)."
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[520px]" role="img" aria-label="Displacement vector field">
        <defs>
          {(["in", "out"] as const).map((k) => (
            <marker key={k} id={`arrow-${k}`} viewBox="0 0 6 6" refX="5" refY="3" markerWidth="3" markerHeight="3" orient="auto">
              <path d="M0 0L6 3L0 6Z" fill={k === "in" ? BLUE : ORANGE} />
            </marker>
          ))}
        </defs>
        <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx={Math.min(v.radius, H / 2)} fill="none" stroke="currentColor" strokeOpacity="0.3" />
        {arrows}
      </svg>
    </Figure>
  )
}

/* ------------------------------------------------------------------ */
/* 5 · Encoding vectors as colour                                      */
/* ------------------------------------------------------------------ */

export function EncodingFigure() {
  const [vec, setVec] = React.useState({ x: 0.6, y: -0.35 })
  const pad = React.useRef<SVGSVGElement>(null)
  const move = (e: React.PointerEvent) => {
    const r = pad.current!.getBoundingClientRect()
    let x = ((e.clientX - r.left) / r.width) * 2 - 1
    let y = ((e.clientY - r.top) / r.height) * 2 - 1
    const len = Math.hypot(x, y)
    if (len > 1) {
      x /= len
      y /= len
    }
    setVec({ x, y })
  }
  const R = Math.round(128 + vec.x * 127)
  const G = Math.round(128 + vec.y * 127)

  return (
    <Figure caption="Drag the vector. Each component in −1 … 1 is packed into a colour channel: R carries x, G carries y, and 128 means “don't move”. That's why an idle map is a flat grey-violet.">
      <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row">
        <svg
          ref={pad}
          viewBox="-110 -110 220 220"
          className="size-[220px] cursor-crosshair touch-none select-none"
          onPointerDown={(e) => {
            ;(e.target as Element).setPointerCapture(e.pointerId)
            move(e)
          }}
          onPointerMove={(e) => e.buttons && move(e)}
          role="img"
          aria-label="Vector pad"
        >
          <circle r="100" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.25" />
          <line x1="-100" x2="100" y1="0" y2="0" stroke="currentColor" strokeOpacity="0.15" />
          <line y1="-100" y2="100" x1="0" x2="0" stroke="currentColor" strokeOpacity="0.15" />
          <line x1="0" y1="0" x2={vec.x * 100} y2={vec.y * 100} stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
          <circle cx={vec.x * 100} cy={vec.y * 100} r="8" fill={BLUE} stroke="white" strokeWidth="2" />
        </svg>
        <div className="flex flex-col gap-3 font-mono text-[13px]">
          <div className="flex items-center gap-3">
            <span className="size-16 rounded-2xl border border-border" style={{ background: `rgb(${R} ${G} 128)` }} />
            <div className="flex flex-col gap-0.5 tabular-nums">
              <span>
                x {vec.x.toFixed(2)} → <span style={{ color: RED }}>R {R}</span>
              </span>
              <span>
                y {vec.y.toFixed(2)} → <span style={{ color: GREEN }}>G {G}</span>
              </span>
              <span className="text-muted-foreground">B 128 (unused)</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span className="h-3 w-16 rounded" style={{ background: `rgb(${R} 0 0)` }} />
            <span className="h-3 w-16 rounded" style={{ background: `rgb(0 ${G} 0)` }} />
          </div>
        </div>
      </div>
    </Figure>
  )
}

/* ------------------------------------------------------------------ */
/* 6 · The real map, and what `scale` does                             */
/* ------------------------------------------------------------------ */

export function MapFigure() {
  const [v, fields] = useControls<{ surface: GlassSurface; ior: number; thickness: number; bezel: number }>([
    surfaceControl,
    iorControl,
    thicknessControl,
    { kind: "number", key: "bezel", label: "Bezel", default: 40, min: 8, max: 90, unit: "px" },
  ])
  const W = 320
  const H = 200
  const radius = 60
  const [map, setMap] = React.useState<{ url: string; scale: number } | null>(null)
  React.useEffect(() => {
    setMap(
      createDisplacementMap({
        width: W,
        height: H,
        radius,
        bezel: v.bezel,
        surface: v.surface,
        ior: v.ior,
        thickness: v.bezel * v.thickness,
      })
    )
  }, [v.bezel, v.surface, v.ior, v.thickness])

  // Read back the pixel under the pointer.
  const canvas = React.useRef<HTMLCanvasElement | null>(null)
  const [probe, setProbe] = React.useState<{ x: number; y: number; r: number; g: number } | null>(null)
  React.useEffect(() => {
    if (!map?.url) return
    const img = new Image()
    img.onload = () => {
      const c = document.createElement("canvas")
      c.width = W
      c.height = H
      c.getContext("2d")!.drawImage(img, 0, 0, W, H)
      canvas.current = c
    }
    img.src = map.url
  }, [map])

  return (
    <Figure
      controls={fields}
      caption={
        <>
          The generated map for a {W}×{H} rounded rectangle. Hover it to decode a pixel. The map only stores
          directions scaled to −1 … 1; <code>feDisplacementMap</code> turns them back into pixels with{" "}
          <code>scale</code> = 2Δ<sub>max</sub>, so each pixel moves by exactly its Δ.
        </>
      }
    >
      <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div
          className="relative overflow-hidden rounded-[28px] border border-border"
          style={{ width: W, maxWidth: "100%", aspectRatio: `${W} / ${H}` }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            const x = Math.floor(((e.clientX - r.left) / r.width) * W)
            const y = Math.floor(((e.clientY - r.top) / r.height) * H)
            const d = canvas.current?.getContext("2d")?.getImageData(x, y, 1, 1).data
            if (d) setProbe({ x, y, r: d[0], g: d[1] })
          }}
          onPointerLeave={() => setProbe(null)}
        >
          {map?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={map.url} alt="Displacement map" className="size-full" />
          ) : null}
        </div>
        <dl className="grid min-w-[190px] grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-[12px] tabular-nums">
          <dt className="text-muted-foreground">scale</dt>
          <dd>{map ? map.scale.toFixed(2) : "…"}</dd>
          {probe ? (
            <>
              <dt className="text-muted-foreground">pixel</dt>
              <dd>
                {probe.x}, {probe.y}
              </dd>
              <dt className="text-muted-foreground">R G</dt>
              <dd>
                {probe.r} {probe.g}
              </dd>
              <dt className="text-muted-foreground">vector</dt>
              <dd>
                {((probe.r - 128) / 127).toFixed(2)}, {((probe.g - 128) / 127).toFixed(2)}
              </dd>
              <dt className="text-muted-foreground">shift</dt>
              <dd>
                {((probe.r / 255 - 0.5) * (map?.scale ?? 0)).toFixed(1)},{" "}
                {((probe.g / 255 - 0.5) * (map?.scale ?? 0)).toFixed(1)} px
              </dd>
            </>
          ) : (
            <dd className="col-span-2 text-muted-foreground">Hover the map</dd>
          )}
        </dl>
      </div>
    </Figure>
  )
}

/* ------------------------------------------------------------------ */
/* 7 · Specular rim                                                    */
/* ------------------------------------------------------------------ */

export function SpecularFigure() {
  const [v, fields] = useControls<{ surface: GlassSurface; angle: number; specular: number }>([
    surfaceControl,
    { kind: "number", key: "angle", label: "Light angle", default: -60, min: -180, max: 180, unit: "°" },
    { kind: "number", key: "specular", label: "Strength", default: 0.8, min: 0, max: 1, step: 0.01 },
  ])
  const W = 260
  const H = 170
  const [url, setUrl] = React.useState("")
  React.useEffect(() => {
    setUrl(createSpecularMap({ width: W, height: H, radius: 56, bezel: 34, surface: v.surface, angle: v.angle }))
  }, [v.surface, v.angle])
  const lx = Math.cos(rad(v.angle))
  const ly = Math.sin(rad(v.angle))

  return (
    <Figure
      controls={fields}
      caption="Brightness follows how squarely the tilted rim faces the light: |n · L|³, weighted by the slope. Both the lit edge and the opposite one glint, like a real bevel."
      className="flex-col gap-4 sm:flex-row"
    >
      <div className="relative grid place-items-center rounded-[24px] bg-[#0b0b10] p-5">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="Specular map" width={W} height={H} style={{ opacity: v.specular }} />
        ) : null}
        <span
          className="absolute size-2.5 rounded-full bg-yellow-300 shadow-[0_0_12px_4px_rgb(253_224_71/0.6)]"
          style={{ left: `calc(50% + ${lx * 46}% - 5px)`, top: `calc(50% + ${ly * 46}% - 5px)` }}
        />
      </div>
      <div className="relative isolate grid h-[210px] w-[300px] place-items-center overflow-hidden rounded-[24px]">
        <Wallpaper name="sunset" className="-z-10" />
        <LiquidGlass
          surface={v.surface}
          lightAngle={v.angle}
          specular={v.specular}
          className="h-[140px] w-[220px] rounded-[48px]"
        />
      </div>
    </Figure>
  )
}

/* ------------------------------------------------------------------ */
/* 8 · Playground                                                      */
/* ------------------------------------------------------------------ */

export function PlaygroundFigure() {
  const [v, fields] = useControls<{
    surface: GlassSurface
    ior: number
    thickness: number
    bezel: number
    dispersion: number
    specular: number
  }>([
    surfaceControl,
    iorControl,
    thicknessControl,
    { kind: "number", key: "bezel", label: "Bezel", default: 36, min: 6, max: 80, unit: "px" },
    { kind: "number", key: "dispersion", label: "Dispersion", default: 0.12, min: 0, max: 0.6, step: 0.01 },
    { kind: "number", key: "specular", label: "Specular", default: 0.3, min: 0, max: 1, step: 0.01 },
  ])
  const stage = React.useRef<HTMLDivElement>(null)
  const [pos, setPos] = React.useState({ x: 0.5, y: 0.5 })
  const drag = (e: React.PointerEvent) => {
    const r = stage.current!.getBoundingClientRect()
    setPos({
      x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
      y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
    })
  }

  return (
    <Figure
      controls={fields}
      caption="Everything above, running live. Drag the glass across the wallpaper."
      className="p-0 sm:p-0"
    >
      <div
        ref={stage}
        className="relative isolate h-[380px] w-full cursor-grab touch-none overflow-hidden select-none active:cursor-grabbing"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          drag(e)
        }}
        onPointerMove={(e) => e.buttons && drag(e)}
      >
        <Wallpaper name="stripes" className="-z-10" />
        <div
          className="pointer-events-none absolute grid place-items-center text-center text-[34px] leading-none font-black tracking-[-0.04em] text-white/90"
          style={{ inset: 0 }}
          aria-hidden
        >
          n = {v.ior.toFixed(2)}
        </div>
        <LiquidGlass
          surface={v.surface}
          ior={v.ior}
          thickness={v.thickness}
          bezel={v.bezel}
          dispersion={v.dispersion}
          specular={v.specular}
          className="absolute h-[180px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-[60px]"
          style={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%` }}
        />
      </div>
    </Figure>
  )
}
