import { PageHeader } from "../components/PageHeader";
import { Reveal, Stagger } from "../components/Reveal";
import { fadeUp } from "../lib/motion";
import { EXTERNAL } from "../lib/site";
import {
  IconWeb,
  IconSeo,
  IconAi,
  IconMegaphone,
  IconArrow,
} from "../components/Icons";

const DETAIL = [
  {
    icon: IconWeb,
    title: "Webdesign",
    body: "Individuelles, modernes Design, das zu Ihrem Betrieb passt — schnell, mobil-optimiert und auf Conversions ausgelegt.",
  },
  {
    icon: IconSeo,
    title: "SEO-Optimierung",
    body: "Bessere Sichtbarkeit in Suchmaschinen, damit Kunden Sie genau dort finden, wo sie suchen — lokal und überregional.",
  },
  {
    icon: IconAi,
    title: "KI-Integration",
    body: "KI-Assistenten auf Ihrer Website und als telefonischer Rezeptionist nehmen Ihnen Routineaufgaben ab — rund um die Uhr.",
  },
  {
    icon: IconMegaphone,
    title: "Marketing & Social Media",
    body: "KI-basiertes Marketing und Social Media als Werbemittel, um auch jüngere Kundschaft gezielt zu erreichen.",
  },
];

const STEPS = [
  { n: "01", t: "Kennenlernen", d: "Wir besprechen Ihre Ziele und Ihren Bedarf — unverbindlich." },
  { n: "02", t: "Konzept & Design", d: "Sie erhalten ein maßgeschneidertes Konzept und eine Live-Demo." },
  { n: "03", t: "Umsetzung", d: "Wir bauen Ihre Website inkl. SEO und KI-Funktionen." },
  { n: "04", t: "Live & Betreuung", d: "Launch, Optimierung und laufende Unterstützung." },
];

export default function Leistungen() {
  return (
    <>
      <PageHeader
        eyebrow="Leistungen"
        title="Webdesign, SEO und KI — aus einer Hand."
        intro="Von der ersten Idee bis zum laufenden Betrieb: Wir machen Ihr Unternehmen online sichtbar und nehmen Ihnen mit KI Arbeit ab."
      />

      <section className="shell pb-section">
        <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
          {DETAIL.map((d) => (
            <Reveal
              key={d.title}
              variants={fadeUp}
              className="group rounded-3xl border border-line bg-paper p-8 transition-colors duration-300 ease-reveal hover:border-accent/40"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 ease-reveal group-hover:scale-105">
                <d.icon />
              </span>
              <h2 className="mt-6 font-display text-2xl font-semibold">{d.title}</h2>
              <p className="mt-3 text-ink/65">{d.body}</p>
            </Reveal>
          ))}
        </Stagger>
      </section>

      {/* Process */}
      <section className="bg-paper/60 py-section">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Ablauf</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display-sm">In vier Schritten zur neuen Website.</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {STEPS.map((s) => (
              <Reveal key={s.n} variants={fadeUp} className="border-t border-ink/15 pt-5">
                <span className="font-display text-3xl font-semibold text-accent">{s.n}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-ink/60">{s.d}</p>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="shell py-section">
        <Reveal className="flex flex-col items-start gap-6 rounded-[2rem] border border-line bg-ink p-10 text-bg sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Lust auf einen Auftritt, der auffällt?
            </h2>
            <p className="mt-3 text-bg/60">Starten Sie mit einer kostenlosen Live-Demo.</p>
          </div>
          <a
            href={EXTERNAL.liveDemo}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-white transition-colors duration-300 ease-reveal hover:bg-accent-ink"
            data-cursor="grow"
          >
            Demo erstellen
            <IconArrow className="h-5 w-5 transition-transform duration-300 ease-reveal group-hover:translate-x-1" />
          </a>
        </Reveal>
      </section>
    </>
  );
}
