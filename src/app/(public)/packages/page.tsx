import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { AnimateIn } from "@/components/shared/AnimateIn";

export const metadata: Metadata = {
  title: "Session Packages",
  description:
    "Buy a 3-pack or 5-pack of TL Elite Hockey drop-in sessions and save. Small-group training at Thayer Sports Center, Braintree MA.",
};

const packages = [
  {
    name: "3-Session Pack",
    sessions: 3,
    price: 149,
    perSession: (149 / 3).toFixed(2),
    savings: 50 * 3 - 149,
    description: "Three drop-in sessions to use anytime. Great for players trying us out or building a consistent habit.",
    badge: null,
  },
  {
    name: "5-Session Pack",
    sessions: 5,
    price: 249,
    perSession: (249 / 5).toFixed(2),
    savings: 50 * 5 - 249,
    description: "Five drop-in sessions at our best per-session rate. Perfect for committed players looking to level up.",
    badge: "BEST VALUE",
  },
];

export default function PackagesPage() {
  return (
    <>
      <PageHero
        heading="SESSION PACKAGES"
        body="Buy in bulk, save per session. Use your sessions any available drop-in slot."
        backgroundImage="/images/DSC02684.jpg"
        objectPosition="center 30%"
      />

      <SectionWrapper className="bg-black">
        {/* Intro */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="text-white/60 text-base leading-relaxed">
            Packages give you flexibility — purchase a bundle and use your sessions at any open drop-in slot throughout the season. No expiry. No hassle.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 max-w-3xl px-1 sm:px-0">
          {packages.map((pkg, i) => (
            <AnimateIn
              key={pkg.name}
              animation="fade-up"
              delay={([0, 150] as const)[i] ?? 0}
            >
            <div
              className={`relative bg-[#111111] rounded-2xl border p-6 sm:p-8 flex flex-col gap-4 ${
                pkg.badge ? "border-[#4CAF50]/50" : "border-white/10"
              }`}
            >
              {pkg.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4CAF50] text-white text-xs font-black uppercase px-4 py-1 rounded-full tracking-wide">
                  {pkg.badge}
                </span>
              )}

              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">{pkg.sessions} Sessions</p>
                <h2 className="text-white font-black text-2xl uppercase">{pkg.name}</h2>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-white text-4xl font-black">${pkg.price}</span>
                <span className="text-white/40 text-sm">${pkg.perSession} / session</span>
              </div>

              <p className="text-[#4CAF50] text-sm font-bold">Save ${pkg.savings} vs drop-in rate</p>

              <p className="text-white/60 text-sm leading-relaxed">{pkg.description}</p>

              <div className="mt-auto pt-4">
                <Link
                  href="/contact"
                  className="block w-full text-center rounded-full py-4 font-bold uppercase text-sm tracking-wide transition-colors bg-[#4CAF50] text-white hover:bg-[#43A047]"
                >
                  Purchase Package
                </Link>
              </div>
            </div>
            </AnimateIn>
          ))}
        </div>

        {/* New package cards — Single Drop-In + Private Lesson */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-3xl mt-5 sm:mt-6 px-1 sm:px-0">
          <AnimateIn animation="fade-up" delay={300}>
            <div className="relative bg-[#111111] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col gap-4">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Single Session</p>
                <h2 className="text-white font-black text-2xl uppercase">Single Drop-In</h2>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-4xl font-black">$50</span>
                <span className="text-white/40 text-sm">per session</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">Try out a session with no commitment. Perfect for players new to TL Elite or looking to drop in occasionally.</p>
              <div className="mt-auto pt-4">
                <Link
                  href="/book"
                  className="block w-full text-center rounded-full py-4 font-bold uppercase text-sm tracking-wide transition-colors border border-white/30 text-white hover:border-white/60 hover:bg-white/5"
                >
                  Book a Drop-In
                </Link>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={400}>
            <div className="relative bg-[#111111] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col gap-4">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">1-on-1 Training</p>
                <h2 className="text-white font-black text-2xl uppercase">Private Lesson</h2>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-2xl font-black">Custom Pricing</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">One coach. One player. Targeted development at your pace. Reach out for availability and pricing.</p>
              <div className="mt-auto pt-4">
                <Link
                  href="/private-lessons"
                  className="block w-full text-center rounded-full py-4 font-bold uppercase text-sm tracking-wide transition-colors border border-white/30 text-white hover:border-white/60 hover:bg-white/5"
                >
                  Inquire →
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Fine print */}
        <div className="mt-12 max-w-xl">
          <p className="text-white/30 text-xs leading-relaxed">
            Sessions are valid for any open drop-in slot. View the{" "}
            <Link href="/schedule" className="text-white/50 hover:text-white underline underline-offset-2">
              schedule
            </Link>{" "}
            to find available times. Questions?{" "}
            <Link href="/contact" className="text-white/50 hover:text-white underline underline-offset-2">
              Contact us.
            </Link>
          </p>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper className="bg-[#111111]">
        <h2 className="section-heading text-white text-2xl sm:text-3xl text-center mb-10">COMMON QUESTIONS</h2>
        <div className="max-w-2xl mx-auto flex flex-col divide-y divide-white/10">
          {[
            { q: "Do sessions expire?", a: "3-packs are valid for 3 months. 5-packs are valid for 6 months from date of purchase." },
            { q: "Can I use at any TL Elite rink?", a: "Yes — packages are valid at Thayer Sports Center in Braintree and Gallo Ice Arena in Bourne." },
            { q: "What age groups are covered?", a: "Drop-in sessions run for ages 5–6, 7–8, 9–10, and 10–11. Packages apply to any age group session." },
            { q: "Can I give a package as a gift?", a: "Absolutely. Reach out via the Contact page and we'll set up a gift arrangement for you." },
          ].map((faq) => (
            <div key={faq.q} className="py-5">
              <p className="text-white font-bold text-sm mb-2">{faq.q}</p>
              <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
