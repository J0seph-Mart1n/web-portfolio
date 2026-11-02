"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { clamp01, type Stage } from "./util";
import { createSolarStage } from "./solarStage";

export interface ThreeBackgroundProps {
  onLoaded?: () => void;
  className?: string;
}

export default function ThreeBackground({ onLoaded, className = "" }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const targetProgressRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true,
        alpha: false,
        stencil: false,
        depth: true,
      });
    } catch (e) {
      console.error("WebGL initialization failed:", e);
      if (onLoaded) onLoaded();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xfaf7e8, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / (container.clientHeight || 1),
      0.1,
      8000
    );

    const lowPower = /Mobi|Android|iPhone/i.test(navigator.userAgent);

    // Create the unified Solar System stage
    let solarStage: Stage | null = null;
    try {
      solarStage = createSolarStage({ pixelRatio: dpr, lowPower });
    } catch (err) {
      console.error("Failed creating Solar System 3D stage:", err);
    }

    // Signal ready to parent loading screen
    if (onLoaded) {
      setTimeout(() => {
        onLoaded();
      }, 50);
    }

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Scroll listener mapping total scroll (top of page to bottom of Socials)
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetProgressRef.current = Math.max(0, Math.min(1, scrollTop / (scrollHeight || 1)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let animId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Fluid scroll smoothing for cinematic glide
      const diff = targetProgressRef.current - scrollProgressRef.current;
      scrollProgressRef.current += diff * Math.min(1, delta * 7);

      const p = clamp01(scrollProgressRef.current);

      renderer.autoClear = true;

      if (solarStage) {
        solarStage.update(p, elapsed, camera);
        renderer.render(solarStage.scene, camera);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (solarStage) {
        solarStage.dispose();
      }
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      style={{ touchAction: "none" }}
    />
  );
}
