import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:5173/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
// no reduced motion
await page.goto(url, { waitUntil: "domcontentloaded" });
// capture early + late frames of the hero on load
await page.waitForTimeout(120);
await page.screenshot({ path: "/tmp/frame_a.png" });
await page.waitForTimeout(900);
await page.screenshot({ path: "/tmp/frame_b.png" });
console.log("captured frame_a (120ms) and frame_b (1020ms)");
await browser.close();
