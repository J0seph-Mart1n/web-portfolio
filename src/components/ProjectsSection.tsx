import React from 'react';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export function ProjectsSection() {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A highly interactive, layered parallax portfolio built with Next.js and React Spring. Features deep space, dynamic landscapes, and underground magma layers.',
      tech: ['Next.js', 'React Spring', 'Tailwind CSS', 'Framer Motion'],
      color: '#87BCDE',
      github: '#',
      live: '#',
    },
    {
      title: 'Project Alpha',
      description: 'Full-stack web application with real-time data processing, complex state management, and an integrated CI/CD deployment pipeline.',
      tech: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
      color: '#5a9e5b',
      github: '#',
      live: '#',
    },
    {
      title: 'Project Beta',
      description: 'Automated testing framework providing robust end-to-end testing with seamless Docker containerization and comprehensive reporting.',
      tech: ['TypeScript', 'Jest', 'Docker', 'GitHub Actions'],
      color: '#f7c948',
      github: '#',
      live: '#',
    },
  ];

  return (
    <div className="w-full px-4 md:px-8 py-2 flex flex-col items-center z-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 drop-shadow-lg inline-block border-b-2 pb-1" style={{ borderColor: '#5a9e5b' }}>
          Featured Projects
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mt-2 text-sm">
          A showcase of my recent work, highlighting full-stack development, creative coding, and modern web architectures.
        </p>
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-6">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`flex flex-col gap-4 md:gap-8 items-center ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
          >
            {/* Image Side Placeholder */}
            <div className="w-full md:w-[45%] group">
              <div 
                className="relative w-full h-32 md:h-40 rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:scale-[1.02]"
                style={{
                  boxShadow: `0 0 20px -10px ${project.color}33`,
                }}
              >
                {/* Glow Effect on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${project.color}22 0%, transparent 70%)`
                  }}
                />
                <div className="flex flex-col items-center text-gray-500 gap-2 transition-transform duration-500 group-hover:-translate-y-1">
                  <FolderGit2 size={32} style={{ color: project.color, opacity: 0.8 }} />
                  <span className="text-xs font-medium tracking-widest uppercase opacity-60">Image</span>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-[55%] flex flex-col justify-center space-y-2">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>
                  {project.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tech.map(t => (
                  <span 
                    key={t} 
                    className="inline-flex items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold backdrop-blur-md transition-colors"
                    style={{
                      backgroundColor: `${project.color}15`,
                      borderColor: `${project.color}44`,
                      color: project.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex gap-3 pt-2">
                <a 
                  href={project.github}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs transition-all duration-300 border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white"
                >
                  <FaGithub size={14} />
                  <span>Code</span>
                </a>
                <a 
                  href={project.live}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs transition-all duration-300 shadow-sm text-white"
                  style={{
                    backgroundColor: `${project.color}cc`,
                    boxShadow: `0 2px 8px 0 ${project.color}4d`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = project.color;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = `0 4px 12px 0 ${project.color}66`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${project.color}cc`;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 2px 8px 0 ${project.color}4d`;
                  }}
                >
                  <ExternalLink size={14} />
                  <span>Preview</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
