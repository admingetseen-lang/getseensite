import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ease } from "@/lib/motion";
import { IconArrow, IconCheck } from "@/components/Icons";

// KI-Demo-Backend: Cloudflare Worker (nimmt { prompt } entgegen, liefert { html }).
// Derselbe Endpoint wie auf der bisherigen Seite; der Worker sendet CORS-Header,
// funktioniert also von der Vorschau-Domain wie von getseen.shop.
const API_URL = "https://getseenchatai.jolly-field-a969.workers.dev";

const TEMPLATE_LINES = [
  "Firma/Name:",
  "Branche:",
  "Zielgruppe:",
  "Angebot:",
  "USP / Besonderheit:",
  "Stil (z.B. modern, premium):",
  "CTA (z.B. Termin buchen):",
  "Standort (optional):",
];

const STAGES = [
  "Briefing prüfen…",
  "Zielgruppe & Nutzen schärfen…",
  "Texte schreiben…",
  "Layout & Struktur bauen…",
  "Design & Feinschliff…",
  "Finalisierung & Responsive…",
];

// Verschiedene Beispiel-Unternehmen (per Klick wird zufällig eines geladen).
const EXAMPLES = [
  `Firma/Name: AlpenPhysio München
Branche: Physiotherapie
Zielgruppe: Berufstätige mit Rücken-/Nackenschmerzen
Angebot: Physiotherapie, Manuelle Therapie, Massage
USP / Besonderheit: Termine innerhalb von 48h, erfahrenes Team
Stil (z.B. modern, premium): modern, clean
CTA (z.B. Termin buchen): Termin anfragen
Standort (optional): München`,

  `Firma/Name: Trattoria Bella Vista
Branche: Italienisches Restaurant
Zielgruppe: Paare & Familien, die authentische Küche suchen
Angebot: Hausgemachte Pasta, Holzofen-Pizza, Weinkarte, Mittagstisch
USP / Besonderheit: Rezepte aus Apulien, eigene Terrasse, seit 1998
Stil (z.B. modern, premium): warm, einladend, gehoben
CTA (z.B. Termin buchen): Tisch reservieren
Standort (optional): Köln-Ehrenfeld`,

  `Firma/Name: Elektro Berger
Branche: Elektroinstallation & Handwerk
Zielgruppe: Hausbesitzer & Gewerbe in der Region
Angebot: Elektroinstallation, Smart Home, PV-Anlagen, Notdienst
USP / Besonderheit: Meisterbetrieb, 24h-Notdienst, Festpreisgarantie
Stil (z.B. modern, premium): seriös, vertrauenswürdig, technisch
CTA (z.B. Termin buchen): Kostenlos anfragen
Standort (optional): Augsburg`,

  `Firma/Name: Studio Lumen
Branche: Friseur & Beauty
Zielgruppe: Stilbewusste Kundinnen und Kunden, 25–45
Angebot: Haarschnitt, Balayage, Make-up, Hochsteckfrisuren
USP / Besonderheit: Nachhaltige Produkte, Farbexpertise, entspannte Atmosphäre
Stil (z.B. modern, premium): elegant, minimalistisch, premium
CTA (z.B. Termin buchen): Termin buchen
Standort (optional): Hamburg`,

  `Firma/Name: Körnerhaus
Branche: Bio-Bäckerei & Café
Zielgruppe: Gesundheitsbewusste, Familien, Homeoffice-Gäste
Angebot: Sauerteigbrot, Frühstück, Kaffee-Spezialitäten, Catering
USP / Besonderheit: 100 % Bio, eigene Röstung, regionale Zutaten
Stil (z.B. modern, premium): natürlich, freundlich, handgemacht
CTA (z.B. Termin buchen): Frühstück reservieren
Standort (optional): Leipzig`,

  `Firma/Name: CoreLab
Branche: Boutique-Fitnessstudio
Zielgruppe: Vielbeschäftigte, die effizient trainieren wollen
Angebot: Personal Training, Kleingruppen-Kurse, Ernährungscoaching
USP / Besonderheit: Max. 6 Teilnehmer, datenbasiertes Training, flexible Zeiten
Stil (z.B. modern, premium): energiegeladen, modern, dunkel
CTA (z.B. Termin buchen): Probetraining sichern
Standort (optional): Stuttgart`,
];

