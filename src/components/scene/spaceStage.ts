import * as THREE from "three";
import { NOISE_GLSL } from "./glsl";
import { disposeScene, mulberry32, samplePath, smoothstep, type PathKey, type Stage } from "./util";

const EARTH_R = 10;

/** Direction the light hits the Earth from (artistic: front-left). */
const LIGHT_DIR = new THREE.Vector3(-0.55, 0.35, 0.75).normalize();
/** Direction of the technical sun / optical reticle disc. */
const SUN_DIR = new THREE.Vector3(-0.6, 0.2, -1).normalize();

const PATH: PathKey[] = [
  { t: 0.0, pos: [6, 1.5, 42], look: [-1.5, 0.5, 0] },
  { t: 0.35, pos: [3.5, 5, 32], look: [0, 3.5, 0] },
  { t: 0.7, pos: [0.5, 10.5, 21], look: [0, 8.5, 0] },
  { t: 1.0, pos: [0, 10.55, 3.4], look: [0, 9.4, -6] },
];

// Vertex shader with normal & world position
const outlineEarthVert = /* glsl */ `
varying vec3 vP;
varying vec3 vN;
varying vec3 vW;
void main(){
  vP = position;
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

// Outline drawing shader for Earth (coastline contours, topo isolines, coordinate grid)
// Styled in the Persona theme: warm cream paper body, black ink linework, and neon yellow accents.
const outlineEarthFrag = /* glsl */ `
uniform vec3 uLight;
uniform float uTime;
varying vec3 vP;
varying vec3 vN;
varying vec3 vW;
${NOISE_GLSL}

