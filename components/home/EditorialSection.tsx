import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { PRIMARY_CTA } from "../../constants/navigation";
import { DataStatusBadge } from "../shared/DataStatusBadge";

export function EditorialSection() {
  return (
    <section className="w-full py-28 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] relative overflow-hidden">
      {/* Background Decorative SVG Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#5a8fa8" strokeWidth="0.5" />
          <circle cx="50%" cy="50%" r="300" stroke="#292c2f" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <Container size="default" className="relative z-10">
        <div className="flex flex-col gap-12 text-center items-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-data text-[var(--color-accent)] tracking-widest uppercase">
              THE AIR STATEMENT
            </span>
            <DataStatusBadge status="INDICATIVE" showDot={false} />
          </div>

          {/* Large Editorial Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--color-text-primary)] leading-[1.15] text-balance">
            GO WHEN YOU WANT<span className="text-[var(--color-accent)]">.</span><br />
            TAKE BACK THE DAY<span className="text-[var(--color-accent)]">.</span>
          </h2>

          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] font-light leading-relaxed max-w-2xl text-balance">
            Private aviation was built to reclaim control of time. AIR restores transparency and clarity to flight planning. No complex air charter jargon, no opaque quotes, and no superficial promises.
          </p>

          {/* Key Principles Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-6 border-t border-b border-[var(--color-border-subtle)] py-8 my-2">
            <div className="flex flex-col gap-1 items-center">
              <span className="text-xs font-data text-[var(--color-text-primary)]">
                YOUR FLIGHT. YOUR WAY.
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                Bespoke point-to-point routing
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-xs font-data text-[var(--color-text-primary)]">
                RIGHT WAY TO FLY.
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                Aircraft category matching
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-xs font-data text-[var(--color-text-primary)]">
                KNOW WHO FLIES YOU.
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                Transparent verification
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <Link href={PRIMARY_CTA.href}>
              <Button size="lg" variant="primary">
                {PRIMARY_CTA.label}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
