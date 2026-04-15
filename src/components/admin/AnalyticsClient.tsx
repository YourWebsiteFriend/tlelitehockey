'use client';

import { useState, useEffect } from 'react';
import { getAnalytics, getAdminStats } from '@/actions/admin.actions';
import { StatCard } from '@/components/admin/StatCard';
import type { AdminAnalytics, DailyCount } from '@/types/admin';

type Range = 7 | 30 | 90;

function SimpleBarChart({ data, color }: { data: DailyCount[]; color: string }) {
  if (!data.length) {
    return <p className="text-white/30 text-sm py-8 text-center">No data for this period.</p>;
  }
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-1 h-32 w-full">
      {data.map((d) => {
        const heightPct = Math.max((d.count / max) * 100, 2);
        return (
          <div
            key={d.date}
            title={`${d.date}: ${d.count}`}
            className="flex-1 rounded-t transition-all duration-300"
            style={{ height: `${heightPct}%`, backgroundColor: color, opacity: 0.8 }}
          />
        );
      })}
    </div>
  );
}

export function AnalyticsClient() {
  const [range, setRange] = useState<Range>(30);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [newSignups, setNewSignups] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [analyticsResult, statsResult] = await Promise.all([
        getAnalytics(range),
        getAdminStats(),
      ]);
      if (analyticsResult.success) {
        setAnalytics(analyticsResult.data);
        setTotalBookings(analyticsResult.data.bookingsByDay.reduce((sum, d) => sum + d.count, 0));
        setNewSignups(analyticsResult.data.signupsByDay.reduce((sum, d) => sum + d.count, 0));
      }
      setLoading(false);
    }
    load();
  }, [range]);

  return (
    <div className="space-y-8">
      {/* Range selector */}
      <div className="flex gap-2">
        {([7, 30, 90] as Range[]).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              range === r
                ? 'bg-[#F78E2B] text-black'
                : 'border border-white/10 text-white/40 hover:text-white hover:border-white/30'
            }`}
          >
            {r}d
          </button>
        ))}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Bookings" value={loading ? '…' : totalBookings} accent="blue" />
        <StatCard label="New Signups" value={loading ? '…' : newSignups} accent="purple" />
      </div>

      {/* Charts */}
      {loading ? (
        <div className="text-white/30 text-sm py-16 text-center">Loading analytics…</div>
      ) : analytics ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">
              Bookings by Day (last {range}d)
            </p>
            <SimpleBarChart data={analytics.bookingsByDay} color="#3b82f6" />
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">
              Signups by Day (last {range}d)
            </p>
            <SimpleBarChart data={analytics.signupsByDay} color="#a855f7" />
          </div>
        </div>
      ) : (
        <p className="text-red-400 text-sm">Failed to load analytics.</p>
      )}
    </div>
  );
}
