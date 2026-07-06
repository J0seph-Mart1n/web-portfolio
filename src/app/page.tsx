'use client'
import React, { useRef, useEffect } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { useSpring, animated } from '@react-spring/web'
import { TypingAnimation } from "@/components/ui/typing-animation"
import { TextAnimate } from "@/components/ui/text-animate"
import { BlurFade } from '@/components/ui/blur-fade'
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
    <div style={{ width: '100%', height: '100%', background: '#253237' }}>
        <Parallax ref={parallax} pages={4}>
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

            <ParallaxLayer offset={3} speed={1} factor={1} style={
              { backgroundColor: '#805E73' }
            } />
            <ParallaxLayer offset={1} speed={1} factor={2} style={
              { backgroundColor: '#87BCDE' }
            } />

            <ParallaxLayer
              offset={0}
              speed={0}
              factor={3}
              style={{
                backgroundImage: url('stars', true),
                backgroundSize: 'cover',
              }}
            />

            <ParallaxLayer offset={0.5} speed={-0.2} style={{ pointerEvents: 'none' }}>
              <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={0.25} speed={-0.1}>
              <img src={"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWg5YnNqM2NkODlwemdpMTNic2piN2tza2NsNTJraGl2c2w4MnlpbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/w2Ic2kFYV5oP7ukfuR/giphy.gif"}
                        style={{ width: "320px", height: "350px", marginLeft: '50%' }}
              >
              </img>
            </ParallaxLayer>

            <ParallaxLayer offset={1.2} speed={0.8} style={{ opacity: 0.1 }}>
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
              <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.6} speed={0.8} style={{ opacity: 0.1 }}>
              <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '35%' }} />
            </ParallaxLayer>

            <ParallaxLayer sticky={{start: 1.2, end:3}}  speed={0.2} style={{ opacity: 1, pointerEvents: 'none', display: 'flex' }}>
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
                    <h3 style={{ borderBottom: '3px solid #87BCDE', paddingBottom: '0.2rem', marginBottom: '0.8rem', fontWeight: 800 }}>
                      Experience
                    </h3>
                    <animated.div style={{ 
                      width: '85%',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.1rem',
                      padding: '0.5rem 0',
                      opacity: springs.bannerScale.to(s => Math.max(0, (s - 2.2) * 3.33)),
                      maxHeight: springs.bannerScale.to(s => `${(s - 1) * 450}px`),
                      overflow: 'hidden'
                    }}>
                      {/* Aceternity Style Timeline Line */}
                      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '80%', background: 'rgba(255,255,255,0.1)', zIndex: 0, borderRadius: '2px', overflow: 'hidden' }}>
                         {/* The glowing gradient fill */}
                         <animated.div style={{
                            width: '100%',
                            background: 'linear-gradient(to bottom, transparent, #87BCDE, #3E7C9D)',
                            height: springs.timelineProgress.to(p => `${p}%`),
                            boxShadow: '0 0 15px #87BCDE',
                            borderRadius: '2px'
                         }} />
                      </div>

                      {/* Box 1 (Left) */}
                      <animated.div style={{ 
                         opacity: springs.exp1Opacity, 
                         transform: springs.exp1Opacity.to(o => `translateY(${(1 - o) * 20}px)`),
                         width: '45%', 
                         alignSelf: 'flex-start',
                         background: '#253237', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '12px', zIndex: 1, boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                         position: 'relative'
                      }}>
                         {/* The glowing dot on the timeline for Box 1 */}
                         <animated.div style={{
                            position: 'absolute', right: '-11.11%', top: '50%', transform: 'translateY(-50%) translateX(50%)',
                            width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #87BCDE',
                            background: springs.exp1Opacity.to(o => o > 0.5 ? '#87BCDE' : '#253237'),
                            boxShadow: springs.exp1Opacity.to(o => o > 0.5 ? '0 0 10px #87BCDE' : 'none'),
                            transition: 'all 0.3s ease'
                         }} />
                         <div style={{ fontWeight: 800, color: '#87BCDE', fontSize: '0.85em' }}>Company A</div>
                         <div style={{ fontWeight: 600, fontSize: '0.75em' }}>Software Engineer</div>
                         <div style={{ fontSize: '0.65em', opacity: 0.8, marginTop: '2px' }}>Jan 2022 - Present</div>
                      </animated.div>

                      {/* Box 2 (Right) */}
                      <animated.div style={{ 
                         opacity: springs.exp2Opacity, 
                         transform: springs.exp2Opacity.to(o => `translateY(${(1 - o) * 20}px)`),
                         width: '45%', 
                         alignSelf: 'flex-end',
                         background: '#253237', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '12px', zIndex: 1, boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                         position: 'relative'
                      }}>
                         {/* The glowing dot on the timeline for Box 2 */}
                         <animated.div style={{
                            position: 'absolute', left: '-11.11%', top: '50%', transform: 'translateY(-50%) translateX(-50%)',
                            width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #87BCDE',
                            background: springs.exp2Opacity.to(o => o > 0.5 ? '#87BCDE' : '#253237'),
                            boxShadow: springs.exp2Opacity.to(o => o > 0.5 ? '0 0 10px #87BCDE' : 'none'),
                            transition: 'all 0.3s ease'
                         }} />
                         <div style={{ fontWeight: 800, color: '#87BCDE', fontSize: '0.85em' }}>Company B</div>
                         <div style={{ fontWeight: 600, fontSize: '0.75em' }}>Automation Tester</div>
                         <div style={{ fontSize: '0.65em', opacity: 0.8, marginTop: '2px' }}>Jun 2019 - Dec 2021</div>
                      </animated.div>

                      {/* Box 3 (Left) */}
                      <animated.div style={{ 
                         opacity: springs.exp3Opacity, 
                         transform: springs.exp3Opacity.to(o => `translateY(${(1 - o) * 20}px)`),
                         width: '45%', 
                         alignSelf: 'flex-start',
                         background: '#253237', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '12px', zIndex: 1, boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                         position: 'relative'
                      }}>
                         {/* The glowing dot on the timeline for Box 3 */}
                         <animated.div style={{
                            position: 'absolute', right: '-11.11%', top: '50%', transform: 'translateY(-50%) translateX(50%)',
                            width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #87BCDE',
                            background: springs.exp3Opacity.to(o => o > 0.5 ? '#87BCDE' : '#253237'),
                            boxShadow: springs.exp3Opacity.to(o => o > 0.5 ? '0 0 10px #87BCDE' : 'none'),
                            transition: 'all 0.3s ease'
                         }} />
                         <div style={{ fontWeight: 800, color: '#87BCDE', fontSize: '0.85em' }}>Company C</div>
                         <div style={{ fontWeight: 600, fontSize: '0.75em' }}>Junior Developer</div>
                         <div style={{ fontSize: '0.65em', opacity: 0.8, marginTop: '2px' }}>Jan 2018 - May 2019</div>
                      </animated.div>

                    </animated.div>
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
                    <h3 style={{ borderBottom: '3px solid #87BCDE', paddingBottom: '0.2rem', marginBottom: '0.8rem', fontWeight: 800 }}>
                      Skills
                    </h3>
                    <animated.div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '1rem',
                      opacity: springs.bannerScale.to(s => Math.max(0, (s - 2.2) * 3.33)),
                      maxHeight: springs.bannerScale.to(s => `${(s - 1) * 500}px`),
                      overflow: 'hidden'
                    }}>
                      {['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind'].map(skill => (
                        <span key={skill} style={{ 
                          background: '#253237', 
                          color: 'white', 
                          padding: '0.4rem 1rem', 
                          borderRadius: '20px', 
                          fontSize: '0.85em',
                          fontWeight: 600
                        }}>
                          {skill}
                        </span>
                      ))}
                    </animated.div>
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

            <ParallaxLayer sticky={{start:1.2, end:3}} style={{ opacity: 1, alignItems: 'center', display:'flex', paddingBottom: '300px'}}>
              <img src="/images/sun.png" style={ { display: 'block', width: '10%', marginLeft: '80%' }} />
            </ParallaxLayer>
 
        </Parallax>
    </div>

  );
}