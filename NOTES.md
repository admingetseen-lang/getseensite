# Projekt-Notizen & Übergabe

> Arbeitsstand-Notizen für den nächsten Claude-Code-/Entwickler-Durchgang.
> Zuletzt aktualisiert: 2026-07-20.

## Branch- & Deploy-Situation

- **Default-/Arbeits-Branch:** `claude/dazzling-mayer-id977y`. Zusätzlich existiert
  `main` — beide zeigen aktuell auf denselben Commit und werden vom Pages-Workflow
  gebaut (`.github/workflows/deploy-pages.yml` triggert auf beide).
- Beim Weiterarbeiten am besten **beide Branches synchron halten** (oder mit dem
  Team klären, welcher künftig führend sein soll — zwei deploy-fähige Branches sind
  auf Dauer verwirrend).
- **Live-Vorschau (GitHub Pages):** https://admingetseen-lang.github.io/getseensite/
- **Ziel:** später `getseen.shop` mit dieser Seite ersetzen. Der gebaute `dist/` ist
  ins Repo committet; Configs für Vercel / Netlify / GitHub Pages liegen bereit
  (siehe `README.md` → Deploy). Für den Custom-Domain-/Netlify-/Vercel-Build ist
  `dist/` auf Root-Base (`/`) gebaut; GitHub Pages baut in CI mit Subpath-Base neu.

## In dieser Session umgesetzt

1. **Glas-Robustheit & Barrierefreiheit** (`src/index.css`): `@supports`-Fallback für
   fehlendes `backdrop-filter` (ältere Safari/Firefox, In-App-Browser) + Support für
   `prefers-reduced-transparency`. Navbar-Scroll-Glas als zentrale `.glass-nav`-Klasse.
2. **Favicon & Logo** (`public/favicon-*.png`, `public/apple-touch-icon.png`,
   `public/brand/getseen.png`, `index.html`, `public/site.webmanifest`): echtes
   Eye-G-Logo, ®-Zusatz entfernt (verursachte schiefe Darstellung), zentriert, alle
   gängigen Größen. Cache-Version `?v=3`.
3. **Fonts selbst gehostet (DSGVO)** (`src/fonts/*.woff2`, `src/index.css`,
   `tailwind.config.ts`, `index.html`): Clash Display + Satoshi als Variable-Fonts
   lokal via `@font-face`. Externe Links zu Fontshare & Google Fonts entfernt →
   keine IP-Übertragung an Dritte. Fallback verschlankt auf `system-ui`.
4. **OpenStreetMap-Karte auf Klick-Einwilligung** (`src/pages/Kontakt.tsx`): Karte
   lädt erst nach aktivem Klick auf „Karte laden" → vorher 0 Requests an OSM.
5. **Navbar-Links in der Glasleiste zentriert** (`src/components/Navbar.tsx`):
   absolute Zentrierung, Logo links, CTA rechts.
6. **Rechtstexte-Datenschutz angepasst** (`src/pages/Legal.tsx`): Webfonts-Abschnitt
   auf lokales Hosting, OSM-Abschnitt auf Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
7. **Doku-Palette korrigiert** (`BRIEF.md`, `README.md`): von hellem `#FAFAF8` auf die
   real ausgelieferten **dunklen** Tokens (`bg #0B0C11`, `ink #F3F4F8`, `paper #13141B`,
   `line #262833`, `accent #1F3BFF`). Der `README.md`-Hinweis auf „placeholder legal
   copy" ist **veraltet** — die Rechtstexte sind inhaltlich vollständig gefüllt.

## Datenschutz-Status

Beim normalen Seitenaufruf werden **keine externen Third-Party-Requests** mehr
ausgelöst, die eine IP ohne Zustimmung übertragen (Fonts lokal, Karte erst auf Klick,
keine Cookies/Tracking/Analytics). Das passt zur „DSGVO-konform"-Botschaft der Marke.

## Offene Punkte vor dem Go-live

- [ ] **Anwaltliche Gegenlesung der Rechtstexte** (Impressum, Datenschutz, AGB,
      Widerruf in `src/pages/Legal.tsx`). Inhaltlich vollständig und mit echten
      Firmendaten (HRB 34815, USt-ID DE463075770), aber die formale Freigabe sollte
      ein Anwalt/Steuerberater geben.
- [ ] **Domain-Umzug** auf `getseen.shop` inkl. Meta-`canonical`/OG-URLs prüfen
      (in `index.html` bereits auf `https://www.getseen.shop/` gesetzt).
- [ ] **Performance-Pass**, v. a. `backdrop-filter` (Glas) auf schwächeren
      Android-Geräten — viele Glas-Instanzen sind GPU-teuer. Optional Lighthouse-Lauf.
- [ ] **Inhalts-Check**: Team-Fotos (`public/brand/team-{1,2,3}.jpg`) und Videos
      (`public/media/`) auf finale Assets prüfen. Hero nutzt bewusst die animierte
      Gradient-Mesh statt Video (`HERO_VIDEO = null` in `HeroBackground.tsx`).

## Konventionen (nicht vergessen)

- Nach Änderungen an `src/` **immer `npm run build`** laufen lassen — der gebaute
  `dist/` ist eingecheckt und muss aktuell bleiben, sonst deployt die alte Version.
- Motion-Regeln strikt beachten: siehe `CLAUDE.md` (nur `src/lib/motion.ts`-Primitives,
  Easing `[0.16, 1, 0.3, 1]`, nur transform/opacity animieren, `useReducedMotion()`).
- Import-Alias `@/` → `src`.
