import Link from "next/link"

import { cn } from "@/lib/utils"
import { categoryLabels, docItems, type Category } from "@/registry/index"

export function DocsNav({ current }: { current?: string }) {
  const groups = (Object.keys(categoryLabels) as Category[])
    .map((cat) => ({ cat, list: docItems.filter((i) => i.category === cat) }))
    .filter((g) => g.list.length)

  return (
    <nav className="flex flex-col gap-6 pb-10 text-[13.5px]">
      <div className="flex flex-col gap-0.5">
        <div className="px-3 pb-1.5 text-[12px] font-medium text-muted-foreground">Getting started</div>
        <Link href="/#setup" className="rounded-lg px-3 py-1.5 text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground">
          Installation
        </Link>
        <Link href="/components" className="rounded-lg px-3 py-1.5 text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground">
          All components
        </Link>
      </div>
      {groups.map(({ cat, list }) => (
        <div key={cat} className="flex flex-col gap-0.5">
          <div className="px-3 pb-1.5 text-[12px] font-medium text-muted-foreground">
            {categoryLabels[cat]}
          </div>
          {list.map((i) => (
            <Link
              key={i.name}
              href={`/components/${i.name}`}
              aria-current={i.name === current ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-1.5 text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground",
                "aria-[current=page]:bg-foreground/[0.06] aria-[current=page]:font-medium aria-[current=page]:text-foreground"
              )}
            >
              {i.title}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}
