import { resend } from '@/lib/resend/client';
import type { ContactFormData } from '@/types/contact';
import type { PrivateLessonsFormData } from '@/types/private-lessons';

const FROM_ADDRESS = 'onboarding@resend.dev';

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const html = `
    <h2>New Contact Form Submission</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold; width: 40%;">First Name</td>
        <td style="border: 1px solid #e2e8f0;">${escapeHtml(data.firstName)}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">Last Name</td>
        <td style="border: 1px solid #e2e8f0;">${escapeHtml(data.lastName)}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">Email</td>
        <td style="border: 1px solid #e2e8f0;">${escapeHtml(data.email)}</td>
      </tr>
      ${data.birthYear ? `
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">Birth Year</td>
        <td style="border: 1px solid #e2e8f0;">${escapeHtml(data.birthYear)}</td>
      </tr>` : ''}
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold; vertical-align: top;">Message</td>
        <td style="border: 1px solid #e2e8f0; white-space: pre-wrap;">${escapeHtml(data.message)}</td>
      </tr>
    </table>
  `;

  const result = await resend.emails.send({
    from: FROM_ADDRESS,
    to: 'info@tlelitehockey.com',
    replyTo: data.email,
    subject: `New Contact Form Submission — ${data.firstName} ${data.lastName}`,
    html,
  });

  if (result.error) {
    throw new Error(`[email.service] sendContactEmail failed: ${result.error.message}`);
  }
}

export async function sendPrivateLessonsInquiry(data: PrivateLessonsFormData): Promise<void> {
  const html = `
    <h2>Private Lesson Inquiry</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold; width: 40%;">Player Name</td>
        <td style="border: 1px solid #e2e8f0;">${escapeHtml(data.playerName)}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">Guardian / Parent Name</td>
        <td style="border: 1px solid #e2e8f0;">${escapeHtml(data.guardianName)}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">Email</td>
        <td style="border: 1px solid #e2e8f0;">${escapeHtml(data.email)}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">Birthdate</td>
        <td style="border: 1px solid #e2e8f0;">${escapeHtml(data.birthdate.month)}/${escapeHtml(data.birthdate.day)}/${escapeHtml(data.birthdate.year)}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">Current Team</td>
        <td style="border: 1px solid #e2e8f0;">${data.currentTeam ? escapeHtml(data.currentTeam) : '—'}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">Position</td>
        <td style="border: 1px solid #e2e8f0;">${escapeHtml(data.position)}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">Rink Location</td>
        <td style="border: 1px solid #e2e8f0;">${escapeHtml(data.location)}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">Day Availability</td>
        <td style="border: 1px solid #e2e8f0;">${data.dayAvailability.map(escapeHtml).join(', ')}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">Preferred Time</td>
        <td style="border: 1px solid #e2e8f0;">${escapeHtml(data.preferredTime)}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold;">Skills Focus</td>
        <td style="border: 1px solid #e2e8f0;">${escapeHtml(data.skillsFocus)}</td>
      </tr>
      ${data.additionalInfo ? `
      <tr>
        <td style="border: 1px solid #e2e8f0; background: #f8fafc; font-weight: bold; vertical-align: top;">Additional Info</td>
        <td style="border: 1px solid #e2e8f0; white-space: pre-wrap;">${escapeHtml(data.additionalInfo)}</td>
      </tr>` : ''}
    </table>
  `;

  const result = await resend.emails.send({
    from: FROM_ADDRESS,
    to: 'brendanheayden@tlelitehockey.com',
    replyTo: data.email,
    subject: `Private Lesson Inquiry — ${data.playerName}`,
    html,
  });

  if (result.error) {
    throw new Error(`[email.service] sendPrivateLessonsInquiry failed: ${result.error.message}`);
  }
}

export async function sendReplyEmail({
  to,
  subject,
  body,
  fromName = 'Brendan Heayden',
}: {
  to: string;
  subject: string;
  body: string;
  fromName?: string;
}): Promise<void> {
  const { error } = await resend.emails.send({
    from: `${fromName} <brendan@tlelitehockey.com>`,
    to,
    subject,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto"><p style="white-space:pre-wrap">${body.replace(/\n/g, '<br>')}</p><hr style="border:1px solid #eee;margin-top:32px"><p style="color:#999;font-size:12px">TL Elite Hockey School — tlelitehockey.com</p></div>`,
    text: body,
  });
  if (error) throw error;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
