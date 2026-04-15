import { getAllBookings } from '@/actions/admin.actions';
import { AdminTable, AdminTableEmptyRow } from '@/components/admin/AdminTable';

export const metadata = { title: 'Bookings | TL Elite Admin' };

const statusStyles: Record<string, string> = {
  confirmed: 'bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatAmount(cents: number | null) {
  if (cents === null) return '—';
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function AdminBookingsPage() {
  const result = await getAllBookings();
  const bookings = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Bookings</h1>
        <p className="text-white/40 text-sm mt-1">{bookings.length} total bookings</p>
      </div>

      <AdminTable headers={['User Email', 'Session', 'Amount', 'Status', 'Date']}>
        {bookings.length === 0 ? (
          <AdminTableEmptyRow colSpan={5} message="No bookings yet." />
        ) : (
          bookings.map((b) => (
            <tr key={b.id} className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-3 text-white/70">{b.profile_email ?? '—'}</td>
              <td className="px-4 py-3 text-white/70">{b.session_name}</td>
              <td className="px-4 py-3 text-white/60">{formatAmount(b.amount_paid)}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block text-xs px-2 py-1 rounded-full border capitalize ${
                    statusStyles[b.status] ?? 'bg-white/5 text-white/40 border-white/10'
                  }`}
                >
                  {b.status}
                </span>
              </td>
              <td className="px-4 py-3 text-white/40">{formatDate(b.created_at)}</td>
            </tr>
          ))
        )}
      </AdminTable>
    </div>
  );
}
