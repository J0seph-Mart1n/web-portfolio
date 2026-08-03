"use client";
import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ImageSlider({ images, color = '#ffffff' }: { images: string[], color?: string }) {
  return (
    <div 
      className="w-full rounded-2xl border border-white/10 bg-black/50 backdrop-blur relative overflow-hidden mb-20"
      style={{ boxShadow: `0 10px 40px -10px ${color}30` }}
    >
      <Carousel className="w-full group" opts={{ loop: true }}>
        <CarouselContent className="ml-0">
          {images.map((src, idx) => (
            <CarouselItem key={idx} className="w-full pl-0 flex justify-center items-center">
              <Zoom zoomMargin={40} overlayBgColorEnd="rgba(0, 0, 0, 0.9)">
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-auto max-h-[75vh] object-contain block cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
                />
              </Zoom>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70 border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 z-10" />
        <CarouselNext className="right-4 bg-black/50 hover:bg-black/70 border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 z-10" />
      </Carousel>
    </div>
  );
}
