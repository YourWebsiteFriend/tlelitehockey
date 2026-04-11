'use server';

import { getSupabaseServerClient } from '@/lib/supabase/server';
import { PrivateLessonsFormSchema } from '@/types/private-lessons';
import { sendPrivateLessonsInquiry } from '@/services/email.service';
import type { ActionResult } from '@/types/action';

export async function submitPrivateLessonsInquiry(formData: unknown): Promise<ActionResult<void>> {
  const result = PrivateLessonsFormSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      error: 'Validation failed',
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const validatedData = result.data;

  try {
    const supabase = await getSupabaseServerClient();

    const { error: insertError } = await supabase
      .from('contact_submissions')
      .insert({
        form_type: 'private_lessons',
        data: validatedData,
      });

    if (insertError) {
      console.error('[private-lessons.actions] submitPrivateLessonsInquiry insert error:', insertError);
      return { success: false, error: 'Failed to submit inquiry. Please try again.' };
    }
  } catch (err) {
    console.error('[private-lessons.actions] submitPrivateLessonsInquiry unexpected error:', err);
    return { success: false, error: 'Failed to submit inquiry. Please try again.' };
  }

  // Send email — non-blocking on failure
  try {
    await sendPrivateLessonsInquiry(validatedData);
  } catch (emailErr) {
    console.error('[private-lessons.actions] sendPrivateLessonsInquiry email error (non-blocking):', emailErr);
  }

  return { success: true, data: undefined };
}
