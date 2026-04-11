'use server';

import { getSupabaseServerClient } from '@/lib/supabase/server';
import { ContactFormSchema } from '@/types/contact';
import { sendContactEmail } from '@/services/email.service';
import type { ActionResult } from '@/types/action';

export async function submitContactForm(formData: unknown): Promise<ActionResult<void>> {
  const result = ContactFormSchema.safeParse(formData);

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
        form_type: 'contact',
        data: validatedData,
      });

    if (insertError) {
      console.error('[contact.actions] submitContactForm insert error:', insertError);
      return { success: false, error: 'Failed to submit form. Please try again.' };
    }
  } catch (err) {
    console.error('[contact.actions] submitContactForm unexpected error:', err);
    return { success: false, error: 'Failed to submit form. Please try again.' };
  }

  // Send email — non-blocking on failure
  try {
    await sendContactEmail(validatedData);
  } catch (emailErr) {
    console.error('[contact.actions] submitContactForm email error (non-blocking):', emailErr);
  }

  return { success: true, data: undefined };
}
