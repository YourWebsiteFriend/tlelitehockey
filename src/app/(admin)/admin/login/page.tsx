'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/actions/auth.actions';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn(email, password);

    if (!result.success) {
      setError(result.error ?? 'Invalid credentials.');
      setLoading(false);
      return;
    }

    router.push('/admin');
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <p className="text-[#F78E2B] text-2xl font-bold tracking-[0.15em]">TL ELITE</p>
          <p className="text-white/40 text-sm tracking-widest uppercase mt-1">Admin Portal</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] border border-white/10 rounded-xl p-8 space-y-5"
        >
          <div>
            <label htmlFor="email" className="block text-white/60 text-sm mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#F78E2B]/50 transition-colors text-sm"
              placeholder="admin@tlelitehockey.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white/60 text-sm mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#F78E2B]/50 transition-colors text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F78E2B] hover:bg-[#e07d1e] disabled:opacity-50 text-black font-semibold py-3 rounded-full transition-colors text-sm tracking-wide"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
