import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  heading: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: string;
}

export function PageHero({
  heading,
  body,
  ctaLabel,
  ctaHref,
  backgroundImage,
}: PageHeroProps) {
  return (
    <div className="relative w-full h-[60vh] min-h-[360px] flex items-center justify-center bg-black overflow-hidden">
      {/* Background image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
        <h1
          className={cn(
            "section-heading text-white",
            "text-4xl sm:text-5xl lg:text-6xl"
          )}
        >
          {heading}
        </h1>

        {body && (
          <p className="mt-4 text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {body}
          </p>
        )}

        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className={cn(
              "mt-8 inline-block rounded-full px-8 py-3",
              "bg-[#4CAF50] text-white font-bold text-sm sm:text-base",
              "hover:bg-[#43A047] transition-colors duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            )}
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
