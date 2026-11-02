import * as THREE from "three";
import { mulberry32 } from "./util";

function makeCanvas(w: number, h = w) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

/** Soft radial gradient sprite (sun core, halos, flares, blob shadows). */
export function makeRadialTexture(stops: [number, string][], size = 256) {
  const c = makeCanvas(size);
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([o, col]) => grad.addColorStop(o, col));
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

/** Thin horizontal anamorphic streak for the sun's lens flare. */
export function makeStreakTexture() {
  const w = 512;
  const h = 64;
  const c = makeCanvas(w, h);
  const g = c.getContext("2d")!;
  const img = g.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = Math.abs(x / w - 0.5) * 2;
      const dy = Math.abs(y / h - 0.5) * 2;
      const a = Math.pow(1 - dx, 3) * Math.exp(-dy * dy * 18);
      const i = (y * w + x) * 4;
      img.data[i] = 255;
      img.data[i + 1] = 235;
      img.data[i + 2] = 210;
      img.data[i + 3] = Math.round(a * 255);
    }
  }
  g.putImageData(img, 0, 0);
  return new THREE.CanvasTexture(c);
}

/** Fluffy cumulus puff built from overlapping soft blobs (alpha only). */
export function makeCloudPuffTexture(seed = 7) {
  const size = 256;
  const c = makeCanvas(size);
  const g = c.getContext("2d")!;
  const rnd = mulberry32(seed);
  for (let i = 0; i < 30; i++) {
    const a = rnd() * Math.PI * 2;
    const r = Math.sqrt(rnd()) * size * 0.2;
    const x = size / 2 + Math.cos(a) * r;
    const y = size / 2 + Math.sin(a) * r * 0.65 + size * 0.03;
    const rad = size * (0.1 + rnd() * 0.17);
    const grad = g.createRadialGradient(x, y, 0, x, y, rad);
    grad.addColorStop(0, "rgba(255,255,255,0.5)");
    grad.addColorStop(0.55, "rgba(255,255,255,0.22)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.beginPath();
    g.arc(x, y, rad, 0, Math.PI * 2);
    g.fill();
  }
  return new THREE.CanvasTexture(c);
}
