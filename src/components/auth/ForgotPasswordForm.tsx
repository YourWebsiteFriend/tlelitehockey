"use client";

import { useState } from "react";
import { ForgotPasswordSchema } from "@/types/auth";
import { sendPasswordReset } from "@/actions/auth.actions";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError("");

    const result = ForgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setFieldError(result.error.issues[0]?.message ?? "Enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      await sendPasswordReset(email);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 text-center">
        <div className="text-[#4CAF50] text-4xl mb-4">✓</div>
        <h2 className="text-white font-bold text-lg mb-2">Check your email</h2>
        <p className="text-white/50 text-sm">
          If an account exists for that email, a reset link is on the way.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          autoComplete="email"
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#4CAF50] transition-colors"
        />
        {fieldError && (
          <p className="text-red-400 text-xs mt-1">{fieldError}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#4CAF50] text-white rounded-full py-4 font-bold uppercase text-sm tracking-wide hover:bg-[#43A047] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
}
