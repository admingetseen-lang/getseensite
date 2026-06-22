import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:5173/";
const out = process.argv[3] || "/tmp/shot.png";
const full = process.argv[4] === "full";
const wait = Number(process.argv[5] || 1800);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(wait);
await page.screenshot({ path: out, fullPage: full });
await browser.close();
console.log("saved", out);
