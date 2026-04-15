'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  ShoppingBag,
  MessageSquare,
  Mail,
  Calendar,
  BarChart3,
  FileText,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Sessions', href: '/admin/sessions', icon: CalendarDays },
  { label: 'Bookings', href: '/admin/bookings', icon: ShoppingBag },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Signups', href: '/admin/signups', icon: Mail },
  { label: 'Schedule', href: '/admin/schedule', icon: Calendar },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Content', href: '/admin/content', icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-full bg-[#0a0a0a] border-r border-white/10 flex flex-col py-4">
      <nav className="flex flex-col gap-1 px-3">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/5 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
