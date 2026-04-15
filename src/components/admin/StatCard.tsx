interface StatCardProps {
  label: string;
  value: number | string;
  accent: 'green' | 'blue' | 'orange' | 'purple';
}

const accentMap: Record<StatCardProps['accent'], string> = {
  green: 'border-l-[#4CAF50] text-[#4CAF50]',
  blue: 'border-l-blue-400 text-blue-400',
  orange: 'border-l-[#F78E2B] text-[#F78E2B]',
  purple: 'border-l-purple-400 text-purple-400',
};

export function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <div
      className={`bg-[#111111] border border-white/10 border-l-4 ${accentMap[accent]} rounded-lg p-6`}
    >
      <p className="text-white/50 text-sm uppercase tracking-widest mb-2">{label}</p>
      <p className="text-4xl font-bold text-white">{value}</p>
    </div>
  );
}
