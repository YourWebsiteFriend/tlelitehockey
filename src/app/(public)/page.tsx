export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { StatsBar } from "@/components/home/StatsBar";
import { MissionSection } from "@/components/home/MissionSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FacilitiesSection } from "@/components/home/FacilitiesSection";
import { PricingSection } from "@/components/home/PricingSection";
import { ProductCarouselSection } from "@/components/home/ProductCarouselSection";
import { CoachTeaser } from "@/components/home/CoachTeaser";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { PhotoGallery } from "@/components/home/PhotoGallery";
import { CtaBannerSection } from "@/components/home/CtaBannerSection";
import { getProducts } from "@/services/products.service";

export const metadata: Metadata = {
  title: "Elite Youth Hockey Training in Greater Boston",
  description:
    "TL Elite Hockey School — small-group youth hockey training at Thayer Sports Center, Braintree MA. Book Spring 2026 and Summer 2026 sessions now.",
};

export default async function HomePage() {
  const products = await getProducts({ limit: 4 });

  return (
    <>
      <HomeHero />
      <StatsBar />
      <MissionSection />
      <ServicesSection />
      <FacilitiesSection />
      <PricingSection />
      {products.length > 0 && <ProductCarouselSection products={products} />}
      <CoachTeaser />
      <TestimonialsSection />
      <InstagramSection />
      <PhotoGallery />
      <CtaBannerSection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsOrganization",
            "name": "TL Elite Hockey School",
            "url": "https://www.tlelitehockey.com",
            "logo": "https://www.tlelitehockey.com/images/logo-primary.png",
            "description": "Elite small-group youth hockey training in Greater Boston.",
            "telephone": "+15086415842",
            "email": "brendan@tlelitehockey.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1515 Washington St",
              "addressLocality": "Braintree",
              "addressRegion": "MA",
              "postalCode": "02184",
              "addressCountry": "US"
            },
            "sameAs": [
              "https://www.instagram.com/tlelitehockey",
              "https://www.facebook.com/tlelitehockey"
            ]
          }),
        }}
      />
    </>
  );
}
