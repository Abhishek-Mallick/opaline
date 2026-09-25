# Contributing to Opaline

Thanks for helping make Opaline better. This guide covers how to set up the project, how it is organised, and what we look for in a pull request.

## Ways to contribute

- **Report a bug:** open a [bug report](https://github.com/deepraj21/opaline/issues/new?template=bug_report.yml).
- **Propose a component:** open a [component request](https://github.com/deepraj21/opaline/issues/new?template=component_request.yml) and describe the idea before you build it.
- **Improve docs, demos or accessibility:** small pull requests are always welcome.

For anything larger than a small fix, please open an issue first so we can agree on the approach.

## Development

Requirements: Node.js 22+ and pnpm 10.

```bash
git clone https://github.com/deepraj21/opaline
cd opaline
pnpm install
pnpm dev          # showcase at http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Generates the registry and starts the site |
| `pnpm build` | Builds registry JSON (`public/r`) and the static site (`out/`) |
| `pnpm typecheck` | Type-checks the project |
| `pnpm registry:gen` | Regenerates `registry.json`, `llms.txt` and theme CSS from the manifest |
| `pnpm registry:validate` | Validates the registry with the shadcn CLI |

## Project structure

| Path | Contents |
| --- | --- |
| `registry/opaline/ui/` | Component source. This is what users install |
| `registry/opaline/lib/`, `hooks/` | Shared engine code and hooks |
| `registry/index.ts` | The manifest: name, description, dependencies and usage for every item |
| `registry/theme.ts` | Design tokens |
| `components/demos/` | One demo per component, used for previews and "View code" |
| `components/site/`, `app/` | The website |

`registry.json`, `app/opaline.css` and `public/llms*.txt` are generated. Edit the manifest and run `pnpm registry:gen`; don't edit the generated files by hand.

## Adding a component

1. Create `registry/opaline/ui/<name>.tsx`. Glass components are named `glass-*` and build on `LiquidGlass`.
2. Add an entry to `registry/index.ts`, including a short `usage` snippet.
3. Add a demo in `components/demos/<name>.tsx`, register it in `components/demos/index.tsx`, and choose a wallpaper in `components/demos/meta.ts`.
4. Run `pnpm registry:gen` and check the component page at `/components/<name>`.

### Guidelines

- **Real glass, not blur.** Use `LiquidGlass` for surfaces. Don't reach for `backdrop-blur`.
- **Animate transforms only on glass.** A `filter` or `opacity` on a glass element or its ancestors cuts off the backdrop and the glass renders empty. Use the `opaline-glass-in` / `opaline-glass-out` keyframes with the `--glass-enter-*` / `--glass-exit-*` variables, not tw-animate's `animate-in` utilities.
- **Accessible by default.** Keyboard support, focus rings, ARIA roles and labels, and `prefers-reduced-motion` for large motion.
- **Match the house style.** `data-slot` attributes, `cn()` for class merging, and function components that accept `className` and spread props.
- **Self-contained.** Import other Opaline items via `@/registry/opaline/...` so the shadcn CLI can rewrite paths on install.

## Pull requests

- Keep each PR focused on one change. Use a clear title such as `feat(glass-knob): add step markers`.
- Run `pnpm typecheck && pnpm build` before pushing. CI runs the same checks plus registry validation.
- Add before/after screenshots or a short recording for visual changes, in light and dark mode.
- Check Chromium (refraction) and Safari or Firefox (fallback) when you touch glass rendering.

## Maintainers

| | |
| --- | --- |
| [@Abhishek-Mallick](https://github.com/Abhishek-Mallick) | Creator and lead maintainer |

Maintainers review pull requests, triage issues and cut releases. Code ownership is defined in [`CODEOWNERS`](./CODEOWNERS).

## Code of conduct

By taking part you agree to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).
