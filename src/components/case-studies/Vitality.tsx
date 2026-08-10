"use client";
import React from 'react';
import { Layers, Cpu } from 'lucide-react';
import { ProjectData } from '@/data/projects';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const vitalityImages = [
  { src: "/images/Vitality/1_Dashboard.png", caption: "Main Dashboard" },
  { src: "/images/Vitality/2_Scan_History.png", caption: "Scan History" },
  { src: "/images/Vitality/3_Daily_Logs.png", caption: "Daily Logs" },
  { src: "/images/Vitality/4_Log_Entry.png", caption: "Daily Food Logging" }
];

export function Vitality({ project }: { project: ProjectData }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const currentCaption = vitalityImages[current]?.caption;

  return (
    <>
      <div className="w-full flex justify-center mb-20 relative z-10">
        <div className="relative w-full max-w-sm mx-auto">
          {/* Background Glow */}
          <div 
            className="absolute -inset-4 opacity-30 blur-2xl rounded-full" 
            style={{ background: project.color }} 
          />
          <Carousel setApi={setApi} className="w-full group" opts={{ loop: true }}>
            <CarouselContent>
              {vitalityImages.map((item, idx) => (
                <CarouselItem key={idx} className="flex justify-center">
                  <DeviceFrameset device="iPhone X" color="black">
                    <img 
                      src={item.src} 
                      alt={`Vitality Screen ${idx + 1}`} 
                      className="w-full h-full object-cover pointer-events-none object-top scale-[1.025] origin-top"
                    />
                  </DeviceFrameset>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12 md:-left-16 bg-black/50 hover:bg-black/70 border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 md:h-12 md:w-12 z-20" />
            <CarouselNext className="-right-12 md:-right-16 bg-black/50 hover:bg-black/70 border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 md:h-12 md:w-12 z-20" />
          </Carousel>
          <div className="min-h-[64px] flex items-center justify-center mt-8">
            <h3 className="text-[25px] font-bold text-gray-300 tracking-wide text-center animate-in fade-in slide-in-from-top-2 duration-500">
              {currentCaption}
            </h3>
          </div>
        </div>
      </div>
      

      <section className="mb-24">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Introduction
        </h2>
        <p className="text-gray-300 leading-relaxed text-lg mb-8">
          Vitality is a modern React Native cross-platform application aimed at solving everyday nutritional tracking effortlessly through the power of AI. The application allows users to capture photos of food nutritional labels and receive an instant breakdown of the health impact (benefits, harmful effects, health score, and macro-nutritional data). This data is seamlessly pushed to user-specific dashboards for daily progress monitoring.
        </p>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 mt-16">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Project Structure & Architecture
        </h2>

        <div className="w-full flex justify-center mb-12 bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
          <img 
            src="/images/Vitality/architecture.png" 
            alt="Vitality Architecture Diagram" 
            className="w-full h-auto object-contain rounded-lg shadow-lg"
          />
        </div>

        
        <div className="space-y-8 mb-16">
          {/* Frontend Sub-section */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-2xl font-bold text-white mb-4">Frontend Architecture (React Native & Expo)</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              The mobile application is built using Expo, Expo Router, and TypeScript.
            </p>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  Interactive Dashboard & Bento UI
                </h4>
                <p className="text-gray-400 leading-relaxed mb-2">
                  The dashboard uses an intuitive Bento grid layout. For key metrics like the Health Score, the app utilizes <code className="text-gray-300 bg-white/10 px-2 py-0.5 rounded">react-native-svg</code> to dynamically calculate radial progress rings (e.g., dynamically mapping the LLM's integer score to an exact <code className="text-gray-300 bg-white/10 px-2 py-0.5 rounded">strokeDashoffset</code> coordinate) for a polished, native feel.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  Smooth Transitions & Loading States
                </h4>
                <p className="text-gray-400 leading-relaxed mb-2">
                  To provide a seamless UX during API calls, the app integrates <code className="text-gray-300 bg-white/10 px-2 py-0.5 rounded">react-native-reanimated-skeleton</code> for rich "shimmer" skeleton loading states across its swipeable timelines.
                </p>
              </div>
            </div>
          </div>

          {/* Backend Sub-section */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-2xl font-bold text-white mb-4">Backend Architecture (Go & Gin)</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              The backend serves as a secure bridge between the mobile app, Firebase Authentication, a local MongoDB instance, and the powerful Groq LLM API.
            </p>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  Authentication & Fast Routing
                </h4>
                <p className="text-gray-400 leading-relaxed mb-2">Built on the <code className="text-gray-300 bg-white/10 px-2 py-0.5 rounded">gin-gonic/gin</code> framework for high-concurrency routing. Custom middleware intercepts requests to decode Firebase JWT tokens, passing the verified <code className="text-gray-300 bg-white/10 px-2 py-0.5 rounded">UID</code> into the request context to ensure secure, per-user MongoDB isolation via the official <code className="text-gray-300 bg-white/10 px-2 py-0.5 rounded">mongo-driver</code>.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  Robust Payload Validation
                </h4>
                <p className="text-gray-400 leading-relaxed mb-2">
                  To prevent crashes from unpredictable AI outputs, the backend enforces strict data boundaries. Before any data reaches the client or database, it must successfully pass through Go's strict <code className="text-gray-300 bg-white/10 px-2 py-0.5 rounded">json.Unmarshal</code> logic. If the LLM response is malformed, Gin elegantly catches it and returns a safe fallback 500 status.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 mt-16">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Key Features & Application Flow
        </h2>
        <div className="space-y-6 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-xl font-bold text-white mb-3">Scan Page & Multimodal Vision Analysis</h3>
            <p className="text-gray-300 leading-relaxed">
              At the core of Vitality is the <strong>Scan Page</strong>, built utilizing Expo Camera. Users can snap a photo of any physical nutritional label in the real world. The app efficiently converts the photo to a compressed Base64 payload and transmits it to the backend, where it is injected into a multimodal context prompt. The LLM acts as an expert nutritionist, extracting exact macro values and generating detailed health insights.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-xl font-bold text-white mb-3">Daily Logs & Unstructured Data Ingestion</h3>
            <p className="text-gray-300 leading-relaxed">
              Beyond label scanning, the <strong>Daily Log Page</strong> allows users to track meals manually. Instead of rigidly selecting items from a dropdown database, users can simply type the Food Name like <em>"Margherita Pizza"</em>, and the estimated grams they have consumed. The backend routes this to a dedicated text-estimation endpoint, leveraging the LLM's NLP capabilities to cross-reference contextual macro facts and instantly estimate the exact caloric and nutritional intake.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-xl font-bold text-white mb-3">Rich Reporting & Bento UI Visualization</h3>
            <p className="text-gray-300 leading-relaxed">
              The <strong>Report Page</strong> transforms raw AI JSON output into a stunning visual experience. Utilizing a Bento grid layout, it dissects the LLM's response into distinct, readable cards. This includes a dedicated Nutritional Table, AI-generated benefits/warnings, and the animated SVG radial Health Score ring that dynamically maps the AI's integer score to a visual circumference.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-xl font-bold text-white mb-3">Swipeable History & Smooth Pagination</h3>
            <p className="text-gray-300 leading-relaxed">
              To keep track of progress, the <strong>History Page</strong> features two specialized swipeable tabs for <em>Scan History</em> and <em>Daily Logs</em>. It relies on a robust MongoDB fetching architecture, with the frontend utilizing <code className="text-gray-300 bg-white/10 px-2 py-0.5 rounded">react-native-reanimated-skeleton</code> to render beautiful, frictionless shimmer loading states while synchronizing historical user data in real-time.
            </p>
          </div>
        </div>

        {/* Video Demo */}
        <div className="w-full flex justify-center mb-16 relative z-10 mt-8">
          <div className="relative w-full max-w-sm mx-auto flex flex-col items-center">
            <div 
              className="absolute top-0 w-full h-[80%] opacity-30 blur-2xl rounded-full" 
              style={{ background: project.color, zIndex: -1 }} 
            />
            <DeviceFrameset device="iPhone X" color="black">
              <div className="w-full h-full overflow-hidden relative">
                <video 
                  src="/images/Vitality/Nutrition_Label_Scanning_Video.mp4" 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[103%] max-w-[103%] h-full object-cover object-top pointer-events-auto"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  controls={true}
                />
              </div>
            </DeviceFrameset>
            <h3 className="mt-8 text-xl font-bold text-white tracking-wide text-center drop-shadow-md">
              Live AI Nutrition Label Scanning Demo
            </h3>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 mt-16">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Challenges & Learnings
        </h2>
        <div className="space-y-6 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
            <h3 className="text-xl font-bold text-white mb-3">JSON Extraction and Parsing</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
                The model would occasionally write JSON examples within its <code>&lt;think&gt;</code> block, causing standard index matching to extract corrupted JSON mixed with reasoning text. I was getting other JSON errors too while parsing because the model sometimes gives the wrong result. To solve the JSON parsing issue, I gave the model strict instructions in its prompt text to follow proper JSON format by giving a JSON template in the prompt text itself.            
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 mt-16">
          <span className="w-8 h-[2px]" style={{ backgroundColor: project.color }} />
          Outcomes
        </h2>
        <p className="text-gray-300 leading-relaxed text-lg mb-8">
          The resulting application effectively bridges cutting-edge AI multimodal processing with a lightning-fast native mobile experience. By offloading complex LLM processing, token management, and JSON sanitization to a performant Go backend, the React Native frontend is kept exceptionally lightweight. Vitality demonstrates how AI can be leveraged not just as a chatbot, but as an invisible, intelligent engine powering structured data ingestion for practical everyday utilities.
        </p>
      </section>
    </>
  );
}
