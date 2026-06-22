import { Hero } from "../sections/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      {/* placeholder anchor — Über uns / Team section lands here next */}
      <section id="ueber-uns" className="shell py-section">
        <span className="eyebrow">Über uns</span>
        <p className="mt-4 max-w-prose text-lg text-ink/60">
          Nächste Sektion folgt: Über uns / Team.
        </p>
      </section>
    </>
  );
}
