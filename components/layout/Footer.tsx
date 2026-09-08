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
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-light tracking-[0.25em] text-[var(--color-text-primary)] font-data">
                {BRAND.name}
              </span>
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
              <span>BUILD STATUS // {BRAND.version}</span>
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
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h4 className="text-[11px] font-data text-[var(--color-text-primary)] tracking-widest uppercase border-b border-[var(--color-border-subtle)] pb-2">
                  {section.title}
                </h4>
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

        {/* Data Integrity & Disclosure Footer */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] font-data text-[var(--color-text-muted)]">
          <p>
            © {new Date().getFullYear()} {BRAND.name} PLATFORM. ALL RIGHTS RESERVED.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              <span>DATA STATUS DISCLOSURE ACTIVE</span>
            </span>
            <Link
              href="#data-status"
              className="hover:text-[var(--color-text-primary)] underline underline-offset-4"
            >
              INTEGRITY POLICY
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
