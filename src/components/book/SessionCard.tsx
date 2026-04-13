"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "@/types/session";
import { createSessionCheckout } from "@/actions/checkout.actions";

interface Props {
  session: Session;
}

function seasonBadge(season: Session["season"]): string {
  switch (season) {
    case "Drop Ins":
      return "bg-white/10 text-white/70";
    case "Spring 2026":
      return "bg-[#4CAF50]/20 text-[#4CAF50]";
    case "Summer 2026":
      return "bg-[#F78E2B]/20 text-[#F78E2B]";
    case "Clinics":
      return "bg-blue-900/40 text-blue-400";
  }
}

function availabilityBadge(
  spots: number
): { label: string; cls: string } | null {
  if (spots === 0) return { label: "SOLD OUT", cls: "bg-red-900/40 text-red-400" };
  if (spots <= 3) return { label: `${spots} LEFT`, cls: "bg-red-900/40 text-red-400" };
  if (spots <= 6) return { label: "FILLING FAST", cls: "bg-yellow-900/40 text-yellow-400" };
  return null;
}

export function SessionCard({ session }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const avail = availabilityBadge(session.spots_left);
  const soldOut = session.spots_left === 0;

  const handleBook = async () => {
    if (soldOut || loading) return;
    setLoading(true);
    try {
      const result = await createSessionCheckout(session.id);
      if (result.success && result.data.checkoutUrl) {
        router.push(result.data.checkoutUrl);
      } else {
        alert(!result.success ? result.error : "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111111] rounded-2xl border border-white/10 p-6 flex flex-col gap-3 hover:border-white/30 transition-colors">
      {/* Top row */}
      <div className="flex justify-between items-start">
        <span
          className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${seasonBadge(session.season)}`}
        >
          {session.season}
        </span>
        {avail && (
          <span
            className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${avail.cls}`}
          >
            {avail.label}
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="text-white font-black text-xl mt-2 uppercase leading-tight">
        {session.name}
      </h3>

      {/* Detail chips */}
      <div className="flex flex-wrap gap-2">
        {session.age_group && (
          <span className="bg-[#F78E2B]/20 border border-[#F78E2B]/50 rounded-full px-3 py-1 text-xs font-bold text-[#F78E2B]">
            {session.age_group}
          </span>
        )}
        {session.day && (
          <span className="bg-white/10 rounded-full px-3 py-1 text-xs text-white/60">
            {session.day}
          </span>
        )}
        <span className="bg-white/10 rounded-full px-3 py-1 text-xs text-white/60">
          {session.duration_minutes} min
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-white/60 text-lg font-bold">
          ${session.price}
        </span>
        <span className="text-white/40 text-sm">
          / {session.season === "Drop Ins" ? "session" : "package"}
        </span>
      </div>

      {/* Start date */}
      {session.start_date && (
        <p className="text-white/40 text-xs">
          Starts{" "}
          {new Date(session.start_date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}

      {/* CTA */}
      <button
        onClick={handleBook}
        disabled={soldOut || loading}
        className={`mt-4 w-full rounded-full py-4 font-bold uppercase text-sm tracking-wide transition-colors ${
          soldOut
            ? "bg-white/10 text-white/30 cursor-not-allowed"
            : "bg-[#4CAF50] text-white hover:bg-[#43A047] cursor-pointer"
        }`}
      >
        {loading ? "Loading..." : soldOut ? "Sold Out" : "Book Now"}
      </button>
    </div>
  );
}
