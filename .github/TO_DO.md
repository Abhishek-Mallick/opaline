# Opaline — TODO

## Launch
- [ ] DNS: CNAME `opaline` → `abhishek-mallick.github.io`
- [ ] Pages: Source = GitHub Actions, custom domain `opaline.buildlab.in`, enforce HTTPS
- [ ] Smoke test: `npx shadcn@latest add https://opaline.buildlab.in/r/all.json` in a fresh app
- [ ] Submit `@opaline` to the shadcn directory (see `.github/shadcn-directory/`)

## Components
- [ ] Glass: context menu, date picker, stepper, segmented picker with icons
- [ ] Widgets: weather, calendar, battery (iOS widget sizes)
- [ ] Blocks: hero, pricing, auth, control center, lock screen

## Site & docs
- [ ] Props table on each component page
- [ ] Glass playground (bezel / refraction / blur / dispersion sliders)
- [ ] Let visitors drop in their own wallpaper behind the demos

## Engineering
- [ ] Pause refraction for off-screen elements (IntersectionObserver)
- [ ] Better Safari/Firefox fallback, and respect `prefers-reduced-motion`
- [ ] Playwright visual tests (Chromium + WebKit, light/dark)
- [ ] CI smoke test that installs `@opaline/all` into a fresh Next.js app

## Marketing
- [ ] Launch: X thread with screen recordings, Product Hunt, Show HN, r/reactjs
- [ ] Write-up: "How liquid glass refraction works on the web"
- [ ] List on awesome-shadcn-ui and freefrontend
- [ ] Analytics on copy-command clicks to decide which components to build next
