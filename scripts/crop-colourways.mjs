/**
 * COLOURWAY IMAGES
 *
 * Cuts the front-and-back stage out of each colourway sheet and writes one image
 * per design and colour to public/brand/colourways/<slug>--<colour>.jpg. Approved
 * by the client on 2026-11-01: see AGENTS.md, Colourway Canon.
 *
 * The PDFs hold one full-page JPEG per sheet, so extract those first:
 *
 *   pdfimages -all "reference-materials/colourways/THE SIGIL COLOURWAY 002.pdf" <dir>/sigil
 *
 * and repeat per design, using the slug as the prefix. Then:
 *
 *   node scripts/crop-colourways.mjs <dir>
 *
 * `rect` is [left, top, right, bottom] in sheet pixels. It keeps the two garments
 * and leaves out the sheet's typography and detail panels.
 *
 * `wipe` removes sheet typography no rect can avoid, because it sits on the set
 * beside a sleeve: [left, top, right, bottom, tone], where tone is the colour of the
 * type, "light" or "dark". The areas stop short of the garments
 * and start outside the crop, so the feather never leaves type at the crop's edge.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const K = "black";
const O = "deep-olive";
const B = "dark-chocolate-brown";
const N = "midnight-navy";
const S = "stone-beige";

const SIGIL_TITLE = [240, 270, 285, 314, "light"];
/** The paragraph beside the front garment, up to where that garment's body starts. */
const sigilParagraph = (right) => [[240, 420, right, 600, "light"], SIGIL_TITLE];

const DESIGNS = {
  architect: {
    sheets: [O, B, N, S, K],
    rect: [324, 38, 1376, 598],
    overrides: {
      [O]: { rect: [236, 58, 1288, 618], wipe: [[216, 40, 366, 98, "light"]] },
    },
  },
  sigil: {
    sheets: [K, O, B, N, S],
    rect: [262, 28, 1460, 628],
    overrides: {
      [K]: { wipe: sigilParagraph(340) },
      [O]: { wipe: sigilParagraph(368) },
      [B]: { wipe: sigilParagraph(362) },
      [N]: { wipe: [...sigilParagraph(340), [240, 360, 274, 420, "light"]] },
      [S]: { wipe: sigilParagraph(366) },
    },
  },
  witness: {
    sheets: [K, O, B, N, S],
    rect: [326, 28, 1392, 614],
  },
  fracture: {
    sheets: [K, O, B, N, S],
    rect: [218, 62, 1172, 655],
    overrides: {
      [B]: { wipe: [[196, 456, 284, 504, "light"]] },
    },
  },
  enemy: {
    sheets: [K, O, B, N, S],
    rect: [218, 62, 1172, 655],
  },
  unknown: {
    sheets: [K, O, B, N, S],
    rect: [124, 106, 1398, 668],
    wipe: [[96, 84, 296, 176, "light"]],
    overrides: {
      [K]: { wipe: [[96, 84, 296, 176, "dark"]] },
      [S]: { rect: [124, 100, 1398, 662], wipe: [[96, 84, 296, 176, "dark"]] },
    },
  },
};

const RADIUS = 4;
const BLUR = 3;
const FEATHER = 8;

function box(src, stride, channels, [left, top, right, bottom]) {
  const out = Uint8ClampedArray.from(src);
  for (let y = top; y < bottom; y++) {
    for (let x = left; x < right; x++) {
      for (let c = 0; c < channels; c++) {
        let sum = 0;
        for (let dy = -BLUR; dy <= BLUR; dy++) {
          for (let dx = -BLUR; dx <= BLUR; dx++) {
            sum += src[((y + dy) * stride + x + dx) * channels + c];
          }
        }
        out[(y * stride + x) * channels + c] = sum / (2 * BLUR + 1) ** 2;
      }
    }
  }
  return out;
}

/** One pass of a square min or max window over the area, per channel. */
function morph(src, stride, channels, [left, top, right, bottom], pick) {
  const out = Uint8ClampedArray.from(src);
  for (let y = top; y < bottom; y++) {
    for (let x = left; x < right; x++) {
      for (let c = 0; c < channels; c++) {
        let value = src[(y * stride + x) * channels + c];
        for (let dy = -RADIUS; dy <= RADIUS; dy++) {
          for (let dx = -RADIUS; dx <= RADIUS; dx++) {
            value = pick(value, src[((y + dy) * stride + x + dx) * channels + c]);
          }
        }
        out[(y * stride + x) * channels + c] = value;
      }
    }
  }
  return out;
}

/**
 * Removes the type's own tone first, or its letters would merge into a solid bar,
 * then the other tone, which takes the JPEG halo around the type. The two box
 * passes hide the square window those steps leave behind.
 */
function wipe(data, width, channels, [left, top, right, bottom, tone]) {
  const area = [left, top, right, bottom];
  const { min, max } = Math;
  let clean = data;
  for (const pick of tone === "dark" ? [max, min, min, max] : [min, max, max, min]) {
    clean = morph(clean, width, channels, area, pick);
  }
  for (let pass = 0; pass < 2; pass++) {
    clean = box(clean, width, channels, area);
  }
  for (let y = top; y < bottom; y++) {
    for (let x = left; x < right; x++) {
      const edge = Math.min(x - left, right - 1 - x, y - top, bottom - 1 - y);
      const mix = Math.min(1, edge / FEATHER);
      for (let c = 0; c < channels; c++) {
        const i = (y * width + x) * channels + c;
        data[i] = data[i] * (1 - mix) + clean[i] * mix;
      }
    }
  }
}

const dir = process.argv[2];
if (!dir) {
  console.error("usage: node scripts/crop-colourways.mjs <dir of extracted sheets>");
  process.exit(1);
}
const out = "public/brand/colourways";
mkdirSync(out, { recursive: true });

const sizes = {};
for (const [slug, design] of Object.entries(DESIGNS)) {
  for (const [index, colour] of design.sheets.entries()) {
    const { rect, wipe: areas = [] } = { ...design, ...design.overrides?.[colour] };
    const source = join(dir, `${slug}-${String(index).padStart(3, "0")}.jpg`);
    const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    for (const area of areas) {
      wipe(data, info.width, info.channels, area);
    }
    const [left, top, right, bottom] = rect;
    const width = right - left;
    const height = bottom - top;
    await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
      .extract({ left, top, width, height })
      .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
      .toFile(join(out, `${slug}--${colour}.jpg`));
    sizes[slug] = `${width}x${height}`;
  }
}
console.log(sizes);
