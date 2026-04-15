'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Session } from '@/types/session';

type Season = 'All' | 'Drop Ins' | 'Spring 2026' | 'Summer 2026' | 'Clinics';
const TABS: Season[] = ['All', 'Drop Ins', 'Spring 2026', 'Summer 2026', 'Clinics'];

function formatDay(day: string | null) {
  return day ?? '—';
}

interface SessionFilterTabsProps {
  sessions: Session[];
}

export function SessionFilterTabs({ sessions }: SessionFilterTabsProps) {
  const [active, setActive] = useState<Season>('All');

  const filtered =
    active === 'All' ? sessions : sessions.filter((s) => s.season === active);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-white/10">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              active === tab
                ? 'border-[#F78E2B] text-white'
                : 'border-transparent text-white/40 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#111111] border-b border-white/10">
              {['Name', 'Season', 'Age Group', 'Day', 'Price', 'Spots Left', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-[#0d0d0d]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-white/30">
                  No sessions found.
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-white/60">{s.season}</td>
                  <td className="px-4 py-3 text-white/60">{s.age_group ?? '—'}</td>
                  <td className="px-4 py-3 text-white/60">{formatDay(s.day)}</td>
                  <td className="px-4 py-3 text-white/60">${s.price}</td>
                  <td className="px-4 py-3 text-white/60">
                    {s.spots_left} / {s.max_capacity}
                  </td>
                  <td className="px-4 py-3">
                    {s.is_active ? (
                      <span className="inline-block bg-[#4CAF50]/10 text-[#4CAF50] text-xs px-2 py-1 rounded-full border border-[#4CAF50]/20">
                        Active
                      </span>
                    ) : (
                      <span className="inline-block bg-white/5 text-white/30 text-xs px-2 py-1 rounded-full border border-white/10">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/sessions/${s.id}`}
                      className="text-[#F78E2B] hover:underline text-xs font-medium"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
