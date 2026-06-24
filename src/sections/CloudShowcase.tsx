import { Reveal, Stagger } from "../components/Reveal";
import { Logo } from "../components/Logo";
import { CountUp } from "../components/CountUp";
import { CloudGraphic } from "../components/CloudGraphic";
import { fadeUp, fadeUpLg } from "../lib/motion";
import { EXTERNAL } from "../lib/site";
import {
  IconAi,
  IconLock,
  IconShare,
  IconHistory,
  IconFile,
  IconShield,
  IconArrow,
} from "../components/Icons";

type Stat =
  | { kind: "count"; value: number; suffix: string; label: string }
  | { kind: "badge"; text: string; label: string };

const STATS: Stat[] = [
  { kind: "count", value: 100, suffix: " %", label: "europäische Server" },
  { kind: "badge", text: "DSGVO", label: "konform & zertifiziert" },
  { kind: "count", value: 256, suffix: "-bit", label: "AES-Verschlüsselung" },
  { kind: "badge", text: "v1.0.0", label: "Release" },
];

const FEATURES = [
  { icon: IconAi, title: "KI-Assistent", body: "Intelligente Hilfe direkt in Ihrer Cloud." },
  { icon: IconLock, title: "Verschlüsselter Tresor", body: "Sensible Dateien mit AES-256 geschützt." },
  { icon: IconShare, title: "Teilen per Link", body: "Sicher und kontrolliert freigeben." },
  { icon: IconHistory, title: "Versions-Historie", body: "Jede Änderung nachvollziehbar." },
  { icon: IconFile, title: "Datei-Vorschau", body: "PDF, Bilder, Video, Audio, Office." },
  { icon: IconShield, title: "2-Faktor-Authentifizierung", body: "Zusätzlicher Schutz für Ihr Konto." },
];

export function CloudShowcase() {
  return (
    <section id="cloud" className="scroll-mt-24 bg-ink py-section text-bg">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow !text-bg/60">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Eigenständiges Produkt
              </span>
            </Reveal>
            <Reveal delay={0.04}>
              <div className="mt-5">
                <Logo variant="cloud" className="[&_span]:!text-bg" />
              </div>
            </Reveal>
            <Reveal variants={fadeUpLg} delay={0.08}>
              <h2 className="mt-6 font-display text-display-sm text-bg">
                European-first Cloud — <span className="text-accent">Made in Germany.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 font-display text-xl text-bg/80">
                Deine Daten. Deine Kontrolle.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-prose text-lg text-bg/60">
                Sicherer Cloud-Speicher, KI-Workloads und Compute-Infrastruktur mit
                deutschen Datenschutzstandards — die DSGVO-konforme Alternative.
                <span className="mt-2 block text-base text-bg/45">
                  Ein separates Produkt von GetSeen — unabhängig von unseren
                  Web-Leistungen. Kein Website-Baukasten, sondern Speicher &amp;
                  Infrastruktur.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href={EXTERNAL.cloud}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-white transition-colors duration-300 ease-reveal hover:bg-accent-ink"
                data-cursor="grow"
              >
                GetSeen Cloud entdecken
                <IconArrow className="h-5 w-5 transition-transform duration-300 ease-reveal group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <CloudGraphic />
          </Reveal>
        </div>

        {/* Stat counters */}
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-bg/10 bg-bg/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {STATS.map((s) => (
            <Reveal
              key={s.label}
              variants={fadeUp}
              className="bg-ink p-7"
            >
              <div className="font-display text-4xl font-semibold text-bg">
                {s.kind === "count" ? (
                  <CountUp value={s.value} suffix={s.suffix} />
                ) : (
                  <span className="text-accent">{s.text}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-bg/55">{s.label}</p>
            </Reveal>
          ))}
        </Stagger>

        {/* Feature cards */}
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {FEATURES.map((f) => (
            <Reveal
              key={f.title}
              variants={fadeUp}
              className="group rounded-3xl border border-bg/10 bg-bg/[0.04] p-7 transition-colors duration-300 ease-reveal hover:border-accent/40 hover:bg-bg/[0.07]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent transition-transform duration-300 ease-reveal group-hover:scale-105">
                <f.icon />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-bg">{f.title}</h3>
              <p className="mt-2 text-sm text-bg/55">{f.body}</p>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
