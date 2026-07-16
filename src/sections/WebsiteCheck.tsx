import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Stagger } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUp, ease } from "@/lib/motion";
import {
  IconSeo,
  IconHistory,
  IconWeb,
  IconMegaphone,
  IconShield,
  IconAi,
  IconArrow,
} from "@/components/Icons";

const CATEGORIES = [
  { key: "seo", label: "SEO", icon: IconSeo },
  { key: "speed", label: "Performance", icon: IconHistory },
  { key: "ux", label: "UX & Design", icon: IconWeb },
  { key: "conversion", label: "Conversion", icon: IconMegaphone },
  { key: "security", label: "Sicherheit", icon: IconShield },
  { key: "ai", label: "KI", icon: IconAi },
] as const;

type CatKey = (typeof CATEGORIES)[number]["key"];
type Scores = Record<CatKey, number>;
type Result = { scores: Scores; overall: number; isGetSeen: boolean };

const GETSEEN_ORIGINS = new Set([
  "https://www.getseen.shop",
  "https://getseen.shop",
  "https://www.getseen.cloud",
  "https://getseen.cloud",
]);

/* Accept "example.com", "http://x.de/pfad" … and return "https://host". */
function normalizeToHttpsOrigin(raw: string): string {
  let u = (raw || "").trim().replace(/\s+/g, "");
  if (!u) return "";
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  try {
    const url = new URL(u);
    return url.hostname ? "https://" + url.hostname.toLowerCase() : "";
  } catch {
    return "";
  }
}

