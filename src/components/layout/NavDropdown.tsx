"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const dropdownItems = [
  { label: "Book Sessions", href: "/book" },
  { label: "Clinics", href: "/clinics" },
];

interface NavDropdownProps {
  onItemClick?: () => void;
}

export function NavDropdown({ onItemClick }: NavDropdownProps) {
  const pathname = usePathname();

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 rounded-lg bg-[#111111] border border-white/10 shadow-xl overflow-hidden z-50">
      {dropdownItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "block px-4 py-3 text-sm font-medium transition-colors duration-150",
              "focus:outline-none focus-visible:bg-[#4CAF50]/20",
              isActive
                ? "text-[#4CAF50] bg-[#4CAF50]/10"
                : "text-white hover:bg-[#4CAF50]/15 hover:text-[#4CAF50]"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
