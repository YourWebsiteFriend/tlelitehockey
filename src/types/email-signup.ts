import { z } from "zod";

export const EmailSignupSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  source: z.enum(["popup", "footer", "inline"]).default("popup"),
});

export type EmailSignupInput = z.infer<typeof EmailSignupSchema>;
