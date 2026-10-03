import type { Metadata } from "next"

import { CodeBlock } from "@/components/site/code-block"
import { DocsNav } from "@/components/site/docs-nav"
import { withBase } from "@/lib/site"

export const metadata: Metadata = {
  title: "Installation",
  description: "Install Opaline components with the shadcn CLI — requirements, setup and usage.",
}

export default function InstallationPage() {
  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-4 pt-28 pb-24 sm:px-6">
      <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-52 shrink-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:block">
        <DocsNav current="installation" />
      </aside>

      <article className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-10">
        <header className="flex flex-col gap-3">
          <h1 className="text-[34px] leading-tight font-semibold tracking-[-0.035em]">
            Installation
          </h1>
          <p className="text-[16px] leading-relaxed text-muted-foreground">
            Requires a shadcn project with Tailwind CSS v4. True refraction renders in Chromium;
            other browsers get a graceful frosted glass. Building with AI? Point your agent at{" "}
            <a href={withBase("/llms.txt")} className="text-foreground underline underline-offset-4">
              /llms.txt
            </a>
            .
          </p>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            On an older shadcn CLI?{" "}
            <a
              href="https://github.com/deepraj21/opaline#installation"
              className="text-foreground underline underline-offset-4"
            >
              Add the registry to components.json
            </a>{" "}
            first.
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-[-0.02em]">Install components</h2>
          <p className="text-[14px] leading-relaxed text-muted-foreground">
            @opaline is in the shadcn directory, so there&apos;s nothing to configure.
          </p>
          <CodeBlock
            code={`# Install individual components
npx shadcn@latest add @opaline/theme @opaline/glass-button

# or everything
npx shadcn@latest add @opaline/all`}
            lang="bash"
            title={<span className="font-mono">Terminal</span>}
            lineNumbers={false}
          />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-[-0.02em]">Use them</h2>
          <p className="text-[14px] leading-relaxed text-muted-foreground">
            Glass looks best over something colourful — photos, gradients, content.
          </p>
          <CodeBlock
            code={`import { GlassButton } from "@/components/ui/opaline/glass-button"

export default function Page() {
  return <GlassButton variant="prominent">Get started</GlassButton>
}`}
            title={<span className="font-mono">app/page.tsx</span>}
          />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-[-0.02em]">Tune the glass</h2>
          <p className="text-[14px] leading-relaxed text-muted-foreground">
            Set the optics once for everything inside, or per component.
          </p>
          <CodeBlock
            code={`import { LiquidGlassProvider } from "@/components/ui/opaline/liquid-glass"

<LiquidGlassProvider ior={1.9} surface="lip" specular={0.5}>
  {children}
</LiquidGlassProvider>`}
            title={<span className="font-mono">app/layout.tsx</span>}
          />
        </section>

        <p className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-[13.5px] leading-relaxed text-muted-foreground">
          Glass needs something to bend — place it over imagery, gradients or content. Chromium
          browsers render true refraction; Safari and Firefox get a frosted fallback.
        </p>
      </article>
    </div>
  )
}
