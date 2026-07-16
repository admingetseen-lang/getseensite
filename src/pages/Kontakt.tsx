import { PageHeader } from "../components/PageHeader";
import { Reveal, Stagger } from "../components/Reveal";
import { fadeUp } from "../lib/motion";
import { CONTACT, EXTERNAL } from "../lib/site";
import {
  IconMail,
  IconPhone,
  IconPin,
  IconInstagram,
  IconTiktok,
  IconFacebook,
  IconLinkedin,
  IconArrow,
} from "../components/Icons";

const CARDS = [
  {
    icon: IconMail,
    label: "E-Mail",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: IconPhone,
    label: "Telefon",
    value: `${CONTACT.phoneFixed} · ${CONTACT.phoneMobile}`,
    href: `tel:${CONTACT.phoneFixed.replace(/\s/g, "")}`,
  },
  {
    icon: IconPin,
    label: "Adresse",
    value: `${CONTACT.street}, ${CONTACT.city}`,
    href: "https://maps.google.com/?q=Gewerbepark+Bwb+2+83052+Bruckmühl",
  },
];

const SOCIALS = [
  { icon: IconInstagram, href: EXTERNAL.instagram, label: "Instagram @getseen.shop" },
  { icon: IconTiktok, href: EXTERNAL.tiktok, label: "TikTok @getseen.shop" },
  { icon: IconFacebook, href: EXTERNAL.facebook, label: "Facebook" },
  { icon: IconLinkedin, href: EXTERNAL.linkedin, label: "LinkedIn · GetSeen UG" },
];

export default function Kontakt() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Sprechen wir über Ihr Projekt."
        intro="Ob Frage oder konkretes Vorhaben — wir freuen uns, von Ihnen zu hören."
      />

      <section className="relative overflow-hidden pb-section">
        <div aria-hidden className="glow-field" />
        <div className="shell">
        <Stagger className="grid gap-4 sm:grid-cols-3" stagger={0.1}>
          {CARDS.map((c) => (
            <Reveal key={c.label} variants={fadeUp}>
              <a
                href={c.href}
                target={c.label === "Adresse" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="glass glass-hover group flex h-full flex-col p-7"
                data-cursor="grow"
              >
                <c.icon className="h-5 w-5 text-accent" />
                <span className="label-mono mt-5">{c.label}</span>
                <span className="mt-1 font-medium text-ink">{c.value}</span>
              </a>
            </Reveal>
          ))}
        </Stagger>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          {/* Map embed with styled fallback (shown if the embed is blocked) */}
          <Reveal className="glass relative h-[320px] overflow-hidden !p-0">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
              <IconPin className="h-6 w-6 text-accent" />
              <span className="mt-1 font-medium text-ink">
                {CONTACT.street}, {CONTACT.city}
              </span>
              <a
                href="https://maps.google.com/?q=Gewerbepark+Bwb+2+83052+Bruckmühl"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm text-accent"
              >
                In Google Maps öffnen
              </a>
            </div>
            <iframe
              title="GetSeen Standort Bruckmühl"
              className="absolute inset-0 h-full w-full grayscale-[0.2]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=11.88%2C47.86%2C11.93%2C47.89&layer=mapnik&marker=47.875%2C11.905"
            />
          </Reveal>

          {/* Socials */}
          <Reveal delay={0.08} className="glass p-8">
            <h2 className="font-display text-xl font-semibold">Folgen Sie uns</h2>
            <ul className="mt-5 space-y-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-ink/75 transition-colors duration-200 hover:bg-white/5 hover:text-ink"
                    data-cursor="grow"
                  >
                    <span className="text-accent">
                      <s.icon />
                    </span>
                    <span className="flex-1">{s.label}</span>
                    <IconArrow className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        </div>
      </section>
    </>
  );
}
