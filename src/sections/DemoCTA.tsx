import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { TextReveal } from "../components/TextReveal";
import { IconArrow } from "../components/Icons";

export function DemoCTA() {
  return (
    <section className="shell py-section">
      <div className="glass relative overflow-hidden !rounded-[2rem] px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#7C5CFF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#36B6FF]/20 blur-3xl" />

        <Reveal>
          <span className="eyebrow">Live Demo</span>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-2xl text-display-sm">
          <TextReveal lines={["Sehen Sie Ihre neue", "Website — in Minuten."]} />
        </h2>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-prose text-lg text-ink/65">
            Erstellen Sie eine kostenlose Live-Demo und erleben Sie, wie Ihr
            Auftritt mit GetSeen aussehen könnte.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            to="/demo"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-medium text-white transition-colors duration-300 ease-reveal hover:bg-accent-ink"
            data-cursor="grow"
          >
            Demo erstellen
            <IconArrow className="h-5 w-5 transition-transform duration-300 ease-reveal group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
