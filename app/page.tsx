import { ComponentGrid } from "@/components/site/grid"
import { Hero } from "@/components/site/hero"
import { docItems } from "@/registry/index"

export default function Page() {
  return (
    <main id="top" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <Hero />
      <section id="components" className="mt-28 scroll-mt-24">
        <div className="mb-8 flex flex-col gap-2 px-1">
          <span className="text-[13px] font-medium text-muted-foreground">
            {docItems.length} components
          </span>
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl">
            Interfaces that bend the light
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-pretty text-muted-foreground">
            Real refraction, not just blur. Each surface bends the backdrop through a displacement
            map, rims catch the light, and controls melt into lenses when you touch them.
          </p>
        </div>
        <ComponentGrid items={docItems.filter((i) => i.name !== "liquid-glass")} />
      </section>
    </main>
  )
}
