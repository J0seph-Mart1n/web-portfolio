import * as THREE from "three";
import { NOISE_GLSL } from "./glsl";
import { disposeScene, mulberry32, samplePath, smoothstep, type PathKey, type Stage } from "./util";

const SUN_DIR = new THREE.Vector3(0.05, 0.035, -1).normalize();

const PATH: PathKey[] = [
  { t: 0.0, pos: [0, -30, 300], look: [0, -22, 180] },
  { t: 0.22, pos: [0, 6, 230], look: [0, 18, 100] },
  { t: 0.45, pos: [0, 44, 130], look: [0, 30, -60] },
  { t: 0.72, pos: [0, 40, -20], look: [0, 16, -220] },
  { t: 1.0, pos: [0, -34, -140], look: [0, -70, -280] },
];

// Horizon & atmospheric elevation contour lines
const skyVert = /* glsl */ `
varying vec3 vDir;
void main(){
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}`;

const skyFrag = /* glsl */ `
uniform vec3 uSun;
uniform float uTime;
varying vec3 vDir;
${NOISE_GLSL}

void main(){
  vec3 d = normalize(vDir);
  float h = d.y;

  vec3 bg = vec3(0.98, 0.969, 0.91); // #FAF7E8
  vec3 ink = vec3(0.10, 0.10, 0.10);
  vec3 yellow = vec3(1.0, 0.933, 0.0);

  // Technical horizontal altitude lines (parallel contour drawings)
  float alt = abs(fract(h * 24.0 + 0.5) - 0.5);
  float altLine = (1.0 - smoothstep(0.0, 0.04, alt)) * smoothstep(-0.25, 0.6, h);

  // Subtle wavy isobar lines near horizon
  float isobar = snoise(vec3(d.x * 4.0, h * 16.0, uTime * 0.02));
  float isobarLine = (1.0 - smoothstep(0.0, 0.06, abs(isobar - 0.1))) * smoothstep(0.3, 0.0, abs(h));

  // Sun reticle glow
  float s = max(dot(d, uSun), 0.0);
  float sunRings = 1.0 - smoothstep(0.0, 0.03, abs(fract(pow(s, 0.7) * 8.0) - 0.5));

  vec3 col = bg;
  col = mix(col, ink, altLine * 0.35 + isobarLine * 0.45);
  col = mix(col, yellow, sunRings * pow(s, 6.0) * 0.9);

  gl_FragColor = vec4(col, 1.0);
}`;

// Topographic isobar / cloud contour loops
function createCloudIsobarGeometry(seed: number, radius: number, pointsCount = 48): THREE.BufferGeometry {
  const rnd = mulberry32(seed);
  const pts: THREE.Vector3[] = [];
  const freq1 = 2 + Math.floor(rnd() * 3);
  const freq2 = 4 + Math.floor(rnd() * 3);
  const phase1 = rnd() * Math.PI * 2;
  const phase2 = rnd() * Math.PI * 2;
  const amp1 = 0.15 + rnd() * 0.2;
  const amp2 = 0.08 + rnd() * 0.12;

  for (let i = 0; i <= pointsCount; i++) {
    const a = (i / pointsCount) * Math.PI * 2;
    const r = radius * (1.0 + amp1 * Math.sin(a * freq1 + phase1) + amp2 * Math.cos(a * freq2 + phase2));
    pts.push(new THREE.Vector3(Math.cos(a) * r, (rnd() - 0.5) * (radius * 0.12), Math.sin(a) * r));
  }

  return new THREE.BufferGeometry().setFromPoints(pts);
}

