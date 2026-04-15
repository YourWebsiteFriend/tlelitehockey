import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const services = [
  {
    title: "SMALL GROUP SESSIONS",
    desc: "Max 8 players per group. Direct coaching every rep.",
    image: "/images/DSC02680.jpg",
    alt: "Small group hockey training session at TL Elite",
    learnHref: "/book",
    bookHref: "/book",
  },
  {
    title: "SEASONAL CLINICS",
    desc: "High-intensity multi-coach clinics all year long.",
    image: "/images/DSC02755.jpg",
    alt: "TL Elite seasonal hockey clinic with multiple players",
    learnHref: "/clinics",
    bookHref: "/clinics",
  },
  {
    title: "PRIVATE LESSONS",
    desc: "One coach. One player. Maximum development.",
    image: "/images/DSC02673.jpg",
    alt: "Coach working one-on-one with a player at TL Elite",
    learnHref: "/private-lessons",
    bookHref: "/private-lessons",
  },
  {
    title: "FILM ANALYSIS",
    desc: "Live Zoom sessions to elevate your game IQ.",
    image: "/images/DSC02694.jpg",
    alt: "Player in focused training at TL Elite Hockey",
    learnHref: "/contact",
    bookHref: "/contact",
  },
];

export function ServicesSection() {
  return (
    <SectionWrapper className="bg-black">
      <h2 className="section-heading text-white text-2xl sm:text-4xl text-center mb-4">
        WHAT WE OFFER
      </h2>
      <p className="text-white/50 text-center mb-10 sm:mb-14 text-sm sm:text-base">
        Year-round development for players ages 5–18
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
          >
            {/* Background image */}
            <Image
              src={service.image}
              alt={service.alt}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white font-black uppercase text-xl leading-tight">
                {service.title}
              </h3>
              <p className="text-white/60 text-sm mt-1">{service.desc}</p>

              <div className="flex flex-wrap gap-3 mt-4">
                <Link
                  href={service.learnHref}
                  className="rounded-full bg-[#F78E2B] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#e07e22] transition-colors"
                >
                  Learn More
                </Link>
                <Link
                  href={service.bookHref}
                  className="rounded-full bg-[#4CAF50] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#43A047] transition-colors"
                >
                  Book Now →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
