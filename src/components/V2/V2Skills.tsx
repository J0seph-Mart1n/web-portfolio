import React from 'react';
import { motion } from 'motion/react';
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, 
  SiTailwindcss, SiPython, SiFastapi, SiGo, 
  SiNeo4J, SiPostgresql, SiMongodb, SiDocker, 
  SiFirebase, SiOllama,
  SiSqlite,
  SiSelenium, SiRobotframework, SiJirasoftware, SiJenkins
} from 'react-icons/si';
import { TbBrandReactNative } from "react-icons/tb";
import { FaJava } from "react-icons/fa";

const skillCategories = [
  {
    title: "FRONTEND FRAMEWORKS",
    code: "SEC-01",
    skills: [
      { name: 'React', Icon: SiReact },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: "React Native", Icon: TbBrandReactNative },
    ]
  },
  {
    title: "BACKEND & RUNTIMES",
    code: "SEC-02",
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Python', Icon: SiPython },
      { name: 'FastAPI', Icon: SiFastapi },
      { name: "Go", Icon: SiGo },
      { name: "Java", Icon: FaJava },
    ]
  },
  {
    title: "DATABASES & LOCAL AI",
    code: "SEC-03",
    skills: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Neo4j Graph", Icon: SiNeo4J },
      { name: "Docker", Icon: SiDocker },
      { name: "Ollama LLM", Icon: SiOllama },
      { name: "Firebase", Icon: SiFirebase },
      { name: "SQLite", Icon: SiSqlite },
    ]
  },
  {
    title: "TEST AUTOMATION & CI/CD",
    code: "SEC-04",
    skills: [
      { name: "Selenium", Icon: SiSelenium },
      { name: "Robot Framework", Icon: SiRobotframework },
      { name: "Jenkins CI", Icon: SiJenkins },
      { name: "Jira Software", Icon: SiJirasoftware },
    ]
  }
];

export function V2Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto py-12 px-4"
    >
      {/* Persona Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold mb-2">
          <span className="w-2.5 h-2.5 bg-[#FFEE00] border border-black" />
          SYSTEM INVENTORY // TECHNICAL CAPABILITIES
        </div>
        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black">
          SKILLS & STACK
        </h3>
        <div className="w-20 h-1.5 bg-[#FFEE00] border border-black mx-auto mt-3" />
      </div>
      
      {/* Main Container Card */}
      <div className="bg-[#FFFFF8] border-2 border-black shadow-[6px_6px_0px_#000] p-6 md:p-10 relative overflow-hidden flex flex-col gap-8">
        {/* Top Accent Stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#FFEE00] border-b-2 border-black" />

        {skillCategories.map((category) => (
          <div key={category.title} className="flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-black/20">
              <h4 className="font-mono text-xs md:text-sm font-black text-black tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FFEE00] border border-black" />
                <span>{category.title}</span>
              </h4>
              <span className="font-mono text-[10px] text-neutral-500 font-bold">
                [{category.code}]
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {category.skills.map((skill) => (
                <div 
                  key={skill.name} 
                  className="flex items-center gap-3 p-3 bg-[#FAF7E8] border border-black hover:bg-[#FFEE00] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                >
                  <skill.Icon 
                    size={22} 
                    className="text-black group-hover:scale-110 transition-transform shrink-0"
                  />
                  <span className="font-mono text-xs font-bold text-black uppercase tracking-tight truncate">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom Status bar */}
        <div className="pt-4 border-t border-black/15 flex flex-wrap items-center justify-between font-mono text-[10px] text-neutral-600 gap-2">
          <span>21 NODES ACTIVE &bull; PRODUCTION VERIFIED</span>
          <span>SYSTEM BENCHMARK: 99.4% OPTIMIZED</span>
        </div>
      </div>
    </motion.div>
  );
}
