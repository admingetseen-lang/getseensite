import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-center justify-center text-center">
      <span className="font-display text-display-lg text-accent">404</span>
      <h1 className="mt-4 text-display-sm">Seite nicht gefunden</h1>
      <p className="mt-4 max-w-prose text-lg text-ink/60">
        Die gewünschte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link to="/" className="btn-primary mt-8" data-cursor="grow">
        Zur Startseite
      </Link>
    </section>
  );
}
