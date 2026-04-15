"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import type { Product, ProductBadge } from "@/types/product";

interface Props {
  products: Product[];
}

function badgeClass(badge: ProductBadge): string {
  switch (badge) {
    case "Best Seller":
      return "bg-[#4CAF50]";
    case "New Arrival":
      return "bg-[#F78E2B]";
    case "Limited Edition":
      return "bg-white/20";
  }
}

export function ProductCarouselSection({ products }: Props) {
  return (
    <SectionWrapper className="bg-black">
      <h2 className="section-heading text-white text-2xl sm:text-4xl text-center mb-2">
        SHOP TL GEAR
      </h2>
      <span className="block w-12 h-1 bg-[#F78E2B] mx-auto mt-3 mb-10 sm:mb-14" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-1 sm:px-0">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#111111] rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-colors"
          >
            {/* Image */}
            <div className="relative aspect-square bg-[#1a1a1a] flex items-center justify-center">
              {product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  fill
                  alt={product.name}
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <ShoppingBag className="w-12 h-12 text-white/20" />
              )}
              {product.badge && (
                <span
                  className={`absolute top-3 left-3 ${badgeClass(product.badge)} text-white text-xs font-bold px-3 py-1 rounded-full`}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                {product.category}
              </p>
              <p className="text-white font-bold text-sm mb-2">{product.name}</p>
              <div className="flex items-baseline gap-2">
                {product.sale_price ? (
                  <>
                    <s className="text-white/40 text-xs">${product.price}</s>
                    <span className="text-[#F78E2B] font-black">
                      ${product.sale_price}
                    </span>
                  </>
                ) : (
                  <span className="text-white font-bold">${product.price}</span>
                )}
              </div>
              <Link
                href={`/shop#${product.slug}`}
                className="block border border-white/20 rounded-full text-white/70 text-xs px-4 py-2 hover:bg-white/10 w-full mt-3 text-center transition-colors"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/shop"
          className="bg-[#F78E2B] rounded-full px-10 py-4 text-white font-bold uppercase text-sm tracking-wide hover:bg-[#e07e22] transition-colors inline-block"
        >
          Shop All Gear →
        </Link>
      </div>
    </SectionWrapper>
  );
}
