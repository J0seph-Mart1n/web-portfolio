export interface ProjectData {
  slug: string;
  code: string;
  badge: string;
  title: string;
  description: string;
  tech: string[];
  color: string;
  github: string;
  liveUrl?: string;
  challenge: string;
  solution: string;
  results: string;
}

export const projectsData: Record<string, ProjectData> = {
  'selah': {
    slug: 'selah',
    code: 'PROJ-01',
    badge: 'FULL-STACK // WEBGL & 3D',
    title: 'SELAH 2026',
    description: 'Full-stack inter-church youth cultural & sports festival platform featuring custom WebGL2 cloth & camera iris shaders, a 4-step parish registration wizard with dynamic roster validation, and an HMAC-secured Cloud Firestore admin analytics console.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Cloud Firestore', 'Tailwind CSS', 'WebGL2', 'GSAP', 'Framer Motion'],
    color: '#FFEE00',
    github: 'https://github.com/J0seph-Mart1n/SELAH',
    liveUrl: 'https://selah-2026.vercel.app/',
    challenge: 'Coordinating 15 concurrent sports and cultural events across multiple parishes required enforcing asymmetric squad rules (gender quotas, min/max limits, tiered fees) while delivering a 60fps interactive festival experience on mobile and desktop.',
    solution: 'Engineered a Next.js 16 & React 19 platform with custom WebGL2 GLSL shaders (Silk cloth physics & 9-blade camera iris), a collision-aware timeline layout algorithm, a 4-step declarative registration wizard, and dual-storage persistence (Cloud Firestore + local JSON failover) with HMAC-SHA256 admin authentication.',
    results: 'Eliminated manual spreadsheet and Google Form errors across all 15 events, enabling parish delegates to validate rosters and compute tiered fees in under 3 minutes while giving organizers real-time telemetry and one-click CSV exports.',
  },
  'vitality': {
    slug: 'vitality',
    code: 'PROJ-02',
    badge: 'MOBILE // COMPUTER VISION',
    title: 'Vitality Tracker',
    description: 'An AI-powered health and nutrition tracker featuring a React Native frontend and a Go/MongoDB backend utilizing Llama 4.',
    tech: ['React Native', 'Expo', 'Go', 'MongoDB', 'Firebase', 'LLaMA'],
    color: '#FFEE00',
    github: 'https://github.com/J0seph-Mart1n/Vitality',
    challenge: 'Manually logging food is tedious. Users needed a frictionless way to track nutrition simply by scanning labels or describing their meals, requiring fast and accurate multimodal AI processing.',
    solution: 'Built a cross-platform React Native app. Developed a highly concurrent Go backend to handle API requests efficiently. Integrated Groq\'s fast Llama 4 APIs to parse food labels and unstructured text into structured nutritional data stored in MongoDB.',
    results: 'Reduced logging time by 80% compared to traditional manual entry apps. The Go backend handles requests with sub-50ms latency (excluding AI generation time), resulting in a snappy, responsive user experience.',
  },
  'persona-ai': {
    slug: 'persona-ai',
    code: 'PROJ-03',
    badge: 'GRAPH RAG // LOCAL AI',
    title: 'Persona.ai',
    description: 'An offline, AI-powered desktop application that builds and visualizes a personalized psychological knowledge graph.',
    tech: ['Next.js', 'Electron', 'Neo4j', 'Ollama', 'Tailwind'],
    color: '#FFEE00',
    github: 'https://github.com/J0seph-Mart1n/PersonaLocalApp',
    challenge: 'Users lack a private, secure way to build a personal psychological profile without relying on cloud APIs. Integrating local LLMs with a graph database (Neo4j) efficiently on desktop hardware posed significant performance constraints.',
    solution: 'Packaged Next.js within Electron to provide a native desktop feel. Connected to local Ollama instances to run open-source models privately. Used Neo4j for structuring user conversations into a rich, queryable knowledge graph.',
    results: 'Achieved 100% offline functionality. Users can visualize their own cognitive biases, recurring thoughts, and traits through a highly interactive, private graph UI.',
  },
  'auction-manager': {
    slug: 'auction-manager',
    code: 'PROJ-04',
    badge: 'ENTERPRISE // REAL-TIME DB',
    title: 'Auction Manager',
    description: 'A full-stack web application featuring a Vue 3 frontend for real-time auction tracking and a Node.js/PostgreSQL backend.',
    tech: ['Vue 3', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Prisma'],
    color: '#FFEE00',
    github: 'https://github.com/J0seph-Mart1n/AuctionManager',
    challenge: 'Handling real-time bid updates, concurrent users, and ensuring transactional integrity during the final seconds of an auction is technically demanding and prone to race conditions.',
    solution: 'Implemented a robust Node.js backend using PostgreSQL with strict transaction isolation levels. Used Prisma as the ORM to ensure type safety from the database to the Vue 3 frontend. Implemented real-time updates to synchronize all clients.',
    results: 'The platform successfully handles concurrent bid requests with zero data loss. The Vue 3 frontend delivers a seamless, reactive user experience, boosting user engagement during live auctions.',
  }
};
