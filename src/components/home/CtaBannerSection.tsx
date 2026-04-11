import Link from "next/link";

export function CtaBannerSection() {
  return (
    <section
      className="py-24 text-center"
      style={{
        background: "linear-gradient(to right, #0a1f0a, #1a0a00)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-white text-3xl sm:text-5xl">
          READY TO ELEVATE YOUR GAME?
        </h2>
        <p className="text-white/70 mt-4 text-lg">
          Limited spots available for Spring 2026 and Summer 2026 programs.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <Link
            href="/book?season=Spring+2026"
            className="bg-[#4CAF50] rounded-full px-8 py-4 text-white font-bold uppercase text-sm hover:bg-[#43A047] transition-colors"
          >
            Book Spring 2026
          </Link>
          <Link
            href="/book?season=Summer+2026"
            className="bg-[#F78E2B] rounded-full px-8 py-4 text-white font-bold uppercase text-sm hover:bg-[#e07e22] transition-colors"
          >
            Book Summer 2026
          </Link>
        </div>
      </div>
    </section>
  );
}
