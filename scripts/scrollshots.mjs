import { chromium } from "playwright";

// Capture the pinned scroll-video chapter at several progress points.
const url = process.argv[2] || "http://localhost:5173/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const vh = 900;
const stops = [
  ["v0", vh * 1.15], // frame expanding
  ["v1", vh * 1.7],  // statement 1
  ["v2", vh * 2.5],  // statement 2
  ["v3", vh * 3.4],  // statement 3 + chip
];
for (const [name, y] of stops) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(1400); // let lerp + video seek settle
  await page.screenshot({ path: `/tmp/sv_${name}.png` });
  console.log("saved", name);
}
await browser.close();
