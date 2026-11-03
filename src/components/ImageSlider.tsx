"use client";
import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type ImageSlide = string | { src: string; caption?: string };

export function ImageSlider({ images }: { images: ImageSlide[]; color?: string }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const currentItem = images[current];
  const currentCaption = typeof currentItem === 'string' ? undefined : currentItem?.caption;

  return (
    <div className="w-full flex flex-col items-center mb-16">
      <div className="w-full border-2 border-black bg-[#FAF7E8] shadow-[6px_6px_0px_#000] relative overflow-hidden">
        {/* Top Window Header Bar */}
        <div className="w-full px-4 py-2 bg-neutral-100 border-b-2 border-black flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FFEE00] border border-black" />
            <span className="font-bold uppercase tracking-wider text-black">
              {currentCaption || `VISUAL CAPTURE 0${current + 1}`}
            </span>
          </div>
          <span className="font-bold text-neutral-600">
            [0{current + 1} / 0{images.length}]
          </span>
        </div>

        <Carousel setApi={setApi} className="w-full group bg-neutral-900/5" opts={{ loop: true }}>
          <CarouselContent className="ml-0">
            {images.map((item, idx) => {
              const src = typeof item === 'string' ? item : item.src;
              const caption = typeof item === 'string' ? undefined : item.caption;
              return (
                <CarouselItem key={idx} className="w-full pl-0 flex justify-center items-center p-2 md:p-4">
                  <Zoom zoomMargin={40}>
                    <img
                      src={src}
                      alt={caption || `Slide ${idx + 1}`}
                      className="w-full h-auto max-h-[70vh] object-contain block cursor-zoom-in border border-black/20 bg-white"
                    />
                  </Zoom>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        
          <CarouselPrevious className="left-3 bg-[#FFFFF8] hover:bg-[#FFEE00] border-2 border-black shadow-[3px_3px_0px_#000] text-black rounded-none h-10 w-10 z-10 cursor-pointer" />
          <CarouselNext className="right-3 bg-[#FFFFF8] hover:bg-[#FFEE00] border-2 border-black shadow-[3px_3px_0px_#000] text-black rounded-none h-10 w-10 z-10 cursor-pointer" />
        </Carousel>

        {currentCaption && (
          <div className="w-full px-4 py-2.5 bg-[#FFEE00] border-t-2 border-black text-center font-mono text-xs md:text-sm font-black uppercase tracking-wider text-black">
            FIG 0{current + 1} &mdash; {currentCaption}
          </div>
        )}
      </div>
    </div>
  );
}
