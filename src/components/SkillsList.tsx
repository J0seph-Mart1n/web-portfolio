import React from 'react';
import { animated } from '@react-spring/web';

export function SkillsList({ springs }: { springs: any }) {
  return (
    <>
      <h3 style={{ borderBottom: '3px solid #87BCDE', paddingBottom: '0.2rem', marginBottom: '0.8rem', fontWeight: 800 }}>
        Skills
      </h3>
      <animated.div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        opacity: springs.bannerScale.to((s: number) => Math.max(0, (s - 2.2) * 3.33)),
        maxHeight: springs.bannerScale.to((s: number) => `${(s - 1) * 500}px`),
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
    </>
  );
}
