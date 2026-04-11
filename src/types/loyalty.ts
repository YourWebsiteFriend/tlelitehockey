import { z } from "zod";

export const LoyaltyActionSchema = z.enum([
  "signup",
  "booking",
  "purchase",
  "online_program",
  "redemption",
]);

export const LoyaltyTransactionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  action: LoyaltyActionSchema,
  points: z.number().int(), // Positive = earned, negative = redeemed
  reference_id: z.string().uuid().nullable(),
  note: z.string().nullable(),
  created_at: z.string(),
});

export type LoyaltyTransaction = z.infer<typeof LoyaltyTransactionSchema>;
export type LoyaltyAction = z.infer<typeof LoyaltyActionSchema>;

// Points awarded per action
export const LOYALTY_POINTS = {
  signup: 15,
  booking: 10,
  purchase: 25,
  online_program: 20,
} as const satisfies Record<Exclude<LoyaltyAction, "redemption">, number>;

// Redemption thresholds
export const LOYALTY_REDEMPTIONS = {
  discount_10: { points: 50, reward: "$10 discount" },
  free_hat: { points: 125, reward: "Free Hat" },
} as const;
