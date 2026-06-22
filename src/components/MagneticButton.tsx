import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { useIsTouch, usePrefersReducedMotion } from "../lib/useMediaPreferences";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  /** magnetic pull strength in px */
  strength?: number;
};

/**
 * Button/link with a subtle magnetic pull toward the cursor.
 * Magnetism is disabled on touch and under reduced-motion.
 * Renders an <a> (external), <Link> (internal route), or <button>.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 14,
  href,
  to,
  onClick,
  type,
  ...rest
}: CommonProps & {
  href?: string;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const touch = useIsTouch();
  const disabled = reduced || touch;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set((relX / r.width) * strength * 2);
    y.set((relY / r.height) * strength * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = <span className="relative z-10">{children}</span>;

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={disabled ? undefined : { x: sx, y: sy }}
      className="inline-block"
      data-cursor="grow"
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...rest}
        >
          {inner}
        </a>
      ) : to ? (
        <Link to={to} className={className} {...rest}>
          {inner}
        </Link>
      ) : (
        <button type={type ?? "button"} onClick={onClick} className={className} {...rest}>
          {inner}
        </button>
      )}
    </motion.span>
  );
}
