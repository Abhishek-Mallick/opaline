import { Tile } from "@/components/site/tile"
import type { Item } from "@/registry/index"

export function ComponentGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <Tile key={i.name} name={i.name} />
      ))}
    </div>
  )
}
