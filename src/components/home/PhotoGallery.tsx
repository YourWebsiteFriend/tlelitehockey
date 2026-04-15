"use client";

import Image from "next/image";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useInView } from "@/hooks/useInView";

const photos = [
  { src: "/images/DSC02694.jpg", alt: "TL Elite player in training jersey" },
  { src: "/images/DSC02680.jpg", alt: "Player stick-handling drill" },
  { src: "/images/DSC02655.jpg", alt: "Game action at the net" },
  { src: "/images/DSC02727.jpg", alt: "TL Elite skating drill" },
  { src: "/images/DSC02748.jpg", alt: "Players battling for the puck" },
  { src: "/images/DSC02763.jpg", alt: "Player skating with puck" },
];

export function PhotoGallery() {
  const { ref, inView } = useInView();

  return (
    <SectionWrapper className="bg-[#111111]">
      <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] text-center mb-3 font-bold">
        ON THE ICE
      </p>
      <h2 className="section-heading text-white text-2xl sm:text-4xl text-center mb-8 sm:mb-10">
        TRAINING IN ACTION
      </h2>
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 px-1 sm:px-0">
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className={`relative aspect-[4/3] overflow-hidden rounded-xl group ${
              inView ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
