#!/usr/bin/env node
/**
 * Prepares the client's Hero and Chronicle images for the page.
 * Run with `node scripts/prepare-hero-art.mjs`. Reads reference-materials/{hero,chronicle}.png
 * and writes public/brand/hero/. Nothing is painted in: every output is derived from those pixels.
 *
 *   hero-wide.jpg         the image as supplied
 *   hero-phone.jpg        a tall slice centred on the figure, enlarged so a 3x phone gets a
 *                         sharper picture than the browser's own scaling would give it
 *   hero-light-*.jpg      only the brightest pixels near the door, on black, for the entrance
 *   chronicle-base.jpg    the head with the gold taken out of its cracks, so they read as dark
 *   chronicle-cracks.jpg  exactly what was taken out, on black, for the page to light again
 */
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const OUT = "public/brand/hero";
await mkdir(OUT, { recursive: true });

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const raw = (input) => input.removeAlpha().raw().toBuffer({ resolveWithObject: true });
const fromRaw = (data, { width, height }) => sharp(data, { raw: { width, height, channels: 3 } });
const jpeg = (image, name, quality) =>
  image.jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:4:4" }).toFile(`${OUT}/${name}`);

/* ---- Hero ---------------------------------------------------------------- */

const HERO = "reference-materials/hero.png";
// Centred on the slit of light at x 960, and wide enough for short, wide phones.
const PHONE = { left: 620, top: 0, width: 680, height: 819 };
const ENLARGE = 2.5;

await jpeg(sharp(HERO), "hero-wide.jpg", 88);
await jpeg(
  sharp(HERO)
    .extract(PHONE)
    .resize(Math.round(PHONE.width * ENLARGE), Math.round(PHONE.height * ENLARGE), { kernel: "lanczos3" })
    .sharpen({ sigma: 1.15, m1: 0.4, m2: 1.1 }),
  "hero-phone.jpg",
  80,
);

// Bright pixels close to the door only: the clouds at the edges must not ignite with it.
const { data: heroData, info: heroInfo } = await raw(sharp(HERO));
const heroLight = Buffer.alloc(heroData.length);
for (let i = 0, p = 0; i < heroData.length; i += 3, p++) {
  const x = p % heroInfo.width;
  const y = Math.floor(p / heroInfo.width);
  const luma = 0.2126 * heroData[i] + 0.7152 * heroData[i + 1] + 0.0722 * heroData[i + 2];
  const near = 1 - smoothstep(170, 430, Math.hypot(x - 960, (y - 400) * 0.62));
  const k = smoothstep(105, 225, luma) * near;
  heroLight[i] = heroData[i] * k;
  heroLight[i + 1] = heroData[i + 1] * k;
  heroLight[i + 2] = heroData[i + 2] * k;
}
await jpeg(fromRaw(heroLight, heroInfo).resize({ width: 1280 }), "hero-light-wide.jpg", 76);
await jpeg(fromRaw(heroLight, heroInfo).extract(PHONE).resize({ width: 850 }), "hero-light-phone.jpg", 76);

/* ---- Chronicle ----------------------------------------------------------- */

const HEAD = "reference-materials/chronicle.png";
// The cracks all lie left of this, and the eclipse's ring all lies right of it.
const CRACKS_END_X = 1335;

const { data: headData, info: headInfo } = await raw(sharp(HEAD));
const { data: blurred } = await raw(sharp(HEAD).blur(7));
const base = Buffer.alloc(headData.length);
const cracks = Buffer.alloc(headData.length);
for (let i = 0, p = 0; i < headData.length; i += 3, p++) {
  const x = p % headInfo.width;
  const [r, g, b] = [headData[i], headData[i + 1], headData[i + 2]];
  // Stone stays under R-B 40. Gold runs well above it.
  // A spark's core burns white, so it counts as gold when the light around it is warm.
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const core = smoothstep(205, 245, luma) * smoothstep(14, 34, blurred[i] - blurred[i + 2]);
  const k = (x < CRACKS_END_X ? 1 : 0) * Math.max(smoothstep(42, 96, r - b), core);
  // What sits under the gold: the surrounding stone's brightness, tinted, taken down to a crack.
  const under = (0.2126 * blurred[i] + 0.7152 * blurred[i + 1] + 0.0722 * blurred[i + 2]) * 0.5;
  const out = [under * 1.02, under * 0.95, under * 0.88];
  [r, g, b].forEach((v, c) => {
    const kept = v * (1 - k) + out[c] * k;
    base[i + c] = kept;
    cracks[i + c] = Math.max(0, v - kept);
  });
}
await jpeg(fromRaw(base, headInfo), "chronicle-base.jpg", 88);
await jpeg(fromRaw(cracks, headInfo), "chronicle-cracks.jpg", 86);

console.log("Wrote", OUT);
