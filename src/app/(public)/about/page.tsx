import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { CtaBannerSection } from "@/components/home/CtaBannerSection";
import { CoachesGrid } from "@/components/about/CoachesGrid";

export const metadata: Metadata = {
  title: "About TL Elite Hockey",
  description:
    "Meet the coaching staff behind TL Elite Hockey School. Brendan Heayden and Mitch Walinski bring competitive hockey experience to youth player development in Greater Boston.",
};

const coaches = [
  {
    name: "BRENDAN HEAYDEN",
    role: "Founder & Head Coach",
    photo: "/images/DSC02646.jpg",
    bio: "Brendan Heayden founded TL Elite Hockey School in 2021 with one goal: give young players the same level of instruction and intensity that shaped his own career. A lifelong hockey player with deep roots in New England hockey, Brendan brings a competitive mindset and a player-first approach to every session.",
  },
  {
    name: "MITCH WALINSKI",
    role: "Assistant Coach",
    photo: "/images/DSC02709.jpg",
    bio: "Mitch Walinski joined TL Elite as assistant coach and quickly became an integral part of the program's identity. Known for his ability to connect with players of all ages, Mitch brings energy and technical precision to every session.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        heading="OUR STORY"
        body="Building elite youth hockey players through intensity, discipline, and precision."
        backgroundImage="/images/DSC02709.jpg"
        ctaLabel="Book a Session"
        ctaHref="/book"
        objectPosition="center 20%"
      />

      {/* Stats bar */}
      <div className="bg-[#111111] border-y border-white/10">
        <div className="mx-auto max-w-4xl px-5 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { num: "200+", label: "Players Trained" },
            { num: "4+", label: "Seasons Running" },
            { num: "8 Max", label: "Per Group" },
            { num: "2", label: "Rink Locations" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-black text-white">{s.num}</p>
              <p className="text-xs uppercase tracking-widest text-white mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coaches */}
      <SectionWrapper className="bg-[#111111]">
        <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] text-center mb-3">
          THE COACHES
        </p>
        <h2 className="section-heading text-white text-2xl sm:text-4xl text-center mb-10 sm:mb-14">
          MEET THE TEAM
        </h2>

        <CoachesGrid coaches={coaches} />
      </SectionWrapper>

      {/* Mission Statement — image background */}
      <div className="relative py-24 sm:py-36 overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/DSC02727.jpg"
          alt="TL Elite Hockey training on the ice"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10 text-center">
          <span className="block text-[#F78E2B] text-[80px] sm:text-[120px] leading-none font-serif text-center opacity-20 select-none -mb-6 sm:-mb-8">
            &ldquo;
          </span>
          <h2 className="section-heading text-white text-3xl sm:text-5xl lg:text-6xl text-center">
            INTENSITY.
            <br />
            DISCIPLINE.
            <br />
            PRECISION.
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto text-center mt-5 sm:mt-6 leading-relaxed px-2 sm:px-0">
            These aren&apos;t just words on a wall. They&apos;re the standard we hold
            every player and coach to every time the puck drops. TL Elite was
            built on the belief that elite development doesn&apos;t require elite
            access — it requires elite effort.
          </p>
        </div>
      </div>

      <TestimonialsSection />
      <CtaBannerSection />
    </>
  );
}
