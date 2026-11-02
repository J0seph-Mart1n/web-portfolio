import * as THREE from "three";
import { NOISE_GLSL } from "./glsl";
import { disposeScene, lerp, mulberry32, samplePath, smoothstep, type PathKey, type Stage } from "./util";

// City grid (metres). Blocks are PX x PZ cells separated by ROAD-wide streets.
const PX = 130;
const PZ = 80;
const ROAD = 14;
const HALF_X = PX / 2 - ROAD / 2; // 58
const HALF_Z = PZ / 2 - ROAD / 2; // 33
const PARK = new THREE.Vector4(-HALF_X, HALF_X, -3 * PZ - HALF_Z, HALF_Z);
const PARK2 = new THREE.Vector4(-HALF_X, HALF_X, -5 * PZ - HALF_Z, -5 * PZ + HALF_Z);

const PATH: PathKey[] = [
  { t: 0.0, pos: [0, 320, 360], look: [0, 0, -140] },
  { t: 0.3, pos: [0, 130, 170], look: [0, 0, -70] },
  { t: 0.55, pos: [0, 42, 62], look: [0, 0, -12] },
  { t: 0.8, pos: [0, 9, 12], look: [0, 0.9, 0] },
  { t: 1.0, pos: [0, 2.15, 1.5], look: [0, 1.5, 0] },
];

const inPark = (x: number, z: number, pad = 0) =>
  (x > PARK.x - pad && x < PARK.y + pad && z > PARK.z - pad && z < PARK.w + pad) ||
  (x > PARK2.x - pad && x < PARK2.y + pad && z > PARK2.z - pad && z < PARK2.w + pad);

// Ground shader: blueprint coordinate grid, road line vectors, park topo contours
const groundVert = /* glsl */ `
varying vec3 vW;
varying float vDepth;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  vec4 mv = viewMatrix * w;
  vDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}`;

