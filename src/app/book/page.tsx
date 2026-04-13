export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
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
    <>
      <PageHero
        heading="BOOK A SESSION"
        body="Small groups, focused coaching, real results."
        backgroundImage="/images/DSC02667.jpg"
      />
      <SectionWrapper className="bg-black">
        <SessionsBoard sessions={sessions} />
      </SectionWrapper>
    </>
  );
}
