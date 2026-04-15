"use client";

import { useState } from "react";
import { SessionCard } from "@/components/book/SessionCard";
import type { Session, SessionSeason } from "@/types/session";

interface Props {
  sessions: Session[];
  hideFilters?: boolean;
  defaultTab?: string;
}

const TABS: Array<{ label: string; value: string }> = [
  { label: "All", value: "all" },
  { label: "Drop Ins", value: "Drop Ins" },
  { label: "Spring 2026", value: "Spring 2026" },
  { label: "Summer 2026", value: "Summer 2026" },
];

const VALID_TABS = TABS.map((t) => t.value);

export function SessionsBoard({ sessions, hideFilters = false, defaultTab }: Props) {
  const [activeTab, setActiveTab] = useState(
    defaultTab && VALID_TABS.includes(defaultTab) ? defaultTab : "all"
  );

  const filtered =
    activeTab === "all"
      ? sessions
      : sessions.filter((s) => s.season === (activeTab as SessionSeason));

  if (hideFilters) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 px-1 sm:px-0">
        {sessions.map((s) => (
          <SessionCard key={s.id} session={s} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Tab bar — horizontally scrollable on mobile, no wrapping */}
      <div className="flex gap-1 mb-8 sm:mb-10 border-b border-white/10 overflow-x-auto scrollbar-none -mx-1 px-1">
        {TABS.map((tab) => {
          const active = tab.value === activeTab;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`relative shrink-0 px-4 sm:px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors duration-150 focus:outline-none min-h-[44px]
                ${active ? "text-white" : "text-white/40 hover:text-white/70"}`}
            >
              {tab.label}
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F78E2B]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="bg-[#111111] rounded-2xl p-8 sm:p-12 text-center text-white/60 mx-1 sm:mx-0">
          No sessions available in this category right now.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 px-1 sm:px-0">
          {filtered.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      )}
    </div>
  );
}
