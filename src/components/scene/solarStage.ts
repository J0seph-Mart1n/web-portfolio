import * as THREE from "three";
import { NOISE_GLSL } from "./glsl";
import { disposeScene, mulberry32, samplePath, smoothstep, type PathKey, type Stage } from "./util";

// ---- Celestial Constants & Positions
const EARTH_R = 10;
const MOON_R = 4.2;
const SUN_R = 48;

// Earth at origin (0, 0, 0)
const EARTH_POS = new THREE.Vector3(0, 0, 0);
// Moon orbiting Earth
const MOON_POS = new THREE.Vector3(34, 8, -20);
// Sun at the center of the solar system
const SUN_POS = new THREE.Vector3(-120, -40, -480);

// Camera Path: Earth approach -> Earth-Moon view -> Smooth Zoom-Out into Grand Solar System
const PATH: PathKey[] = [
  // 0.00: Establishing view of Earth (Intro / Dashboard section: framed beside hero card)
  { t: 0.00, pos: [-4, 3.2, 31], look: [0, 0, 0] },
  // 0.10: Earth glide bringing Moon into view in distance along translunar arc
  { t: 0.10, pos: [6, 6, 26], look: [16, 4, -8] },
  // 0.20: Viewing Moon as a crisp cratered orb in space beside Earth along the dashed translunar arc (Experience section)
  { t: 0.20, pos: [20, 14, 28], look: [22, 6, -14] },
  // 0.32: Smooth zoom out into the Solar System (Earth & Moon visible together as a pair, Sun & orbits ahead)
  { t: 0.32, pos: [48, 42, 46], look: [-20, -5, -140] },
  // 0.46: Ascending further as inner planetary orbits unfurl
  { t: 0.46, pos: [95, 95, 78], look: [-65, -18, -260] },
  // 0.60: Skills section: Wide panoramic view of the inner solar system, Sun corona, Mercury, Venus, Mars
  { t: 0.60, pos: [160, 175, 130], look: [-95, -28, -360] },
  // 0.74: Projects section: Grand Solar System view (Asteroid belt, Jupiter with GRS, Saturn with rings)
  { t: 0.74, pos: [260, 310, 210], look: [-120, -40, -480] },
  // 0.88: Deep cosmic perspective approaching Socials (Saturn, Uranus, Neptune, Comet)
  { t: 0.88, pos: [400, 560, 360], look: [-120, -40, -480] },
  // 1.00: Grand heliospheric celestial map centered on the Sun at bottom of Socials
  { t: 1.00, pos: [540, 850, 540], look: [-120, -40, -480] },
];

// ---- Shared Shaders
const commonVert = /* glsl */ `
varying vec2 vUv;
varying vec3 vP;
varying vec3 vN;
varying vec3 vW;
void main(){
  vUv = uv;
  vP = position;
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

// ---- Earth Shader: Real World Map, Precision NASA Coastlines, Swirling Atmosphere, Sunrise Limb
const outlineEarthFrag = /* glsl */ `
varying vec2 vUv;
varying vec3 vP;
varying vec3 vN;
varying vec3 vW;

uniform sampler2D uEarthMap;
uniform sampler2D uEarthMask;
uniform sampler2D uCloudMap;
uniform vec3 uSunPos;
uniform float uTime;
${NOISE_GLSL}

void main(){
  vec3 p = normalize(vP);
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  vec3 L = normalize(vec3(-0.6, 0.45, 0.65)); // Key daylight from upper-left
  vec3 sunBack = normalize(uSunPos - vW);      // True solar backlight

  vec2 uv = vUv;

  // 1. High-Precision NASA Mask: Ocean (white/1.0) vs Land (black/0.0)
  float rawOcean = texture2D(uEarthMask, uv).r;
  vec4 dayRgb = texture2D(uEarthMap, uv);
  
  // Robust fallback if textures are still loading
  float isLand = 0.0;
  if (rawOcean + dayRgb.r < 0.001) {
    float n = fbm(p * 1.5 + vec3(3.1, 1.7, 0.4));
    isLand = step(0.05, n);
  } else {
    isLand = 1.0 - smoothstep(0.35, 0.65, rawOcean);
  }

  // 2. Crisp Ink Coastlines via Sobel Edge Filter on Mask
  vec2 dUv = vec2(1.0 / 2048.0, 1.0 / 1024.0) * 1.5;
  float mR = texture2D(uEarthMask, uv + vec2(dUv.x, 0.0)).r;
  float mL = texture2D(uEarthMask, uv - vec2(dUv.x, 0.0)).r;
  float mU = texture2D(uEarthMask, uv + vec2(0.0, dUv.y)).r;
  float mD = texture2D(uEarthMask, uv - vec2(0.0, dUv.y)).r;
  float coastGrad = length(vec2(mR - mL, mU - mD)) * 4.2;
  float coastLine = smoothstep(0.2, 0.75, coastGrad);

  // 3. Continental Topography & Land Surface Shading
  float topoLum = dot(dayRgb.rgb, vec3(0.299, 0.587, 0.114));
  
  // Land Base: Persona warm cream (#FAF7E8), modulated by actual topography
  vec3 landCream = vec3(0.985, 0.972, 0.915);
  vec3 highlandShade = vec3(0.94, 0.915, 0.83);
  vec3 landCol = mix(landCream, highlandShade, clamp((1.0 - topoLum) * 0.6, 0.0, 1.0));

  // Topographic elevation contour lines across mountain ranges (Andes, Rockies, Himalayas)
  float topoLines = 0.0;
  if (isLand > 0.5) {
    float c = fract(topoLum * 16.0);
    topoLines = (1.0 - smoothstep(0.0, 0.10, abs(c - 0.5))) * 0.35;
  }

  // 4. Oceans: Soft Sea-Blue Wash (Instantly Distinct from Moon!)
  vec3 oceanBase = vec3(0.86, 0.915, 0.962);
  vec3 oceanDeep = vec3(0.80, 0.870, 0.938);
  vec3 oceanCol = mix(oceanBase, oceanDeep, clamp((1.0 - dayRgb.b) * 0.5, 0.0, 1.0));

  // Bathymetric wave hatch lines on ocean
  float waves = sin(uv.y * 320.0 + uv.x * 140.0 + uTime * 0.4) * sin(uv.x * 240.0 - uTime * 0.2);
  float oceanLines = smoothstep(0.68, 0.96, waves) * 0.20 * (1.0 - isLand);

  vec3 surfaceCol = mix(oceanCol, landCol, isLand);

  // 5. Atmospheric Swirling Clouds Layer
  vec2 cloudUv1 = uv + vec2(uTime * 0.0025, 0.0);
  vec2 cloudUv2 = uv * 1.25 + vec2(-uTime * 0.0018, 0.015);
  float c1 = texture2D(uCloudMap, cloudUv1).r;
  float c2 = texture2D(uCloudMap, cloudUv2).r;
  float cloudDensity = smoothstep(0.20, 0.75, c1 * 0.7 + c2 * 0.45);

  // Cloud drop-shadow onto land/ocean beneath
  vec2 shadowUv = cloudUv1 + vec2(0.005, -0.004);
  float cloudShadow = smoothstep(0.3, 0.8, texture2D(uCloudMap, shadowUv).r) * 0.28;
  surfaceCol = mix(surfaceCol, surfaceCol * 0.74, cloudShadow);

  // Cloud render (pure bright white/cream with delicate ink fringe)
  vec3 cloudWhite = vec3(1.0, 0.995, 0.985);
  float cloudEdge = (1.0 - smoothstep(0.0, 0.12, abs(cloudDensity - 0.5))) * 0.45;
  surfaceCol = mix(surfaceCol, cloudWhite, cloudDensity * 0.85);

  // 6. Technical World Atlas Graticule: Equator, Tropics, Meridians
  float lat = asin(clamp(p.y, -1.0, 1.0));
  float lon = atan(p.z, p.x);

  // Equator (0° latitude) in bold neon yellow
  float equator = 1.0 - smoothstep(0.0, 0.016, abs(lat));
  // Tropic of Cancer (23.44° N) & Tropic of Capricorn (23.44° S)
  float tropicDist = min(abs(lat - 0.409), abs(lat + 0.409));
  float tropics = (1.0 - smoothstep(0.0, 0.012, tropicDist)) * 0.55;
  // Arctic & Antarctic Circles (+/- 66.56°)
  float polarCircles = (1.0 - smoothstep(0.0, 0.012, min(abs(lat - 1.16), abs(lat + 1.16)))) * 0.4;

  // Lat / Lon 30-degree graticule grid
  float latGrid = 1.0 - smoothstep(0.0, 0.02, abs(fract(lat * (6.0 / 3.14159265) + 0.5) - 0.5));
  float lonGrid = 1.0 - smoothstep(0.0, 0.02, abs(fract(lon * (12.0 / 3.14159265) + 0.5) - 0.5));
  float graticule = max(latGrid, lonGrid) * 0.25;

  // Prime Meridian (0°) in subtle neon yellow
  float primeMeridian = 1.0 - smoothstep(0.0, 0.015, abs(lon));

  // 7. Day/Night Keylighting & Sunrise Backlight Limb Glow
  float nDotL = dot(N, L);
  float daylight = smoothstep(-0.25, 0.35, nDotL);
  surfaceCol = mix(surfaceCol * 0.84, surfaceCol, daylight);

  // Silhouette & Sunrise Limb Atmospheric Glow
  float vdn = max(dot(V, N), 0.0);
  float rim = pow(1.0 - vdn, 3.2);
  float rimLine = smoothstep(0.4, 0.98, rim);

  // Sunrise flare on the limb facing the Sun in space
  float sunFacing = max(0.0, dot(normalize(V + sunBack), N));
  float sunriseLimb = rim * pow(sunFacing, 2.0);

  // Colors
  vec3 inkBlack = vec3(0.07, 0.07, 0.07);
  vec3 neonYellow = vec3(1.0, 0.933, 0.0);

  // Combine Black Technical Linework
  float blackLines = max(coastLine * 0.95, rimLine * 0.95);
  blackLines = max(blackLines, topoLines);
  blackLines = max(blackLines, graticule);
  blackLines = max(blackLines, tropics);
  blackLines = max(blackLines, polarCircles);
  blackLines = max(blackLines, cloudEdge);
  blackLines = max(blackLines, oceanLines);

  vec3 col = mix(surfaceCol, inkBlack, clamp(blackLines, 0.0, 1.0));

  // Yellow Major Callout Lines: Equator & Prime Meridian
  float yellowMajor = max(equator, primeMeridian * 0.85);
  col = mix(col, neonYellow, clamp(yellowMajor, 0.0, 1.0));
  // Sunrise Atmospheric Halo on limb
  col = mix(col, neonYellow, clamp(sunriseLimb * 0.85, 0.0, 1.0));

  gl_FragColor = vec4(col, 1.0);
}
`;

// ---- Enhanced Moon Shader: Authentic High-Fidelity Lunar Impact Craters & Rays
const outlineMoonFrag = /* glsl */ `
varying vec2 vUv;
varying vec3 vP;
varying vec3 vN;
varying vec3 vW;

