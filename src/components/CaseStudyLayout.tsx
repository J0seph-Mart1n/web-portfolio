import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2 } from 'lucide-react';
import { MountainSilhouette } from '@/components/MountainSilhouette';
import { ProjectData } from '@/data/projects';

export function CaseStudyLayout({ 
  project, 
  children 
}: { 
  project: ProjectData;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen text-gray-200 font-sans selection:bg-white/20 pb-20 relative">
      {/* Land Background matching Projects Section */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #87CEEB 0%, #a8d8ea 20%, #c9e8f0 35%, #e8f4f0 50%, #b8d4a8 60%, #7ab648 70%, #4a8c4b 80%, #3d6b3e 90%, #2d4a2e 100%)'
        }}
      />
      
      {/* Background Objects matching Projects Section */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80 flex items-end justify-center overflow-hidden">
        <div className="w-full min-w-[1440px]">
          <MountainSilhouette />
        </div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div 
          className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md shadow-2xl p-6 md:p-12 relative overflow-hidden"
          style={{ boxShadow: `0 0 40px -10px ${project.color}40` }}
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
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-12 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            {/* Header */}
            <header className="mb-16">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <h1 
                  className="text-4xl md:text-6xl font-black text-white tracking-tight"
                  style={{ textShadow: `0 0 30px ${project.color}66` }}
                >
                  {project.title}
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t: string) => (
                  <span 
                    key={t}
                    className="px-4 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm"
                    style={{
                      backgroundColor: `${project.color}15`,
                      borderColor: `${project.color}40`,
                      color: project.color
                    }}
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all hover:scale-105"
                  style={{ backgroundColor: `${project.color}cc`, boxShadow: `0 4px 20px ${project.color}40` }}
                >
                  <Code2 size={20} />
                  View Source Code
                </a>
              </div>
            </header>

            {/* Unique Project Content */}
            <div className="space-y-16">
              {children}
            </div>

            {/* Next Steps / Footer */}
            <footer className="mt-24 pt-8 border-t border-white/10 flex justify-between items-center">
              <p className="text-gray-500 text-sm">Case Study — {project.title}</p>
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors group"
                style={{ color: project.color }}
              >
                Back to Portfolio
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </footer>

          </div>
        </div>
      </div>
    </main>
  );
}
