import React from 'react';
import { motion } from 'motion/react';
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, 
  SiTailwindcss, SiPython, SiFastapi, SiGo, 
  SiNeo4J, SiPostgresql, SiMongodb, SiDocker, 
  SiFirebase, SiOllama,
  SiJest, SiCypress
} from 'react-icons/si';

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
      { name: "Go", Icon: SiGo, color: '#00ADD8' },
    ]
  },
  {
    title: "Databases & Tools",
    skills: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: '#4169E1' },
      { name: "MongoDB", Icon: SiMongodb, color: '#47A248' },
      { name: "Neo4J", Icon: SiNeo4J, color: '#018BFF' },
      { name: "Firebase", Icon: SiFirebase, color: '#FFCA28' },
      { name: "Docker", Icon: SiDocker, color: '#2496ED' },
      { name: "Ollama", Icon: SiOllama },
    ]
  },
  {
    title: "Testing",
    skills: [
      { name: "Jest", Icon: SiJest, color: "#C21325" },
      { name: "Cypress", Icon: SiCypress, color: "#17202C" },
    ]
  }
];

export function V2Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto py-12 px-4"
    >
      <h3 className="font-heading text-4xl md:text-5xl text-white font-bold mb-16 text-center">
        Skills
        <div className="w-24 h-1 bg-[#87BCDE] mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(135,188,222,0.8)]"></div>
      </h3>
      
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col space-y-4 w-full max-w-4xl mx-auto">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="flex flex-col">
            <h4 className="text-lg md:text-xl font-heading font-bold text-white mb-2 border-b border-white/10 pb-2">
              {category.title}
            </h4>
            
            <div className="flex flex-wrap gap-6 md:gap-8 justify-center md:justify-start">
              {category.skills.map((skill) => (
                <div 
                  key={skill.name} 
                  className="flex flex-col items-center justify-center group cursor-pointer w-[70px]"
                >
                  <skill.Icon 
                    size={35} 
                    color={skill.color || 'white'} 
                    className="mb-3 opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 drop-shadow-lg"
                  />
                  <span className="font-sans text-[11px] md:text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors text-center leading-tight">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
