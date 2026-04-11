"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavDropdown } from "./NavDropdown";

const leftNavLinks = [
  { label: "About", href: "/about" },
];

const rightNavLinks = [
  { label: "Private Lessons", href: "/private-lessons" },
  { label: "Contact", href: "/contact" },
];

const mobileLinks = [
  { label: "About", href: "/about" },
  { label: "Book Sessions", href: "/book" },
  { label: "Clinics", href: "/clinics" },
  { label: "Private Lessons", href: "/private-lessons" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-white/10">
      <nav
        className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* ── Desktop Left Links ───────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-6">
          {leftNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-150",
                "focus:outline-none focus-visible:underline",
                isActive(link.href)
                  ? "text-white underline underline-offset-4"
                  : "text-white/80 hover:text-white hover:underline hover:underline-offset-4"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Small Groups dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setDropdownOpen(false);
              }}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors duration-150",
                "focus:outline-none focus-visible:underline",
                dropdownOpen
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              )}
            >
              Small Groups
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform duration-200",
                  dropdownOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>

            {dropdownOpen && (
              <NavDropdown onItemClick={() => setDropdownOpen(false)} />
            )}
          </div>
        </div>

        {/* ── Center Logo ──────────────────────────────────────────── */}
        <div className="flex-1 lg:flex-none flex justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] rounded"
            aria-label="TL Elite Hockey — Home"
          >
            <Image
              src="/images/logo.png"
              alt="TL Elite Hockey"
              width={120}
              height={60}
              className="h-[60px] w-auto"
              priority
            />
          </Link>
        </div>

        {/* ── Desktop Right Links ──────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-6">
          {rightNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-150",
                "focus:outline-none focus-visible:underline",
                isActive(link.href)
                  ? "text-white underline underline-offset-4"
                  : "text-white/80 hover:text-white hover:underline hover:underline-offset-4"
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/auth/login"
            className={cn(
              "text-sm font-medium px-4 py-2 rounded-full border border-white/40",
              "text-white hover:border-white hover:bg-white/10 transition-colors duration-150",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            )}
          >
            Log In
          </Link>
        </div>

        {/* ── Mobile Hamburger ─────────────────────────────────────── */}
        <button
          type="button"
          className={cn(
            "lg:hidden p-2 rounded-md text-white/80 hover:text-white",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          )}
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {/* ── Mobile Menu ──────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden bg-black border-t border-white/10" role="navigation" aria-label="Mobile navigation">
          <div className="px-4 py-4 flex flex-col gap-1">
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50]",
                  isActive(link.href)
                    ? "text-[#4CAF50] bg-[#4CAF50]/10"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 pt-2 border-t border-white/10">
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block text-center px-4 py-3 rounded-full border border-white/40 text-sm font-medium",
                  "text-white hover:border-white hover:bg-white/10 transition-colors duration-150",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                )}
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
