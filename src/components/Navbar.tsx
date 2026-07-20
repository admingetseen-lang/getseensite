import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { NAV_LINKS } from "../lib/site";
import { EASE_REVEAL } from "../lib/motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_REVEAL, delay: 0.1 }}
        className={`relative mx-auto mt-3 flex max-w-shell items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ease-reveal sm:px-5 ${
          scrolled
            ? "glass-nav"
            : "border border-transparent bg-transparent"
        } w-[calc(100%-1.5rem)]`}
      >
        <Link to="/" aria-label="Zur Startseite" data-cursor="grow">
          <Logo />
        </Link>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 md:flex"
          aria-label="Hauptnavigation"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="link-underline text-[0.95rem] font-medium text-ink/80 hover:text-ink"
              data-cursor="grow"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/demo" className="btn-primary !px-5 !py-2.5 text-[0.95rem]" data-cursor="grow">
            Demo erstellen
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-ink transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_REVEAL }}
            className="glass mx-3 mt-2 overflow-hidden !bg-paper/95 p-4 md:hidden"
            aria-label="Mobile Navigation"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="block rounded-xl px-3 py-3 text-lg font-medium text-ink/85 hover:bg-white/10"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/demo" className="btn-primary mt-2 w-full">
              Demo erstellen
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
