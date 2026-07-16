import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SmoothScroll from "./lib/SmoothScroll";
import { Layout } from "./components/Layout";
import { CustomCursor } from "./components/CustomCursor";
import Home from "./pages/Home";

// Sub-routes are code-split so the landing page ships a leaner bundle.
const Leistungen = lazy(() => import("./pages/Leistungen"));
const Demo = lazy(() => import("./pages/Demo"));
const Anfrage = lazy(() => import("./pages/Anfrage"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Legal = () => import("./pages/Legal");
const Impressum = lazy(() => Legal().then((m) => ({ default: m.Impressum })));
const Datenschutz = lazy(() => Legal().then((m) => ({ default: m.Datenschutz })));
const AGB = lazy(() => Legal().then((m) => ({ default: m.AGB })));
const Widerruf = lazy(() => Legal().then((m) => ({ default: m.Widerruf })));

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
