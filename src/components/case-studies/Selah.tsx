"use client";
import React from 'react';
import { ProjectData } from '@/data/projects';
import { ImageSlider } from '@/components/ImageSlider';

const selahImages = [
  { src: '/images/Selah/1_Welcome_Overlay.png', caption: '3D Double-Door Welcome Overlay & Audio Gate' },
  { src: '/images/Selah/2_Hero_Section.png', caption: 'Hero Section — WebGL2 Silk Shader & Live Countdown' },
  { src: '/images/Selah/3_Events_Showcase.png', caption: 'Interactive MagicBento Sports & Cultural Showcase' },
  { src: '/images/Selah/4_Event_Schedule.png', caption: 'Collision-Aware Dual-Track Festival Timeline' },
  { src: '/images/Selah/5_Registration_Portal.png', caption: '4-Step Parish Registration Wizard & Roster Builder' },
  { src: '/images/Selah/6_Event_Rulebook.png', caption: 'Searchable Deep-Linked Event Rulebook' },
  { src: '/images/Selah/7_About_CYA.png', caption: 'About CYA & 3D Tilt Core Team Roster' },
  { src: '/images/Selah/8_Admin_Dashboard.png', caption: 'Authenticated Admin Telemetry & CSV Export Console' },
];

export function Selah({ project }: { project: ProjectData }) {
  return (
    <>
      <ImageSlider images={selahImages} color={project.color} />

      {/* Introduction */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Introduction &amp; Project Context
        </h2>
        <div className="text-neutral-800 leading-relaxed text-base md:text-lg space-y-4 font-medium">
          <p>
            <strong className="font-black text-black">SELAH 2026 (&ldquo;Pause. Explore. Renew.&rdquo;)</strong> is the official full-stack web platform engineered for the inter-church youth cultural and sports festival hosted by the <strong className="font-bold text-black">Carmel Youth Association (CYA)</strong> in Pune. Uniting congregations across 15 competitive events—6 Sports tournaments and 9 Cultural showcases—with a ₹45,000 prize pool, the platform needed to serve both as a high-impact visual experience for youth attendees and as a mission-critical operations portal for parish coordinators.
          </p>
          <p>
            Rather than relying on static brochures and fragmented Google Forms that struggle with complex team composition rules, I architected a unified Next.js 16 and React 19 web application. It pairs custom <strong className="font-bold text-black">WebGL2 GLSL shaders</strong> and <strong className="font-bold text-black">GSAP / Framer Motion choreography</strong> with a <strong className="font-bold text-black">4-step parish registration state machine</strong>, dual-storage <strong className="font-bold text-black">Cloud Firestore persistence</strong>, and an <strong className="font-bold text-black">HMAC-authenticated admin analytics dashboard</strong>.
          </p>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          System Architecture &amp; Data Flow
        </h2>
        <div className="w-full border-2 border-black bg-[#FAF7E8] shadow-[6px_6px_0px_#000] p-4 md:p-6 overflow-hidden relative">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-3 pb-2 border-b border-black/20 flex justify-between">
            <span>// SYSTEM TOPOLOGY DIAGRAM</span>
            <span>[ARCH-01]</span>
          </div>
          <img
            src="/images/Selah/Architecture.png"
            alt="SELAH 2026 Full-Stack System Architecture Diagram"
            className="w-full h-auto object-contain border border-black bg-white"
          />
        </div>
      </section>

      {/* Design System & Aesthetic Tokens */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Visual Identity &amp; Design System
        </h2>
        <p className="text-neutral-800 leading-relaxed text-base md:text-lg mb-6 font-medium">
          Before writing feature code, a cohesive festival design system was established in <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">globals.css</code> and Tailwind CSS v4 around three core brand tokens and translucent glassmorphic surfaces:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col justify-between">
            <div className="w-full h-12 bg-[#611e3c] border-2 border-black mb-3 flex items-center justify-end px-2">
              <span className="font-mono text-[10px] font-bold text-[#fff1cb] bg-black/40 px-1.5 py-0.5">#611E3C</span>
            </div>
            <div className="font-black text-sm uppercase text-black">Primary Wine</div>
            <p className="text-xs text-neutral-700 font-medium mt-1">
              Deep royal maroon used for primary canvas backgrounds, WebGL cloth base tone, and dark surface cards.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col justify-between">
            <div className="w-full h-12 bg-[#63752e] border-2 border-black mb-3 flex items-center justify-end px-2">
              <span className="font-mono text-[10px] font-bold text-[#fff1cb] bg-black/40 px-1.5 py-0.5">#63752E</span>
            </div>
            <div className="font-black text-sm uppercase text-black">Festival Olive</div>
            <p className="text-xs text-neutral-700 font-medium mt-1">
              Interactive accent token driving active tab springs, spotlight border glows, and primary CTAs.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col justify-between">
            <div className="w-full h-12 bg-[#fff1cb] border-2 border-black mb-3 flex items-center justify-end px-2">
              <span className="font-mono text-[10px] font-bold text-[#611e3c] bg-white/80 border border-black/20 px-1.5 py-0.5">#FFF1CB</span>
            </div>
            <div className="font-black text-sm uppercase text-black">Warm Cream</div>
            <p className="text-xs text-neutral-700 font-medium mt-1">
              High-contrast foreground token for display typography, Silk shader specular sheen, and rulebook cards.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col justify-between">
            <div className="w-full h-12 bg-[#fff1cb]/70 border-2 border-black mb-3 flex items-center justify-end px-2 backdrop-blur-md">
              <span className="font-mono text-[10px] font-bold text-black bg-white/80 border border-black/20 px-1.5 py-0.5">BLUR(16PX)</span>
            </div>
            <div className="font-black text-sm uppercase text-black">Frosted Glass</div>
            <p className="text-xs text-neutral-700 font-medium mt-1">
              Adaptive floating navigation bar (<code className="font-mono text-[10px]">resizable-navbar.tsx</code>) and GSAP staggered mobile drawer.
            </p>
          </div>
        </div>
      </section>

      {/* Process of Building SELAH */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          The Engineering Process: How SELAH Was Built
        </h2>

        <p className="text-neutral-800 leading-relaxed text-base md:text-lg mb-8 font-medium">
          Analyzing the codebase and commit progression reveals five distinct engineering phases—progressing from WebGL shader pipelines and interactive choreography to algorithmic scheduling, multi-step form validation, and serverless database security.
        </p>

        <div className="space-y-8">
          {/* Phase 1 */}
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 md:p-8 relative overflow-hidden">
            <div className="w-full h-1.5 bg-[#FFEE00] border-b border-black absolute top-0 left-0 right-0" />
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 mt-2">
              <h3 className="text-xl md:text-2xl font-black uppercase text-black">
                Phase 01 // 3D Double-Door Entry Gate &amp; Persistent Audio Engine
              </h3>
              <span className="font-mono text-xs font-black px-2.5 py-0.5 bg-[#FFEE00] border border-black">
                WELCOME &amp; AUDIO
              </span>
            </div>
            <p className="text-neutral-800 leading-relaxed mb-5 font-medium">
              Modern browsers block unmuted Web Audio playback until an explicit user gesture occurs. Rather than showing a generic modal prompt, I engineered a theatrical 3D double-door entry experience (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">WelcomeOverlay.tsx</code>) paired with <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">ThemeMusicPlayer.tsx</code>:
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-black uppercase text-black mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  3D Perspective Split Doors
                </h4>
                <p className="text-sm md:text-base text-neutral-800 leading-relaxed font-medium">
                  Constructed two full-viewport door leaves inside a <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">perspective: 1600px</code> container. When the user clicks <em>&ldquo;ENTER SELAH 2026&rdquo;</em> (or presses <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">Enter</code>/<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">Space</code>), Framer Motion springs hinge the left and right panels open to <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">rotateY(±95deg)</code> while triggering a golden seam light burst.
                </p>
              </div>
              <div>
                <h4 className="text-base font-black uppercase text-black mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  FOUC-Free Session Hydration
                </h4>
                <p className="text-sm md:text-base text-neutral-800 leading-relaxed font-medium">
                  To prevent the welcome doors from flashing again when navigating back to <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">/</code> from sub-pages, a synchronous inline script in <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">src/app/layout.tsx</code> checks <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">sessionStorage.getItem(&apos;selah_has_entered&apos;)</code> before first paint and attaches the <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">.selah-entered</code> class to <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">&lt;html&gt;</code>, while simultaneously unlocking the floating FIFA World Cup Anthem audio player.
                </p>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 md:p-8 relative overflow-hidden">
            <div className="w-full h-1.5 bg-[#FFEE00] border-b border-black absolute top-0 left-0 right-0" />
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 mt-2">
              <h3 className="text-xl md:text-2xl font-black uppercase text-black">
                Phase 02 // Custom WebGL2 Shader Pipelines (Silk &amp; 9-Blade Iris)
              </h3>
              <span className="font-mono text-xs font-black px-2.5 py-0.5 bg-[#FFEE00] border border-black">
                GLSL 300 ES
              </span>
            </div>
            <p className="text-neutral-800 leading-relaxed mb-5 font-medium">
              To give SELAH a tactile, living atmosphere without heavy 3D model downloads, I wrote two custom WebGL2 fragment shader systems directly against the browser&apos;s raw <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">webgl2</code> context:
            </p>
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-black uppercase text-black mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  1. Interactive 3D Cloth Physics Shader (<code className="font-mono text-xs">Silk.jsx</code>)
                </h4>
                <p className="text-sm md:text-base text-neutral-800 leading-relaxed font-medium">
                  Renders a full-screen procedural triangle (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">[-1, -1, 3, -1, -1, 3]</code>) across two shader passes: a quarter-resolution <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">FIELD</code> pass that generates mipmapped highlight bloom in an offscreen Framebuffer Object (FBO), and a <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">COMPOSITE</code> pass that computes finite-difference surface normals (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">gx, gy</code>), Blinn-Phong specular sheen (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">#fff1cb</code> over <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">#611e3c</code>), pointer-velocity UV drag deformation, and up to 4 concurrent expanding click-ripple shockwaves (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">uWaves[4]</code>).
                </p>
              </div>
              <div>
                <h4 className="text-base font-black uppercase text-black mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  2. Camera Lens Gallery &amp; 9-Blade Mechanical Aperture (<code className="font-mono text-xs">ApertureTransition.tsx</code>)
                </h4>
                <p className="text-sm md:text-base text-neutral-800 leading-relaxed font-medium">
                  The <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">/gallery</code> interface (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">GalleryClient.tsx</code>) models a physical camera chassis with a rotary knurled dial ring that snaps in <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">24°</code> detents via pointer angle trigonometry (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">Math.atan2</code>) and samples a <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">16×16</code> offscreen canvas of the active photo to cast dynamic ambient backlighting. Opening an event triggers a full-screen WebGL2 shader that mathematically intersects 9 half-planes with anisotropic brushed metal micro-grooves, inter-blade cast shadows, and brass bevel chamfers—spiraling shut over the clicked lens center before routing and opening on the destination page via GSAP timelines.
                </p>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 md:p-8 relative overflow-hidden">
            <div className="w-full h-1.5 bg-[#FFEE00] border-b border-black absolute top-0 left-0 right-0" />
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 mt-2">
              <h3 className="text-xl md:text-2xl font-black uppercase text-black">
                Phase 03 // Collision-Aware Schedule Engine &amp; Deep-Linked Rulebook
              </h3>
              <span className="font-mono text-xs font-black px-2.5 py-0.5 bg-[#FFEE00] border border-black">
                ALGORITHMIC UI
              </span>
            </div>
            <p className="text-neutral-800 leading-relaxed mb-5 font-medium">
              With 15 cultural and sports events running concurrently between 8:00 AM and 9:00 PM, static tables were difficult to read on mobile devices. I engineered an interactive calendar and rulebook pipeline:
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-black uppercase text-black mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  Interval Partitioning &amp; Lane Expansion (<code className="font-mono text-xs">computeEventLayout</code>)
                </h4>
                <p className="text-sm md:text-base text-neutral-800 leading-relaxed font-medium">
                  In <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">src/app/page.tsx</code>, overlapping events within the Cultural and Sports tracks are grouped into connected collision clusters. A greedy lane-assignment algorithm packs each event into the first conflict-free column (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">lane</code> / <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">totalLanes</code>) and then calculates horizontal <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">colSpan</code> expansion into adjacent empty lanes. On festival day (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">2026-12-05</code>), a live time tracker polls every 60 seconds to highlight active events in real time.
                </p>
              </div>
              <div>
                <h4 className="text-base font-black uppercase text-black mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  MagicBento Spotlight Grid &amp; Hash-Synced Rulebook (<code className="font-mono text-xs">/rules</code>)
                </h4>
                <p className="text-sm md:text-base text-neutral-800 leading-relaxed font-medium">
                  Event cards are rendered inside <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">MagicBento.jsx</code> with radial cursor spotlight tracking. Clicking any card routes to <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">/rules#[slug]</code>, where <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">RulesPage</code> automatically switches to the target category tab, expands the event&apos;s accordion, and runs a retry-polled smooth scroll with sticky-header offset compensation (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">110px</code>) to display squad specs, rules, and weighted judging progress bars.
                </p>
              </div>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 md:p-8 relative overflow-hidden">
            <div className="w-full h-1.5 bg-[#FFEE00] border-b border-black absolute top-0 left-0 right-0" />
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 mt-2">
              <h3 className="text-xl md:text-2xl font-black uppercase text-black">
                Phase 04 // 4-Step Parish Registration Wizard &amp; Roster Validator
              </h3>
              <span className="font-mono text-xs font-black px-2.5 py-0.5 bg-[#FFEE00] border border-black">
                STATE MACHINE
              </span>
            </div>
            <p className="text-neutral-800 leading-relaxed mb-5 font-medium">
              The core operational requirement of SELAH 2026 was replacing error-prone paper/PDF forms with a guided delegation registration portal (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">src/app/register/page.tsx</code>) driven by a declarative rules schema (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">registrationEvents.ts</code>):
            </p>
            <ul className="list-disc pl-5 space-y-2.5 text-sm md:text-base text-neutral-800 font-medium">
              <li>
                <strong className="font-black text-black">Step 1 — Parish &amp; Delegate Verification:</strong> Captures parish name, representative name, email, and 10-digit Indian mobile number with regex validation before unlocking squad selection.
              </li>
              <li>
                <strong className="font-black text-black">Steps 2 &amp; 3 — Sports &amp; Cultural Squad Builders:</strong> Toggling any of the 15 events pre-populates default roster templates (e.g., <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1 py-0.5 font-bold">Captain</code>, <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1 py-0.5 font-bold">Goalkeeper</code>, <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1 py-0.5 font-bold">Anchor</code>, <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1 py-0.5 font-bold">Substitute</code>) and enforces strict domain constraints—such as <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1 py-0.5 font-bold">mixed-2b2g</code> (exact 2 Boys &amp; 2 Girls for Mixed Relay), <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1 py-0.5 font-bold">mixed-4b2g</code> (4 Boys &amp; 2 Girls + up to 3 Substitutes for Tug of War), <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1 py-0.5 font-bold">boys-only</code> for Futsal, and <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1 py-0.5 font-bold">girls-only</code> for Throwball.
              </li>
              <li>
                <strong className="font-black text-black">Step 4 — Tiered Fee Engine &amp; Printable Receipt:</strong> Memoized calculation engine dynamically totals <strong className="font-bold text-black">₹800 per group team</strong> and <strong className="font-bold text-black">₹250 per individual participant</strong>, renders an interactive UPI QR payment module with one-click UPI ID copy, and generates a print-ready official delegation confirmation receipt with a unique <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1 py-0.5 font-bold">SELAH26-&#123;PARISH&#125;-&#123;HASH&#125;</code> code.
              </li>
            </ul>
          </div>

          {/* Phase 5 */}
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 md:p-8 relative overflow-hidden">
            <div className="w-full h-1.5 bg-[#FFEE00] border-b border-black absolute top-0 left-0 right-0" />
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 mt-2">
              <h3 className="text-xl md:text-2xl font-black uppercase text-black">
                Phase 05 // Dual-Storage Persistence &amp; Cryptographic Admin Console
              </h3>
              <span className="font-mono text-xs font-black px-2.5 py-0.5 bg-[#FFEE00] border border-black">
                BACKEND &amp; SECURITY
              </span>
            </div>
            <p className="text-neutral-800 leading-relaxed mb-5 font-medium">
              To ensure zero registration data loss and give festival coordinators real-time visibility, I built a resilient serverless backend (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">/api/register</code> &amp; <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">/api/admin/*</code>) and the <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">/register-admin</code> portal:
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-black uppercase text-black mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  Cloud Firestore + Local JSON Mirroring
                </h4>
                <p className="text-sm md:text-base text-neutral-800 leading-relaxed font-medium">
                  Every submission is server-side validated and written to <strong className="font-bold text-black">Google Cloud Firestore</strong> (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">registrations/&#123;registrationId&#125;</code>) while simultaneously mirroring to <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">data/registrations.json</code>. If Firestore experiences connectivity issues, the admin API seamlessly falls back to the local JSON store and displays a live connection status badge.
                </p>
              </div>
              <div>
                <h4 className="text-base font-black uppercase text-black mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  Timing-Safe HMAC-SHA256 Authentication (<code className="font-mono text-xs">adminAuth.ts</code>)
                </h4>
                <p className="text-sm md:text-base text-neutral-800 leading-relaxed font-medium">
                  Admin credentials are hashed with SHA-256 and compared via Node&apos;s <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">crypto.timingSafeEqual</code> to prevent timing side-channel attacks. Successful login issues a 7-day HMAC-SHA256 signed token (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">&#123;timestamp&#125;.&#123;signature&#125;</code>) verified via both <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">Authorization: Bearer</code> headers and <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">HttpOnly</code> cookies, enabling coordinators to filter squads, inspect rosters, delete test entries, and export RFC-compliant CSV spreadsheets in one click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Modules Grid */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Key Platform Modules &amp; Views
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-lg font-black uppercase text-black mb-2 pl-2">01. Multilingual Hero &amp; Flip Counter</h3>
            <p className="text-sm text-neutral-800 leading-relaxed pl-2 font-medium">
              Features an SVG threshold filter <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1 py-0.5 font-bold">MorphingText</code> headline cycling &ldquo;SELAH&rdquo; across English, Hindi (सेलाह), Malayalam (സേലാ), and Hebrew (סֶלָה), paired with a custom digit-wheel flip countdown (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1 py-0.5 font-bold">Counter.jsx</code>) and chief guest keynote showcase.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-lg font-black uppercase text-black mb-2 pl-2">02. 3D Tilt Core Team Roster (/about-cya)</h3>
            <p className="text-sm text-neutral-800 leading-relaxed pl-2 font-medium">
              Editorial showcase for the Carmel Youth Association combining <em>Cormorant Garamond</em> serif typography with interactive 3D perspective tilt profile cards (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1 py-0.5 font-bold">ProfileCard.jsx</code>) and holographic grain overlays for the Director, Animators, and Core Committee.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-lg font-black uppercase text-black mb-2 pl-2">03. Interactive Camera Gallery (/gallery)</h3>
            <p className="text-sm text-neutral-800 leading-relaxed pl-2 font-medium">
              Custom rotary lens UI with 60 SVG degree ticks, draggable filmstrip navigation, automatic dominant-color canvas ambient glow extraction, and the 9-blade WebGL2 mechanical iris route transition.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-lg font-black uppercase text-black mb-2 pl-2">04. Live Admin Telemetry (/register-admin)</h3>
            <p className="text-sm text-neutral-800 leading-relaxed pl-2 font-medium">
              Real-time coordinator console displaying registered parishes, total fee revenue, participant headcounts, event-level filtering, expandable squad tables, and one-click CSV spreadsheet export.
            </p>
          </div>
        </div>
      </section>

      {/* Challenges & Technical Learnings */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Challenges &amp; Engineering Learnings
        </h2>

        <div className="space-y-6">
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden">
            <h4 className="text-lg font-black uppercase text-black mb-2">
              1. WebGL2 Framebuffer Performance &amp; Idle GPU Optimization
            </h4>
            <p className="text-neutral-800 leading-relaxed font-medium">
              Running full-viewport fragment shaders with multi-sample bloom across several pages risked thermal throttling on mobile GPUs. I solved this in <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">Silk.jsx</code> by rendering the bloom pass into a quarter-resolution mipmapped FBO, clamping the device pixel ratio to <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">Math.min(dpr, 2)</code>, and wiring both <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">IntersectionObserver</code> and <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">visibilitychange</code> listeners to automatically suspend the <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">requestAnimationFrame</code> loop whenever the canvas scrolls out of view.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden">
            <h4 className="text-lg font-black uppercase text-black mb-2">
              2. Enforcing Asymmetric Squad Quotas in a Single Form Flow
            </h4>
            <p className="text-neutral-800 leading-relaxed font-medium">
              Each festival event had distinct roster rules—Mixed Relay required exactly 2 Boys and 2 Girls, Tug of War required 4 Boys and 2 Girls plus up to 3 substitutes, Futsal allowed 5 Boys + 3 rolling substitutes, and Solo events permitted up to 3 individual entries per parish. By modeling these constraints declaratively in <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">REGISTRATION_EVENTS</code> and building a step-level validator in <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">/register</code>, invalid rosters are caught client-side with actionable inline alerts before hitting the API.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden">
            <h4 className="text-lg font-black uppercase text-black mb-2">
              3. Resilient Admin Authentication &amp; Multi-Strategy Firestore Deletion
            </h4>
            <p className="text-neutral-800 leading-relaxed font-medium">
              Mobile browsers with strict cookie policies (such as Safari ITP) occasionally dropped session cookies on serverless routes, and early Firestore test documents had auto-generated IDs that differed from their <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">registrationId</code> field. I upgraded <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">adminAuth.ts</code> to support dual-transport verification (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">Authorization: Bearer</code> header + <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">HttpOnly</code> cookie) and engineered <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">DELETE /api/admin/registrations</code> to execute both direct document ref deletion and a <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">where(&quot;registrationId&quot;, &quot;==&quot;, targetId)</code> query sweep.
            </p>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Outcomes &amp; Impact
        </h2>
        <div className="border-l-4 border-[#FFEE00] pl-4 py-2 bg-[#FAF7E8] border-y border-r border-black p-4">
          <p className="text-neutral-800 leading-relaxed text-base md:text-lg font-medium">
            SELAH 2026 transformed how inter-parish youth festivals are presented and managed—combining 60fps WebGL shader artistry with a production-grade registration and administration pipeline. Parish delegates can register entire multi-event squads and calculate tiered fees in under 3 minutes with zero roster rule violations, while event coordinators have instant, authenticated access to live telemetry and CSV exports backed by Cloud Firestore.
          </p>
        </div>
      </section>
    </>
  );
}
