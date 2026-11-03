"use client";
import React from 'react';
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
      <div className="w-full flex justify-center mb-16 relative z-10">
        <div className="w-full border-2 border-black bg-[#FAF7E8] shadow-[6px_6px_0px_#000] overflow-hidden">
          <div className="w-full px-4 py-2 bg-neutral-100 border-b-2 border-black flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FFEE00] border border-black" />
              <span className="font-bold uppercase tracking-wider text-black">
                MOBILE SIMULATOR // {currentCaption}
              </span>
            </div>
            <span className="font-bold text-neutral-600">
              [0{current + 1} / 0{vitalityImages.length}]
            </span>
          </div>

          <div className="py-8 px-4 flex flex-col items-center relative">
            <div className="relative w-full max-w-sm mx-auto">
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
                <CarouselPrevious className="-left-4 md:-left-14 bg-[#FFFFF8] hover:bg-[#FFEE00] border-2 border-black shadow-[3px_3px_0px_#000] text-black rounded-none h-10 w-10 md:h-12 md:w-12 z-20 cursor-pointer" />
                <CarouselNext className="-right-4 md:-right-14 bg-[#FFFFF8] hover:bg-[#FFEE00] border-2 border-black shadow-[3px_3px_0px_#000] text-black rounded-none h-10 w-10 md:h-12 md:w-12 z-20 cursor-pointer" />
              </Carousel>
            </div>
          </div>

          <div className="w-full px-4 py-2.5 bg-[#FFEE00] border-t-2 border-black text-center font-mono text-xs md:text-sm font-black uppercase tracking-wider text-black">
            SCREEN 0{current + 1} &mdash; {currentCaption}
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Introduction
        </h2>
        <p className="text-neutral-800 leading-relaxed text-base md:text-lg mb-8 font-medium">
          Vitality is a modern React Native cross-platform application aimed at solving everyday nutritional tracking effortlessly through the power of AI. The application allows users to capture photos of food nutritional labels and receive an instant breakdown of the health impact (benefits, harmful effects, health score, and macro-nutritional data), pushed directly to user-specific dashboards for daily progress monitoring.
        </p>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3 mt-12">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Project Structure &amp; Architecture
        </h2>

        <div className="w-full border-2 border-black bg-[#FAF7E8] shadow-[6px_6px_0px_#000] p-4 md:p-6 mb-12 overflow-hidden">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-3 pb-2 border-b border-black/20 flex justify-between">
            <span>// SYSTEM TOPOLOGY DIAGRAM</span>
            <span>[ARCH-03]</span>
          </div>
          <img 
            src="/images/Vitality/architecture.png" 
            alt="Vitality Architecture Diagram" 
            className="w-full h-auto object-contain border border-black bg-white"
          />
        </div>
        
        <div className="space-y-8 mb-16">
          {/* Frontend Sub-section */}
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 md:p-8 relative overflow-hidden">
            <div className="w-full h-1.5 bg-[#FFEE00] border-b border-black absolute top-0 left-0 right-0" />
            <h3 className="text-2xl font-black uppercase text-black mb-4 mt-2">Frontend Architecture (React Native &amp; Expo)</h3>
            <p className="text-neutral-800 leading-relaxed mb-6 font-medium">
              The mobile application is built using Expo, Expo Router, and TypeScript.
            </p>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-black uppercase text-black mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  Interactive Dashboard &amp; Bento UI
                </h4>
                <p className="text-neutral-800 leading-relaxed mb-2 font-medium">
                  The dashboard uses an intuitive Bento grid layout. For key metrics like the Health Score, the app utilizes <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">react-native-svg</code> to dynamically calculate radial progress rings (mapping the LLM&apos;s integer score to an exact <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">strokeDashoffset</code> coordinate) for a responsive native feel.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-black uppercase text-black mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  Smooth Transitions &amp; Loading States
                </h4>
                <p className="text-neutral-800 leading-relaxed mb-2 font-medium">
                  To provide a seamless UX during API calls, the app integrates <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">react-native-reanimated-skeleton</code> for rich shimmer skeleton loading states across swipeable timelines.
                </p>
              </div>
            </div>
          </div>

          {/* Backend Sub-section */}
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 md:p-8 relative overflow-hidden">
            <div className="w-full h-1.5 bg-[#FFEE00] border-b border-black absolute top-0 left-0 right-0" />
            <h3 className="text-2xl font-black uppercase text-black mb-4 mt-2">Backend Architecture (Go &amp; Gin)</h3>
            <p className="text-neutral-800 leading-relaxed mb-6 font-medium">
              The backend serves as a high-concurrency bridge between the mobile app, Firebase Authentication, MongoDB, and the Groq LLM API.
            </p>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-black uppercase text-black mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  Authentication &amp; Fast Routing
                </h4>
                <p className="text-neutral-800 leading-relaxed mb-2 font-medium">Built on the <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">gin-gonic/gin</code> framework for high-concurrency routing. Custom middleware intercepts requests to decode Firebase JWT tokens, passing the verified <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">UID</code> into the request context to ensure per-user MongoDB isolation via <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">mongo-driver</code>.</p>
              </div>
              <div>
                <h4 className="text-lg font-black uppercase text-black mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFEE00] border border-black shrink-0" />
                  Robust Payload Validation
                </h4>
                <p className="text-neutral-800 leading-relaxed mb-2 font-medium">
                  To prevent crashes from unpredictable AI outputs, the backend enforces strict data boundaries. Before any data reaches the client or database, it must pass through Go&apos;s strict <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">json.Unmarshal</code> validation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-3 mt-16">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Key Features &amp; Application Flow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-lg font-black uppercase text-black mb-2 pl-2">Scan Page &amp; Multimodal Vision</h3>
            <p className="text-sm text-neutral-800 leading-relaxed pl-2 font-medium">
              Built utilizing Expo Camera, users snap photos of physical nutritional labels. The app transmits a compressed Base64 payload to the backend multimodal prompt to extract exact macro values and health insights.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-lg font-black uppercase text-black mb-2 pl-2">Daily Logs &amp; NLP Estimation</h3>
            <p className="text-sm text-neutral-800 leading-relaxed pl-2 font-medium">
              Users can type natural food descriptions like <em>&ldquo;Margherita Pizza&rdquo;</em> and portion grams. The backend routes this to an NLP estimation endpoint to compute caloric and macro intake automatically.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-lg font-black uppercase text-black mb-2 pl-2">Rich Reporting &amp; Bento UI</h3>
            <p className="text-sm text-neutral-800 leading-relaxed pl-2 font-medium">
              Transforms structured AI JSON output into readable Bento cards, including a Nutritional Table, AI benefits/warnings, and an animated SVG radial Health Score ring.
            </p>
          </div>

          <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFEE00] border-r border-black" />
            <h3 className="text-lg font-black uppercase text-black mb-2 pl-2">Swipeable History &amp; Sync</h3>
            <p className="text-sm text-neutral-800 leading-relaxed pl-2 font-medium">
              Features specialized swipeable tabs for <em>Scan History</em> and <em>Daily Logs</em> backed by MongoDB and frictionless shimmer loading states.
            </p>
          </div>
        </div>

        {/* Video Demo */}
        <div className="w-full border-2 border-black bg-[#FAF7E8] shadow-[6px_6px_0px_#000] overflow-hidden mb-16">
          <div className="w-full px-4 py-2 bg-neutral-100 border-b-2 border-black flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FFEE00] border border-black" />
              <span className="font-bold uppercase tracking-wider text-black">
                LIVE AI NUTRITION LABEL SCANNING DEMO
              </span>
            </div>
            <span className="font-bold text-neutral-600">[VIDEO CAPTURE]</span>
          </div>
          <div className="py-8 px-4 flex justify-center">
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
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3 mt-12">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Challenges &amp; Learnings
        </h2>
        <div className="bg-[#FAF7E8] border-2 border-black shadow-[4px_4px_0px_#000] p-6 relative overflow-hidden mb-12">
          <h3 className="text-lg font-black uppercase text-black mb-2">JSON Extraction and Sanitization</h3>
          <p className="text-neutral-800 leading-relaxed font-medium">
            Reasoning models occasionally emitted JSON examples inside <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">&lt;think&gt;</code> blocks, causing naive parsers to fail. Enforcing a strict JSON schema template in the system prompt combined with Go&apos;s <code className="font-mono text-xs bg-[#FFFFF8] border border-black px-1.5 py-0.5 font-bold">json.Unmarshal</code> boundary checks guaranteed 100% structured responses.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4 flex items-center gap-3">
          <span className="w-3.5 h-3.5 bg-[#FFEE00] border-2 border-black shrink-0" />
          Outcomes
        </h2>
        <div className="border-l-4 border-[#FFEE00] pl-4 py-2 bg-[#FAF7E8] border-y border-r border-black p-4">
          <p className="text-neutral-800 leading-relaxed text-base md:text-lg font-medium">
            Vitality bridges multimodal AI processing with a fast native mobile experience. By offloading LLM token management and JSON sanitization to a concurrent Go backend, the React Native client remains lightweight and responsive.
          </p>
        </div>
      </section>
    </>
  );
}
