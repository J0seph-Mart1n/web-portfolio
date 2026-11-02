import React, { useCallback, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'motion/react';
import { BlurFade } from '@/components/ui/blur-fade';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function V2Projects() {
  const [api, setApi] = useState<CarouselApi>();

  const projects = [
    {
      title: 'Persona.ai',
      code: 'PROJ-01',
      badge: 'GRAPH RAG // LOCAL AI',
      description: 'An offline, AI-powered desktop application that extracts and visualizes personalized psychological knowledge graphs from user interactions using local LLMs and Neo4j.',
      tech: ['Next.js', 'Electron', 'Neo4j', 'Ollama', 'Tailwind'],
      github: 'https://github.com/J0seph-Mart1n/PersonaLocalApp',
      slug: 'persona-ai',
      image: '/images/Persona/Persona_Frame.png',
    },
    {
      title: 'Auction Manager',
      code: 'PROJ-02',
      badge: 'ENTERPRISE // REAL-TIME DB',
      description: 'A full-stack web application featuring a Vue 3 frontend for real-time auction bidding and a robust Node.js/PostgreSQL backend for transactional inventory management.',
      tech: ['Vue 3', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Prisma'],
      github: 'https://github.com/J0seph-Mart1n/AuctionManager',
      slug: 'auction-manager',
      image: '/images/AuctionManager/AuctionManager_Frame.png',
    },
    {
      title: 'Vitality Tracker',
      code: 'PROJ-03',
      badge: 'MOBILE // COMPUTER VISION',
      description: 'An AI-powered health and nutrition tracker featuring a React Native mobile client for camera food scanning and a Go/MongoDB backend utilizing Groq Llama for instant macros.',
      tech: ['React Native', 'Expo', 'Go', 'MongoDB', 'Firebase', 'LLaMA'],
      github: 'https://github.com/J0seph-Mart1n/Vitality',
      slug: 'vitality',
      image: '/images/Vitality/Vitality_Frame.png',
    },
  ];

  // Embla Parallax Engine
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: CarouselApi): void => {
    if (!emblaApi) return;
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.parallax-layer') as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    tweenFactor.current = 0.2 * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback((emblaApi: CarouselApi, eventName?: string) => {
    if (!emblaApi) return;
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      
      const slidesInSnap = (engine as any).scrollSnapList?.slidesBySnap
        ? (engine as any).scrollSnapList.slidesBySnap[snapIndex]
        : (engine as any).slideRegistry?.[snapIndex];

      if (!slidesInSnap) return;

      slidesInSnap.forEach((slideIndex: number) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `translateX(${translate}%)`;
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!api) return;

    setTweenNodes(api);
    setTweenFactor(api);
    tweenParallax(api);

    api
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax);
  }, [api, setTweenNodes, setTweenFactor, tweenParallax]);

  return (
    <div className="w-full px-4 md:px-8 py-4 flex flex-col items-center z-10 overflow-hidden">
      <div className="text-center mb-12">
        <BlurFade delay={0.2} inView>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold mb-2">
            <span className="w-2.5 h-2.5 bg-[#FFEE00] border border-black" />
            CASE STUDIES // PRODUCTION ARCHITECTURES
          </div>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black">
            FEATURED PROTOCOLS
          </h3>
          <div className="w-20 h-1.5 bg-[#FFEE00] border border-black mx-auto mt-3" />
        </BlurFade>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {projects.map((project) => (
              <CarouselItem key={project.title} className="pl-4 md:pl-6 basis-[95%] md:basis-[85%] lg:basis-[75%]">
                <div className="w-full h-full bg-[#FFFFF8] border-2 border-black shadow-[6px_6px_0px_#000] relative overflow-hidden flex flex-col">
                  {/* Top Yellow Bar */}
                  <div className="w-full h-2 bg-[#FFEE00] border-b-2 border-black" />

                  <div className="parallax-layer group relative w-full h-full flex flex-col will-change-transform">
                    {/* Project Preview Image Frame */}
                    <div className="w-full h-[220px] md:h-[280px] bg-neutral-100 border-b-2 border-black relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#FFEE00] border border-black font-mono text-[10px] font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_#000]">
                        {project.badge}
                      </div>
                      <div className="absolute top-3 right-3 px-2 py-1 bg-[#FFFFF8] border border-black font-mono text-[10px] font-bold text-black shadow-[2px_2px_0px_#000]">
                        {project.code}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <h4 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-2">
                        {project.title}
                      </h4>
                      
                      <p className="text-neutral-700 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2.5 py-1 bg-[#FAF7E8] border border-black text-black font-mono text-xs font-bold shadow-[1px_1px_0px_#000]">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-black/15">
                        <a
                          href={`/projects/${project.slug}`}
                          className="flex items-center gap-2 px-5 py-2.5 bg-[#FFEE00] hover:bg-[#FAFF00] text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                          <BookOpen size={16} />
                          <span>VIEW PROTOCOL</span>
                          <span>&rarr;</span>
                        </a>

                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 bg-[#FFFFF8] hover:bg-neutral-100 text-black font-mono font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                          aria-label="GitHub Repository"
                        >
                          <FaGithub size={16} />
                          <span>SOURCE</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden md:flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-[#FFFFF8] hover:bg-[#FFEE00] border-2 border-black shadow-[3px_3px_0px_#000] text-black rounded-none w-10 h-10" />
            <CarouselNext className="static translate-y-0 bg-[#FFFFF8] hover:bg-[#FFEE00] border-2 border-black shadow-[3px_3px_0px_#000] text-black rounded-none w-10 h-10" />
          </div>
        </Carousel>
      </motion.div>
    </div>
  );
}
