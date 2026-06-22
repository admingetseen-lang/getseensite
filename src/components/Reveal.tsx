import { motion, type Variants } from "framer-motion";
import { fadeUp, staggerParent, viewportOnce } from "../lib/motion";
import { usePrefersReducedMotion } from "../lib/useMediaPreferences";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay before this element reveals (s). */
  delay?: number;
  /** Override the default fade-up variants. */
  variants?: Variants;
  /** Render as a different element (default div). */
  as?: "div" | "section" | "li" | "span" | "article" | "header" | "footer";
};

/**
 * Scroll-triggered fade + translate-up reveal.
 * When reduced motion is requested, content renders immediately with no transform.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = "div",
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child's reveal. */
  stagger?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "section";
};

/**
 * Parent wrapper that staggers the reveal of its <Reveal> children.
 * Children should use the fade-up (or compatible) variants.
 */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
  as = "div",
}: StaggerProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={staggerParent(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}
