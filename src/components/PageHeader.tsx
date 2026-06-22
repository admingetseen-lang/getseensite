import { motion } from "framer-motion";
import { EASE_REVEAL } from "../lib/motion";
import { usePrefersReducedMotion } from "../lib/useMediaPreferences";

/** Consistent header for sub-route pages, with navbar clearance. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const anim = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: EASE_REVEAL },
      };

  return (
    <header className="shell pb-12 pt-36 sm:pt-44">
      <motion.span className="eyebrow" {...anim}>
        {eyebrow}
      </motion.span>
      <motion.h1
        className="mt-4 text-display-md"
        {...(reduced
          ? {}
          : {
              initial: { opacity: 0, y: 28 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.85, ease: EASE_REVEAL, delay: 0.08 },
            })}
      >
        {title}
      </motion.h1>
      {intro && (
        <motion.p
          className="mt-6 max-w-prose text-lg text-ink/65"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, ease: EASE_REVEAL, delay: 0.16 },
              })}
        >
          {intro}
        </motion.p>
      )}
    </header>
  );
}
