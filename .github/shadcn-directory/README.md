# Listing @opaline in the shadcn registry directory

Once listed, `npx shadcn@latest add @opaline/<name>` works with no `components.json` setup.

`entry.json` has been checked against the schema in `apps/v4/lib/registry-directory.ts`
(shadcn-ui/ui, September 2026). `@opaline` is not taken and is not a reserved name.

The logo is a single filled path with `fill-rule='evenodd'` and no colour
attributes. The directory injects it as HTML and applies `fill: var(--foreground)`
and `grayscale`, so it follows light and dark mode there. Viewed on its own, it
renders black. Don't add `fill`, `stroke` or `var(...)` attributes.

1. Make sure https://opaline.buildlab.in/r/registry.json is live.
2. Fork https://github.com/shadcn-ui/ui and create a branch.
3. Add the object from `entry.json` to `apps/v4/registry/directory.json`,
   in alphabetical order (after `@onchain-ui`).
4. Run `pnpm install && pnpm validate:registries` from the repository root.
5. Open a PR titled `feat(registry): add @opaline`.
