import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function V2Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const activeLineWidth = isAutoPlaying 
    ? (activeIndex === 2 ? 100 : (activeIndex / 2) * 100 + (progress / 100) * 50) 
    : (activeIndex / 2) * 100;

  const data = [
    {
      date: "2021 - 2025",
      title: "AISSMS College of Engineering",
      role: "B.E. in Computer Engineering",
      description: "Pursued a comprehensive degree in Computer Engineering, developing a strong foundation in algorithms, software architecture, and distributed systems. Participated in multiple hackathons and built scalable web applications."
    },
    {
      date: "Mar 2025",
      title: "Cognizant Intern",
      role: "Intern",
      description: "Contributed to enterprise-level software solutions, engaging in agile development methodologies and collaborating with cross-functional teams to deliver high-quality code. Gained hands-on experience with modern tech stacks."
    },
    {
      date: "Aug 2025 - Present",
      title: "Cognizant PAT",
      role: "Programmer Analyst Trainee",
      description: "Building scalable web applications and AI integrations, focusing on performance optimization, robust backend systems, and modern frontend architectures to create seamless user experiences."
    }
  ];

  // Auto-play timer logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    const DURATION = 5000; // 5 seconds per slide
    const TICK = 16; // ~60fps smooth animation
    const step = (100 / DURATION) * TICK;

    const timer = setInterval(() => {
      setProgress((prev) => prev + step);
    }, TICK);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Handle slide transition when progress completes
  useEffect(() => {
    if (progress >= 100 && isAutoPlaying) {
      setActiveIndex((current) => (current + 1) % data.length);
      setProgress(0);
    }
  }, [progress, isAutoPlaying, data.length]);

  const handleNodeClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    setProgress(100); // Fill the progress bar visually
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto py-12 px-4"
    >
      <h3 className="font-heading text-4xl md:text-5xl text-white font-bold mb-16 text-center">
        Experience
        <div className="w-24 h-1 bg-[#87BCDE] mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(135,188,222,0.8)]"></div>
      </h3>

      {/* Horizontal Timeline */}
      <div className="relative w-full mb-12 md:mb-16">
        {/* Timeline Lines Wrapper */}
        <div 
          className="absolute top-[40px]" 
          style={{ 
            left: `${(1 / (2 * data.length)) * 100}%`, 
            width: `${(1 - 1 / data.length) * 100}%` 
          }}
        >
          {/* Background Line */}
          <div className="absolute top-3 left-0 w-full h-[2px] bg-white/10 rounded-full"></div>
          
          {/* Active Line */}
          <motion.div 
            className="absolute top-3 left-0 h-[4px] bg-[#87BCDE] rounded-full shadow-[0_0_10px_rgba(135,188,222,0.8)]"
            animate={{ width: `${activeLineWidth}%` }}
            transition={{ duration: isAutoPlaying ? 0 : 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Nodes */}
        <div className="relative flex justify-between w-full">
          {data.map((item, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;

            return (
              <div 
                key={index} 
                onClick={() => handleNodeClick(index)}
                className="flex flex-col items-center cursor-pointer group w-1/3"
              >
                {/* Year */}
                <div className={`text-xs md:text-sm font-mono mb-4 transition-colors duration-300 ${isActive ? 'text-[#87BCDE]' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                  {item.date}
                </div>

                {/* Dot */}
                <motion.div 
                  className={`w-5 h-5 rounded-full border-4 z-10 transition-colors duration-300 ${
                    isActive ? 'bg-[#87BCDE] border-black shadow-[0_0_15px_rgba(135,188,222,1)] scale-125' : 
                    isPast ? 'bg-[#87BCDE] border-black' : 
                    'bg-black border-zinc-600 group-hover:border-zinc-400'
                  }`}
                />

                {/* Title */}
                <div className={`mt-4 text-center font-heading text-sm md:text-lg transition-colors duration-300 px-2 ${
                  isActive ? 'text-white font-bold' : 'text-zinc-400 group-hover:text-zinc-200'
                }`}>
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Box */}
      <div className="w-full relative overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl min-h-[300px]">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-8 md:p-12 flex flex-col justify-center h-full"
          >
            <div className="inline-block px-3 py-1 bg-[#87BCDE]/20 text-[#87BCDE] font-mono text-xs rounded-full mb-4 w-fit border border-[#87BCDE]/30">
              {data[activeIndex].date}
            </div>
            
            <h4 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              {data[activeIndex].title}
            </h4>
            
            <div className="text-xl md:text-2xl text-zinc-300 font-medium mb-6">
              {data[activeIndex].role}
            </div>
            
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-4xl">
              {data[activeIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
