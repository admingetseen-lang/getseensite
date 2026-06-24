import type { Variants, Transition } from "framer-motion";

/** Shared signature easing for all reveals — never linear. */
export const EASE_REVEAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const revealTransition: Transition = {
  duration: 0.8,
  ease: EASE_REVEAL,
};

/** Fade + translate-up reveal for single elements. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

/** Larger travel for headline-scale elements. */
export const fadeUpLg: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

/** Parent that staggers its children's reveals. */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Standard viewport config for whileInView reveals. */
export const viewportOnce = { once: true, margin: "-10%" } as const;

// ---------------------------------------------------------------------------
// Canonical motion convention (see CLAUDE.md → "Motion & Animation").
// Prefer these primitives + <Reveal> / <TextReveal> for all new animation work.
// ---------------------------------------------------------------------------

export const ease = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number], // expo-out — schneller Start, langes Settle
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number], // für Hover/Loops
};

export const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
