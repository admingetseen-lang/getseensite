import { Reveal } from "../components/Reveal";
import { fadeUpLg } from "../lib/motion";
import { EXTERNAL } from "../lib/site";
import { IconArrow } from "../components/Icons";

export function DemoCTA() {
  return (
    <section className="shell py-section">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-paper px-6 py-16 text-center sm:px-12 sm:py-20">
        {/* soft accent glows */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

        <Reveal>
          <span className="eyebrow">Live Demo</span>
        </Reveal>
        <Reveal variants={fadeUpLg} delay={0.05}>
          <h2 className="mx-auto mt-5 max-w-2xl text-display-sm">
            Sehen Sie Ihre neue Website — in Minuten.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-prose text-lg text-ink/65">
            Erstellen Sie eine kostenlose Live-Demo und erleben Sie, wie Ihr
            Auftritt mit GetSeen aussehen könnte.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href={EXTERNAL.liveDemo}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-medium text-white transition-colors duration-300 ease-reveal hover:bg-accent-ink"
            data-cursor="grow"
          >
            Demo erstellen
            <IconArrow className="h-5 w-5 transition-transform duration-300 ease-reveal group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
