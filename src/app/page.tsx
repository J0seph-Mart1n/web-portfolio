'use client'
import React, { useRef, useEffect } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { useSpring, animated } from '@react-spring/web'
import './styles.css'
import { TypingAnimation } from "@/components/ui/typing-animation"

const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

export default function Home() {
  const parallax = useRef<IParallax>(null!)
  const [spring, api] = useSpring(() => ({ x: 0 })) // start off-screen initially

  useEffect(() => {
    if (!parallax.current || !parallax.current.container.current) return
    const container = parallax.current.container.current

    const handleScroll = () => {
      const scroll = container.scrollTop
      const H = container.clientHeight
      const W = container.clientWidth
      
      // Calculate progress (divide by a smaller number like 0.5 * H to make it fly faster)
      const progress = (scroll - H) / (0.5 * H)
      
      // Map progress to horizontal position in pixels: from -20% of width to 120% of width
      const x = (progress * (W * 1.4)) - (W * 0.2)
      
      api.start({ x })
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
              <h1 style={{ fontSize: '5rem', color: '#fff', marginLeft: 30, paddingTop: '250px', fontWeight: 700, letterSpacing: '-0.05em' }}>
                Hi, 
              </h1>
              <h1 style={{ fontSize: '5rem', color: '#fff', marginLeft: 30, marginTop: 0, fontWeight: 700, letterSpacing: '-0.05em' }}>I'm Joseph Martin</h1>
              <h2 style={{ fontSize: '2.5rem', color: '#87BCDE', marginLeft: 30, fontWeight: 300 }}>
                <TypingAnimation
                    words={["Software Engineer", "Full Stack Developer", "Automation Tester"]}
                    cursorStyle="block"
                    loop
                    className="text-4xl font-bold"
                />
              </h2>
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

            <ParallaxLayer offset={1.99} speed={2} style={{ opacity: 1, pointerEvents: 'none' }}>
              <animated.img src="/images/plane.png" style={{ display: 'block', width: '20vw', rotate: '-20deg', marginTop: '10vh', x: spring.x }} />
            </ParallaxLayer>

            <ParallaxLayer offset={1.3} speed={1} style={{ opacity: 1 }}>
              <img src="/images/sun.png" style={ { display: 'block', width: '10%', marginLeft: '80%' }} />
            </ParallaxLayer>

        </Parallax>
    </div>

  );
}