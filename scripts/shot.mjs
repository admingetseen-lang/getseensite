import { chromium } from "playwright";

// args: url out [full|viewport|selector:#id] [waitMs] [reduced]
const url = process.argv[2] || "http://localhost:5173/";
const out = process.argv[3] || "/tmp/shot.png";
const mode = process.argv[4] || "viewport";
const wait = Number(process.argv[5] || 1500);
const reduced = process.argv[6] === "reduced";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: reduced ? "reduce" : "no-preference",
});
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(wait);

if (mode.startsWith("selector:")) {
  const sel = mode.slice("selector:".length);
  const el = await page.$(sel);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await el.screenshot({ path: out });
} else {
  await page.screenshot({ path: out, fullPage: mode === "full" });
}
await browser.close();
console.log("saved", out);
