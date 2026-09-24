# Opaline — TODO

## Launch
- [ ] DNS: CNAME `opaline` → `abhishek-mallick.github.io`
- [ ] Pages: Source = GitHub Actions, custom domain `opaline.buildlab.in`, enforce HTTPS
- [ ] Smoke test: `npx shadcn@latest add https://opaline.buildlab.in/r/all.json` in a fresh app
- [ ] Add MIT `LICENSE`
- [ ] Submit `@opaline` to the shadcn registry directory (`apps/v4/registry/directory.json`)
- [ ] Add og:image and favicon

## Components
- [ ] Glass: sheet/drawer, popover, select, toast, command palette, sidebar
- [ ] Essentials: select, popover, sheet, toast, command, date picker, table, alert-dialog
- [ ] Blocks: hero, pricing, auth, settings, iOS-style widgets

## Site & docs
- [ ] Per-component pages with preview, code and props
- [ ] Glass playground (bezel / refraction / blur / dispersion sliders)
- [ ] ⌘K search and `llms.txt`

## Engineering
- [ ] PR CI: typecheck, build, registry validate
- [ ] Throttle displacement-map regeneration while resizing (dock)
- [ ] Pause refraction for off-screen elements
- [ ] Better Safari/Firefox fallback, and respect `prefers-reduced-motion`
- [ ] Playwright visual tests (Chromium + WebKit, light/dark)

## Marketing
- [ ] Launch: X thread with screen recordings, Product Hunt, Show HN, r/reactjs
- [ ] Write-up: "How liquid glass refraction works on the web"
- [ ] List on awesome-shadcn-ui and freefrontend
- [ ] Analytics on copy-command clicks to decide which components to build next
