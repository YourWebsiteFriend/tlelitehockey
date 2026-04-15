import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSessionById } from '@/actions/admin.actions';
import { SessionForm } from '@/components/admin/SessionForm';

export const metadata = { title: 'Edit Session | TL Elite Admin' };

export default async function EditSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getSessionById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/sessions" className="text-white/40 hover:text-white text-sm transition-colors">
          ← Back to Sessions
        </Link>
        <h1 className="text-2xl font-bold text-white mt-3">Edit Session</h1>
        <p className="text-white/40 text-sm mt-1">{result.data.name}</p>
      </div>

      <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
        <SessionForm mode="edit" session={result.data} />
      </div>
    </div>
  );
}
