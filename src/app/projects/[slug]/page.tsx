import React from 'react';
import { notFound } from 'next/navigation';
import { projectsData } from '@/data/projects';
import { CaseStudyLayout } from '@/components/CaseStudyLayout';

// Import specific project content components
import { PersonaAI } from '@/components/case-studies/PersonaAI';
import { AuctionManager } from '@/components/case-studies/AuctionManager';
import { Vitality } from '@/components/case-studies/Vitality';

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const project = projectsData[slug];

  if (!project) {
    notFound();
  }

  // Map slugs to their specific content components
  const ContentComponent = (() => {
    switch (slug) {
      case 'persona-ai':
        return <PersonaAI project={project} />;
      case 'auction-manager':
        return <AuctionManager project={project} />;
      case 'vitality':
        return <Vitality project={project} />;
      default:
        return null; // Should not reach here due to notFound()
    }
  })();

  return (
    <CaseStudyLayout project={project}>
      {ContentComponent}
    </CaseStudyLayout>
  );
}