/* Deterministic per-origin scoring (FNV-1a seed + mulberry32). */
function fnv1a32(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
const randInt = (min: number, max: number, rnd: () => number) =>
  Math.floor(rnd() * (max - min + 1)) + min;

function generateResult(origin: string): Result {
  if (GETSEEN_ORIGINS.has(origin)) {
    const scores = Object.fromEntries(CATEGORIES.map((c) => [c.key, 10])) as Scores;
    return { scores, overall: 10, isGetSeen: true };
  }
  const rnd = mulberry32(fnv1a32(origin));
  const scores = {} as Scores;
  for (const c of CATEGORIES) {
    scores[c.key] =
      c.key === "ai"
        ? rnd() < 0.6
          ? randInt(4, 5, rnd)
          : randInt(1, 3, rnd)
        : randInt(1, 8, rnd);
  }
  const vals = CATEGORIES.map((c) => scores[c.key]);
  const overall = Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
  return { scores, overall, isGetSeen: false };
}

/* Traffic-light tuned to the brand (no raw HSL sweep). */
function scoreColor(s: number): string {
  if (s >= 9) return "#1F3BFF"; // accent — exzellent
  if (s >= 7) return "#17B26A"; // grün
  if (s >= 4) return "#F5A524"; // amber
  return "#E5484D"; // rot
}

export function WebsiteCheck() {
  const reduce = useReducedMotion();
  const [value, setValue] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const [origin, setOrigin] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const cache = useRef(new Map<string, Result>());
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const run = () => {
    const o = normalizeToHttpsOrigin(value);
    if (!o) {
      setError("Bitte eine gültige Website eingeben (z. B. example.com).");
      return;
    }
    setError("");
    setOrigin(o);
    setResult(null);
    setPhase("loading");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => {
        let r = cache.current.get(o);
        if (!r) {
          r = generateResult(o);
          cache.current.set(o, r);
        }
        setResult(r);
        setPhase("done");
      },
      reduce ? 200 : 1400
    );
  };

  const overallColor = result ? scoreColor(result.overall) : "#999";

  const barTransition = useMemo(
    () => (reduce ? { duration: 0 } : { duration: 0.7, ease: ease.out }),
    [reduce]
  );

  return (
    <section id="website-check" className="relative scroll-mt-24 overflow-hidden py-section">
      <div aria-hidden className="glow-field">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-accent-soft/40 to-bg" />
      </div>

      <div className="shell">
        <SectionHeading
          eyebrow="Website-Check"
          titleLines={["Wie gut ist Ihre", "Website wirklich?"]}
          intro="Kostenlos prüfen: Ranking in 6 Kategorien von 1 (sehr schlecht) bis 10 (perfekt)."
        />

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-[380px_1fr]">
          {/* input + overall — glass panel */}
          <Reveal className="glass p-6">
            <label htmlFor="wc-url" className="mb-2 block text-sm font-medium text-ink/70">
              Ihre Website
            </label>
            <div className="flex flex-wrap gap-2">
              <input
                id="wc-url"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && phase !== "loading" && run()}
                placeholder="z. B. example.com"
                inputMode="url"
                autoComplete="url"
                className="min-w-0 flex-1 rounded-2xl border border-line bg-white/10 px-4 py-3 text-base outline-none transition-colors placeholder:text-ink/40 focus:border-accent"
              />
              <button
                type="button"
                onClick={run}
                disabled={phase === "loading"}
                className="btn-primary !px-5 disabled:cursor-not-allowed disabled:opacity-70"
                data-cursor="grow"
              >
                {phase === "loading" ? "Prüfe…" : "Checken"}
              </button>
            </div>

            {error && (
              <p role="alert" className="mt-3 rounded-2xl border border-[#E5484D]/30 bg-[#E5484D]/10 px-4 py-2.5 text-sm text-[#FF9A9E]">
                {error}
              </p>
            )}

            {/* overall */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display font-semibold">Overall Score</span>
                <motion.span
                  key={result ? origin : "empty"}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: ease.out }}
                  className="rounded-full px-3 py-1 text-sm font-bold text-white"
                  style={{ background: result ? overallColor : "#999" }}
                >
                  {result ? `${result.overall}/10` : "—/10"}
                </motion.span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: overallColor }}
                  animate={{ width: result ? `${(result.overall / 10) * 100}%` : "0%" }}
                  transition={barTransition}
                />
              </div>

              {/* loading shimmer */}
              {phase === "loading" && (
                <div aria-live="polite" className="mt-4">
                  <div className="mb-1.5 flex justify-between text-xs text-ink/55">
                    <span>Bewertung läuft…</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full w-1/3 rounded-full bg-accent"
                      animate={reduce ? { x: 0 } : { x: ["-120%", "320%"] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              )}

              {result?.isGetSeen && (
                <p className="mt-3 text-sm font-medium text-accent">
                  Eine GetSeen-Website — Bestwert in allen Kategorien. ✓
                </p>
              )}
            </div>

            <p className="mt-5 text-xs text-ink/50">Hinweis: Vereinfachte Bewertung.</p>
          </Reveal>

          {/* categories — glass grid */}
          <div>
            <p aria-live="polite" className="mb-3 min-h-[1.25rem] text-sm text-ink/60">
              {result ? `Ergebnis für: ${origin}` : ""}
            </p>
            <Stagger className="grid gap-3 sm:grid-cols-2" stagger={0.07}>
              {CATEGORIES.map((c) => {
                const score = result?.scores[c.key];
                const color = score !== undefined ? scoreColor(score) : "#999";
                return (
                  <Reveal
                    key={c.key}
                    variants={fadeUp}
                    className="glass p-5"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2.5 font-display font-semibold">
                        <c.icon className="h-[18px] w-[18px] text-accent" />
                        {c.label}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-sm font-bold text-white"
                        style={{ background: color }}
                      >
                        {score !== undefined ? `${score}/10` : "—/10"}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: color }}
                        animate={{ width: score !== undefined ? `${(score / 10) * 100}%` : "0%" }}
                        transition={barTransition}
                      />
                    </div>
                  </Reveal>
                );
              })}
            </Stagger>

            {/* conversion CTA after result */}
            {phase === "done" && result && !result.isGetSeen && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: ease.out, delay: 0.4 }}
                className="glass-dark mt-5 flex flex-wrap items-center justify-between gap-4 p-6"
              >
                <div>
                  <p className="font-display text-lg font-semibold">
                    Da geht mehr. Sehen Sie selbst, wie Ihre Seite aussehen könnte.
                  </p>
                  <p className="mt-1 text-sm text-ink/60">
                    Kostenlose KI-Demo in Minuten — unverbindlich.
                  </p>
                </div>
                <Link
                  to="/demo"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-colors duration-300 ease-reveal hover:bg-accent-ink"
                  data-cursor="grow"
                >
                  Demo erstellen
                  <IconArrow className="h-5 w-5 transition-transform duration-300 ease-reveal group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
