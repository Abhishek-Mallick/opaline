# Opaline

Liquid glass and premium, minimal components for React. Built on Tailwind CSS v4 and Radix UI, and installed with the shadcn CLI. You get the source, not a package.

**[opaline.buildlab.in](https://opaline.buildlab.in)**

## Requirements

- React 19 and a framework the shadcn CLI supports (Next.js, Vite, React Router, Astro, TanStack Start…)
- Tailwind CSS v4
- A `components.json`. If you don't have one, run `npx shadcn@latest init`

## Installation

### 1. Set up shadcn (skip if you already have it)

```bash
npx create-next-app@latest my-app
cd my-app
npx shadcn@latest init
```

### 2. Add the Opaline registry

Add the `@opaline` namespace to `components.json`:

```json
{
  "registries": {
    "@opaline": "https://opaline.buildlab.in/r/{name}.json"
  }
}
```

After Opaline is listed in the shadcn registry directory, you can skip this step.

### 3. Install the theme

```bash
npx shadcn@latest add @opaline/theme
```

This writes the Opaline colours, glass tokens and the Apple system font stack into your global CSS, for both light and dark mode. The theme is optional because glass components bring their own glass tokens, but components look their best with it.

### 4. Add components

```bash
npx shadcn@latest add @opaline/glass-button @opaline/glass-card
```

Or install the theme and every component at once:

```bash
npx shadcn@latest add @opaline/all
```

Dependencies (`radix-ui`, `lucide-react`, `class-variance-authority`) and shared pieces such as the `liquid-glass` primitive are installed for you.

### Other ways to install

Without setting up the namespace, use the full URL:

```bash
npx shadcn@latest add https://opaline.buildlab.in/r/glass-button.json
```

Or install straight from GitHub:

```bash
npx shadcn@latest add abhishek-mallick/opaline/glass-button
```

## Usage

```tsx
import { GlassButton } from "@/components/ui/glass-button"
import { GlassCard, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"

export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center bg-[url(/wallpaper.jpg)] bg-cover">
      <GlassCard className="w-80">
        <GlassCardHeader>
          <GlassCardTitle>Hello, glass</GlassCardTitle>
        </GlassCardHeader>
      </GlassCard>
      <GlassButton variant="prominent">Get started</GlassButton>
    </main>
  )
}
```

Glass needs something behind it to bend, such as a photo, gradient or content. On a flat background it looks like a plain surface.

### Building your own glass surface

Every glass component uses `LiquidGlass`, and you can use it directly:

```tsx
import { LiquidGlass } from "@/components/ui/liquid-glass"

<LiquidGlass className="rounded-3xl p-6" bezel={24} refraction={40} dispersion={0.1}>
  Anything
</LiquidGlass>
```

| Prop | Default | Description |
| --- | --- | --- |
| `variant` | `"clear"` | `clear` refracts. `frosted` adds more blur and tint so text stays readable |
| `bezel` | ~40% of the shortest side | Width in px of the refracting rim |
| `refraction` | `bezel × 1.6` | How far the backdrop bends, in px |
| `blur` | `1.5` (clear) / `10` (frosted) | Backdrop blur in px |
| `saturation` | `1.6` | Backdrop saturation |
| `dispersion` | `0.12` | Chromatic aberration at the rim, from 0 to 1 |
| `tint` | `var(--glass-tint)` | Surface colour |
| `shadow` | `true` | Outer drop shadow |
| `asChild` | `false` | Render the glass onto the child element |

The corner radius comes from your CSS (`rounded-*`), so the refraction always follows the shape.

## Components

Every component has a page with a live preview, source and install commands at
[opaline.buildlab.in/components](https://opaline.buildlab.in/components). Press <kbd>⌘K</kbd> on the site to search.

### Liquid Glass

| Name | Description |
| --- | --- |
| `liquid-glass` | The primitive behind every glass component |
| `glass-dock` | macOS-style dock with smooth magnification and hover labels |
| `glass-button` | Pill button with a highlight that follows the pointer |
| `glass-lens` | Draggable magnifying lens |
| `glass-sidebar` | Floating source list with a sliding selection and icon-only mode |
| `glass-command` | ⌘K command palette (cmdk) |
| `glass-sheet` | Floating side sheet, or a drag-to-dismiss drawer with `side="bottom"` |
| `glass-toast` | Toasts shown with `toast()` that drop in from the top |
| `glass-popover` | Popover on frosted glass |
| `glass-select` | Capsule select with a frosted option list |
| `glass-menu` | Dropdown menu |
| `glass-dialog` | Modal on a frosted glass sheet |
| `glass-knob` | Rotary dial with a glass cap |
| `glass-clock` | Analog clock with a sweeping second hand |
| `glass-stack` | Swipeable deck of glass cards |
| `glass-player` | Now-playing widget |
| `glass-card` | Frosted card with header, content and footer slots |
| `glass-switch` | iOS switch whose thumb turns into a lens while pressed |
| `glass-slider` | Slider whose thumb becomes a lens while dragging |
| `glass-tabs` | Segmented control with a gliding glass bubble |
| `glass-tab-bar` | Floating iOS 26 tab bar |
| `glass-notification` | iOS notification banner and a stack that fans out on hover |
| `glass-input` | Capsule text field with icon and adornment slots |
| `glass-toolbar` | Floating capsule toolbar |
| `glass-tooltip` | Capsule tooltip |
| `glass-badge` | Glass chip with an optional glowing status dot |

### Accents

| Name | Description |
| --- | --- |
| `mesh-gradient` | Drifting, grain-textured colour field (a good backdrop for glass) |
| `rolling-number` | Number whose digits roll like an odometer |
| `activity-rings` | Apple Watch–style progress rings |
| `shimmer-text` | Text with a slow light sweep |
| `spinner` | Apple-style activity indicator |

## For AI agents

- [`/llms.txt`](https://opaline.buildlab.in/llms.txt): index of every component ([llmstxt.org](https://llmstxt.org))
- [`/llms-full.txt`](https://opaline.buildlab.in/llms-full.txt): install and usage for every component in one file
- `/components/<name>.md`: Markdown version of each component page (also the **Copy page** button)
- `/r/<name>.json`: shadcn registry items with full source

## Browser support

| Browser | Rendering |
| --- | --- |
| Chrome, Edge, Arc, Opera and other Chromium browsers | Full liquid glass with real backdrop refraction |
| Safari, Firefox | Frosted glass fallback (blur + saturation) |

Opaline also uses the fallback when the user has turned on *Reduce transparency*.

## Theming

Everything reads from CSS variables. Override them in your global CSS:

```css
:root {
  --glass-tint: oklch(1 0 0 / 14%);          /* clear surface colour */
  --glass-tint-frosted: oklch(1 0 0 / 52%);  /* frosted surface colour */
  --glass-highlight: oklch(1 0 0 / 62%);     /* selected / hover states */
  --glass-foreground: oklch(0.18 0 0);       /* text on glass */
  --glass-rim: …;                            /* inset rim lighting */
  --glass-shadow: …;                         /* outer shadow */
}
```

## Development

```bash
pnpm install
pnpm dev                 # showcase at http://localhost:3000
pnpm build               # registry JSON in public/r + static site in out/
pnpm registry:validate
```

| Path | What |
| --- | --- |
| `registry/opaline/` | Component, lib and hook sources |
| `registry/index.ts` | Registry manifest (names, descriptions, dependencies) |
| `registry/theme.ts` | Design tokens |
| `registry.json` | Generated from the manifest. Run `pnpm registry:gen` after changes |
| `components/demos/` | One demo per component, shown in previews and "View code" |
| `components/site/` | Showcase site |

To add a component:

1. Create it in `registry/opaline/ui/<name>.tsx`.
2. Add it to `registry/index.ts` with a `usage` snippet.
3. Add a demo in `components/demos/<name>.tsx` and register it in `components/demos/index.tsx`. For glass components, also pick a wallpaper in `components/demos/meta.ts`.
4. Run `pnpm registry:gen`.

Pull requests run typecheck, build and registry validation (`.github/workflows/ci.yml`).

Pushes to `main` deploy to GitHub Pages at `opaline.buildlab.in` through `.github/workflows/deploy.yml`.

## License

[MIT](./LICENSE)
