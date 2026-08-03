export interface ProjectData {
  title: string;
  description: string;
  tech: string[];
  color: string;
  github: string;
  challenge: string;
  solution: string;
  results: string;
}

export const projectsData: Record<string, ProjectData> = {
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
