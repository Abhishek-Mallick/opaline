import * as React from "react"

import { cn } from "@/lib/utils"

const noise = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.6'/></svg>"
)}")`

const paths = [
  ["18%", "22%", "30%", "-12%", "-20%", "18%"],
  ["78%", "18%", "-24%", "20%", "12%", "-16%"],
  ["70%", "80%", "-18%", "-22%", "-26%", "10%"],
  ["22%", "78%", "20%", "-18%", "24%", "-10%"],
  ["50%", "50%", "-14%", "16%", "18%", "-20%"],
]

/**
 * Slowly drifting, grain-textured colour field. The ideal backdrop for glass:
 * put Opaline glass components on top of it.
 */
function MeshGradient({
  colors = ["#ff7ab6", "#ffb86b", "#6bd2ff", "#8f7bff", "#5ef0c0"],
  speed = 1,
  grain = true,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  colors?: string[]
  /** Animation speed multiplier. 0 pauses it. */
  speed?: number
  grain?: boolean
}) {
  return (
    <div
      data-slot="mesh-gradient"
      className={cn("relative isolate overflow-hidden", className)}
      {...props}
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-background">
        {colors.slice(0, paths.length).map((color, i) => {
          const [left, top, dx1, dy1, dx2, dy2] = paths[i]
          return (
            <span
              key={i}
              className="absolute size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90 blur-[60px] motion-safe:animate-[opaline-drift_var(--mesh-duration)_ease-in-out_infinite_alternate]"
              style={
                {
                  left,
                  top,
                  background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
                  "--dx1": dx1,
                  "--dy1": dy1,
                  "--dx2": dx2,
                  "--dy2": dy2,
                  "--mesh-duration": speed > 0 ? `${(16 + i * 3) / speed}s` : "0s",
                  animationDelay: `${-i * 2.5}s`,
                } as React.CSSProperties
              }
            />
          )
        })}
        {grain ? (
          <span
            className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
            style={{ backgroundImage: noise }}
          />
        ) : null}
      </div>
      {children}
    </div>
  )
}

export { MeshGradient }
