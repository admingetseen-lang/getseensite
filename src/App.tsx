export default function App() {
  return (
    <main className="shell flex min-h-screen flex-col items-start justify-center gap-6 py-section">
      <span className="eyebrow">GetSeen · Flagship</span>
      <h1 className="text-display-md max-w-[14ch]">
        Online sichtbar und effizient werden
      </h1>
      <p className="max-w-prose text-lg text-ink/70">
        Scaffold läuft: Vite + React + TS + Tailwind, Fonts (Clash Display &
        Satoshi) und die Design-Tokens sind verdrahtet.
      </p>
      <div className="flex flex-wrap gap-3">
        <a className="btn-primary" href="#">
          Demo erstellen
        </a>
        <a className="btn-ghost" href="#">
          Mehr erfahren
        </a>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["bg", "ink", "paper", "line", "accent"].map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm"
          >
            <span
              className={`h-4 w-4 rounded-full bg-${t} ${
                t === "bg" || t === "paper" ? "border border-line" : ""
              }`}
            />
            {t}
          </span>
        ))}
      </div>
    </main>
  );
}
