import React from 'react';
import { motion } from 'motion/react';
import Marquee from 'react-fast-marquee';
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, 
  SiTailwindcss, SiPython, SiFastapi, SiGo, 
  SiNeo4J, SiPostgresql, SiMongodb, SiDocker, 
  SiFirebase, SiOllama 
} from 'react-icons/si';

const skills = [
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
  { name: "Go", Icon: SiGo, color: '#00ADD8' },
  { name: "Neo4J", Icon: SiNeo4J, color: '#018BFF' },
  { name: "PostgreSQL", Icon: SiPostgresql, color: '#4169E1' },
  { name: "MongoDB", Icon: SiMongodb, color: '#47A248' },
  { name: "Docker", Icon: SiDocker, color: '#2496ED' },
  { name: "Firebase", Icon: SiFirebase, color: '#FFCA28' },
  { name: "Ollama", Icon: SiOllama },
];

export function V2Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto"
    >
      <h3 className="font-heading text-4xl md:text-5xl text-white font-bold mb-12 text-center">
        Skills
        <div className="w-24 h-1 bg-[#87BCDE] mx-auto mt-4 rounded-full"></div>
      </h3>
      
      <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl py-12 overflow-hidden shadow-2xl">
        <Marquee 
          gradient={true}
          gradientColor="black"
          gradientWidth={100}
          speed={50} 
          pauseOnHover={true}
        >
          {skills.map(skill => (
            <div 
              key={skill.name} 
              className="flex flex-col items-center justify-center mx-10 md:mx-16 group cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <skill.Icon 
                size={50} 
                color={skill.color || 'white'} 
                className="mb-4 drop-shadow-md opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-sans text-sm md:text-base font-semibold text-white/80 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </motion.div>
  );
}
