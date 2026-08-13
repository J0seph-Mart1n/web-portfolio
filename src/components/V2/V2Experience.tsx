import React from 'react';
import { motion } from 'motion/react';
import { Timeline } from '@/components/ui/timeline';

export function V2Experience() {
  const data = [
    {
      title: "May 2021 - May 2025",
      content: (
        <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 text-white px-4 py-3 rounded-xl shadow-xl inline-block">
          <div className="font-heading text-[#87BCDE] text-lg font-bold">AISSMS College of Engineering</div>
          <div className="font-sans text-sm font-medium opacity-80">B.E. in Computer Engineering</div>
        </div>
      )
    },
    {
      title: "Mar 2025 - Aug 2025",
      content: (
        <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 text-white px-4 py-3 rounded-xl shadow-xl inline-block">
          <div className="font-heading text-[#87BCDE] text-lg font-bold">Cognizant</div>
          <div className="font-sans text-sm font-medium opacity-80">Intern</div>
        </div>
      )
    },
    {
      title: "Aug 2025 - Present",
      content: (
        <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 text-white px-4 py-3 rounded-xl shadow-xl inline-block">
          <div className="font-heading text-[#87BCDE] text-lg font-bold">Cognizant</div>
          <div className="font-sans text-sm font-medium opacity-80">Programmer Analyst Trainee</div>
        </div>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      <h3 className="font-heading text-4xl md:text-5xl text-white font-bold mb-12 text-center">
        Experience
        <div className="w-24 h-1 bg-[#87BCDE] mx-auto mt-4 rounded-full"></div>
      </h3>
      <div className="w-full">
        <Timeline data={data} />
      </div>
    </motion.div>
  );
}
