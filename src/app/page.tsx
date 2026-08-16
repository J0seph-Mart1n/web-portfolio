"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from "motion/react";

// Components
import { TypingAnimation } from "@/components/ui/typing-animation";
import { TextAnimate } from "@/components/ui/text-animate";
import { V2Experience } from '@/components/V2/V2Experience';
import { V2Skills } from '@/components/V2/V2Skills';
import { V2Projects } from '@/components/V2/V2Projects';
import { V2Socials } from '@/components/V2/V2Socials';
import { V2LoadingScreen } from '@/components/V2/V2LoadingScreen';
import { ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 495;

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "socials", label: "Socials" },
];

export default function V2Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<Record<number, HTMLImageElement>>({});
  const [activeSection, setActiveSection] = useState("intro");
  
  // Loading Screen States
  const [appState, setAppState] = useState<'loading' | 'ready' | 'entered'>('loading');
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('hasVisitedV2') === 'true') {
      setAppState('entered');
    }
  }, []);

  // Track which section is currently in the viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const preloadImages = () => {
    let loadedCount = 0;
    const totalToPreload = 30; // Preload first 30 frames for the intro
    
    for (let i = 1; i <= totalToPreload; i++) {
      const img = getImage(i);
      
      const checkProgress = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / totalToPreload) * 100));
        if (loadedCount === totalToPreload) {
          setAppState((prev) => (prev === 'entered' ? 'entered' : 'ready'));
        }
      };

      // Depending on cache, it might already be complete
      if (img.complete && img.src) {
        checkProgress();
      } else {
        img.onload = checkProgress;
        img.onerror = checkProgress; // Don't block indefinitely on error
      }
    }
  };

  const getImage = (frameNumber: number) => {
    if (imageCache.current[frameNumber]) {
      return imageCache.current[frameNumber];
    }
    const img = new Image();
    const paddedNumber = frameNumber.toString().padStart(4, '0');
    img.src = `/Videos/frames/frame_${paddedNumber}.jpg`;
    imageCache.current[frameNumber] = img;
    return img;
  };

  const drawFrame = (frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = getImage(frameNumber);
    
    if (img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
      img.addEventListener('load', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }, { once: true });
    }
  };

  useEffect(() => {
    preloadImages();
    drawFrame(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [frameProgress, setFrameProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / (scrollHeight || 1)));
      setFrameProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const frameIndex = Math.max(1, Math.floor(frameProgress * TOTAL_FRAMES));
    
    requestAnimationFrame(() => {
      drawFrame(frameIndex);
    });
    
    for (let i = 1; i <= 5; i++) {
      if (frameIndex + i <= TOTAL_FRAMES) {
        getImage(frameIndex + i);
      }
    }
  }, [frameProgress]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const targetPosition = el.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 2500; // 2.5 seconds for a cinematic, slow scroll
      let start: number | null = null;

      // cubic easing in/out
      const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
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
    <main className="relative bg-black min-h-screen font-sans selection:bg-[#87BCDE]/30">
      
      {/* LOADING OVERLAY */}
      <V2LoadingScreen 
        appState={appState} 
        loadingProgress={loadingProgress} 
        setAppState={setAppState} 
      />

      {/* 1. FIXED BACKGROUND CANVAS */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-40 md:opacity-60"
        />
        {/* Subtle gradient overlay to ensure text remains readable over the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
      </div>

      {/* FIXED SIDE TIMELINE NAVIGATION (hidden on mobile) */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-6">
        {/* Vertical line behind the dots */}
        <div className="absolute right-[5px] top-0 bottom-0 w-px bg-white/15" />
        
        {SECTIONS.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="relative flex items-center gap-3 group cursor-pointer"
              aria-label={`Scroll to ${label}`}
            >
              {/* Label — visible on hover or when active */}
              <span
                className={`text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "opacity-100 text-[#87BCDE] translate-x-0"
                    : "opacity-0 group-hover:opacity-100 text-white/60 translate-x-2 group-hover:translate-x-0"
                }`}
              >
                {label}
              </span>

              {/* Dot */}
              <div className="relative z-10 flex items-center justify-center">
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-3 h-3 bg-[#87BCDE] shadow-[0_0_10px_rgba(135,188,222,0.7)]"
                      : "w-2 h-2 bg-white/40 group-hover:bg-white/80"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* 2. SCROLLING CONTENT OVERLAY */}
      <div className="relative z-10 flex flex-col w-full">
        
        {/* INTRO SECTION */}
        <section id="intro" className="min-h-[100vh] flex flex-col items-center justify-center text-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <TypingAnimation className="font-heading text-5xl md:text-7xl lg:text-[8vw] font-bold text-white tracking-tighter drop-shadow-2xl" duration={100}>
              Joseph Martin
            </TypingAnimation>
            <div className="text-sm md:text-xl lg:text-2xl text-zinc-300 font-light mt-6 max-w-3xl drop-shadow-md">
              <TextAnimate animation="blurInUp" by="word">
                Software Engineer specializing in modern web applications, distributed systems, and AI integrations.
              </TextAnimate>
            </div>
            
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              onClick={() => scrollToSection('experience')}
              className="mt-16 animate-bounce text-white/50 hover:text-[#87BCDE] transition-colors cursor-pointer"
            >
              <p className="text-xs tracking-widest uppercase mb-2">Scroll to explore</p>
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.button>
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="min-h-[100vh] flex flex-col items-center justify-center py-24 px-4 md:px-8 relative">
          <V2Experience />
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="min-h-[100vh] flex flex-col items-center justify-center py-24 px-4 md:px-8 relative">
          <V2Skills />
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="min-h-[100vh] flex flex-col items-center justify-center py-24 px-4 md:px-8 relative">
          <V2Projects />
        </section>

        {/* SPACER FOR VIDEO IMAGE */}
        <div className="h-[100vh] w-full flex items-center justify-center pointer-events-none">
           {/* This empty space allows the video to continue playing and showing the user's image before socials */}
        </div>

        {/* SOCIALS SECTION */}
        <section id="socials" className="w-full mt-auto">
          <V2Socials />
        </section>

      </div>
    </main>
  );
}
