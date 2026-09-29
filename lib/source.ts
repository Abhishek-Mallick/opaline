import "server-only"

import { readFileSync } from "node:fs"
import path from "node:path"

import type { Item } from "@/registry/index"

/** Rewrites registry-internal imports to the paths a shadcn install produces. */
export function toUserImports(source: string) {
  return source
    .replaceAll("@/registry/opaline/ui/", "@/components/ui/")
    // Components live in registry/opaline/ui/opaline/, so the CLI installs
    // them to components/ui/opaline/ and the line above yields that path.
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

/**
 * Where the shadcn CLI writes a file: the type's folder, plus any folders
 * that follow that folder's name in the source path (so
 * `registry/opaline/ui/opaline/glass-button.tsx` → `components/ui/opaline/glass-button.tsx`).
 */
function installPath(file: Item["files"][number]) {
  const dir = targets[file.type] ?? "components"
  const segments = file.path.split("/")
  const last = dir.split("/").pop()!
  const i = segments.indexOf(last)
  return `${dir}/${i === -1 ? path.basename(file.path) : segments.slice(i + 1).join("/")}`
}

export function itemFiles(item: Item) {
  return item.files.map((f) => ({
    target: installPath(f),
    code: toUserImports(read(f.path)),
  }))
}
