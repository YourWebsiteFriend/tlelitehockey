import Link from 'next/link';
import { getAllSessions } from '@/actions/admin.actions';
import type { Session } from '@/types/session';

export const metadata = { title: 'Schedule | TL Elite Admin' };

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function sessionsForDay(sessions: Session[], day: string): Session[] {
  return sessions.filter((s) => s.day?.split(',').map((d) => d.trim()).includes(day));
}

export default async function AdminSchedulePage() {
  const result = await getAllSessions();
  const sessions = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Schedule</h1>
          <p className="text-white/40 text-sm mt-1">Sessions grouped by day of week.</p>
        </div>
        <Link
          href="/admin/sessions/new"
          className="bg-[#F78E2B] hover:bg-[#e07d1e] text-black font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
        >
          + Add Session
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {DAYS.map((day) => {
          const daySessions = sessionsForDay(sessions, day);
          return (
            <div key={day} className="bg-[#111111] border border-white/10 rounded-xl p-5">
              <h2 className="text-white font-semibold mb-3">{day}</h2>
              {daySessions.length === 0 ? (
                <p className="text-white/20 text-sm">No sessions</p>
              ) : (
                <ul className="space-y-2">
                  {daySessions.map((s) => (
                    <li key={s.id} className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-white/80 text-sm">{s.name}</p>
                        <p className="text-white/30 text-xs">{s.season} · ${s.price}</p>
                      </div>
                      <Link
                        href={`/admin/sessions/${s.id}`}
                        className="text-[#F78E2B] hover:underline text-xs shrink-0"
                      >
                        Edit
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}

        {/* Unassigned (no day set) */}
        {(() => {
          const unassigned = sessions.filter((s) => !s.day);
          if (!unassigned.length) return null;
          return (
            <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
              <h2 className="text-white font-semibold mb-3 text-white/40">No Day Set</h2>
              <ul className="space-y-2">
                {unassigned.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-white/60 text-sm">{s.name}</p>
                      <p className="text-white/20 text-xs">{s.season}</p>
                    </div>
                    <Link
                      href={`/admin/sessions/${s.id}`}
                      className="text-[#F78E2B] hover:underline text-xs shrink-0"
                    >
                      Edit
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
