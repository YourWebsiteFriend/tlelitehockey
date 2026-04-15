import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "Members Rewards Program | TL Elite Hockey",
  description:
    "Earn points every time you train, buy gear, or book online. TL Elite's loyalty program rewards committed players and families.",
};

const earnItems = [
  { title: "Sign Up", subtitle: "Create your free account", pts: "+15" },
  { title: "Book a Session", subtitle: "Any drop-in or package", pts: "+10" },
  {
    title: "Buy Online Program",
    subtitle: "Spring or Summer package",
    pts: "+25",
  },
  { title: "Order Online", subtitle: "Any gear purchase", pts: "+20" },
];

const redeemItems = [
  { pts: "50 pts", label: "$10 Off Your Next Order" },
  { pts: "125 pts", label: "Free TL Elite Hat" },
];

const howItWorksCards = [
  {
    title: "JOIN FREE",
    body: "Create your account and automatically earn 15 points.",
  },
  {
    title: "EARN ON EVERY ORDER",
    body: "Earn points every time you book a session, buy gear, or sign up for a program.",
  },
  {
    title: "REDEEM REWARDS",
    body: "Trade your points for discounts and free gear. Points never expire.",
  },
];

export default function LoyaltyPage() {
  return (
    <>
      <PageHero
        heading="MEMBERS REWARDS"
        body="Every session. Every purchase. Every rep counts."
        backgroundImage="/images/braintree-3.jpg"
      />

      {/* Main section */}
      <SectionWrapper className="bg-black">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: membership card */}
          <div className="bg-[#111111] rounded-2xl overflow-hidden border border-white/10">
            <div
              className="h-64 bg-gradient-to-br from-[#0a1f0a] to-black flex flex-col items-center justify-center text-center p-8"
            >
              <h2 className="font-black text-white text-2xl uppercase tracking-wide">
                TL ELITE MEMBERS
              </h2>
              <p className="text-white/60 mt-2 text-sm">
                Join free. Earn on every booking and purchase.
              </p>
              <Link
                href="/auth/signup"
                className="bg-[#4CAF50] rounded-full px-8 py-3 text-white font-bold uppercase text-sm mt-6 inline-block hover:bg-[#43A047] transition-colors"
              >
                Become a Member
              </Link>
            </div>
          </div>

          {/* Right: earn + redeem */}
          <div>
            <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] font-bold mb-4">
              EARN POINTS
            </p>
            <div className="flex flex-col gap-3">
              {earnItems.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#111111] rounded-xl p-5 flex justify-between items-center border border-white/10"
                >
                  <div>
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-white/50 text-sm">{item.subtitle}</p>
                  </div>
                  <span className="text-[#4CAF50] font-black text-xl">
                    {item.pts}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-white/10 my-6" />

            <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] font-bold mb-4">
              REDEEM
            </p>
            <div className="flex flex-col gap-3">
              {redeemItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-[#111111] rounded-xl p-5 flex justify-between items-center border border-white/10"
                >
                  <span className="text-white font-bold">{item.label}</span>
                  <span className="bg-[#F78E2B]/20 text-[#F78E2B] font-black rounded-lg px-3 py-1 text-sm">
                    {item.pts}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* How it works */}
      <SectionWrapper className="bg-[#111111]">
        <h2 className="section-heading text-white text-3xl sm:text-4xl text-center mb-14">
          HOW IT WORKS
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {howItWorksCards.map((card) => (
            <div
              key={card.title}
              className="bg-black rounded-2xl p-8 border border-white/10"
            >
              <h3 className="font-bold uppercase text-white text-lg mb-3">
                {card.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
