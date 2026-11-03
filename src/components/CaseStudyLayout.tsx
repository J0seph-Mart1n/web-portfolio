"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  Code2, 
  Menu, 
  X, 
  Cpu, 
  Layers, 
  Activity, 
  User, 
  FolderGit2,
  Home,
  Terminal
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { ProjectData, projectsData } from '@/data/projects';

const PROJECT_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'persona-ai': Cpu,
  'auction-manager': Layers,
  'vitality': Activity,
};

export function CaseStudyLayout({ 
  project, 
  children 
}: { 
  project: ProjectData;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const allProjects = Object.values(projectsData);
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div 
      className="min-h-screen bg-[#FAF7E8] text-black font-sans selection:bg-[#FFEE00] selection:text-black flex flex-col md:flex-row relative"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px'
      }}
    >
      {/* MOBILE TOP BAR */}
      <div className="md:hidden sticky top-0 z-50 bg-[#FAF7E8] border-b-2 border-black px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 bg-[#FFFFF8] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            aria-label="Toggle Projects Sidebar"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <span className="font-mono font-black text-sm uppercase tracking-wider text-black">
            JOSEPH.OS // {project.code}
          </span>
        </div>
        <Link
          href="/#projects"
          className="px-2.5 py-1 bg-[#FFEE00] border-2 border-black font-mono text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]"
        >
          &larr; HOME
        </Link>
      </div>

      {/* MOBILE BACKDROP */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* PERSONA LEFT SIDEBAR SHOWCASING ALL PROJECTS */}
      <aside 
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-72 bg-[#FAF7E8] border-r-2 border-black flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Section: Brand + Project Navigation */}
        <div className="flex flex-col">
          {/* Brand Header (Mirrors 1_Dashboard.png top-left) */}
          <div className="px-6 py-5 border-b-2 border-black flex items-center justify-between bg-[#FFFFF8]">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-7 h-7 bg-[#FFEE00] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                <Terminal size={14} className="text-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-base tracking-tight text-black leading-none">
                  Persona.OS
                </span>
                <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest mt-0.5">
                  CASE STUDY ARCHIVE
                </span>
              </div>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 border border-black bg-[#FAF7E8]"
              aria-label="Close Sidebar"
            >
              <X size={16} />
            </button>
          </div>

          {/* Section Label */}
          <div className="px-6 pt-6 pb-2 flex items-center justify-between font-mono text-[10px] font-black text-neutral-600 uppercase tracking-widest">
            <span>// ALL PROTOCOLS</span>
            <span className="px-1.5 py-0.5 bg-[#FFFFF8] border border-black text-black">
              0{allProjects.length}
            </span>
          </div>

          {/* Projects List */}
          <nav className="px-3 py-2 flex flex-col gap-2">
            {allProjects.map((item) => {
              const isActive = item.slug === project.slug;
              const IconComponent = PROJECT_ICONS[item.slug] || FolderGit2;

              return (
                <Link
                  key={item.slug}
                  href={`/projects/${item.slug}`}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex flex-col p-3.5 transition-all relative ${
                    isActive
                      ? 'bg-[#FFEE00] border-2 border-black shadow-[4px_4px_0px_#000] text-black'
                      : 'bg-[#FFFFF8] hover:bg-[#FFEE00]/35 border-2 border-black/80 hover:border-black text-neutral-800 hover:shadow-[3px_3px_0px_#000] hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <IconComponent size={16} className="text-black shrink-0" />
                      <span className="font-black text-sm uppercase tracking-tight text-black">
                        {item.title}
                      </span>
                    </div>
                    <span className={`font-mono text-[10px] px-1.5 py-0.5 border border-black ${
                      isActive ? 'bg-[#FFFFF8] text-black font-black' : 'bg-[#FAF7E8] text-neutral-600 font-bold'
                    }`}>
                      {item.code}
                    </span>
                  </div>

                  <div className="font-mono text-[10px] font-bold text-neutral-700 uppercase tracking-wider pl-6 truncate">
                    {item.badge}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Active Project Quick Telemetry Box */}
          <div className="mx-3 mt-4 p-3.5 bg-[#FFFFF8] border-2 border-black shadow-[3px_3px_0px_#000]">
            <div className="flex items-center gap-2 font-mono text-[10px] font-black uppercase text-neutral-600 pb-2 mb-2 border-b border-black/20">
              <span className="w-2 h-2 bg-[#FFEE00] border border-black" />
              <span>ACTIVE TELEMETRY</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-neutral-500">NODE:</span>
                <span className="font-bold text-black uppercase">{project.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">STACK NODES:</span>
                <span className="font-bold text-black">{project.tech.length} MODULES</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">STATUS:</span>
                <span className="font-bold text-black bg-[#FFEE00] px-1 border border-black text-[9px]">DEPLOYED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Navigation & User Footer (Mirrors 1_Dashboard.png bottom-left) */}
        <div className="p-4 border-t-2 border-black bg-[#FFFFF8] flex flex-col gap-2">
          <Link
            href="/#projects"
            className="flex items-center gap-3 px-3 py-2 font-mono text-xs font-bold text-neutral-800 hover:text-black hover:bg-[#FFEE00]/50 border border-transparent hover:border-black transition-all uppercase tracking-wider"
          >
            <Home size={15} />
            <span>Back to Portfolio</span>
          </Link>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 font-mono text-xs font-bold text-neutral-800 hover:text-black hover:bg-[#FFEE00]/50 border border-transparent hover:border-black transition-all uppercase tracking-wider"
          >
            <FaGithub size={15} />
            <span>GitHub Repository</span>
          </a>

          <div className="pt-2 mt-1 border-t border-black/20 flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full border-2 border-black bg-[#FFEE00] flex items-center justify-center">
                <User size={13} className="text-black" />
              </div>
              <span className="font-mono text-xs font-bold text-black">Joseph Martin</span>
            </div>
            <span className="w-2 h-2 bg-[#FFEE00] border border-black" title="System Online" />
          </div>
        </div>
      </aside>

      {/* MAIN CASE STUDY CONTENT AREA */}
      <main className="flex-1 min-w-0 py-8 md:py-14 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Top Breadcrumb Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Link 
              href="/#projects" 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFF8] hover:bg-[#FFEE00] border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all"
            >
              <ArrowLeft size={14} />
              <span>RETURN TO PROTOCOLS</span>
            </Link>

            <div className="flex items-center gap-2 font-mono text-xs font-bold bg-[#FFFFF8] border-2 border-black shadow-[3px_3px_0px_#000] px-3 py-1.5">
              <span className="w-2 h-2 bg-[#FFEE00] border border-black" />
              <span>CASE STUDY // {project.code}</span>
            </div>
          </div>

          {/* Main Neo-Brutalist Protocol Container Card (Modeled on 5_Result.png) */}
          <div className="bg-[#FFFFF8] border-2 border-black shadow-[8px_8px_0px_#000] relative overflow-hidden">
            {/* Top Yellow Accent Bar */}
            <div className="w-full h-3 bg-[#FFEE00] border-b-2 border-black" />

            <div className="p-6 sm:p-8 md:p-12">
              {/* Header */}
              <header className="mb-12">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#FFEE00] border border-black font-mono text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_#000]">
                    {project.badge}
                  </span>
                  <span className="px-2.5 py-1 bg-[#FAF7E8] border border-black font-mono text-xs font-bold text-neutral-700">
                    [{project.code}]
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-black mb-6 leading-none">
                  {project.title}
                </h1>

                <div className="border-l-4 border-[#FFEE00] pl-4 py-1 mb-8 bg-[#FAF7E8]/60">
                  <p className="text-base md:text-lg text-neutral-800 font-medium leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div className="mb-8">
                  <div className="font-mono text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2.5">
                    // COMPILED TECH STACK
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t: string) => (
                      <span 
                        key={t}
                        className="px-3 py-1.5 bg-[#FAF7E8] border border-black text-black font-mono text-xs font-bold shadow-[2px_2px_0px_#000]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#FFEE00] hover:bg-[#FAFF00] text-black font-mono font-bold text-xs md:text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                  >
                    <Code2 size={18} />
                    <span>VIEW SOURCE CODE</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </header>

              {/* Executive Summary: Challenge / Solution / Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
                <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-5 flex flex-col">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-black/20 font-mono text-xs font-black uppercase text-black">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#FFEE00] border border-black" />
                      THE CHALLENGE
                    </span>
                    <span className="text-[10px] text-neutral-500">[01]</span>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-700 leading-relaxed font-medium">
                    {project.challenge}
                  </p>
                </div>

                <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-5 flex flex-col">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-black/20 font-mono text-xs font-black uppercase text-black">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#FFEE00] border border-black" />
                      THE SOLUTION
                    </span>
                    <span className="text-[10px] text-neutral-500">[02]</span>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-700 leading-relaxed font-medium">
                    {project.solution}
                  </p>
                </div>

                <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-5 flex flex-col">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-black/20 font-mono text-xs font-black uppercase text-black">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#FFEE00] border border-black" />
                      KEY RESULTS
                    </span>
                    <span className="text-[10px] text-neutral-500">[03]</span>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-700 leading-relaxed font-medium">
                    {project.results}
                  </p>
                </div>
              </div>

              <div className="w-full h-0.5 bg-black mb-12" />

              {/* Unique Project Content */}
              <div className="space-y-16">
                {children}
              </div>

              {/* Footer / Next Protocol Navigation */}
              <footer className="mt-20 pt-8 border-t-2 border-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                    END OF SPECIFICATION // {project.code}
                  </div>
                  <div className="font-black text-sm uppercase text-black">
                    {project.title} — Production Case Study
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link 
                    href="/#projects" 
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF7E8] hover:bg-neutral-200 text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] transition-all"
                  >
                    <ArrowLeft size={14} />
                    <span>ALL PROJECTS</span>
                  </Link>

                  {nextProject && (
                    <Link 
                      href={`/projects/${nextProject.slug}`} 
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFEE00] hover:bg-[#FAFF00] text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                      <span>NEXT: {nextProject.title}</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </footer>

            </div>

            {/* Bottom Status Bar */}
            <div className="w-full py-2.5 px-6 bg-neutral-100 border-t-2 border-black flex flex-wrap justify-between items-center font-mono text-[10px] text-neutral-600 gap-2">
              <span>JOSEPH.OS // CASE STUDY SPECIFICATION</span>
              <span>PROTOCOL STATUS: VERIFIED</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
