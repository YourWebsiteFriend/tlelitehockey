import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In | TL Elite Hockey",
};

export default function LoginPage() {
  return <LoginForm />;
}
