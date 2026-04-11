"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/actions/auth.actions";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <button
      onClick={handleSignOut}
      className="border border-white/20 text-white/60 rounded-full px-8 py-3 hover:border-white/40 hover:text-white text-sm uppercase transition-colors"
    >
      Sign Out
    </button>
  );
}
