"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { signOut } from "@/actions/auth.actions";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

interface Props {
  mobile?: boolean;
}

export function NavAuthButton({ mobile = false }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }: { data: { user: User | null } }) => {
      setUser(user);
      setLoading(false);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  // Get user initials
  const getInitials = (user: User): string => {
    const name = user.user_metadata?.full_name as string | undefined;
    if (name) {
      const parts = name.trim().split(" ");
      return parts.length >= 2
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        : parts[0][0].toUpperCase();
    }
    return (user.email?.[0] ?? "U").toUpperCase();
  };

  if (loading) {
    // Skeleton — prevents layout shift
    return <div className={mobile ? "h-10 w-24" : "h-8 w-8 rounded-full bg-white/10"} />;
  }

  if (!user) {
    if (mobile) {
      return (
        <Link
          href="/auth/login"
          className="block w-full text-center bg-[#4CAF50] text-white rounded-full py-3 font-bold uppercase text-sm tracking-wide"
        >
          Log In
        </Link>
      );
    }
    return (
      <Link
        href="/auth/login"
        className="bg-[#4CAF50] text-white rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide hover:bg-[#43A047] transition-colors"
      >
        Log In
      </Link>
    );
  }

  // Logged in — show avatar + dropdown
  if (mobile) {
    return (
      <div className="space-y-2">
        <Link
          href="/account"
          className="block w-full text-center border border-white/20 text-white rounded-full py-3 font-bold uppercase text-sm tracking-wide hover:border-white/40 transition-colors"
        >
          My Account
        </Link>
        <button
          onClick={handleSignOut}
          className="block w-full text-center text-white/50 text-sm hover:text-white transition-colors py-2"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((o) => !o)}
        className="w-9 h-9 rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-black text-sm hover:bg-[#43A047] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="Account menu"
        aria-expanded={dropdownOpen}
      >
        {getInitials(user)}
      </button>

      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-44 bg-[#111111] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50">
          <Link
            href="/account"
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors"
          >
            My Account
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-3 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors border-t border-white/10"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
