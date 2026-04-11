import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export function MissionSection() {
  return (
    <SectionWrapper className="bg-[#111111]">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: real action photo */}
        <div className="relative min-h-[300px] lg:min-h-0 lg:self-stretch rounded-2xl overflow-hidden bg-[#0a0a0a]">
          <Image
            src="/images/DSC02632.jpg"
            alt="Coach Brendan Heayden demonstrating on ice"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Right: green card */}
        <div className="bg-[#4CAF50] p-10 lg:p-16 flex flex-col justify-center rounded-2xl">
          <p className="text-white/70 text-xs uppercase tracking-[0.3em] mb-4">
            THE TL ELITE DIFFERENCE
          </p>
          <h2 className="section-heading text-white text-3xl lg:text-4xl leading-tight">
            INTENSITY.
            <br />
            DISCIPLINE.
            <br />
            PRECISION.
          </h2>
          <p className="text-white/90 mt-4 text-base leading-relaxed">
            We believe every rep counts. Our small-group model means coaches
            know every player by name — and push them to their ceiling every
            session. No wasted ice time. No coasting. Just elite development.
          </p>
          <Link
            href="/about"
            className="border-2 border-white text-white rounded-full px-8 py-3 mt-8 inline-block font-bold text-sm uppercase hover:bg-white hover:text-[#4CAF50] transition-colors self-start"
          >
            Our Story →
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
