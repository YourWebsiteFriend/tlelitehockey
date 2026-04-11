import type { Metadata } from "next";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { CtaBannerSection } from "@/components/home/CtaBannerSection";

export const metadata: Metadata = {
  title: "About TL Elite Hockey",
  description:
    "Meet the coaching staff behind TL Elite Hockey School. Brendan Heayden and Mitch Walinski bring competitive hockey experience to youth player development in Greater Boston.",
};

const coaches = [
  {
    name: "BRENDAN HEAYDEN",
    role: "Founder & Head Coach",
    photo: "/images/coach-brendan.jpg",
    bio: "Brendan Heayden founded TL Elite Hockey School in 2021 with one goal: give young players the same level of instruction and intensity that shaped his own career. A lifelong hockey player with deep roots in New England hockey, Brendan brings a competitive mindset and a player-first approach to every session.",
  },
  {
    name: "MITCH WALINSKI",
    role: "Assistant Coach",
    photo: null,
    bio: "Mitch Walinski joined TL Elite as assistant coach and quickly became an integral part of the program's identity. Known for his ability to connect with players of all ages, Mitch brings energy and technical precision to every session.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        heading="OUR STORY"
        body="Building elite youth hockey players through intensity, discipline, and precision."
        backgroundImage="/images/hockey-huddle.png"
      />

      {/* Coaches */}
      <SectionWrapper className="bg-[#111111]">
        <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] text-center mb-3">
          THE COACHES
        </p>
        <h2 className="section-heading text-white text-3xl sm:text-4xl text-center mb-14">
          MEET THE TEAM
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {coaches.map((coach) => (
            <div
              key={coach.name}
              className="bg-black rounded-2xl overflow-hidden border border-white/10"
            >
              {/* Coach photo */}
              <div className="relative h-80 bg-[#0a0a0a] overflow-hidden">
                {coach.photo ? (
                  <Image
                    src={coach.photo}
                    alt={`${coach.name} — TL Elite Hockey`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
                    <UserCircle className="text-white/20 w-32 h-32" />
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-8">
                <h3 className="font-black uppercase text-white text-2xl">
                  {coach.name}
                </h3>
                <p className="text-[#4CAF50] text-sm uppercase tracking-wide mt-1 mb-4">
                  {coach.role}
                </p>
                <p className="text-white/70 text-sm leading-relaxed">{coach.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Mission Statement */}
      <SectionWrapper className="bg-black">
        <span className="block text-[#4CAF50] text-[120px] leading-none font-serif text-center opacity-20 select-none">
          &ldquo;
        </span>
        <h2 className="section-heading text-white text-4xl sm:text-5xl lg:text-6xl text-center -mt-8">
          INTENSITY.
          <br />
          DISCIPLINE.
          <br />
          PRECISION.
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto text-center mt-6 leading-relaxed">
          These aren&apos;t just words on a wall. They&apos;re the standard we hold
          every player and coach to every time the puck drops. TL Elite was
          built on the belief that elite development doesn&apos;t require elite
          access — it requires elite effort.
        </p>
      </SectionWrapper>

      <TestimonialsSection variant="grid" />
      <CtaBannerSection />
    </>
  );
}
