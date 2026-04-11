"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SessionCard } from "@/components/book/SessionCard";
import type { Session, SessionSeason } from "@/types/session";

interface Props {
  sessions: Session[];
  hideFilters?: boolean;
}

const TABS: Array<{ label: string; value: string }> = [
  { label: "All Services", value: "all" },
  { label: "Drop Ins", value: "Drop Ins" },
  { label: "Spring 2026", value: "Spring 2026" },
  { label: "Summer 2026", value: "Summer 2026" },
];

export function SessionsBoard({ sessions, hideFilters = false }: Props) {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? sessions
      : sessions.filter((s) => s.season === (activeTab as SessionSeason));

  if (hideFilters) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((s) => (
          <SessionCard key={s.id} session={s} />
        ))}
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="bg-transparent border-b border-white/10 w-full justify-start rounded-none p-0 mb-10 h-auto overflow-x-auto">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-none border-b-2 border-transparent data-active:border-[#F78E2B] data-active:text-white data-[state=active]:border-[#F78E2B] data-[state=active]:text-white text-white/50 px-6 pb-4 text-sm font-bold uppercase tracking-wide bg-transparent hover:text-white transition-colors data-active:bg-transparent data-[state=active]:bg-transparent data-active:shadow-none data-[state=active]:shadow-none"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {filtered.length === 0 ? (
            <div className="bg-[#111111] rounded-2xl p-12 text-center text-white/60">
              No sessions available in this category right now.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s) => (
                <SessionCard key={s.id} session={s} />
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
