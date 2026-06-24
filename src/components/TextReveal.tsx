import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ease } from "@/lib/motion";

/**
 * Headline reveal: each line slides up from behind a mask, staggered.
 *
 * The whileInView trigger lives on the (always-visible) parent — NOT on the
 * masked lines. A masked line starts translated 110% below its overflow-hidden
 * box, so it is fully clipped; an IntersectionObserver on the line itself would
 * never fire. Triggering on the parent and propagating via variants fixes that.
 */
export function TextReveal({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </>
    );
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const line: Variants = {
    hidden: { y: "110%" },
    show: { y: 0, transition: { duration: 0.7, ease: ease.out } },
  };

  return (
    <motion.span
      className="block"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {lines.map((text, i) => (
        <span key={i} className={`block overflow-hidden ${className ?? ""}`}>
          <motion.span className="block" variants={line}>
            {text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
