import { getSupabaseServerClient } from '@/lib/supabase/server';
import type { Session, SessionSeason } from '@/types/session';

export async function getSessionsBySeason(season?: SessionSeason): Promise<Session[]> {
  try {
    const supabase = await getSupabaseServerClient();

    let query = supabase
      .from('sessions')
      .select('*')
      .eq('is_active', true)
      .order('start_date', { ascending: true, nullsFirst: false });

    if (season !== undefined) {
      query = query.eq('season', season);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[sessions.service] getSessionsBySeason error:', error);
      return [];
    }

    return (data as Session[]) ?? [];
  } catch (err) {
    console.error('[sessions.service] getSessionsBySeason unexpected error:', err);
    return [];
  }
}

export async function getSessionById(id: string): Promise<Session | null> {
  try {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('[sessions.service] getSessionById error:', error);
      return null;
    }

    return (data as Session) ?? null;
  } catch (err) {
    console.error('[sessions.service] getSessionById unexpected error:', err);
    return null;
  }
}
