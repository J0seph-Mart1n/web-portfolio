import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2, Layers, Cpu } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Placeholder Case Study Data
  const projectsData: Record<string, any> = {
    'persona-ai': {
      title: 'Persona.ai',
      description: 'An offline, AI-powered desktop application that builds and visualizes a personalized psychological knowledge graph.',
      tech: ['Next.js', 'Electron', 'Neo4j', 'Ollama', 'Tailwind'],
      color: '#ff2a85',
      github: 'https://github.com/J0seph-Mart1n/PersonaLocalApp',
      challenge: 'Users lack a private, secure way to build a personal psychological profile without relying on cloud APIs. Integrating local LLMs with a graph database (Neo4j) efficiently on desktop hardware posed significant performance constraints.',
      solution: 'Packaged Next.js within Electron to provide a native desktop feel. Connected to local Ollama instances to run open-source models privately. Used Neo4j for structuring user conversations into a rich, queryable knowledge graph.',
      results: 'Achieved 100% offline functionality. Users can visualize their own cognitive biases, recurring thoughts, and traits through a highly interactive, private graph UI.',
    },
    'auction-manager': {
      title: 'Auction Manager',
      description: 'A full-stack web application featuring a Vue 3 frontend for real-time auction tracking and a Node.js/PostgreSQL backend.',
      tech: ['Vue 3', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Prisma'],
      color: '#9d4edd',
      github: 'https://github.com/J0seph-Mart1n/AuctionManager',
      challenge: 'Handling real-time bid updates, concurrent users, and ensuring transactional integrity during the final seconds of an auction is technically demanding and prone to race conditions.',
      solution: 'Implemented a robust Node.js backend using PostgreSQL with strict transaction isolation levels. Used Prisma as the ORM to ensure type safety from the database to the Vue 3 frontend. Implemented real-time updates to synchronize all clients.',
      results: 'The platform successfully handles concurrent bid requests with zero data loss. The Vue 3 frontend delivers a seamless, reactive user experience, boosting user engagement during live auctions.',
    },
    'vitality': {
      title: 'Vitality',
      description: 'An AI-powered health and nutrition tracker featuring a React Native frontend and a Go/MongoDB backend utilizing Llama 4.',
      tech: ['React Native', 'Expo', 'Go', 'MongoDB', 'Firebase', 'LLaMA'],
      color: '#ffaa00',
      github: 'https://github.com/J0seph-Mart1n/Vitality',
      challenge: 'Manually logging food is tedious. Users needed a frictionless way to track nutrition simply by scanning labels or describing their meals, requiring fast and accurate multimodal AI processing.',
      solution: 'Built a cross-platform React Native app. Developed a highly concurrent Go backend to handle API requests efficiently. Integrated Groq\'s fast Llama 4 APIs to parse food labels and unstructured text into structured nutritional data stored in MongoDB.',
      results: 'Reduced logging time by 80% compared to traditional manual entry apps. The Go backend handles requests with sub-50ms latency (excluding AI generation time), resulting in a snappy, responsive user experience.',
    }
  };

  const project = projectsData[slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050510] text-gray-200 font-sans selection:bg-white/20 pb-20">
      {/* Background gradients */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.color} 0%, transparent 60%)`
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
        
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

        {/* Content Sections */}
        <div className="space-y-16">
          
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
    </main>
  );
}
