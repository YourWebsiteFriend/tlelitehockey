'use client';

import { useState } from 'react';
import { sendAdminReply } from '@/actions/admin.actions';

interface ReplyComposerProps {
  messageId: string;
  contactEmail: string;
  contactName: string;
  formType: string;
  alreadyReplied: boolean;
  repliedAt: string | null;
}

function formatRepliedDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ReplyComposer({
  messageId,
  contactEmail,
  contactName,
  formType,
  alreadyReplied,
  repliedAt,
}: ReplyComposerProps) {
  const defaultSubject = `Re: ${formType.replace(/_/g, ' ')} Inquiry — TL Elite Hockey`;
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  async function handleSend() {
    if (!contactEmail) {
      setError('No email address found for this contact.');
      return;
    }
    if (!body.trim()) {
      setError('Please write a reply before sending.');
      return;
    }

    setError(null);
    setLoading(true);

    const result = await sendAdminReply(messageId, {
      to: contactEmail,
      subject,
      body,
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setBody('');
    } else {
      setError(result.error ?? 'Failed to send reply. Please try again.');
    }
  }

  return (
    <div className="bg-[#111111] rounded-2xl border border-white/10 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[#F78E2B] text-xs uppercase tracking-widest font-semibold mb-1">
            Send a Reply
          </p>
          <p className="text-white/40 text-sm">
            To: <span className="text-white/60">{contactName}</span>
            {contactEmail ? (
              <span className="text-white/30"> &lt;{contactEmail}&gt;</span>
            ) : (
              <span className="text-red-400/70 ml-1">(no email found)</span>
            )}
          </p>
        </div>

        {alreadyReplied && repliedAt && (
          <span className="bg-[#4CAF50]/15 text-[#4CAF50] text-xs px-3 py-1 rounded-full font-medium">
            Replied on {formatRepliedDate(repliedAt)}
          </span>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="reply-subject" className="block text-white/40 text-xs uppercase tracking-wider mb-1.5">
          Subject
        </label>
        <input
          id="reply-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:border-[#4CAF50] focus:outline-none transition-colors"
        />
      </div>

      {/* Body */}
      <div>
        <label htmlFor="reply-body" className="block text-white/40 text-xs uppercase tracking-wider mb-1.5">
          Message
        </label>
        <textarea
          id="reply-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type your reply…"
          rows={6}
          className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:border-[#4CAF50] focus:outline-none transition-colors resize-y"
          style={{ minHeight: '150px' }}
        />
      </div>

      {/* Feedback */}
      {success && (
        <p className="text-[#4CAF50] text-sm bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-lg px-4 py-2">
          Reply sent successfully!
        </p>
      )}
      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap pt-1">
        <button
          type="button"
          onClick={handleSend}
          disabled={loading || !contactEmail}
          className="bg-[#4CAF50] hover:bg-[#43A047] disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-full transition-colors text-sm tracking-wide"
        >
          {loading ? 'Sending…' : 'Send Reply'}
        </button>

        <a
          href={mailtoHref}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white/20 hover:border-white/40 text-white/60 hover:text-white py-3 px-6 rounded-full transition-colors text-sm"
        >
          Open in Gmail
        </a>
      </div>
    </div>
  );
}
