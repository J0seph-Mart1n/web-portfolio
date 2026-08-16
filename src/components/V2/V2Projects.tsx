import React, { useCallback, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { BookOpen, FolderGit2 } from 'lucide-react';
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
      description: 'An offline, AI-powered desktop application that builds and visualizes a personalized psychological knowledge graph from user interactions using local LLMs and Neo4j.',
      tech: ['Next.js', 'Electron', 'Neo4j', 'Ollama', 'Tailwind'],
      color: '#87BCDE', 
      github: 'https://github.com/J0seph-Mart1n/PersonaLocalApp',
      slug: 'persona-ai',
      image: '/images/Persona/Persona_Frame.png',
    },
    {
      title: 'Auction Manager',
      description: 'A full-stack web application featuring a Vue 3 frontend for real-time auction tracking and a Node.js/PostgreSQL backend for secure item cataloging and sales management.',
      tech: ['Vue 3', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Prisma'],
      color: '#87BCDE',
      github: 'https://github.com/J0seph-Mart1n/AuctionManager',
      slug: 'auction-manager',
      image: '/images/AuctionManager/AuctionManager_Frame.png',
    },
    {
      title: 'Vitality',
      description: 'An AI-powered health and nutrition tracker featuring a React Native frontend for scanning food labels and a Go/MongoDB backend utilizing Groq\'s Llama 4 for real-time nutritional analysis.',
      tech: ['React Native', 'Expo', 'Go', 'MongoDB', 'Firebase', 'LLaMA'],
      color: '#87BCDE',
      github: 'https://github.com/J0seph-Mart1n/Vitality',
      slug: 'vitality',
      image: '/images/Vitality/Vitality_Frame.png',
    },
  ];

  // Embla Parallax Engine (High Performance via Refs)
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
        
        // Embla v8 uses scrollSnapList.slidesBySnap, fall back to slideRegistry just in case
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
            
            const contentNode = tweenNode.querySelector('.project-content') as HTMLElement | null;
            if (contentNode) {
              const slideDistance = Math.abs(diffToTarget) * emblaApi.scrollSnapList().length;
              const opacityTarget = 1 - slideDistance * 1.5;
              const opacity = Math.max(0, Math.min(1, opacityTarget));
              contentNode.style.opacity = opacity.toString();
              
              const translateY = slideDistance * 20;
              contentNode.style.transform = `translateY(${translateY}px)`;
            }
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
    <div className="w-full px-4 md:px-8 py-2 flex flex-col items-center z-10 overflow-hidden">
      <div className="text-center mb-12">
        <BlurFade delay={0.3} inView>
          <h3 className="font-heading text-4xl md:text-5xl text-white font-bold mb-4">
            Projects
            <div className="w-24 h-1 bg-[#87BCDE] mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(135,188,222,0.8)]"></div>
          </h3>
        </BlurFade>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {projects.map((project, index) => (
              <CarouselItem key={project.title} className="pl-4 md:pl-8 basis-[90%] md:basis-[80%] lg:basis-[65%]">
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 bg-zinc-900/40 backdrop-blur-xl">
                  <div className="parallax-layer group relative w-full h-full flex flex-col transition-colors duration-500 hover:bg-zinc-800/50 will-change-transform">
                  
                  {/* Parallax Image Placeholder */}
                  <div className="w-full h-[250px] md:h-[300px] bg-black/60 border-b border-white/5 relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  {/* Content Side */}
                  <div className="project-content w-full py-6 px-10 md:py-6 md:px-12 flex flex-col flex-grow text-center will-change-opacity will-change-transform">
                    <h4 className="font-heading text-xl md:text-2xl font-bold text-white tracking-wide mb-2">
                      {project.title}
                    </h4>
                    
                    <p className="text-zinc-400 font-sans text-xs md:text-sm leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    <ul className="flex flex-wrap gap-2 justify-center mb-6">
                      {project.tech.map((t) => (
                        <li key={t} className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 rounded-full font-mono text-xs shadow-sm">
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-4 justify-center mt-auto">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all hover:scale-110 shadow-lg"
                        aria-label="GitHub Repository"
                      >
                        <FaGithub size={22} />
                      </a>
                      <a
                        href={`/case-studies/${project.slug}`}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#87BCDE]/20 border border-[#87BCDE]/50 text-[#87BCDE] font-semibold text-sm hover:bg-[#87BCDE] hover:text-black transition-all shadow-lg"
                      >
                        <BookOpen size={18} />
                        <span>Case Study</span>
                      </a>
                    </div>
                  </div>

                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 bg-black/50 border-white/20 hover:bg-white hover:text-black transition-all rounded-full" />
            <CarouselNext className="absolute -right-12 bg-black/50 border-white/20 hover:bg-white hover:text-black transition-all rounded-full" />
          </div>
        </Carousel>
      </motion.div>
    </div>
  );
}
