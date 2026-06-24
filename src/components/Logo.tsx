/**
 * Brand marks. Two distinct brands:
 *  - "getseen" → the web agency (eye-G mark)
 *  - "cloud"   → the GetSeen Cloud product (cloud-G mark) — a separate product.
 *
 * Marks are loaded from /public/brand/*.svg so the official logo files can be
 * dropped in without touching code. Paths use BASE_URL so they resolve under a
 * subpath deploy (e.g. GitHub Pages /getseensite/).
 */
const base = import.meta.env.BASE_URL; // "/" or "/getseensite/"

const MARKS = {
  getseen: { src: `${base}brand/getseen.svg`, alt: "GetSeen Logo" },
  cloud: { src: `${base}brand/getseen-cloud.svg`, alt: "GetSeen Cloud Logo" },
} as const;

export function Logo({
  variant = "getseen",
  showWord = true,
  className = "",
}: {
  variant?: "getseen" | "cloud";
  showWord?: boolean;
  className?: string;
}) {
  const mark = MARKS[variant];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={mark.src}
        alt={mark.alt}
        width={variant === "cloud" ? 34 : 38}
        height={variant === "cloud" ? 34 : 30}
        className={variant === "cloud" ? "h-8 w-8" : "h-7 w-auto"}
        loading="eager"
        decoding="async"
      />
      {showWord && (
        <span className="font-display text-xl font-semibold tracking-tight text-ink">
          {variant === "cloud" ? (
            <>
              GetSeen <span className="text-accent">Cloud</span>
            </>
          ) : (
            "GetSeen"
          )}
        </span>
      )}
    </span>
  );
}
