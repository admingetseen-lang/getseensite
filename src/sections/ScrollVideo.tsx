import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useIsTouch } from "@/lib/useMediaPreferences";
import { IconAi, IconSeo, IconMegaphone } from "@/components/Icons";

const base = import.meta.env.BASE_URL;
const VIDEO = `${base}media/scroll-hero.mp4`;
const POSTER = `${base}media/scroll-hero-poster.jpg`;

/**
 * Scroll-driven video chapter ("Mit den ersten Scrolls spielt das Video").
 * A 300vh section pins a full-viewport video whose timeline is scrubbed by
 * scroll progress (every frame is a keyframe, so seeking is smooth). Three
 * display statements mask-reveal in sequence; glassmorphism chips parallax
 * over the footage. The video is generated in brand colors — drop any
 * re-encoded clip (e.g. from Artlist) at public/media/scroll-hero.mp4:
 *   ffmpeg -i clip.mp4 -c:v libx264 -g 1 -crf 27 -an scroll-hero.mp4
 *
 * Fallbacks: touch devices autoplay the clip instead of scrubbing;
 * reduced motion renders a static poster with static copy.
 */
export function ScrollVideo() {
  const reduce = useReducedMotion();
  const touch = useIsTouch();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // --- video scrubbing (rAF-lerped so seeks feel fluid) ---
  const target = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    target.current = v;
  });

  useEffect(() => {
    if (reduce) return;
    const v = videoRef.current;
    if (!v) return;

    if (touch) {
      // Mobile: frame-accurate seeking is unreliable — just play calmly.
      v.play().catch(() => {});
      return;
    }

    let raf = 0;
    const tick = () => {
      if (v.readyState >= 1 && v.duration) {
        const goal = target.current * (v.duration - 0.05);
        const next = v.currentTime + (goal - v.currentTime) * 0.16;
        if (Math.abs(next - v.currentTime) > 0.002) v.currentTime = next;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, touch]);

  // --- frame: inset rounded card -> full bleed over the first 15% ---
  const frameScale = useTransform(scrollYProgress, [0, 0.15], [0.92, 1]);
  const frameRadius = useTransform(scrollYProgress, [0, 0.15], [28, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  if (reduce) {
    // Static, accessible variant — same content, no pin, no motion.
    return (
      <section aria-label="GetSeen in Bewegung" className="relative">
        <div
          className="relative flex min-h-[70vh] items-end overflow-hidden bg-bg"
          style={{
            backgroundImage: `url(${POSTER})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="shell relative pb-16 pt-40">
            <h2 className="font-display text-display-md text-white">
              Sichtbar werden. Effizient bleiben.
            </h2>
            <p className="mt-4 max-w-prose text-lg text-white/80">
              Mit GetSeen — Webdesign, SEO und KI aus einer Hand.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} aria-label="GetSeen in Bewegung" className="relative h-[300svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* video frame */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ scale: frameScale, borderRadius: frameRadius }}
        >
          <motion.video
            ref={videoRef}
            className="h-full w-full object-cover"
            style={{ scale: videoScale }}
            src={VIDEO}
            poster={POSTER}
            muted
            playsInline
            loop={touch}
            preload="auto"
            aria-hidden
          />
          {/* legibility wash + grain, matching the hero treatment */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" />
          <div className="grain-overlay absolute inset-0 animate-grain opacity-[0.07]" />
        </motion.div>

        {/* statements */}
        <Statement progress={scrollYProgress} at={[0.1, 0.38]} lines={["Sichtbar", "werden."]} />
        <Statement progress={scrollYProgress} at={[0.38, 0.66]} lines={["Effizient", "bleiben."]} />
        <Statement
          progress={scrollYProgress}
          at={[0.66, 1]}
          lines={["Mit GetSeen."]}
          hold
          sub="Webdesign, SEO und KI — aus einer Hand."
        />

        {/* glassmorphism chips, parallaxing at separate speeds */}
        <GlassChip
          progress={scrollYProgress}
          at={[0.14, 0.4]}
          className="left-[6%] top-[18%] sm:left-[10%]"
          drift={-60}
          icon={<IconSeo className="h-5 w-5" />}
          label="Lokal gefunden werden"
        />
        <GlassChip
          progress={scrollYProgress}
          at={[0.42, 0.68]}
          className="right-[6%] top-[24%] sm:right-[12%]"
          drift={-90}
          icon={<IconAi className="h-5 w-5" />}
          label="KI-Assistent · 24/7"
        />
        <GlassChip
          progress={scrollYProgress}
          at={[0.68, 0.96]}
          className="left-[8%] top-[26%] sm:left-[16%]"
          drift={-70}
          icon={<IconMegaphone className="h-5 w-5" />}
          label="Mehr Anfragen, weniger Aufwand"
        />

        {/* progress hairline */}
        <div className="absolute bottom-8 left-1/2 h-px w-40 -translate-x-1/2 bg-white/20">
          <motion.div
            className="h-full origin-left bg-accent"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
}

/** Display statement that mask-reveals inside its progress window. */
function Statement({
  progress,
  at,
  lines,
  sub,
  hold = false,
}: {
  progress: MotionValue<number>;
  at: [number, number];
  lines: string[];
  sub?: string;
  hold?: boolean;
}) {
  const [a, b] = at;
  const span = b - a;
  const inEnd = a + span * 0.3;
  const outStart = b - span * 0.22;

  const opacity = useTransform(
    progress,
    hold ? [a, inEnd] : [a, inEnd, outStart, b],
    hold ? [0, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    hold ? [a, inEnd] : [a, inEnd, outStart, b],
    hold ? ["14%", "0%"] : ["14%", "0%", "0%", "-10%"]
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
      {/* frosted glass slab, centered over the free middle of the footage */}
      <motion.div
        style={{ opacity }}
        className="rounded-[2rem] border border-white/25 bg-white/10 px-8 py-8 text-center shadow-[0_16px_48px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl sm:px-14 sm:py-10"
      >
        <h2 className="font-display text-display-md font-semibold text-white">
          {lines.map((l, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" style={{ y }}>
                {l}
              </motion.span>
            </span>
          ))}
        </h2>
        {sub && (
          <motion.p style={{ y }} className="mx-auto mt-4 max-w-prose text-lg text-white/85">
            {sub}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

/** Frosted-glass chip that fades in and drifts upward with scroll. */
function GlassChip({
  progress,
  at,
  className,
  drift,
  icon,
  label,
}: {
  progress: MotionValue<number>;
  at: [number, number];
  className: string;
  drift: number;
  icon: React.ReactNode;
  label: string;
}) {
  const [a, b] = at;
  const opacity = useTransform(progress, [a, a + (b - a) * 0.25, b - (b - a) * 0.2, b], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b], [0, drift]);

  return (
    <motion.div
      className={`pointer-events-none absolute hidden items-center gap-2.5 rounded-full border border-white/25 bg-white/10 py-2.5 pl-3 pr-5 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:flex ${className}`}
      style={{ opacity, y }}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white">
        {icon}
      </span>
      {label}
    </motion.div>
  );
}
