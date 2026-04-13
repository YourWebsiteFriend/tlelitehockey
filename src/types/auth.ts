import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address." }),
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;
