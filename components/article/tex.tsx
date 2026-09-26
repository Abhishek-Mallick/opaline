import katex from "katex"

/** Server-rendered KaTeX: no math runtime ships to the browser. */
export function Tex({ children, block = false }: { children: string; block?: boolean }) {
  const html = katex.renderToString(children, {
    displayMode: block,
    throwOnError: false,
    output: "htmlAndMathml",
  })
  return block ? (
    <div className="my-1 overflow-x-auto py-2 text-[17px]" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  )
}
