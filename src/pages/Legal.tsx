import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { CONTACT, COMPANY } from "../lib/site";

function LegalShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} />
      <section className="shell pb-section">
        <Reveal className="max-w-prose space-y-6 text-ink/75 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_a]:text-accent [&_a]:underline">
          {children}
        </Reveal>
      </section>
    </>
  );
}

const PLACEHOLDER = (
  <p className="rounded-2xl border border-line bg-paper p-4 text-sm text-ink/55">
    Hinweis: Dies ist ein Platzhaltertext. Bitte vor Veröffentlichung durch
    rechtssicheren Text (ggf. anwaltlich geprüft) ersetzen.
  </p>
);

export function Impressum() {
  return (
    <LegalShell eyebrow="Rechtliches" title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {COMPANY}
        <br />
        {CONTACT.street}
        <br />
        {CONTACT.city}
      </p>
      <h2>Kontakt</h2>
      <p>
        Telefon: {CONTACT.phoneFixed} · {CONTACT.phoneMobile}
        <br />
        E-Mail: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </p>
      <h2>Vertretungsberechtigte</h2>
      <p>Geschäftsführung der {COMPANY}.</p>
      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den
        allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen.
      </p>
      {PLACEHOLDER}
    </LegalShell>
  );
}

export function Datenschutz() {
  return (
    <LegalShell eyebrow="Rechtliches" title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist {COMPANY},
        {" "}
        {CONTACT.street}, {CONTACT.city},{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>
      <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
      <p>
        Wenn Sie uns über das Anfrageformular oder per E-Mail kontaktieren, werden
        die von Ihnen mitgeteilten Daten (Name, E-Mail, ggf. Telefon und
        Nachricht) zur Bearbeitung Ihrer Anfrage gespeichert.
      </p>
      <h2>3. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
        Verarbeitung, Datenübertragbarkeit sowie Widerspruch.
      </p>
      {PLACEHOLDER}
    </LegalShell>
  );
}

export function AGB() {
  return (
    <LegalShell eyebrow="Rechtliches" title="Allgemeine Geschäftsbedingungen">
      <h2>1. Geltungsbereich</h2>
      <p>
        Diese AGB gelten für alle Verträge zwischen {COMPANY} und ihren Kundinnen
        und Kunden über die Erbringung von Web-, SEO-, KI- und Marketingleistungen.
      </p>
      <h2>2. Vertragsschluss</h2>
      <p>
        Der Vertrag kommt durch die Annahme des Angebots durch die Kundin bzw. den
        Kunden zustande.
      </p>
      <h2>3. Leistungen und Vergütung</h2>
      <p>Umfang und Vergütung der Leistungen ergeben sich aus dem jeweiligen Angebot.</p>
      {PLACEHOLDER}
    </LegalShell>
  );
}

export function Widerruf() {
  return (
    <LegalShell eyebrow="Rechtliches" title="Widerruf & Rückerstattung">
      <h2>Widerrufsrecht</h2>
      <p>
        Verbraucher haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
        diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab
        dem Tag des Vertragsschlusses.
      </p>
      <h2>Ausübung des Widerrufs</h2>
      <p>
        Um Ihr Widerrufsrecht auszuüben, informieren Sie uns ({COMPANY},{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>) mittels einer
        eindeutigen Erklärung.
      </p>
      <h2>Rückerstattung</h2>
      <p>
        Im Falle eines wirksamen Widerrufs erstatten wir bereits erhaltene Zahlungen
        unverzüglich zurück.
      </p>
      {PLACEHOLDER}
    </LegalShell>
  );
}
