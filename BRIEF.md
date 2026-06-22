Claude Code Brief — GetSeen Flagship Website (Interactive Rebuild)

Target: a redesigned, premium-interactive version of getseen.shop (the GetSeen agency/brand site, currently on the Zyro builder).

## Project

Rebuild the GetSeen marketing website with the "interactive, premium" feel of high-end agency/designer sites (think Awwwards-tier: smooth inertia scroll, tasteful scroll-triggered reveals, refined hover micro-interactions, considered easing). The aesthetic is restrained, modern and trustworthy — strong typography, generous whitespace, motion that feels intentional, never flashy. GetSeen sells modern AI-powered web design, so this site is the proof: a local business owner should think "I want a site like this."

What we're building: The GetSeen flagship website — a long, scroll-driven single-page home plus a few sub-routes (Leistungen, Anfrage, Kontakt).
Audience: German local small & mid-sized businesses (Handwerk, Gastronomie, lokale Dienstleister), often older owners. Impressive but never alienating — clarity and trust first, motion as polish. "Tasteful interactive" tier, NOT maximalist dark-luxury.
Language: German is primary; structure it so an English toggle can be added later (the current site has /en).

## Look & feel (final — build to this)

Palette: warm off-white #FAFAF8 (background) and near-black #0E0E0E (ink). One accent only: ultramarine #1F3BFF, used sparingly for CTAs, links, key highlights and the animated stat counters. Add a soft "paper" card tone #F2F1ED and a muted border #E4E3DE.

Typography:
- Headings: Clash Display (Fontshare)
- Body/UI: Satoshi (Fontshare)
- Fontshare: https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap
- Large, tight-leading display scale for headlines; comfortable body size (17–18px).

Motion stance: Framer Motion + smooth scroll. No full WebGL/Three.js. Hero "wow" = muted abstract background video + staggered type reveal + subtle animated grain/gradient overlay.

## Tech stack (use exactly this)
- Vite + React + TypeScript
- Tailwind CSS — palette, type scale and spacing as tokens in config
- Framer Motion — all entrance, scroll, and hover animations
- Lenis for smooth inertia scroll
- React Router for the sub-routes
- GetSeen Cloud section visual: abstract graphic animated with Framer Motion (sync/lock/file motif). Lottie optional later.

## Motion principles
- Easing: cubic-bezier [0.22, 1, 0.36, 1] for reveals.
- Durations: entrance reveals 0.6–0.9s; hover transitions 0.2–0.4s.
- Scroll reveals: fade + translate up ~20–40px (whileInView, viewport once, margin -10%); stagger grouped children.
- Hover: animated link underlines; subtle magnetic/scale on buttons; images scale 1.0→1.04 inside overflow-hidden.
- Hero: staggered line reveal on load, muted looping abstract background video, grain/gradient overlay, scroll cue.
- Stat counters: count up when scrolled into view.
- Section rhythm: one or two sticky/pinned moments max.
- Custom cursor: minimal dot that grows on interactive elements; auto-disabled on touch; global toggle.

## Performance & accessibility (non-negotiable)
- Respect prefers-reduced-motion.
- Lazy-load images with explicit width/height.
- Mobile: smooth reveals, reduce parallax, disable custom cursor on touch.
- Semantic HTML, keyboard-navigable, strong contrast.
- Lean bundle.

## Build order
1. Scaffold Vite + React + TS + Tailwind; fonts + tokens; dev server running.
2. Global Lenis smooth scroll + reusable <Reveal> component.
3. Hero (type animation + background video + grain overlay).
4. Remaining home sections one by one.
5. Sub-routes (Leistungen, Anfrage, Kontakt).
6. Custom cursor.
7. Responsiveness, reduced-motion, performance pass.

## Content (real GetSeen info)

Company: GetSeen UG (haftungsbeschränkt)
Hero headline: "Online sichtbar und effizient werden"
Hero subline: Wir helfen Ihnen, mit KI mehr Kunden zu gewinnen.
Primary CTAs: „Demo erstellen" (→ Live Demo) and „Mehr erfahren" (→ Leistungen).

About / Team:
"Wir sind 3 Studenten aus den Bereichen Informatik, Handelsmanagement und E-Commerce und helfen Ihrem Unternehmen, online sichtbar zu werden und Prozesse zu optimieren."

Services (Leistungen):
- Webdesign + SEO-Optimierung — Individuelles Design für Ihre Online-Präsenz und bessere Sichtbarkeit in Suchmaschinen.
- KI-Integration + Marketing — KI-Assistenten auf Ihrer Website und als telefonischer Rezeptionist; KI-basiertes Marketing und Social Media als Werbemittel für jüngere Kundschaft.

Vorteile:
- Mehr Anfragen, weniger Aufwand — Ihre Website arbeitet rund um die Uhr für Sie.
- Moderne Außenwirkung — ein Auftritt, der zu einem Top-Betrieb passt.
- Automatisierte Prozesse — KI-Assistent und telefonischer Rezeptionist nehmen Ihnen Routine ab.
- Lokal gefunden werden — SEO bringt Sie bei Google nach vorne.
- Alles aus einer Hand — Webdesign, KI und Marketing von einem jungen, eingespielten Team.

Flagship product showcase — GetSeen Cloud (links to getseen.cloud):
- Positioning: "European-first Cloud — Made in Germany. Deine Daten. Deine Kontrolle."
- DSGVO-konforme Alternative: sicherer Cloud-Speicher, KI-Workloads und Compute-Infrastruktur mit deutschen Datenschutzstandards.
- Stat counters: 100 % europäische Server · DSGVO-konform & zertifiziert · 256-bit AES-Verschlüsselung · Release v1.0.0.
- Feature cards: KI-Assistent · Verschlüsselter Tresor (AES-256) · Teilen per Link · Versions-Historie · Datei-Vorschau (PDF, Bilder, Video, Audio, Office) · 2-Faktor-Authentifizierung.
- CTA: „GetSeen Cloud entdecken" → https://www.getseen.cloud

Live Demo CTA section: „Demo erstellen" → https://www.getseen.shop/live-demo

Contact / footer:
- E-Mail: info@getseen.shop
- Telefon: +49 8062 7014761 (Festnetz) · +49 172 5238999 (mobil)
- Adresse: Gewerbepark Bwb 2, 83052 Bruckmühl
- Socials: Instagram @getseen.shop · TikTok @getseen.shop · Facebook · LinkedIn (GetSeen UG) · PayPal (paypal.me/getseenug)
- Legal routes: Impressum, Datenschutz, AGB, Widerruf/Rückerstattung
- © 2026 GetSeen UG (haftungsbeschränkt)

Home section order:
Hero → Über uns / Team → Leistungen → Vorteile → GetSeen Cloud Showcase → Live-Demo-CTA → Kontakt/Footer.
