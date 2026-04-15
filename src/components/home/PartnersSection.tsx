const partners = [
  "Thayer Sports Center",
  "Gallo Ice Arena",
  "USA Hockey",
];

export function PartnersSection() {
  return (
    <div className="bg-[#111111] py-12">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] text-center mb-8">
          PROUD PARTNERS
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {partners.map((partner) => (
            <div
              key={partner}
              className="border border-white/20 rounded-lg px-6 py-3 text-white/50 text-sm font-bold uppercase tracking-widest hover:border-white/40 hover:text-white/70 transition-colors cursor-default"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
