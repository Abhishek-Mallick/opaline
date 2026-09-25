import type { Item } from "./index.ts"

/** Markdown for one component — served as /components/<name>.md and "Copy page". */
export function componentMarkdown(
  item: Item,
  { homepage, registryUrl }: { homepage: string; registryUrl: string }
) {
  const deps = [
    ...(item.dependencies ?? []),
    ...(item.internal ?? []).map((n) => `@opaline/${n}`),
  ]
  return [
    `# ${item.title}`,
    "",
    `> ${item.description}`,
    "",
    `Docs: ${homepage}/components/${item.name}`,
    "",
    "## Installation",
    "",
    "```bash",
    `npx shadcn@latest add @opaline/${item.name}`,
    "```",
    "",
    `Or without the namespace: \`npx shadcn@latest add ${registryUrl}/${item.name}.json\``,
    ...(deps.length ? ["", `Dependencies (installed automatically): ${deps.join(", ")}`] : []),
    ...(item.usage ? ["", "## Usage", "", "```tsx", item.usage, "```"] : []),
    "",
    `Source: ${registryUrl}/${item.name}.json`,
    "",
  ].join("\n")
}