// An den Worker angehängte Konzept-Leitlinie — hebt Detailgrad & Eigenständigkeit
// der generierten Seite, ohne den Prompt aufzublähen. Für den Nutzer unsichtbar.
const CONCEPT_GUIDANCE = `

— Konzept-Anforderungen für die generierte Website —
Entwickle ein eigenständiges, zum Unternehmen passendes Konzept statt einer Standardvorlage: eine individuelle Sektionsstruktur, konkrete branchenspezifische Texte (kein Lorem Ipsum, keine Platzhalter) und ein stimmiges, zur Branche und zum gewünschten Stil passendes Farb- und Typografie-Konzept. Enthalte mindestens einen Hero mit klarer Value Proposition, einen Leistungs-/Angebotsbereich, ein Vertrauenselement (z. B. Ablauf in Schritten, Vorteile oder eine kurze FAQ) sowie einen klaren Kontakt-/CTA-Bereich. Halte es fokussiert und hochwertig — lieber wenige, gut ausgearbeitete Sektionen als viele generische.`;

const hasLine = (text: string, line: string) =>
  text.toLowerCase().includes(line.toLowerCase());

export default function Demo() {
  const reduce = useReducedMotion();
  const [prompt, setPrompt] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(STAGES[0]);
  const [html, setHtml] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const abortRef = useRef<AbortController>();
  const lastExample = useRef(-1);

  const loadExample = () => {
    let i = Math.floor(Math.random() * EXAMPLES.length);
    if (EXAMPLES.length > 1 && i === lastExample.current) i = (i + 1) % EXAMPLES.length;
    lastExample.current = i;
    setPrompt(EXAMPLES[i]);
  };

  const done = TEMPLATE_LINES.filter((l) => hasLine(prompt, l)).length;
  const missing = TEMPLATE_LINES.length - done;

  const stopTimers = () => {
    timers.current.forEach(clearInterval);
    timers.current = [];
  };
  useEffect(() => () => { stopTimers(); abortRef.current?.abort(); }, []);

  const addLine = (line: string) => {
    setPrompt((v) => {
      if (hasLine(v, line)) return v;
      const t = v.trimEnd();
      return (t ? t + "\n" : "") + line + " ";
    });
  };

  const addMissing = () => {
    setPrompt((v) => {
      let out = v.trimEnd();
      if (out) out += "\n";
      for (const l of TEMPLATE_LINES) if (!hasLine(out, l)) out += l + " \n";
      return out;
    });
  };

  const startProgress = () => {
    setProgress(0);
    setStage(STAGES[0]);
    let p = 0;
    let si = 0;
    timers.current.push(
      window.setInterval(() => {
        const inc = p < 60 ? 1 + Math.random() * 1.5 : p < 85 ? 0.5 : 0.2;
        p = Math.min(p + inc, 92);
        setProgress(p);
      }, 400),
      window.setInterval(() => {
        si = Math.min(si + 1, STAGES.length - 1);
        setStage(STAGES[si]);
      }, 2400)
    );
  };

  const generate = async () => {
    if (phase === "loading") return;
    setPhase("loading");
    setHtml("");
    startProgress();
    previewRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

    abortRef.current = new AbortController();
    const timeout = window.setTimeout(() => abortRef.current?.abort(), 250_000);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() + CONCEPT_GUIDANCE }),
        signal: abortRef.current.signal,
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || `HTTP ${res.status}`);
      stopTimers();
      setProgress(100);
      setStage("Fertig ✓");
      setHtml(j.html || "");
      setPhase("done");
    } catch (err) {
      stopTimers();
      console.error("[Demo-Generator]", err);
      if (err instanceof DOMException && err.name === "AbortError") {
        setErrorMsg("Zeitüberschreitung — der Generator braucht gerade zu lange. Bitte erneut versuchen.");
      } else if (err instanceof TypeError) {
        setErrorMsg(
          "Der Demo-Server hat die Anfrage von dieser Domain blockiert (CORS) oder ist nicht erreichbar. Details: F12 → Konsole."
        );
      } else {
        setErrorMsg(err instanceof Error ? `Serverfehler: ${err.message}` : "Unbekannter Fehler — bitte erneut versuchen.");
      }
      setPhase("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const download = () => {
    if (!html) return;
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([html], { type: "text/html" }));
    a.download = "getseen-demo.html";
    a.click();
    window.URL.revokeObjectURL(a.href);
  };

  const reset = () => {
    stopTimers();
    abortRef.current?.abort();
    setPrompt("");
    setHtml("");
    setProgress(0);
    setPhase("idle");
  };

  return (
    <>
      <PageHeader
        eyebrow="Live-Demo"
        title={
          <>
            Ihre Website-Demo — <span className="text-accent">von KI gebaut.</span>
          </>
        }
        intro="Beschreiben Sie Ihr Unternehmen, den Rest übernimmt unsere KI: Layout, Texte und Design in wenigen Sekunden. Kostenlos und unverbindlich."
      />

      <section className="relative overflow-hidden pb-section">
        <div aria-hidden className="glow-field">
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-accent-soft/40 to-bg" />
        </div>

        <div className="shell grid items-start gap-5 lg:grid-cols-[1fr_1.35fr]">
          {/* prompt panel */}
          <Reveal className="glass p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className="font-display text-lg font-semibold">Ihr Briefing</span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-ink/60">
                Felder: {done}/{TEMPLATE_LINES.length}
              </span>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={11}
              placeholder={"Firma/Name: …\nBranche: …"}
              className="w-full resize-y rounded-2xl border border-line bg-white/10 p-4 text-base leading-relaxed outline-none transition-colors placeholder:text-ink/35 focus:border-accent"
              aria-label="Demo-Briefing"
            />

            <p className="mb-2 mt-3 text-xs text-ink/50">
              Klicken Sie ein Feld an, um es einzufügen — abgehakte sind erledigt.
            </p>
            <div className="flex flex-wrap gap-2">
              {TEMPLATE_LINES.map((l) => {
                const ok = hasLine(prompt, l);
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => addLine(l)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                      ok
                        ? "border-[#17B26A]/40 bg-[#17B26A]/15 text-[#3DD68C]"
                        : "border-white/15 bg-white/10 text-ink/75 hover:border-accent/50"
                    }`}
                  >
                    {ok && <IconCheck className="h-3.5 w-3.5" />}
                    {l.replace(":", "")}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={generate}
                disabled={phase === "loading"}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
                data-cursor="grow"
              >
                {phase === "loading" ? "Wird erstellt…" : "Demo generieren"}
              </button>
              <button type="button" onClick={loadExample} className="btn-ghost">
                Beispiel
              </button>
              {missing > 0 && (
                <button type="button" onClick={addMissing} className="btn-ghost">
                  Felder ergänzen ({missing})
                </button>
              )}
              <button type="button" onClick={reset} className="btn-ghost">
                Reset
              </button>
            </div>

            {phase === "loading" && (
              <div aria-live="polite" className="mt-5">
                <div className="mb-1.5 flex justify-between text-xs text-ink/60">
                  <span>{stage}</span>
                  <span className="tabular-nums">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#7C5CFF] to-accent"
                    animate={{ width: `${progress}%` }}
                    transition={reduce ? { duration: 0 } : { duration: 0.4, ease: ease.out }}
                  />
                </div>
              </div>
            )}
            {phase === "error" && (
              <p role="alert" className="mt-4 rounded-2xl border border-[#E5484D]/30 bg-[#E5484D]/10 px-4 py-2.5 text-sm text-[#FF9A9E]">
                {errorMsg || "Das dauert gerade länger als gedacht — bitte noch einmal versuchen."}
              </p>
            )}

            <p className="mt-5 text-xs text-ink/45">
              Hinweis: Vorschau-Demo. Das Kontaktformular in der Demo ist ohne Versand.
            </p>
          </Reveal>

          {/* preview panel */}
          <Reveal delay={0.08} className="glass overflow-hidden !p-0" >
            <div ref={previewRef} className="flex items-center justify-between border-b border-white/15 px-5 py-3.5 scroll-mt-28">
              <span className="font-display font-semibold">Vorschau</span>
              {phase === "done" && html && (
                <button
                  type="button"
                  onClick={download}
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                  data-cursor="grow"
                >
                  <span className="link-underline">Als HTML speichern</span>
                  <IconArrow className="h-4 w-4 transition-transform duration-300 ease-reveal group-hover:translate-x-0.5" />
                </button>
              )}
            </div>

            <div className="relative min-h-[560px] bg-white/[0.04]">
              {phase === "loading" && (
                <div className="absolute inset-0 z-10 p-5" aria-hidden>
                  <div className="flex gap-2.5">
                    <div className="h-8 w-32 animate-pulse rounded-full bg-white/10" />
                    <div className="h-8 w-24 animate-pulse rounded-full bg-white/10" />
                    <div className="h-8 w-36 animate-pulse rounded-full bg-white/10" />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="h-28 animate-pulse rounded-2xl bg-white/10" />
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-ink/55">
                    Wir erstellen gerade Layout, Texte und Design — das dauert ein paar Sekunden.
                  </p>
                </div>
              )}
              {html ? (
                <iframe
                  title="Demo-Vorschau"
                  srcDoc={html}
                  sandbox="allow-scripts"
                  className="h-[640px] w-full bg-white"
                />
              ) : (
                phase !== "loading" && (
                  <div className="flex h-[560px] items-center justify-center p-8 text-center text-ink/45">
                    Ihre generierte Website erscheint hier.
                  </div>
                )
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
