import React from 'react';
import { ProjectData } from '@/data/projects';
import { ImageSlider } from '@/components/ImageSlider';

const personaImages = [
  { src: '/images/Persona/1_Dashboard.png', caption: 'Dashboard Page' },
  { src: '/images/Persona/2_Chat.png', caption: 'Chat Page' },
  { src: '/images/Persona/3_Traits.png', caption: 'Traits Page' },
  { src: '/images/Persona/4_Assessment.png', caption: 'Assessment Page' },
  { src: '/images/Persona/5_Result.png', caption: 'Assessment Results of the User' },
  { src: '/images/Persona/6_MBTI.png', caption: 'MBTI Page' },
  { src: '/images/Persona/7_Settings.png', caption: 'Settings Page' },
];

export function PersonaAI({ project }: { project: ProjectData }) {
  return (
    <>
      <ImageSlider images={personaImages} color={project.color} />

      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Introduction
        </h2>
        <div className="text-neutral-800 leading-relaxed text-base md:text-lg space-y-4 font-medium">
          <p>
            During the 4th year of college, my team decided to build a Personalized AI Assistant capable of understanding a user&apos;s behavior and tailoring responses accordingly.
          </p>
          <p>
            We initially implemented reinforcement learning in the backend server so that user feedback shaped subsequent outputs. During the later stages of the project, I explored Retrieval-Augmented Generation (RAG) and Graph RAG architectures.
          </p>
          <p>
            While the initial academic scope centered on reinforcement learning, I independently architected Persona around a full Graph RAG pipeline to unlock deep, persistent psychological and domain context.
          </p>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Project Architecture
        </h2>
        <div className="w-full border-2 border-black bg-[#FAF7E8] shadow-[6px_6px_0px_#000] p-4 md:p-6 overflow-hidden relative">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-3 pb-2 border-b border-black/20 flex justify-between">
            <span>// SYSTEM TOPOLOGY DIAGRAM</span>
            <span>[ARCH-01]</span>
          </div>
          <img 
            src="/images/Persona/Architecture.png" 
            alt="Persona AI Architecture Diagram" 
            className="w-full h-auto object-cover border border-black"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Core Concepts
        </h2>
        
        <div className="space-y-6">
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-xl font-black uppercase text-black mb-3 pl-2">Retrieval-Augmented Generation (RAG)</h3>
            <p className="text-neutral-800 leading-relaxed mb-4 pl-2 font-medium">
              RAG is a breakthrough AI architecture that bridges the gap between a Large Language Model&apos;s fixed training data and your specific, private information. 
            </p>
            <p className="text-neutral-800 leading-relaxed pl-2 font-medium">
              Instead of relying on general knowledge, RAG dynamically searches a targeted Knowledge Graph—such as a user&apos;s specific interests, technical skills, or viewing habits—and injects that exact context into the prompt before the AI answers. This ensures the output is deeply personalized and factually grounded.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-xl font-black uppercase text-black mb-3 pl-2">Myers-Briggs Type Indicator (MBTI)</h3>
            <p className="text-neutral-800 leading-relaxed mb-4 pl-2 font-medium">
              The MBTI is a widely recognized psychological framework used to categorize how people perceive the world and make decisions. Persona uses a custom assessment to establish a baseline psychological profile of the user across four dichotomies, resulting in eight core cognitive traits:
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm font-mono font-bold text-black pl-2">
              <li className="flex items-center gap-2 bg-[#FFFFF8] border border-black p-2 shadow-[2px_2px_0px_#000]"><span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" /> Extroversion (E)</li>
              <li className="flex items-center gap-2 bg-[#FFFFF8] border border-black p-2 shadow-[2px_2px_0px_#000]"><span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" /> Introversion (I)</li>
              <li className="flex items-center gap-2 bg-[#FFFFF8] border border-black p-2 shadow-[2px_2px_0px_#000]"><span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" /> Sensing (S)</li>
              <li className="flex items-center gap-2 bg-[#FFFFF8] border border-black p-2 shadow-[2px_2px_0px_#000]"><span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" /> Intuition (N)</li>
              <li className="flex items-center gap-2 bg-[#FFFFF8] border border-black p-2 shadow-[2px_2px_0px_#000]"><span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" /> Thinking (T)</li>
              <li className="flex items-center gap-2 bg-[#FFFFF8] border border-black p-2 shadow-[2px_2px_0px_#000]"><span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" /> Feeling (F)</li>
              <li className="flex items-center gap-2 bg-[#FFFFF8] border border-black p-2 shadow-[2px_2px_0px_#000]"><span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" /> Judging (J)</li>
              <li className="flex items-center gap-2 bg-[#FFFFF8] border border-black p-2 shadow-[2px_2px_0px_#000]"><span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" /> Perceiving (P)</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          About the Project
        </h2>
        
        <p className="text-neutral-800 leading-relaxed text-base md:text-lg mb-8 font-medium">
          Persona constructs a highly detailed, multi-dimensional Knowledge Graph of the user by understanding their psychological traits, professional domains, and specific technical skills.
        </p>

        <div className="space-y-8">
          {/* Backend Sub-section */}
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 md:p-8 relative overflow-hidden">
            <div className="w-full h-1.5 bg-[#FFEE00] border-b border-black absolute top-0 left-0 right-0" />
            <h3 className="text-2xl font-black uppercase text-black mb-4 mt-2">Backend Architecture</h3>
            <p className="text-neutral-800 leading-relaxed mb-6 font-medium">
              The backend is a Node.js and Express server consisting of three major pillars:
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-black uppercase text-black mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  Multi-Modal Data Ingestion
                </h4>
                <p className="text-neutral-800 leading-relaxed mb-2 font-medium">To build an accurate profile of a user, several ingestion pipelines were engineered:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-800 font-medium">
                  <li><strong className="font-bold text-black">Interactive Assessments:</strong> A custom MBTI cognitive profiling quiz.</li>
                  <li><strong className="font-bold text-black">Headless Social Scraping:</strong> Using Playwright and stealth plugins, the backend scrapes public URLs (like a GitHub profile) to understand open-source contributions and coding interests.</li>
                  <li><strong className="font-bold text-black">Resume Parsing:</strong> Using multer and pdf-parse, users can upload PDF resumes directly.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-black uppercase text-black mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  LLM Intelligence &amp; Vector Embeddings
                </h4>
                <p className="text-neutral-800 leading-relaxed mb-2 font-medium">
                  Once raw unstructured text is collected (from a resume or GitHub profile), the data is processed by Llama 3.3 70B. The LLM is prompted as a behavioral analyst, extracting specific Traits, Domains (e.g., Software Engineering), and Entities (e.g., React.js).
                </p>
                <p className="text-neutral-800 leading-relaxed font-medium">
                  To give this data mathematical meaning, HuggingFace (<code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">BAAI/bge-small-en-v1.5</code>) generates semantic vector embeddings to build a knowledge graph of traits and entities.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-black uppercase text-black mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  Neo4j &amp; Graph RAG
                </h4>
                <p className="text-neutral-800 leading-relaxed mb-2 font-medium">
                  All extracted nodes are mapped into a Neo4j Graph Database with relationships structured as:
                  <code className="font-mono text-xs text-black bg-[#FFEE00] border border-black px-2 py-0.5 ml-1 font-bold">[User] &rarr; [Domain] &rarr; [Entity]</code> and <code className="font-mono text-xs text-black bg-[#FFEE00] border border-black px-2 py-0.5 ml-1 font-bold">[User] &rarr; [Trait]</code>.
                </p>
                <p className="text-neutral-800 leading-relaxed font-medium">
                  When a user asks the AI a question, the backend converts the query into a vector, searches the Neo4j database for the most semantically relevant nodes connected to that specific user, and injects that graph data into the LLM prompt.
                </p>
              </div>
            </div>
          </div>

          {/* Frontend Sub-section */}
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 md:p-8 relative overflow-hidden">
            <div className="w-full h-1.5 bg-[#FFEE00] border-b border-black absolute top-0 left-0 right-0" />
            <h3 className="text-2xl font-black uppercase text-black mb-4 mt-2">Frontend Implementation</h3>
            <p className="text-neutral-800 leading-relaxed mb-6 font-medium">
              The frontend was built using Next.js, React 19, and Tailwind CSS.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-black uppercase text-black mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  Visualizing the Graph
                </h4>
                <p className="text-neutral-800 leading-relaxed font-medium">
                  Because a Knowledge Graph is inherently visual, I integrated <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">react-force-graph</code> (both 2D and 3D) alongside Three.js. The central node is the User, branching out into active Domains and specific Entities.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-black uppercase text-black mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  Seamless Integration
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-neutral-800 mt-2 font-medium">
                  <li><strong className="font-bold text-black">Authentication:</strong> Firebase Auth.</li>
                  <li><strong className="font-bold text-black">Settings &amp; Sync:</strong> A dedicated hub where users upload resumes or drop in GitHub URLs to trigger backend ingestion pipelines.</li>
                  <li><strong className="font-bold text-black">Context-Aware Chat:</strong> Acts as the direct line to the Graph RAG backend, dynamically streaming responses that factor in the uploaded resume, scraped GitHub data, and MBTI baseline.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Challenges &amp; Learnings
        </h2>
        
        <div className="space-y-6">
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden">
            <h4 className="text-lg font-black uppercase text-black mb-2">Handling LLM Hallucinations</h4>
            <p className="text-neutral-800 leading-relaxed font-medium">
              One of the biggest challenges was ensuring the LLM extracted accurate entities without hallucinating details. Strict system prompts confined the model to the provided text context (resume, GitHub, etc.), and a semantic chunking strategy broke down large documents into overlapping segments.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden">
            <h4 className="text-lg font-black uppercase text-black mb-2">Graph Database Performance</h4>
            <p className="text-neutral-800 leading-relaxed font-medium">
              As the Knowledge Graph grew, searching for semantic similarities required careful indexing. Implementing vector indexes in Neo4j and optimizing Cypher queries maintained low latency for the real-time chat interface.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          The Outcome
        </h2>
        <div className="border-l-4 border-[#FFEE00] pl-4 py-2 bg-[#FAF7E8] border-y border-r border-black p-4">
          <p className="text-neutral-800 leading-relaxed text-base md:text-lg font-medium">
            What started as a pivot from a reinforcement learning concept evolved into a full implementation of Graph RAG. Persona demonstrates how personal data can be structured into a meaningful knowledge graph, allowing an AI assistant to deliver personalized, context-aware responses while keeping user data private.
          </p>
        </div>
      </section>
    </>
  );
}
