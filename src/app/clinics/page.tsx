import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SessionsBoard } from "@/components/book/SessionsBoard";
import { getSessionsBySeason } from "@/services/sessions.service";

export const metadata: Metadata = {
  title: "Youth Hockey Clinics | TL Elite Hockey Skill Development",
  description:
    "TL Elite seasonal hockey clinics for youth players. High-intensity, multi-coach format. Christmas, Thanksgiving, Summer clinics at Thayer Sports Center, Braintree MA.",
};

const stats = [
  { value: "25", label: "Max Players Per Clinic" },
  { value: "5+", label: "Coaches On The Ice" },
  { value: "50 Min", label: "Per Session" },
];

export default async function ClinicsPage() {
  const clinicSessions = await getSessionsBySeason("Clinics");

  return (
    <>
      <PageHero
        heading="SEASONAL CLINICS"
        body="High-intensity skill development throughout the year. Up to 25 players, 5+ coaches on the ice."
        backgroundImage="/images/hockey-drill.png"
      />

      {/* Stats bar */}
      <SectionWrapper className="bg-[#111111]">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-black rounded-2xl p-8 text-center"
            >
              <p className="text-[#F78E2B] text-5xl font-black">{stat.value}</p>
              <p className="text-white/60 uppercase text-sm tracking-wide mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Sessions */}
      <SectionWrapper className="bg-black">
        <h2 className="section-heading text-white text-3xl sm:text-4xl mb-10">
          UPCOMING CLINICS
        </h2>

        {clinicSessions.length === 0 ? (
          <div className="bg-[#111111] rounded-2xl p-12 text-center text-white/60">
            No clinics are currently scheduled. Follow us on Instagram{" "}
            <a
              href="https://instagram.com/tlelitehockey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4CAF50] hover:underline"
            >
              @tlelitehockey
            </a>{" "}
            for announcements.
          </div>
        ) : (
          <SessionsBoard sessions={clinicSessions} hideFilters={true} />
        )}
      </SectionWrapper>
    </>
  );
}
