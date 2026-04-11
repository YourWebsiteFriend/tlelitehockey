"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Brendan and his coaches completely transformed my son's skating in one season. The attention to detail is unreal.",
    author: "Sarah M.",
    role: "Parent",
  },
  {
    quote:
      "TL Elite is the best thing we've done for my daughter's hockey development. She went from struggling to one of the strongest skaters on her team.",
    author: "Mike T.",
    role: "Parent",
  },
  {
    quote:
      "The small group format is exactly what my son needed. He gets real coaching, not just ice time. His confidence has gone through the roof.",
    author: "Jennifer K.",
    role: "Parent",
  },
];

interface Props {
  variant?: "carousel" | "grid";
}

export function TestimonialsSection({ variant = "carousel" }: Props) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoAdvance = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    if (variant === "carousel") {
      startAutoAdvance();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  const go = (index: number) => {
    setCurrent(index);
    startAutoAdvance();
  };

  const prev = () => go((current - 1 + testimonials.length) % testimonials.length);
  const next = () => go((current + 1) % testimonials.length);

  if (variant === "grid") {
    return (
      <SectionWrapper className="bg-[#111111]">
        <h2 className="section-heading text-white text-3xl sm:text-4xl text-center mb-16">
          WHAT PARENTS ARE SAYING
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-black rounded-2xl p-8 border border-white/10"
            >
              <p className="text-[#F78E2B] text-xl mb-6">★★★★★</p>
              <p className="text-white/90 text-base italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-white/50 text-sm mt-6">
                — {t.author}, {t.role}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    );
  }

  const t = testimonials[current];

  return (
    <SectionWrapper className="bg-[#111111]">
      <h2 className="section-heading text-white text-3xl sm:text-4xl text-center mb-16">
        WHAT PARENTS ARE SAYING
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-2"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-2"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Stars */}
        <p className="text-[#F78E2B] text-xl text-center mb-6">★★★★★</p>

        {/* Quote */}
        <p className="text-white/90 text-xl lg:text-2xl italic text-center max-w-3xl mx-auto leading-relaxed">
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Attribution */}
        <p className="text-white/50 text-sm text-center mt-6">
          — {t.author}, {t.role}
        </p>

        {/* Dot indicators */}
        <div className="flex gap-2 justify-center mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all ${
                i === current
                  ? "bg-[#F78E2B] w-6 h-2"
                  : "bg-white/20 w-2 h-2"
              }`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
