import { AnalyticsClient } from '@/components/admin/AnalyticsClient';

export const metadata = { title: 'Analytics | TL Elite Admin' };

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-white/40 text-sm mt-1">Bookings and signup trends over time.</p>
      </div>

      <AnalyticsClient />
    </div>
  );
}
