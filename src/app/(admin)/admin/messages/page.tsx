import Link from 'next/link';
import { getAllMessages } from '@/actions/admin.actions';

export const metadata = { title: 'Messages | TL Elite Admin' };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getNameEmail(data: Record<string, unknown>): { name: string; email: string } {
  const name = typeof data.name === 'string' ? data.name : typeof data.full_name === 'string' ? data.full_name : '—';
  const email = typeof data.email === 'string' ? data.email : '—';
  return { name, email };
}

export default async function AdminMessagesPage() {
  const result = await getAllMessages();
  const messages = result.success ? result.data : [];
  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-white/40 text-sm mt-1">
          {messages.length} total · {unreadCount} unread
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#111111] border-b border-white/10">
              {['Type', 'Name', 'Email', 'Date', 'Status'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-[#0d0d0d]">
            {messages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-white/30">No messages yet.</td>
              </tr>
            ) : (
              messages.map((m) => {
                const { name, email } = getNameEmail(m.data);
                return (
                  <tr
                    key={m.id}
                    className={`hover:bg-white/5 transition-colors cursor-pointer ${
                      !m.is_read ? 'border-l-2 border-l-[#F78E2B]' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <Link href={`/admin/messages/${m.id}`} className="block text-white/60 capitalize">
                        {m.form_type.replace('_', ' ')}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/messages/${m.id}`} className={`block ${!m.is_read ? 'text-white font-semibold' : 'text-white/70'}`}>
                        {name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/messages/${m.id}`} className="block text-white/60">
                        {email}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/messages/${m.id}`} className="block text-white/40">
                        {formatDate(m.created_at)}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/messages/${m.id}`} className="block space-y-1">
                        {!m.is_read && (
                          <span className="text-[#F78E2B] text-xs font-medium block">Unread</span>
                        )}
                        {m.is_read && !m.replied_at && (
                          <span className="text-white/30 text-xs block">Read</span>
                        )}
                        {m.replied_at && (
                          <span className="bg-[#4CAF50]/15 text-[#4CAF50] text-xs px-2 py-0.5 rounded-full inline-block">
                            Replied
                          </span>
                        )}
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
