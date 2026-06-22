import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./useMediaPreferences";

/**
 * Global Lenis smooth inertia scroll — the main contributor to the premium feel.
 * Disabled entirely when the user prefers reduced motion (native scroll instead).
 * Also handles: scroll-to-top on route change, and smooth in-page #anchor links.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // expose for imperative scrolls (anchor links, scroll cue)
    window.__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Smooth-scroll in-page anchor links
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [reduced]);

  // On navigation: scroll to a #hash target if present, else reset to top
  useEffect(() => {
    // wait a frame so the target route has rendered
    const id = requestAnimationFrame(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          if (window.__lenis) window.__lenis.scrollTo(el as HTMLElement, { offset: -80 });
          else (el as HTMLElement).scrollIntoView();
          return;
        }
      }
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return <>{children}</>;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
