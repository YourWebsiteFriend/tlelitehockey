/**
 * Admin Service — all queries use the service-role client (bypasses RLS).
 * Never expose this service to client components.
 */

import { getSupabaseServiceClient } from '@/lib/supabase/server';
import type {
  AdminStats,
  AdminBooking,
  AdminMessage,
  AdminSignup,
  AdminAnalytics,
  SiteContent,
  SessionCreateInput,
  SessionUpdateInput,
} from '@/types/admin';
import type { Session } from '@/types/session';

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export async function fetchAdminStats(): Promise<AdminStats> {
  const supabase = await getSupabaseServiceClient();

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { count: activeSessions },
    { count: bookings30d },
    { count: unreadMessages },
    { count: emailSignups },
  ] = await Promise.all([
    supabase
      .from('sessions')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true),
    supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'confirmed')
      .gte('created_at', thirtyDaysAgo),
    supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false),
    supabase
      .from('email_signups')
      .select('*', { count: 'exact', head: true }),
  ]);

  return {
    activeSessions: activeSessions ?? 0,
    bookings30d: bookings30d ?? 0,
    unreadMessages: unreadMessages ?? 0,
    emailSignups: emailSignups ?? 0,
  };
}

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

export async function fetchAllSessions(): Promise<Session[]> {
  const supabase = await getSupabaseServiceClient();

  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as Session[];
}

export async function fetchSessionById(id: string): Promise<Session | null> {
  const supabase = await getSupabaseServiceClient();

  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // not found
    throw error;
  }
  return data as Session;
}

export async function createSession(input: SessionCreateInput): Promise<Session> {
  const supabase = await getSupabaseServiceClient();

  const { data, error } = await supabase
    .from('sessions')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as Session;
}

export async function updateSession(
  id: string,
  input: Omit<SessionUpdateInput, 'id'>
): Promise<Session> {
  const supabase = await getSupabaseServiceClient();

  const { data, error } = await supabase
    .from('sessions')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Session;
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

export async function fetchAllBookings(filters?: {
  sessionId?: string;
  status?: string;
}): Promise<AdminBooking[]> {
  const supabase = await getSupabaseServiceClient();

  let query = supabase
    .from('bookings')
    .select(
      `
      id,
      user_id,
      session_id,
      stripe_checkout_session_id,
      stripe_payment_intent_id,
      amount_paid,
      status,
      created_at,
      profiles ( email ),
      sessions ( name, price )
    `
    )
    .order('created_at', { ascending: false });

  if (filters?.sessionId) {
    query = query.eq('session_id', filters.sessionId);
  }
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query;
  if (error) throw error;

  return ((data ?? []) as unknown[]).map((row) => {
    const r = row as {
      id: string;
      user_id: string;
      session_id: string;
      stripe_checkout_session_id: string | null;
      stripe_payment_intent_id: string | null;
      amount_paid: number | null;
      status: 'pending' | 'confirmed' | 'cancelled';
      created_at: string;
      profiles: { email: string } | null;
      sessions: { name: string; price: number } | null;
    };

    return {
      id: r.id,
      user_id: r.user_id,
      session_id: r.session_id,
      stripe_checkout_session_id: r.stripe_checkout_session_id,
      stripe_payment_intent_id: r.stripe_payment_intent_id,
      amount_paid: r.amount_paid,
      status: r.status,
      created_at: r.created_at,
      profile_email: r.profiles?.email ?? null,
      session_name: r.sessions?.name ?? '',
      session_price: r.sessions?.price ?? 0,
    };
  });
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

export async function fetchAllMessages(filters?: {
  formType?: string;
  unreadOnly?: boolean;
}): Promise<AdminMessage[]> {
  const supabase = await getSupabaseServiceClient();

  let query = supabase
    .from('contact_submissions')
    .select('id, form_type, data, is_read, created_at')
    .order('created_at', { ascending: false });

  if (filters?.formType) {
    query = query.eq('form_type', filters.formType);
  }
  if (filters?.unreadOnly) {
    query = query.eq('is_read', false);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as AdminMessage[];
}

export async function fetchMessageById(id: string): Promise<AdminMessage | null> {
  const supabase = await getSupabaseServiceClient();

  const { data, error } = await supabase
    .from('contact_submissions')
    .select('id, form_type, data, is_read, created_at')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as AdminMessage;
}

export async function markMessageRead(id: string): Promise<void> {
  const supabase = await getSupabaseServiceClient();

  const { error } = await supabase
    .from('contact_submissions')
    .update({ is_read: true })
    .eq('id', id);

  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Email Signups
// ---------------------------------------------------------------------------

export async function fetchEmailSignups(): Promise<AdminSignup[]> {
  const supabase = await getSupabaseServiceClient();

  const { data, error } = await supabase
    .from('email_signups')
    .select('id, email, source, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as AdminSignup[];
}

// ---------------------------------------------------------------------------
// Site Content
// ---------------------------------------------------------------------------

export async function fetchSiteContent(): Promise<SiteContent[]> {
  const supabase = await getSupabaseServiceClient();

  const { data, error } = await supabase
    .from('site_content')
    .select('id, key, value, updated_at, updated_by')
    .order('key', { ascending: true });

  if (error) throw error;
  return (data ?? []) as SiteContent[];
}

export async function upsertSiteContent(
  key: string,
  value: string,
  adminEmail: string
): Promise<void> {
  const supabase = await getSupabaseServiceClient();

  const { error } = await supabase.from('site_content').upsert(
    {
      key,
      value,
      updated_at: new Date().toISOString(),
      updated_by: adminEmail,
    },
    { onConflict: 'key' }
  );

  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------

export async function fetchAnalytics(days: 7 | 30 | 90): Promise<AdminAnalytics> {
  const supabase = await getSupabaseServiceClient();

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const [bookingsResult, signupsResult] = await Promise.all([
    supabase
      .from('bookings')
      .select('created_at')
      .eq('status', 'confirmed')
      .gte('created_at', since),
    supabase
      .from('email_signups')
      .select('created_at')
      .gte('created_at', since),
  ]);

  if (bookingsResult.error) throw bookingsResult.error;
  if (signupsResult.error) throw signupsResult.error;

  const aggregate = (rows: { created_at: string }[]) => {
    const counts: Record<string, number> = {};
    for (const row of rows) {
      const date = row.created_at.slice(0, 10); // YYYY-MM-DD
      counts[date] = (counts[date] ?? 0) + 1;
    }
    return Object.entries(counts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  return {
    bookingsByDay: aggregate(bookingsResult.data ?? []),
    signupsByDay: aggregate(signupsResult.data ?? []),
  };
}
