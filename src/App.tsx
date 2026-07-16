import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SmoothScroll from "./lib/SmoothScroll";
import { Layout } from "./components/Layout";
import { CustomCursor } from "./components/CustomCursor";
import Home from "./pages/Home";

// Lazy loader that recovers from stale chunk references after a deploy:
// if the import fails (old cached index pointing at removed hashes), reload once.
function lazyRetry<T extends { default: React.ComponentType }>(load: () => Promise<T>) {
  return lazy(() =>
    load().catch((err) => {
      const key = "chunk-reload";
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
        return new Promise<never>(() => {});
      }
      throw err;
    })
  );
}

// Sub-routes are code-split so the landing page ships a leaner bundle.
const Leistungen = lazyRetry(() => import("./pages/Leistungen"));
const Demo = lazyRetry(() => import("./pages/Demo"));
const Anfrage = lazyRetry(() => import("./pages/Anfrage"));
const Kontakt = lazyRetry(() => import("./pages/Kontakt"));
const NotFound = lazyRetry(() => import("./pages/NotFound"));
const Legal = () => import("./pages/Legal");
const Impressum = lazyRetry(() => Legal().then((m) => ({ default: m.Impressum })));
const Datenschutz = lazyRetry(() => Legal().then((m) => ({ default: m.Datenschutz })));
const AGB = lazyRetry(() => Legal().then((m) => ({ default: m.AGB })));
const Widerruf = lazyRetry(() => Legal().then((m) => ({ default: m.Widerruf })));

function RouteFallback() {
  return <div className="min-h-[60vh]" aria-hidden />;
}

export default function App() {
  // Global toggle for the custom dot cursor.
  const CUSTOM_CURSOR = true;

  return (
    <SmoothScroll>
      {CUSTOM_CURSOR && <CustomCursor />}
      <Layout>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leistungen" element={<Leistungen />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/anfrage" element={<Anfrage />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/agb" element={<AGB />} />
            <Route path="/widerruf" element={<Widerruf />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </SmoothScroll>
  );
}
