/**
 * THE LOCKED DROPS — what shows through the veil.
 *
 * Reads reference-materials/drops/<slug>.<anything sharp can open> and writes the
 * blurred public/brand/drops/<slug>.jpg. To use a real image, put it there under the
 * same name and delete the stand-in SVG.
 *
 * The blur is baked in rather than applied in CSS, so the sharp picture is never
 * published. A CSS blur can be switched off in the browser, which would show an
 * unreleased garment to anyone who looked.
 *
 * Run with: node scripts/prepare-drop-art.mjs
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE = "reference-materials/drops";
const OUTPUT = "public/brand/drops";
const WIDTH = 480;
const HEIGHT = 1144;
const BLUR = 15;

await mkdir(OUTPUT, { recursive: true });

const files = await readdir(SOURCE);
const slugs = files.map((file) => path.parse(file).name);
if (new Set(slugs).size !== slugs.length) {
  throw new Error(`Two sources share a name in ${SOURCE}. Delete the stand-in: ${files.join(", ")}`);
}

for (const file of files) {
  const out = path.join(OUTPUT, `${path.parse(file).name}.jpg`);
  await sharp(path.join(SOURCE, file), { density: 144 })
    .resize(WIDTH, HEIGHT, { fit: "cover" })
    .blur(BLUR)
    .jpeg({ quality: 74, mozjpeg: true })
    .toFile(out);
  console.log(out);
}
