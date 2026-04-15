export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/ShopClient";
import { getProducts } from "@/services/products.service";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "TL Elite Hockey Shop",
  description:
    "Shop TL Elite Hockey gear — apparel, sticks, training equipment. Official TL Elite merchandise.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <PageHero
        heading="SHOP TL GEAR"
        body="Official TL Elite merchandise — represent the program on and off the ice."
        backgroundImage="/images/DSC02722.jpg"
        objectPosition="center 30%"
      />
      <ShopClient products={products} />
    </>
  );
}
