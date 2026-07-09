import React from 'react';

export function ProjectsSection() {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A layered parallax portfolio built with Next.js and React Spring',
      tech: ['Next.js', 'React Spring', 'Tailwind CSS'],
      color: '#87BCDE',
    },
    {
      title: 'Project Alpha',
      description: 'Full-stack web application with real-time data processing',
      tech: ['React', 'Node.js', 'MongoDB'],
      color: '#5a9e5b',
    },
    {
      title: 'Project Beta',
      description: 'Automated testing framework with CI/CD pipeline integration',
      tech: ['TypeScript', 'Jest', 'Docker'],
      color: '#f7c948',
    },
  ]

  return (
    <div style={{ 
      width: '100%', 
      padding: '2rem 4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 800, 
        color: '#fff', 
        marginBottom: '2rem',
        textShadow: '0 2px 10px rgba(0,0,0,0.3)',
        borderBottom: '3px solid #5a9e5b',
        paddingBottom: '0.5rem',
      }}>
        Projects
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem',
        width: '100%',
        maxWidth: '1000px',
      }}>
        {projects.map((project, i) => (
          <div
            key={project.title}
            style={{
              background: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: `1px solid ${project.color}44`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 ${project.color}22`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'
              e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 ${project.color}44, 0 0 20px ${project.color}22`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 ${project.color}22`
            }}
          >
            <div style={{ 
              fontSize: '1.3rem', 
              fontWeight: 700, 
              color: project.color,
              marginBottom: '0.5rem',
            }}>
              {project.title}
            </div>
            <div style={{ 
              fontSize: '0.9rem', 
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '1rem',
              lineHeight: 1.5,
            }}>
              {project.description}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  background: `${project.color}22`,
                  color: project.color,
                  fontWeight: 600,
                  border: `1px solid ${project.color}33`,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
