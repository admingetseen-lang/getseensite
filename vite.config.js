var _a;
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
// https://vitejs.dev/config/
export default defineConfig({
    // Root "/" for custom-domain / Netlify / Vercel; CI sets BASE_PATH
    // (e.g. "/getseensite/") for GitHub Pages project sites.
    base: (_a = process.env.BASE_PATH) !== null && _a !== void 0 ? _a : "/",
    plugins: [react()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        host: true,
        port: 5173,
    },
});
