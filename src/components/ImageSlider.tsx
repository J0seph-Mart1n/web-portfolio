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

export function ImageSlider({ images, color = '#ffffff' }: { images: ImageSlide[], color?: string }) {
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
    <div className="w-full flex flex-col items-center mb-20">
      <div 
        className="w-full rounded-2xl border border-white/10 bg-black/50 backdrop-blur relative overflow-hidden"
        style={{ boxShadow: `0 10px 40px -10px ${color}30` }}
      >
        <Carousel setApi={setApi} className="w-full group" opts={{ loop: true }}>
          <CarouselContent className="ml-0">
            {images.map((item, idx) => {
              const src = typeof item === 'string' ? item : item.src;
              const caption = typeof item === 'string' ? undefined : item.caption;
              return (
                <CarouselItem key={idx} className="w-full pl-0 flex justify-center items-center">
                  <Zoom zoomMargin={40}>
                    <img
                      src={src}
                      alt={caption || `Slide ${idx + 1}`}
                      className="w-full h-auto max-h-[75vh] object-contain block cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
                    />
                  </Zoom>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        
        <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70 border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 z-10" />
        <CarouselNext className="right-4 bg-black/50 hover:bg-black/70 border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 z-10" />
      </Carousel>
      </div>
      {currentCaption && (
        <p className="mt-6 text-center text-[25px] font-bold text-gray-300 max-w-3xl px-4 tracking-wide animate-in fade-in slide-in-from-top-2 duration-500">
          {currentCaption}
        </p>
      )}
    </div>
  );
}
