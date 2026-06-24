import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:4188/getseensite/";
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("requestfailed", (r) => errors.push("reqfail: " + r.url() + " " + (r.failure()?.errorText ?? "")));
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const rootHtml = await page.$eval("#root", (el) => el.innerHTML.length).catch(() => -1);
console.log("#root innerHTML length:", rootHtml);
console.log(errors.length ? "ISSUES:\n" + errors.join("\n") : "no console/page/request errors");
await browser.close();
