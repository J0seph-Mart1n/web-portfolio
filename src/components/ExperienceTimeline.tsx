import React from 'react';
import { animated } from '@react-spring/web';

export function ExperienceTimeline({ springs }: { springs: any }) {
  return (
    <>
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
        opacity: springs.bannerScale.to((s: number) => Math.max(0, (s - 2.2) * 3.33)),
        maxHeight: springs.bannerScale.to((s: number) => `${(s - 1) * 450}px`),
        overflow: 'hidden'
      }}>
        {/* Aceternity Style Timeline Line */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '80%', background: 'rgba(255,255,255,0.1)', zIndex: 0, borderRadius: '2px', overflow: 'hidden' }}>
            {/* The glowing gradient fill */}
            <animated.div style={{
              width: '100%',
              background: 'linear-gradient(to bottom, transparent, #87BCDE, #3E7C9D)',
              height: springs.timelineProgress.to((p: number) => `${p}%`),
              boxShadow: '0 0 15px #87BCDE',
              borderRadius: '2px'
            }} />
        </div>

        {/* Box 1 (Left) */}
        <animated.div style={{ 
            opacity: springs.exp1Opacity, 
            transform: springs.exp1Opacity.to((o: number) => `translateY(${(1 - o) * 20}px)`),
            width: '45%', 
            alignSelf: 'flex-start',
            background: '#253237', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '12px', zIndex: 1, boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            position: 'relative'
        }}>
            {/* The glowing dot on the timeline for Box 1 */}
            <animated.div style={{
              position: 'absolute', right: '-11.11%', top: '50%', transform: 'translateY(-50%) translateX(50%)',
              width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #87BCDE',
              background: springs.exp1Opacity.to((o: number) => o > 0.5 ? '#87BCDE' : '#253237'),
              boxShadow: springs.exp1Opacity.to((o: number) => o > 0.5 ? '0 0 10px #87BCDE' : 'none'),
              transition: 'all 0.3s ease'
            }} />
            <div style={{ fontWeight: 800, color: '#87BCDE', fontSize: '0.85em' }}>Company A</div>
            <div style={{ fontWeight: 600, fontSize: '0.75em' }}>Software Engineer</div>
            <div style={{ fontSize: '0.65em', opacity: 0.8, marginTop: '2px' }}>Jan 2022 - Present</div>
        </animated.div>

        {/* Box 2 (Right) */}
        <animated.div style={{ 
            opacity: springs.exp2Opacity, 
            transform: springs.exp2Opacity.to((o: number) => `translateY(${(1 - o) * 20}px)`),
            width: '45%', 
            alignSelf: 'flex-end',
            background: '#253237', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '12px', zIndex: 1, boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            position: 'relative'
        }}>
            {/* The glowing dot on the timeline for Box 2 */}
            <animated.div style={{
              position: 'absolute', left: '-11.11%', top: '50%', transform: 'translateY(-50%) translateX(-50%)',
              width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #87BCDE',
              background: springs.exp2Opacity.to((o: number) => o > 0.5 ? '#87BCDE' : '#253237'),
              boxShadow: springs.exp2Opacity.to((o: number) => o > 0.5 ? '0 0 10px #87BCDE' : 'none'),
              transition: 'all 0.3s ease'
            }} />
            <div style={{ fontWeight: 800, color: '#87BCDE', fontSize: '0.85em' }}>Company B</div>
            <div style={{ fontWeight: 600, fontSize: '0.75em' }}>Automation Tester</div>
            <div style={{ fontSize: '0.65em', opacity: 0.8, marginTop: '2px' }}>Jun 2019 - Dec 2021</div>
        </animated.div>

        {/* Box 3 (Left) */}
        <animated.div style={{ 
            opacity: springs.exp3Opacity, 
            transform: springs.exp3Opacity.to((o: number) => `translateY(${(1 - o) * 20}px)`),
            width: '45%', 
            alignSelf: 'flex-start',
            background: '#253237', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '12px', zIndex: 1, boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            position: 'relative'
        }}>
            {/* The glowing dot on the timeline for Box 3 */}
            <animated.div style={{
              position: 'absolute', right: '-11.11%', top: '50%', transform: 'translateY(-50%) translateX(50%)',
              width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #87BCDE',
              background: springs.exp3Opacity.to((o: number) => o > 0.5 ? '#87BCDE' : '#253237'),
              boxShadow: springs.exp3Opacity.to((o: number) => o > 0.5 ? '0 0 10px #87BCDE' : 'none'),
              transition: 'all 0.3s ease'
            }} />
            <div style={{ fontWeight: 800, color: '#87BCDE', fontSize: '0.85em' }}>Company C</div>
            <div style={{ fontWeight: 600, fontSize: '0.75em' }}>Junior Developer</div>
            <div style={{ fontSize: '0.65em', opacity: 0.8, marginTop: '2px' }}>Jan 2018 - May 2019</div>
        </animated.div>
      </animated.div>
    </>
  );
}
