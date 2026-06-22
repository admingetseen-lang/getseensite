import { Routes, Route } from "react-router-dom";
import SmoothScroll from "./lib/SmoothScroll";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";

export default function App() {
  return (
    <SmoothScroll>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </SmoothScroll>
  );
}
