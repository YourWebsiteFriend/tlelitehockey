import { z } from 'zod';

// ---------------------------------------------------------------------------
// AdminStats
// ---------------------------------------------------------------------------
export const AdminStatsSchema = z.object({
  activeSessions: z.number().int().nonnegative(),
  bookings30d: z.number().int().nonnegative(),
  unreadMessages: z.number().int().nonnegative(),
  emailSignups: z.number().int().nonnegative(),
});

export type AdminStats = z.infer<typeof AdminStatsSchema>;

// ---------------------------------------------------------------------------
// AdminBooking — booking row joined with profile email, session name/price
// ---------------------------------------------------------------------------
export const AdminBookingSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  session_id: z.string().uuid(),
  stripe_checkout_session_id: z.string().nullable(),
  stripe_payment_intent_id: z.string().nullable(),
  amount_paid: z.number().nullable(),
  status: z.enum(['pending', 'confirmed', 'cancelled']),
  created_at: z.string(),
  // joined fields
  profile_email: z.string().nullable(),
  session_name: z.string(),
  session_price: z.number(),
});

export type AdminBooking = z.infer<typeof AdminBookingSchema>;

// ---------------------------------------------------------------------------
// AdminMessage — contact_submissions row with is_read
// ---------------------------------------------------------------------------
export const AdminMessageSchema = z.object({
  id: z.string().uuid(),
  form_type: z.enum(['contact', 'private_lessons']),
  data: z.record(z.string(), z.unknown()),
  is_read: z.boolean(),
  replied_at: z.string().nullable(),
  created_at: z.string(),
});

export type AdminMessage = z.infer<typeof AdminMessageSchema>;

// ---------------------------------------------------------------------------
// AdminSignup — email_signups row
// ---------------------------------------------------------------------------
export const AdminSignupSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  source: z.enum(['popup', 'footer', 'inline']),
  created_at: z.string(),
});

export type AdminSignup = z.infer<typeof AdminSignupSchema>;

// ---------------------------------------------------------------------------
// SessionCreateSchema — all fields required to create a session
// ---------------------------------------------------------------------------
export const SessionCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age_group: z.string().nullable().default(null),
  day: z.string().nullable().default(null),
  duration_minutes: z.number().int().positive('Duration must be a positive integer'),
  price: z.number().nonnegative('Price must be non-negative'),
  season: z.enum(['Drop Ins', 'Spring 2026', 'Summer 2026', 'Clinics']),
  start_date: z.string().nullable().default(null),
  spots_left: z.number().int().nonnegative('Spots left must be non-negative'),
  max_capacity: z.number().int().positive('Max capacity must be a positive integer'),
  stripe_product_id: z.string().nullable().default(null),
  stripe_price_id: z.string().nullable().default(null),
});

export type SessionCreateInput = z.infer<typeof SessionCreateSchema>;

// ---------------------------------------------------------------------------
// SessionUpdateSchema — same fields but all optional except id
// ---------------------------------------------------------------------------
export const SessionUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).optional(),
  age_group: z.string().nullable().optional(),
  day: z.string().nullable().optional(),
  duration_minutes: z.number().int().positive().optional(),
  price: z.number().nonnegative().optional(),
  season: z.enum(['Drop Ins', 'Spring 2026', 'Summer 2026', 'Clinics']).optional(),
  start_date: z.string().nullable().optional(),
  spots_left: z.number().int().nonnegative().optional(),
  max_capacity: z.number().int().positive().optional(),
  stripe_product_id: z.string().nullable().optional(),
  stripe_price_id: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
});

export type SessionUpdateInput = z.infer<typeof SessionUpdateSchema>;

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------
export const DailyCountSchema = z.object({
  date: z.string(),   // ISO date string (YYYY-MM-DD)
  count: z.number().int().nonnegative(),
});

export type DailyCount = z.infer<typeof DailyCountSchema>;

export const AdminAnalyticsSchema = z.object({
  bookingsByDay: z.array(DailyCountSchema),
  signupsByDay: z.array(DailyCountSchema),
});

export type AdminAnalytics = z.infer<typeof AdminAnalyticsSchema>;

// ---------------------------------------------------------------------------
// SiteContent row
// ---------------------------------------------------------------------------
export const SiteContentSchema = z.object({
  id: z.string().uuid(),
  key: z.string(),
  value: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export type SiteContent = z.infer<typeof SiteContentSchema>;
