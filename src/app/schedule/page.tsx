export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { getSessionsBySeason } from "@/services/sessions.service";
import type { Session } from "@/types/session";

export const metadata: Metadata = {
  title: "Session Schedule",
  description:
    "View the full TL Elite Hockey training schedule — Spring 2026 packages, Summer 2026 packages, drop-in sessions, and clinics at Thayer Sports Center, Braintree MA.",
};

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function groupByDay(sessions: Session[]): Record<string, Session[]> {
  const grouped: Record<string, Session[]> = {};
  for (const s of sessions) {
    const day = s.day ?? "TBD";
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(s);
  }
  return grouped;
}

function seasonColor(season: Session["season"]) {
  switch (season) {
    case "Spring 2026": return "bg-[#4CAF50]/20 text-[#4CAF50]";
    case "Summer 2026": return "bg-[#F78E2B]/20 text-[#F78E2B]";
    case "Drop Ins":    return "bg-white/10 text-white/60";
    case "Clinics":     return "bg-blue-900/40 text-blue-400";
  }
}

export default async function SchedulePage() {
  const sessions = await getSessionsBySeason();
  const active = sessions.filter((s) => s.is_active);
  const grouped = groupByDay(active);

  const orderedDays = DAY_ORDER.filter((d) => grouped[d]);
  if (grouped["TBD"]) orderedDays.push("TBD");

  return (
    <>
      <PageHero
        heading="SCHEDULE"
        body="All current sessions by day. Book any open spot directly from the session."
        backgroundImage="/images/DSC02663.jpg"
      />

      <SectionWrapper className="bg-black">
        {orderedDays.length === 0 ? (
          <p className="text-white/60 text-center py-20">No sessions scheduled yet. Check back soon.</p>
        ) : (
          <div className="flex flex-col gap-10">
            {orderedDays.map((day) => (
              <div key={day}>
                <h2 className="text-white font-black text-2xl uppercase tracking-wide mb-4 border-b border-white/10 pb-3">
                  {day}
                </h2>
                <div className="flex flex-col gap-3">
                  {grouped[day].map((session) => (
                    <div
                      key={session.id}
                      className="bg-[#111111] rounded-xl border border-white/10 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${seasonColor(session.season)}`}>
                            {session.season}
                          </span>
                          {session.age_group && (
                            <span className="bg-[#F78E2B]/20 border border-[#F78E2B]/40 text-[#F78E2B] text-xs font-bold px-2.5 py-0.5 rounded-full">
                              {session.age_group}
                            </span>
                          )}
                        </div>
                        <p className="text-white font-bold text-base">{session.name}</p>
                        <p className="text-white/40 text-xs">{session.duration_minutes} min</p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5">
                        <span className="text-white/60 text-sm font-semibold">${session.price}{session.season === "Drop Ins" ? "/session" : "/pkg"}</span>
                        {session.spots_left === 0 ? (
                          <span className="text-xs font-bold text-red-400 uppercase">Sold Out</span>
                        ) : (
                          <a
                            href="/book"
                            className="text-xs font-bold text-[#4CAF50] border border-[#4CAF50]/50 rounded-full px-3 py-1 hover:bg-[#4CAF50]/10 transition-colors whitespace-nowrap"
                          >
                            Book →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  );
}
