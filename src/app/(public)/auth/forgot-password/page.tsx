import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | TL Elite Hockey",
  description: "Reset your TL Elite Hockey account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="section-heading text-white text-3xl mb-3">RESET PASSWORD</h1>
          <p className="text-white/50 text-sm">Enter your email and we&apos;ll send you a reset link.</p>
        </div>
        <ForgotPasswordForm />
        <p className="text-center mt-6">
          <Link
            href="/auth/login"
            className="text-white/40 text-sm hover:text-white/70 transition-colors"
          >
            ← Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
