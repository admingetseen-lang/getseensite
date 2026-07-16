import { useRef } from "react";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/useMediaPreferences";

/**
 * Panel whose hover highlight follows the cursor (radial glow via CSS vars).
 * Falls back to a plain panel on touch and under reduced motion.
 */
export function SpotlightCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "a";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const touch = useIsTouch();
  const reduce = usePrefersReducedMotion();
  const active = !touch && !reduce;

  const onMove = (e: React.MouseEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    // @ts-expect-error dynamic tag ref
    <Tag ref={ref} onMouseMove={onMove} className={`${active ? "spotlight" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
