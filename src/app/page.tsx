import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { MissionSection } from "@/components/home/MissionSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProductCarouselSection } from "@/components/home/ProductCarouselSection";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { CtaBannerSection } from "@/components/home/CtaBannerSection";
import { getProducts } from "@/services/products.service";

export const metadata: Metadata = {
  title:
    "TL Elite Hockey | Youth Player Development | Thayer Sports Center, Braintree, MA",
  description:
    "TL Elite Hockey School provides small-group and private youth hockey training in Greater Boston. Book drop-in sessions, Spring and Summer packages at Thayer Sports Center, Braintree MA.",
};

export default async function HomePage() {
  const products = await getProducts({ limit: 4 });

  return (
    <>
      <HomeHero />
      <MissionSection />
      <ServicesSection />
      <ProductCarouselSection products={products} />
      <TestimonialsSection />
      <CtaBannerSection />
    </>
  );
}
