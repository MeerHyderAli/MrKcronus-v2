"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { MotionValue } from "motion/react";

/**
 * PARTICLE MORPH — THE THRESHOLD'S OPENING
 *
 * MR.KCRONUS held in shimmering ivory particles, released by scroll from the
 * centre outward and re-gathered as the symbol. At the end the canonical mark
 * dissolves back into them and the camera passes through it. Approved by the client against a particle-logo
 * reference; recorded in AGENTS.md under Hero.
 *
 * NO GEOMETRY IS DRAWN HERE
 * Every particle position is sampled from the canonical mask PNGs, normalised
 * to the image, and mapped into the on-screen box of the real DOM element it
 * stands in for (`fromRef` / `toRef`). The particles therefore land exactly
 * where the canonical mark resolves, and the canonical asset is what remains.
 *
 * COST
 * Raw WebGL, one draw call, no library. Positions are uploaded once; the vertex
 * shader does all the travel. Per frame the CPU writes a handful of uniforms.
 * The loop runs only while the canvas is on screen.
 *
 * FALLBACK
 * Reduced motion or no WebGL: nothing renders and `onReady` never fires, so the
 * Hero keeps its DOM wordmark. Hero only mounts this in the full-motion tree.
 */

const WORDMARK_MASK = "/brand/mrkcronus-wordmark-mask.png";
const SYMBOL_MASK = "/brand/mrkcronus-symbol-mask.png";

type Props = {
  /** 0 = wordmark, 1 = symbol. */
  morph: MotionValue<number>;
  /** 0 = at rest, 1 = the camera has passed through the symbol. */
  exit: MotionValue<number>;
  /** Global particle opacity, so the particles can settle away. */
  fade: MotionValue<number>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  /** Must be stable (useCallback): it restarts the scene when it changes. */
  onReady: () => void;
  className?: string;
};

const VERTEX = `
attribute vec2 a_from;
attribute vec2 a_to;
attribute vec4 a_seed;
uniform vec4 u_fromBox;
uniform vec4 u_toBox;
uniform vec2 u_res;
uniform float u_morph;
uniform float u_exit;
uniform float u_time;
uniform float u_dpr;
uniform float u_size;
varying float v_alpha;

const float PI = 3.14159;
// Camera distance for the perspective projection, in CSS px.
const float FOCAL = 900.0;

float ease(float t) {
  return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
}

void main() {
  // Release from the centre of the wordmark outward, loosened per particle.
  float delay = abs(a_from.x) * 0.64 + a_seed.x * 0.18;
  float t = ease(clamp((u_morph - delay) / 0.5, 0.0, 1.0));

  vec2 from = u_fromBox.xy + a_from * u_fromBox.zw;
  vec2 to = u_toBox.xy + a_to * u_toBox.zw;
  vec2 p = mix(from, to, t);

  // Mid-flight the particle swings wide and through depth, toward the viewer
  // or away, and comes back.
  float flight = sin(PI * t);
  float angle = a_seed.y * 2.0 * PI;
  p += vec2(cos(angle), sin(angle)) * flight * (80.0 + a_seed.z * 340.0);
  float z = flight * (a_seed.w - 0.35) * 700.0;

  // The exit: the camera passes through the symbol. Each particle reaches the
  // viewer at its own moment and is gone once it has passed.
  float e = clamp((u_exit - a_seed.w * 0.4) / 0.6, 0.0, 1.0);
  e *= e;
  z += e * FOCAL * 0.96;

  // The shimmer: a sub-pixel drift and a slow twinkle.
  p += vec2(sin(u_time * 0.9 + a_seed.x * 40.0), cos(u_time * 0.7 + a_seed.y * 40.0)) * 0.6;
  float twinkle = 0.6 + 0.4 * sin(u_time * (0.8 + a_seed.w * 1.6) + a_seed.z * 2.0 * PI);

  vec2 centre = u_res * 0.5;
  float scale = FOCAL / (FOCAL - z);
  p = centre + (p - centre) * scale;

  vec2 clip = (p / u_res) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = min((1.4 + a_seed.w * 1.2) * u_size * scale, 18.0) * u_dpr;
  v_alpha = twinkle * (1.0 - flight * 0.3) * (1.0 - smoothstep(0.55, 1.0, e));
}
`;

const FRAGMENT = `
precision mediump float;
uniform float u_fade;
varying float v_alpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.15, d) * v_alpha * u_fade;
  gl_FragColor = vec4(0.961, 0.961, 0.941, 1.0) * a;
}
`;

