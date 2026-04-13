"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

interface Coach {
  name: string;
  role: string;
  photo: string;
  bio: string;
}

interface CoachesGridProps {
  coaches: Coach[];
}

export function CoachesGrid({ coaches }: CoachesGridProps) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-8">
      {coaches.map((coach, i) => (
        <div
          key={coach.name}
          className={`bg-black rounded-2xl overflow-hidden border border-white/10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
        >
          {/* Coach photo */}
          <div className="relative h-80 bg-[#0a0a0a] overflow-hidden">
            <Image
              src={coach.photo}
              alt={`${coach.name} — TL Elite Hockey`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Info */}
          <div className="p-8">
            <h3 className="font-black uppercase text-white text-2xl">
              {coach.name}
            </h3>
            <p className="text-[#F78E2B] text-sm uppercase tracking-wide mt-1 mb-4">
              {coach.role}
            </p>
            <p className="text-white/70 text-sm leading-relaxed">{coach.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
