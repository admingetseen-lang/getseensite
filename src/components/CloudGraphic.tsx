import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../lib/useMediaPreferences";
import { EASE_REVEAL } from "../lib/motion";

/**
 * Abstract sync / lock / file motif for the GetSeen Cloud section,
 * animated with Framer Motion (no WebGL). Orbiting file nodes around a
 * central encrypted vault, with a sweeping sync arc.
 */
export function CloudGraphic() {
  const reduced = usePrefersReducedMotion();
  const nodes = [0, 1, 2, 3, 4];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <defs>
          <linearGradient id="cg-ring" x1="0" y1="0" x2="400" y2="400">
            <stop stopColor="#7C5CFF" />
            <stop offset="1" stopColor="#36B6FF" />
          </linearGradient>
          <radialGradient id="cg-glow" cx="50%" cy="50%" r="50%">
            <stop stopColor="#1F3BFF" stopOpacity="0.35" />
            <stop offset="1" stopColor="#1F3BFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="160" fill="url(#cg-glow)" />

        {/* orbit rings */}
        {[150, 110].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="url(#cg-ring)"
            strokeOpacity={0.25}
            strokeWidth={1.5}
            strokeDasharray={i === 0 ? "2 8" : undefined}
          />
        ))}

        {/* sweeping sync arc */}
        <motion.g
          style={{ originX: "200px", originY: "200px" }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M200 50 A150 150 0 0 1 320 120"
            fill="none"
            stroke="url(#cg-ring)"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </motion.g>

        {/* orbiting file nodes */}
        <motion.g
          style={{ originX: "200px", originY: "200px" }}
          animate={reduced ? undefined : { rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {nodes.map((n) => {
            const a = (n / nodes.length) * Math.PI * 2;
            const cx = 200 + Math.cos(a) * 150;
            const cy = 200 + Math.sin(a) * 150;
            return (
              <g key={n} transform={`translate(${cx - 13} ${cy - 16})`}>
                <rect width="26" height="32" rx="4" fill="#fff" />
                <rect x="5" y="7" width="16" height="2.2" rx="1" fill="#9AA6FF" />
                <rect x="5" y="13" width="16" height="2.2" rx="1" fill="#C7CEF7" />
                <rect x="5" y="19" width="10" height="2.2" rx="1" fill="#C7CEF7" />
              </g>
            );
          })}
        </motion.g>

        {/* central encrypted vault */}
        <motion.g
          animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "200px", originY: "200px" }}
        >
          <circle cx="200" cy="200" r="56" fill="#0E0E0E" />
          <circle cx="200" cy="200" r="56" fill="none" stroke="url(#cg-ring)" strokeWidth={2} />
          {/* lock */}
          <rect x="182" y="196" width="36" height="26" rx="5" fill="url(#cg-ring)" />
          <path
            d="M188 196v-6a12 12 0 0 1 24 0v6"
            fill="none"
            stroke="#fff"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx="200" cy="207" r="3.2" fill="#0E0E0E" />
        </motion.g>

        {/* pulsing data pings travelling inward */}
        {!reduced &&
          nodes.slice(0, 3).map((n) => {
            const a = (n / 3) * Math.PI * 2 + 0.4;
            const cx = 200 + Math.cos(a) * 150;
            const cy = 200 + Math.sin(a) * 150;
            return (
              <motion.circle
                key={n}
                r="3"
                fill="#36B6FF"
                initial={{ cx, cy, opacity: 0 }}
                animate={{ cx: 200, cy: 200, opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: n * 0.8,
                  ease: EASE_REVEAL,
                }}
              />
            );
          })}
      </svg>
    </div>
  );
}
