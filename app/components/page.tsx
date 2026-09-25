import type { Metadata } from "next"

import { ComponentGrid } from "@/components/site/grid"
import { categoryLabels, docItems, type Category } from "@/registry/index"

export const metadata: Metadata = {
  title: "Components",
  description: "Every Opaline component — liquid glass surfaces, controls and accents.",
}

const blurbs: Record<Category, string> = {
  foundation: "The primitive every glass component is built on.",
  glass: "Surfaces and controls that refract whatever sits behind them.",
  accent: "Small, considered details that pair beautifully with glass.",
}

export default function ComponentsPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pt-32 pb-24 sm:px-6">
      <header className="flex flex-col gap-3 px-1">
        <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Components</h1>
        <p className="max-w-xl text-[16px] leading-relaxed text-muted-foreground">
          {docItems.length} components. Open any of them for a live preview, source and install
          commands — or press <kbd className="font-sans">⌘K</kbd> to jump straight to one.
        </p>
      </header>
      {(Object.keys(categoryLabels) as Category[]).map((cat) => {
        const list = docItems.filter((i) => i.category === cat)
        if (!list.length) return null
        return (
          <section key={cat} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 px-1">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">{categoryLabels[cat]}</h2>
              <p className="text-[15px] text-muted-foreground">{blurbs[cat]}</p>
            </div>
            <ComponentGrid items={list} />
          </section>
        )
      })}
    </main>
  )
}
