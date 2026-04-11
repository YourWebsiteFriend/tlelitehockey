import { z } from "zod";

export const ContactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required.")
    .max(100, "First name is too long."),
  lastName: z
    .string()
    .min(1, "Last name is required.")
    .max(100, "Last name is too long."),
  email: z.string().email("Please enter a valid email address."),
  birthYear: z
    .string()
    .regex(/^\d{4}$/, "Please enter a valid 4-digit birth year.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message is too long."),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
