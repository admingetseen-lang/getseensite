# GetSeen — Flagship Website

Premium, scroll-driven marketing site for **GetSeen UG (haftungsbeschränkt)** —
modern AI-powered web design, SEO and automation for local businesses.
German-first, structured for a later English toggle.

Built per [`BRIEF.md`](./BRIEF.md).

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** — palette, type scale & spacing as tokens in `tailwind.config.ts`
- **Framer Motion** — entrance, scroll and hover animations
- **Lenis** — smooth inertia scroll
- **React Router** — sub-routes (lazy-loaded)

## Getting started

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Structure

```
src/
  components/   Reveal, Stagger, Navbar, Footer, CustomCursor,
                MagneticButton, CountUp, CloudGraphic, Icons, …
  sections/     Hero, About, Services, Benefits, CloudShowcase, DemoCTA
  pages/        Home, Leistungen, Anfrage, Kontakt, Legal, NotFound
  lib/          SmoothScroll (Lenis), motion tokens, media-preference hooks,
                site content/contact/links (single source of truth)
```

## Design tokens

All in `tailwind.config.ts`:

- `bg #0B0C11` (deep blue-black), `ink #F3F4F8` (near-white), `paper #13141B`
  (raised surface), `line #262833` (muted border) — the site ships a **dark**
  theme; the glass utilities assume this dark ground.
- `accent #1F3BFF` (ultramarine), `accent.soft #141B3D`, `accent.ink #162BBF`
  — **swap `accent.DEFAULT` here** for the official brand hex
- Editorial display type scale, `ease-reveal` cubic-bezier `(0.22, 1, 0.36, 1)`

## Fonts

Primary **Clash Display** + **Satoshi** (Fontshare), with **Space Grotesk** +
**Inter** (Google Fonts) as a guaranteed fallback layer. Loaded in `index.html`.

## Motion & accessibility

- Honours `prefers-reduced-motion` everywhere (Lenis off, reveals render static).
- Custom dot cursor — auto-disabled on touch; global toggle `CUSTOM_CURSOR` in `App.tsx`.
- Semantic HTML, keyboard-navigable, visible focus rings, strong contrast.

## Deploy

The built site is committed under `dist/` and is a single-page app, so the host
needs an **SPA fallback** (all routes → `index.html`). Configs are included:

- **Vercel** — `vercel.json` (rewrites all paths to `index.html`). Import the repo
  or run `vercel`.
- **Netlify** — `netlify.toml` + `public/_redirects`. Set build `npm run build`,
  publish `dist`, or drag-and-drop the `dist/` folder.
- **GitHub Pages** — automated via `.github/workflows/deploy-pages.yml`. It builds
  with `BASE_PATH=/<repo>/` so assets resolve under the project subpath, and
  client routing uses that base (`BrowserRouter basename`). `dist/404.html` +
  `.nojekyll` make deep links work. **One-time setup:** repo → Settings → Pages →
  *Source: GitHub Actions*. The workflow then runs on push and publishes to
  `https://<owner>.github.io/<repo>/`.
  > The committed `dist/` is built at root (`/`) for custom-domain / Netlify /
  > Vercel; GitHub Pages is rebuilt in CI with the subpath base. To deploy
  > elsewhere at a subpath, set `BASE_PATH` when building.

Quick local check of the production build: `npm run preview`.

## Drop-in assets (optional)

- **Hero video:** add `public/media/hero.mp4` and set `HERO_VIDEO` in
  `src/components/HeroBackground.tsx` (animated gradient mesh is the fallback).
- **Team photos:** replace the placeholders in `src/sections/About.tsx`.
- **Brand accent:** change `accent.DEFAULT` in `tailwind.config.ts`.
- **Logo:** swap the SVG in `src/components/Logo.tsx` / `public/favicon.svg`.

> Legal pages (Impressum, Datenschutz, AGB, Widerruf) contain placeholder copy
> marked in-page — replace with legally reviewed text before launch.
