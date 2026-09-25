import "server-only"

import { createHighlighter, type Highlighter } from "shiki"

let highlighter: Promise<Highlighter> | undefined

/** Build-time syntax highlighting with light and dark themes as CSS variables. */
export async function highlight(code: string, lang: "tsx" | "bash" | "json" | "ts" = "tsx") {
  highlighter ??= createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["tsx", "ts", "bash", "json"],
  })
  const h = await highlighter
  return h.codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  })
}
