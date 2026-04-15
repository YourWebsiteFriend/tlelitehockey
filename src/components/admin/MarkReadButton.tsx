'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { markMessageReadAction } from '@/actions/admin.actions';

export function MarkReadButton({ messageId }: { messageId: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setLoading(true);
    await markMessageReadAction(messageId);
    setDone(true);
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || done}
      className="border border-white/10 hover:border-white/30 text-white/60 hover:text-white disabled:opacity-50 px-5 py-2.5 rounded-full text-sm transition-colors"
    >
      {done ? 'Marked as Read' : loading ? 'Marking…' : 'Mark as Read'}
    </button>
  );
}
