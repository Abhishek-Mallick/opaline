"use client"

import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import {
  createDisplacementMap,
  preloadDisplacementMap,
  supportsLiquidGlass,
} from "@/registry/opaline/lib/glass-refraction"

type LiquidGlassProps = React.ComponentProps<"div"> & {
  /** Refraction strength in px. Defaults to a value derived from the bezel. */
  refraction?: number
  /** Width of the refracting rim in px. Defaults to ~40% of the shortest side. */
  bezel?: number
  /** Backdrop blur in px. Liquid glass bends light rather than blurring it — keep this small. */
  blur?: number
  /** Backdrop saturation multiplier. */
  saturation?: number
  /** Chromatic dispersion at the rim (0 – 1). */
  dispersion?: number
  /** Overrides the surface tint colour (defaults to `--glass-tint`). */
  tint?: string
  /** `clear` is fully transparent; `frosted` adds a light tint and a touch of blur for legible text. */
  variant?: "clear" | "frosted"
  /** Draw the soft outer shadow. */
  shadow?: boolean
  /** Render the glass onto its only child element instead of a div. */
  asChild?: boolean
}

type MapEntry = { url: string; key: number }

function useSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = React.useState({ width: 0, height: 0, radius: 0 })

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const width = el.offsetWidth
      const height = el.offsetHeight
      const radius = Math.min(
        parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0,
        width / 2,
        height / 2
      )
      setSize((s) =>
        s.width === width && s.height === height && s.radius === radius
          ? s
          : { width, height, radius }
      )
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])

  return size
}

function GlassFilter({
  id,
  map,
  width,
  height,
  blur,
  scale,
  dispersion,
  saturation,
}: {
  id: string
  map: string
  width: number
  height: number
  blur: number
  scale: number
  dispersion: number
  saturation: number
}) {
  const displace = (k: number, result: string) => (
    <feDisplacementMap
      in="blur"
      in2="map"
      scale={scale * k}
      xChannelSelector="R"
      yChannelSelector="G"
      result={result}
    />
  )

  return (
    <filter
      id={id}
      x="0"
      y="0"
      width={width}
      height={height}
      filterUnits="userSpaceOnUse"
      colorInterpolationFilters="sRGB"
    >
      <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
      <feImage
        href={map}
        x="0"
        y="0"
        width={width}
        height={height}
        preserveAspectRatio="none"
        result="map"
      />
      {dispersion > 0 ? (
        <>
          {displace(1, "dr")}
          <feColorMatrix
            in="dr"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="r"
          />
          {displace(1 - dispersion, "dg")}
          <feColorMatrix
            in="dg"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="g"
          />
          {displace(1 - dispersion * 2, "db")}
          <feColorMatrix
            in="db"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="b"
          />
          <feBlend in="r" in2="g" mode="screen" result="rg" />
          <feBlend in="rg" in2="b" mode="screen" result="refracted" />
        </>
      ) : (
        displace(1, "refracted")
      )}
      <feColorMatrix
        in="refracted"
        type="saturate"
        values={String(saturation)}
      />
    </filter>
  )
}

function LiquidGlass({
  ref,
  className,
  style,
  children,
  refraction,
  bezel,
  blur,
  saturation = 1.6,
  dispersion = 0.12,
  tint,
  variant = "clear",
  shadow = true,
  asChild = false,
  ...props
}: LiquidGlassProps) {
  const Comp = asChild ? Slot.Root : "div"
  const innerRef = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement)

  const id = "lg" + React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const [enabled, setEnabled] = React.useState(false)
  React.useLayoutEffect(() => setEnabled(supportsLiquidGlass()), [])

  const { width, height, radius } = useSize(innerRef)
  const rim = bezel ?? Math.max(6, Math.min(Math.min(width, height) * 0.4, 40))
  const scale = refraction ?? rim * 1.6
  const blurPx = blur ?? (variant === "frosted" ? 2 : 0.5)

  // The first map is built synchronously before the first paint, so the
  // surface is refracting from its very first frame. Later maps (on resize)
  // are debounced and double-buffered: the new map is mounted in its own
  // filter and only becomes active once decoded, while the current one is
  // stretched to the new size — the glass never flashes empty.
  const [current, setCurrent] = React.useState<MapEntry | null>(null)
  const [next, setNext] = React.useState<MapEntry | null>(null)
  const counter = React.useRef(0)
  const currentUrl = React.useRef("")
  const hasMap = current !== null

  React.useLayoutEffect(() => {
    if (hasMap || !enabled || width === 0 || height === 0) return
    const url = createDisplacementMap({ width, height, radius, bezel: rim })
    if (!url) return
    currentUrl.current = url
    setCurrent({ url, key: ++counter.current })
    void preloadDisplacementMap(url)
  }, [enabled, width, height, radius, rim, hasMap])

  React.useEffect(() => {
    if (!hasMap || !enabled || width === 0 || height === 0) return
    let cancelled = false
    const timer = setTimeout(() => {
      const url = createDisplacementMap({ width, height, radius, bezel: rim })
      if (!url || url === currentUrl.current) return
      const entry = { url, key: ++counter.current }
      setNext(entry)
      preloadDisplacementMap(url).then(() => {
        if (cancelled) return
        currentUrl.current = url
        setCurrent(entry)
        setNext(null)
      })
    }, 140)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [enabled, width, height, radius, rim, hasMap])

  const filterId = (entry: MapEntry) => `${id}-${entry.key}`
  const backdrop = current
    ? `url(#${filterId(current)})`
    : // Safari / Firefox can't refract the backdrop; a light, saturated
      // frost is the closest match.
      `blur(${blur ?? (variant === "frosted" ? 10 : 5)}px) saturate(${saturation + 0.2}) brightness(1.04)`
  const filters = [current, next].filter((e): e is MapEntry => e !== null)

  return (
    <Comp
      ref={innerRef}
      data-slot="liquid-glass"
      data-refracting={current ? "" : undefined}
      className={cn("relative isolate", className)}
      style={style}
      {...props}
    >
      <span
        aria-hidden
        data-slot="liquid-glass-backdrop"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
        style={{ backdropFilter: backdrop, WebkitBackdropFilter: backdrop }}
      />
      <span
        aria-hidden
        data-slot="liquid-glass-tint"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 rounded-[inherit]",
          variant === "frosted"
            ? "bg-(--glass-tint-frosted)"
            : "bg-(--glass-tint)"
        )}
        style={tint ? { background: tint } : undefined}
      />
      <span
        aria-hidden
        data-slot="liquid-glass-rim"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 rounded-[inherit] shadow-(--glass-rim)",
          shadow && "[box-shadow:var(--glass-rim),var(--glass-shadow)]"
        )}
      />
      {filters.length ? (
        <svg
          aria-hidden
          width="0"
          height="0"
          className="pointer-events-none absolute size-0"
        >
          {filters.map((entry) => (
            <GlassFilter
              key={entry.key}
              id={filterId(entry)}
              map={entry.url}
              width={width}
              height={height}
              blur={blurPx}
              scale={scale}
              dispersion={dispersion}
              saturation={saturation}
            />
          ))}
        </svg>
      ) : null}
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  )
}

export { LiquidGlass, type LiquidGlassProps }
