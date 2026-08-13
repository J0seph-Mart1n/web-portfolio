import React from 'react';
import { BookOpen, FolderGit2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'motion/react';
import { BlurFade } from '@/components/ui/blur-fade';
import Image from 'next/image';

export function V2Projects() {
  const projects = [
    {
      title: 'Persona.ai',
      description: 'An offline, AI-powered desktop application that builds and visualizes a personalized psychological knowledge graph from user interactions using local LLMs and Neo4j.',
      tech: ['Next.js', 'Electron', 'Neo4j', 'Ollama', 'Tailwind'],
      color: '#87BCDE', // Changed from pink to match theme
      github: 'https://github.com/J0seph-Mart1n/PersonaLocalApp',
      slug: 'persona-ai',
    },
    {
      title: 'Auction Manager',
      description: 'A full-stack web application featuring a Vue 3 frontend for real-time auction tracking and a Node.js/PostgreSQL backend for secure item cataloging and sales management.',
      tech: ['Vue 3', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Prisma'],
      color: '#87BCDE',
      github: 'https://github.com/J0seph-Mart1n/AuctionManager',
      slug: 'auction-manager',
    },
    {
      title: 'Vitality',
      description: 'An AI-powered health and nutrition tracker featuring a React Native frontend for scanning food labels and a Go/MongoDB backend utilizing Groq\'s Llama 4 for real-time nutritional analysis.',
      tech: ['React Native', 'Expo', 'Go', 'MongoDB', 'Firebase', 'LLaMA'],
      color: '#87BCDE',
      github: 'https://github.com/J0seph-Mart1n/Vitality',
      slug: 'vitality',
    },
  ];

  return (
    <div className="w-full px-4 md:px-8 py-2 flex flex-col items-center z-10">
      <div className="text-center mb-12">
        <BlurFade delay={0.3} inView>
          <h3 className="font-heading text-4xl md:text-5xl text-white font-bold mb-4">
            Projects
            <div className="w-24 h-1 bg-[#87BCDE] mx-auto mt-4 rounded-full"></div>
          </h3>
        </BlurFade>
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-12 md:gap-16">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`group/tile relative w-full flex flex-col gap-8 items-center bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
          >
            {/* Image Placeholder */}
            <div className="w-full md:w-[40%] rounded-xl overflow-hidden aspect-video bg-black/50 border border-white/5 shadow-inner relative group-hover/tile:border-white/20 transition-colors">
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <FolderGit2 size={48} color={project.color} />
              </div>
            </div>

            {/* Content Side */}
            <div className={`w-full md:w-[60%] flex flex-col gap-4 ${index % 2 !== 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} text-center`}>
              <h4 className="font-heading text-3xl font-bold text-white tracking-wide">
                {project.title}
              </h4>
              
              <div className="bg-black/40 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/5 text-zinc-300 font-sans text-sm md:text-base leading-relaxed shadow-lg">
                {project.description}
              </div>

              <ul className={`flex flex-wrap gap-2 mt-2 justify-center ${index % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                {project.tech.map((t) => (
                  <li key={t} className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 rounded-full font-mono text-xs shadow-sm">
                    {t}
                  </li>
                ))}
              </ul>

              <div className={`flex items-center gap-4 mt-4 justify-center ${index % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all hover:scale-110 shadow-lg"
                  aria-label="GitHub Repository"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href={`/case-studies/${project.slug}`}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#87BCDE]/20 border border-[#87BCDE]/50 text-[#87BCDE] font-semibold text-sm hover:bg-[#87BCDE] hover:text-black transition-all shadow-lg"
                >
                  <BookOpen size={16} />
                  <span>Case Study</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
