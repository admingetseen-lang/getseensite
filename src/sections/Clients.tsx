import { Reveal, Stagger } from "@/components/Reveal";
import { fadeUp } from "@/lib/motion";
import { CLIENTS, PARTNERS } from "@/lib/site";

type Item = {
  readonly name: string;
  readonly url: string;
  readonly logo?: string;
  readonly fullName?: string;
};

function LogoWall({ label, items }: { label: string; items: readonly Item[] }) {
  return (
    <div>
      <Reveal>
        <h3 className="label-mono text-ink/45">{label}</h3>
      </Reveal>
      <Stagger
        className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        stagger={0.06}
      >
        {items.map((it) => (
          <Reveal key={it.name} variants={fadeUp}>
            <a
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={it.fullName ?? it.name}
              title={it.fullName ?? it.name}
              data-cursor="grow"
              className="group flex h-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-center transition-colors duration-300 ease-reveal hover:border-accent/40 hover:bg-white/[0.06]"
            >
              {it.logo ? (
                <img
                  src={`${import.meta.env.BASE_URL}${it.logo}`}
                  alt={it.name}
                  loading="lazy"
                  className="max-h-9 w-auto opacity-80 transition-opacity duration-300 ease-reveal group-hover:opacity-100"
                />
              ) : (
                <span className="font-display text-[0.95rem] font-semibold leading-tight text-ink/55 transition-colors duration-300 ease-reveal group-hover:text-ink">
                  {it.name}
                </span>
              )}
            </a>
          </Reveal>
        ))}
      </Stagger>
    </div>
  );
}

export function Clients() {
  return (
    <section id="referenzen" className="relative scroll-mt-24 overflow-hidden py-section">
      <div className="shell">
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Referenzen
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl font-display text-display-sm text-ink">
            Unternehmen, die auf GetSeen setzen.
          </h2>
        </Reveal>

        <div className="mt-12 space-y-12">
          <LogoWall label="Kunden" items={CLIENTS} />
          <LogoWall label="Partner & Förderer" items={PARTNERS} />
        </div>
      </div>
    </section>
  );
}
