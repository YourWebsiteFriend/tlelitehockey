"use client";

import Link from "next/link";
import { Users, CalendarDays, Film, Star } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useInView } from "@/hooks/useInView";

const services = [
  {
    icon: Users,
    title: "SMALL GROUP SESSIONS",
    body: "Max 8 players per group. Focused reps with direct coaching on skating, shooting, passing, and game IQ.",
    linkLabel: "Book Now →",
    href: "/book",
  },
  {
    icon: CalendarDays,
    title: "SEASONAL CLINICS",
    body: "High-intensity clinics throughout the year — Christmas, Thanksgiving, Summer, and more. Up to 25 players, 5+ coaches on the ice.",
    linkLabel: "View Clinics →",
    href: "/clinics",
  },
  {
    icon: Star,
    title: "PRIVATE LESSONS",
    body: "One coach. One player. Maximum development. Available at Thayer Sports Center in Braintree and Gallo Ice Arena in Bourne.",
    linkLabel: "Request a Session →",
    href: "/private-lessons",
  },
  {
    icon: Film,
    title: "FILM ANALYSIS",
    body: "Two monthly film sessions with TL coaches who break down your decision-making, positioning, and technique — live on Zoom. See the game differently.",
    linkLabel: "Learn More →",
    href: "/contact",
  },
];

export function ServicesSection() {
  const { ref, inView } = useInView();

  return (
    <SectionWrapper className="bg-black">
      <h2 className="section-heading text-white text-2xl sm:text-4xl text-center mb-4">
        WHAT WE OFFER
      </h2>
      <p className="text-white/50 text-center mb-10 sm:mb-14 text-sm sm:text-base">
        Year-round development for players ages 5–18
      </p>

      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 px-1 sm:px-0">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className={`bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#4CAF50]/50 transition-all duration-300 flex flex-col ${
                inView ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Icon className="text-[#4CAF50] w-10 h-10 mb-6" />
              <h3 className="font-bold uppercase text-white text-xl mb-3">
                {service.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed flex-1">
                {service.body}
              </p>
              <div className="mt-auto pt-6">
                <Link
                  href={service.href}
                  className="text-[#4CAF50] text-sm font-bold hover:underline"
                >
                  {service.linkLabel}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
