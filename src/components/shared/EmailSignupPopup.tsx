"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { signupEmail } from "@/actions/email-signup.actions";

const STORAGE_KEY = "tl_popup_dismissed";
const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

type Status = "idle" | "submitting" | "success" | "error";

export function EmailSignupPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Don't show on /auth pages
    if (pathname.startsWith("/auth")) return;

    // Check localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const ts = parseInt(stored, 10);
        if (!isNaN(ts) && Date.now() - ts < DISMISS_DURATION_MS) {
          return; // Within 30 days, don't show
        }
      }
    } catch {
      // localStorage unavailable — show anyway
    }

    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Auto-close after success
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        dismiss();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const result = await signupEmail({ email: email.trim(), source: "popup" });
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (!visible || pathname.startsWith("/auth")) return null;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-[100dvh] z-[200] flex items-center justify-center bg-black/75 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="animate-popup-in bg-[#111111] border border-white/10 rounded-2xl p-8 max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <p className="text-white font-black text-xl uppercase">You&apos;re in! 🏒</p>
            <p className="text-white/60 text-sm mt-2">Check your inbox.</p>
          </div>
        ) : (
          <>
            <Image
              src="/images/logo-transparent.png"
              alt="TL Elite Hockey"
              width={80}
              height={40}
              className="h-10 w-auto mb-4"
            />
            <h2 className="text-white font-black uppercase text-2xl sm:text-3xl mb-3">
              STAY IN THE LOOP
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Be first to hear about new sessions, clinics, and gear drops.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === "submitting"}
                className="w-full bg-black border border-white/20 rounded-full px-5 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#4CAF50] transition-colors disabled:opacity-50"
              />

              {status === "error" && errorMessage && (
                <p className="text-red-400 text-xs px-1">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-[#4CAF50] rounded-full py-3 text-white font-black uppercase text-sm tracking-wide hover:bg-[#43A047] transition-colors disabled:opacity-50"
              >
                {status === "submitting" ? "SUBMITTING..." : "SIGN ME UP"}
              </button>
            </form>

            <button
              onClick={dismiss}
              className="w-full text-white/30 text-xs mt-4 hover:text-white/50 transition-colors"
            >
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
