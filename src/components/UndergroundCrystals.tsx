import React from 'react';

export function UndergroundCrystals() {
  const crystals = React.useMemo(() => {
    const colors = ['#ff6b35', '#f7c948', '#e85d75', '#7c3aed', '#22d3ee']
    const arr = []
    for (let i = 0; i < 25; i++) {
      arr.push({
        id: i,
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 80 + 10}%`,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 4,
      })
    }
    return arr
  }, [])

  return (
    <>
      {crystals.map(c => (
        <div
          key={c.id}
          className="crystal-dot"
          style={{
            left: c.left,
            top: c.top,
            width: c.size,
            height: c.size,
            color: c.color,
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
      {/* Magma veins - subtle glowing lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <path
          d="M0,200 Q200,180 400,220 T800,190 T1200,230 T1600,200"
          stroke="#ff4500"
          strokeWidth="2"
          fill="none"
          opacity="0.15"
          className="magma-vein"
        />
        <path
          d="M0,400 Q300,380 600,420 T1000,390 T1440,430"
          stroke="#ff6347"
          strokeWidth="1.5"
          fill="none"
          opacity="0.1"
          className="magma-vein"
          style={{ animationDelay: '2s' }}
        />
      </svg>
    </>
  )
}
