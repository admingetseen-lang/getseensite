import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // Root "/" for custom-domain / Netlify / Vercel; CI sets BASE_PATH
  // (e.g. "/getseensite/") for GitHub Pages project sites.
  base: process.env.BASE_PATH ?? "/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