const groundFrag = /* glsl */ `
uniform vec2 uPitch;
uniform float uRoad;
uniform vec4 uPark;
uniform vec4 uPark2;
varying vec3 vW;
varying float vDepth;
${NOISE_GLSL}

float sdRoundBox(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + r;
  return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r;
}

float inRect(vec2 p, vec4 r){
  return step(r.x,p.x)*step(p.x,r.y)*step(r.z,p.y)*step(p.y,r.w);
}

void main(){
  vec2 p = vW.xz;
  vec2 cell = floor((p + uPitch * 0.5) / uPitch);
  vec2 local = p - cell * uPitch;
  vec2 hb = uPitch * 0.5 - uRoad * 0.5;
  vec2 al = abs(local);

  vec3 bg = vec3(0.98, 0.969, 0.91); // #FAF7E8
  vec3 inkBlack = vec3(0.06, 0.06, 0.06);
  vec3 dimLine = vec3(0.76, 0.74, 0.68); // graph lines
  vec3 neonYellow = vec3(1.0, 0.933, 0.0); // #FFEE00

  // 1. Street boundaries outline
  float roadEdge = (1.0 - smoothstep(0.0, 0.25, abs(al.x - hb.x))) * step(al.y, hb.y + uRoad * 0.5)
                 + (1.0 - smoothstep(0.0, 0.25, abs(al.y - hb.y))) * step(al.x, hb.x + uRoad * 0.5);

  // 2. Dashed centerline vectors
  vec2 toCenter = uPitch * 0.5 - al;
  float vRoad = step(hb.x, al.x) * step(al.y, hb.y);
  float hRoad = step(hb.y, al.y) * step(al.x, hb.x);
  float dashV = (1.0 - smoothstep(0.0, 0.2, toCenter.x)) * step(0.5, fract(p.y / 6.0)) * vRoad;
  float dashH = (1.0 - smoothstep(0.0, 0.2, toCenter.y)) * step(0.5, fract(p.x / 6.0)) * hRoad;

  // 3. Crosswalk line drawings
  float xwalk = step(hb.x, al.x) * step(hb.y - 3.5, al.y) * step(al.y, hb.y) * step(0.5, fract(p.x / 1.1))
              + step(hb.y, al.y) * step(hb.x - 3.5, al.x) * step(al.x, hb.x) * step(0.5, fract(p.y / 1.1));

  // 4. Graph paper grid lines across whole city
  float fineGrid = (1.0 - smoothstep(0.0, 0.12, abs(fract(p.x / 10.0) - 0.5))) * 0.25
                 + (1.0 - smoothstep(0.0, 0.12, abs(fract(p.y / 10.0) - 0.5))) * 0.25;

  vec3 col = bg;
  col = mix(col, dimLine, clamp(fineGrid, 0.0, 1.0));
  col = mix(col, inkBlack, clamp(roadEdge * 0.85 + dashV * 0.9 + dashH * 0.9 + xwalk * 0.8, 0.0, 1.0));

  // 5. Park Lawn Topographic Contour Lines
  float park = max(inRect(p, uPark), inRect(p, uPark2));
  if (park > 0.5) {
    // Curving boundary line
    vec4 r = inRect(p, uPark) > 0.5 ? uPark : uPark2;
    vec2 c = vec2(r.x + r.y, r.z + r.w) * 0.5;
    vec2 hs = vec2(r.y - r.x, r.w - r.z) * 0.5 - 3.0;
    float sd = sdRoundBox(p - c, hs, 24.0);
    float boundaryLine = 1.0 - smoothstep(0.0, 0.35, abs(sd));

    // Topographic contour loops
    float topoNoise = fbm4(vec3(p * 0.02, 0.0)) * 6.0;
    float topoContour = 1.0 - smoothstep(0.0, 0.08, abs(fract(topoNoise) - 0.5));

    // Radial concentric survey rings centered around the person at origin (0, 0)
    float distOrigin = length(p);
    float surveyRing = (1.0 - smoothstep(0.0, 0.12, abs(fract(distOrigin / 5.0) - 0.5))) * smoothstep(60.0, 0.0, distOrigin);

    vec3 parkCol = vec3(0.95, 0.935, 0.86);
    parkCol = mix(parkCol, dimLine, topoContour * 0.5);
    parkCol = mix(parkCol, neonYellow, surveyRing * 0.9);
    parkCol = mix(parkCol, inkBlack, boundaryLine * 0.95);
    col = parkCol;
  }

  // Atmospheric distance fade
  float fog = 1.0 - exp(-0.00035 * 0.00035 * vDepth * vDepth);
  col = mix(col, bg, clamp(fog, 0.0, 1.0));

  gl_FragColor = vec4(col, 1.0);
}`;

// Architectural building outline shader: draws edges, floor slabs, and mullions
const buildingVert = /* glsl */ `
attribute vec3 aColor;
attribute float aGlass;
attribute float aSeed;
varying vec3 vN;
varying vec3 vW;
varying vec3 vLocal;
varying float vDepth;
varying float vGlass;
void main(){
  vLocal = position;
  vec4 w = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vW = w.xyz;
  vN = normalize(mat3(modelMatrix * instanceMatrix) * normal);
  vGlass = aGlass;
  vec4 mv = viewMatrix * w;
  vDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}`;

