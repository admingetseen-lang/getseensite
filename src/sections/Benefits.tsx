import { Link } from "react-router-dom";
import { Reveal, Stagger } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { fadeUp } from "../lib/motion";

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

      <Stagger className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {BENEFITS.map((b, i) => (
          <Reveal
            key={b.title}
            variants={fadeUp}
            className="glass glass-hover group flex flex-col p-8"
          >
            <span className="font-display text-sm font-medium text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold">{b.title}</h3>
            <p className="mt-3 text-ink/65">{b.body}</p>
          </Reveal>
        ))}

        {/* trailing CTA tile filling the grid */}
        <Reveal
          variants={fadeUp}
          className="flex flex-col justify-center rounded-3xl border border-white/20 bg-accent/90 p-8 text-white shadow-[0_8px_32px_rgba(31,59,255,0.35)] backdrop-blur-xl"
        >
          <h3 className="font-display text-xl font-semibold">
            Bereit, sichtbar zu werden?
          </h3>
          <Link
            to="/anfrage"
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-accent"
            data-cursor="grow"
          >
            Anfrage starten
          </Link>
        </Reveal>
      </Stagger>
      </div>
    </section>
  );
}
