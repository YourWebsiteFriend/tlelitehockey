'use server';

import { getSupabaseServerClient } from '@/lib/supabase/server';
import { awardLoyaltyPoints } from '@/services/loyalty.service';
import type { ActionResult } from '@/types/action';

export async function signUp(
  email: string,
  password: string,
  fullName: string
): Promise<ActionResult<void>> {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error('[auth.actions] signUp error:', error);
    return { success: false, error: error.message };
  }

  // Award signup loyalty points — non-blocking
  if (data.user) {
    try {
      await awardLoyaltyPoints(data.user.id, 'signup');
    } catch (loyaltyErr) {
      console.error('[auth.actions] signUp loyalty award error (non-blocking):', loyaltyErr);
    }
  }

  return { success: true, data: undefined };
}

export async function signIn(
  email: string,
  password: string
): Promise<ActionResult<void>> {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('[auth.actions] signIn error:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data: undefined };
}

export async function signOut(): Promise<ActionResult<void>> {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('[auth.actions] signOut error:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data: undefined };
}

export async function sendPasswordReset(
  email: string
): Promise<ActionResult<void>> {
  try {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    });
    if (error) {
      console.error("[auth.actions] sendPasswordReset error:", error);
      // Always return success to avoid leaking whether email exists
    }
    return { success: true, data: undefined };
  } catch (err) {
    console.error("[auth.actions] sendPasswordReset unexpected error:", err);
    return { success: true, data: undefined }; // Still return success
  }
}
