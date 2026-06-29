'use client'
import React, { useRef } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'

const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

export default function Home() {
  const parallax = useRef<IParallax>(null!)
  return (
    <div style={{ width: '100%', height: '100%', background: '#253237' }}>
        <Parallax ref={parallax} pages={3}>
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
                Full Stack Developer
              </h2>
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={1} factor={1} style={
              { backgroundImage: 'linear-gradient(to bottom, transparent 0%, #805E73 10%, #805E73 20%, #805E73 30%, #805E73 40%, #805E73 50%, #805E73 60%, #805E73 70%, #805E73 80%, #805E73 90%, transparent 100%)' }
            } />
            <ParallaxLayer offset={2} speed={1} factor={1} style={
              { backgroundImage: 'linear-gradient(to bottom, transparent 0%, #87BCDE 10%, #87BCDE 20%, #87BCDE 30%, #87BCDE 40%, #87BCDE 50%, #87BCDE 60%, #87BCDE 70%, #87BCDE 80%, #87BCDE 90%, transparent 100%)' }
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

            <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
              <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
            </ParallaxLayer>

        </Parallax>
    </div>

  );
}