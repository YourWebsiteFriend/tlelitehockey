import Link from 'next/link';
import { SessionForm } from '@/components/admin/SessionForm';

export const metadata = { title: 'New Session | TL Elite Admin' };

export default function NewSessionPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/sessions" className="text-white/40 hover:text-white text-sm transition-colors">
          ← Back to Sessions
        </Link>
        <h1 className="text-2xl font-bold text-white mt-3">New Session</h1>
      </div>

      <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
        <SessionForm mode="new" />
      </div>
    </div>
  );
}
