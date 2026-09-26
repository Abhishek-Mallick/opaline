import type { HighlighterCore } from "shiki/core"

let highlighter: Promise<HighlighterCore> | undefined

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/** Unstyled markup with the same structure Shiki emits, shown while it loads. */
export function plainHtml(code: string) {
  const lines = code.trimEnd().split("\n").map((l) => `<span class="line">${escape(l)}</span>`)
  return `<pre class="shiki"><code>${lines.join("\n")}</code></pre>`
}

/** Client-side TSX highlighting; Shiki and its grammar load on first use. */
export async function highlightTsx(code: string) {
  highlighter ??= Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
  ]).then(([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
    createHighlighterCore({
      themes: [import("shiki/themes/github-light.mjs"), import("shiki/themes/github-dark.mjs")],
      langs: [import("shiki/langs/tsx.mjs")],
      engine: createJavaScriptRegexEngine(),
    })
  )
  const h = await highlighter
  return h.codeToHtml(code.trimEnd(), {
    lang: "tsx",
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  })
}
