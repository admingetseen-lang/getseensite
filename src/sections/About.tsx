import { Reveal, Stagger } from "../components/Reveal";
import { TextReveal } from "../components/TextReveal";
import { fadeUp } from "../lib/motion";

const TEAM = [
  { role: "Informatik", focus: "Technik & KI-Integration" },
  { role: "Handelsmanagement", focus: "Strategie & Kundenbetreuung" },
  { role: "E-Commerce", focus: "Marketing & Sichtbarkeit" },
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
              className="group flex flex-col rounded-3xl border border-line bg-paper p-6"
            >
              {/* Team photo placeholder — drop a real photo in later */}
              <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-accent-soft to-paper">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-4xl text-accent/30">
                    {m.role.charAt(0)}
                  </span>
                </div>
              </div>
              <span className="font-display text-base font-semibold leading-tight hyphens-auto" lang="de">
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
