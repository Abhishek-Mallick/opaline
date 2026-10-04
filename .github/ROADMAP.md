# Opaline roadmap

Internal action items for the core maintainers ([@Abhishek-Mallick](https://github.com/Abhishek-Mallick), [@deepraj21](https://github.com/deepraj21)). Contributors: please pick up work from [issues](https://github.com/deepraj21/opaline/issues) instead. Shipped work is recorded in [`CHANGELOG.md`](../CHANGELOG.md).

## Next release (v0.2.0)
- [x] v0.1.0 tagged (check the Release workflow run published it)
- [x] New components: alert, textarea, message, snippet, code block, terminal, accordion, bento grid, tweet card, credit card, QR code, scroll stack; toast upgraded
- [ ] Merge the new-components PR, move `[Unreleased]` to `[0.2.0]`, bump `package.json`, tag `v0.2.0`
- [ ] Smoke test the zero-config install in a fresh app: `npx shadcn@latest add @opaline/glass-button`

## Repository
- [ ] Settings → About: description, website, topics (`react`, `shadcn`, `tailwindcss`, `liquid-glass`, `glassmorphism`, `ui-components`)
- [ ] Enable Discussions (the issue template links to it)
- [ ] Protect `main`: require CI and code-owner review, no force pushes
- [ ] Labels: `good first issue`, `help wanted`, `component`, `widget`, `site`, `ignore-for-release`, and 3–5 small issues labelled `good first issue`

## Next components
- [ ] Inputs: date range picker, time picker, color picker, file dropzone, rating
- [ ] Display: progress / meter, skeleton, avatar group, kbd, hover card, image compare slider
- [ ] Navigation: breadcrumb, pagination, navigation menu, carousel / marquee
- [ ] Widgets: music, fitness, stocks, photos, reminders
- [ ] Blocks: AI chat (message + textarea + code block), pricing, auth, lock screen, changelog wall (tweet cards + bento), full macOS desktop

## Component follow-ups
- [ ] Code block: accept pre-highlighted HTML so server components can skip client-side Shiki
- [ ] QR code: download as SVG / PNG
- [ ] Toast: `toast.custom()` for arbitrary content
- [ ] Terminal: copy button and a `prompt` per line

## Site & docs
- [ ] Let visitors drop in their own wallpaper behind the demos
- [ ] Link each component page to its source on GitHub

## Engineering
- [ ] Pause refraction for off-screen elements (IntersectionObserver)
- [ ] Richer Safari/Firefox fallback; `prefers-reduced-motion` everywhere
- [ ] Playwright visual tests (Chromium + WebKit, light/dark)
- [ ] CI smoke test: install `@opaline/all` into a fresh Next.js app
- [ ] Dependabot for npm and GitHub Actions

## Growth
- [ ] Launch: X thread with screen recordings, Product Hunt, Show HN, r/reactjs
- [ ] Share the refraction write-up (Liquid Glass page) as a blog post
- [ ] List on awesome-shadcn-ui and freefrontend
- [ ] Analytics on copy-command clicks to decide which components to build next
