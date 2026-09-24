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

### Liquid Glass

| Name | Description |
| --- | --- |
| `liquid-glass` | The primitive behind every glass component |
| `glass-button` | Pill button with a highlight that follows the pointer |
| `glass-card` | Frosted card with header, content and footer slots |
| `glass-dock` | macOS-style dock with magnification and hover labels |
| `glass-switch` | iOS switch whose thumb turns into a glass lens while pressed |
| `glass-slider` | Slider whose thumb becomes a refracting lens while dragging |
| `glass-tabs` | Segmented control with a glass bubble that slides between tabs |
| `glass-tab-bar` | Floating iOS 26 tab bar |
| `glass-input` | Capsule text field with icon and adornment slots |
| `glass-toolbar` | Floating capsule toolbar |
| `glass-badge` | Small glass chip with an optional glowing status dot |
| `glass-dialog` | Modal on a frosted glass sheet |
| `glass-menu` | Dropdown menu on liquid glass |
| `glass-tooltip` | Capsule tooltip |
| `glass-player` | Now-playing widget |
| `glass-notification` | iOS notification banner and a stack that fans out on hover |
| `glass-lens` | Draggable magnifying lens |

### Essentials

These keep the shadcn/ui API, so they replace the stock components directly.

`button` · `input` · `textarea` · `label` · `card` · `badge` · `kbd` · `separator` · `switch` · `checkbox` · `radio-group` · `slider` · `tabs` · `tooltip` · `dialog` · `dropdown-menu` · `accordion` · `avatar` · `progress` · `skeleton` · `spinner` · `activity-rings` · `shimmer-text`

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
| `components/site/` | Showcase site |

To add a component, create it under `registry/opaline/ui`, add it to `registry/index.ts`, add a demo tile in `components/site`, then run `pnpm registry:gen`.

Pushes to `main` deploy to GitHub Pages at `opaline.buildlab.in` through `.github/workflows/deploy.yml`.
