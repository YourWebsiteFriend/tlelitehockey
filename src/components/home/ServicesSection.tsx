import Link from "next/link";
import { Users, CalendarDays, Film } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const services = [
  {
    icon: Users,
    title: "SMALL GROUP SESSIONS",
    body: "Max 12 players per group. Focused reps with direct coaching on skating, shooting, passing, and game IQ.",
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
    icon: Film,
    title: "FILM ANALYSIS",
    body: "Video review sessions that break down your game — positioning, decision making, and compete level. See the game differently.",
    linkLabel: "Learn More →",
    href: "/about",
  },
];

export function ServicesSection() {
  return (
    <SectionWrapper className="bg-black">
      <h2 className="section-heading text-white text-3xl sm:text-4xl text-center mb-4">
        WHAT WE OFFER
      </h2>
      <p className="text-white/50 text-center mb-14">
        Year-round development for players ages 5–18
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="bg-[#111111] border border-white/10 rounded-2xl p-8 hover:border-[#4CAF50]/50 transition-colors flex flex-col"
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
