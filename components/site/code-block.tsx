import { CodeFrame } from "@/components/site/code"
import { highlight } from "@/lib/highlight"

/** Server component: highlights at build time, renders with a copy button. */
export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  lineNumbers,
  className,
  bodyClassName,
}: {
  code: string
  lang?: "tsx" | "bash" | "json" | "ts"
  title?: React.ReactNode
  lineNumbers?: boolean
  className?: string
  bodyClassName?: string
}) {
  const html = await highlight(code, lang)
  return (
    <CodeFrame
      html={html}
      code={code}
      title={title}
      lineNumbers={lineNumbers ?? lang !== "bash"}
      className={className}
      bodyClassName={bodyClassName}
    />
  )
}
