"use client";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

// TODO: Replace with real testimonials from Brendan
const testimonials: Testimonial[] = [
  {
    quote: "Brendan and his coaches completely transformed my son's skating in one season. The attention to detail is unreal.",
    author: "Sarah M.",
    role: "Hockey Parent",
  },
  {
    quote: "TL Elite is the best thing we've done for my daughter's hockey development. She went from struggling to one of the strongest skaters on her team.",
    author: "Mike T.",
    role: "Hockey Parent",
  },
  {
    quote: "The small group format is exactly what my son needed. He gets real coaching, not just ice time. His confidence has gone through the roof.",
    author: "Jennifer K.",
    role: "Hockey Parent",
  },
  {
    quote: "Within two sessions I could already see a difference in my kid's footwork. These coaches genuinely care about every player.",
    author: "Chris R.",
    role: "Hockey Parent",
  },
  {
    quote: "We drive 45 minutes each way and it's worth every mile. No other program in the area comes close to this level of instruction.",
    author: "Danielle F.",
    role: "Hockey Parent",
  },
  {
    quote: "Brendan has a gift for breaking down skills in a way that clicks for young players. My son asks to go to TL Elite — that says everything.",
    author: "Tom H.",
    role: "Hockey Parent",
  },
];

// Duplicate for seamless infinite loop
const doubled = [...testimonials, ...testimonials];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[360px] bg-[#111111] border border-white/10 rounded-2xl p-7 mx-3">
      <p className="text-[#F78E2B] text-base mb-4">★★★★★</p>
      <p className="text-white/85 text-sm leading-relaxed italic">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-6 pt-5 border-t border-white/10">
        <p className="text-white font-bold text-sm">{t.author}</p>
        <p className="text-white/40 text-xs mt-0.5">{t.role}</p>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="w-full bg-black py-20 lg:py-28">
      {/* Heading — constrained */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center mb-12">
        <p className="text-[#F78E2B] text-xs uppercase tracking-[0.3em] font-bold mb-3">
          TESTIMONIALS
        </p>
        <h2 className="section-heading text-white text-3xl sm:text-4xl">
          WHAT PARENTS ARE SAYING
        </h2>
      </div>

      {/* Marquee — full bleed */}
      <div className="overflow-hidden">
        <div className="flex animate-marquee">
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
