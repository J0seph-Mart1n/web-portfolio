import * as THREE from "three";

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Deterministic PRNG so the procedural world is identical on every visit. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Vec3Tuple = [number, number, number];

export interface PathKey {
  /** Normalised time of this key within the stage (0..1, ascending). */
  t: number;
  pos: Vec3Tuple;
  look: Vec3Tuple;
}

const cr = (p0: number, p1: number, p2: number, p3: number, u: number) => {
  const u2 = u * u;
  const u3 = u2 * u;
  return 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3);
};

/**
 * Samples a Catmull-Rom spline through camera keyframes with arbitrary key times,
 * so the camera glides smoothly instead of moving linearly between keys.
 */
export function samplePath(keys: PathKey[], t: number, outPos: THREE.Vector3, outLook: THREE.Vector3) {
  const tt = clamp01(t);
  let i = 0;
  while (i < keys.length - 2 && tt > keys[i + 1].t) i++;
  const k0 = keys[Math.max(0, i - 1)];
  const k1 = keys[i];
  const k2 = keys[i + 1];
  const k3 = keys[Math.min(keys.length - 1, i + 2)];
  const u = clamp01((tt - k1.t) / (k2.t - k1.t || 1));
  outPos.set(
    cr(k0.pos[0], k1.pos[0], k2.pos[0], k3.pos[0], u),
    cr(k0.pos[1], k1.pos[1], k2.pos[1], k3.pos[1], u),
    cr(k0.pos[2], k1.pos[2], k2.pos[2], k3.pos[2], u)
  );
  outLook.set(
    cr(k0.look[0], k1.look[0], k2.look[0], k3.look[0], u),
    cr(k0.look[1], k1.look[1], k2.look[1], k3.look[1], u),
    cr(k0.look[2], k1.look[2], k2.look[2], k3.look[2], u)
  );
}

export interface Stage {
  scene: THREE.Scene;
  /** Colour used for the full-screen haze overlay while this stage is active. */
  hazeColor: THREE.Color;
  /**
   * Advance the stage. `t` is the stage-local scroll progress (0..1).
   * Returns a haze amount (0..1) that the engine blends over the frame.
   */
  update(t: number, time: number, camera: THREE.PerspectiveCamera): number;
  dispose(): void;
}

/** Recursively dispose geometries, materials and textures in a scene. */
export function disposeScene(scene: THREE.Object3D) {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
    const mats = Array.isArray(mat) ? mat : mat ? [mat] : [];
    mats.forEach((m) => {
      Object.values(m).forEach((v) => {
        if (v instanceof THREE.Texture) v.dispose();
      });
      const uniforms = (m as THREE.ShaderMaterial).uniforms;
      if (uniforms) {
        Object.values(uniforms).forEach((u) => {
          if (u.value instanceof THREE.Texture) u.value.dispose();
        });
      }
      m.dispose();
    });
  });
}
