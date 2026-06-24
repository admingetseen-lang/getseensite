import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

export function TextReveal({ lines, className }: {
  lines: string[]; className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <>{lines.map((line, i) => <span key={i} className="block">{line}</span>)}</>;
  }
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden ${className ?? ""}`}>
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: ease.out, delay: i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}
