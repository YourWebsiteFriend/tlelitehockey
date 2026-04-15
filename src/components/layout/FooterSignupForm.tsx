"use client";

import { useState } from "react";
import { signupEmail } from "@/actions/email-signup.actions";

export function FooterSignupForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    const result = await signupEmail({ email, source: "footer" });
    if (result.success) {
      setState("success");
      setEmail("");
    } else {
      setState("error");
      setErrorMsg(result.error ?? "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {state === "success" ? (
        <p className="text-[#4CAF50] text-sm font-semibold">You&apos;re on the list!</p>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="flex-1 min-w-0 bg-white/5 border border-white/20 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="bg-[#F78E2B] hover:bg-[#e07e22] disabled:opacity-50 text-white font-bold text-sm px-4 py-2.5 rounded-full transition-colors shrink-0"
            >
              {state === "loading" ? "…" : "Join"}
            </button>
          </div>
          {state === "error" && (
            <p className="text-red-400 text-xs mt-2">{errorMsg}</p>
          )}
        </>
      )}
    </form>
  );
}
