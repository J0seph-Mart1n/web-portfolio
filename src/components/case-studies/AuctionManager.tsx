import React from 'react';
import { Layers, Cpu } from 'lucide-react';
import { ProjectData } from '@/data/projects';

export function AuctionManager({ project }: { project: ProjectData }) {
  return (
    <>
      {/* Hero Image Placeholder */}
      <div 
        className="w-full aspect-video rounded-2xl border border-white/10 bg-black/50 backdrop-blur flex items-center justify-center mb-20 relative overflow-hidden"
        style={{ boxShadow: `0 10px 40px -10px ${project.color}30` }}
      >
        <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(45deg, ${project.color}, transparent)` }} />
        <p className="text-gray-500 font-medium tracking-widest uppercase z-10 flex items-center gap-3">
          <Layers size={24} style={{ color: project.color }} />
          Hero Image Placeholder
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          The Challenge
        </h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          {project.challenge}
        </p>
      </section>

      {/* Feature Image Placeholder */}
      <div 
        className="w-full h-64 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center relative overflow-hidden"
      >
        <p className="text-gray-600 font-medium tracking-widest uppercase flex items-center gap-2">
          <Cpu size={20} /> Architecture Diagram
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          The Solution
        </h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          {project.solution}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Results & Impact
        </h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          {project.results}
        </p>
      </section>
    </>
  );
}
