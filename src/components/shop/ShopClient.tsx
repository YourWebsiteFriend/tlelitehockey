"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import { CartProvider, useCart } from "@/components/shop/CartContext";
import { CartDrawer } from "@/components/shop/CartDrawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

type SortOption = "default" | "price-asc" | "price-desc";
type CategoryFilter = "All" | "Hats" | "T-Shirts" | "Hoodies" | "Snapbacks";

const ALL_CATEGORIES: CategoryFilter[] = ["All", "Hats", "T-Shirts", "Hoodies", "Snapbacks"];

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products];
  if (sort === "price-asc") copy.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
  if (sort === "price-desc") copy.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
  return copy;
}

function filterByCategory(products: Product[], category: CategoryFilter): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}

function ShopInner({ products }: Props) {
  const { addItem, itemCount } = useCart();
  const [sort, setSort] = useState<SortOption>("default");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const sorted = sortProducts(products, sort);
  const displayed = filterByCategory(sorted, category);

  // Only show tabs if products exist in that category
  const availableCategories = ALL_CATEGORIES.filter((cat) => {
    if (cat === "All") return true;
    return products.some((p) => p.category === cat);
  });

  const handleAddToCart = (product: Product) => {
    if (!product.stripe_price_id || !product.stripe_product_id) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.sale_price ?? product.price,
      salePrice: product.sale_price,
      image: product.images[0] ?? '',
      quantity: 1,
      stripeProductId: product.stripe_product_id,
      stripePriceId: product.stripe_price_id,
    });
    setCartOpen(true);
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-6 mb-8">
          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-[#111111] border border-white/20 rounded-full text-white/70 text-sm px-4 py-2 focus:outline-none focus:border-[#4CAF50] transition-colors"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-[#111111] border border-white/20 rounded-full p-3 text-white hover:border-white/40 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F78E2B] text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category filter tabs */}
        {availableCategories.length > 1 && (
          <div className="flex gap-6 border-b border-white/10 mb-10 overflow-x-auto">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`pb-3 text-sm font-bold uppercase tracking-wide whitespace-nowrap transition-colors ${
                  category === cat
                    ? "text-[#F78E2B] border-b-2 border-[#F78E2B]"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Product list */}
        <div className="flex flex-col gap-4">
          {displayed.map((product) => (
            <div
              key={product.id}
              id={product.slug}
              className="bg-[#111111] rounded-2xl border border-white/10 flex flex-col sm:flex-row overflow-hidden hover:border-white/30 transition-colors group"
            >
              {/* Image */}
              <div
                className="relative w-full h-48 sm:w-44 sm:h-auto sm:min-w-[11rem] bg-[#1a1a1a] cursor-pointer overflow-hidden"
                onClick={() => setQuickView(product)}
              >
                {product.images.length > 0 ? (
                  <>
                    <Image
                      src={product.images[0]}
                      fill
                      alt={product.name}
                      className="object-cover"
                      unoptimized
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#4CAF50]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-bold text-xs uppercase tracking-wide">
                        Quick View
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-white/20" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {product.badge && (
                        <span
                          className={`${badgeClass(product.badge)} text-white text-xs font-bold px-3 py-1 rounded-full`}
                        >
                          {product.badge}
                        </span>
                      )}
                      <p className="text-white/40 text-xs uppercase tracking-wide mt-2">
                        {product.category}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-white font-black text-lg uppercase mt-2">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-white/50 text-sm mt-2 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center mt-4">
                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    {product.sale_price ? (
                      <>
                        <s className="text-white/40 text-sm">${product.price}</s>
                        <span className="text-[#F78E2B] font-black text-xl">
                          ${product.sale_price}
                        </span>
                      </>
                    ) : (
                      <span className="text-white font-black text-xl">
                        ${product.price}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#4CAF50] rounded-full px-6 py-3 text-white font-bold text-sm hover:bg-[#43A047] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Quick View Dialog */}
      <Dialog open={!!quickView} onOpenChange={(open) => !open && setQuickView(null)}>
        <DialogContent className="bg-[#111111] border border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="section-heading text-white text-xl">
              {quickView?.name}
            </DialogTitle>
          </DialogHeader>
          {quickView && (
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="relative aspect-square bg-[#1a1a1a] rounded-xl overflow-hidden">
                {quickView.images.length > 0 ? (
                  <Image
                    src={quickView.images[0]}
                    fill
                    alt={quickView.name}
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="w-16 h-16 text-white/20" />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wide">
                    {quickView.category}
                  </p>
                  <h3 className="text-white font-black text-xl uppercase mt-1">
                    {quickView.name}
                  </h3>
                  {quickView.description && (
                    <p className="text-white/60 text-sm mt-4 leading-relaxed">
                      {quickView.description}
                    </p>
                  )}
                </div>
                <div className="mt-6">
                  <div className="flex items-baseline gap-2 mb-4">
                    {quickView.sale_price ? (
                      <>
                        <s className="text-white/40">${quickView.price}</s>
                        <span className="text-[#F78E2B] font-black text-2xl">
                          ${quickView.sale_price}
                        </span>
                      </>
                    ) : (
                      <span className="text-white font-black text-2xl">
                        ${quickView.price}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      handleAddToCart(quickView);
                      setQuickView(null);
                    }}
                    className="w-full bg-[#4CAF50] rounded-full py-3 text-white font-bold uppercase text-sm hover:bg-[#43A047] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function ShopClient({ products }: Props) {
  return (
    <CartProvider>
      <ShopInner products={products} />
    </CartProvider>
  );
}
