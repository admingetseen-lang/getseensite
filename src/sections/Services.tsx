import { Link } from "react-router-dom";
import { Reveal, Stagger } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { SpotlightCard } from "../components/SpotlightCard";
import { fadeUp } from "../lib/motion";
import { IconArrow } from "../components/Icons";

const SERVICES = [
  {
    index: "01",
    title: "Webdesign + SEO-Optimierung",
    body: "Individuelles Design für Ihre Online-Präsenz und bessere Sichtbarkeit in Suchmaschinen.",
    points: ["Maßgeschneidertes Design", "Technisches SEO", "Schnell & mobil-optimiert"],
  },
  {
    index: "02",
    title: "KI-Integration + Marketing",
    body: "KI-Assistenten auf Ihrer Website und als telefonischer Rezeptionist; KI-basiertes Marketing und Social Media als Werbemittel für jüngere Kundschaft.",
    points: ["KI-Assistent & Telefon", "Social-Media-Marketing", "Automatisierte Abläufe"],
  },
];

export function Services() {
  return (
    <section id="leistungen" className="relative scroll-mt-24 overflow-hidden py-section">
      <div aria-hidden className="glow-field" />
      <div className="shell">
        <SectionHeading
          eyebrow="Leistungen"
          titleLines={["Alles, um online", "sichtbar zu werden."]}
          intro="Zwei Schwerpunkte, ein Ziel: mehr Anfragen für Ihr Unternehmen — mit modernem Design und KI, die Ihnen Arbeit abnimmt."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.14}>
          {SERVICES.map((s) => (
            <Reveal key={s.title} variants={fadeUp}>
              <SpotlightCard className="glass glass-hover group flex h-full flex-col p-8 sm:p-10">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label-mono text-accent/80">{s.index}</span>
                  <span className="hairline max-w-[60%]" aria-hidden />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold leading-snug">
                  {s.title}
                </h3>
                <p className="mt-4 text-ink/55">{s.body}</p>

                <ul className="mt-8 flex-1">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 border-t border-white/10 py-3 text-[0.95rem] text-ink/75 last:border-b"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/leistungen"
                  className="mt-8 inline-flex items-center gap-2 font-medium text-accent"
                  data-cursor="grow"
                >
                  <span className="link-underline">Mehr erfahren</span>
                  <IconArrow className="h-5 w-5 transition-transform duration-300 ease-reveal group-hover:translate-x-1" />
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
