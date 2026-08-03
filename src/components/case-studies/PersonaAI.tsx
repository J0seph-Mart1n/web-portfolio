import React from 'react';
import { Layers, Cpu } from 'lucide-react';
import { ProjectData } from '@/data/projects';
import { ImageSlider } from '@/components/ImageSlider';

const personaImages = [
  '/images/Persona/1_Dashboard.png',
  '/images/Persona/2_Chat.png',
  '/images/Persona/3_Traits.png',
  '/images/Persona/4_Assessment.png',
  '/images/Persona/5_Result.png',
  '/images/Persona/6_MBTI.png',
  '/images/Persona/7_Settings.png',
];

export function PersonaAI({ project }: { project: ProjectData }) {
  return (
    <>
      <ImageSlider images={personaImages} color={project.color} />

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
