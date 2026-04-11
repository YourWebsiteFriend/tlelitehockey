import { z } from "zod";

export const ProductBadgeSchema = z.enum([
  "New Arrival",
  "Limited Edition",
  "Best Seller",
]);

export const ProductCategorySchema = z.enum([
  "Hats",
  "T-Shirts",
  "Hoodies",
  "Snapbacks",
]);

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  price: z.number().nonnegative(),
  sale_price: z.number().nonnegative().nullable(),
  images: z.array(z.string().url()),
  badge: ProductBadgeSchema.nullable(),
  category: ProductCategorySchema,
  description: z.string().nullable(),
  stripe_product_id: z.string().nullable(),
  stripe_price_id: z.string().nullable(),
  is_active: z.boolean(),
  sort_order: z.number().int(),
  created_at: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductBadge = z.infer<typeof ProductBadgeSchema>;
export type ProductCategory = z.infer<typeof ProductCategorySchema>;
