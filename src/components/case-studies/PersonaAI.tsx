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
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Introduction
        </h2>
        <p className="text-gray-300 leading-relaxed text-lg">
           So during my 4th Year of my college my team had decided to build a Personalized AI Assistant that can understand the user's behavior and give results accordingly.
           <br /> <br />
           We had implemented reinforcement learning in the backend server, so based on the feedback given by the user it gives the output.
           <br /> <br />
           During the later stages of the project I glimpsed on something called RAG (Retrieval Augmented Generation).
           <br /> <br />
           Because the problem statement and research were already done on reinforcement learning my teammates were not interested in RAG.
        </p>
      </section>

      {/* Architecture Diagram */}
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Project Architecture
        </h2>
      <div className="w-full rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl">
        <img 
          src="/images/Persona/Architecture.png" 
          alt="Persona AI Architecture Diagram" 
          className="w-full h-auto object-cover"
        />
      </div>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Core Concepts
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-xl font-bold text-white mb-3">Retrieval-Augmented Generation (RAG)</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              RAG is a breakthrough AI architecture that bridges the gap between a Large Language Model's fixed training data and your specific, private information. 
            </p>
            <p className="text-gray-300 leading-relaxed">
              Instead of relying on general knowledge, RAG dynamically searches a targeted Knowledge Graph—such as a user's specific interests, technical skills, or even viewing habits (like Netflix genres)—and injects that exact context into the prompt before the AI answers. This ensures the output is deeply personalized and factually grounded.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-xl font-bold text-white mb-3">Myers-Briggs Type Indicator (MBTI)</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The MBTI is a widely recognized psychological framework used to categorize how people perceive the world and make decisions. Persona uses a custom assessment to establish a baseline psychological profile of the user. It categorizes personalities across four dichotomies, resulting in eight core cognitive traits:
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-400">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} /> Extroversion (E)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} /> Introversion (I)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} /> Sensing (S)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} /> Intuition (N)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} /> Thinking (T)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} /> Feeling (F)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} /> Judging (J)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} /> Perceiving (P)</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          About the Project
        </h2>
        
        <p className="text-gray-300 leading-relaxed text-lg mb-8">
          Persona constructs a highly detailed, multi-dimensional Knowledge Graph of the user by understanding their psychological traits, professional domains, and specific technical skills.
        </p>

        <div className="space-y-8">
          {/* Backend Sub-section */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-2xl font-bold text-white mb-4">Backend Architecture</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              The backend is a Node.js and Express server. It consists of three major pillars:
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  Multi-Modal Data Ingestion
                </h4>
                <p className="text-gray-400 leading-relaxed mb-2">To build an accurate profile of a user, data was needed. So I created several ingestion pipelines:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  <li><strong>Interactive Assessments:</strong> A custom MBTI quiz.</li>
                  <li><strong>Headless Social Scraping:</strong> Using Playwright and stealth plugins, the backend can scrape public URLs (like a GitHub profile) to understand a user's open-source contributions and coding interests.</li>
                  <li><strong>Resume Parsing:</strong> Using multer and pdf-parse, users can upload their PDF resumes directly.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  LLM Intelligence & Vector Embeddings
                </h4>
                <p className="text-gray-400 leading-relaxed mb-2">
                  Once I have raw unstructured text (from a resume or GitHub profile), the data is passed to Groq (running the llama-3.3-70b-versatile model). The LLM is prompted to act as a behavioral analyst, extracting specific Traits, Domains (e.g., Software Engineering), and Entities (e.g., React.js).
                </p>
                <p className="text-gray-400 leading-relaxed">
                  To give this data mathematical meaning, I used HuggingFace (BAAI/bge-small-en-v1.5) to generate semantic vector embeddings to build a knowledge graph of traits and entities.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  Neo4j & Graph RAG
                </h4>
                <p className="text-gray-400 leading-relaxed mb-2">
                  This is where the magic happens. All of the extracted nodes are mapped into a Neo4j Graph Database. The structure looks something like this: <code className="text-gray-300 bg-white/10 px-2 py-0.5 rounded ml-1">[User] &rarr; [Domain] &rarr; [Entity]</code> and <code className="text-gray-300 bg-white/10 px-2 py-0.5 rounded ml-1">[User] &rarr; [Trait]</code>.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  When a user asks the AI a question, the backend converts the query into a vector, searches the Neo4j database for the most semantically relevant nodes connected to that specific user, and injects that graph data into the LLM prompt. The result? An AI assistant that doesn't just answer your question, but answers it specifically for you based on your Knowledge Graph.
                </p>
              </div>
            </div>
          </div>

          {/* Frontend Sub-section */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-2xl font-bold text-white mb-4">Frontend Implementation</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              The frontend was built using Next.js, React 19, and Tailwind CSS.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  Visualizing the Graph
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  Because a Knowledge Graph is inherently visual, I wanted users to actually see their data. I integrated react-force-graph (both 2D and 3D) alongside three.js. The central node is the User, which branches out into their active Domains, which further branch out into specific Entities (like programming languages or hobbies).
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  Seamless Integration
                </h4>
                <ul className="list-disc pl-5 space-y-3 text-gray-400 mt-2">
                  <li><strong>Authentication:</strong> Firebase Auth.</li>
                  <li><strong>Settings & Sync:</strong> A dedicated hub where users can seamlessly upload their resumes or drop in their GitHub URLs to trigger the backend pipelines.</li>
                  <li><strong>Context-Aware Chat:</strong> The chat interface isn't just a generic text box. It acts as the direct line to the Graph RAG backend. When you ask for career advice, the UI dynamically streams back a response that factors in your uploaded resume, your scraped GitHub data, and your MBTI baseline.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Challenges & Learnings
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
             <h4 className="text-lg font-semibold text-white mb-2">Handling LLM Hallucinations</h4>
             <p className="text-gray-400 leading-relaxed">
               One of the biggest challenges was ensuring the LLM extracted accurate entities without hallucinating details. Proper prompts were used to strictly confine the model to the provided text context (resume, GitHub, etc.). Additionally, implementing a robust semantic chunking strategy was necessary to break down large documents into smaller, overlapping segments to prevent context window limits and ensure high-fidelity data extraction.
             </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
             <h4 className="text-lg font-semibold text-white mb-2">Graph Database Performance</h4>
             <p className="text-gray-400 leading-relaxed">
               As the Knowledge Graph grew, searching for semantic similarities became very tricky. Implementing proper vector indexes in Neo4j and optimizing Cypher queries was crucial to maintain low latency for the real-time chat interface. The queries are still not optimal, but they are good enough for now.
             </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 mt-12">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          The Outcome
        </h2>
        <p className="text-gray-300 leading-relaxed text-lg mb-8">
          What started as a pivot from a reinforcement learning concept evolved into a sophisticated implementation of Graph RAG. Persona successfully demonstrates how personal data can be structured into a meaningful graph, allowing an AI assistant to deliver truly personalized, context-aware responses rather than generic answers. It bridges the gap between static user profiles and dynamic, conversational AI.
        </p>
      </section>
    </>
  );
}
