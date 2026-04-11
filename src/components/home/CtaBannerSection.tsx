import Link from "next/link";
import Image from "next/image";

export function CtaBannerSection() {
  return (
    <section className="relative py-28 text-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/DSC02736.jpg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] font-bold mb-4">
          LIMITED SPOTS AVAILABLE
        </p>
        <h2 className="section-heading text-white text-3xl sm:text-5xl lg:text-6xl">
          READY TO ELEVATE
          <br />
          YOUR GAME?
        </h2>
        <p className="text-white/70 mt-5 text-lg max-w-xl mx-auto leading-relaxed">
          Spring 2026 and Summer 2026 programs are filling fast. Don&apos;t miss your spot.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/book?season=Spring+2026"
            className="bg-[#4CAF50] rounded-full px-10 py-4 text-white font-bold uppercase text-sm tracking-wide hover:bg-[#43A047] transition-colors"
          >
            Book Spring 2026
          </Link>
          <Link
            href="/book?season=Summer+2026"
            className="bg-[#F78E2B] rounded-full px-10 py-4 text-white font-bold uppercase text-sm tracking-wide hover:bg-[#e07e22] transition-colors"
          >
            Book Summer 2026
          </Link>
        </div>
      </div>
    </section>
  );
}
