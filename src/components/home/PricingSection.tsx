"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useInView } from "@/hooks/useInView";

const plans = [
  {
    name: "Drop-In",
    price: "$50",
    per: "per session",
    description:
      "Jump in for a single session. Available by age group: 5–6, 7–8, 9–10, and 10–11.",
    cta: "Book a Session",
    href: "/book",
    highlight: false,
  },
  {
    name: "3-Session Pack",
    price: "$149",
    per: "3-month validity",
    description:
      "Perfect for players looking to start their training or dial in specific skills without a long-term commitment.",
    cta: "Get Started",
    href: "/book",
    highlight: true,
  },
  {
    name: "5-Session Pack",
    price: "$249",
    per: "best value",
    description:
      "Built for consistency and real progress. Reinforce technique and track measurable improvements over multiple sessions.",
    cta: "Get Started",
    href: "/book",
    highlight: false,
  },
  {
    name: "Film Analysis",
    price: "$149",
    per: "per month",
    description:
      "Two monthly film sessions with TL coaches. Break down decision-making and technique live on Zoom.",
    cta: "Learn More",
    href: "/about",
    highlight: false,
  },
];

export function PricingSection() {
  const { ref, inView } = useInView();

  return (
    <SectionWrapper className="bg-black">
      <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] text-center mb-3 font-bold">
        PRICING
      </p>
      <h2 className="section-heading text-white text-3xl sm:text-4xl text-center mb-4">
        CHOOSE YOUR PROGRAM
      </h2>
      <p className="text-white/50 text-center mb-12 text-sm">
        All sessions run at Thayer Sports Center, Braintree MA
      </p>
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-7 flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
              inView ? "animate-fade-up" : "opacity-0"
            } ${
              plan.highlight
                ? "bg-[#4CAF50] border-[#4CAF50]"
                : "bg-[#111111] border-white/10 hover:border-[#4CAF50]/40"
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <p
              className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                plan.highlight ? "text-white/80" : "text-[#F78E2B]"
              }`}
            >
              {plan.name}
            </p>
            <div className="mb-4">
              <span className="text-5xl font-black text-white">{plan.price}</span>
              <span
                className={`text-xs ml-2 ${
                  plan.highlight ? "text-white/70" : "text-white/40"
                }`}
              >
                {plan.per}
              </span>
            </div>
            <p
              className={`text-sm leading-relaxed flex-1 mb-6 ${
                plan.highlight ? "text-white/90" : "text-white/60"
              }`}
            >
              {plan.description}
            </p>
            <Link
              href={plan.href}
              className={`text-center text-sm font-bold uppercase tracking-wide py-3 rounded-full transition-colors ${
                plan.highlight
                  ? "bg-white text-[#4CAF50] hover:bg-white/90"
                  : "border border-white/30 text-white hover:border-[#4CAF50] hover:text-[#4CAF50]"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
