import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { CONTACT, EXTERNAL, LEGAL_LINKS, NAV_LINKS, COMPANY } from "../lib/site";
import {
  IconMail,
  IconPhone,
  IconPin,
  IconInstagram,
  IconTiktok,
  IconFacebook,
  IconLinkedin,
} from "./Icons";

const SOCIALS = [
  { icon: IconInstagram, href: EXTERNAL.instagram, label: "Instagram" },
  { icon: IconTiktok, href: EXTERNAL.tiktok, label: "TikTok" },
  { icon: IconFacebook, href: EXTERNAL.facebook, label: "Facebook" },
  { icon: IconLinkedin, href: EXTERNAL.linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer id="kontakt" className="scroll-mt-24 border-t border-line bg-bg">
      <div className="shell py-section">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-ink/60">
              Online sichtbar und effizient werden — modernes KI-Webdesign, SEO
              und Automatisierung für lokale Unternehmen.
            </p>

            <ul className="mt-7 space-y-3 text-ink/75">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-3 hover:text-ink"
                  data-cursor="grow"
                >
                  <IconMail className="h-5 w-5 text-accent" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <IconPhone className="h-5 w-5 text-accent" />
                <span>
                  <a href={`tel:${CONTACT.phoneFixed.replace(/\s/g, "")}`} className="hover:text-ink">
                    {CONTACT.phoneFixed}
                  </a>{" "}
                  ·{" "}
                  <a href={`tel:${CONTACT.phoneMobile.replace(/\s/g, "")}`} className="hover:text-ink">
                    {CONTACT.phoneMobile}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <IconPin className="h-5 w-5 text-accent" />
                {CONTACT.street}, {CONTACT.city}
              </li>
            </ul>
          </div>

          {/* Nav */}
          <nav aria-label="Footer-Navigation">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink/45">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="link-underline text-ink/75 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink/45">
              Rechtliches
            </h3>
            <ul className="mt-5 space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="link-underline text-ink/75 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={EXTERNAL.paypal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink/75 hover:text-ink"
                >
                  PayPal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-ink/50">© 2026 {COMPANY}</p>
          <ul className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink/70 transition-colors duration-300 ease-reveal hover:border-accent hover:text-accent"
                  data-cursor="grow"
                >
                  <s.icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
