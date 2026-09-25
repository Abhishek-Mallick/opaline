"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  preloadDisplacementMap,
  supportsLiquidGlass,
} from "@/registry/opaline/lib/glass-refraction"

type GlyphMaps = {
  mask: string
  map: string
  light: string
  width: number
  height: number
}

/**
 * Rasterises the text with the element's own font, then derives from the
 * glyph shapes: an alpha mask, a bevel displacement map and a lighting pass.
 */
function buildGlyphMaps(
  el: HTMLElement,
  text: string,
  baseline: number,
  bevel: number
): GlyphMaps | null {
  const width = el.offsetWidth
  const height = el.offsetHeight
  if (!width || !height) return null

  const style = getComputedStyle(el)
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = Math.ceil(width * dpr)
  const h = Math.ceil(height * dpr)

  const glyphs = document.createElement("canvas")
  glyphs.width = w
  glyphs.height = h
  const g = glyphs.getContext("2d", { willReadFrequently: true })
  if (!g) return null
  g.scale(dpr, dpr)
  g.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  const spacing = parseFloat(style.letterSpacing)
  if (!Number.isNaN(spacing) && "letterSpacing" in g) {
    ;(g as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${spacing}px`
  }
  g.textBaseline = "alphabetic"
  g.fillStyle = "#fff"
  g.fillText(text, 0, baseline)
  const alpha = g.getImageData(0, 0, w, h).data

  // Height field: the glyphs blurred by the bevel width.
  const soft = document.createElement("canvas")
  soft.width = w
  soft.height = h
  const s = soft.getContext("2d", { willReadFrequently: true })
  if (!s) return null
  s.filter = `blur(${bevel * dpr * 0.5}px)`
  s.drawImage(glyphs, 0, 0)
  const field = s.getImageData(0, 0, w, h).data

  const mapData = new ImageData(w, h)
  const lightData = new ImageData(w, h)
  const hAt = (x: number, y: number) => {
    const cx = Math.min(w - 1, Math.max(0, x))
    const cy = Math.min(h - 1, Math.max(0, y))
    const v = field[(cy * w + cx) * 4 + 3] / 255
    return v * v * (3 - 2 * v) // smoothstep — rounder shoulders
  }
  const lx = -0.62
  const ly = -0.78

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      const a = alpha[i + 3] / 255
      let dx = 0
      let dy = 0
      if (a > 0) {
        const gx = (hAt(x + 1, y) - hAt(x - 1, y)) * bevel
        const gy = (hAt(x, y + 1) - hAt(x, y - 1)) * bevel
        dx = Math.max(-1, Math.min(1, -gx))
        dy = Math.max(-1, Math.min(1, -gy))
        const slope = Math.min(1, Math.hypot(gx, gy))
        const facing = slope > 0 ? (-gx * lx + -gy * ly) / Math.hypot(gx, gy) : 0
        if (facing > 0) {
          lightData.data[i] = lightData.data[i + 1] = lightData.data[i + 2] = 255
          lightData.data[i + 3] = 255 * a * Math.min(1, slope * (0.25 + 0.95 * facing))
        } else {
          lightData.data[i + 3] = 255 * a * slope * -facing * 0.28
        }
      }
      mapData.data[i] = 128 + dx * 127
      mapData.data[i + 1] = 128 + dy * 127
      mapData.data[i + 2] = 128
      mapData.data[i + 3] = 255
    }
  }

  const toUrl = (data: ImageData) => {
    const c = document.createElement("canvas")
    c.width = w
    c.height = h
    c.getContext("2d")!.putImageData(data, 0, 0)
    return c.toDataURL()
  }

  return {
    mask: glyphs.toDataURL(),
    map: toUrl(mapData),
    light: toUrl(lightData),
    width,
    height,
  }
}

/**
 * Display text made of liquid glass: every glyph is a bevelled lens that
 * refracts whatever sits behind it, with rim lighting and a travelling sheen.
 * Best for single-line headlines over imagery.
 */
function GlassText({
  children,
  className,
  bevel = 10,
  refraction = 28,
  dispersion = 0.25,
  shine = true,
  tint = "oklch(1 0 0 / 0.1)",
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  children: string
  /** Width of the rounded glyph edge in px. */
  bevel?: number
  /** How strongly the glyphs bend the backdrop, in px. */
  refraction?: number
  /** Chromatic dispersion at the glyph edges (0 – 1). */
  dispersion?: number
  /** Animate a specular sweep across the letters. */
  shine?: boolean
  /** Colour filling the glyphs. */
  tint?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const marker = React.useRef<HTMLSpanElement>(null)
  const id = "gt" + React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const [maps, setMaps] = React.useState<GlyphMaps | null>(null)
  const [refracts, setRefracts] = React.useState(false)

  React.useLayoutEffect(() => setRefracts(supportsLiquidGlass()), [])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let cancelled = false
    const build = () => {
      const baseline = marker.current?.offsetTop ?? el.offsetHeight * 0.8
      const next = buildGlyphMaps(el, children, baseline, bevel)
      if (!next) return
      preloadDisplacementMap(next.map).then(() => !cancelled && setMaps(next))
    }
    document.fonts?.ready.then(() => !cancelled && build())
    const ro = new ResizeObserver(() => build())
    ro.observe(el)
    return () => {
      cancelled = true
      ro.disconnect()
    }
  }, [children, bevel])

  const masked: React.CSSProperties | undefined = maps
    ? {
        maskImage: `url(${maps.mask})`,
        WebkitMaskImage: `url(${maps.mask})`,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
      }
    : undefined
  const backdrop =
    maps && refracts ? `url(#${id})` : "blur(6px) saturate(1.8) brightness(1.08)"

  return (
    <span
      ref={ref}
      data-slot="glass-text"
      className={cn("relative inline-block whitespace-nowrap", className)}
      {...props}
    >
      {/* Real text: keeps layout, selection and accessibility. */}
      <span className={cn("transition-colors duration-300", maps ? "text-transparent" : "opacity-30")}>
        {children}
      </span>
      <span ref={marker} aria-hidden className="inline-block h-0 w-0 align-baseline" />
      {maps ? (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ ...masked, backdropFilter: backdrop, WebkitBackdropFilter: backdrop, background: tint }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: `url(${maps.light})`, backgroundSize: "100% 100%" }}
          />
          {shine ? (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 animate-[opaline-sheen_4.5s_ease-in-out_infinite] bg-[linear-gradient(115deg,transparent_38%,oklch(1_0_0/0.55)_50%,transparent_62%)] bg-[length:250%_100%] mix-blend-overlay motion-reduce:hidden"
              style={masked}
            />
          ) : null}
          {refracts ? (
            <svg aria-hidden width="0" height="0" className="absolute size-0">
              <filter
                id={id}
                x="0"
                y="0"
                width={maps.width}
                height={maps.height}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feImage
                  href={maps.map}
                  x="0"
                  y="0"
                  width={maps.width}
                  height={maps.height}
                  preserveAspectRatio="none"
                  result="map"
                />
                {[
                  [1, "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0", "r"],
                  [1 - dispersion, "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0", "g"],
                  [1 - dispersion * 2, "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0", "b"],
                ].map(([k, matrix, channel]) => (
                  <React.Fragment key={channel as string}>
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="map"
                      scale={refraction * (k as number)}
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result={`d${channel}`}
                    />
                    <feColorMatrix
                      in={`d${channel}`}
                      type="matrix"
                      values={matrix as string}
                      result={channel as string}
                    />
                  </React.Fragment>
                ))}
                <feBlend in="r" in2="g" mode="screen" result="rg" />
                <feBlend in="rg" in2="b" mode="screen" result="rgb" />
                <feColorMatrix in="rgb" type="saturate" values="1.5" />
              </filter>
            </svg>
          ) : null}
        </>
      ) : null}
    </span>
  )
}

export { GlassText }
