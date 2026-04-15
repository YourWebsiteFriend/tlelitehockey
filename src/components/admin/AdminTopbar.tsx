'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '@/actions/auth.actions';

interface AdminTopbarProps {
  userEmail: string | null;
}

export function AdminTopbar({ userEmail }: AdminTopbarProps) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push('/admin/login');
  }

  return (
    <header className="h-14 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-6 flex-shrink-0">
      <span className="text-white font-semibold tracking-wide text-sm">
        TL ELITE <span className="text-[#F78E2B]">ADMIN</span>
      </span>
      <div className="flex items-center gap-4">
        {userEmail && (
          <span className="text-white/40 text-sm">{userEmail}</span>
        )}
        <button
          onClick={handleSignOut}
          className="text-sm text-white/60 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
