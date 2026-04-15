'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSessionAction, updateSessionAction, deactivateSession } from '@/actions/admin.actions';
import type { Session } from '@/types/session';
import type { SessionCreateInput } from '@/types/admin';

interface SessionFormProps {
  session?: Session;
  mode: 'new' | 'edit';
}

const SEASONS = ['Drop Ins', 'Spring 2026', 'Summer 2026', 'Clinics'] as const;

export function SessionForm({ session, mode }: SessionFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deactivating, setDeactivating] = useState(false);

  const [form, setForm] = useState<{
    name: string;
    season: string;
    age_group: string;
    day: string;
    duration_minutes: string;
    price: string;
    start_date: string;
    max_capacity: string;
    spots_left: string;
    stripe_product_id: string;
    stripe_price_id: string;
    is_active: boolean;
  }>({
    name: session?.name ?? '',
    season: session?.season ?? 'Drop Ins',
    age_group: session?.age_group ?? '',
    day: session?.day ?? '',
    duration_minutes: String(session?.duration_minutes ?? 60),
    price: String(session?.price ?? 0),
    start_date: session?.start_date ?? '',
    max_capacity: String(session?.max_capacity ?? 20),
    spots_left: String(session?.spots_left ?? 20),
    stripe_product_id: session?.stripe_product_id ?? '',
    stripe_price_id: session?.stripe_price_id ?? '',
    is_active: session?.is_active ?? true,
  });

  function set(field: keyof typeof form, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload: SessionCreateInput = {
      name: form.name,
      season: form.season as SessionCreateInput['season'],
      age_group: form.age_group || null,
      day: form.day || null,
      duration_minutes: parseInt(form.duration_minutes, 10),
      price: parseFloat(form.price),
      start_date: form.start_date || null,
      max_capacity: parseInt(form.max_capacity, 10),
      spots_left: parseInt(form.spots_left, 10),
      stripe_product_id: form.stripe_product_id || null,
      stripe_price_id: form.stripe_price_id || null,
    };

    if (mode === 'new') {
      const result = await createSessionAction(payload);
      if (!result.success) {
        setError(result.error);
        setSaving(false);
        return;
      }
    } else {
      const result = await updateSessionAction(session!.id, {
        ...payload,
        is_active: form.is_active,
      });
      if (!result.success) {
        setError(result.error);
        setSaving(false);
        return;
      }
    }

    router.push('/admin/sessions');
    router.refresh();
  }

  async function handleDeactivate() {
    if (!session) return;
    setDeactivating(true);
    await deactivateSession(session.id);
    router.push('/admin/sessions');
    router.refresh();
  }

  const inputClass =
    'w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#F78E2B]/50 transition-colors text-sm';
  const labelClass = 'block text-white/60 text-sm mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Name */}
      <div>
        <label className={labelClass}>Name *</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          className={inputClass}
          placeholder="e.g. Spring Drop-In Monday"
        />
      </div>

      {/* Season */}
      <div>
        <label className={labelClass}>Season *</label>
        <select
          value={form.season}
          onChange={(e) => set('season', e.target.value)}
          className={inputClass}
        >
          {SEASONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Age Group */}
      <div>
        <label className={labelClass}>Age Group</label>
        <input
          type="text"
          value={form.age_group}
          onChange={(e) => set('age_group', e.target.value)}
          className={inputClass}
          placeholder="e.g. 8-10, Mites, All Ages"
        />
      </div>

      {/* Day */}
      <div>
        <label className={labelClass}>Day</label>
        <input
          type="text"
          value={form.day}
          onChange={(e) => set('day', e.target.value)}
          className={inputClass}
          placeholder="e.g. Mon or Mon, Wed"
        />
      </div>

      {/* Duration + Price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Duration (minutes) *</label>
          <input
            type="number"
            required
            min={1}
            value={form.duration_minutes}
            onChange={(e) => set('duration_minutes', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Price ($) *</label>
          <input
            type="number"
            required
            min={0}
            step={0.01}
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Start Date */}
      <div>
        <label className={labelClass}>Start Date</label>
        <input
          type="date"
          value={form.start_date}
          onChange={(e) => set('start_date', e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Capacity */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Max Capacity *</label>
          <input
            type="number"
            required
            min={1}
            value={form.max_capacity}
            onChange={(e) => set('max_capacity', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Spots Left *</label>
          <input
            type="number"
            required
            min={0}
            value={form.spots_left}
            onChange={(e) => set('spots_left', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Stripe IDs */}
      <div>
        <label className={labelClass}>Stripe Product ID</label>
        <input
          type="text"
          value={form.stripe_product_id}
          onChange={(e) => set('stripe_product_id', e.target.value)}
          className={inputClass}
          placeholder="prod_..."
        />
      </div>
      <div>
        <label className={labelClass}>Stripe Price ID</label>
        <input
          type="text"
          value={form.stripe_price_id}
          onChange={(e) => set('stripe_price_id', e.target.value)}
          className={inputClass}
          placeholder="price_..."
        />
      </div>

      {/* Is Active (edit only) */}
      {mode === 'edit' && (
        <div className="flex items-center gap-3">
          <input
            id="is_active"
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => set('is_active', e.target.checked)}
            className="w-4 h-4 accent-[#F78E2B]"
          />
          <label htmlFor="is_active" className="text-white/60 text-sm cursor-pointer">
            Active (visible to users)
          </label>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#F78E2B] hover:bg-[#e07d1e] disabled:opacity-50 text-black font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          {saving ? 'Saving…' : mode === 'new' ? 'Create Session' : 'Save Changes'}
        </button>

        {mode === 'edit' && session?.is_active && (
          <button
            type="button"
            onClick={handleDeactivate}
            disabled={deactivating}
            className="border border-red-500/30 text-red-400 hover:border-red-500/60 hover:text-red-300 disabled:opacity-50 px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            {deactivating ? 'Deactivating…' : 'Deactivate'}
          </button>
        )}

        <button
          type="button"
          onClick={() => router.push('/admin/sessions')}
          className="text-white/40 hover:text-white text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
