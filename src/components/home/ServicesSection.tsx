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

      <div ref={ref} className="flex flex-col gap-4">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.title}
              href={service.href}
              className={`group relative bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex items-center gap-6 overflow-hidden
                hover:border-[#4CAF50]/60 hover:bg-[#141414] active:scale-[0.99]
                transition-all duration-300 ${inView ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Green left accent bar — slides in on hover */}
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#4CAF50] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom rounded-l-2xl" />

              {/* Icon */}
              <div className="shrink-0 w-14 h-14 rounded-xl bg-[#4CAF50]/10 border border-[#4CAF50]/20 flex items-center justify-center group-hover:bg-[#4CAF50]/20 transition-colors duration-300">
                <Icon className="text-[#4CAF50] w-6 h-6" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-black uppercase text-white text-base sm:text-lg leading-tight mb-1 group-hover:text-[#4CAF50] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.body}</p>
              </div>

              {/* Arrow — slides in on hover */}
              <span className="shrink-0 text-[#4CAF50] font-bold text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                →
              </span>
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
