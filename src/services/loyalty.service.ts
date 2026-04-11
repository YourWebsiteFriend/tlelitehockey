import { getSupabaseServerClient, getSupabaseServiceClient } from '@/lib/supabase/server';
import { LOYALTY_POINTS } from '@/types/loyalty';
import type { LoyaltyTransaction } from '@/types/loyalty';

export async function getUserLoyaltyPoints(userId: string): Promise<number> {
  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('loyalty_points')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('[loyalty.service] getUserLoyaltyPoints error:', error);
      return 0;
    }

    return (data?.loyalty_points as number) ?? 0;
  } catch (err) {
    console.error('[loyalty.service] getUserLoyaltyPoints unexpected error:', err);
    return 0;
  }
}

export async function getUserLoyaltyTransactions(
  userId: string,
  limit?: number
): Promise<LoyaltyTransaction[]> {
  try {
    const supabase = await getSupabaseServerClient();

    let query = supabase
      .from('loyalty_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (limit !== undefined) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[loyalty.service] getUserLoyaltyTransactions error:', error);
      return [];
    }

    return (data as LoyaltyTransaction[]) ?? [];
  } catch (err) {
    console.error('[loyalty.service] getUserLoyaltyTransactions unexpected error:', err);
    return [];
  }
}

export async function awardLoyaltyPoints(
  userId: string,
  action: string,
  referenceId?: string
): Promise<void> {
  try {
    const supabase = await getSupabaseServiceClient();

    const points = LOYALTY_POINTS[action as keyof typeof LOYALTY_POINTS];
    if (points === undefined) {
      console.error(`[loyalty.service] awardLoyaltyPoints: unknown action "${action}"`);
      return;
    }

    // Insert the transaction record
    const { error: insertError } = await supabase
      .from('loyalty_transactions')
      .insert({
        user_id: userId,
        action,
        points,
        reference_id: referenceId ?? null,
        note: null,
      });

    if (insertError) {
      console.error('[loyalty.service] awardLoyaltyPoints insert error:', insertError);
      return;
    }

    // Read current points then update
    const { data: profileData, error: readError } = await supabase
      .from('profiles')
      .select('loyalty_points')
      .eq('id', userId)
      .single();

    if (readError) {
      console.error('[loyalty.service] awardLoyaltyPoints read profile error:', readError);
      return;
    }

    const currentPoints = (profileData?.loyalty_points as number) ?? 0;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ loyalty_points: currentPoints + points })
      .eq('id', userId);

    if (updateError) {
      console.error('[loyalty.service] awardLoyaltyPoints update profile error:', updateError);
    }
  } catch (err) {
    console.error('[loyalty.service] awardLoyaltyPoints unexpected error:', err);
  }
}
