import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "../lib/useMediaPreferences";

/**
 * Counts from 0 to `value` when scrolled into view (once).
 * Renders the final value immediately under reduced motion.
 */
export function CountUp({
  value,
  duration = 1.6,
  suffix = "",
  prefix = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    // ease-out so it settles, matching the reveal easing feel
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      setDisplay(Math.round(ease(t) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
