import { Reveal, Stagger } from "../components/Reveal";
import { TextReveal } from "../components/TextReveal";
import { fadeUp } from "../lib/motion";

// Photo-to-role mapping: swap the `photo` values if the order is off.
const TEAM = [
  { role: "Informatik", focus: "Technik & KI-Integration", photo: "brand/team-1.jpg" },
  { role: "Handelsmanagement", focus: "Strategie & Kundenbetreuung", photo: "brand/team-2.jpg" },
  { role: "E-Commerce", focus: "Marketing & Sichtbarkeit", photo: "brand/team-3.jpg" },
];

export function About() {
  return (
    <section id="ueber-uns" className="shell scroll-mt-24 py-section">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="eyebrow">Über uns</span>
          </Reveal>
          <h2 className="mt-4 text-display-sm">
            <TextReveal lines={["Ein junges Team,", "das anpackt."]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-prose text-lg text-ink/70">
              Wir sind 3 Studenten aus den Bereichen{" "}
              <span className="text-ink">Informatik</span>,{" "}
              <span className="text-ink">Handelsmanagement</span> und{" "}
              <span className="text-ink">E-Commerce</span> und helfen Ihrem
              Unternehmen, online sichtbar zu werden und Prozesse zu optimieren.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-3" stagger={0.12}>
          {TEAM.map((m) => (
            <Reveal
              key={m.role}
              variants={fadeUp}
              className="glass group flex flex-col p-6"
            >
              <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src={`${import.meta.env.BASE_URL}${m.photo}`}
                  alt={`Teammitglied — ${m.role}`}
                  width={600}
                  height={750}
                  className="h-full w-full object-cover transition-transform duration-500 ease-reveal group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <span className="font-display text-base font-semibold leading-tight hyphens-auto [overflow-wrap:anywhere]" lang="de">
                {m.role}
              </span>
              <span className="mt-1 text-sm text-ink/55">{m.focus}</span>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
