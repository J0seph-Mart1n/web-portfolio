import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'nodejs';

// Image metadata
export const size = {
  width: 256,
  height: 256,
};
export const contentType = 'image/png';

export default async function Icon() {
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
          background: 'radial-gradient(circle at 50% 35%, #162338 0%, #070b14 65%, #000000 100%)',
        }}
      >
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
