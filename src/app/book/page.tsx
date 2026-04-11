import type { Metadata } from "next";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SessionsBoard } from "@/components/book/SessionsBoard";
import { getSessionsBySeason } from "@/services/sessions.service";

export const metadata: Metadata = {
  title: "Book Youth Hockey Sessions",
  description:
    "Book drop-in sessions, Spring 2026 packages, or Summer 2026 packages. Small-group training for ages 5–18 at Thayer Sports Center, Braintree MA.",
};

export default async function BookPage() {
  const sessions = await getSessionsBySeason();

  return (
    <SectionWrapper className="bg-black pt-32">
      <div className="mb-12 text-center">
        <h1 className="section-heading text-white text-3xl sm:text-5xl mb-4">
          OUR SESSIONS
        </h1>
        <p className="text-white/50 text-lg">
          Choose your program. Small groups, focused coaching, real results.
        </p>
      </div>

      <SessionsBoard sessions={sessions} />
    </SectionWrapper>
  );
}