uniform sampler2D uMoonMap;
uniform vec3 uSunPos;
uniform float uTime;
${NOISE_GLSL}

void main(){
  vec3 p = normalize(vP);
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  // Grazing key light for dramatic crater shadows across the terminator
  vec3 L = normalize(vec3(-0.65, 0.35, 0.65));

  vec2 uv = vUv;

  // 1. High-Resolution NASA Lunar Orbiter Albedo & Elevation Texture
  float rawAlbedo = texture2D(uMoonMap, uv).r;

  // Fallback if texture is still loading
  if (rawAlbedo < 0.001) {
    rawAlbedo = fbm(p * 2.5 + vec3(5.2, 1.3, 7.8)) * 0.5 + 0.4;
  }

  // 2. Smooth 4-Tap Sobel Filter for Crater Rims (Filtered to prevent JPEG block noise)
  vec2 dUv = vec2(3.0 / 1024.0, 3.0 / 512.0);
  float aR = texture2D(uMoonMap, uv + vec2(dUv.x, 0.0)).r;
  float aL = texture2D(uMoonMap, uv - vec2(dUv.x, 0.0)).r;
  float aU = texture2D(uMoonMap, uv + vec2(0.0, dUv.y)).r;
  float aD = texture2D(uMoonMap, uv - vec2(0.0, dUv.y)).r;

  float rimGrad = length(vec2(aR - aL, aU - aD)) * 3.5;
  float craterRimLine = smoothstep(0.22, 0.68, rimGrad);

  // 3. Directional 3D Grazing Sunlight across Crater Rims & Inner Bowls
  vec2 slope = vec2(aL - aR, aD - aU) * 2.2;
  vec3 T = normalize(vec3(-p.z, 0.0, p.x));
  vec3 B = cross(N, T);
  vec3 perturbedN = normalize(N + T * slope.x + B * slope.y);
  float sunGrazing = dot(perturbedN, L);

  // Sunlit rim catch
  float rimCatch = smoothstep(0.25, 0.70, sunGrazing) * smoothstep(0.18, 0.55, rimGrad);
  // Deep shadow inside crater bowls
  float bowlShadow = smoothstep(0.20, -0.15, sunGrazing) * (1.0 - smoothstep(0.48, 0.85, rawAlbedo));

  // 4. Tone Mapping into Persona Neo-Brutalist Regolith Palette
  // Warm dusty regolith highland base
  vec3 highlandCream = vec3(0.97, 0.958, 0.915);
  // Dark basaltic volcanic maria (Oceanus Procellarum, Mare Tranquillitatis)
  vec3 mareBasalt = vec3(0.82, 0.80, 0.73);
  // Bright pulverized anorthosite impact ejecta rays (Tycho, Copernicus)
  vec3 rayBright = vec3(1.0, 1.0, 0.99);
  vec3 inkBlack = vec3(0.07, 0.07, 0.07);
  vec3 neonYellow = vec3(1.0, 0.933, 0.0);

  // Smooth separation of maria vs highlands
  float mareFactor = 1.0 - smoothstep(0.28, 0.48, rawAlbedo);
  vec3 surfaceCol = mix(highlandCream, mareBasalt, mareFactor * 0.82);

  // Radiant ejecta rays (Tycho rays, Copernicus halo)
  float rayFactor = smoothstep(0.54, 0.82, rawAlbedo);
  surfaceCol = mix(surfaceCol, rayBright, rayFactor * 0.85);
  surfaceCol = mix(surfaceCol, rayBright, rimCatch * 0.65);

  // Concave crater bowl interior shadows
  surfaceCol = mix(surfaceCol, inkBlack, clamp(bowlShadow * 0.70, 0.0, 0.78));

  // 5. Dedicated Iconic Lunar Craters (Analytical Overlays)
  // A. Tycho Crater (Southern Highlands: 43.3°S, 11.2°W) - Massive Ray System
  vec3 pTycho = normalize(vec3(0.19, -0.68, 0.70));
  float dTycho = length(p - pTycho);
  float tychoRim = (1.0 - smoothstep(0.0, 0.015, abs(dTycho - 0.048))) * 0.9;
  float tychoPeak = (1.0 - smoothstep(0.0, 0.010, dTycho)) * 0.85;
  float tychoAngle = atan(p.x - pTycho.x, p.y - pTycho.y);
  float tychoRays = pow(max(0.0, sin(tychoAngle * 16.0) + snoise(vec3(tychoAngle * 8.0, 0.0, dTycho * 12.0)) * 0.4), 3.0) * exp(-dTycho * 2.2) * 0.85;

  // B. Copernicus Crater (Oceanus Procellarum: 9.6°N, 20.1°W) - Concentric Terraced Rims
  vec3 pCop = normalize(vec3(-0.34, 0.16, 0.92));
  float dCop = length(p - pCop);
  float copOuter = 1.0 - smoothstep(0.0, 0.016, abs(dCop - 0.062));
  float copInner = 1.0 - smoothstep(0.0, 0.014, abs(dCop - 0.035));
  float copPeak = 1.0 - smoothstep(0.0, 0.009, dCop);

  // C. Kepler & Aristarchus (Bright Ray Centers)
  vec3 pKepler = normalize(vec3(-0.61, 0.14, 0.78));
  float dKepler = length(p - pKepler);
  float keplerRim = 1.0 - smoothstep(0.0, 0.014, abs(dKepler - 0.032));
  
  vec3 pAristarchus = normalize(vec3(-0.73, 0.40, 0.55));
  float dAristarchus = length(p - pAristarchus);
  float aristarchusRim = 1.0 - smoothstep(0.0, 0.012, abs(dAristarchus - 0.026));
  float aristarchusGlow = exp(-dAristarchus * 10.0) * 0.75;

  // Blend in analytical crater rays & peaks
  surfaceCol = mix(surfaceCol, rayBright, clamp(tychoRays + aristarchusGlow, 0.0, 0.85));

  // 6. Technical Coordinate Graticule (15° grid)
  float lat = asin(clamp(p.y, -1.0, 1.0));
  float lon = atan(p.z, p.x);
  float latGrid = 1.0 - smoothstep(0.0, 0.025, abs(fract(lat * (12.0 / 3.14159265) + 0.5) - 0.5));
  float lonGrid = 1.0 - smoothstep(0.0, 0.025, abs(fract(lon * (12.0 / 3.14159265) + 0.5) - 0.5));
  float graticule = max(latGrid, lonGrid) * 0.22;

  // Lunar Equator & Prime Meridian in Yellow Accent
  float lunarEquator = 1.0 - smoothstep(0.0, 0.018, abs(p.y));
  float lunarPrime = 1.0 - smoothstep(0.0, 0.018, abs(p.x));
  float yellowMajorLines = max(lunarEquator, lunarPrime) * 0.85;

  // Rim Silhouette
  float vdn = max(dot(V, N), 0.0);
  float rimLine = smoothstep(0.45, 0.98, pow(1.0 - vdn, 3.2));

  // Assemble Black Crater Linework
  float blackLines = max(rimLine * 0.95, craterRimLine * 0.70);
  blackLines = max(blackLines, tychoRim);
  blackLines = max(blackLines, tychoPeak);
  blackLines = max(blackLines, copOuter);
  blackLines = max(blackLines, copInner);
  blackLines = max(blackLines, copPeak);
  blackLines = max(blackLines, keplerRim);
  blackLines = max(blackLines, aristarchusRim);
  blackLines = max(blackLines, graticule);

  vec3 col = mix(surfaceCol, inkBlack, clamp(blackLines, 0.0, 1.0));
  col = mix(col, neonYellow, clamp(yellowMajorLines, 0.0, 1.0));

  // 7. Apollo 11 Tranquility Base Target Reticle (0.67° N, 23.47° E)
  vec3 pApollo = normalize(vec3(0.91, 0.012, 0.41));
  float dApollo = length(p - pApollo);
  if (dApollo < 0.16) {
    float outerRing = 1.0 - smoothstep(0.0, 0.012, abs(dApollo - 0.09));
    float innerRing = 1.0 - smoothstep(0.0, 0.012, abs(dApollo - 0.04));
    float bullseye = 1.0 - smoothstep(0.0, 0.008, dApollo);
    // Crosshairs
    vec2 apolloUv = vec2(p.x - pApollo.x, p.y - pApollo.y);
    float chX = (1.0 - smoothstep(0.0, 0.008, abs(apolloUv.y))) * step(dApollo, 0.12);
    float chY = (1.0 - smoothstep(0.0, 0.008, abs(apolloUv.x))) * step(dApollo, 0.12);
    float targetLines = max(max(outerRing, innerRing), max(bullseye, max(chX, chY)));
    col = mix(col, neonYellow, targetLines * 0.98);
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

// ---- Enhanced Sun Shader: SDO/SOHO Photosphere Texture, Granulation, Active Magnetic Belts, Heliographic Graticule
const outlineSunFrag = /* glsl */ `
varying vec2 vUv;
varying vec3 vP;
varying vec3 vN;
varying vec3 vW;
uniform sampler2D uSunMap;
uniform float uTime;
${NOISE_GLSL}

void main(){
  vec3 p = normalize(vP);
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);

  // 1. Dual-Drift Photosphere Sampling (Dynamic convection plasma flow)
  vec2 uv1 = vec2(fract(vUv.x + uTime * 0.005), vUv.y);
  vec2 uv2 = vec2(fract(vUv.x * 1.3 - uTime * 0.003), fract(vUv.y * 1.1 + uTime * 0.002));
  
  vec4 tex1 = texture2D(uSunMap, uv1);
  vec4 tex2 = texture2D(uSunMap, uv2);
  vec3 sunTex = mix(tex1.rgb, tex2.rgb, 0.45);
  float sunLum = dot(sunTex, vec3(0.299, 0.587, 0.114));

  // 2. Sobel Edge Filter for Convection Granulation Cell Borders
  float dU = 0.0035;
  float dV = 0.0035;
  float sL = dot(texture2D(uSunMap, uv1 + vec2(-dU, 0.0)).rgb, vec3(0.333));
  float sR = dot(texture2D(uSunMap, uv1 + vec2(dU, 0.0)).rgb, vec3(0.333));
  float sU = dot(texture2D(uSunMap, uv1 + vec2(0.0, dV)).rgb, vec3(0.333));
  float sD = dot(texture2D(uSunMap, uv1 + vec2(0.0, -dV)).rgb, vec3(0.333));
  float plasmaGranulation = smoothstep(0.03, 0.22, length(vec2(sR - sL, sU - sD)) * 3.8);

  // 3. Active Solar Flare / Faculae Magnetic Regions (Bright spots in SDO data)
  float activeFaculae = smoothstep(0.68, 0.88, sunLum);

  // 4. Sunspots Umbras & Penumbras (Dark magnetic flux tubes)
  float lat = asin(clamp(p.y, -1.0, 1.0));
  float lon = atan(p.z, p.x);
  // Active sunspot belts concentrated between 10° and 35° latitude (Spörer's law)
  float sunspotBelt = smoothstep(0.12, 0.22, abs(lat)) * (1.0 - smoothstep(0.50, 0.62, abs(lat)));
  float spotUmbra = (1.0 - smoothstep(0.22, 0.38, sunLum)) * sunspotBelt;
  float spotPenumbra = (1.0 - smoothstep(0.0, 0.05, abs(sunLum - 0.38))) * sunspotBelt;

  // 5. Heliographic Graticule (Astronomical Solar Coordinates)
  float latGrid = 1.0 - smoothstep(0.0, 0.025, abs(fract(lat * (12.0 / 3.14159265) + 0.5) - 0.5));
  float lonGrid = 1.0 - smoothstep(0.0, 0.025, abs(fract(lon * (12.0 / 3.14159265) + 0.5) - 0.5));
  float heliogrid = max(latGrid, lonGrid) * 0.28;
  float equator = 1.0 - smoothstep(0.0, 0.02, abs(p.y));

  // 6. Solar Limb Darkening & Rim
  float vdn = max(dot(V, N), 0.0);
  float limbDarkening = pow(vdn, 0.55);
  float rim = 1.0 - smoothstep(0.0, 0.08, vdn);

  // Palette: Vibrant solar yellow, fiery orange photosphere, deep amber limb, and ink black sunspots/rim
  vec3 deepOrange = vec3(0.96, 0.34, 0.02);   // Deep fiery solar orange (#F55705)
  vec3 warmOrange = vec3(1.0, 0.58, 0.06);    // Golden-orange photosphere (#FF940F)
  vec3 solarYellow = vec3(1.0, 0.88, 0.08);   // Brilliant sun yellow (#FFE014)
  vec3 flareYellow = vec3(1.0, 0.97, 0.45);   // Hot active flare yellow-gold
  vec3 burntAmber = vec3(0.55, 0.14, 0.01);   // Dark burnt orange for convection cell boundaries
  vec3 inkBlack = vec3(0.08, 0.08, 0.08);

  // Map SDO photosphere luminance across orange -> golden-orange -> bright yellow
  float texContrast = smoothstep(0.12, 0.88, sunLum);
  vec3 col = mix(deepOrange, warmOrange, smoothstep(0.0, 0.55, texContrast));
  col = mix(col, solarYellow, smoothstep(0.45, 1.0, texContrast));

  // Limb darkening shifts outer edges toward rich fiery orange
  col = mix(deepOrange * 0.88, col, limbDarkening);

  // Highlight active magnetic faculae / flare zones in blazing yellow
  col = mix(col, flareYellow, activeFaculae * 0.92);

  // Convection cell boundaries in rich burnt amber/orange so the Sun stays vibrant from afar
  col = mix(col, burntAmber, plasmaGranulation * 0.65);

  // Sunspot umbra in deep ink black
  col = mix(col, inkBlack, spotUmbra * 0.95);

  // Crisp ink lines for outer silhouette rim, sunspot penumbra, and subtle heliographic grid
  float lines = max(rim * 0.92, spotPenumbra * 0.85);
  lines = max(lines, heliogrid * 0.65);

  col = mix(col, inkBlack, clamp(lines, 0.0, 1.0));
  col = mix(col, flareYellow, equator * 0.85);

  gl_FragColor = vec4(col, 1.0);
}`;

// ---- Specialized Authentic Planetary Shader
// Maps authentic NASA / Solar System Scope textures with geological edge extraction and solar lighting
const outlinePlanetFrag = /* glsl */ `
varying vec2 vUv;
varying vec3 vP;
varying vec3 vN;
varying vec3 vW;
uniform sampler2D uPlanetMap;
uniform int uPlanetType; // 0=Mercury, 1=Venus, 2=Mars, 3=Jupiter, 4=Saturn, 5=Uranus, 6=Neptune
uniform vec3 uSunPos;
uniform float uTime;
${NOISE_GLSL}

void main(){
  vec3 p = normalize(vP);
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  vec3 L = normalize(uSunPos - vW); // True vector toward Sun in Solar System
  float nDotL = dot(N, L);
  float lat = asin(clamp(p.y, -1.0, 1.0));
  float lon = atan(p.z, p.x);

  float vdn = max(dot(V, N), 0.0);
  float rim = pow(1.0 - vdn, 2.8);
  float rimLine = smoothstep(0.4, 0.96, rim);

  vec2 uv = vUv;

  // Atmospheric shear & differential rotation
  if (uPlanetType == 1) {
    // Venus atmospheric 4-day super-rotation
    uv.x = fract(uv.x + uTime * 0.012);
  } else if (uPlanetType == 3) {
    // Jupiter differential zonal shear
    float jShear = cos(lat * 3.14159) * 0.015 * uTime;
    uv.x = fract(uv.x + jShear);
  } else if (uPlanetType == 6) {
    // Neptune supersonic jet stream shear
    float nShear = sin(lat * 6.28318) * 0.02 * uTime;
    uv.x = fract(uv.x + nShear);
  }

  vec4 rawTex = texture2D(uPlanetMap, uv);
  float lum = dot(rawTex.rgb, vec3(0.299, 0.587, 0.114));

  // 4-tap Sobel filter on texture for geological / cloud edge contours
  float dU = 0.0035;
  float dV = 0.0035;
  float sL = dot(texture2D(uPlanetMap, uv + vec2(-dU, 0.0)).rgb, vec3(0.333));
  float sR = dot(texture2D(uPlanetMap, uv + vec2(dU, 0.0)).rgb, vec3(0.333));
  float sU = dot(texture2D(uPlanetMap, uv + vec2(0.0, dV)).rgb, vec3(0.333));
  float sD = dot(texture2D(uPlanetMap, uv + vec2(0.0, -dV)).rgb, vec3(0.333));
  float texEdge = smoothstep(0.03, 0.24, length(vec2(sR - sL, sU - sD)) * 3.6);

  vec3 creamBase = vec3(0.98, 0.97, 0.92);
  vec3 inkBlack = vec3(0.08, 0.08, 0.08);
  vec3 neonYellow = vec3(1.0, 0.933, 0.0);

  vec3 col = creamBase;
  float lines = rimLine * 0.9;
  float dayLight = smoothstep(-0.15, 0.25, nDotL);

  if (uPlanetType == 0) {
    // ---- Mercury: MESSENGER Cratered Crust, Caloris Basin & Lobate Scarps
    col = vec3(0.94, 0.93, 0.89);
    col = mix(col * 0.85, col, smoothstep(0.2, 0.7, lum));
    lines = max(lines, texEdge * 0.88);
    // Airless world: sharp terminator
    dayLight = smoothstep(-0.02, 0.06, nDotL);
    col = mix(col * 0.14, col, dayLight);
    float equator = 1.0 - smoothstep(0.0, 0.02, abs(lat));
    col = mix(col, neonYellow, equator * 0.45 * dayLight);
  } else if (uPlanetType == 1) {
    // ---- Venus: Sulfuric Acid Cloud Deck, Super-rotation Chevron & Polar Vortices
    col = vec3(0.98, 0.95, 0.86);
    col = mix(col * 0.92, col, smoothstep(0.3, 0.8, lum));
    lines = max(lines, texEdge * 0.65);
    // Polar vortices at poles (lat > 0.8 or lat < -0.8)
    float polarVortex = step(0.82, abs(p.y)) * (1.0 - smoothstep(0.0, 0.03, abs(fract(lon * 2.0 + p.y * 10.0) - 0.5)));
    lines = max(lines, polarVortex * 0.6);
    // Thick atmosphere twilight diffusion & golden limb glow
    dayLight = smoothstep(-0.35, 0.30, nDotL);
    col = mix(col * 0.22, col, dayLight);
    float twilightLimb = rim * pow(max(0.0, dot(normalize(V + L), N)), 2.0);
    col = mix(col, neonYellow, twilightLimb * 0.65);
  } else if (uPlanetType == 2) {
    // ---- Mars: Terracotta Regolith, Basaltic Maria, Valles Marineris & Polar Caps
    col = vec3(0.96, 0.88, 0.78);
    // Dark basaltic maria (Syrtis Major, Sinus Sabaeus, Acidalia Planitia)
    float isDarkMaria = 1.0 - smoothstep(0.25, 0.52, lum);
    col = mix(col, vec3(0.30, 0.24, 0.22), isDarkMaria * 0.75);
    lines = max(lines, texEdge * 0.88);
    // Polar Ice Caps (Planum Boreum & Australe): gleaming ice white
    float isPolar = step(0.84, abs(p.y));
    float capEdge = 1.0 - smoothstep(0.0, 0.025, abs(abs(p.y) - 0.84));
    lines = max(lines, capEdge * 0.9);
    if (isPolar > 0.5) {
      col = vec3(1.0, 1.0, 1.0);
    }
    dayLight = smoothstep(-0.1, 0.15, nDotL);
    col = mix(col * 0.15, col, dayLight);
  } else if (uPlanetType == 3) {
    // ---- Jupiter: Alternating Belts/Zones, Eddy Turbulence & Great Red Spot
    vec3 zoneCol = vec3(0.98, 0.95, 0.90);
    vec3 beltCol = vec3(0.86, 0.73, 0.62);
    col = mix(beltCol, zoneCol, smoothstep(0.35, 0.7, lum));
    lines = max(lines, texEdge * 0.75);
    // Great Red Spot (GRS) at authentic coordinates uv ~ (0.457, 0.322)
    vec2 grsCenter = vec2(0.457, 0.322);
    float grsU = fract(uv.x);
    vec2 dGrs = vec2((grsU - grsCenter.x) * 2.2, (uv.y - grsCenter.y) * 1.5);
    float distGrs = length(dGrs);
    if (distGrs < 0.12) {
      col = mix(col, neonYellow, 0.82);
      float grsRings = 1.0 - smoothstep(0.0, 0.025, abs(fract(distGrs * 22.0) - 0.5));
      lines = max(lines, grsRings * 0.95);
    }
    dayLight = smoothstep(-0.2, 0.25, nDotL);
    col = mix(col * 0.25, col, dayLight);
  } else if (uPlanetType == 4) {
    // ---- Saturn: Butterscotch Ammonia Clouds, Polar Hexagon & Ring Shadow
    col = vec3(0.98, 0.94, 0.82);
    col = mix(col * 0.88, col, smoothstep(0.3, 0.75, lum));
    lines = max(lines, texEdge * 0.65);
    // North Polar Hexagon (~78° N latitude, p.y > 0.86)
    if (p.y > 0.86) {
      float hexAngle = lon;
      float hexR = abs(p.y - 0.91 - 0.035 * cos(6.0 * hexAngle));
      float hexLine = 1.0 - smoothstep(0.0, 0.02, hexR);
      lines = max(lines, hexLine * 0.95);
    }
    // Equatorial ring shadow cast across planet surface
    float ringShadow = (1.0 - smoothstep(0.0, 0.035, abs(p.y + 0.05))) * 0.75;
    col = mix(col, inkBlack, ringShadow);
    dayLight = smoothstep(-0.2, 0.25, nDotL);
    col = mix(col * 0.22, col, dayLight);
  } else if (uPlanetType == 5) {
    // ---- Uranus: Cyan-Aquamarine Methane Atmosphere & 98° Tilt Marker
    col = vec3(0.82, 0.94, 0.95);
    col = mix(col * 0.9, col, smoothstep(0.3, 0.75, lum));
    lines = max(lines, texEdge * 0.55);
    float equator = 1.0 - smoothstep(0.0, 0.02, abs(lat));
    col = mix(col, neonYellow, equator * 0.6);
    dayLight = smoothstep(-0.2, 0.25, nDotL);
    col = mix(col * 0.25, col, dayLight);
  } else if (uPlanetType == 6) {
    // ---- Neptune: Deep Cobalt Storm Belts, Great Dark Spot & Methane Cirrus
    vec3 deepBlue = vec3(0.60, 0.78, 0.96);
    col = mix(deepBlue * 0.75, deepBlue, smoothstep(0.3, 0.7, lum));
    lines = max(lines, texEdge * 0.65);
    // Great Dark Spot at uv ~ (0.69, 0.20)
    vec2 gdsCenter = vec2(0.69, 0.20);
    vec2 dGds = vec2((fract(uv.x) - gdsCenter.x) * 2.0, uv.y - gdsCenter.y);
    float distGds = length(dGds);
    if (distGds < 0.09) {
      float gdsRing = 1.0 - smoothstep(0.0, 0.02, abs(distGds - 0.07));
      col = mix(col, inkBlack, 0.65);
      lines = max(lines, gdsRing * 0.9);
    }
    // High-altitude bright white methane cirrus cloud streaks ("Scooter")
    if (lum > 0.78) {
      col = vec3(1.0, 1.0, 1.0);
      lines = max(lines, 0.4);
    }
    dayLight = smoothstep(-0.2, 0.25, nDotL);
    col = mix(col * 0.25, col, dayLight);
  }

  col = mix(col, inkBlack, clamp(lines, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}`;

// ---- Saturn Multi-division Ring Shaders (Cassini Division & Photometric Radial Profile)
const saturnRingVert = /* glsl */ `
varying vec2 vUv;
varying vec3 vP;
void main() {
  vUv = uv;
  vP = position;
  vec4 w = modelMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const saturnRingFrag = /* glsl */ `
varying vec2 vUv;
varying vec3 vP;
uniform sampler2D uRingMap;
uniform float uInnerR;
uniform float uOuterR;

void main() {
  float r = length(vP.xy);
  if (r < uInnerR || r > uOuterR) discard;
  float t = clamp((r - uInnerR) / (uOuterR - uInnerR), 0.0, 1.0);

  // Sample authentic NASA saturn_ring.jpg along Y axis
  vec4 ringTex = texture2D(uRingMap, vec2(0.5, t));
  float lum = dot(ringTex.rgb, vec3(0.299, 0.587, 0.114));

  vec3 creamBase = vec3(0.97, 0.94, 0.86);
  vec3 inkBlack = vec3(0.08, 0.08, 0.08);
  vec3 neonYellow = vec3(1.0, 0.933, 0.0);

  float opacity = smoothstep(0.12, 0.60, lum) * 0.85;

  // Cassini Division gap (around t ~ 0.74)
  float isCassini = 1.0 - smoothstep(0.0, 0.035, abs(t - 0.74));
  // Encke Gap (around t ~ 0.92)
  float isEncke = 1.0 - smoothstep(0.0, 0.015, abs(t - 0.92));

  vec3 col = mix(creamBase, inkBlack, isCassini * 0.95 + isEncke * 0.8);
  col = mix(col, neonYellow, step(0.65, lum) * (1.0 - isCassini) * 0.35);

  gl_FragColor = vec4(col, opacity);
}
`;

// Helper: Circular/Elliptical Orbit Line
function createOrbit(rx: number, rz: number, color = 0x222222, opacity = 0.55, center = new THREE.Vector3(0, 0, 0)): THREE.Line {
  const pts: THREE.Vector3[] = [];
  const segs = 180;
  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    pts.push(new THREE.Vector3(center.x + Math.cos(a) * rx, center.y, center.z + Math.sin(a) * rz));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.NormalBlending,
  });
  return new THREE.Line(geo, mat);
}

// Helper: Saturn Multi-division Ring System (A Ring, Cassini Division, B Ring, C Ring)
function createSaturnRings(radius: number, ringTex: THREE.Texture): THREE.Group {
  const ringGroup = new THREE.Group();
  
  // Custom Ring Shader Mesh sampling authentic saturn_ring.jpg
  const innerR = radius * 1.25;
  const outerR = radius * 2.38;
  const ringGeo = new THREE.RingGeometry(innerR, outerR, 96, 1);
  const ringMat = new THREE.ShaderMaterial({
    vertexShader: saturnRingVert,
    fragmentShader: saturnRingFrag,
    uniforms: {
      uRingMap: { value: ringTex },
      uInnerR: { value: innerR },
      uOuterR: { value: outerR },
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2;
  ringGroup.add(ringMesh);

  // Technical division caliper & border lines
  // Cassini Division line
  const cassiniPts: THREE.Vector3[] = [];
  const cassiniR = innerR + (outerR - innerR) * 0.74;
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    cassiniPts.push(new THREE.Vector3(Math.cos(a) * cassiniR, 0, Math.sin(a) * cassiniR));
  }
  ringGroup.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(cassiniPts),
    new THREE.LineBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.85 })
  ));

  // Outer A-Ring Rim
  const outerPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    outerPts.push(new THREE.Vector3(Math.cos(a) * outerR, 0, Math.sin(a) * outerR));
  }
  ringGroup.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(outerPts),
    new THREE.LineBasicMaterial({ color: 0xffee00, transparent: true, opacity: 0.9 })
  ));

  // Ring Major Callout Caliper Lines
  const caliperPts = [
    new THREE.Vector3(-radius * 2.45, 0, 0),
    new THREE.Vector3(radius * 2.45, 0, 0),
  ];
  const caliperGeo = new THREE.BufferGeometry().setFromPoints(caliperPts);
  const caliperMat = new THREE.LineDashedMaterial({ color: 0xffee00, dashSize: 2, gapSize: 1, transparent: true, opacity: 0.75 });
  const caliperLine = new THREE.LineSegments(caliperGeo, caliperMat);
  caliperLine.computeLineDistances();
  ringGroup.add(caliperLine);

  return ringGroup;
}

// Helper: Uranus Thin Vertical Rings
function createUranusRings(radius: number): THREE.Group {
  const ringGroup = new THREE.Group();
  for (let r = radius * 1.35; r <= radius * 1.95; r += 2.0) {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
    }
    const mat = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.55 });
    ringGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  }
  return ringGroup;
}

export function createSolarStage(opts: { pixelRatio: number; lowPower: boolean }): Stage {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfaf7e8);
  const rnd = mulberry32(101);

  // ---- 1. Deep Celestial Starfield (Graph paper crosshair stars)
  const starCount = opts.lowPower ? 700 : 1500;
  const starPts: THREE.Vector3[] = [];
  const STAR_SPAN = 3200;
  for (let i = 0; i < starCount; i++) {
    const p = new THREE.Vector3(
      (rnd() * 2 - 1) * STAR_SPAN,
      (rnd() * 2 - 1) * (STAR_SPAN * 0.6) + 200,
      (rnd() * 2 - 1) * STAR_SPAN - 300
    );
    const s = 1.8 + rnd() * 2.2;
    starPts.push(
      new THREE.Vector3(p.x - s, p.y, p.z),
      new THREE.Vector3(p.x + s, p.y, p.z),
      new THREE.Vector3(p.x, p.y - s, p.z),
      new THREE.Vector3(p.x, p.y + s, p.z)
    );
  }
  const starGeo = new THREE.BufferGeometry().setFromPoints(starPts);
  const starMat = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5, blending: THREE.NormalBlending });
  scene.add(new THREE.LineSegments(starGeo, starMat));

  // ---- 2. Earth & Planetary Texture System
  const texLoader = new THREE.TextureLoader();
  const earthMap = texLoader.load("/textures/planets/earth_atmos_2048.jpg");
  const earthMask = texLoader.load("/textures/planets/earth_specular_2048.jpg");
  const earthClouds = texLoader.load("/textures/planets/earth_clouds_1024.png");
  const moonMap = texLoader.load("/textures/planets/moon_1024.jpg");

  // Authentic NASA / Solar System Scope imagery for the Sun and all planets
  const sunMap = texLoader.load("/textures/planets/sun.jpg");
  const mercuryMap = texLoader.load("/textures/planets/mercury.jpg");
  const venusMap = texLoader.load("/textures/planets/venus.jpg");
  const marsMap = texLoader.load("/textures/planets/mars.jpg");
  const jupiterMap = texLoader.load("/textures/planets/jupiter.jpg");
  const saturnMap = texLoader.load("/textures/planets/saturn.jpg");
  const saturnRingMap = texLoader.load("/textures/planets/saturn_ring.jpg");
  const uranusMap = texLoader.load("/textures/planets/uranus.jpg");
  const neptuneMap = texLoader.load("/textures/planets/neptune.jpg");

  [
    earthMap, earthMask, earthClouds, moonMap,
    sunMap, mercuryMap, venusMap, marsMap, jupiterMap, saturnMap, saturnRingMap, uranusMap, neptuneMap
  ].forEach((tex) => {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
  });

  const earthUniforms = {
    uEarthMap: { value: earthMap },
    uEarthMask: { value: earthMask },
    uCloudMap: { value: earthClouds },
    uSunPos: { value: SUN_POS },
    uTime: { value: 0 },
  };

  const earthMat = new THREE.ShaderMaterial({
    vertexShader: commonVert,
    fragmentShader: outlineEarthFrag,
    uniforms: earthUniforms,
  });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(EARTH_R, 96, 64), earthMat);
  earth.position.copy(EARTH_POS);
  earth.rotation.z = 0.41; // 23.4° Earth axial tilt
  scene.add(earth);

  // Earth orbital trajectory ring around Sun
  const earthSunDist = EARTH_POS.distanceTo(SUN_POS);
  const earthSunOrbit = createOrbit(earthSunDist, earthSunDist * 0.98, 0xffee00, 0.9, SUN_POS);
  scene.add(earthSunOrbit);

  // Earth satellite orbit
  const earthSatOrbit = createOrbit(EARTH_R * 1.45, EARTH_R * 1.45, 0x111111, 0.65, EARTH_POS);
  earthSatOrbit.rotation.x = Math.PI / 3;
  scene.add(earthSatOrbit);

  // ---- 3. Moon Mesh & Apollo HUD Reticle
  const moonUniforms = {
    uMoonMap: { value: moonMap },
    uSunPos: { value: SUN_POS },
    uTime: { value: 0 },
  };

  const moonMat = new THREE.ShaderMaterial({
    vertexShader: commonVert,
    fragmentShader: outlineMoonFrag,
    uniforms: moonUniforms,
  });
  const moon = new THREE.Mesh(new THREE.SphereGeometry(MOON_R, 80, 60), moonMat);
  moon.position.copy(MOON_POS);
  moon.rotation.z = 0.11;
  scene.add(moon);

  // Moon's orbit around Earth
  const moonDist = EARTH_POS.distanceTo(MOON_POS);
  const moonOrbit = createOrbit(moonDist, moonDist * 0.96, 0x111111, 0.75, EARTH_POS);
  moonOrbit.rotation.x = 0.25;
  moonOrbit.rotation.z = -0.15;
  scene.add(moonOrbit);

  // Apollo 11 Landing Reticle (Multi-layer concentric target HUD)
  const apolloReticle = new THREE.Group();
  apolloReticle.position.copy(MOON_POS);
  
  // Concentric target circles on Moon
  [MOON_R * 1.25, MOON_R * 1.6, MOON_R * 2.1].forEach((rad, idx) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * rad, Math.sin(a) * rad, 0));
    }
    const mat = new THREE.LineBasicMaterial({
      color: idx === 1 ? 0xffee00 : 0x111111,
      transparent: true,
      opacity: idx === 1 ? 0.95 : 0.6,
    });
    apolloReticle.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  });

  // Cardinal Crosshairs
  const apolloCrossPts = [
    new THREE.Vector3(-MOON_R * 2.5, 0, 0),
    new THREE.Vector3(MOON_R * 2.5, 0, 0),
    new THREE.Vector3(0, -MOON_R * 2.5, 0),
    new THREE.Vector3(0, MOON_R * 2.5, 0),
  ];
  apolloReticle.add(new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(apolloCrossPts),
    new THREE.LineBasicMaterial({ color: 0xffee00, transparent: true, opacity: 0.95 })
  ));
  scene.add(apolloReticle);

  // Lunar Reconnaissance Orbiter (LRO) Polar Orbit around Moon
  const lroOrbitPts: THREE.Vector3[] = [];
  const lroR = MOON_R * 1.5;
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * Math.PI * 2;
    lroOrbitPts.push(new THREE.Vector3(MOON_POS.x + Math.cos(a) * lroR, MOON_POS.y + Math.sin(a) * lroR, MOON_POS.z));
  }
  const lroOrbitGeo = new THREE.BufferGeometry().setFromPoints(lroOrbitPts);
  const lroOrbitMat = new THREE.LineDashedMaterial({ color: 0x111111, dashSize: 0.8, gapSize: 0.6, transparent: true, opacity: 0.75 });
  const lroOrbitLine = new THREE.Line(lroOrbitGeo, lroOrbitMat);
  lroOrbitLine.computeLineDistances();
  lroOrbitLine.rotation.y = 0.5;
  scene.add(lroOrbitLine);

  // Small LRO Probe Marker that orbits the Moon
  const lroProbeGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.6, 0, 0), new THREE.Vector3(0.6, 0, 0),
    new THREE.Vector3(0, -0.6, 0), new THREE.Vector3(0, 0.6, 0),
  ]);
  const lroProbeMat = new THREE.LineBasicMaterial({ color: 0xffee00 });
  const lroProbe = new THREE.LineSegments(lroProbeGeo, lroProbeMat);
  scene.add(lroProbe);

  // Translunar Injection (TLI) Trajectory Arc connecting Earth and Moon
  const tliCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 4, 10),
    new THREE.Vector3(15, 12, 0),
    new THREE.Vector3(34, 8, -20)
  );
  const tliPts = tliCurve.getPoints(64);
  const tliGeo = new THREE.BufferGeometry().setFromPoints(tliPts);
  const tliMat = new THREE.LineDashedMaterial({
    color: 0xffee00,
    dashSize: 1.4,
    gapSize: 0.9,
    transparent: true,
    opacity: 0.9,
  });
  const tliLine = new THREE.Line(tliGeo, tliMat);
  tliLine.computeLineDistances();
  scene.add(tliLine);

  // Trajectory markers (waypoint crosshairs along the translunar arc)
  const waypointPts: THREE.Vector3[] = [];
  [0.25, 0.5, 0.75].forEach((wp) => {
    const pt = tliCurve.getPoint(wp);
    const sz = 0.8;
    waypointPts.push(
      new THREE.Vector3(pt.x - sz, pt.y, pt.z),
      new THREE.Vector3(pt.x + sz, pt.y, pt.z),
      new THREE.Vector3(pt.x, pt.y - sz, pt.z),
      new THREE.Vector3(pt.x, pt.y + sz, pt.z)
    );
  });
  const waypointGeo = new THREE.BufferGeometry().setFromPoints(waypointPts);
  const waypointMat = new THREE.LineBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.75 });
  scene.add(new THREE.LineSegments(waypointGeo, waypointMat));

  // ---- 4. The Sun & Solar System
  const sunUniforms = {
    uSunMap: { value: sunMap },
    uTime: { value: 0 },
  };
  const sunMat = new THREE.ShaderMaterial({
    vertexShader: commonVert,
    fragmentShader: outlineSunFrag,
    uniforms: sunUniforms,
  });
  const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(SUN_R, 80, 60), sunMat);
  
  const sunGroup = new THREE.Group();
  sunGroup.position.copy(SUN_POS);
  sunGroup.add(sunMesh);

  // Concentric technical corona rings
  [SUN_R * 1.08, SUN_R * 1.25, SUN_R * 1.5, SUN_R * 1.9, SUN_R * 2.5].forEach((r, idx) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
    }
    const ringColors = [0xff6b00, 0xffee00, 0xff9500, 0xffee00, 0x222222];
    const lineMat = new THREE.LineBasicMaterial({
      color: ringColors[idx] ?? 0x222222,
      transparent: true,
      opacity: idx <= 2 ? 0.9 : 0.55,
      blending: THREE.NormalBlending,
    });
    const circle = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat);
    circle.rotation.x = Math.PI / 2;
    sunGroup.add(circle);
  });

  // Animated Solar Flare Magnetic Loops
  const prominenceLoops: THREE.Line[] = [];
  const loopMatYellow = new THREE.LineBasicMaterial({ color: 0xffee00, transparent: true, opacity: 0.9 });
  const loopMatOrange = new THREE.LineBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.9 });
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    const pts: THREE.Vector3[] = [];
    for (let j = 0; j <= 32; j++) {
      const u = (j / 32) * Math.PI;
      const h = Math.sin(u) * (SUN_R * 0.38);
      const rad = SUN_R + h;
      pts.push(new THREE.Vector3(
        Math.cos(angle + (u - Math.PI / 2) * 0.16) * rad,
        Math.sin(u) * (SUN_R * 0.25),
        Math.sin(angle + (u - Math.PI / 2) * 0.16) * rad
      ));
    }
    const loopLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      i % 2 === 0 ? loopMatOrange : loopMatYellow
    );
    sunGroup.add(loopLine);
    prominenceLoops.push(loopLine);
  }

  // Solar Compass Crosshairs & Polar Axis Vector
  const crossPts = [
    new THREE.Vector3(-SUN_R * 3.0, 0, 0),
    new THREE.Vector3(SUN_R * 3.0, 0, 0),
    new THREE.Vector3(0, 0, -SUN_R * 3.0),
    new THREE.Vector3(0, 0, SUN_R * 3.0),
    new THREE.Vector3(0, -SUN_R * 2.2, 0),
    new THREE.Vector3(0, SUN_R * 2.2, 0),
  ];
  const crossGeo = new THREE.BufferGeometry().setFromPoints(crossPts);
  const crossMat = new THREE.LineBasicMaterial({ color: 0x222222, transparent: true, opacity: 0.55 });
  sunGroup.add(new THREE.LineSegments(crossGeo, crossMat));

  // Parker Spiral (Interplanetary Magnetic Field Line emanating from Sun)
  const parkerPts: THREE.Vector3[] = [];
  for (let i = 0; i < 180; i++) {
    const a = (i / 180) * Math.PI * 8;
    const r = SUN_R + Math.pow(i / 180, 1.3) * 1100;
    parkerPts.push(new THREE.Vector3(Math.cos(a) * r, (rnd() - 0.5) * 5, Math.sin(a) * r));
  }
  const parkerGeo = new THREE.BufferGeometry().setFromPoints(parkerPts);
  const parkerMat = new THREE.LineDashedMaterial({ color: 0xffee00, dashSize: 4, gapSize: 3, transparent: true, opacity: 0.65 });
  const parkerLine = new THREE.Line(parkerGeo, parkerMat);
  parkerLine.computeLineDistances();
  sunGroup.add(parkerLine);

  scene.add(sunGroup);

  // ---- 5. High-Detail Planetary Systems with Authentic NASA Imagery
  interface PlanetDef {
    name: string;
    r: number;
    dist: number;
    type: number;
    speed: number;
    tilt: number;
    tex: THREE.Texture;
    initialAngle: number;
    hasSaturnRings?: boolean;
    hasUranusRings?: boolean;
    moons?: { r: number; dist: number; speed: number; name: string }[];
  }

  const planetsData: PlanetDef[] = [
    { name: "Mercury", r: 2.6, dist: 95, type: 0, speed: 4.1, tilt: 0.03, tex: mercuryMap, initialAngle: 1.25 },
    { name: "Venus", r: 4.8, dist: 155, type: 1, speed: 1.6, tilt: 3.1, tex: venusMap, initialAngle: 1.85 },
    {
      name: "Mars",
      r: 3.6,
      dist: 310,
      type: 2,
      speed: 0.53,
      tilt: 0.44,
      tex: marsMap,
      initialAngle: 2.15,
      moons: [
        { r: 0.4, dist: 5.8, speed: 8.5, name: "Phobos" },
        { r: 0.35, dist: 9.2, speed: 4.2, name: "Deimos" },
      ],
    },
    {
      name: "Jupiter",
      r: 18.0,
      dist: 520,
      type: 3,
      speed: 0.084,
      tilt: 0.05,
      tex: jupiterMap,
      initialAngle: 1.35,
      moons: [
        { r: 0.95, dist: 28, speed: 6.2, name: "Io" },
        { r: 0.85, dist: 37, speed: 4.4, name: "Europa" },
        { r: 1.35, dist: 49, speed: 3.1, name: "Ganymede" },
        { r: 1.15, dist: 64, speed: 2.2, name: "Callisto" },
      ],
    },
    {
      name: "Saturn",
      r: 15.0,
      dist: 740,
      type: 4,
      speed: 0.034,
      tilt: 0.46,
      tex: saturnMap,
      initialAngle: 0.98,
      hasSaturnRings: true,
      moons: [
        { r: 1.35, dist: 42, speed: 2.8, name: "Titan" },
      ],
    },
    {
      name: "Uranus",
      r: 8.5,
      dist: 960,
      type: 5,
      speed: 0.012,
      tilt: 1.71, // 98 deg tilt
      tex: uranusMap,
      initialAngle: 1.55,
      hasUranusRings: true,
      moons: [
        { r: 0.75, dist: 20, speed: 3.5, name: "Titania" },
      ],
    },
    {
      name: "Neptune",
      r: 8.0,
      dist: 1200,
      type: 6,
      speed: 0.006,
      tilt: 0.50,
      tex: neptuneMap,
      initialAngle: 1.18,
      moons: [
        { r: 0.9, dist: 22, speed: -2.8, name: "Triton" }, // Retrograde
      ],
    },
  ];

  interface LiveMoon {
    mesh: THREE.Mesh;
    dist: number;
    speed: number;
    angle: number;
  }

  interface LivePlanet {
    group: THREE.Group;
    dist: number;
    speed: number;
    angle: number;
    planetMesh: THREE.Mesh;
    material: THREE.ShaderMaterial;
    moons: LiveMoon[];
  }

  const livePlanets: LivePlanet[] = [];

  planetsData.forEach((p, idx) => {
    const pGroup = new THREE.Group();

    // Planet Shader with authentic NASA map and solar lighting
    const mat = new THREE.ShaderMaterial({
      vertexShader: commonVert,
      fragmentShader: outlinePlanetFrag,
      uniforms: {
        uPlanetMap: { value: p.tex },
        uPlanetType: { value: p.type },
        uSunPos: { value: SUN_POS },
        uTime: { value: 0 },
      },
    });
    const pMesh = new THREE.Mesh(new THREE.SphereGeometry(p.r, 56, 40), mat);
    pMesh.rotation.z = p.tilt;
    pGroup.add(pMesh);

    // Saturn rings with authentic photometric radial profile
    if (p.hasSaturnRings) {
      const rings = createSaturnRings(p.r, saturnRingMap);
      rings.rotation.z = p.tilt;
      pGroup.add(rings);
    }

    // Uranus rings
    if (p.hasUranusRings) {
      const rings = createUranusRings(p.r);
      pGroup.add(rings);
    }

    // Planet Moons
    const liveMoons: LiveMoon[] = [];
    if (p.moons) {
      p.moons.forEach((m) => {
        // Orbit line
        const mOrbit = createOrbit(m.dist, m.dist, 0x111111, 0.45);
        pGroup.add(mOrbit);

        // Moon sphere
        const mMorph = new THREE.Mesh(
          new THREE.SphereGeometry(m.r, 16, 12),
          new THREE.MeshBasicMaterial({ color: 0x111111 })
        );
        pGroup.add(mMorph);
        liveMoons.push({ mesh: mMorph, dist: m.dist, speed: m.speed, angle: rnd() * Math.PI * 2 });
      });
    }

    // Planetary Orbit Ring around Sun
    const orbitColor = idx === 2 || idx === 3 ? 0xffee00 : 0x333333;
    const orbit = createOrbit(p.dist, p.dist * 0.985, orbitColor, 0.55, SUN_POS);
    scene.add(orbit);

    // Initial positioning
    const angle = p.initialAngle;
    pGroup.position.set(
      SUN_POS.x + Math.cos(angle) * p.dist,
      SUN_POS.y,
      SUN_POS.z + Math.sin(angle) * (p.dist * 0.985)
    );
    scene.add(pGroup);

    livePlanets.push({
      group: pGroup,
      dist: p.dist,
      speed: p.speed,
      angle,
      planetMesh: pMesh,
      material: mat,
      moons: liveMoons,
    });
  });

  // ---- 6. Halley's Comet (Hyperbolic highly eccentric orbit with dual tails)
  const cometGroup = new THREE.Group();
  const cometNucleus = new THREE.Mesh(
    new THREE.SphereGeometry(1.4, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xffee00 })
  );
  cometGroup.add(cometNucleus);

  // Ion Tail (straight, pointing anti-solar in neon yellow)
  const ionTailPts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(45, 12, 60)];
  const ionTailGeo = new THREE.BufferGeometry().setFromPoints(ionTailPts);
  const ionTailMat = new THREE.LineDashedMaterial({ color: 0xffee00, dashSize: 3, gapSize: 1.5, transparent: true, opacity: 0.9 });
  const ionTailLine = new THREE.Line(ionTailGeo, ionTailMat);
  ionTailLine.computeLineDistances();
  cometGroup.add(ionTailLine);

  // Dust Tail (gently curving in dark ink)
  const dustTailPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    dustTailPts.push(new THREE.Vector3(t * 52, t * 8 + Math.pow(t, 2) * 14, t * 50 - Math.pow(t, 2) * 18));
  }
  const dustTailGeo = new THREE.BufferGeometry().setFromPoints(dustTailPts);
  const dustTailMat = new THREE.LineBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.7 });
  cometGroup.add(new THREE.Line(dustTailGeo, dustTailMat));
  scene.add(cometGroup);

  // Comet Orbit Path (Eccentric elongated ellipse)
  const cometOrbitPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 128; i++) {
    const a = (i / 128) * Math.PI * 2;
    // High eccentricity: rx = 900, rz = 240, shifted focus
    const cx = SUN_POS.x + 350 + Math.cos(a) * 650;
    const cy = SUN_POS.y + Math.sin(a) * 65;
    const cz = SUN_POS.z + Math.sin(a) * 220;
    cometOrbitPts.push(new THREE.Vector3(cx, cy, cz));
  }
  const cometOrbitGeo = new THREE.BufferGeometry().setFromPoints(cometOrbitPts);
  const cometOrbitMat = new THREE.LineDashedMaterial({ color: 0x888888, dashSize: 6, gapSize: 4, transparent: true, opacity: 0.45 });
  const cometOrbitLine = new THREE.Line(cometOrbitGeo, cometOrbitMat);
  cometOrbitLine.computeLineDistances();
  scene.add(cometOrbitLine);

  // ---- 7. Asteroid Belt & Kirkwood Gap Structure (between Mars & Jupiter)
  const ASTEROID_COUNT = opts.lowPower ? 550 : 1200;
  const astPts: THREE.Vector3[] = [];
  for (let i = 0; i < ASTEROID_COUNT; i++) {
    const a = (i / ASTEROID_COUNT) * Math.PI * 2 + (rnd() - 0.5) * 0.12;
    // Kirkwood Gap at 3:1 resonance (~415 units)
    let rad = 370 + rnd() * 110;
    if (rad > 410 && rad < 425 && rnd() > 0.15) {
      rad += 20; // Clear out the gap
    }
    const px = SUN_POS.x + Math.cos(a) * rad;
    const py = SUN_POS.y + (rnd() - 0.5) * 28;
    const pz = SUN_POS.z + Math.sin(a) * (rad * 0.985);
    const s = 1.2 + rnd() * 1.6;
    astPts.push(
      new THREE.Vector3(px - s, py, pz),
      new THREE.Vector3(px + s, py, pz),
      new THREE.Vector3(px, py - s, pz),
      new THREE.Vector3(px, py + s, pz)
    );
  }
  const astGeo = new THREE.BufferGeometry().setFromPoints(astPts);
  const astMat = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.65 });
  scene.add(new THREE.LineSegments(astGeo, astMat));

  // ---- 8. Trans-Neptunian Kuiper Belt (Outer ring crosshairs beyond Neptune)
  const KUIPER_COUNT = opts.lowPower ? 300 : 700;
  const kuiperPts: THREE.Vector3[] = [];
  for (let i = 0; i < KUIPER_COUNT; i++) {
    const a = (i / KUIPER_COUNT) * Math.PI * 2 + (rnd() - 0.5) * 0.08;
    const rad = 1350 + rnd() * 350;
    const px = SUN_POS.x + Math.cos(a) * rad;
    const py = SUN_POS.y + (rnd() - 0.5) * 45;
    const pz = SUN_POS.z + Math.sin(a) * (rad * 0.985);
    const s = 1.8 + rnd() * 2.0;
    kuiperPts.push(
      new THREE.Vector3(px - s, py, pz),
      new THREE.Vector3(px + s, py, pz),
      new THREE.Vector3(px, py - s, pz),
      new THREE.Vector3(px, py + s, pz)
    );
  }
  const kuiperGeo = new THREE.BufferGeometry().setFromPoints(kuiperPts);
  const kuiperMat = new THREE.LineBasicMaterial({ color: 0x666666, transparent: true, opacity: 0.5 });
  scene.add(new THREE.LineSegments(kuiperGeo, kuiperMat));

  // ---- 9. Concentric Astronomical Distance Reticles (AU Rings) & Ecliptic Armillary Astrolabe
  [220, 520, 740, 1200, 1600, 2100].forEach((auRad, i) => {
    const auOrbit = createOrbit(auRad, auRad, i === 0 || i === 2 ? 0xffee00 : 0x888888, i === 0 ? 0.65 : 0.35, SUN_POS);
    scene.add(auOrbit);
  });

  // 12 Zodiac / Seasonal Astrolabe Radial Spokes from Sun
  const spokePts: THREE.Vector3[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    spokePts.push(
      new THREE.Vector3(SUN_POS.x + Math.cos(a) * (SUN_R * 2.6), SUN_POS.y, SUN_POS.z + Math.sin(a) * (SUN_R * 2.6)),
      new THREE.Vector3(SUN_POS.x + Math.cos(a) * 2100, SUN_POS.y, SUN_POS.z + Math.sin(a) * 2100)
    );
  }
  const spokeGeo = new THREE.BufferGeometry().setFromPoints(spokePts);
  const spokeMat = new THREE.LineBasicMaterial({ color: 0x555555, transparent: true, opacity: 0.3 });
  scene.add(new THREE.LineSegments(spokeGeo, spokeMat));

  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();

  return {
    scene,
    hazeColor: new THREE.Color(0.98, 0.969, 0.91),
    update(t, elapsed, camera) {
      if (camera.fov !== 45) {
        camera.fov = 45;
        camera.near = 0.1;
        camera.far = 9000;
        camera.updateProjectionMatrix();
      }

      // Sample camera path continuously across 0.0 -> 1.0
      samplePath(PATH, t, camPos, camLook);
      camera.position.copy(camPos);
      camera.lookAt(camLook);
      camera.updateMatrixWorld();

      // Update Earth & Moon uniforms
      earthUniforms.uTime.value = elapsed;
      moonUniforms.uTime.value = elapsed;

      // Earth rotation: start facing Europe, Africa, Atlantic, and Americas
      earth.rotation.y = 2.8 + elapsed * 0.008 + t * 0.6;

      // Moon rotation & Apollo reticle billboarding: Near side facing camera
      moon.rotation.y = 2.4 + elapsed * 0.004;
      apolloReticle.lookAt(camPos);

      // LRO satellite orbit around Moon
      const lroAngle = elapsed * 1.8;
      lroProbe.position.set(
        MOON_POS.x + Math.cos(lroAngle) * lroR,
        MOON_POS.y + Math.sin(lroAngle) * (lroR * 0.8),
        MOON_POS.z + Math.sin(lroAngle) * (lroR * 0.5)
      );

      // Sun updates
      sunUniforms.uTime.value = elapsed;
      sunGroup.rotation.y = elapsed * 0.003;

      // Animate solar flare prominence loops
      prominenceLoops.forEach((loop, idx) => {
        loop.rotation.y = Math.sin(elapsed * 0.5 + idx) * 0.05;
      });

      // Rotate planets along their orbits and update moons
      livePlanets.forEach((p) => {
        p.material.uniforms.uTime.value = elapsed;
        const curAngle = p.angle + elapsed * (p.speed * 0.015);
        p.group.position.set(
          SUN_POS.x + Math.cos(curAngle) * p.dist,
          SUN_POS.y,
          SUN_POS.z + Math.sin(curAngle) * (p.dist * 0.985)
        );
        p.planetMesh.rotation.y += 0.008;

        // Animate moons around planet
        p.moons.forEach((m) => {
          const mCurAngle = m.angle + elapsed * (m.speed * 0.35);
          m.mesh.position.set(
            Math.cos(mCurAngle) * m.dist,
            (rnd() - 0.5) * 0.1,
            Math.sin(mCurAngle) * m.dist
          );
        });
      });

      // Animate Halley's Comet along its eccentric path
      const cometAngle = elapsed * 0.04;
      const cometX = SUN_POS.x + 350 + Math.cos(cometAngle) * 650;
      const cometY = SUN_POS.y + Math.sin(cometAngle) * 65;
      const cometZ = SUN_POS.z + Math.sin(cometAngle) * 220;
      cometGroup.position.set(cometX, cometY, cometZ);
      // Comet tails point away from the Sun
      cometGroup.lookAt(cometX * 2 - SUN_POS.x, cometY * 2 - SUN_POS.y, cometZ * 2 - SUN_POS.z);

      return 0; // Seamless continuous journey without artificial fades
    },
    dispose() {
      disposeScene(scene);
    },
  };
}
