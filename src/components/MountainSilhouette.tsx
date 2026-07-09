import React from 'react';

// ─── Full Natural Landscape Scene ───────────────────────────────────
// Renders a rich SVG landscape with: sky, mountains, trees, river,
// rocks, grass, and birds — all in a single viewport-wide SVG.

export function MountainSilhouette() {
  return (
    <svg
      viewBox="0 0 1440 900"
      style={{ width: '100%', height: '100%', position: 'absolute', bottom: 0, left: 0 }}
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        {/* Sky gradient */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="40%" stopColor="#a8d8ea" />
          <stop offset="70%" stopColor="#c9e8f0" />
          <stop offset="100%" stopColor="#e8f4f0" />
        </linearGradient>

        {/* Water/river gradient */}
        <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4a90b8" />
          <stop offset="30%" stopColor="#5ba3cc" />
          <stop offset="50%" stopColor="#6bb8d9" />
          <stop offset="70%" stopColor="#5ba3cc" />
          <stop offset="100%" stopColor="#4a90b8" />
        </linearGradient>

        {/* Sun glow */}
        <radialGradient id="sunGlow" cx="85%" cy="15%" r="15%">
          <stop offset="0%" stopColor="#fff9c4" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#fff176" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#fff176" stopOpacity="0" />
        </radialGradient>

        {/* Mountain snow cap gradient */}
        <linearGradient id="snowCap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="100%" stopColor="#a0a0a0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── Sky Background ── */}
      <rect x="0" y="0" width="1440" height="500" fill="url(#skyGrad)" />

      {/* Sun glow haze */}
      <rect x="0" y="0" width="1440" height="500" fill="url(#sunGlow)" />

      {/* ── Distant Mountains (far, misty blue-grey) ── */}
      <path
        d="M0,380 L80,340 L140,355 L220,290 L300,320 L360,270 L440,300 L500,240 L560,280 L640,220 L700,260 L760,200 L820,250 L880,190 L940,230 L1000,210 L1060,250 L1120,200 L1180,240 L1240,220 L1300,260 L1360,240 L1440,270 L1440,500 L0,500 Z"
        fill="#7a9bb5"
        opacity="0.35"
      />

      {/* ── Mid Mountains (darker, more defined) ── */}
      <path
        d="M0,420 L60,390 L120,405 L200,350 L280,380 L340,330 L420,360 L480,300 L540,340 L620,280 L680,320 L740,270 L800,310 L860,260 L920,300 L980,280 L1040,320 L1100,270 L1160,310 L1220,290 L1300,330 L1380,310 L1440,340 L1440,500 L0,500 Z"
        fill="#4a6741"
        opacity="0.6"
      />
      {/* Snow caps on mid mountains */}
      <path
        d="M620,280 L650,290 L680,320 L660,300 Z"
        fill="white"
        opacity="0.5"
      />
      <path
        d="M860,260 L885,272 L920,300 L895,282 Z"
        fill="white"
        opacity="0.45"
      />
      <path
        d="M1100,270 L1125,282 L1160,310 L1135,295 Z"
        fill="white"
        opacity="0.4"
      />

      {/* ── Near Mountains (forested green) ── */}
      <path
        d="M0,480 L70,450 L140,465 L220,420 L300,450 L380,400 L460,435 L540,390 L620,430 L700,380 L780,420 L860,370 L940,410 L1020,380 L1100,420 L1180,390 L1260,430 L1340,405 L1440,440 L1440,500 L0,500 Z"
        fill="#2d5a2e"
        opacity="0.8"
      />

      {/* ── Rolling Hills / Foreground terrain ── */}
      <path
        d="M0,520 Q120,490 240,515 Q360,540 480,510 Q600,480 720,505 Q840,530 960,500 Q1080,470 1200,500 Q1320,530 1440,510 L1440,900 L0,900 Z"
        fill="#3d7a3e"
      />

      {/* Lighter grass patches */}
      <path
        d="M0,560 Q180,540 360,555 Q540,570 720,545 Q900,520 1080,550 Q1260,580 1440,555 L1440,900 L0,900 Z"
        fill="#4a9e4b"
        opacity="0.7"
      />

      {/* ── Winding River ── */}
      <path
        d="M-20,620 Q100,600 200,630 Q320,670 400,640 Q500,600 600,635 Q720,680 820,650 Q940,610 1050,645 Q1160,690 1260,660 Q1360,620 1460,650"
        stroke="url(#riverGrad)"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* River highlights / shimmer */}
      <path
        d="M50,618 Q150,600 250,625 Q350,655 430,635"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M700,648 Q800,625 900,645 Q1000,670 1080,655"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── River Banks (darker earth) ── */}
      <path
        d="M-20,614 Q100,594 200,624 Q320,664 400,634 Q500,594 600,629 Q720,674 820,644 Q940,604 1050,639 Q1160,684 1260,654 Q1360,614 1460,644"
        stroke="#5a7a4a"
        strokeWidth="24"
        fill="none"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* ── Trees (various sizes and positions) ── */}
      {/* Pine trees — left cluster */}
      <g transform="translate(80, 490)">
        <polygon points="0,-60 15,0 -15,0" fill="#1a4a1c" />
        <polygon points="0,-45 12,0 -12,0" fill="#2d5a2e" />
        <rect x="-3" y="0" width="6" height="12" fill="#4a3728" />
      </g>
      <g transform="translate(110, 500)">
        <polygon points="0,-50 12,0 -12,0" fill="#1a4a1c" />
        <polygon points="0,-38 10,0 -10,0" fill="#2d5a2e" />
        <rect x="-2.5" y="0" width="5" height="10" fill="#4a3728" />
      </g>
      <g transform="translate(60, 505)">
        <polygon points="0,-40 10,0 -10,0" fill="#234d24" />
        <rect x="-2" y="0" width="4" height="8" fill="#4a3728" />
      </g>

      {/* Pine trees — center-left */}
      <g transform="translate(350, 505)">
        <polygon points="0,-55 14,0 -14,0" fill="#1a4a1c" />
        <polygon points="0,-42 11,0 -11,0" fill="#2d5a2e" />
        <rect x="-3" y="0" width="6" height="11" fill="#4a3728" />
      </g>
      <g transform="translate(380, 510)">
        <polygon points="0,-45 11,0 -11,0" fill="#234d24" />
        <rect x="-2.5" y="0" width="5" height="9" fill="#4a3728" />
      </g>

      {/* Deciduous trees — round canopy */}
      <g transform="translate(550, 500)">
        <circle cx="0" cy="-35" r="22" fill="#3d7a3e" />
        <circle cx="-12" cy="-28" r="16" fill="#4a9e4b" />
        <circle cx="14" cy="-30" r="18" fill="#3d7a3e" />
        <rect x="-3" y="-14" width="6" height="20" fill="#5a4030" />
      </g>

      {/* Pine trees — right side */}
      <g transform="translate(1050, 495)">
        <polygon points="0,-65 16,0 -16,0" fill="#1a4a1c" />
        <polygon points="0,-50 13,0 -13,0" fill="#2d5a2e" />
        <rect x="-3" y="0" width="6" height="12" fill="#4a3728" />
      </g>
      <g transform="translate(1080, 505)">
        <polygon points="0,-50 12,0 -12,0" fill="#234d24" />
        <polygon points="0,-38 10,0 -10,0" fill="#2d5a2e" />
        <rect x="-2.5" y="0" width="5" height="10" fill="#4a3728" />
      </g>
      <g transform="translate(1020, 510)">
        <polygon points="0,-40 10,0 -10,0" fill="#1a4a1c" />
        <rect x="-2" y="0" width="4" height="8" fill="#4a3728" />
      </g>

      {/* Deciduous tree — far right */}
      <g transform="translate(1320, 500)">
        <circle cx="0" cy="-30" r="20" fill="#4a9e4b" />
        <circle cx="-10" cy="-24" r="14" fill="#3d7a3e" />
        <circle cx="12" cy="-26" r="16" fill="#4a9e4b" />
        <rect x="-3" y="-12" width="6" height="18" fill="#5a4030" />
      </g>

      {/* Small bushes scattered */}
      <ellipse cx="200" cy="545" rx="18" ry="10" fill="#3d7a3e" opacity="0.8" />
      <ellipse cx="450" cy="535" rx="14" ry="8" fill="#4a9e4b" opacity="0.7" />
      <ellipse cx="680" cy="520" rx="16" ry="9" fill="#3d7a3e" opacity="0.75" />
      <ellipse cx="900" cy="530" rx="12" ry="7" fill="#4a9e4b" opacity="0.7" />
      <ellipse cx="1200" cy="540" rx="15" ry="8" fill="#3d7a3e" opacity="0.8" />

      {/* ── Rocks ── */}
      {/* Large rocks near river */}
      <g transform="translate(280, 615)">
        <ellipse cx="0" cy="0" rx="12" ry="8" fill="#6b6b6b" />
        <ellipse cx="0" cy="-2" rx="10" ry="6" fill="#808080" />
        <ellipse cx="-2" cy="-4" rx="5" ry="3" fill="#999" opacity="0.5" />
      </g>
      <g transform="translate(750, 640)">
        <ellipse cx="0" cy="0" rx="15" ry="10" fill="#5a5a5a" />
        <ellipse cx="0" cy="-3" rx="12" ry="7" fill="#7a7a7a" />
        <ellipse cx="3" cy="-5" rx="6" ry="3" fill="#999" opacity="0.4" />
      </g>
      <g transform="translate(1150, 655)">
        <ellipse cx="0" cy="0" rx="10" ry="7" fill="#6b6b6b" />
        <ellipse cx="0" cy="-2" rx="8" ry="5" fill="#888" />
      </g>
      {/* Small pebbles */}
      <circle cx="320" cy="610" r="3" fill="#777" />
      <circle cx="335" cy="618" r="2" fill="#888" />
      <circle cx="780" cy="645" r="4" fill="#666" />
      <circle cx="1170" cy="660" r="3" fill="#777" />

      {/* ── Birds in the sky ── */}
      <g transform="translate(300, 180)" opacity="0.6">
        <path d="M0,0 Q5,-8 12,-3 Q5,-5 0,0 Q-5,-5 -12,-3 Q-5,-8 0,0 Z" fill="#333" />
      </g>
      <g transform="translate(350, 160)" opacity="0.5">
        <path d="M0,0 Q4,-6 9,-2 Q4,-4 0,0 Q-4,-4 -9,-2 Q-4,-6 0,0 Z" fill="#444" />
      </g>
      <g transform="translate(320, 200)" opacity="0.4">
        <path d="M0,0 Q3,-5 7,-1 Q3,-3 0,0 Q-3,-3 -7,-1 Q-3,-5 0,0 Z" fill="#555" />
      </g>
      <g transform="translate(1100, 150)" opacity="0.5">
        <path d="M0,0 Q5,-8 12,-3 Q5,-5 0,0 Q-5,-5 -12,-3 Q-5,-8 0,0 Z" fill="#444" />
      </g>
      <g transform="translate(1140, 175)" opacity="0.35">
        <path d="M0,0 Q3,-5 7,-1 Q3,-3 0,0 Q-3,-3 -7,-1 Q-3,-5 0,0 Z" fill="#555" />
      </g>

      {/* ── Wildflowers in grass ── */}
      <circle cx="150" cy="555" r="2.5" fill="#e85d75" opacity="0.8" />
      <circle cx="155" cy="558" r="2" fill="#f7c948" opacity="0.7" />
      <circle cx="430" cy="540" r="2" fill="#e85d75" opacity="0.7" />
      <circle cx="435" cy="543" r="2.5" fill="#fff" opacity="0.6" />
      <circle cx="720" cy="528" r="2" fill="#f7c948" opacity="0.8" />
      <circle cx="725" cy="525" r="2.5" fill="#e85d75" opacity="0.6" />
      <circle cx="960" cy="538" r="2" fill="#fff" opacity="0.7" />
      <circle cx="1250" cy="548" r="2.5" fill="#f7c948" opacity="0.7" />
      <circle cx="1255" cy="545" r="2" fill="#e85d75" opacity="0.6" />

      {/* ── Distant grass texture lines ── */}
      <path d="M0,570 Q60,565 120,572 Q180,578 240,568 Q300,560 360,570" stroke="#3d7a3e" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M400,560 Q460,555 520,562 Q580,570 640,558 Q700,548 760,560" stroke="#4a9e4b" strokeWidth="0.8" fill="none" opacity="0.25" />
      <path d="M800,550 Q860,545 920,555 Q980,565 1040,553 Q1100,543 1160,555" stroke="#3d7a3e" strokeWidth="1" fill="none" opacity="0.2" />

      {/* ── Foreground grass blades (bottom edge) ── */}
      <path
        d="M0,900 L0,880 Q10,870 20,880 Q30,865 40,878 Q50,860 60,876 Q70,858 80,874 Q90,855 100,872 Q110,850 120,870 Q130,855 140,872 Q150,850 160,870 Q170,855 180,875 Q190,860 200,878 L200,900 Z"
        fill="#2d6a2e"
        opacity="0.6"
      />
      <path
        d="M200,900 L200,882 Q210,870 220,880 Q230,866 240,878 Q250,862 260,876 Q270,858 280,875 Q290,860 300,878 Q310,865 320,880 Q330,868 340,882 Q350,870 360,885 L360,900 Z"
        fill="#3d7a3e"
        opacity="0.5"
      />
    </svg>
  )
}
