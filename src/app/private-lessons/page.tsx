import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { PrivateLessonsForm } from "@/components/forms/PrivateLessonsForm";

export const metadata: Metadata = {
  title: "Private Hockey Lessons | TL Elite Hockey Training",
  description:
    "Book a private hockey lesson with TL Elite. Available at Thayer Sports Center (Braintree) and Gallo Ice Arena (Bourne). Submit your inquiry today.",
};

const steps = [
  {
    number: "01",
    title: "SUBMIT YOUR INQUIRY",
    body: "Fill out the form below with your player's details, availability, and what you're looking to work on.",
  },
  {
    number: "02",
    title: "WE'LL REACH OUT",
    body: "Brendan will review your inquiry and reach out within 48 hours to confirm availability and schedule your first session.",
  },
  {
    number: "03",
    title: "GET ON THE ICE",
    body: "Show up ready to work. Sessions run at Thayer Sports Center in Braintree or Gallo Ice Arena in Bourne.",
  },
];

export default function PrivateLessonsPage() {
  return (
    <>
      <PageHero
        heading="PRIVATE LESSONS"
        body="One coach. One player. Maximum development."
      />

      {/* 3-step process */}
      <SectionWrapper className="bg-[#111111]">
        <h2 className="section-heading text-white text-3xl sm:text-4xl text-center mb-14">
          HOW IT WORKS
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#4CAF50] flex items-center justify-center mx-auto mb-6">
                <span className="text-[#4CAF50] text-2xl font-black">
                  {step.number}
                </span>
              </div>
              <h3 className="font-bold uppercase text-white text-base mb-3">
                {step.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Inquiry Form */}
      <SectionWrapper className="bg-black">
        <h2 className="section-heading text-white text-3xl sm:text-4xl text-center mb-14">
          REQUEST A SESSION
        </h2>
        <PrivateLessonsForm />
      </SectionWrapper>
    </>
  );
}
