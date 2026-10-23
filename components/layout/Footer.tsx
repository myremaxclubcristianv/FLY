import React from "react";
import Link from "next/link";
import { BRAND } from "../../constants/brand";
import { FOOTER_SECTIONS, PRIMARY_CTA } from "../../constants/navigation";
import { Container } from "./Container";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { Button } from "../ui/Button";
import { ECOSYSTEM_CONTACT } from "../../data/real/ecosystem";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] pt-16 pb-24 md:pb-16 text-[var(--color-text-secondary)]">
      <Container size="wide">
        {/* Main Grid: Brand statement + 4 navigation columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[var(--color-border)]">
          {/* Brand & Mission Statement Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-light tracking-[0.25em] text-[var(--color-text-primary)] font-data">
                {BRAND.name}
              </span>{" "}
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <p className="text-base text-[var(--color-text-primary)] font-light max-w-md">
              {BRAND.tagline}
            </p>

            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-md">
              {BRAND.description} AIR connects you to the wider Cristian Văduva business ecosystem spanning verified real estate, asset protection, credit advisory, and digital intelligence platforms.
            </p>

            <div className="pt-2 flex flex-col gap-1 text-[11px] font-data text-[var(--color-text-muted)]">
              <span>HEADQUARTERS // {BRAND.location}</span>
              <span>PRIMARY ACCESS GATEWAY // {BRAND.hub}</span>
              <span>EXECUTIVE OFFICE // +43 650 953 6345</span>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link href={PRIMARY_CTA.href}>
                <Button variant="outline" size="sm">
                  {PRIMARY_CTA.label}
                </Button>
              </Link>
              <Link href="/ecosystem">
                <Button variant="text" size="sm" className="text-xs text-amber-500 hover:text-amber-400">
                  EXPLORE ECOSYSTEM →
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
                  {section.items.map((item) => {
                    const isExternal = item.href.startsWith("http");
                    return (
                      <li key={item.label}>
                        {isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-150 inline-flex items-center gap-1.5"
                          >
                            <span>{item.label}</span>
                            <span className="text-[9px] text-[var(--color-text-muted)] font-mono">
                              ↗
                            </span>
                          </a>
                        ) : (
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
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Ecosystem Connect Bar: Verified contact & verified social channels */}
        <div className="py-8 border-b border-[var(--color-border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">
              OFFICIAL CONNECT //
            </span>
            <a
              href={ECOSYSTEM_CONTACT.whatsappUrlEn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1.5 transition"
            >
              <span>WhatsApp: {ECOSYSTEM_CONTACT.phoneInternational}</span>
              <span>↗</span>
            </a>
            <a
              href={`mailto:${ECOSYSTEM_CONTACT.email}`}
              className="text-[var(--color-text-primary)] hover:text-amber-400 font-bold transition"
            >
              {ECOSYSTEM_CONTACT.email}
            </a>
            <a
              href={ECOSYSTEM_CONTACT.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
            >
              Linktree ↗
            </a>
          </div>

          {/* Social Profiles Strip */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] text-[var(--color-text-muted)] uppercase">SOCIAL:</span>
            {ECOSYSTEM_CONTACT.socials.slice(0, 5).map((soc) => (
              <a
                key={soc.platform}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition border border-white/[0.06]"
                title={`${soc.platform}: ${soc.handle}`}
              >
                {soc.platform} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Data Integrity, Non-Carrier Disclosure & Legal Footer */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] font-data text-[var(--color-text-muted)]">
          <div className="space-y-1.5 max-w-2xl">
            <p className="text-[12px] text-[var(--color-text-primary)] font-semibold">
              © {new Date().getFullYear()} {BRAND.name}. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)] font-sans leading-relaxed">
              AIR by Cristian Văduva is an executive aviation concierge and decision intelligence platform. AIR is not an air carrier and does not operate flights or hold an AOC. All flights are operated exclusively by licensed, certified AOC air carriers. Insurance advisory is conducted independently via licensed partnerships with Generali România. Credit advisory is conducted independently via CV Finance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/ecosystem"
              className="text-amber-500 hover:text-amber-400 font-bold transition"
            >
              ECOSYSTEM DIRECTORY
            </Link>
            <Link
              href="/contact"
              className="text-amber-500 hover:text-amber-400 font-bold transition"
            >
              CONTACT DESK
            </Link>
            <a
              href="mailto:contact@cristianvaduva.com"
              className="hover:text-[var(--color-text-primary)] transition"
            >
              EMAIL: contact@cristianvaduva.com
            </a>
            <Link
              href="/legal"
              className="hover:text-[var(--color-text-primary)] transition font-bold"
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
