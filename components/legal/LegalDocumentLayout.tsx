import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { LEGAL_CONFIG } from "@/lib/config/legal";

interface LegalDocumentLayoutProps {
  titleRo: string;
  titleEn: string;
  documentNumber: string;
  category: string;
  lastUpdated?: string;
  version?: string;
  tableOfContents?: Array<{ id: string; label: string }>;
  children: React.ReactNode;
}

export function LegalDocumentLayout({
  titleRo,
  titleEn,
  documentNumber,
  category,
  lastUpdated = LEGAL_CONFIG.versioning.lastUpdated,
  version = LEGAL_CONFIG.versioning.version,
  tableOfContents,
  children,
}: LegalDocumentLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans antialiased selection:bg-amber-400 selection:text-neutral-950">
      {/* Header Banner */}
      <section className="w-full pt-32 pb-16 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50">
        <Container size="wide">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Breadcrumb & Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)]">
              <Link href="/" className="hover:text-[var(--color-text-primary)] transition">
                AIR
              </Link>
              <span>/</span>
              <Link href="/legal" className="hover:text-[var(--color-text-primary)] transition">
                LEGAL CENTER
              </Link>
              <span>/</span>
              <span className="text-amber-500 font-bold">{documentNumber}</span>
            </div>

            {/* Document Title & Category */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  {category}
                </span>
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                  VERSIUNE: {version}
                </span>
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                  ACTUALIZAT: {lastUpdated}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[var(--color-text-primary)] tracking-tight">
                {titleRo}
              </h1>
              <p className="text-sm font-mono text-[var(--color-text-muted)] uppercase tracking-wide">
                {titleEn}
              </p>
            </div>

            {/* Regulatory Notice & Scope */}
            <div className="p-4 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] leading-relaxed space-y-2 font-mono">
              <div className="flex items-center gap-2 text-amber-500 font-bold text-[11px]">
                <span>ℹ NOTĂ DE CONFORMITATE & CADRU JURIDIC</span>
              </div>
              <p className="font-sans text-xs">
                Prezentul document guvernează termenii de utilizare și raporturile contractuale în conformitate cu legislația din România și a Uniunii Europene. Documentul face parte integrantă din arhitectura de conformitate a platformei AIR.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <section className="w-full py-16">
        <Container size="wide">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Optional Table of Contents for Long Documents */}
            {tableOfContents && tableOfContents.length > 0 && (
              <aside className="lg:col-span-4 hidden lg:block">
                <div className="sticky top-28 p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase block">
                    CUPRINS DOCUMENT
                  </span>
                  <nav className="space-y-2 text-xs">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition py-1 border-l-2 border-transparent hover:border-amber-500 pl-3 -ml-3"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>

                  <div className="pt-4 border-t border-[var(--color-border)] text-[11px] font-mono text-[var(--color-text-muted)]">
                    <Link href="/legal" className="text-amber-500 hover:underline">
                      ← Toate Documentele Juridice
                    </Link>
                  </div>
                </div>
              </aside>
            )}

            {/* Document Body */}
            <main
              className={`${
                tableOfContents && tableOfContents.length > 0 ? "lg:col-span-8" : "lg:col-span-12"
              } space-y-12 leading-relaxed text-[var(--color-text-secondary)]`}
            >
              {children}

              {/* Lawyer Advisory Disclaimer */}
              <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-[var(--color-text-muted)] space-y-2 mt-16 font-mono">
                <div className="font-bold text-amber-500 uppercase text-[11px]">
                  DECLINARE ASISTENȚĂ JURIDICĂ (LEGAL ADVICE DISCLAIMER)
                </div>
                <p className="font-sans text-xs leading-relaxed">
                  Informațiile cuprinse în prezentul document sunt furnizate în scop de transparență informațională și contractuală. Acest conținut nu constituie consultanță juridică personalizată. Înainte de lansarea comercială sau contractarea de operațiuni speciale, documentele sunt supuse reviziei finale de către avocați autorizați Baroul București / Uniunea Națională a Barourilor din România (UNBR).
                </p>
              </div>

              {/* Back to Legal Hub Navigation */}
              <div className="pt-8 border-t border-[var(--color-border)] flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
                <Link
                  href="/legal"
                  className="text-amber-500 hover:text-amber-400 flex items-center gap-1 font-bold"
                >
                  ← Înapoi la Centrul Juridic AIR
                </Link>
                <span className="text-[var(--color-text-muted)]">
                  Versiune Curentă: {version}
                </span>
              </div>
            </main>
          </div>
        </Container>
      </section>
    </div>
  );
}
