import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { CONTACT } from "../lib/site";
import { IconCheck, IconArrow } from "../components/Icons";

const SERVICES = [
  "Webdesign",
  "SEO-Optimierung",
  "KI-Integration",
  "Marketing & Social Media",
  "GetSeen Cloud",
];

export default function Anfrage() {
  const [sent, setSent] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const inputClass =
    "w-full rounded-2xl border border-line bg-white/10 px-4 py-3.5 text-base text-ink outline-none transition-colors duration-200 placeholder:text-ink/40 focus:border-accent";

  return (
    <>
      <PageHeader
        eyebrow="Anfrage"
        title="Erzählen Sie uns von Ihrem Projekt."
        intro="Füllen Sie das Formular aus — wir melden uns in der Regel innerhalb von 24 Stunden bei Ihnen."
      />

      <section className="shell pb-section">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            {sent ? (
              <div className="flex flex-col items-start gap-4 rounded-3xl glass border-accent/40 p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
                  <IconCheck className="h-6 w-6" />
                </span>
                <h2 className="font-display text-2xl font-semibold">Vielen Dank!</h2>
                <p className="text-ink/70">
                  Ihre Anfrage ist eingegangen. Wir melden uns in Kürze unter Ihrer
                  angegebenen E-Mail-Adresse.
                </p>
                <button className="btn-ghost mt-2" onClick={() => setSent(false)}>
                  Neue Anfrage
                </button>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink/70">
                      Name *
                    </label>
                    <input id="name" name="name" required className={inputClass} placeholder="Max Mustermann" />
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-ink/70">
                      Unternehmen
                    </label>
                    <input id="company" name="company" className={inputClass} placeholder="Mustermann GmbH" />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink/70">
                      E-Mail *
                    </label>
                    <input id="email" type="email" name="email" required className={inputClass} placeholder="max@beispiel.de" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink/70">
                      Telefon
                    </label>
                    <input id="phone" name="phone" className={inputClass} placeholder="+49 …" />
                  </div>
                </div>

                <fieldset>
                  <legend className="mb-2 block text-sm font-medium text-ink/70">
                    Woran sind Sie interessiert?
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => {
                      const active = picked.includes(s);
                      return (
                        <button
                          type="button"
                          key={s}
                          onClick={() => toggle(s)}
                          aria-pressed={active}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                            active
                              ? "border-accent bg-accent text-white"
                              : "border-line bg-white/10 text-ink/70 hover:border-white/40"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink/70">
                    Ihre Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="Beschreiben Sie kurz Ihr Vorhaben …"
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-ink/60">
                  <input type="checkbox" required className="mt-1 h-4 w-4 accent-accent" />
                  <span>
                    Ich habe die <a href="/datenschutz" className="link-underline text-accent">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu.
                  </span>
                </label>

                <button type="submit" className="btn-primary group" data-cursor="grow">
                  Anfrage absenden
                  <IconArrow className="h-5 w-5 transition-transform duration-300 ease-reveal group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </Reveal>

          {/* Aside */}
          <Reveal delay={0.1}>
            <div className="glass p-8">
              <h2 className="font-display text-xl font-semibold">Lieber direkt?</h2>
              <p className="mt-3 text-ink/65">
                Sie erreichen uns auch telefonisch oder per E-Mail.
              </p>
              <dl className="mt-6 space-y-4 text-ink/80">
                <div>
                  <dt className="text-sm text-ink/50">E-Mail</dt>
                  <dd>
                    <a href={`mailto:${CONTACT.email}`} className="link-underline">
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-ink/50">Telefon</dt>
                  <dd>{CONTACT.phoneFixed}</dd>
                  <dd>{CONTACT.phoneMobile}</dd>
                </div>
                <div>
                  <dt className="text-sm text-ink/50">Adresse</dt>
                  <dd>
                    {CONTACT.street}
                    <br />
                    {CONTACT.city}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
