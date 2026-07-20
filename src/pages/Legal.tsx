import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { CONTACT, COMPANY, EXTERNAL } from "../lib/site";

/** Numbered legal section in the editorial hairline style. */
function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/10 py-8">
      <div className="grid gap-3 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
        <span className="label-mono pt-1 text-accent/80">{n}</span>
        <div className="min-w-0">
          <h2 className="font-display text-xl font-semibold">{title}</h2>
          <div className="mt-3 space-y-3 text-ink/65 [&_a]:text-accent [&_a:hover]:underline [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_strong]:text-ink/85">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function LegalShell({
  eyebrow,
  title,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={meta} />
      <Reveal className="shell max-w-4xl pb-section">
        <div className="border-b border-white/10">{children}</div>
        <p className="label-mono mt-8">© 2026 {COMPANY} · Made in Germany</p>
      </Reveal>
    </>
  );
}

const ADDRESS = (
  <p>
    {COMPANY}
    <br />
    {CONTACT.street}
    <br />
    {CONTACT.city}
    <br />
    Bayern, Deutschland
  </p>
);

/* ------------------------------------------------------------------ */

export function Impressum() {
  return (
    <LegalShell eyebrow="Rechtliches" title="Impressum" meta="Angaben gemäß § 5 DDG · Stand 2026">
      <Section n="01" title="Angaben zum Unternehmen">{ADDRESS}</Section>

      <Section n="02" title="Kontakt">
        <p>
          Telefon: <a href={`tel:${CONTACT.phoneFixed.replace(/\s/g, "")}`}>{CONTACT.phoneFixed}</a>
          <br />
          E-Mail: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <br />
          E-Mail (GetSeen Cloud): <a href="mailto:support@getseen.cloud">support@getseen.cloud</a>
          <br />
          Websites: <a href="https://www.getseen.shop">www.getseen.shop</a> ·{" "}
          <a href={EXTERNAL.cloud} target="_blank" rel="noopener noreferrer">
            www.getseen.cloud
          </a>
        </p>
      </Section>

      <Section n="03" title="Geschäftsführung">
        <p>
          Lukas David Buchberger-Göbl — Geschäftsführer
          <br />
          Benjamin Behring — Prokurist
          <br />
          Tobias Jakob Günzel — Prokurist
        </p>
      </Section>

      <Section n="04" title="Handelsregister">
        <p>
          Registernummer: HRB 34815
          <br />
          Umsatzsteuer-Identifikationsnummer (USt-ID): DE463075770
        </p>
      </Section>

      <Section n="05" title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          Lukas David Buchberger-Göbl
          <br />
          Benjamin Behring
          <br />
          Tobias Jakob Günzel
        </p>
        <p>Anschrift wie oben angegeben.</p>
      </Section>

      <Section n="06" title="Hinweis zur EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr
          </a>
        </p>
        <p>
          Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </Section>

      <Section n="07" title="Hosting & Serverstandort">
        <p>
          Diese Website wird bei einem externen Hosting-Dienstleister betrieben. Der
          Hosting-Dienstleister verarbeitet in unserem Auftrag Bestandsdaten, Kontaktdaten,
          Inhaltsdaten, Vertragsdaten, Nutzungsdaten sowie Meta- und Kommunikationsdaten von
          Websitebesuchern.
        </p>
        <p>
          <strong>Serverstandort:</strong> Die Verarbeitung erfolgt innerhalb der Europäischen
          Union (EU) bzw. des Europäischen Wirtschaftsraums (EWR).
          <br />
          <strong>Zweck:</strong> Bereitstellung, Auslieferung und Sicherheit der Website.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) sowie Art. 6 Abs. 1
          lit. b DSGVO (Vertragserfüllung).
        </p>
      </Section>

      <Section n="08" title="Haftung für Inhalte">
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Als
          Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich.
        </p>
        <p>
          Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter nicht verpflichtet, übermittelte oder
          gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
          eine rechtswidrige Tätigkeit hinweisen. Haftungsansprüche, die sich auf Schäden
          materieller oder ideeller Art durch fehlerhafte Informationen beziehen, sind
          grundsätzlich ausgeschlossen, sofern kein vorsätzliches oder grob fahrlässiges
          Verschulden vorliegt.
        </p>
      </Section>

      <Section n="09" title="Haftung für Links">
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
          verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
          Rechtsverstöße überprüft — rechtswidrige Inhalte waren zu diesem Zeitpunkt nicht
          erkennbar.
        </p>
        <p>
          Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          Durch das Setzen von Links machen wir uns die Inhalte der verlinkten Seiten nicht zu
          eigen.
        </p>
      </Section>

      <Section n="10" title="Urheberrecht">
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung
          des jeweiligen Autors.
        </p>
        <p>
          Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
          Gebrauch gestattet. Soweit Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
          werden Urheberrechte Dritter beachtet. Bei Bekanntwerden von Urheberrechtsverletzungen
          werden wir entsprechende Inhalte umgehend entfernen.
        </p>
      </Section>
    </LegalShell>
  );
}

