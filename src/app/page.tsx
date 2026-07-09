'use client'
import React, { useRef, useEffect } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { useSpring, animated } from '@react-spring/web'
import { TypingAnimation } from "@/components/ui/typing-animation"
import { TextAnimate } from "@/components/ui/text-animate"
import { BlurFade } from '@/components/ui/blur-fade'
import { ExperienceTimeline } from "@/components/ExperienceTimeline"
import { SkillsList } from "@/components/SkillsList"
import { StarField } from "@/components/StarField"
import { MountainSilhouette } from "@/components/MountainSilhouette"
import { UndergroundCrystals } from "@/components/UndergroundCrystals"
import { ProjectsSection } from "@/components/ProjectsSection"
import { spring } from 'motion'

const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`


export default function Home() {
  const parallax = useRef<IParallax>(null!)
  const [springs, api] = useSpring(() => ({ 
    sharedX: -500, 
    planeOffset: 0, 
    bannerScale: 1, 
    ropeOpacity: 1 ,
    widthBannerScale: 35,
    heightBannerScale: 15,
    exp1Opacity: 0,
    exp2Opacity: 0,
    exp3Opacity: 0,
    timelineProgress: 0
  }))

  useEffect(() => {
    if (!parallax.current || !parallax.current.container.current) return
    const container = parallax.current.container.current

    const handleScroll = () => {
      const scroll = container.scrollTop
      const H = container.clientHeight
      const W = container.clientWidth
      
      // Calculate progress from 0 to 1
      const progress = Math.max(0, Math.min(1, (scroll - H) / (0.5 * H)))
      
      // Normal flight path if they never detached
      // Changed to start much further left (-0.8 * W) so the long banner starts fully hidden
      // Distance is increased to (2.6 * W) so it still hits the center perfectly at progress = 0.5
      // (Added your -270 offset here so it doesn't suddenly jump when detaching!)
      const normalX = (progress * (W * 2.6)) - (W * 0.8) - 270
      
      let sharedX = normalX
      let planeOffset = 0
      let bannerScale = 1
      let ropeOpacity = 1
      let widthBannerScale = 15
      let heightBannerScale = 15
      let exp1Opacity = 0
      let exp2Opacity = 0
      let exp3Opacity = 0
      let timelineProgress = 0
      
      if (progress > 0.5) {
        // 1. Banner reaches center and stops moving horizontally
        sharedX = (0.5 * (W * 2.6)) - (W * 0.8) - 270
        
        // Calculate secondary progress (0 to 1) for the second half of the scroll
        const detachProgress = (progress - 0.5) * 2
        
        // 2. Banner scales up (zooms in) to 1.5x
        bannerScale = 1 + (detachProgress * 1.5)

        // Smoothly expand the width (35vw to 75vw) and height (15vh to 85vh)
        const addedWidthVw = detachProgress * 40
        widthBannerScale = 35 + addedWidthVw
        heightBannerScale = 15 + (detachProgress * 70)
        
        // Because the banner grows to the right inside the flex container, we must shift 
        // the entire container left by half the width increase so it visually expands from its center!
        const addedWidthPx = addedWidthVw * (W / 100)
        sharedX -= (addedWidthPx / 2) +45
        
        // 3. Rope fades out quickly to simulate detaching
        ropeOpacity = Math.max(0, 1 - (detachProgress * 5))
        
        // 4. Plane continues flying off the screen independently
        planeOffset = (normalX - sharedX) * 1.5
      }
      
      // 5. Fade in experience items sequentially as we continue scrolling past 1.5H
      if (scroll > 1.5 * H) {
        exp1Opacity = Math.max(0, Math.min(1, (scroll - 1.5 * H) / (0.15 * H)))
        exp2Opacity = Math.max(0, Math.min(1, (scroll - 1.65 * H) / (0.15 * H)))
        exp3Opacity = Math.max(0, Math.min(1, (scroll - 1.8 * H) / (0.15 * H)))
        
        // Timeline progress goes from 0 to 100 as the 3 items fade in
        timelineProgress = Math.max(0, Math.min(100, ((scroll - 1.5 * H) / (0.45 * H)) * 100))
      }
      
      api.start({ sharedX, planeOffset, bannerScale, ropeOpacity, widthBannerScale, heightBannerScale, exp1Opacity, exp2Opacity, exp3Opacity, timelineProgress })
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [api])

  return (
    <div style={{ width: '100%', height: '100%', background: '#050510' }}>
        <Parallax ref={parallax} pages={5}>

            {/* ═══════════════════════════════════════════════════
                LAYER 0: SPACE — Deep space background
               ═══════════════════════════════════════════════════ */}

            {/* Deep space gradient base */}
            <ParallaxLayer
              offset={0}
              speed={0}
              factor={1.5}
              style={{
                background: 'linear-gradient(180deg, #050510 0%, #0a0a2e 30%, #0d1137 60%, #141852 100%)',
              }}
            />

            {/* Original stars SVG (kept) */}
            <ParallaxLayer
              offset={0}
              speed={0}
              factor={3}
              style={{
                backgroundImage: url('stars', true),
                backgroundSize: 'cover',
              }}
            />

            {/* Twinkling star particles overlay */}
            <ParallaxLayer offset={0} speed={0.05} factor={1.2} style={{ pointerEvents: 'none' }}>
              <StarField />
            </ParallaxLayer>

            {/* Nebula glow behind hero */}
            <ParallaxLayer offset={0} speed={0.1} style={{ pointerEvents: 'none' }}>
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '30%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(ellipse, rgba(135,188,222,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '15%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(ellipse, rgba(128,94,115,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
              }} />
            </ParallaxLayer>

            {/* Satellite (kept exactly) */}
            <ParallaxLayer offset={0.5} speed={-0.2} style={{ pointerEvents: 'none' }}>
              <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
            </ParallaxLayer>

            {/* Astronaut GIF (kept exactly) */}
            <ParallaxLayer offset={0.25} speed={-0.1}>
              <img src={"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWg5YnNqM2NkODlwemdpMTNic2piN2tza2NsNTJraGl2c2w4MnlpbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/w2Ic2kFYV5oP7ukfuR/giphy.gif"}
                      style={{ width: "320px", height: "350px", marginLeft: '50%' }}
              >
              </img>
            </ParallaxLayer>

            {/* Hero text (kept exactly) */}
            <ParallaxLayer
              offset={0}
              speed={0.1}
              style={{
                display: 'flex',
                alignItems: 'left',
                justifyContent: 'left',
                flexDirection: 'column',
              }}
            >
              <h1 style={{ fontSize: '5rem', color: '#fff', marginLeft: 30, paddingTop: '250px', fontWeight: 700, letterSpacing: '-0.05em', display: 'flex'}}>
                <TextAnimate animation="blurInUp" by="character">
                  Hi,
                </TextAnimate>
                <BlurFade delay={0.1} inView>
                    <img src="/images/512.gif" width="100px" height="100px" style={{ marginLeft: '10px',marginTop: '25px'}}/>
                </BlurFade>
                
              </h1>
              <h1 style={{ fontSize: '5rem', color: '#fff', marginLeft: 30, marginTop: -20, fontWeight: 700, letterSpacing: '-0.05em' }}>
                <TextAnimate animation='blurInUp' by="character" delay={0.2}>
                  I'm Joseph Martin
                </TextAnimate>
              </h1>
              <BlurFade delay={0.3} inView>
                <h2 style={{ fontSize: '2.5rem', color: '#87BCDE', marginLeft: 30, fontWeight: 300, display: "flex" }}>
                    <img src="/images/terminal.png" style={{ width: "60px", height: "50px", paddingRight: "10px" }}/>
                    <TypingAnimation
                        words={["Software Engineer", "Full Stack Developer", "Automation Tester"]}
                        cursorStyle="block"
                        loop
                        className="text-4xl font-bold"
                    />
                </h2>
              </BlurFade>
            </ParallaxLayer>


            {/* ═══════════════════════════════════════════════════
                LAYER 1: SKY — Atmosphere transition
               ═══════════════════════════════════════════════════ */}

            {/* Sky gradient background */}
            <ParallaxLayer
              offset={1}
              speed={0}
              factor={2}
              style={{
                background: 'linear-gradient(180deg, #141852 0%, #1B2838 8%, #2a4a6b 20%, #5b8fb9 40%, #87CEEB 60%, #a8d8ea 80%, #c9e8f0 100%)',
              }}
            />

            {/* Cloud layers — varying speeds for depth */}
            <ParallaxLayer offset={1.1} speed={0.4} style={{ opacity: 0.6, pointerEvents: 'none' }}>
              <img src={url('cloud')} className="cloud-float" style={{ display: 'block', width: '25%', marginLeft: '5%' }} />
              <img src={url('cloud')} className="cloud-float-slow" style={{ display: 'block', width: '18%', marginLeft: '65%', marginTop: '-5%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.2} speed={0.8} style={{ opacity: 0.15, pointerEvents: 'none' }}>
              <img src={url('cloud')} className="cloud-float-slow" style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
              <img src={url('cloud')} className="cloud-float" style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.6} speed={0.8} style={{ opacity: 0.15, pointerEvents: 'none' }}>
              <img src={url('cloud')} className="cloud-float-slow" style={{ display: 'block', width: '20%', marginLeft: '35%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.4} speed={0.3} style={{ opacity: 0.3, pointerEvents: 'none' }}>
              <img src={url('cloud')} className="cloud-float" style={{ display: 'block', width: '30%', marginLeft: '40%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.8} speed={0.5} style={{ opacity: 0.25, pointerEvents: 'none' }}>
              <img src={url('cloud')} className="cloud-float-slow" style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
              <img src={url('cloud')} className="cloud-float" style={{ display: 'block', width: '22%', marginLeft: '10%', marginTop: '5%' }} />
            </ParallaxLayer>


            {/* ═══════════════════════════════════════════════════
                LAYER 2: LAND — Earth surface with mountains
               ═══════════════════════════════════════════════════ */}

            {/* Land gradient background — top half sky, bottom half earth */}
            <ParallaxLayer
              offset={3}
              speed={0}
              factor={1.5}
              style={{
                background: 'linear-gradient(180deg, #87CEEB 0%, #a8d8ea 20%, #c9e8f0 35%, #e8f4f0 50%, #b8d4a8 60%, #7ab648 70%, #4a8c4b 80%, #3d6b3e 90%, #2d4a2e 100%)',
              }}
            />

            {/* Full natural landscape scene (mountains, trees, river, rocks, birds) */}
            <ParallaxLayer offset={3} speed={0.15} factor={1.5} style={{ pointerEvents: 'none' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <MountainSilhouette />
              </div>
            </ParallaxLayer>

            {/* Projects section on land */}
            <ParallaxLayer
              offset={3}
              speed={0.2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ProjectsSection />
            </ParallaxLayer>


            {/* ═══════════════════════════════════════════════════
                LAYER 3: UNDERGROUND — Deep earth
               ═══════════════════════════════════════════════════ */}

            {/* Underground gradient background */}
            <ParallaxLayer
              offset={4}
              speed={0}
              factor={1}
              style={{
                background: 'linear-gradient(180deg, #1e3320 0%, #3b2a1a 15%, #4a3728 30%, #3d2b1c 50%, #2d1810 70%, #1a0f08 90%, #0d0704 100%)',
              }}
            />

            {/* Rock texture overlay */}
            <ParallaxLayer offset={4} speed={0.1} style={{ pointerEvents: 'none', opacity: 0.08 }}>
              <div style={{
                width: '100%',
                height: '100%',
                backgroundImage: `
                  radial-gradient(ellipse 80px 60px at 20% 30%, #8B7355 0%, transparent 70%),
                  radial-gradient(ellipse 60px 80px at 60% 50%, #6B5B45 0%, transparent 70%),
                  radial-gradient(ellipse 100px 40px at 40% 70%, #7B6B55 0%, transparent 70%),
                  radial-gradient(ellipse 50px 70px at 80% 20%, #8B7B65 0%, transparent 70%),
                  radial-gradient(ellipse 70px 50px at 10% 80%, #7B6B55 0%, transparent 70%)
                `,
              }} />
            </ParallaxLayer>

            {/* Glowing crystals and magma veins */}
            <ParallaxLayer offset={4} speed={0.15} style={{ pointerEvents: 'none' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <UndergroundCrystals />
              </div>
            </ParallaxLayer>

            {/* Soil cross-section lines */}
            <ParallaxLayer offset={4} speed={0.05} style={{ pointerEvents: 'none', opacity: 0.12 }}>
              <svg style={{ width: '100%', height: '100%' }}>
                {/* Horizontal sediment layers */}
                <line x1="0" y1="15%" x2="100%" y2="17%" stroke="#8B7355" strokeWidth="1" />
                <line x1="0" y1="35%" x2="100%" y2="33%" stroke="#6B5B45" strokeWidth="1.5" />
                <line x1="0" y1="55%" x2="100%" y2="57%" stroke="#7B6B55" strokeWidth="1" />
                <line x1="0" y1="75%" x2="100%" y2="73%" stroke="#5B4B35" strokeWidth="2" />
              </svg>
            </ParallaxLayer>


            {/* ═══════════════════════════════════════════════════
                CONTENT LAYERS (preserved exactly as before)
               ═══════════════════════════════════════════════════ */}

            {/* Plane + Banner + Rope (sticky in sky) — KEPT EXACTLY */}
            <ParallaxLayer sticky={{start: 1.2, end:2}}  speed={0.2} style={{ opacity: 1, pointerEvents: 'none', display: 'flex' }}>
              <animated.div style={{ 
                display: 'flex', 
                alignItems: 'center',  
                width: 'max-content', 
                x: springs.sharedX,
                rotate: '-5deg'
              }}>
                {/* The Trailing Banner */}
                <animated.div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  padding: '1.5rem 2rem',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                  color: '#253237',
                  border: '3px solid #87BCDE',
                  position: 'relative',
                  zIndex: 2,
                  rotate: '4.5deg',
                  marginBottom: '50px',
                  width: springs.widthBannerScale.to(w => `${w}vw`),
                  height: springs.heightBannerScale.to(h => `${h}vh`),
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}>
                  
                  {/* Experience Row */}
                  <animated.div style={{ 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0.5rem',
                    fontSize: springs.bannerScale.to(s => `${s * 0.9}vw`) 
                  }}>
                    <ExperienceTimeline springs={springs} />
                  </animated.div>

                  {/* Horizontal Divider */}
                  <animated.div style={{ 
                    width: '80%', 
                    background: '#87BCDE', 
                    margin: springs.bannerScale.to(s => `${(s - 1) * 0.1}rem 0`), // Reduced multiplier here to shrink spacing!
                    maxHeight: springs.bannerScale.to(s => `${(s - 1) * 2}px`),
                    height: '2px',
                    opacity: springs.bannerScale.to(s => Math.max(0, (s - 2.2) * 3.33)) // Fades in only at the very end of the zoom
                  }} />

                  {/* Skills Row */}
                  <animated.div style={{ 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0.5rem',
                    fontSize: springs.bannerScale.to(s => `${s * 0.9}vw`) 
                  }}>
                    <SkillsList springs={springs} />
                  </animated.div>

                </animated.div>

                {/* The Ropes */}
                <animated.svg viewBox="0 0 100 100" style={{ 
                  width: '8vw', 
                  height: '8vw', 
                  marginLeft: '-0.5vw', 
                  marginRight: '-4vw', 
                  zIndex: 1, 
                  overflow: 'visible',
                  opacity: springs.ropeOpacity 
                }}>
                  {/* Top rope */}
                  <path d="M 0 20 Q 50 40 100 50" stroke="#4a5568" strokeWidth="4" fill="none" strokeDasharray="6 4" />
                  {/* Bottom rope */}
                  <path d="M 0 80 Q 50 60 100 50" stroke="#4a5568" strokeWidth="4" fill="none" strokeDasharray="6 4" />
                </animated.svg>
                
                {/* The Plane */}
                <animated.img 
                  src="/images/plane.png" 
                  style={{ 
                    display: 'block', 
                    width: '20vw', 
                    zIndex: 10, 
                    position: 'relative',
                    x: springs.planeOffset 
                  }} 
                />
              </animated.div>
            </ParallaxLayer>

            {/* Sun (sticky in sky) — KEPT EXACTLY */}
            <ParallaxLayer sticky={{start:1.2, end:3}} style={{ opacity: 1, alignItems: 'center', display:'flex', paddingBottom: '300px'}}>
              <img src="/images/sun.png" style={ { display: 'block', width: '10%', marginLeft: '80%' }} />
            </ParallaxLayer>
 
        </Parallax>
    </div>

  );
}