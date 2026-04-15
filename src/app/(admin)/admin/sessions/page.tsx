import Link from 'next/link';
import { getAllSessions } from '@/actions/admin.actions';
import { SessionFilterTabs } from '@/components/admin/SessionFilterTabs';

export const metadata = { title: 'Sessions | TL Elite Admin' };

export default async function AdminSessionsPage() {
  const result = await getAllSessions();
  const sessions = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sessions</h1>
          <p className="text-white/40 text-sm mt-1">{sessions.length} total sessions</p>
        </div>
        <Link
          href="/admin/sessions/new"
          className="bg-[#F78E2B] hover:bg-[#e07d1e] text-black font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
        >
          + Add Session
        </Link>
      </div>

      <SessionFilterTabs sessions={sessions} />
    </div>
  );
}
