import { z } from "zod";

export const SessionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  age_group: z.string().nullable(),
  day: z.string().nullable(),
  duration_minutes: z.number().int().positive(),
  price: z.number().nonnegative(),
  season: z.enum(["Drop Ins", "Spring 2026", "Summer 2026", "Clinics"]),
  start_date: z.string().nullable(), // ISO date string from Supabase
  spots_left: z.number().int().nonnegative(),
  max_capacity: z.number().int().positive(),
  stripe_product_id: z.string().nullable(),
  stripe_price_id: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;

export type SessionSeason = Session["season"];
