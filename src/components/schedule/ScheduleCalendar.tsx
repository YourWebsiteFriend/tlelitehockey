"use client";

import { useState } from "react";
import Link from "next/link";
import type { Session } from "@/types/session";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const DAY_FULL: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

function seasonColor(season: Session["season"]): string {
  switch (season) {
    case "Spring 2026": return "bg-[#4CAF50]";
    case "Summer 2026": return "bg-[#F78E2B]";
    case "Drop Ins":    return "bg-white/40";
    case "Clinics":     return "bg-blue-500";
    default:            return "bg-white/20";
  }
}

function bookLink(session: Session): string {
  return `/book?tab=${encodeURIComponent(session.season)}`;
}

function getSessionsForDay(sessions: Session[], day: string): Session[] {
  return sessions.filter((s) =>
    s.day
      ?.split(",")
      .map((d) => d.trim())
      .includes(day)
  );
}

interface SessionChipProps {
  session: Session;
}

function SessionChip({ session }: SessionChipProps) {
  const soldOut = session.spots_left === 0;

  return (
    <Link
      href={bookLink(session)}
      className={`group block rounded-xl border transition-all duration-200 overflow-hidden ${
        soldOut
          ? "border-white/5 opacity-50 cursor-not-allowed pointer-events-none"
          : "border-white/10 hover:border-white/30 hover:bg-white/5"
      }`}
    >
      {/* Season color bar */}
      <div className={`h-1 w-full ${seasonColor(session.season)}`} />

      <div className="p-3 flex flex-col gap-1">
        <p className="text-white font-bold text-xs uppercase leading-tight line-clamp-2 group-hover:text-white transition-colors">
          {session.name}
        </p>

        {session.age_group && (
          <p className="text-[#F78E2B] text-xs font-semibold">{session.age_group}</p>
        )}

        <div className="flex items-center justify-between mt-1">
          <span className="text-white/40 text-xs">${session.price}</span>
          {soldOut ? (
            <span className="text-red-400 text-xs font-bold">Sold Out</span>
          ) : (
            <span className="text-[#4CAF50] text-xs font-bold group-hover:underline">
              Book →
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

interface Props {
  sessions: Session[];
}

export function ScheduleCalendar({ sessions }: Props) {
  const [activeDay, setActiveDay] = useState<string>("Mon");

  // Filter to days that have at least one session
  const activeDays = DAYS.filter((d) => getSessionsForDay(sessions, d).length > 0);

  return (
    <>
      {/* ── Desktop: 7-column calendar grid ──────────────────────── */}
      <div className="hidden md:grid md:grid-cols-7 gap-3">
        {DAYS.map((day) => {
          const daySessions = getSessionsForDay(sessions, day);
          return (
            <div key={day} className="flex flex-col gap-2">
              {/* Day header */}
              <div className={`text-center py-2.5 rounded-lg text-sm font-black uppercase tracking-wide ${
                daySessions.length > 0
                  ? "text-white bg-[#111111] border border-white/10"
                  : "text-white/20 bg-[#0a0a0a] border border-white/5"
              }`}>
                {day}
              </div>

              {/* Sessions */}
              <div className="flex flex-col gap-2">
                {daySessions.length === 0 ? (
                  <div className="h-16 rounded-xl border border-white/5 flex items-center justify-center">
                    <span className="text-white/10 text-xs">—</span>
                  </div>
                ) : (
                  daySessions.map((s) => <SessionChip key={s.id} session={s} />)
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile: day tab selector + session list ───────────────── */}
      <div className="md:hidden">
        {/* Day tabs */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1 mb-6">
          {DAYS.map((day) => {
            const hasSessions = getSessionsForDay(sessions, day).length > 0;
            const isActive = day === activeDay;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                disabled={!hasSessions}
                className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-150 ${
                  isActive
                    ? "bg-[#F78E2B] text-white"
                    : hasSessions
                    ? "bg-[#111111] text-white/70 border border-white/10 hover:border-white/30"
                    : "bg-[#0a0a0a] text-white/20 border border-white/5 cursor-not-allowed"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Active day label */}
        <h2 className="text-white font-black text-xl uppercase mb-4">
          {DAY_FULL[activeDay]}
        </h2>

        {/* Sessions for active day */}
        {(() => {
          const daySessions = getSessionsForDay(sessions, activeDay);
          if (daySessions.length === 0) {
            return (
              <div className="bg-[#111111] rounded-xl border border-white/10 p-8 text-center">
                <p className="text-white/40 text-sm">No sessions on {DAY_FULL[activeDay]}.</p>
              </div>
            );
          }
          return (
            <div className="flex flex-col gap-3">
              {daySessions.map((s) => (
                <Link
                  key={s.id}
                  href={bookLink(s)}
                  className="bg-[#111111] rounded-xl border border-white/10 hover:border-white/30 transition-colors overflow-hidden flex items-stretch"
                >
                  {/* Season color bar */}
                  <div className={`w-1 shrink-0 ${seasonColor(s.season)}`} />

                  <div className="flex items-center justify-between gap-4 px-4 py-4 flex-1">
                    <div className="flex flex-col gap-1">
                      <p className="text-white font-bold text-base uppercase leading-tight">
                        {s.name}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-0.5">
                        {s.age_group && (
                          <span className="text-[#F78E2B] text-xs font-semibold">{s.age_group}</span>
                        )}
                        <span className="text-white/40 text-xs">{s.duration_minutes} min</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-white font-bold">${s.price}</span>
                      {s.spots_left === 0 ? (
                        <span className="text-red-400 text-xs font-bold">Sold Out</span>
                      ) : (
                        <span className="text-[#4CAF50] text-xs font-bold">Book →</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          );
        })()}

        {/* Jump to other days */}
        {activeDays.length > 1 && (
          <p className="text-white/30 text-xs text-center mt-8">
            Sessions also on:{" "}
            {activeDays
              .filter((d) => d !== activeDay)
              .map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDay(d)}
                  className="text-white/50 hover:text-white underline underline-offset-2 mx-1 transition-colors"
                >
                  {DAY_FULL[d]}
                </button>
              ))}
          </p>
        )}
      </div>
    </>
  );
}
