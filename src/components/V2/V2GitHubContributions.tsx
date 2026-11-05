"use client";
import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export function V2GitHubContributions() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full pt-2">
      <h2 className="text-lg md:text-xl font-black tracking-tight text-black mb-3">
        GITHUB STATS
      </h2>

      <div className="w-full overflow-x-auto text-neutral-800 font-sans">
        {mounted ? (
          <GitHubCalendar
            username="J0seph-Mart1n"
            colorScheme="light"
            blockSize={12}
            blockMargin={4}
            blockRadius={2}
            fontSize={12}
            theme={{
              light: ['#E5E2D6', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
            }}
            labels={{
              totalCount: '{{count}} contributions in the last year',
            }}
          />
        ) : (
          <div className="h-[135px] w-full flex items-center justify-center font-mono text-xs text-neutral-500 animate-pulse">
            Loading contributions...
          </div>
        )}
      </div>
    </div>
  );
}