const buildingFrag = /* glsl */ `
varying vec3 vN;
varying vec3 vW;
varying vec3 vLocal;
varying float vDepth;
varying float vGlass;

void main(){
  vec3 N = normalize(vN);

  // Warm cream occluder face color (blocks lines from behind)
  vec3 faceCol = vec3(0.955, 0.94, 0.875);
  vec3 inkBlack = vec3(0.07, 0.07, 0.07);
  vec3 neonYellow = vec3(1.0, 0.933, 0.0);

  // 1. Box corner edge lines
  vec3 al = abs(vLocal);
  float edgeX = step(0.485, al.x);
  float edgeY = step(0.97, vLocal.y) + step(vLocal.y, 0.03);
  float edgeZ = step(0.485, al.z);
  float boxEdge = max(edgeX * edgeY, max(edgeX * edgeZ, edgeY * edgeZ));

  // 2. Horizontal architectural floor lines (every 3.8 meters)
  float floorLine = 0.0;
  float mullLine = 0.0;
  if (N.y < 0.5) {
    float f = abs(fract(vW.y / 3.8) - 0.5);
    floorLine = (1.0 - smoothstep(0.0, 0.06, f)) * 0.75;

    // 3. Vertical mullions for glass facades
    if (vGlass > 0.5) {
      float hc = abs(N.x) > 0.5 ? vW.z : vW.x;
      float m = abs(fract(hc / 2.0) - 0.5);
      mullLine = (1.0 - smoothstep(0.0, 0.06, m)) * 0.5;
    }
  }

  vec3 col = faceCol;
  // Black ink for edges and floor lines
  col = mix(col, inkBlack, clamp(boxEdge * 0.95 + floorLine * 0.7, 0.0, 1.0));
  // Neon yellow highlights on roof edges and glass mullions
  float roofEdge = edgeY * step(0.95, vLocal.y);
  col = mix(col, neonYellow, clamp(roofEdge * 0.85 + mullLine * 0.65, 0.0, 1.0));

  // Distance fog into cream background
  float fog = 1.0 - exp(-0.00035 * 0.00035 * vDepth * vDepth);
  col = mix(col, vec3(0.98, 0.969, 0.91), clamp(fog, 0.0, 1.0));

  gl_FragColor = vec4(col, 1.0);
}`;

export interface GroundStage extends Stage {
  setPersonTextures(full: THREE.Texture, close: THREE.Texture): void;
}