/* ------------------------------------------------------------------ */

export function Datenschutz() {
  return (
    <LegalShell
      eyebrow="Rechtliches"
      title="Datenschutzerklärung"
      meta="Stand: 2026 · DSGVO-konform · Hosting in der EU"
    >
      <Section n="01" title="Verantwortlicher">
        {ADDRESS}
        <p>
          Geschäftsführer: Lukas David Buchberger-Göbl
          <br />
          E-Mail: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
        <p>Bei Fragen zum Datenschutz wenden Sie sich jederzeit an die oben genannte E-Mail-Adresse.</p>
      </Section>

      <Section n="02" title="Allgemeine Hinweise">
        <p>
          Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir verarbeiten Ihre Daten
          ausschließlich im Rahmen der gesetzlichen Bestimmungen der DSGVO und des BDSG.
        </p>
        <p>
          Diese Website setzt keine Tracking-, Analyse- oder Werbedienste ein. Das Hosting erfolgt
          innerhalb der Europäischen Union.
        </p>
        <p>
          Für die Nutzung des Produkts <strong>GetSeen Cloud</strong> gilt die gesonderte
          Datenschutzerklärung unter{" "}
          <a href={EXTERNAL.cloud} target="_blank" rel="noopener noreferrer">
            getseen.cloud
          </a>
          .
        </p>
      </Section>

      <Section n="03" title="Server-Logfiles">
        <p>Beim Besuch der Website werden automatisch folgende Daten erfasst:</p>
        <ul>
          <li>IP-Adresse</li>
          <li>Browsertyp und -version</li>
          <li>Betriebssystem</li>
          <li>Aufgerufene Seiten und Zeitpunkt des Zugriffs</li>
          <li>HTTP-Statuscode</li>
        </ul>
        <p>
          Diese Daten dienen ausschließlich der technischen Sicherheit, Fehlerdiagnose und dem
          Betrieb der Website. Sie werden nicht mit anderen Datenquellen zusammengeführt und nach
          spätestens 30 Tagen gelöscht. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </Section>

      <Section n="04" title="Kontaktaufnahme & Anfrage-Formular">
        <p>
          Wenn Sie uns per Formular, E-Mail oder Telefon kontaktieren, verarbeiten wir die von
          Ihnen mitgeteilten Daten (Name, E-Mail-Adresse, ggf. Unternehmen, Telefonnummer und
          Nachricht) zur Bearbeitung Ihrer Anfrage und für Anschlussfragen.
        </p>
        <p>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Anbahnung bzw. Erfüllung eines Vertrags)
          sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von
          Anfragen). Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr
          erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </Section>

      <Section n="05" title="KI-Demo-Generator">
        <p>
          Auf unserer Website können Sie kostenlos eine Website-Demo erstellen lassen. Die
          Generierung erfolgt über die API von Anthropic:
        </p>
        <p>
          <strong>Anbieter:</strong> Anthropic PBC, San Francisco, USA
          <br />
          Datenschutzerklärung:{" "}
          <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">
            anthropic.com/legal/privacy
          </a>
        </p>
        <p>Welche Daten werden verarbeitet?</p>
        <ul>
          <li>Der Inhalt Ihres Briefings (Firmenname, Branche, Angebot etc.)</li>
          <li>Technische Metadaten zur Anfrage (Zeitstempel, Modell-ID)</li>
        </ul>
        <p>Wichtige Hinweise zur Nutzung:</p>
        <ul>
          <li>
            Ihre Anfragen werden über unseren Server an Anthropic weitergeleitet; Ihre IP-Adresse
            wird dabei nicht an Anthropic übermittelt.
          </li>
          <li>Wir speichern keine Briefings oder generierten Demos auf unseren Servern.</li>
          <li>
            Anthropic verwendet API-Eingaben nach eigenen Angaben standardmäßig nicht zum
            Trainieren von Modellen.
          </li>
          <li>
            Bei der Übermittlung in die USA stützt sich Anthropic auf EU-Standardvertragsklauseln
            bzw. das EU-US Data Privacy Framework.
          </li>
          <li>
            Bitte geben Sie keine sensiblen personenbezogenen Daten, Passwörter oder vertraulichen
            Inhalte in das Briefing ein.
          </li>
        </ul>
        <p>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch aktive Nutzung des
          Generators) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
          Demonstration unserer Leistungen). Die Nutzung ist freiwillig — die Website funktioniert
          vollständig ohne den Generator.
        </p>
      </Section>

      <Section n="06" title="Webfonts (lokal gehostet)">
        <p>
          Zur einheitlichen Darstellung verwendet diese Website die Schriftarten Clash Display
          und Satoshi. Diese werden <strong>lokal von unserem Server ausgeliefert</strong> und
          nicht von externen Anbietern (etwa Google Fonts oder Fontshare) nachgeladen. Dabei
          werden <strong>keine Daten — insbesondere keine IP-Adresse — an Dritte übermittelt.</strong>
        </p>
        <p>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
          einheitlichen, performanten und datensparsamen Darstellung).
        </p>
      </Section>

      <Section n="07" title="Kartendienst (OpenStreetMap)">
        <p>
          Auf der Kontaktseite binden wir eine Karte von OpenStreetMap ein (OpenStreetMap
          Foundation, Großbritannien). Beim Laden der Karte wird Ihre IP-Adresse an die Server von
          OpenStreetMap übermittelt.
        </p>
        <p>
          Datenschutzerklärung:{" "}
          <a
            href="https://wiki.osmfoundation.org/wiki/Privacy_Policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            wiki.osmfoundation.org/wiki/Privacy_Policy
          </a>
          . Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </Section>

      <Section n="08" title="Cookies & Local Storage">
        <p>
          Diese Website setzt keine Cookies und verwendet keine Tracking-, Analyse- oder
          Werbe-Dienste. Es gibt keine Einbindung von Google Analytics, Facebook Pixel oder
          ähnlichen Diensten.
        </p>
      </Section>

      <Section n="09" title="Rechtsgrundlage der Verarbeitung">
        <ul>
          <li>Art. 6 Abs. 1 lit. b DSGVO — Vertragserfüllung und -anbahnung (Anfragen, Projekte)</li>
          <li>
            Art. 6 Abs. 1 lit. f DSGVO — Berechtigtes Interesse (Sicherheit, Fehlerdiagnose,
            Missbrauchsschutz)
          </li>
          <li>Art. 6 Abs. 1 lit. c DSGVO — Gesetzliche Verpflichtung (Aufbewahrungsfristen)</li>
          <li>Art. 6 Abs. 1 lit. a DSGVO — Einwilligung (z. B. Nutzung des Demo-Generators)</li>
        </ul>
      </Section>

      <Section n="10" title="Speicherdauer">
        <ul>
          <li>Anfragedaten: solange die Bearbeitung bzw. Geschäftsbeziehung andauert</li>
          <li>Rechnungsdaten: 10 Jahre gemäß gesetzlicher Aufbewahrungspflicht (§ 147 AO)</li>
          <li>Server-Logfiles: maximal 30 Tage</li>
        </ul>
      </Section>

      <Section n="11" title="Ihre Rechte">
        <p>Sie haben gegenüber uns folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
        <ul>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte wenden Sie sich an:{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
        <p>
          Sie haben außerdem das Recht, sich bei der zuständigen Datenschutz-Aufsichtsbehörde zu
          beschweren. In Bayern ist dies das Bayerische Landesamt für Datenschutzaufsicht (BayLDA),{" "}
          <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer">
            www.lda.bayern.de
          </a>
          .
        </p>
      </Section>

      <Section n="12" title="Datensicherheit">
        <ul>
          <li>SSL/TLS-Verschlüsselung der gesamten Datenübertragung</li>
          <li>Regelmäßige Sicherheitsupdates der Server-Infrastruktur</li>
          <li>Zugriff auf Systeme nur für autorisierte Personen</li>
        </ul>
      </Section>

      <Section n="13" title="Änderungen dieser Datenschutzerklärung">
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, etwa bei
          Änderungen der Website oder der Rechtslage. Die jeweils aktuelle Version ist auf dieser
          Seite verfügbar.
        </p>
      </Section>
    </LegalShell>
  );
}

