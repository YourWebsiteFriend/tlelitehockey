import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export function MissionSection() {
  return (
    <SectionWrapper className="bg-[#111111]">
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Left: decorative panel */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1a3a1a] to-[#0a0a0a] rounded-2xl overflow-hidden flex items-center justify-center">
          {/* Decorative TL mark */}
          <div className="text-center select-none pointer-events-none">
            <div className="text-[#4CAF50]/30 font-black text-[180px] leading-none tracking-tighter">
              TL
            </div>
            <div className="text-white/10 font-black uppercase tracking-[0.5em] text-sm mt-2">
              ELITE HOCKEY
            </div>
          </div>
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
