import { Link } from "react-router-dom";
import { Reveal, Stagger } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { fadeUp } from "../lib/motion";
import { IconArrow } from "../components/Icons";

const BENEFITS = [
  {
    title: "Mehr Anfragen, weniger Aufwand",
    body: "Ihre Website arbeitet rund um die Uhr für Sie.",
  },
  {
    title: "Moderne Außenwirkung",
    body: "Ein Auftritt, der zu einem Top-Betrieb passt.",
  },
  {
    title: "Automatisierte Prozesse",
    body: "KI-Assistent und telefonischer Rezeptionist nehmen Ihnen Routine ab.",
  },
  {
    title: "Lokal gefunden werden",
    body: "SEO bringt Sie bei Google nach vorne, genau dort, wo Ihre Kunden suchen.",
  },
  {
    title: "Alles aus einer Hand",
    body: "Webdesign, KI und Marketing von einem jungen, eingespielten Team.",
  },
];

export function Benefits() {
  return (
    <section id="vorteile" className="relative scroll-mt-24 overflow-hidden py-section">
      <div aria-hidden className="glow-field">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-accent-soft/40 to-bg" />
      </div>
      <div className="shell">
        <SectionHeading
          eyebrow="Vorteile"
          titleLines={["Warum Unternehmen", "mit uns arbeiten."]}
        />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          {/* editorial numbered list */}
          <Stagger as="ul" className="group/list" stagger={0.07}>
            {BENEFITS.map((b, i) => (
              <Reveal
                key={b.title}
                as="li"
                variants={fadeUp}
                className="group border-t border-white/10 py-7 transition-opacity duration-300 last:border-b hover:!opacity-100 group-hover/list:opacity-50"
              >
                <div className="grid gap-2 sm:grid-cols-[3.5rem_16rem_1fr] sm:gap-6">
                  <span className="label-mono pt-1 text-accent/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-ink/55 sm:pt-0.5">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </Stagger>

          {/* quiet CTA panel */}
          <Reveal className="glass relative overflow-hidden p-8 lg:sticky lg:top-28">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(31,59,255,0.7), transparent)",
              }}
            />
            <span className="label-mono">Nächster Schritt</span>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-snug">
              Bereit, sichtbar
              <br />
              zu werden?
            </h3>
            <p className="mt-3 text-ink/55">
              Unverbindlich anfragen — wir melden uns innerhalb von 24 Stunden.
            </p>
            <Link
              to="/anfrage"
              className="group mt-7 inline-flex items-center gap-2 font-medium text-accent"
              data-cursor="grow"
            >
              <span className="link-underline">Anfrage starten</span>
              <IconArrow className="h-5 w-5 transition-transform duration-300 ease-reveal group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
