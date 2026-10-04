# Changelog

All notable changes to Opaline are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows [Semantic Versioning](https://semver.org/).

Each release is published on [GitHub Releases](https://github.com/deepraj21/opaline/releases) from the matching section below.

## [Unreleased]

### Added

- **Glass Alert:** callouts tinted by intent (info, success, warning, destructive) with title, description and action slots
- **Glass Textarea:** grows with its content between `minRows` and `maxRows`, with a character counter, a footer slot and ⌘/Ctrl + Enter to submit
- **Glass Message:** chat bubbles (tinted for the user, clear for the assistant) with avatars, meta, grouping and a typing indicator
- **Glass Snippet:** a command on a glass capsule with copy, and tabs for npm, pnpm, yarn and bun
- **Glass Code Block:** Shiki-highlighted code in a glass window with file tabs, line numbers, highlighted lines and copy, in light and dark
- **Glass Terminal:** a macOS terminal on dark glass whose commands type themselves out, line by line, when scrolled into view
- **Glass Accordion:** Radix accordion as one glass panel (`inset`) or a glass card per item (`separated`)
- **Glass Bento Grid:** feature tiles with a background visual, a pointer-following light and a call to action that slides in
- **Glass Tweet Card:** a post from X with rich text, media, stats and a tappable like. Pass `id` (or a status URL) to load the real post with `react-tweet`; it shows a glass skeleton while loading and falls back to your data, or a "post unavailable" card, if it can't be fetched
- **Glass Credit Card:** tilts towards the pointer, flips to its back, detects the brand and masks the number
- **Glass QR Code:** a scannable code on a glass tile with soft finder squares, a logo on its own glass lens and an optional drifting magnifier (uses `uqr`). For URLs it shows the site's favicon, falling back to your `logo`
- **Glass Scroll Stack:** cards that pin and pile up as you scroll, shrinking and dimming as new ones land on them

### Changed

- **Glass Toast:** toasts now collapse into a deck that fans out on hover, can be swiped away, and support `toast.loading`, `toast.warning`, `toast.promise` and `toast.update`. `GlassToaster` gains six positions, `closeButton` and `visibleToasts`. Existing calls keep working

## [0.1.0] - 2026-09-29

The first public release of Opaline: liquid glass components for React, installable with the shadcn CLI and now listed in the [shadcn registry directory](https://ui.shadcn.com/docs/directory?q=opaline).

### Install

```bash
npx shadcn@latest add @opaline/theme @opaline/glass-button
# or everything
npx shadcn@latest add @opaline/all
```

### Liquid glass engine

- `LiquidGlass`: the primitive every component is built on. It refracts the backdrop through an SVG displacement map applied with `backdrop-filter`, with chromatic dispersion and a specular rim
- Physically based refraction: rays are traced through the glass rim with Snell's law, using a surface profile (`squircle`, `circle`, `concave`, `lip`), an index of refraction (`ior`) and a `thickness`
- `LiquidGlassProvider`: tune the optics for a whole subtree; props set on a component still win
- Refraction from the first frame, double-buffered maps on resize, and transform-only glass animations, so surfaces never flash empty
- Chromium renders true refraction; Safari and Firefox get a frosted fallback

### Components

- **Liquid Glass (32):** Badge, Button, Card, Clock, Command, Context Menu, Control Center, Date Picker, Dialog, Dock, Input, Knob, Lens, Menu, Notification, OTP Input, Player, Popover, Segmented, Select, Sheet, Sidebar, Slider, Stack, Stepper, Switch, Tab Bar, Tabs, Text, Toast, Toolbar, Tooltip
- **Widgets:** a widget frame plus Weather, Calendar and Battery widgets in iOS small, medium and large sizes
- **Theme:** light and dark design tokens, including the glass tint, rim, shadow and highlight

### Website and docs

- A page per component with a live preview, install commands for pnpm, npm, yarn and bun, usage and source
- A **Customize** panel on every page: refractive index, surface, thickness, bezel, dispersion, specular, light angle, blur, saturation, material, tint and shadow, plus component props and presets, with the generated code ready to copy
- A props table on every page, generated from the same schema
- "How the glass bends light": an interactive article on the Liquid Glass page covering Snell's law, surface profiles, ray tracing, displacement maps and the SVG filter
- ⌘K search, light and dark mode, and "Copy page" as Markdown
- `llms.txt`, `llms-full.txt` and per-component Markdown for AI coding tools

### Distribution

- shadcn registry at `https://opaline.buildlab.in/r`, with the `@opaline` namespace listed in the shadcn directory
- `@opaline/all` installs every component and the theme in one command
- Components install into their own folder, `components/ui/opaline/`, and import from `@/components/ui/opaline/<name>`, so they never clash with your shadcn/ui components. The engine goes to `lib/glass-refraction.ts` and shared hooks to `hooks/`

[Unreleased]: https://github.com/deepraj21/opaline/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/deepraj21/opaline/releases/tag/v0.1.0
