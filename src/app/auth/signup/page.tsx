import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account | TL Elite Hockey",
};

export default function SignupPage() {
  return <SignupForm />;
}
