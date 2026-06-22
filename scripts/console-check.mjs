import { chromium } from "playwright";

const routes = ["/", "/leistungen", "/anfrage", "/kontakt", "/impressum", "/nope"];
const browser = await chromium.launch();
const errors = [];

for (const r of routes) {
  const page = await browser.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${r}] console: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${r}] pageerror: ${e.message}`));
  await page.goto("http://localhost:5173" + r, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.close();
}
await browser.close();

if (errors.length) {
  console.log("ERRORS:\n" + errors.join("\n"));
  process.exit(1);
} else {
  console.log("No console/page errors across", routes.length, "routes");
}
