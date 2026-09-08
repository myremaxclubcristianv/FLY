import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_EXPERIENCES } from "../../../data/demo/experiences";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { PlaceholderImage } from "../../../components/shared/PlaceholderImage";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = DEMO_EXPERIENCES.find((e) => e.slug === slug);
  if (!exp) return { title: "Aviation Experience | AIR" };
  return {
    title: `${exp.title} | AIR Curated Mission`,
    description: exp.description,
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = DEMO_EXPERIENCES.find((e) => e.slug === slug);

  if (!exp) {
    notFound();
  }

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="default">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                CURATED MISSION // {exp.category}
              </span>
              <DataStatusBadge status={exp.dataStatus} />
            </div>

            <SectionHeader
              title={exp.title}
              description={`Location vector: ${exp.locationName}. Indicative duration: ${exp.duration}.`}
              titleAs="h1"
            />
          </div>

          <PlaceholderImage title={exp.title} code={`MISSION // ${exp.category}`} aspectRatio="wide" />

          <Card variant="surface" className="flex flex-col gap-6 p-8">
            <h3 className="text-xl font-light text-[var(--color-text-primary)]">ITINERARY HIGHLIGHTS</h3>
            <ul className="flex flex-col gap-3 font-sans text-sm text-[var(--color-text-secondary)]">
              {exp.highlights?.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <h4 className="text-xl font-light text-[var(--color-text-primary)]">
                REQUEST THIS MISSION ITINERARY
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Submit your date and passenger count for quote evaluation.
              </p>
            </div>
            <Link href={`/plan?to=${encodeURIComponent(exp.title)}`}>
              <Button variant="primary" size="lg">
                REQUEST MISSION QUOTE →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
