import { Link } from "react-router-dom";
import { Reveal, Stagger } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { fadeUp } from "../lib/motion";
import { IconWeb, IconAi, IconArrow } from "../components/Icons";

const SERVICES = [
  {
    icon: IconWeb,
    title: "Webdesign + SEO-Optimierung",
    body: "Individuelles Design für Ihre Online-Präsenz und bessere Sichtbarkeit in Suchmaschinen.",
    points: ["Maßgeschneidertes Design", "Technisches SEO", "Schnell & mobil-optimiert"],
  },
  {
    icon: IconAi,
    title: "KI-Integration + Marketing",
    body: "KI-Assistenten auf Ihrer Website und als telefonischer Rezeptionist; KI-basiertes Marketing und Social Media als Werbemittel für jüngere Kundschaft.",
    points: ["KI-Assistent & Telefon", "Social-Media-Marketing", "Automatisierte Abläufe"],
  },
];

export function Services() {
  return (
    <section id="leistungen" className="scroll-mt-24 bg-paper/60 py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Leistungen"
          titleLines={["Alles, um online", "sichtbar zu werden."]}
          intro="Zwei Schwerpunkte, ein Ziel: mehr Anfragen für Ihr Unternehmen — mit modernem Design und KI, die Ihnen Arbeit abnimmt."
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2" stagger={0.14}>
          {SERVICES.map((s) => (
            <Reveal
              key={s.title}
              variants={fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-bg p-8 transition-colors duration-300 ease-reveal hover:border-accent/40 sm:p-10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 ease-reveal group-hover:scale-105">
                <s.icon />
              </span>
              <h3 className="mt-7 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-4 text-ink/65">{s.body}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink/70"
                  >
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

              {/* hover wash */}
              <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br from-accent-soft/0 to-accent-soft/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-accent-soft/30" />
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
