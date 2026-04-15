import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMessageById } from '@/actions/admin.actions';
import { MarkReadButton } from '@/components/admin/MarkReadButton';
import { ReplyComposer } from '@/components/admin/ReplyComposer';

export const metadata = { title: 'Message | TL Elite Admin' };

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatRepliedDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatKey(key: string) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getMessageById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const message = result.data;

  const data = message.data as Record<string, unknown>;
  const contactEmail = typeof data.email === 'string' ? data.email : '';
  const contactName =
    typeof data.name === 'string'
      ? data.name
      : typeof data.firstName === 'string'
      ? data.firstName
      : 'there';

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/messages" className="text-white/40 hover:text-white text-sm transition-colors">
          ← Back to Messages
        </Link>
      </div>

      <div className="bg-[#111111] border border-white/10 rounded-xl p-6 space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
              {message.form_type.replace('_', ' ')}
            </p>
            <p className="text-white/40 text-sm">{formatDate(message.created_at)}</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {message.replied_at && (
              <span className="bg-[#4CAF50]/15 text-[#4CAF50] text-xs px-3 py-1.5 rounded-full font-medium">
                Replied {formatRepliedDate(message.replied_at)}
              </span>
            )}
            {!message.is_read && <MarkReadButton messageId={message.id} />}
            {message.is_read && !message.replied_at && (
              <span className="text-white/20 text-xs border border-white/10 px-3 py-1.5 rounded-full">
                Read
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 space-y-4">
          {Object.entries(message.data).map(([key, value]) => (
            <div key={key}>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{formatKey(key)}</p>
              <p className="text-white text-sm leading-relaxed">
                {typeof value === 'string' ? value : JSON.stringify(value)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ReplyComposer
        messageId={message.id}
        contactEmail={contactEmail}
        contactName={contactName}
        formType={message.form_type}
        alreadyReplied={!!message.replied_at}
        repliedAt={message.replied_at}
      />
    </div>
  );
}
