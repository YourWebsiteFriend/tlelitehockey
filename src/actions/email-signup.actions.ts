'use server';

import { getSupabaseServerClient } from '@/lib/supabase/server';
import { EmailSignupSchema } from '@/types/email-signup';

export async function signupEmail(
  input: unknown
): Promise<{ success: boolean; error?: string }> {
  const parsed = EmailSignupSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input.' };
  }

  const { email, source } = parsed.data;

  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.from('email_signups').insert({
    email: email.toLowerCase().trim(),
    source,
  });

  if (error) {
    // Postgres unique violation — email already subscribed, treat as success
    if (error.code === '23505') {
      return { success: true };
    }
    console.error('[email-signup.actions] signupEmail insert error:', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }

  return { success: true };
}
