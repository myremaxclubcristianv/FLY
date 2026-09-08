import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { WORLDS_DATA } from "../../data/demo/worlds";

export function WorldsGrid() {
  return (
    <section id="fly" className="w-full py-24 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          <SectionHeader
            eyebrow="PLATFORM ARCHITECTURE"
            title="THE SIX WORLDS OF AIR."
            description="AIR connects the complete spectrum of private aviation—from point-to-point flight decisions and bespoke experiences to corporate operations, aircraft intelligence, ownership services, and editorial dispatch."
          />

          {/* Editorial Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-editorial">
            {WORLDS_DATA.map((world) => (
              <div
                key={world.id}
                id={world.title.toLowerCase()}
                className="p-8 flex flex-col justify-between gap-8 group hover:bg-[var(--color-surface)] transition-colors duration-300"
              >
                {/* Top World Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-data text-[var(--color-accent)] tracking-widest uppercase">
                    {world.code}
                  </span>
                  <DataStatusBadge status={world.status} showDot={false} />
                </div>

                {/* World Title & Description */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-3xl font-light tracking-wide text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                    {world.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans">
                    {world.description}
                  </p>
                </div>

                {/* Bottom Metrics & Navigation Link */}
                <div className="pt-6 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                  <span className="text-[10px] font-data text-[var(--color-text-muted)]">
                    {world.metrics}
                  </span>
                  <Link
                    href={world.href}
                    className="text-xs font-data text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>EXPLORE</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
