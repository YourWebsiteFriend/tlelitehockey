import { getAdminStats, getAllBookings, getEmailSignups } from '@/actions/admin.actions';
import { StatCard } from '@/components/admin/StatCard';
import type { AdminBooking, AdminSignup } from '@/types/admin';

export const metadata = { title: 'Dashboard | TL Elite Admin' };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatCurrency(cents: number | null) {
  if (cents === null) return '—';
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function AdminDashboardPage() {
  const [statsResult, bookingsResult, signupsResult] = await Promise.all([
    getAdminStats(),
    getAllBookings(),
    getEmailSignups(),
  ]);

  const stats = statsResult.success ? statsResult.data : null;
  const recentBookings: AdminBooking[] = bookingsResult.success
    ? bookingsResult.data.slice(0, 5)
    : [];
  const recentSignups: AdminSignup[] = signupsResult.success
    ? signupsResult.data.slice(0, 5)
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Active Sessions" value={stats?.activeSessions ?? '—'} accent="green" />
        <StatCard label="Bookings (30d)" value={stats?.bookings30d ?? '—'} accent="blue" />
        <StatCard label="Unread Messages" value={stats?.unreadMessages ?? '—'} accent="orange" />
        <StatCard label="Email Subscribers" value={stats?.emailSignups ?? '—'} accent="purple" />
      </div>

      {/* Recent tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div>
          <h2 className="text-white font-semibold mb-3">Recent Bookings</h2>
          <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider">User</th>
                  <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider">Session</th>
                  <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-white/30">No bookings yet</td>
                  </tr>
                ) : (
                  recentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-white/70">{b.profile_email ?? '—'}</td>
                      <td className="px-4 py-3 text-white/70">{b.session_name}</td>
                      <td className="px-4 py-3 text-white/40">{formatDate(b.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Signups */}
        <div>
          <h2 className="text-white font-semibold mb-3">Recent Signups</h2>
          <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider">Email</th>
                  <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider">Source</th>
                  <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentSignups.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-white/30">No signups yet</td>
                  </tr>
                ) : (
                  recentSignups.map((s) => (
                    <tr key={s.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-white/70">{s.email}</td>
                      <td className="px-4 py-3 text-white/40 capitalize">{s.source}</td>
                      <td className="px-4 py-3 text-white/40">{formatDate(s.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
