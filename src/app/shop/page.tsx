import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/ShopClient";
import { getProducts } from "@/services/products.service";

export const metadata: Metadata = {
  title: "Shop TL Gear | TL Elite Hockey",
  description:
    "Official TL Elite Hockey merchandise. Hats, t-shirts, hoodies, and snapbacks.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return <ShopClient products={products} />;
}
