'use client';

import type { AdminSignup } from '@/types/admin';

interface ExportCsvButtonProps {
  signups: AdminSignup[];
}

export function ExportCsvButton({ signups }: ExportCsvButtonProps) {
  function handleExport() {
    const headers = ['email', 'source', 'created_at'];
    const rows = signups.map((s) => [s.email, s.source, s.created_at]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tlelite-signups-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="border border-white/10 hover:border-white/30 text-white/60 hover:text-white px-5 py-2.5 rounded-full text-sm transition-colors"
    >
      Export CSV
    </button>
  );
}
