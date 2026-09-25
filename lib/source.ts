import "server-only"

import { readFileSync } from "node:fs"
import path from "node:path"

import type { Item } from "@/registry/index"

/** Rewrites registry-internal imports to the paths a shadcn install produces. */
export function toUserImports(source: string) {
  return source
    .replaceAll("@/registry/opaline/ui/", "@/components/ui/")
    .replaceAll("@/registry/opaline/lib/", "@/lib/")
    .replaceAll("@/registry/opaline/hooks/", "@/hooks/")
}

const read = (file: string) => readFileSync(path.join(process.cwd(), file), "utf8")

export function demoSource(name: string) {
  try {
    return toUserImports(read(`components/demos/${name}.tsx`))
  } catch {
    return ""
  }
}

const targets: Record<string, string> = {
  "registry:ui": "components/ui",
  "registry:lib": "lib",
  "registry:hook": "hooks",
}

export function itemFiles(item: Item) {
  return item.files.map((f) => ({
    target: `${targets[f.type] ?? "components"}/${path.basename(f.path)}`,
    code: toUserImports(read(f.path)),
  }))
}
