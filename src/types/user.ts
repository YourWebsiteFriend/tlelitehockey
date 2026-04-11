import { z } from "zod";

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string(),
  email: z.string().email(),
  pro_status: z.enum(["free", "member"]).default("free"),
  loyalty_points: z.number().int().nonnegative().default(0),
  created_at: z.string(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type ProStatus = UserProfile["pro_status"];
