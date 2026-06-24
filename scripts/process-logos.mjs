import sharp from "sharp";

const SRC = "public/brand/";

// Remove a (near-)white background from an RGB logo by un-premultiplying white:
// alpha = how far the pixel is from white; colour is recovered over transparency.
async function keyOutWhite(input, outPath, targetH) {
  const trimmed = await sharp(input)
    .trim({ background: "#ffffff", threshold: 12 })
    .toBuffer();
  const { data, info } = await sharp(trimmed)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0, j = 0; i < data.length; i += channels, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = 255 - Math.min(r, g, b); // white -> 0, saturated -> high
    if (a === 0) {
      out[j] = out[j + 1] = out[j + 2] = out[j + 3] = 0;
    } else {
      const k = 255 / a;
      out[j] = Math.max(0, Math.min(255, Math.round((r - (255 - a)) * k)));
      out[j + 1] = Math.max(0, Math.min(255, Math.round((g - (255 - a)) * k)));
      out[j + 2] = Math.max(0, Math.min(255, Math.round((b - (255 - a)) * k)));
      out[j + 3] = a;
    }
  }
  await sharp(out, { raw: { width, height, channels: 4 } })
    .resize({ height: targetH, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log("wrote", outPath);
}

// Resize an already-transparent PNG, trimming transparent margin.
async function resizeTransparent(input, outPath, targetH) {
  await sharp(input)
    .trim()
    .resize({ height: targetH, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log("wrote", outPath);
}

// Agency eye-G mark (key out white)
await keyOutWhite(SRC + "GetSeen Logo Clean.jpg", SRC + "getseen.png", 140);
// Cloud icon (transparent already)
await resizeTransparent(SRC + "GetSeen Cloud Favicon.png", SRC + "getseen-cloud.png", 140);
// Favicons
await keyOutWhite(SRC + "GetSeen Logo Clean.jpg", "public/favicon-256.png", 256);
await resizeTransparent(SRC + "GetSeen Cloud Favicon.png", "public/favicon-cloud-256.png", 256);

console.log("done");