/** Opaque pixels of a mask, normalised to [-0.5, 0.5] of the image. */
async function sampleMask(src: string, maxSide: number) {
  const img = new Image();
  img.src = src;
  await img.decode();
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);
  const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d canvas unavailable");
  ctx.canvas.width = w;
  ctx.canvas.height = h;
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  const points: number[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 128) points.push(x / w - 0.5, y / h - 0.5);
    }
  }
  if (points.length === 0) throw new Error(`empty mask ${src}`);
  return { points, aspect: img.width / img.height, pixel: 1 / w };
}

/** Pick `n` random samples, jittered inside their source pixel. */
function pick(points: number[], n: number, pixel: number, aspect: number) {
  const out = new Float32Array(n * 2);
  const count = points.length / 2;
  for (let i = 0; i < n; i++) {
    const j = Math.floor(Math.random() * count) * 2;
    out[i * 2] = points[j] + Math.random() * pixel;
    out[i * 2 + 1] = points[j + 1] + Math.random() * pixel * aspect;
  }
  return out;
}

/** Centre and size of the artwork drawn `contain` inside an element, in stage px. */
function box(el: HTMLElement, stage: DOMRect, aspect: number): [number, number, number, number] {
  // offset* sizes ignore the motion transforms on ancestors; both elements are
  // centred in the stage, so the centre comes from the stage itself.
  let w = el.offsetWidth;
  let h = el.offsetHeight;
  if (w / h > aspect) w = h * aspect;
  else h = w / aspect;
  return [stage.width / 2, stage.height / 2, w, h];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "shader compile failed");
  }
  return shader;
}

export default function ParticleMorph({
  morph,
  exit,
  fade,
  fromRef,
  toRef,
  onReady,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    let disposed = false;
    let frame = 0;
    let visible = true;
    let startedAt = 0;
    const cleanup: (() => void)[] = [];

    (async () => {
      // Same breakpoint as useCompactMotion; read once, a resize does not rebuild.
      const compact = matchMedia("(max-width: 63.99rem)").matches;
      const count = compact ? 4200 : 18000;
      const [word, mark] = await Promise.all([
        sampleMask(WORDMARK_MASK, 900),
        sampleMask(SYMBOL_MASK, 600),
      ]);
      if (disposed) return;

      const program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? "program link failed");
      }
      gl.useProgram(program);

      const seeds = new Float32Array(count * 4);
      for (let i = 0; i < seeds.length; i++) seeds[i] = Math.random();
      const attributes: [string, Float32Array, number][] = [
        ["a_from", pick(word.points, count, word.pixel, word.aspect), 2],
        ["a_to", pick(mark.points, count, mark.pixel, mark.aspect), 2],
        ["a_seed", seeds, 4],
      ];
      for (const [name, data, size] of attributes) {
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        const location = gl.getAttribLocation(program, name);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
      }

      const u = (name: string) => gl.getUniformLocation(program, name);
      const uFromBox = u("u_fromBox");
      const uToBox = u("u_toBox");
      const uRes = u("u_res");
      const uMorph = u("u_morph");
      const uExit = u("u_exit");
      const uTime = u("u_time");
      const uDpr = u("u_dpr");
      const uFade = u("u_fade");

      gl.uniform1f(u("u_size"), compact ? 1 : 1.6);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      const resize = () => {
        const fromEl = fromRef.current;
        const toEl = toRef.current;
        if (!fromEl || !toEl) return;
        const stage = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(stage.width * dpr);
        canvas.height = Math.round(stage.height * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uRes, stage.width, stage.height);
        gl.uniform1f(uDpr, dpr);
        gl.uniform4f(uFromBox, ...box(fromEl, stage, word.aspect));
        gl.uniform4f(uToBox, ...box(toEl, stage, mark.aspect));
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      cleanup.push(() => resizeObserver.disconnect());

      const render = (now: number) => {
        frame = 0;
        if (disposed || !visible) return;
        startedAt ||= now;
        // Fade the particles in over the DOM wordmark they replace.
        const intro = Math.min(1, (now - startedAt) / 900);
        gl.uniform1f(uMorph, morph.get());
        gl.uniform1f(uExit, exit.get());
        gl.uniform1f(uFade, fade.get() * intro);
        gl.uniform1f(uTime, now / 1000);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, count);
        frame = requestAnimationFrame(render);
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !frame) frame = requestAnimationFrame(render);
      });
      io.observe(canvas);
      cleanup.push(() => io.disconnect());

      onReady();
    })().catch((error) => {
      // The DOM wordmark stays in place, so a failure here costs only the effect.
      console.warn("ParticleMorph disabled:", error);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cleanup.forEach((fn) => fn());
    };
  }, [morph, exit, fade, fromRef, toRef, onReady]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
