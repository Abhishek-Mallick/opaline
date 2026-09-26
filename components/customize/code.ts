import type { Control, Snippet, Value, Values } from "@/components/customize/types"

const isDefault = (c: Control, v: Value) => v === undefined || v === c.default

/** One JSX attribute, or "" when the value is the default. */
export function attr(c: Control, v: Value) {
  if (isDefault(c, v) || v === null) return ""
  if (typeof v === "boolean") return v ? c.key : `${c.key}={false}`
  if (typeof v === "number") return `${c.key}={${+v.toFixed(4)}}`
  return `${c.key}=${JSON.stringify(v)}`
}

/** Serialises every changed prop in `controls`. */
export function attrs(controls: Control[], values: Values, keys?: string[]) {
  return controls
    .filter((c) => !keys || keys.includes(c.key))
    .map((c) => attr(c, values[c.key]))
    .filter(Boolean)
}

/** Values that differ from the controls' defaults, ready to spread as props. */
export function changed(controls: Control[], values: Values) {
  const out: Record<string, string | number | boolean> = {}
  for (const c of controls) {
    const v = values[c.key]
    if (!isDefault(c, v) && v !== null && v !== undefined) out[c.key] = v
  }
  return out
}

export const indent = (s: string, n = 2) =>
  s
    .split("\n")
    .map((l) => (l ? " ".repeat(n) + l : l))
    .join("\n")

/** `<Tag a b>` — wraps attributes onto their own lines when long. */
export function openTag(tag: string, a: string[], selfClose = false) {
  const end = selfClose ? " />" : ">"
  if (!a.length) return `<${tag}${end}`
  const line = `<${tag} ${a.join(" ")}${end}`
  if (line.length <= 72 && !line.includes("\n")) return line
  return `<${tag}\n${indent(a.join("\n"))}\n${selfClose ? "/>" : ">"}`
}

/** `<Tag a>children</Tag>`, self-closing when there are no children. */
export function element(tag: string, a: string[], children?: string) {
  if (!children) return openTag(tag, a, true)
  const open = openTag(tag, a)
  if (!children.includes("\n") && !open.includes("\n") && open.length + children.length < 72)
    return `${open}${children}</${tag}>`
  return `${open}\n${indent(children)}\n</${tag}>`
}

/** Splits a registry usage snippet into its imports and JSX. */
export function parseUsage(usage: string): Snippet {
  const lines = usage.split("\n")
  const imports: string[] = []
  let i = 0
  for (; i < lines.length; i++) {
    const l = lines[i]
    if (/^import\b/.test(l)) {
      let full = l
      while (!/from\s+["'].+["']/.test(full) && i + 1 < lines.length) full += "\n" + lines[++i]
      imports.push(full)
    } else if (l.trim() === "" || l.trim().startsWith("//")) continue
    else break
  }
  return { imports, jsx: lines.slice(i).join("\n").trim() }
}

/** Final code: imports, then the JSX wrapped in a provider when needed. */
export function render({ imports, jsx }: Snippet, provider: string[]) {
  const all = [...imports]
  let body = jsx
  if (provider.length) {
    all.unshift('import { LiquidGlassProvider } from "@/components/ui/liquid-glass"')
    body = `${openTag("LiquidGlassProvider", provider)}\n${indent(jsx)}\n</LiquidGlassProvider>`
  }
  return `${mergeImports(all).join("\n")}\n\n${body}\n`
}

/** Dedupes and merges named imports from the same module. */
function mergeImports(lines: string[]) {
  const named = new Map<string, Set<string>>()
  const other: string[] = []
  for (const l of lines) {
    const m = l.match(/^import\s*\{([^}]*)\}\s*from\s*["'](.+)["']/s)
    if (!m) {
      if (!other.includes(l)) other.push(l)
      continue
    }
    const set = named.get(m[2]) ?? new Set<string>()
    m[1].split(",").map((s) => s.trim()).filter(Boolean).forEach((s) => set.add(s))
    named.set(m[2], set)
  }
  const out = [...other]
  // Keep third-party modules first, then the project's own.
  const mods = [...named.keys()].sort((a, b) => Number(a.startsWith("@/")) - Number(b.startsWith("@/")))
  for (const mod of mods) out.push(`import { ${[...named.get(mod)!].join(", ")} } from "${mod}"`)
  return out
}
