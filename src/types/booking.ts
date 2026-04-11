import { z } from "zod";

export const BookingStatusSchema = z.enum(["pending", "confirmed", "cancelled"]);

export const BookingSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  session_id: z.string().uuid(),
  stripe_checkout_session_id: z.string().nullable(),
  stripe_payment_intent_id: z.string().nullable(),
  amount_paid: z.number().nonnegative().nullable(),
  status: BookingStatusSchema,
  created_at: z.string(),
});

export type Booking = z.infer<typeof BookingSchema>;
export type BookingStatus = z.infer<typeof BookingStatusSchema>;

// Form schema used by UI Agent for the booking modal
export const BookingFormSchema = z.object({
  session_id: z.string().uuid({ message: "Please select a session." }),
  // The user is already authenticated; their profile fills name/email
  // This schema captures any additional fields the modal may collect
});

export type BookingFormData = z.infer<typeof BookingFormSchema>;
