import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const coaches = [
  {
    name: "BRENDAN HEAYDEN",
    role: "Founder & Head Coach",
    image: "/images/DSC02646.jpg",
    alt: "Brendan Heayden, founder and head coach of TL Elite Hockey",
    bio: "Brendan founded TL Elite in 2021 with one goal: give young players the same level of intensity and instruction that shaped his own career. He brings a competitive mindset and player-first approach to every session.",
  },
  {
    name: "MITCH WALINSKI",
    role: "Assistant Coach",
    image: "/images/DSC02709.jpg",
    alt: "Mitch Walinski, assistant coach at TL Elite Hockey",
    bio: "Mitch joined TL Elite and quickly became a cornerstone of the program. Known for connecting with players of all ages, he brings technical precision and high energy to every session on the ice.",
  },
];

export function CoachTeaser() {
  return (
    <SectionWrapper className="bg-black">
      <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] text-center mb-3">
        THE COACHING STAFF
      </p>
      <h2 className="section-heading text-white text-2xl sm:text-4xl text-center mb-10 sm:mb-14">
        MEET THE COACHES BEHIND TL ELITE
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {coaches.map((coach) => (
          <div
            key={coach.name}
            className="bg-[#111111] rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="relative h-52 w-full">
              <Image
                src={coach.image}
                alt={coach.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <p className="text-[#F78E2B] text-xs uppercase tracking-widest mb-1">
                {coach.role}
              </p>
              <h3 className="text-white font-black uppercase text-lg mb-3">
                {coach.name}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{coach.bio}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/about"
          className="text-white/70 hover:text-white text-sm font-bold transition-colors hover:underline underline-offset-4"
        >
          Meet the Full Coaching Staff →
        </Link>
      </div>
    </SectionWrapper>
  );
}
