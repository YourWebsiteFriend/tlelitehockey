export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/ShopClient";
import { getProducts } from "@/services/products.service";

export const metadata: Metadata = {
  title: "TL Elite Hockey Shop",
  description:
    "Shop TL Elite Hockey gear — apparel, sticks, training equipment. Official TL Elite merchandise.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return <ShopClient products={products} />;
}
