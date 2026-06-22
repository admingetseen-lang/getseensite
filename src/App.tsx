import { Routes, Route } from "react-router-dom";
import SmoothScroll from "./lib/SmoothScroll";
import { Layout } from "./components/Layout";
import { CustomCursor } from "./components/CustomCursor";
import Home from "./pages/Home";
import Leistungen from "./pages/Leistungen";
import Anfrage from "./pages/Anfrage";
import Kontakt from "./pages/Kontakt";
import NotFound from "./pages/NotFound";
import { Impressum, Datenschutz, AGB, Widerruf } from "./pages/Legal";

export default function App() {
  // Global toggle for the custom dot cursor.
  const CUSTOM_CURSOR = true;

  return (
    <SmoothScroll>
      {CUSTOM_CURSOR && <CustomCursor />}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leistungen" element={<Leistungen />} />
          <Route path="/anfrage" element={<Anfrage />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          <Route path="/widerruf" element={<Widerruf />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </SmoothScroll>
  );
}
