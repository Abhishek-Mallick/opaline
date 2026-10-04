"use client"

import { GlassSnippet } from "@/registry/opaline/ui/opaline/glass-snippet"

export default function GlassSnippetDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <GlassSnippet
        commands={[
          { label: "npm", code: "npx shadcn@latest add @opaline/all" },
          { label: "pnpm", code: "pnpm dlx shadcn@latest add @opaline/all" },
          { label: "yarn", code: "yarn dlx shadcn@latest add @opaline/all" },
          { label: "bun", code: "bunx --bun shadcn@latest add @opaline/all" },
        ]}
      />
      <GlassSnippet code="git clone https://github.com/deepraj21/opaline" />
    </div>
  )
}
