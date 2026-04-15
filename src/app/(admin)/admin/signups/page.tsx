import { getEmailSignups } from '@/actions/admin.actions';
import { AdminTable, AdminTableEmptyRow } from '@/components/admin/AdminTable';
import { ExportCsvButton } from '@/components/admin/ExportCsvButton';

export const metadata = { title: 'Signups | TL Elite Admin' };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function AdminSignupsPage() {
  const result = await getEmailSignups();
  const signups = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Email Signups</h1>
          <p className="text-white/40 text-sm mt-1">{signups.length} subscribers</p>
        </div>
        <ExportCsvButton signups={signups} />
      </div>

      <AdminTable headers={['Email', 'Source', 'Date']}>
        {signups.length === 0 ? (
          <AdminTableEmptyRow colSpan={3} message="No email signups yet." />
        ) : (
          signups.map((s) => (
            <tr key={s.id} className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-3 text-white/70">{s.email}</td>
              <td className="px-4 py-3 text-white/40 capitalize">{s.source}</td>
              <td className="px-4 py-3 text-white/40">{formatDate(s.created_at)}</td>
            </tr>
          ))
        )}
      </AdminTable>
    </div>
  );
}
