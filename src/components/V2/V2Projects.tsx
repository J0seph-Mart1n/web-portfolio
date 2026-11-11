import React from 'react';
import { BookOpen } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'motion/react';
import { BlurFade } from '@/components/ui/blur-fade';

export function V2Projects() {
  const projects = [
    {
      title: 'SELAH',
      year: '2026',
      code: 'PROJ-01',
      badge: 'FULL-STACK // WEBGL & 3D',
      description: 'Architected a full-stack festival platform featuring a 4-step registration wizard with dynamic roster validation, tiered pricing logic, and database backed by Cloud Firestore, paired with a secure admin analytics dashboard and an interactive WebGL 3D cloth physics simulation.',
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'Cloud Firestore', 'Tailwind CSS', 'WebGL', 'GSAP'],
      github: 'https://github.com/J0seph-Mart1n/SELAH',
      slug: 'selah',
    },
    {
      title: 'Vitality',
      year: '2025',
      code: 'PROJ-02',
      badge: 'MOBILE // COMPUTER VISION',
      description: 'Shipped an AI nutrition tracking app parsing food labels into structured nutritional data using multimodal vision models, cutting meal logging time by 80%. Engineered a high-throughput Go backend handling REST API requests with sub-50ms latency using Firebase Auth and MongoDB.',
      tech: ['React Native', 'Expo', 'Go', 'MongoDB', 'Firebase', 'LLaMA'],
      github: 'https://github.com/J0seph-Mart1n/Vitality',
      slug: 'vitality',
    },
  ];

  return (
    <div className="w-full px-4 md:px-8 py-2 flex flex-col items-center z-10 overflow-hidden">
      <div className="text-center mb-8">
        <BlurFade delay={0.2} inView>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black">
            FEATURED PROJECTS
          </h3>
          <div className="w-16 h-1 bg-[#FFEE00] border border-black mx-auto mt-2" />
        </BlurFade>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl flex flex-col gap-4"
      >
        {projects.map((project) => (
          <div
            key={project.title}
            className="w-full bg-[#FFFFF8] border-2 border-black shadow-[4px_4px_0px_#000] relative overflow-hidden flex flex-col"
          >
            {/* Top Yellow Bar */}
            <div className="w-full h-1.5 bg-[#FFEE00] border-b-2 border-black" />

            {/* Content Section */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-black/15">
                <span className="px-2 py-0.5 bg-[#FFEE00] border border-black font-mono text-[10px] font-black uppercase tracking-wider text-black shadow-[1.5px_1.5px_0px_#000]">
                  {project.badge}
                </span>
                <span className="px-2 py-0.5 bg-[#FAF7E8] border border-black font-mono text-[10px] font-bold text-black">
                  {project.code} // {project.year}
                </span>
              </div>

              <h4 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight mb-2">
                {project.title}
              </h4>

              <p className="text-neutral-700 text-xs md:text-sm leading-relaxed mb-3 font-medium">
                {project.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto pt-3 border-t border-black/15">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-[#FAF7E8] border border-black text-black font-mono text-[11px] font-bold shadow-[1px_1px_0px_#000]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {project.slug && (
                    <a
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFEE00] hover:bg-[#FAFF00] text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                      <BookOpen size={14} />
                      <span>VIEW PROTOCOL</span>
                      <span>&rarr;</span>
                    </a>
                  )}

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFF8] hover:bg-neutral-100 text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    aria-label="GitHub Repository"
                  >
                    <FaGithub size={14} />
                    <span>SOURCE</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
