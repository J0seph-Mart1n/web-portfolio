import React from 'react';
import { animated } from '@react-spring/web';
import { Timeline } from '@/components/ui/timeline';

export function ExperienceTimeline({ springs }: { springs: any }) {
  const data = [
    {
      title: "May 2021 - May 2025",
      content: (
        <div style={{ background: '#253237', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', display: 'inline-block' }}>
          <div style={{ fontWeight: 800, color: '#87BCDE', fontSize: '0.65em' }}>AISSMS College of Engineering</div>
          <div style={{ fontWeight: 600, fontSize: '0.55em' }}>B.E. in Computer Engineering</div>
        </div>
      )
    },
    {
      title: " Mar 2025 - Aug 2025",
      content: (
        <div style={{ background: '#253237', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', display: 'inline-block' }}>
          <div style={{ fontWeight: 800, color: '#87BCDE', fontSize: '0.65em' }}>Cognizant</div>
          <div style={{ fontWeight: 600, fontSize: '0.55em' }}>Intern</div>
        </div>
      )
    },
    {
      title: "Aug 2025 - Present",
      content: (
        <div style={{ background: '#253237', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', display: 'inline-block' }}>
          <div style={{ fontWeight: 800, color: '#87BCDE', fontSize: '0.65em' }}>Cognizant</div>
          <div style={{ fontWeight: 600, fontSize: '0.55em' }}>Programmer Analyst Trainee</div>
        </div>
      )
    }
  ];

  return (
    <>
      <h3 style={{ borderBottom: '3px solid #87BCDE', paddingBottom: '0.2rem', marginBottom: '0.8rem', fontWeight: 800 }}>
        Experience
      </h3>
      <animated.div style={{ 
        width: '100%',
        position: 'relative',
        opacity: springs.bannerScale.to((s: number) => Math.max(0, (s - 2.2) * 3.33)),
        // Remove maxHeight restriction so the Timeline component can render fully
      }}>
        <Timeline data={data} springs={springs} />
      </animated.div>
    </>
  );
}