void main(){
  vec3 p = normalize(vP);
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);

  // 1. Procedural Continents noise
  float n = fbm(p * 1.5 + vec3(3.1, 1.7, 0.4)) + 0.22 * fbm4(p * 6.0);
  
  // Coastline outline (isoline near land threshold 0.05)
  float coastDist = abs(n - 0.05);
  float coastLine = 1.0 - smoothstep(0.0, 0.02, coastDist);
  
  // Secondary topographic contour lines on land
  float topoLines = 0.0;
  if (n > 0.05) {
    float topo = fract((n - 0.05) * 16.0);
    topoLines = (1.0 - smoothstep(0.0, 0.10, abs(topo - 0.5))) * 0.4;
  }

  // 2. Technical Lat/Lon Coordinate Grid Lines
  float lat = asin(clamp(p.y, -1.0, 1.0));
  float lon = atan(p.z, p.x);
  
  // Equator & Tropics / Parallels (every 15 degrees)
  float latGrid = abs(fract(lat * (12.0 / 3.14159265) + 0.5) - 0.5);
  float latLine = 1.0 - smoothstep(0.0, 0.04, latGrid);

  // Meridians (every 15 degrees)
  float lonGrid = abs(fract(lon * (12.0 / 3.14159265) + 0.5) - 0.5);
  float lonLine = 1.0 - smoothstep(0.0, 0.04, lonGrid);

  float coordGrid = max(latLine, lonLine) * 0.35;
  
  // Equator & Prime Meridian highlight in Neon Yellow
  float equator = 1.0 - smoothstep(0.0, 0.02, abs(p.y));
  float primeMeridian = 1.0 - smoothstep(0.0, 0.02, abs(p.x));
  float yellowMajorLines = max(equator, primeMeridian);

  // 3. Silhouette / Rim Outline
  float vdn = max(dot(V, N), 0.0);
  float rim = pow(1.0 - vdn, 3.2);
  float rimLine = smoothstep(0.5, 0.98, rim);

  // Colors: Persona cream graph paper body, black ink lines, and neon yellow accents
  vec3 creamBody = vec3(0.98, 0.969, 0.91); // #FAF7E8
  vec3 landTint = vec3(0.94, 0.925, 0.85); // subtle warm land shading
  vec3 inkBlack = vec3(0.06, 0.06, 0.06); // crisp #0F0F0F ink
  vec3 neonYellow = vec3(1.0, 0.933, 0.0); // #FFEE00

  vec3 col = (n > 0.05) ? landTint : creamBody;

  // Draw black ink lines
  float blackLines = max(coastLine * 0.95, rimLine * 0.9);
  blackLines = max(blackLines, topoLines);
  blackLines = max(blackLines, coordGrid * 0.6);

  col = mix(col, inkBlack, clamp(blackLines, 0.0, 1.0));
  
  // Overlay Neon Yellow major lines (Equator & Prime meridian)
  col = mix(col, neonYellow, yellowMajorLines * 0.9);

  gl_FragColor = vec4(col, 1.0);
}`;

// Orbital rings helper in Persona ink & neon yellow
function createOrbitalRing(radius: number, tiltX: number, tiltY: number, segments = 180, color = 0x111111, opacity = 0.5) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.NormalBlending,
  });
  const ring = new THREE.Line(geo, mat);
  ring.rotation.x = tiltX;
  ring.rotation.y = tiltY;
  return ring;
}

// Technical optical reticle for the Sun in Persona style
function createSunReticle(): THREE.Group {
  const group = new THREE.Group();
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x111111,
    transparent: true,
    opacity: 0.85,
    blending: THREE.NormalBlending,
  });
  const yellowMat = new THREE.LineBasicMaterial({
    color: 0xffee00,
    transparent: true,
    opacity: 1.0,
    blending: THREE.NormalBlending,
  });
  const faintMat = new THREE.LineBasicMaterial({
    color: 0x888888,
    transparent: true,
    opacity: 0.45,
    blending: THREE.NormalBlending,
  });

  // Concentric circle outlines
  [12, 28, 55, 95].forEach((r, idx) => {
    const pts: THREE.Vector3[] = [];
    const segs = 64;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
    }
    const circle = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), idx === 1 ? yellowMat : idx === 0 ? lineMat : faintMat);
    group.add(circle);
  });

  // Crosshair lines
  const crossPts = [
    new THREE.Vector3(-140, 0, 0),
    new THREE.Vector3(140, 0, 0),
    new THREE.Vector3(0, -140, 0),
    new THREE.Vector3(0, 140, 0),
    new THREE.Vector3(-80, -80, 0),
    new THREE.Vector3(80, 80, 0),
    new THREE.Vector3(-80, 80, 0),
    new THREE.Vector3(80, -80, 0),
  ];
  const crossGeo = new THREE.BufferGeometry().setFromPoints(crossPts);
  const crossLines = new THREE.LineSegments(crossGeo, faintMat);
  group.add(crossLines);

  // Central bright cross
  const centerPts = [
    new THREE.Vector3(-18, 0, 0),
    new THREE.Vector3(18, 0, 0),
    new THREE.Vector3(0, -18, 0),
    new THREE.Vector3(0, 18, 0),
  ];
  group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(centerPts), yellowMat));

  return group;
}

export function createSpaceStage(opts: { pixelRatio: number; lowPower: boolean }): Stage {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfaf7e8);
  const rnd = mulberry32(42);
  const sky = new THREE.Group();
  scene.add(sky);

  // ---- Constellation Lines & Technical Star Points
  const STAR_R = 1400;
  const starCount = opts.lowPower ? 600 : 1200;
  const starPoints: THREE.Vector3[] = [];
  for (let i = 0; i < starCount; i++) {
    const v = new THREE.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1).normalize().multiplyScalar(STAR_R);
    starPoints.push(v);
  }

  // Draw tiny crosshair stars (+ shape) in black ink with occasional yellow spark
  const crosshairPts: THREE.Vector3[] = [];
  starPoints.forEach((p) => {
    const s = 1.4 + rnd() * 2.0;
    crosshairPts.push(
      new THREE.Vector3(p.x - s, p.y, p.z),
      new THREE.Vector3(p.x + s, p.y, p.z),
      new THREE.Vector3(p.x, p.y - s, p.z),
      new THREE.Vector3(p.x, p.y + s, p.z)
    );
  });
  const crosshairGeo = new THREE.BufferGeometry().setFromPoints(crosshairPts);
  const crosshairMat = new THREE.LineBasicMaterial({
    color: 0x222222,
    transparent: true,
    opacity: 0.55,
    blending: THREE.NormalBlending,
  });
  sky.add(new THREE.LineSegments(crosshairGeo, crosshairMat));

  // Connect nearby stars into constellation outline vectors
  const constelPts: THREE.Vector3[] = [];
  for (let i = 0; i < Math.min(starCount, 300); i += 2) {
    const p1 = starPoints[i];
    let closestDist = Infinity;
    let closestIdx = -1;
    for (let j = i + 1; j < Math.min(starCount, 300); j++) {
      const d = p1.distanceTo(starPoints[j]);
      if (d > 40 && d < 220 && d < closestDist) {
        closestDist = d;
        closestIdx = j;
      }
    }
    if (closestIdx !== -1 && rnd() < 0.6) {
      constelPts.push(p1, starPoints[closestIdx]);
    }
  }
  if (constelPts.length > 0) {
    const constelGeo = new THREE.BufferGeometry().setFromPoints(constelPts);
    const constelMat = new THREE.LineBasicMaterial({
      color: 0x666666,
      transparent: true,
      opacity: 0.4,
      blending: THREE.NormalBlending,
    });
    sky.add(new THREE.LineSegments(constelGeo, constelMat));
  }

  // ---- Earth Sphere (Blueprint Contour & Grid Shader)
  const light = { value: LIGHT_DIR.clone() };
  const time = { value: 0 };
  const earthMat = new THREE.ShaderMaterial({
    vertexShader: outlineEarthVert,
    fragmentShader: outlineEarthFrag,
    uniforms: { uLight: light, uTime: time },
  });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(EARTH_R, 120, 90), earthMat);

  // Atmospheric outer outline circle
  const atmoPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 128; i++) {
    const th = (i / 128) * Math.PI * 2;
    atmoPts.push(new THREE.Vector3(Math.cos(th) * (EARTH_R * 1.055), Math.sin(th) * (EARTH_R * 1.055), 0));
  }
  const atmoHalo = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(atmoPts),
    new THREE.LineBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.8,
      blending: THREE.NormalBlending,
    })
  );

  const globe = new THREE.Group();
  globe.rotation.z = 0.35;
  globe.add(earth);

  // ---- Orbital Trajectory Blueprint Rings
  const orbit1 = createOrbitalRing(EARTH_R * 1.35, Math.PI / 2.3, 0.4, 180, 0xffee00, 0.9);
  const orbit2 = createOrbitalRing(EARTH_R * 1.6, -Math.PI / 3.0, 0.9, 180, 0x111111, 0.65);
  const orbit3 = createOrbitalRing(EARTH_R * 1.9, Math.PI / 6.0, -0.7, 180, 0x777777, 0.35);
  globe.add(orbit1, orbit2, orbit3);

  // Small satellite wireframe diamonds on orbits
  const satGeo = new THREE.OctahedronGeometry(0.2, 0);
  const satMesh = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffee00 }));
  satMesh.position.set(EARTH_R * 1.35, 0, 0);
  orbit1.add(satMesh);

  scene.add(globe, atmoHalo);

  // ---- Sun Optical Reticle Outline
  const sunGroup = createSunReticle();
  scene.add(sunGroup);

  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();

  return {
    scene,
    hazeColor: new THREE.Color(0.98, 0.969, 0.91),
    update(t, elapsed, camera) {
      if (camera.fov !== 45) {
        camera.fov = 45;
        camera.near = 0.05;
        camera.far = 4000;
        camera.updateProjectionMatrix();
      }
      samplePath(PATH, t, camPos, camLook);
      camera.position.copy(camPos);
      camera.lookAt(camLook);
      camera.updateMatrixWorld();

      time.value = elapsed;
      sky.position.copy(camPos);

      earth.rotation.y = 1.9 + elapsed * 0.006 + t * 0.5;
      orbit1.rotation.z = elapsed * 0.05;
      orbit2.rotation.z = -elapsed * 0.03;

      // Position the sun reticle in the sky
      const sunDist = 700;
      sunGroup.position.copy(camPos).addScaledVector(SUN_DIR, sunDist);
      sunGroup.lookAt(camPos); // Billboards to always face camera

      // Keep atmospheric halo facing camera
      atmoHalo.lookAt(camPos);

      // Fade into blueprint horizon dissolve
      return smoothstep(0.82, 1.0, t) * 0.55;
    },
    dispose() {
      disposeScene(scene);
    },
  };
}
