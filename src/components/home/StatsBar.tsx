const stats = [
  { num: "200+", label: "Players Trained" },
  { num: "8 Max", label: "Per Group" },
  { num: "5+", label: "Coaches On Ice" },
  { num: "Est. 2021", label: "Founded" },
];

export function StatsBar() {
  return (
    <div className="bg-[#111111] border-y border-white/10 py-8">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap justify-center sm:justify-between">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 min-w-[50%] sm:min-w-0 text-center py-4 sm:py-0 ${
                i < stats.length - 1 ? "sm:border-r sm:border-white/10" : ""
              }`}
            >
              <p className="text-3xl font-black text-[#F78E2B]">{stat.num}</p>
              <p className="text-xs uppercase tracking-widest text-white mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
