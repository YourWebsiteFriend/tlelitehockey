"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const slides = [
  { src: "/images/DSC02650.jpg", alt: "Youth hockey player in training at Thayer Sports Center" },
  { src: "/images/DSC02663.jpg", alt: "Coach delivering on-ice instruction at TL Elite Hockey" },
  { src: "/images/DSC02675.jpg", alt: "Small-group session on the ice at TL Elite" },
  { src: "/images/DSC02690.jpg", alt: "Player working on skill development at TL Elite" },
  { src: "/images/DSC02709.jpg", alt: "TL Elite coach working with young players" },
  { src: "/images/DSC02727.jpg", alt: "Players in skating drill at TL Elite Hockey" },
  { src: "/images/DSC02744.jpg", alt: "Action shot during TL Elite Hockey training" },
  { src: "/images/DSC02757.jpg", alt: "Youth players at TL Elite Hockey School" },
];

export function HomeHero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, 5000);
    return () => clearInterval(id);
  }, [paused, advance]);

  // Pause on tab hidden
  useEffect(() => {
    const handler = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="TL Elite Hockey photo slideshow"
    >
      {/* Slides — stack with absolute positioning, fade in/out */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover object-[center_25%]"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#F78E2B] text-sm uppercase tracking-[0.3em] mb-6">
          TL ELITE HOCKEY SCHOOL
        </p>

        <h1 className="font-black uppercase tracking-tight leading-none">
          <span className="block text-3xl sm:text-6xl lg:text-8xl text-white">TRAIN WITH TL ELITE.</span>
        </h1>

        <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mt-5 sm:mt-6 leading-relaxed px-2 sm:px-0">
          Elite small-group youth hockey training in Greater Boston. Develop
          your skills, elevate your game.
        </p>

        <div className="flex flex-row flex-wrap gap-3 sm:gap-4 justify-center mt-8 sm:mt-10">
          <Link
            href="/book?season=Spring+2026"
            className="bg-[#4CAF50] rounded-full px-7 sm:px-8 py-3 sm:py-4 font-bold text-sm uppercase tracking-wide text-white hover:bg-[#43A047] transition-colors"
          >
            Spring 2026
          </Link>
          <Link
            href="/book?season=Summer+2026"
            className="bg-[#F78E2B] rounded-full px-7 sm:px-8 py-3 sm:py-4 font-bold text-sm uppercase tracking-wide text-white hover:bg-[#e07e22] transition-colors"
          >
            Summer 2026
          </Link>
        </div>

        {/* Slide dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Slideshow navigation">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-[#F78E2B] w-6 h-2"
                  : "bg-white/30 w-2 h-2 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
}
