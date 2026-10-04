"use client"

import { GlassCodeBlock } from "@/registry/opaline/ui/opaline/glass-code-block"

const page = `import { GlassButton } from "@/components/ui/opaline/glass-button"

export default function Page() {
  return <GlassButton variant="prominent">Get started</GlassButton>
}`

const layout = `import { LiquidGlassProvider } from "@/components/ui/opaline/liquid-glass"

export default function Layout({ children }) {
  return <LiquidGlassProvider ior={1.9}>{children}</LiquidGlassProvider>
}`

export default function GlassCodeBlockDemo() {
  return (
    <GlassCodeBlock
      className="max-w-xl"
      highlightLines={[4]}
      files={[
        { name: "page.tsx", code: page, language: "tsx" },
        { name: "layout.tsx", code: layout, language: "tsx" },
        { name: "install.sh", code: "npx shadcn@latest add @opaline/all", language: "bash" },
      ]}
    />
  )
}