export function createGroundStage(opts: { lowPower: boolean }): GroundStage {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfaf7e8);
  const rnd = mulberry32(1337);
  const time = { value: 0 };

  // ---- Ground Mesh
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(5000, 5000).rotateX(-Math.PI / 2),
    new THREE.ShaderMaterial({
      vertexShader: groundVert,
      fragmentShader: groundFrag,
      uniforms: {
        uPitch: { value: new THREE.Vector2(PX, PZ) },
        uRoad: { value: ROAD },
        uPark: { value: PARK },
        uPark2: { value: PARK2 },
      },
    })
  );
  scene.add(ground);

  // ---- Architectural Buildings
  type B = { x: number; z: number; w: number; d: number; h: number; glass: number };
  const buildings: B[] = [];
  const rangeX = opts.lowPower ? 5 : 7;
  for (let ix = -rangeX; ix <= rangeX; ix++) {
    for (let iz = -18; iz <= 5; iz++) {
      const cx = ix * PX;
      const cz = iz * PZ;
      if (inPark(cx, cz)) continue;
      const downtown = smoothstep(-180, -700, cz) * (1 - smoothstep(300, 800, Math.abs(cx)));
      const nearPark = 1 - smoothstep(120, 300, Math.hypot(cx, cz + 120));
      const lotsX = 3;
      const lotsZ = 2;
      const lw = (HALF_X * 2) / lotsX;
      const ld = (HALF_Z * 2) / lotsZ;
      for (let lx = 0; lx < lotsX; lx++) {
        for (let lz = 0; lz < lotsZ; lz++) {
          if (rnd() < 0.05) continue;
          const set = 4.5 + rnd() * 3;
          const x = cx - HALF_X + lw * (lx + 0.5);
          const z = cz - HALF_Z + ld * (lz + 0.5);
          const tower = rnd() < 0.08 + 0.55 * downtown + 0.25 * nearPark;
          const h = tower ? 45 + rnd() * (60 + 140 * downtown) : 9 + rnd() * 22;
          const g = rnd() < 0.7 ? 1 : 0;
          buildings.push({ x, z, w: lw - set, d: ld - set, h, glass: g });
        }
      }
    }
  }

  const bGeo = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  const bMesh = new THREE.InstancedMesh(
    bGeo,
    new THREE.ShaderMaterial({
      vertexShader: buildingVert,
      fragmentShader: buildingFrag,
    }),
    buildings.length
  );
  const bGlass = new Float32Array(buildings.length);
  const m4 = new THREE.Matrix4();
  buildings.forEach((b, i) => {
    m4.makeScale(b.w, b.h, b.d).setPosition(b.x, 0, b.z);
    bMesh.setMatrixAt(i, m4);
    bGlass[i] = b.glass;
  });
  bGeo.setAttribute("aGlass", new THREE.InstancedBufferAttribute(bGlass, 1));
  bMesh.frustumCulled = false;
  scene.add(bMesh);

  // ---- Wireframe Trees (Faceted Polyhedral Outlines)
  const trees: { x: number; z: number; s: number }[] = [];
  const addTreeLine = (x0: number, z0: number, x1: number, z1: number, spacing: number, jitter = 1) => {
    const len = Math.hypot(x1 - x0, z1 - z0);
    const n = Math.max(1, Math.floor(len / spacing));
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      trees.push({ x: lerp(x0, x1, t) + (rnd() - 0.5) * jitter, z: lerp(z0, z1, t) + (rnd() - 0.5) * jitter, s: 2.6 + rnd() * 1.8 });
    }
  };
  [PARK, PARK2].forEach((r) => {
    const i = 1.8;
    addTreeLine(r.x + i, r.z + 20, r.x + i, r.w - 20, 9);
    addTreeLine(r.y - i, r.z + 20, r.y - i, r.w - 20, 9);
    addTreeLine(r.x + 25, r.z + i, r.y - 25, r.z + i, 10);
  });

  const canopyGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1, 1));
  const canopyMat = new THREE.LineBasicMaterial({
    color: 0x222222,
    transparent: true,
    opacity: 0.65,
    blending: THREE.NormalBlending,
  });
  const canopyMesh = new THREE.InstancedMesh(canopyGeo as unknown as THREE.BufferGeometry, canopyMat, trees.length);

  const trunkGeo = new THREE.CylinderGeometry(0.12, 0.18, 1, 6).translate(0, 0.5, 0);
  const trunkMat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x111111 });
  const trunkMesh = new THREE.InstancedMesh(trunkGeo, trunkMat, trees.length);

  const q = new THREE.Quaternion();
  const v3 = new THREE.Vector3();
  trees.forEach((t, i) => {
    const trunkH = t.s * 1.1;
    m4.compose(v3.set(t.x, trunkH + t.s * 0.7, t.z), q.identity(), new THREE.Vector3(t.s, t.s, t.s));
    canopyMesh.setMatrixAt(i, m4);
    m4.compose(v3.set(t.x, 0, t.z), q.identity(), new THREE.Vector3(1, trunkH + t.s * 0.4, 1));
    trunkMesh.setMatrixAt(i, m4);
  });
  [canopyMesh, trunkMesh].forEach((m) => (m.frustumCulled = false));
  scene.add(trunkMesh, canopyMesh);

  // ---- Wireframe Cars (Moving bounding boxes with headlight streaks)
  type Car = { axis: 0 | 1; line: number; lane: number; speed: number; phase: number };
  const cars: Car[] = [];
  const CAR_COUNT = opts.lowPower ? 60 : 120;
  for (let i = 0; i < CAR_COUNT; i++) {
    const axis = rnd() < 0.5 ? 0 : 1;
    const line = axis === 0 ? (Math.floor(rnd() * 10) - 5 + 0.5) * PX : (Math.floor(rnd() * 16) - 12 + 0.5) * PZ;
    const dir = rnd() < 0.5 ? 1 : -1;
    cars.push({ axis: axis as 0 | 1, line, lane: dir * (2 + rnd() * 2.2), speed: dir * (10 + rnd() * 10), phase: rnd() * 2000 });
  }

  const carWireGeo = new THREE.WireframeGeometry(new THREE.BoxGeometry(2.0, 1.3, 4.2).translate(0, 0.65, 0));
  const carMat = new THREE.LineBasicMaterial({
    color: 0x111111,
    transparent: true,
    opacity: 0.95,
    blending: THREE.NormalBlending,
  });
  const carMesh = new THREE.InstancedMesh(carWireGeo as unknown as THREE.BufferGeometry, carMat, cars.length);
  carMesh.frustumCulled = false;
  scene.add(carMesh);

  const RANGE = 2000;
  const updateCars = (elapsed: number) => {
    cars.forEach((c, i) => {
      let s = (c.phase + c.speed * elapsed) % RANGE;
      if (s < 0) s += RANGE;
      s -= RANGE * 0.65;
      if (c.axis === 0) {
        m4.makeRotationY(0).setPosition(c.line + c.lane, 0, s);
      } else {
        m4.makeRotationY(Math.PI / 2).setPosition(s * 0.6, 0, c.line + c.lane);
      }
      carMesh.setMatrixAt(i, m4);
    });
    carMesh.instanceMatrix.needsUpdate = true;
  };

  // ---- Joseph: Outline Drawing Billboard (Processed sketch textures)
  const FULL_H = 1.823;
  const FULL_W = FULL_H * (176 / 508);
  const CLOSE_W = 0.63;
  const CLOSE_H = CLOSE_W * (1072 / 815);
  const person = new THREE.Group();

  // Subtle circular survey target ring on the ground under Joseph's feet in Neon Yellow
  const targetPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * Math.PI * 2;
    targetPts.push(new THREE.Vector3(Math.cos(a) * 0.75, 0.02, Math.sin(a) * 0.75));
  }
  const targetRing = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(targetPts),
    new THREE.LineBasicMaterial({ color: 0xffee00, transparent: true, opacity: 1.0, blending: THREE.NormalBlending })
  );
  // Crosshair at the feet in black ink
  const footCrossPts = [
    new THREE.Vector3(-1.2, 0.02, 0),
    new THREE.Vector3(1.2, 0.02, 0),
    new THREE.Vector3(0, 0.02, -1.2),
    new THREE.Vector3(0, 0.02, 1.2),
  ];
  const footCross = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(footCrossPts),
    new THREE.LineBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.7, blending: THREE.NormalBlending })
  );
  scene.add(targetRing, footCross);

  const fullMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, blending: THREE.NormalBlending, depthWrite: true });
  const closeMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, blending: THREE.NormalBlending, depthWrite: false });
  const full = new THREE.Mesh(new THREE.PlaneGeometry(FULL_W, FULL_H).translate(0, FULL_H / 2, 0), fullMat);
  const close = new THREE.Mesh(new THREE.PlaneGeometry(CLOSE_W, CLOSE_H).translate(0, FULL_H - CLOSE_H / 2 + 0.005, 0.01), closeMat);
  close.renderOrder = 5;
  person.add(full, close);
  scene.add(person);

  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();
  const head = new THREE.Vector3(0, 1.6, 0);

  return {
    scene,
    hazeColor: new THREE.Color(0.98, 0.969, 0.91),
    setPersonTextures(fullTex, closeTex) {
      fullMat.map = fullTex;
      closeMat.map = closeTex;
      fullMat.opacity = 1;
      fullMat.needsUpdate = true;
      closeMat.needsUpdate = true;
    },
    update(t, elapsed, camera) {
      if (camera.fov !== 40) {
        camera.fov = 40;
        camera.near = 0.05;
        camera.far = 5000;
        camera.updateProjectionMatrix();
      }
      samplePath(PATH, t, camPos, camLook);
      camera.position.copy(camPos);
      camera.lookAt(camLook);
      camera.updateMatrixWorld();
      time.value = elapsed;
      updateCars(elapsed);

      // Rotate target ring under Joseph
      targetRing.rotation.y = elapsed * 0.2;

      // Billboard faces camera
      person.lookAt(camPos);
      const dist = camPos.distanceTo(head);
      closeMat.opacity = closeMat.map ? smoothstep(6.5, 3.2, dist) : 0;

      return (1 - smoothstep(0.0, 0.22, t)) * 0.7;
    },
    dispose() {
      disposeScene(scene);
    },
  };
}
