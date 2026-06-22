import SmoothScroll from "./lib/SmoothScroll";
import { Reveal, Stagger } from "./components/Reveal";
import { fadeUp } from "./lib/motion";

export default function App() {
  return (
    <SmoothScroll>
      <main className="shell space-y-section py-section">
        <header className="flex min-h-[60vh] flex-col items-start justify-center gap-6">
          <span className="eyebrow">GetSeen · Flagship</span>
          <Reveal>
            <h1 className="text-display-md max-w-[14ch]">
              Online sichtbar und effizient werden
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-prose text-lg text-ink/70">
              Section 2 läuft: Lenis Smooth-Scroll und die wiederverwendbare
              Reveal-Animation sind verdrahtet. Scroll runter, um die Reveals zu
              sehen.
            </p>
          </Reveal>
        </header>

        <Stagger className="grid gap-6 sm:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Reveal
              key={n}
              variants={fadeUp}
              className="rounded-2xl border border-line bg-paper p-8"
            >
              <span className="text-display-sm">{n}</span>
              <p className="mt-2 text-ink/60">Gestaffeltes Reveal beim Scrollen.</p>
            </Reveal>
          ))}
        </Stagger>
      </main>
    </SmoothScroll>
  );
}
