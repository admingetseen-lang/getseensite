import { chromium } from "playwright";
import { readFileSync } from "node:fs";

// Decode AVIF (or any browser-supported image) to PNG via Chromium.
// args: pairs of <input> <output>
const args = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage();

for (let i = 0; i < args.length; i += 2) {
  const [input, output] = [args[i], args[i + 1]];
  const b64 = readFileSync(input).toString("base64");
  await page.setContent(
    `<img id="i" src="data:image/avif;base64,${b64}" style="display:block">`
  );
  await page.waitForFunction(() => {
    const img = document.getElementById("i");
    return img && img.complete && img.naturalWidth > 0;
  });
  const el = await page.$("#i");
  await el.screenshot({ path: output });
  console.log("decoded", input, "->", output);
}
await browser.close();
