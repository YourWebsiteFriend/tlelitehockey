export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ScheduleCalendar } from "@/components/schedule/ScheduleCalendar";
import { CtaBannerSection } from "@/components/home/CtaBannerSection";
import { getSessionsBySeason } from "@/services/sessions.service";

export const metadata: Metadata = {
  title: "Session Schedule",
  description:
    "View the full TL Elite Hockey training schedule — Spring 2026 packages, Summer 2026 packages, drop-in sessions, and clinics at Thayer Sports Center, Braintree MA.",
};

export default async function SchedulePage() {
  const sessions = await getSessionsBySeason();
  const active = sessions.filter((s) => s.is_active);

  return (
    <>
      <PageHero
        heading="SCHEDULE"
        body="All current sessions by day. Click any session to book."
        backgroundImage="/images/DSC02663.jpg"
        objectPosition="center 30%"
      />

      {/* Legend */}
      <div className="bg-[#111111] border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10 py-4 flex flex-wrap gap-4 items-center">
          <span className="text-white/40 text-xs uppercase tracking-widest">Season:</span>
          {[
            { label: "Spring 2026", color: "bg-[#4CAF50]" },
            { label: "Summer 2026", color: "bg-[#F78E2B]" },
            { label: "Drop Ins", color: "bg-white/40" },
            { label: "Clinics", color: "bg-blue-500" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              <span className="text-white/60 text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <SectionWrapper className="bg-black">
        {active.length === 0 ? (
          <div className="bg-[#111111] rounded-2xl p-12 text-center">
            <p className="text-white/60 mb-4">No sessions scheduled yet. Check back soon.</p>
            <Link
              href="/contact"
              className="text-[#4CAF50] text-sm hover:underline"
            >
              Contact us for updates →
            </Link>
          </div>
        ) : (
          <ScheduleCalendar sessions={active} />
        )}
      </SectionWrapper>

      <CtaBannerSection />
    </>
  );
}
