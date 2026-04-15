'use server';

import { requireAdminUser } from '@/lib/admin-guard';
import {
  fetchAdminStats,
  fetchAllSessions,
  fetchSessionById,
  createSession,
  updateSession,
  fetchAllBookings,
  fetchAllMessages,
  fetchMessageById,
  markMessageRead,
  fetchEmailSignups,
  fetchSiteContent,
  upsertSiteContent,
  fetchAnalytics,
} from '@/services/admin.service';
import {
  SessionCreateSchema,
  SessionUpdateSchema,
  type AdminStats,
  type AdminBooking,
  type AdminMessage,
  type AdminSignup,
  type AdminAnalytics,
  type SiteContent,
} from '@/types/admin';
import type { Session } from '@/types/session';
import type { ActionResult } from '@/types/action';

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export async function getAdminStats(): Promise<ActionResult<AdminStats>> {
  try {
    await requireAdminUser();
    const data = await fetchAdminStats();
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch stats';
    console.error('[admin.actions] getAdminStats:', err);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

export async function getAllSessions(): Promise<ActionResult<Session[]>> {
  try {
    await requireAdminUser();
    const data = await fetchAllSessions();
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch sessions';
    console.error('[admin.actions] getAllSessions:', err);
    return { success: false, error: message };
  }
}

export async function getSessionById(id: string): Promise<ActionResult<Session | null>> {
  try {
    await requireAdminUser();
    const data = await fetchSessionById(id);
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch session';
    console.error('[admin.actions] getSessionById:', err);
    return { success: false, error: message };
  }
}

export async function createSessionAction(input: unknown): Promise<ActionResult<Session>> {
  try {
    await requireAdminUser();

    const parsed = SessionCreateSchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? 'Invalid session data',
      };
    }

    const data = await createSession(parsed.data);
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create session';
    console.error('[admin.actions] createSession:', err);
    return { success: false, error: message };
  }
}

export async function updateSessionAction(
  id: string,
  input: unknown
): Promise<ActionResult<Session>> {
  try {
    await requireAdminUser();

    const parsed = SessionUpdateSchema.safeParse({ id, ...((input as object) ?? {}) });
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? 'Invalid session data',
      };
    }

    const { id: _id, ...fields } = parsed.data;
    const data = await updateSession(id, fields);
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update session';
    console.error('[admin.actions] updateSession:', err);
    return { success: false, error: message };
  }
}

export async function deactivateSession(id: string): Promise<ActionResult<Session>> {
  try {
    await requireAdminUser();
    const data = await updateSession(id, { is_active: false });
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to deactivate session';
    console.error('[admin.actions] deactivateSession:', err);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

export async function getAllBookings(
  filters?: { sessionId?: string; status?: string }
): Promise<ActionResult<AdminBooking[]>> {
  try {
    await requireAdminUser();
    const data = await fetchAllBookings(filters);
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch bookings';
    console.error('[admin.actions] getAllBookings:', err);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

export async function getAllMessages(
  filters?: { formType?: string; unreadOnly?: boolean }
): Promise<ActionResult<AdminMessage[]>> {
  try {
    await requireAdminUser();
    const data = await fetchAllMessages(filters);
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch messages';
    console.error('[admin.actions] getAllMessages:', err);
    return { success: false, error: message };
  }
}

export async function getMessageById(id: string): Promise<ActionResult<AdminMessage | null>> {
  try {
    await requireAdminUser();
    const data = await fetchMessageById(id);
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch message';
    console.error('[admin.actions] getMessageById:', err);
    return { success: false, error: message };
  }
}

export async function markMessageReadAction(id: string): Promise<ActionResult<void>> {
  try {
    await requireAdminUser();
    await markMessageRead(id);
    return { success: true, data: undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to mark message read';
    console.error('[admin.actions] markMessageRead:', err);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Email Signups
// ---------------------------------------------------------------------------

export async function getEmailSignups(): Promise<ActionResult<AdminSignup[]>> {
  try {
    await requireAdminUser();
    const data = await fetchEmailSignups();
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch signups';
    console.error('[admin.actions] getEmailSignups:', err);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Site Content
// ---------------------------------------------------------------------------

export async function getSiteContent(): Promise<ActionResult<SiteContent[]>> {
  try {
    await requireAdminUser();
    const data = await fetchSiteContent();
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch site content';
    console.error('[admin.actions] getSiteContent:', err);
    return { success: false, error: message };
  }
}

export async function updateSiteContent(
  key: string,
  value: string
): Promise<ActionResult<void>> {
  try {
    const user = await requireAdminUser();
    await upsertSiteContent(key, value, user.email ?? 'unknown');
    return { success: true, data: undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update site content';
    console.error('[admin.actions] updateSiteContent:', err);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------

export async function getAnalytics(
  days: 7 | 30 | 90
): Promise<ActionResult<AdminAnalytics>> {
  try {
    await requireAdminUser();
    const data = await fetchAnalytics(days);
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch analytics';
    console.error('[admin.actions] getAnalytics:', err);
    return { success: false, error: message };
  }
}
