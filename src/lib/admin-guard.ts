import { getSupabaseServerClient } from '@/lib/supabase/server';
import type { User } from '@supabase/supabase-js';

/**
 * requireAdminUser — call at the top of every admin Server Action.
 *
 * Gets the current Supabase session user, then verifies their email is listed
 * in the ADMIN_EMAILS environment variable (comma-separated).
 *
 * Throws Error("Unauthorized") if the user is not authenticated or not an admin.
 * Returns the Supabase User object on success.
 */
export async function requireAdminUser(): Promise<User> {
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Unauthorized');
  }

  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!user.email || !adminEmails.includes(user.email.toLowerCase())) {
    throw new Error('Unauthorized');
  }

  return user;
}
