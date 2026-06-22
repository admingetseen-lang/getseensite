import { motion } from "framer-motion";
import { HeroBackground } from "../components/HeroBackground";
import { EASE_REVEAL } from "../lib/motion";
import { EXTERNAL } from "../lib/site";
import { usePrefersReducedMotion } from "../lib/useMediaPreferences";

const HEADLINE_LINES = ["Online sichtbar", "und effizient werden"];

export function Hero() {
  const reduced = usePrefersReducedMotion();

  // staggered line reveal on load
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const line = {
    hidden: { y: "120%" },
    visible: { y: "0%", transition: { duration: 0.9, ease: EASE_REVEAL } },
  };
  const fade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_REVEAL } },
  };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <HeroBackground />

      <div className="shell">
        <div className="max-w-4xl">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_REVEAL }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            KI-Webdesign für lokale Unternehmen
          </motion.span>

          <motion.h1
            className="mt-6 text-display-lg"
            variants={reduced ? undefined : container}
            initial={reduced ? undefined : "hidden"}
            animate={reduced ? undefined : "visible"}
          >
            {HEADLINE_LINES.map((text, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" variants={reduced ? undefined : line}>
                  {i === HEADLINE_LINES.length - 1 ? (
                    <>
                      und <span className="text-accent">effizient</span> werden
                    </>
                  ) : (
                    text
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-7 max-w-prose text-lg text-ink/70"
            variants={reduced ? undefined : fade}
            initial={reduced ? undefined : "hidden"}
            animate={reduced ? undefined : "visible"}
            transition={{ delay: 0.5 }}
          >
            Wir helfen Ihnen, mit KI mehr Kunden zu gewinnen — mit modernem
            Webdesign, SEO und Automatisierung aus einer Hand.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            variants={reduced ? undefined : fade}
            initial={reduced ? undefined : "hidden"}
            animate={reduced ? undefined : "visible"}
            transition={{ delay: 0.62 }}
          >
            <a href={EXTERNAL.liveDemo} className="btn-primary" data-cursor="grow">
              Demo erstellen
            </a>
            <a href="/leistungen" className="btn-ghost" data-cursor="grow">
              Mehr erfahren
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.a
          href="#ueber-uns"
          aria-label="Weiter scrollen"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink/50 sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          data-cursor="grow"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <span className="relative flex h-9 w-[22px] justify-center rounded-full border border-ink/30">
            <motion.span
              className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ink/50"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.a>
      )}
    </section>
  );
}
