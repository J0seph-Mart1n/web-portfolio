import React from 'react';
import { animated } from '@react-spring/web';
import Marquee from 'react-fast-marquee';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const skills = [
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#ffffff' }, // White for dark mode visibility
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' }
];

export function SkillsList({ springs }: { springs: any }) {
  return (
    <>
      <h3 style={{ borderBottom: '3px solid #87BCDE', paddingBottom: '0.2rem', marginBottom: '0.8rem', fontWeight: 800 }}>
        Skills
      </h3>
      <animated.div style={{ 
        width: '100%',
        opacity: springs.bannerScale.to((s: number) => Math.max(0, (s - 2.2) * 3.33)),
        maxHeight: springs.bannerScale.to((s: number) => `${(s - 1) * 500}px`),
        overflow: 'hidden'
      }}>
        <Marquee 
          gradient={false} 
          speed={50} 
          pauseOnHover={true}
          style={{ padding: '1rem 0' }}
        >
          {skills.map(skill => (
            <div key={skill.name} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center', 
              margin: '0 3rem',

              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <skill.Icon size={65} color={skill.color} style={{ filter: `drop-shadow(0 0 8px ${skill.color}66)` }} />
            </div>
          ))}
        </Marquee>
      </animated.div>
    </>
  );
}
