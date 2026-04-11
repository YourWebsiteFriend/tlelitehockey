"use client";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The TL Team are plateau breakers. I've watched our son and all the players explode onto new levels. The coaching is nothing short of genius — they're not just showing drills, they're helping kids understand the fundamentals. Our son is a much stronger player, but also a smarter player.",
    author: "William C.",
    role: "Hockey Parent",
  },
  {
    quote: "Exceptional training experience. Small group format with multiple coaches trumps all the other large group sessions we've participated in. Personal, individualized feedback, correction, and demonstration was great to see. Will be going back.",
    author: "Nick L.",
    role: "Hockey Parent",
  },
  {
    quote: "My son came off the ice begging for more and immediately asked to sign up again. Can't say enough good things. Thank you!",
    author: "Joe L.",
    role: "Hockey Parent",
  },
  {
    quote: "My son is hard of hearing and struggles in big groups. He loved being with a small group of kids who all genuinely wanted to be there and learn. The coaches went through each drill thoroughly making sure no kid was left behind. We will definitely be back.",
    author: "Ryan C.",
    role: "Hockey Parent",
  },
  {
    quote: "At TL our son always comes off the ice soaked in sweat and accomplished. The coaches create a connection with all the players to personalize the experience. They really know how to bring out the very best in our son.",
    author: "William C.",
    role: "Hockey Parent",
  },
  {
    quote: "Coach Brendan is phenomenal with the kids — he ensures they do the drills properly and understand why they're doing them. They are never standing around and are always engaged. I am really, REALLY impressed!",
    author: "Emily T.",
    role: "Hockey Parent",
  },
  {
    quote: "Coach Brendan took my son aside because he saw him struggling with a drill and showed him a quick trick to help him get better. That's what good coaches do — teach.",
    author: "Corey A.",
    role: "Hockey Parent",
  },
  {
    quote: "The coaching staff was exceptional, providing personalized attention to each child. This individualized training is significantly boosting my child's skill level and confidence with each session.",
    author: "Kate S.",
    role: "Hockey Parent",
  },
  {
    quote: "We have been skating with Brendan since the summer and love it! Great with the kids and keeps his drop-ins small so they get more one on one instruction. Highly recommend!",
    author: "Nikki N.",
    role: "Hockey Parent",
  },
  {
    quote: "The private lesson with Coach Max was great — we could see big gains after just one session. James is excited to practice at home and has been applying what he learned every day since.",
    author: "Nicole G.",
    role: "Hockey Parent",
  },
  {
    quote: "Fantastic skills session! Edge work, stick handling, shooting, and puck battles — nonstop movement over the 50-minute session. My son loved it.",
    author: "Josh T.",
    role: "Hockey Parent",
  },
  {
    quote: "Reagan had the best time! My husband was very impressed by the individualized attention and keeping all of the kids moving and engaged the whole session. I would highly recommend!",
    author: "Erin H.",
    role: "Hockey Parent",
  },
  {
    quote: "Harry gets so much out of the individual attention in the small groups. He looks forward to every session with Brendan. Highly recommend!",
    author: "Amy A.",
    role: "Hockey Parent",
  },
  {
    quote: "Best skills around. Best instructors. Been to many — no better.",
    author: "Chris N.",
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
