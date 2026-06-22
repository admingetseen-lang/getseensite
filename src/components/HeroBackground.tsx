import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../lib/useMediaPreferences";

/**
 * Optional muted abstract hero video. Drop a file at /public/media/hero.mp4
 * and set HERO_VIDEO to its path — the animated gradient mesh below is the
 * always-present, premium fallback so the hero never looks broken.
 */
const HERO_VIDEO: string | null = null;

export function HeroBackground() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Drop-in muted background video (calm, abstract) */}
      {HERO_VIDEO && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-poster.jpg"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      )}

      {/* Animated gradient mesh — brand purple→blue, drifting softly */}
      {!HERO_VIDEO && (
        <div className="absolute inset-0">
          <motion.div
            aria-hidden
            className="absolute -left-[10%] top-[-15%] h-[55vw] w-[55vw] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(124,92,255,0.45), transparent 60%)" }}
            animate={reduced ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute right-[-10%] top-[10%] h-[50vw] w-[50vw] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(54,182,255,0.4), transparent 60%)" }}
            animate={reduced ? undefined : { x: [0, -50, 0], y: [0, 50, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-[-20%] left-[25%] h-[45vw] w-[45vw] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(31,59,255,0.28), transparent 60%)" }}
            animate={reduced ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Wash to keep text legible over the colour */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/55 to-bg" />

      {/* Subtle film grain */}
      <div className="grain-overlay absolute inset-0 animate-grain opacity-[0.06]" />
    </div>
  );
}
