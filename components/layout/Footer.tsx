import React from "react";
import Link from "next/link";
import { BRAND } from "../../constants/brand";
import { FOOTER_SECTIONS, PRIMARY_CTA } from "../../constants/navigation";
import { Container } from "./Container";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { Button } from "../ui/Button";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] pt-16 pb-24 md:pb-16 text-[var(--color-text-secondary)]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[var(--color-border)]">
          {/* Brand & Mission Statement Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-light tracking-[0.25em] text-[var(--color-text-primary)] font-data">
                {BRAND.name}
              </span>
              {" "}
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <p className="text-base text-[var(--color-text-primary)] font-light max-w-md">
              {BRAND.tagline}
            </p>

            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-md">
              {BRAND.description} AIR simplifies aviation access by translating mission parameters—where, when, who, and what matters—into optimized flight recommendations across private jets, helicopters, and turboprops.
            </p>

            <div className="pt-2 flex flex-col gap-1 text-[11px] font-data text-[var(--color-text-muted)]">
              <span>HEADQUARTERS // {BRAND.location}</span>
              <span>PRIMARY ACCESS GATEWAY // {BRAND.hub}</span>
            </div>

            <div className="pt-2">
              <Link href={PRIMARY_CTA.href}>
                <Button variant="outline" size="sm">
                  {PRIMARY_CTA.label}
                </Button>
              </Link>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h3 className="text-[11px] font-data text-[var(--color-text-primary)] tracking-widest uppercase border-b border-[var(--color-border-subtle)] pb-2">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-150 inline-flex items-center gap-2"
                      >
                        <span>{item.label}</span>
                        {!item.isImplemented && (
                          <span className="text-[9px] font-data text-[var(--color-text-muted)]">
                            (FUTURE)
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Data Integrity, Non-Carrier Disclosure & Legal Footer */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] font-data text-[var(--color-text-muted)]">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} {BRAND.name} PLATFORM. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)] max-w-xl font-sans">
              AIR is an aviation concierge & sourcing technology platform. Flights are operated exclusively by certified AOC air carriers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/legal"
              className="text-amber-500 hover:underline font-bold"
            >
              LEGAL CENTER
            </Link>
            <Link
              href="/legal/terms"
              className="hover:text-[var(--color-text-primary)] transition"
            >
              TERMS
            </Link>
            <Link
              href="/legal/privacy"
              className="hover:text-[var(--color-text-primary)] transition"
            >
              PRIVACY (GDPR)
            </Link>
            <Link
              href="/legal/cookies"
              className="hover:text-[var(--color-text-primary)] transition"
            >
              COOKIES
            </Link>
            <Link
              href="/legal/aviation-disclaimer"
              className="hover:text-[var(--color-text-primary)] transition"
            >
              AVIATION DISCLAIMER
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
