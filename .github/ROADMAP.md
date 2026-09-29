# Opaline roadmap

Internal action items for the core maintainers ([@Abhishek-Mallick](https://github.com/Abhishek-Mallick), [@deepraj21](https://github.com/deepraj21)). Contributors: please pick up work from [issues](https://github.com/deepraj21/opaline/issues) instead. Shipped work is recorded in [`CHANGELOG.md`](../CHANGELOG.md).

## v0.1.0 release
- [ ] Merge the release PR, then tag it: `git tag v0.1.0 && git push upstream v0.1.0` (the Release workflow publishes the notes)
- [ ] Smoke test the zero-config install in a fresh app: `npx shadcn@latest add @opaline/glass-button`
- [ ] Pin the release in the repo, and share it

## Repository
- [ ] Settings → About: description, website, topics (`react`, `shadcn`, `tailwindcss`, `liquid-glass`, `glassmorphism`, `ui-components`)
- [ ] Enable Discussions (the issue template links to it)
- [ ] Protect `main`: require CI and code-owner review, no force pushes
- [ ] Labels: `good first issue`, `help wanted`, `component`, `widget`, `site`, `ignore-for-release`
- [ ] Label 3–5 small, well-scoped issues as `good first issue`

## Next components
- [ ] Glass: date range picker, time picker, color picker
- [ ] Widgets: music, fitness, stocks, photos, reminders
- [ ] Blocks: hero, pricing, auth, lock screen, full macOS desktop

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
