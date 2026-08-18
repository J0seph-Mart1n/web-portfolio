import { ImageResponse } from 'next/og';
import fs from 'fs/promises';
import path from 'path';
import React from 'react';

// Route segment config
export const runtime = 'nodejs';

// Image metadata
export const size = {
  width: 256,
  height: 256,
};
export const contentType = 'image/png';

export default async function Icon() {
  const imagePath = path.join(process.cwd(), 'public/images/Space_Wallpaper.jpg');
  const imageData = await fs.readFile(imagePath);
  // Satori (used by ImageResponse) supports passing array buffers directly for images via src
  const imageSrc = imageData.buffer;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '64px',
          overflow: 'hidden',
          position: 'relative',
          background: '#000',
        }}
      >
        <img 
          // @ts-ignore - ImageResponse supports ArrayBuffer for src
          src={imageSrc} 
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)' }} />
        <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: 'absolute' }}>
          <path d="M 60 25 L 60 60 C 60 75 40 75 40 60 L 40 55" fill="none" stroke="#87BCDE" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
