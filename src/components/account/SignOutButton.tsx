"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/actions/auth.actions";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="border border-white/20 rounded-full px-8 py-3 text-white/60 font-bold uppercase text-sm tracking-wide hover:border-white/40 hover:text-white transition-colors"
    >
      Sign Out
    </button>
  );
}
