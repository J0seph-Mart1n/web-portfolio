"use client";
import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from "motion/react";

// Components
import { V2Experience } from '@/components/V2/V2Experience';
import { V2Skills } from '@/components/V2/V2Skills';
import { V2Projects } from '@/components/V2/V2Projects';
import { V2Socials } from '@/components/V2/V2Socials';
import { V2LoadingScreen } from '@/components/V2/V2LoadingScreen';

const ThreeBackground = dynamic(() => import('@/components/scene/ThreeBackground'), {
  ssr: false,
});

const SECTIONS = [
  { id: "intro", label: "Dashboard", code: "01" },
  { id: "experience", label: "Experience", code: "02" },
  { id: "skills", label: "Skills", code: "03" },
  { id: "projects", label: "Projects", code: "04" },
  { id: "socials", label: "Connect", code: "05" },
];

export default function V2Page() {
  const [activeSection, setActiveSection] = useState("intro");
  
  // Loading Screen States
  const [appState, setAppState] = useState<'loading' | 'ready' | 'entered'>('loading');
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('hasVisitedV2') === 'true') {
      setAppState('entered');
    }
  }, []);

  // Smooth loading progress animation while assets and WebGL initialize
  useEffect(() => {
    if (appState !== 'loading') return;
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [appState]);

  const isScrollingProgrammatically = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track which section is currently in the viewport
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!isScrollingProgrammatically.current) {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const scrollHeight = document.documentElement.scrollHeight;

            // If user scrolled to the very bottom, activate socials
            if (viewportHeight + scrollY >= scrollHeight - 60) {
              setActiveSection("socials");
              ticking = false;
              return;
            }

            const focusY = viewportHeight * 0.4;

            for (let i = SECTIONS.length - 1; i >= 0; i--) {
              const section = SECTIONS[i];
              const el = document.getElementById(section.id);
              if (!el) continue;

              const rect = el.getBoundingClientRect();
              if (rect.top <= focusY && rect.bottom >= focusY) {
                setActiveSection(section.id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Immediately highlight the clicked section in the navigation
      setActiveSection(id);
      isScrollingProgrammatically.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const targetPosition = el.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start: number | null = null;

      const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          window.scrollTo(0, targetPosition);
          setActiveSection(id);
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingProgrammatically.current = false;
          }, 150);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  // Lock scrolling while in loading/ready states
  useEffect(() => {
    if (appState !== 'entered') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [appState]);

  return (
    <main 
      className="relative bg-[#FAF7E8] min-h-screen font-sans selection:bg-[#FFEE00] selection:text-black"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px'
      }}
    >
      
      {/* LOADING OVERLAY */}
      <V2LoadingScreen 
        appState={appState} 
        loadingProgress={loadingProgress} 
        setAppState={setAppState} 
      />

      {/* 1. THREE.JS WEBGL 3D BACKGROUND (Persona Architectural Drawing Mode) */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#FAF7E8]">
        <ThreeBackground
          onLoaded={() => {
            setLoadingProgress(100);
            setAppState((prev) => (prev === 'entered' ? 'entered' : 'ready'));
          }}
          className="opacity-90 md:opacity-95"
        />
        {/* Subtle grid integration overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7E8]/10 via-transparent to-[#FAF7E8]/30 pointer-events-none" />
      </div>

      {/* TOP LEFT PERSONA-STYLE BRAND BADGE */}
      <div className="fixed top-5 left-5 z-40 hidden sm:flex items-center gap-3 bg-[#FFFFF8] border-2 border-black shadow-[3px_3px_0px_#000] px-3.5 py-1.5 font-mono text-xs">
        <span className="w-2.5 h-2.5 bg-[#FFEE00] border border-black" />
        <span className="font-extrabold uppercase tracking-widest text-black">JOSEPH MARTIN</span>
      </div>

      {/* PERSONA FIXED SIDEBAR DOCK NAVIGATION (DESKTOP) */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col bg-[#FFFFF8] border-2 border-black shadow-[5px_5px_0px_#000] p-2 w-48">
        <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-black px-1 font-mono text-[10px] font-black text-neutral-600 tracking-wider uppercase">
          <span>// NAVIGATION</span>
          <span className="w-2 h-2 bg-[#FFEE00] border border-black" />
        </div>
        
        <div className="flex flex-col gap-1">
          {SECTIONS.map(({ id, label, code }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#FFEE00] text-black font-black border-2 border-black shadow-[2px_2px_0px_#000]"
                    : "text-neutral-800 hover:bg-[#FFEE00]/40 font-bold border border-transparent hover:border-black"
                }`}
                aria-label={`Scroll to ${label}`}
              >
                <span>{label}</span>
                <span className={`text-[10px] ${isActive ? "text-black font-bold" : "text-neutral-500"}`}>
                  [{code}]
                </span>
              </button>
            );
          })}
        </div>

        <div className="pt-2 mt-2 border-t border-black/20 px-1 flex items-center justify-between font-mono text-[9px] text-neutral-500 uppercase">
          <span>ACTIVE NODE</span>
          <span className="font-bold text-black uppercase">{activeSection}</span>
        </div>
      </nav>

      {/* 2. SCROLLING CONTENT OVERLAY */}
      <div className="relative z-10 flex flex-col w-full">
        
        {/* HERO / INTRO SECTION (Modeled directly on 1_Dashboard.png) */}
        <section id="intro" className="relative min-h-screen flex items-center justify-center px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            {/* Main Brutalist Banner Card */}
            <div className="w-full bg-[#FFFFF8] border-2 border-black shadow-[8px_8px_0px_#000] relative overflow-hidden p-6 md:p-12">
              {/* Top Yellow Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#FFEE00] border-b-2 border-black" />
              
              <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
                <span className="w-2.5 h-2.5 bg-[#FFEE00] border border-black inline-block" />
                SYSTEM ACTIVE
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-black mb-4 leading-none">
                TURN YOUR DIGITAL VISION INTO REALITY.
              </h1>

              <div className="w-full h-px bg-black my-6" />

              <div className="border-l-4 border-[#FFEE00] pl-4">
                <p className="font-sans text-sm md:text-base text-neutral-800 leading-relaxed max-w-2xl font-medium">
                  Hi, I'm <strong className="font-bold text-black">Joseph Martin</strong>. I architect high-performance web applications, distributed systems, and private knowledge-graph AI systems powered by local LLMs and modern vector stacks.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <button 
            onClick={() => scrollToSection('experience')}
            className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-mono text-xs font-bold text-neutral-700 hover:text-black uppercase tracking-widest cursor-pointer group z-10"
          >
            <span>SCROLL TO EXPLORE</span>
            <span className="text-base group-hover:translate-y-1 transition-transform">&darr;</span>
          </button>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="min-h-[100vh] flex flex-col items-center justify-center py-20 px-4 md:px-8 relative">
          <V2Experience />
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="min-h-[100vh] flex flex-col items-center justify-center py-20 px-4 md:px-8 relative">
          <V2Skills />
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="min-h-[100vh] flex flex-col items-center justify-center py-10 md:py-12 px-4 md:px-8 relative mb-24 md:mb-36">
          <V2Projects />
        </section>

        {/* SOCIALS SECTION */}
        <section id="socials" className="w-full mt-auto">
          <V2Socials />
        </section>

      </div>
    </main>
  );
}
