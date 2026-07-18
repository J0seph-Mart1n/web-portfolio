"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import { animated } from '@react-spring/web';
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data, springs }: { data: TimelineEntry[], springs?: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-1">
        {data.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <animated.div 
              key={index} 
              className="flex justify-center pt-2 md:pt-0 relative w-full"
              style={{
                opacity: springs ? (
                  index === 0 ? springs.exp1Opacity :
                  index === 1 ? springs.exp2Opacity :
                  index === 2 ? springs.exp3Opacity :
                  springs.timelineProgress.to((p: number) => Math.max(0, Math.min(1, (p - (index * 33)) / 15)))
                ) : 1
              }}
            >
              {/* Left Side */}
              <div className={`w-[45%] flex ${isLeft ? 'justify-end pr-8 md:pr-12' : 'justify-end opacity-0'}`}>
                {isLeft && (
                  <div className="w-full text-right flex flex-col items-end">
                    <h3 className="text-xl md:text-xl font-bold text-neutral-500 dark:text-neutral-400 mb-2">
                      {item.title}
                    </h3>
                    <div className="w-full">{item.content}</div>
                  </div>
                )}
              </div>

              {/* Center Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-40 top-1/2 -translate-y-1/2">
                <div className="h-8 w-8 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-neutral-200 dark:bg-[#253237] border-2 border-neutral-300 dark:border-[#87BCDE]" />
                </div>
              </div>

              {/* Right Side */}
              <div className={`w-[45%] flex ${!isLeft ? 'justify-start pl-8 md:pl-12' : 'justify-start opacity-0'}`}>
                {!isLeft && (
                  <div className="w-full text-left flex flex-col items-start">
                    <h3 className="text-xl md:text-xl font-bold text-neutral-500 dark:text-neutral-400 mb-2">
                      {item.title}
                    </h3>
                    <div className="w-full">{item.content}</div>
                  </div>
                )}
              </div>
              </animated.div>
          );
        })}
        
        {/* Central Gradient Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-1/2 -translate-x-1/2 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          {springs ? (
            <animated.div
              style={{
                height: springs.timelineProgress.to((p: number) => `${p}%`),
                opacity: springs.timelineProgress.to((p: number) => p > 5 ? 1 : 0),
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-[#87BCDE] to-transparent from-[0%] via-[10%] rounded-full"
            />
          ) : (
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-[#87BCDE] to-transparent from-[0%] via-[10%] rounded-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};
