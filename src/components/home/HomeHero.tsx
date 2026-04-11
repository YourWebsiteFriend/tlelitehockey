"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function HomeHero() {
  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Static rink background — always visible */}
      <Image
        src="/images/hero-rink.png"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Video overlay — plays on top when available */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLVideoElement).style.display = "none";
        }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <p className="text-[#F78E2B] text-sm uppercase tracking-[0.3em] mb-6">
          TL ELITE HOCKEY SCHOOL
        </p>

        <h1 className="font-black uppercase text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-none">
          TRAIN WITH
          <br />
          TL ELITE
        </h1>

        <p className="text-white/70 text-lg max-w-xl mx-auto mt-6 leading-relaxed">
          Elite small-group youth hockey training in Greater Boston. Develop
          your skills, elevate your game.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/book?season=Spring+2026"
            className="bg-[#4CAF50] rounded-full px-8 py-4 font-bold text-sm uppercase tracking-wide text-white hover:bg-[#43A047] transition-colors"
          >
            Spring 2026
          </Link>
          <Link
            href="/book?season=Summer+2026"
            className="bg-[#F78E2B] rounded-full px-8 py-4 font-bold text-sm uppercase tracking-wide text-white hover:bg-[#e07e22] transition-colors"
          >
            Summer 2026
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
}