export function createSkyStage(opts: { lowPower: boolean }): Stage {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfaf7e8);
  const rnd = mulberry32(7);
  const time = { value: 0 };

  // Sky dome with technical contour lines
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(3000, 36, 18),
    new THREE.ShaderMaterial({
      vertexShader: skyVert,
      fragmentShader: skyFrag,
      uniforms: { uSun: { value: SUN_DIR }, uTime: time },
      side: THREE.BackSide,
      depthWrite: false,
    })
  );
  sky.renderOrder = -1;
  scene.add(sky);

  // ---- Instanced Topographic Cloud Contour Wireframe Lines
  const contourGroup = new THREE.Group();
  scene.add(contourGroup);

  const lineMat1 = new THREE.LineBasicMaterial({
    color: 0x111111,
    transparent: true,
    opacity: 0.8,
    blending: THREE.NormalBlending,
  });
  const lineMat2 = new THREE.LineBasicMaterial({
    color: 0xffee00,
    transparent: true,
    opacity: 0.95,
    blending: THREE.NormalBlending,
  });
  const faintMat = new THREE.LineBasicMaterial({
    color: 0x666666,
    transparent: true,
    opacity: 0.45,
    blending: THREE.NormalBlending,
  });

  const COUNT = opts.lowPower ? 70 : 140;
  for (let i = 0; i < COUNT; i++) {
    const x = (rnd() * 2 - 1) * 600;
    const y = -70 + rnd() * 65;
    const z = -1050 + rnd() * 1400;
    const baseR = 18 + rnd() * 35;

    // Create 2-3 concentric nested contour line loops per cloud
    const rings = 2 + (rnd() < 0.5 ? 1 : 0);
    const subGroup = new THREE.Group();
    subGroup.position.set(x, y, z);
    subGroup.rotation.x = (rnd() - 0.5) * 0.2;
    subGroup.rotation.y = rnd() * Math.PI * 2;
    subGroup.rotation.z = (rnd() - 0.5) * 0.2;

    for (let r = 0; r < rings; r++) {
      const ringR = baseR * (0.45 + r * 0.35);
      const geo = createCloudIsobarGeometry(i * 10 + r, ringR);
      const mat = r === rings - 1 ? lineMat2 : r === 0 ? faintMat : lineMat1;
      const lineLoop = new THREE.Line(geo, mat);
      subGroup.add(lineLoop);
    }

    contourGroup.add(subGroup);
  }

  // ---- Horizontal flight vector streamlines rushing across the sky
  const STREAM_COUNT = opts.lowPower ? 40 : 80;
  const streamPts: THREE.Vector3[] = [];
  for (let i = 0; i < STREAM_COUNT; i++) {
    const sx = (rnd() * 2 - 1) * 450;
    const sy = -50 + rnd() * 90;
    const sz = -1100 + rnd() * 1400;
    const len = 70 + rnd() * 140;
    streamPts.push(new THREE.Vector3(sx, sy, sz), new THREE.Vector3(sx, sy, sz + len));
  }
  const streamGeo = new THREE.BufferGeometry().setFromPoints(streamPts);
  const streamMat = new THREE.LineBasicMaterial({
    color: 0x333333,
    transparent: true,
    opacity: 0.5,
    blending: THREE.NormalBlending,
  });
  contourGroup.add(new THREE.LineSegments(streamGeo, streamMat));

  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();

  return {
    scene,
    hazeColor: new THREE.Color(0.98, 0.969, 0.91),
    update(t, elapsed, camera) {
      if (camera.fov !== 55) {
        camera.fov = 55;
        camera.near = 0.5;
        camera.far = 6000;
        camera.updateProjectionMatrix();
      }
      samplePath(PATH, t, camPos, camLook);
      camPos.x += Math.sin(elapsed * 0.15) * 3;
      camera.position.copy(camPos);
      camera.lookAt(camLook);
      camera.updateMatrixWorld();
      sky.position.copy(camPos);
      time.value = elapsed;

      // Animate flight streamlines gliding forward
      contourGroup.children.forEach((child, idx) => {
        if (child instanceof THREE.Group) {
          child.rotation.y += 0.0005 * (idx % 2 === 0 ? 1 : -1);
        }
      });

      const inside = smoothstep(5, -35, camPos.y);
      return inside * 0.7;
    },
    dispose() {
      disposeScene(scene);
    },
  };
}
