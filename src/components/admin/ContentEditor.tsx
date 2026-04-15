'use client';

import { useState, useEffect } from 'react';
import { getSiteContent, updateSiteContent } from '@/actions/admin.actions';
import type { SiteContent } from '@/types/admin';

const CONTENT_KEYS: { key: string; label: string; description: string }[] = [
  {
    key: 'homepage_announcement',
    label: 'Homepage Announcement',
    description: 'Banner message shown at the top of the homepage.',
  },
  {
    key: 'book_page_notice',
    label: 'Book Page Notice',
    description: 'Notice shown on the booking page (e.g. upcoming schedule changes).',
  },
  {
    key: 'schedule_note',
    label: 'Schedule Note',
    description: 'Note displayed at the top of the schedule page.',
  },
];

interface ContentItem {
  key: string;
  value: string;
  saving: boolean;
  saved: boolean;
  error: string | null;
}

export function ContentEditor() {
  const [items, setItems] = useState<ContentItem[]>(
    CONTENT_KEYS.map((k) => ({
      key: k.key,
      value: '',
      saving: false,
      saved: false,
      error: null,
    }))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const result = await getSiteContent();
      if (result.success) {
        const map = new Map(result.data.map((c: SiteContent) => [c.key, c.value]));
        setItems((prev) =>
          prev.map((item) => ({
            ...item,
            value: map.get(item.key) ?? '',
          }))
        );
      }
      setLoading(false);
    }
    load();
  }, []);

  function updateValue(key: string, value: string) {
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, value, saved: false } : item))
    );
  }

  async function handleSave(key: string) {
    const item = items.find((i) => i.key === key);
    if (!item) return;

    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, saving: true, error: null } : i))
    );

    const result = await updateSiteContent(key, item.value);

    setItems((prev) =>
      prev.map((i) =>
        i.key === key
          ? { ...i, saving: false, saved: result.success, error: result.success ? null : result.error }
          : i
      )
    );
  }

  if (loading) {
    return <div className="text-white/30 text-sm py-12 text-center">Loading content…</div>;
  }

  return (
    <div className="space-y-6">
      {CONTENT_KEYS.map(({ key, label, description }) => {
        const item = items.find((i) => i.key === key);
        if (!item) return null;

        return (
          <div key={key} className="bg-[#111111] border border-white/10 rounded-xl p-6 space-y-3">
            <div>
              <h2 className="text-white font-semibold">{label}</h2>
              <p className="text-white/40 text-sm">{description}</p>
            </div>
            <textarea
              value={item.value}
              onChange={(e) => updateValue(key, e.target.value)}
              rows={3}
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#F78E2B]/50 transition-colors text-sm resize-none"
              placeholder="Leave empty to hide this notice."
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSave(key)}
                disabled={item.saving}
                className="bg-[#F78E2B] hover:bg-[#e07d1e] disabled:opacity-50 text-black font-semibold px-5 py-2 rounded-full text-sm transition-colors"
              >
                {item.saving ? 'Saving…' : 'Save'}
              </button>
              {item.saved && (
                <span className="text-[#4CAF50] text-sm">Saved!</span>
              )}
              {item.error && (
                <span className="text-red-400 text-sm">{item.error}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
