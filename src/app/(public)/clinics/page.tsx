export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Users, Zap, Shield } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SessionsBoard } from "@/components/book/SessionsBoard";
import { getSessionsBySeason } from "@/services/sessions.service";
import { AnimateIn } from "@/components/shared/AnimateIn";

export const metadata: Metadata = {
  title: "Youth Hockey Clinics",
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
        backgroundImage="/images/DSC02640.jpg"
        objectPosition="center 20%"
        ctaLabel="View Schedule"
        ctaHref="/schedule"
      />

      {/* Stats bar */}
      <SectionWrapper className="bg-[#111111]">
        <AnimateIn animation="fade-up">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 px-1 sm:px-0">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-black rounded-2xl p-5 sm:p-8 text-center"
              >
                <p className="text-[#F78E2B] text-3xl sm:text-5xl font-black">{stat.value}</p>
                <p className="text-white/60 uppercase text-xs sm:text-sm tracking-wide mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </SectionWrapper>

      {/* Features grid */}
      <SectionWrapper className="bg-black">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Users, label: "5+ Coaches On Ice", desc: "More coaches means more reps and more individual feedback per session." },
            { icon: Zap, label: "Nonstop 50 Minutes", desc: "No standing around. Every drill is designed to maximize time on puck." },
            { icon: Shield, label: "Age-Separated Groups", desc: "Players train with peers at their level for the right challenge and growth." },
          ].map((f) => (
            <div key={f.label} className="bg-[#111111] rounded-2xl p-6 border border-white/10">
              <f.icon className="text-[#4CAF50] w-8 h-8 mb-4" />
              <h3 className="text-white font-bold uppercase text-sm mb-2">{f.label}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Sessions */}
      <SectionWrapper className="bg-black">
        <AnimateIn animation="fade-up">
          <h2 className="section-heading text-white text-2xl sm:text-4xl mb-8 sm:mb-10">
            UPCOMING CLINICS
          </h2>
        </AnimateIn>

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
