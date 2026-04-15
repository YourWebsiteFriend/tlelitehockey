import Image from "next/image";
import { Camera } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const tiles = [
  { src: "/images/DSC02650.jpg", alt: "TL Elite hockey training action" },
  { src: "/images/DSC02665.jpg", alt: "Youth player development at TL Elite" },
  { src: "/images/DSC02680.jpg", alt: "Small group session at TL Elite Hockey" },
  { src: "/images/DSC02709.jpg", alt: "Coach and player at TL Elite Hockey" },
  { src: "/images/DSC02739.jpg", alt: "Group action shot at TL Elite" },
  { src: "/images/DSC02755.jpg", alt: "Multi-player clinic at TL Elite Hockey School" },
];

export function InstagramSection() {
  return (
    <SectionWrapper className="bg-black">
      <div className="text-center mb-8">
        <h2 className="section-heading text-white text-2xl sm:text-4xl">
          FOLLOW THE JOURNEY
        </h2>
        <p className="text-white/50 text-sm mt-2">Tag us @tlelitehockey</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
        {tiles.map((tile) => (
          <a
            key={tile.src}
            href="https://www.instagram.com/tlelitehockey"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View TL Elite Hockey on Instagram"
            className="relative aspect-square overflow-hidden group"
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 33vw, 16vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Camera className="text-white w-6 h-6" aria-hidden="true" />
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href="https://www.instagram.com/tlelitehockey"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-white text-white text-sm font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
        >
          Follow @tlelitehockey on Instagram
        </a>
      </div>
    </SectionWrapper>
  );
}
