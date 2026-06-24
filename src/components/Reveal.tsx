import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { reveal, staggerParent, viewportOnce } from "@/lib/motion";

type RevealTag =
  | "div"
  | "section"
  | "li"
  | "span"
  | "article"
  | "header"
  | "footer";

/**
 * Canonical scroll-reveal primitive (see CLAUDE.md → "Motion & Animation").
 * Defaults to the `reveal` variant (opacity + 20px y, expo-out, once).
 * Optional `variants`/`delay`/`as` are kept for backward compatibility — the
 * `whileInView={["show","visible"]}` target matches either variant convention.
 */
export function Reveal({
  children,
  className,
  delay,
  variants,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: RevealTag;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants ?? reveal}
      initial="hidden"
      whileInView={["show", "visible"]}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={delay !== undefined ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Parent wrapper that staggers the reveal of its <Reveal> children.
 * Kept for existing sections; new code can also use the `stagger` variant.
 */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={staggerParent(stagger, delayChildren)}
      initial="hidden"
      whileInView={["show", "visible"]}
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}
