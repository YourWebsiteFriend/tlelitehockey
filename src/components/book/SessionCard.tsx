"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Session } from "@/types/session";
import { createSessionCheckout } from "@/actions/checkout.actions";

interface Props {
  session: Session;
}

const DAY_IMAGE: Record<string, { src: string; position: string }> = {
  Mon: { src: "/images/DSC02687.jpg", position: "center 30%" },
  Tue: { src: "/images/DSC02750.jpg", position: "center 30%" },
  Wed: { src: "/images/DSC02739.jpg", position: "center 40%" },
  Thu: { src: "/images/DSC02680.jpg", position: "center 35%" },
  Sat: { src: "/images/DSC02758.jpg", position: "center 35%" },
  Sun: { src: "/images/DSC02740.jpg", position: "center 40%" },
};

const FALLBACK_IMAGE = { src: "/images/DSC02673.jpg", position: "center 20%" };

function getCardImage(day: string | null): { src: string; position: string } {
  if (!day) return FALLBACK_IMAGE;
  const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  for (const d of order) {
    if (day.includes(d)) return DAY_IMAGE[d] ?? FALLBACK_IMAGE;
  }
  return FALLBACK_IMAGE;
}

export function SessionCard({ session }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const soldOut = session.spots_left === 0;
  const img = getCardImage(session.day);

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
    <div className="bg-[#111111] rounded-2xl border border-white/10 overflow-hidden flex flex-col hover:border-white/30 transition-colors group">

      {/* Image header */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={img.src}
          alt={session.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: img.position }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient fade into card */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />

        {/* Badges overlaid on image */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
          <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/70 border border-white/10">
            {session.season}
          </span>
          {session.age_group && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F78E2B]/90 text-black">
              {session.age_group}
            </span>
          )}
        </div>

        {soldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white/60 text-sm font-bold uppercase tracking-widest">Sold Out</span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Name */}
        <h3 className="text-white font-black text-lg uppercase leading-tight">
          {session.name}
        </h3>

        {/* Detail chips */}
        <div className="flex flex-wrap gap-2">
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
        <div className="flex items-baseline gap-2">
          <span className="text-white font-bold text-xl">${session.price}</span>
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

        {/* Spots left */}
        {!soldOut && session.spots_left <= 5 && (
          <p className="text-[#F78E2B] text-xs font-bold">
            Only {session.spots_left} spot{session.spots_left === 1 ? "" : "s"} left
          </p>
        )}

        {/* CTA */}
        <button
          onClick={handleBook}
          disabled={soldOut || loading}
          className={`mt-auto w-full rounded-full py-3 font-bold uppercase text-sm tracking-wide transition-colors ${
            soldOut
              ? "bg-white/10 text-white/30 cursor-not-allowed"
              : "bg-[#4CAF50] text-white hover:bg-[#43A047] cursor-pointer"
          }`}
        >
          {loading ? "Loading..." : soldOut ? "Sold Out" : "Book Now"}
        </button>
      </div>
    </div>
  );
}
