"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/auth.actions";

const inputClass =
  "border-0 border-b border-white/30 bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:border-[#4CAF50] transition-colors rounded-none py-3 w-full";

const labelClass = "text-white/60 text-sm uppercase tracking-wide mb-2 block";

export function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const result = await signUp(email, password, fullName);
      if (result.success) {
        router.push("/account");
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#111111] rounded-2xl p-10 w-full max-w-md border border-white/10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logo.svg"
            alt="TL Elite Hockey"
            width={120}
            height={60}
            className="object-contain"
            onError={() => {}}
          />
        </div>

        <h1 className="section-heading text-white text-2xl text-center mb-8">
          CREATE YOUR ACCOUNT
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelClass}>FULL NAME</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelClass}>EMAIL</label>
            <input
              type="email"
              className={inputClass}
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelClass}>PASSWORD</label>
            <input
              type="password"
              className={inputClass}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-white/30 text-xs mt-1">Minimum 8 characters</p>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full py-4 bg-[#4CAF50] text-white font-black uppercase tracking-widest hover:bg-[#43A047] transition-colors disabled:opacity-50"
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <p className="text-white/50 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#4CAF50] hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
