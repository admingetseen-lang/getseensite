import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouch, usePrefersReducedMotion } from "../lib/useMediaPreferences";

/**
 * Minimal dot cursor that grows over interactive elements.
 * Auto-disabled on touch devices and under reduced motion.
 * Global on/off via the `enabled` prop (default true).
 */
export function CustomCursor({ enabled = true }: { enabled?: boolean }) {
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const active = enabled && !touch && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // ring lags slightly behind the dot for a refined feel
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  const [grow, setGrow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("has-custom-cursor");

    const interactiveSel =
      'a, button, [data-cursor="grow"], input, textarea, select, label, [role="button"]';

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      setGrow(!!t.closest(interactiveSel));
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* outer ring */}
      <motion.div
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-accent"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: grow ? 1.8 : 1, opacity: grow ? 0.6 : 0.35 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* inner dot */}
      <motion.div
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent"
        style={{ x, y }}
        animate={{ scale: down ? 0.6 : grow ? 0.4 : 1 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
