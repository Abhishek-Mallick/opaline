# Contributing to Opaline

Thanks for helping make Opaline better. This guide covers how to set up the project, how it's organised, how to add a component, and what we look for in a pull request.

- [Ways to contribute](#ways-to-contribute)
- [Development setup](#development-setup)
- [Workflow](#workflow)
- [Project structure](#project-structure)
- [Adding a component](#adding-a-component)
- [Testing your change](#testing-your-change)
- [Pull requests](#pull-requests)
- [Releases](#releases)

## Ways to contribute

- **Report a bug:** open a [bug report](https://github.com/deepraj21/opaline/issues/new?template=bug_report.yml) with the browser, steps and a screenshot.
- **Propose a component:** open a [component request](https://github.com/deepraj21/opaline/issues/new?template=component_request.yml) and describe the idea before you build it.
- **Suggest an improvement:** open a [feature request](https://github.com/deepraj21/opaline/issues/new?template=feature_request.yml).
- **Pick up an issue:** issues labelled [`good first issue`](https://github.com/deepraj21/opaline/labels/good%20first%20issue) are small and well scoped. Comment on the issue so nobody else starts the same work.
- **Improve docs, demos or accessibility:** small pull requests are always welcome.
- **Ask a question:** use [Discussions](https://github.com/deepraj21/opaline/discussions).

For anything larger than a small fix, open an issue first so we can agree on the approach before you spend time on it.

## Development setup

Requirements: Node.js 22+ (see [`.nvmrc`](../.nvmrc)) and pnpm 10.

1. [Fork the repository](https://github.com/deepraj21/opaline/fork), then clone your fork:

   ```bash
   git clone https://github.com/<your-username>/opaline
   cd opaline
   git remote add upstream https://github.com/deepraj21/opaline
   pnpm install
   pnpm dev          # site at http://localhost:3000
   ```

2. Keep your fork up to date before starting new work:

   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Generates the registry and starts the site |
| `pnpm build` | Builds the registry JSON (`public/r`) and the static site (`out/`) |
| `pnpm typecheck` | Type-checks the project |
| `pnpm registry:gen` | Regenerates `registry.json`, `app/opaline.css` and `llms.txt` from the manifest |
| `pnpm registry:validate` | Validates the registry with the shadcn CLI |

## Workflow

1. Branch from an up-to-date `main`. Name the branch after the change:

   | Prefix | For |
   | --- | --- |
   | `feat/` | New components or features, e.g. `feat/glass-time-picker` |
   | `fix/` | Bug fixes, e.g. `fix/glass-dock-hover` |
   | `docs/` | README, guides, website copy |
   | `chore/` | Tooling, CI, dependencies, releases |

2. Write commits in the [Conventional Commits](https://www.conventionalcommits.org/) style, scoped to the component where it helps:

   ```
   feat(glass-knob): add step markers
   fix(liquid-glass): keep the rim visible in Safari
   docs: explain the Customize panel
   ```

3. Keep each pull request focused on one change, and open it against `deepraj21/opaline:main`.

## Project structure

| Path | Contents |
| --- | --- |
| `registry/opaline/ui/opaline/` | Component source. This is what users install. The shadcn CLI keeps the folders after `ui/`, so these land in `components/ui/opaline/` |
| `registry/opaline/lib/glass-refraction.ts` | The refraction engine: surface profiles, Snell's law, displacement and specular maps |
| `registry/opaline/hooks/` | Shared hooks, e.g. `use-active-indicator` for gliding glass bubbles |
| `registry/index.ts` | The manifest: name, description, dependencies, keyframes and usage for every item |
| `registry/theme.ts` | Design tokens, including the glass tokens |
| `components/demos/` | One demo per component, plus `index.tsx` (the list) and `meta.ts` (wallpaper and tile size) |
| `components/customize/` | The Customize panel: control schema, shared glass controls, per-component configs and code generation |
| `components/article/` | The interactive "How the glass bends light" article |
| `components/site/`, `app/` | The website |
| `scripts/generate-registry.mts` | Builds `registry.json`, theme CSS and the `llms` files from the manifest |

`registry.json`, `app/opaline.css`, `public/r/` and `public/llms*.txt` are generated. Edit the manifest and run `pnpm registry:gen` instead of editing them by hand. CI fails if `registry.json` or `app/opaline.css` is out of date.

## Adding a component

1. **Source:** create `registry/opaline/ui/opaline/<name>.tsx`. Glass components are named `glass-*` and build on `LiquidGlass`.
2. **Manifest:** add an entry to `registry/index.ts` with the `glass()` helper. Include a short `usage` snippet, npm `dependencies`, other Opaline items in `internal`, and any `keyframes` the component uses.
3. **Demo:** add `components/demos/<name>.tsx` (a default export), import it in `components/demos/index.tsx`, and pick a wallpaper in `components/demos/meta.ts`.
4. **Customize panel:** add an entry to `customizations` in `components/customize/configs.tsx`:
   - `controls` describe the component's own props (`number`, `select`, `boolean`, `color` or `text`). The props table is generated from them, so give each one a `description`.
   - `presets` are named sets of values.
   - `render` draws the live preview from the current values, and `code` returns the matching snippet.
   - If the component fixes a glass setting on its own surface (for example it is always `variant="frosted"`), add it to `pinned` so the panel hides that control.

   Components without a config still get the shared glass controls around their demo, so this step can come in a follow-up PR.
5. **Generate and check:** run `pnpm registry:gen`, then open `/components/<name>` and try the Customize panel.

### Guidelines

- **Real glass, not blur.** Use `LiquidGlass` for surfaces. Don't reach for `backdrop-blur`.
- **Let the provider work.** Don't hard-code `refraction`, `ior` or `thickness` on a component's main surface. Users tune those through `LiquidGlassProvider`.
- **Animate transforms only on glass.** A `filter` or `opacity` on a glass element or any ancestor cuts off the backdrop and the glass renders empty. Use the `opaline-glass-in` / `opaline-glass-out` keyframes with the `--glass-enter-*` / `--glass-exit-*` variables, not tw-animate's `animate-in` utilities.
- **Accessible by default.** Keyboard support, visible focus rings, ARIA roles and labels, and `prefers-reduced-motion` for large motion.
- **Match the house style.** `data-slot` attributes, `cn()` for class merging, function components that accept `className` and spread the rest of their props.
- **Self-contained imports.** Import other Opaline items via `@/registry/opaline/...` so the shadcn CLI can rewrite paths on install.
- **Icons:** use [Hugeicons](https://hugeicons.com) (`@hugeicons/react` with `@hugeicons/core-free-icons`).

## Testing your change

Run the same checks as CI before you push:

```bash
pnpm typecheck
pnpm build
pnpm registry:validate
```

**Check both render paths.** Chromium browsers refract the backdrop; Safari and Firefox use the frosted fallback. If you touch glass rendering, look at your change in Chrome and in Safari or Firefox, in light and dark mode.

**Test the install like a user.** For new components or changes to the manifest, build the registry against a local URL and install it into a fresh shadcn app:

```bash
# in the opaline repo
REGISTRY_URL=http://localhost:4173/r pnpm registry:build
cp -r public/r out/r
npx serve out -l 4173

# in a separate Next.js + shadcn project
npx shadcn@latest add http://localhost:4173/r/<name>.json
```

Then run `pnpm registry:gen` in the opaline repo again, so `registry.json` goes back to the production URL before you commit.

## Pull requests

- Fill in the [pull request template](./pull_request_template.md) and link the issue (`Closes #123`).
- Add before/after screenshots or a short recording for visual changes, in light and dark mode.
- CI must pass: typecheck, build, registry validation, and an up-to-date `registry.json`.
- Use a Conventional Commit style title, e.g. `feat(glass-otp): add a paste button`.
- A maintainer reviews every PR. Address feedback with new commits rather than force-pushing, so the review history stays readable.

## Releases

Maintainers cut releases. Opaline follows [Semantic Versioning](https://semver.org/):

| Change | Version bump |
| --- | --- |
| Breaking change to a component's props or behaviour | Major (minor while on `0.x`) |
| New component or feature | Minor |
| Fixes and docs | Patch |

To release:

1. Move the entries under `## [Unreleased]` in [`CHANGELOG.md`](../CHANGELOG.md) into a new `## [x.y.z] - YYYY-MM-DD` section, and update the links at the bottom.
2. Set the same version in `package.json`.
3. Merge that to `main`, then tag it:

   ```bash
   git tag vx.y.z
   git push upstream vx.y.z
   ```

The [Release workflow](./workflows/release.yml) checks the tag matches `package.json` and publishes a GitHub release with the changelog section and the list of merged pull requests.

Contributors don't need to edit the changelog: maintainers add entries when merging.

## Maintainers

| | |
| --- | --- |
| [@Abhishek-Mallick](https://github.com/Abhishek-Mallick) | Creator and lead maintainer |
| [@deepraj21](https://github.com/deepraj21) | Maintainer |

Maintainers review pull requests, triage issues and cut releases. Code ownership is defined in [`CODEOWNERS`](./CODEOWNERS).

## Code of conduct

By taking part you agree to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).
