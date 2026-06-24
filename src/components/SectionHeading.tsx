import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";
import { fadeUpLg } from "../lib/motion";

export function SectionHeading({
  eyebrow,
  title,
  titleLines,
  intro,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  /** Rich title node — used when `titleLines` is not provided. */
  title?: React.ReactNode;
  /** Plain text lines — rendered with the line-by-line mask slide reveal. */
  titleLines?: string[];
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>

      {titleLines ? (
        <h2 className="mt-4 text-display-sm">
          <TextReveal lines={titleLines} />
        </h2>
      ) : (
        <Reveal variants={fadeUpLg} delay={0.05}>
          <h2 className="mt-4 text-display-sm">{title}</h2>
        </Reveal>
      )}

      {intro && (
        <Reveal delay={0.1}>
          <p
            className={`mt-5 text-lg text-ink/65 ${align === "center" ? "mx-auto" : ""} max-w-prose`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
