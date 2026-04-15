import Image from "next/image";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const facilities = [
  {
    name: "Thayer Sports Center",
    address: "1515 Washington St, Braintree MA",
    image: "/images/braintree-1.jpg",
    alt: "Thayer Sports Center ice rink in Braintree MA",
    mapsUrl: "https://maps.google.com/maps?q=Thayer+Sports+Center+1515+Washington+St+Braintree+MA",
  },
  {
    name: "Thayer Sports Center",
    address: "Sheet 2 — 1515 Washington St, Braintree MA",
    image: "/images/braintree-2.jpg",
    alt: "Second ice sheet at Thayer Sports Center in Braintree MA",
    mapsUrl: "https://maps.google.com/maps?q=Thayer+Sports+Center+1515+Washington+St+Braintree+MA",
  },
  {
    name: "Gallo Ice Arena",
    address: "Sandwich Rd, Bourne MA",
    image: "/images/braintree-3.jpg",
    alt: "Gallo Ice Arena in Bourne MA",
    mapsUrl: "https://maps.google.com/maps?q=Gallo+Ice+Arena+Sandwich+Rd+Bourne+MA",
  },
];

export function FacilitiesSection() {
  return (
    <SectionWrapper className="bg-[#111111]">
      <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] text-center mb-3">
        OUR FACILITIES
      </p>
      <h2 className="section-heading text-white text-2xl sm:text-4xl text-center mb-4">
        WHERE WE TRAIN
      </h2>
      <p className="text-white/50 text-center text-sm sm:text-base mb-10 sm:mb-14 max-w-xl mx-auto">
        Every session runs at top-tier rinks in the Greater Boston area.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <div
            key={facility.name}
            className="relative h-64 rounded-2xl overflow-hidden group"
          >
            <Image
              src={facility.image}
              alt={facility.alt}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            {/* Gradient: bottom-to-top so text at bottom is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Text at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-white font-black text-lg leading-tight">{facility.name}</p>
              <p className="text-white/60 text-sm mt-1">{facility.address}</p>
              <a
                href={facility.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[#4CAF50] text-sm mt-2 hover:underline"
              >
                Get Directions →
              </a>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
