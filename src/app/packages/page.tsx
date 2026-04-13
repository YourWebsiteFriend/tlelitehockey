import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

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
    price: 229,
    perSession: (229 / 5).toFixed(2),
    savings: 50 * 5 - 229,
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
      />

      <SectionWrapper className="bg-black">
        {/* Intro */}
        <div className="max-w-2xl mb-14">
          <p className="text-white/60 text-base leading-relaxed">
            Packages give you flexibility — purchase a bundle and use your sessions at any open drop-in slot throughout the season. No expiry. No hassle.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative bg-[#111111] rounded-2xl border p-8 flex flex-col gap-4 ${
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
          ))}
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
    </>
  );
}