/* ------------------------------------------------------------------ */

export function AGB() {
  return (
    <LegalShell
      eyebrow="Rechtliches"
      title="Allgemeine Geschäftsbedingungen"
      meta={`Stand: 2026 · ${COMPANY}`}
    >
      <Section n="01" title="Anbieter">
        {ADDRESS}
        <p>
          Geschäftsführer: Lukas David Buchberger-Göbl
          <br />
          E-Mail: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
      </Section>

      <Section n="02" title="Geltungsbereich">
        <p>
          Diese AGB gelten für sämtliche Verträge zwischen der {COMPANY} (nachfolgend „Anbieter")
          und ihren Kundinnen und Kunden über Webdesign-, SEO-, KI-Integrations- und
          Marketing-Dienstleistungen. Abweichende Bedingungen des Kunden finden keine Anwendung,
          es sei denn, der Anbieter stimmt diesen ausdrücklich schriftlich zu.
        </p>
        <p>
          Für die Nutzung des Produkts <strong>GetSeen Cloud</strong> gelten die gesonderten
          Nutzungsbedingungen unter{" "}
          <a href={EXTERNAL.cloud} target="_blank" rel="noopener noreferrer">
            getseen.cloud
          </a>
          .
        </p>
      </Section>

      <Section n="03" title="Vertragsgegenstand">
        <p>Der Anbieter erbringt Dienstleistungen in den Bereichen:</p>
        <ul>
          <li>Konzeption, Gestaltung und Umsetzung von Websites (Webdesign)</li>
          <li>Suchmaschinenoptimierung (SEO)</li>
          <li>KI-Integration (z. B. KI-Assistenten, telefonischer Rezeptionist)</li>
          <li>Online-Marketing und Social Media</li>
        </ul>
        <p>
          Der konkrete Leistungsumfang, Termine und Vergütung ergeben sich aus dem jeweiligen
          Angebot bzw. der Auftragsbestätigung.
        </p>
      </Section>

      <Section n="04" title="Vertragsschluss">
        <p>
          Der Vertrag kommt durch die Annahme des Angebots des Anbieters durch den Kunden zustande
          (z. B. per E-Mail oder Unterschrift). Angebote des Anbieters sind freibleibend, sofern
          nicht ausdrücklich als verbindlich bezeichnet.
        </p>
      </Section>

      <Section n="05" title="Vergütung und Zahlung">
        <p>
          Es gilt die im Angebot vereinbarte Vergütung. Alle Preise verstehen sich, sofern nicht
          anders angegeben, als Bruttopreise in Euro inkl. gesetzlicher MwSt. Rechnungen sind,
          sofern nicht anders vereinbart, innerhalb von 14 Tagen ohne Abzug zahlbar.
        </p>
        <p>
          Bei laufenden Betreuungsleistungen (z. B. Wartung, SEO-Betreuung) erfolgt die Abrechnung
          monatlich, sofern nicht anders vereinbart.
        </p>
      </Section>

      <Section n="06" title="Mitwirkungspflichten des Kunden">
        <p>
          Der Kunde stellt dem Anbieter alle für die Leistungserbringung erforderlichen Inhalte
          (Texte, Bilder, Logos, Zugänge) rechtzeitig zur Verfügung und erteilt Freigaben ohne
          schuldhaftes Zögern.
        </p>
        <p>
          Der Kunde sichert zu, dass die von ihm bereitgestellten Inhalte keine Rechte Dritter
          (insbesondere Urheber-, Marken- und Persönlichkeitsrechte) verletzen, und stellt den
          Anbieter insoweit von Ansprüchen Dritter frei.
        </p>
      </Section>

      <Section n="07" title="Nutzungsrechte">
        <p>
          Mit vollständiger Zahlung der vereinbarten Vergütung erhält der Kunde die für den
          vereinbarten Zweck erforderlichen Nutzungsrechte an den erstellten Arbeitsergebnissen.
        </p>
        <p>
          Der Anbieter ist berechtigt, die erbrachten Leistungen als Referenz zu benennen und
          angemessen darzustellen (z. B. im Portfolio), sofern der Kunde dem nicht widerspricht.
        </p>
      </Section>

      <Section n="08" title="Widerrufsrecht">
        <p>
          Verbraucher haben ein gesetzliches Widerrufsrecht von 14 Tagen ab Vertragsschluss. Das
          Widerrufsrecht erlischt vorzeitig, wenn der Anbieter die Dienstleistung vollständig
          erbracht hat und mit der Ausführung erst begonnen hat, nachdem der Verbraucher dazu
          seine ausdrückliche Zustimmung gegeben hat.
        </p>
        <p>
          Das Muster-Widerrufsformular sowie weitere Informationen finden Sie in der{" "}
          <a href="/widerruf">Widerrufsbelehrung</a>.
        </p>
      </Section>

      <Section n="09" title="Haftung">
        <p>
          Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Schäden
          aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
        </p>
        <p>
          Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher
          Vertragspflichten (Kardinalpflichten). Die Haftung ist auf den vertragstypischen,
          vorhersehbaren Schaden begrenzt.
        </p>
        <p>
          Eine Haftung für mittelbare Schäden, entgangenen Gewinn oder Datenverlust durch höhere
          Gewalt ist ausgeschlossen.
        </p>
      </Section>

      <Section n="10" title="Kündigung laufender Verträge">
        <p>
          Laufende Betreuungsverträge können, sofern nicht anders vereinbart, von beiden Seiten
          mit einer Frist von einem Monat zum Monatsende gekündigt werden. Das Recht zur
          außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
        </p>
      </Section>

      <Section n="11" title="Datenschutz">
        <p>
          Die Verarbeitung personenbezogener Daten erfolgt gemäß DSGVO. Es gilt die gesonderte{" "}
          <a href="/datenschutz">Datenschutzerklärung</a>.
        </p>
      </Section>

      <Section n="12" title="Schlussbestimmungen">
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts
          (CISG). Gerichtsstand ist — soweit gesetzlich zulässig — der Sitz des Anbieters in
          Bruckmühl, Bayern.
        </p>
        <p>
          Für Verbraucher innerhalb der EU gilt: Die EU-Kommission stellt eine Plattform zur
          Online-Streitbeilegung bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
            ec.europa.eu/consumers/odr
          </a>
          . Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle nicht verpflichtet und nehmen daran nicht teil.
        </p>
      </Section>

      <Section n="13" title="Salvatorische Klausel">
        <p>
          Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der
          übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt eine
          wirksame Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten
          kommt.
        </p>
      </Section>
    </LegalShell>
  );
}

/* ------------------------------------------------------------------ */

export function Widerruf() {
  return (
    <LegalShell
      eyebrow="Rechtliches"
      title="Widerrufsbelehrung"
      meta="Stand 2026 · Gilt für alle kostenpflichtigen Leistungen"
    >
      <Section n="01" title="Widerrufsrecht">
        <p>
          Verbraucher haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen
          Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
          Vertragsschlusses.
        </p>
        <p>
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung
          (z. B. per E-Mail) über Ihren Entschluss informieren:
        </p>
        {ADDRESS}
        <p>
          E-Mail: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
      </Section>

      <Section n="02" title="Folgen des Widerrufs">
        <p>
          Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
          erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
          zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist.
        </p>
        <p>
          Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
          ursprünglichen Transaktion eingesetzt haben, es sei denn, es wurde ausdrücklich etwas
          anderes vereinbart.
        </p>
      </Section>

      <Section n="03" title="Erlöschen des Widerrufsrechts">
        <p>
          Das Widerrufsrecht erlischt bei Dienstleistungen vorzeitig, wenn wir die Leistung
          vollständig erbracht haben und mit der Ausführung erst begonnen haben, nachdem Sie dazu
          Ihre ausdrückliche Zustimmung gegeben und Ihre Kenntnis vom Erlöschen des
          Widerrufsrechts bestätigt haben.
        </p>
        <p>
          Bei digitalen Leistungen erlischt das Widerrufsrecht ebenfalls vorzeitig, wenn Sie
          ausdrücklich zugestimmt haben, dass mit der Ausführung vor Ablauf der Widerrufsfrist
          begonnen wird.
        </p>
      </Section>

      <Section n="04" title="Muster-Widerrufsformular">
        <p>
          Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden
          Sie es an <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>:
        </p>
        <div className="glass mt-2 p-6 text-[0.95rem] leading-relaxed text-ink/70">
          <p>
            An {COMPANY}, {CONTACT.street}, {CONTACT.city}, {CONTACT.email}:
          </p>
          <p className="mt-3">
            Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die
            Erbringung der folgenden Dienstleistung: …
          </p>
          <ul className="mt-3 list-none space-y-1 !pl-0">
            <li>— Bestellt am (*) / erhalten am (*): …</li>
            <li>— Name des/der Verbraucher(s): …</li>
            <li>— Anschrift des/der Verbraucher(s): …</li>
            <li>— Datum: …</li>
            <li>— Unterschrift (nur bei Mitteilung auf Papier)</li>
          </ul>
          <p className="label-mono mt-4">(*) Unzutreffendes streichen</p>
        </div>
      </Section>
    </LegalShell>
  );
}
