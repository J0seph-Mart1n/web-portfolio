import React from 'react';

export function StarField() {
  const stars = React.useMemo(() => {
    const arr = []
    for (let i = 0; i < 120; i++) {
      arr.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      })
    }
    return arr
  }, [])

  return (
    <div className="star-field">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
      {/* Shooting stars */}
      <div className="shooting-star" style={{ top: '15%', left: '10%', animationDelay: '0s' }} />
      <div className="shooting-star" style={{ top: '35%', left: '50%', animationDelay: '4s' }} />
      <div className="shooting-star" style={{ top: '60%', left: '25%', animationDelay: '7s' }} />
    </div>
  )
}
