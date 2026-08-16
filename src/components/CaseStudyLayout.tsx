import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2 } from 'lucide-react';
import { ProjectData } from '@/data/projects';

export function CaseStudyLayout({ 
  project, 
  children 
}: { 
  project: ProjectData;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black text-gray-200 font-sans selection:bg-[#87BCDE]/30 pb-20 relative">
      {/* V2 Tech Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none bg-black bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, ${project.color}30 0%, transparent 70%),
            linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.9)),
            url('/images/Space_Wallpaper.jpg')
          `
        }}
      />
      
      {/* Subtle Grid Overlay */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div 
          className="rounded-3xl border border-white/5 bg-zinc-900/60 backdrop-blur-xl shadow-2xl p-6 md:p-12 relative overflow-hidden"
          style={{ boxShadow: `0 0 50px -15px ${project.color}30` }}
        >
          {/* Subtle project color glow inside the card */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${project.color} 0%, transparent 60%)`
            }}
          />
          <div className="relative z-10">
            {/* Navigation */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs md:text-sm font-mono tracking-[0.15em] uppercase text-zinc-500 hover:text-white transition-colors mb-12 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
              Back to Home
            </Link>

            {/* Header */}
            <header className="mb-16">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <h1 
                  className="text-4xl md:text-6xl font-heading font-bold text-white tracking-wide"
                  style={{ textShadow: `0 0 40px ${project.color}66` }}
                >
                  {project.title}
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-zinc-400 font-sans font-light leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t: string) => (
                  <span 
                    key={t}
                    className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 rounded-full font-mono text-xs shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-none font-mono text-sm tracking-[0.2em] uppercase border transition-all duration-500 group relative overflow-hidden bg-transparent"
                  style={{ 
                    borderColor: `${project.color}50`, 
                    color: project.color,
                    boxShadow: `0 0 15px ${project.color}10` 
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Code2 size={18} />
                    View Source Code
                  </span>
                  <div 
                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"
                    style={{ backgroundColor: `${project.color}15` }}
                  />
                </a>
              </div>
            </header>

            {/* Unique Project Content */}
            <div className="space-y-16">
              {children}
            </div>

            {/* Next Steps / Footer */}
            <footer className="mt-24 pt-8 border-t border-white/5 flex justify-between items-center">
              <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">Case Study — {project.title}</p>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-xs md:text-sm font-mono tracking-[0.15em] uppercase transition-colors group hover:brightness-125"
                style={{ color: project.color }}
              >
                Back to Portfolio
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </footer>

          </div>
        </div>
      </div>
    </main>
  );
}
