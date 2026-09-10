import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { LEGAL_CONFIG } from "@/lib/config/legal";

export const metadata: Metadata = {
  title: "Centru Juridic & Conformitate — AIR",
  description:
    "Portalul oficial de transparență juridică, termeni contractuali, confidențialitate GDPR, declinări aeronautice și conformitate operațională AIR.",
};

export default function LegalCenterPage() {
  const documents = LEGAL_CONFIG.documents;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans antialiased selection:bg-amber-400 selection:text-neutral-950">
      {/* Hero Header */}
      <section className="w-full pt-32 pb-20 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/60">
        <Container size="wide">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                GUVERNANȚĂ & TRANSPARENȚĂ
              </span>
              <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                VERSIUNE: {LEGAL_CONFIG.versioning.version}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[var(--color-text-primary)] tracking-tight">
              Centrul Juridic <span className="font-serif italic text-amber-500">AIR</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] font-light leading-relaxed max-w-3xl">
              Cadrul complet de guvernanță, transparență contractuală și conformitate aplicabil operațiunilor de conciergerie, căutare și decizie aeronautică privată.
            </p>

            {/* Crucial Non-Carrier Statutory Disclosure */}
            <div className="p-6 rounded-2xl bg-[var(--color-bg-primary)] border border-amber-500/30 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-wider">
                <span>⚠ STATUT JURIDIC & DISCLOSURE PRIVIND TRANSPORTUL AERIAN</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans">
                {LEGAL_CONFIG.carrierDisclosure}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Directory of Legal Documents */}
      <section className="w-full py-20">
        <Container size="wide">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--color-border)] pb-6">
              <div>
                <h2 className="text-2xl font-light text-[var(--color-text-primary)]">
                  Documente Juridice & Politici de Conformitate
                </h2>
                <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">
                  Selectați un document pentru consultarea termenilor compleți în limba română.
                </p>
              </div>
              <span className="text-xs font-mono text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                10 DOCUMENTE ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc, idx) => (
                <Link
                  key={doc.id}
                  href={doc.slug}
                  className="group p-8 rounded-3xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-amber-500/40 transition-all duration-200 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-500 tracking-wider">
                        DOC 0{idx + 1} {"//"} {doc.category}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] group-hover:text-amber-500 transition-colors font-mono">
                        Citește →
                      </span>
                    </div>

                    <h3 className="text-xl font-normal text-[var(--color-text-primary)] group-hover:text-amber-500 transition-colors">
                      {doc.titleRo}
                    </h3>
                    <p className="text-xs font-mono text-[var(--color-text-muted)]">
                      {doc.titleEn}
                    </p>

                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans pt-2">
                      {doc.summaryRo}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
                    <span>Versiunea {LEGAL_CONFIG.versioning.version}</span>
                    <span className="text-amber-500 font-semibold group-hover:underline">
                      Deschide documentul
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Corporate Entity Details & Competent Authorities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-[var(--color-border)]">
              {/* Entity Info Box */}
              <div className="p-8 rounded-3xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-4">
                <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block">
                  DATE DE IDENTIFICARE JURIDICĂ
                </span>
                <div className="space-y-2 text-xs font-mono text-[var(--color-text-secondary)]">
                  <div>
                    <span className="text-[var(--color-text-muted)] block text-[10px]">ENTITATE:</span>
                    <strong>{LEGAL_CONFIG.entity.legalName}</strong>
                  </div>
                  <div>
                    <span className="text-[var(--color-text-muted)] block text-[10px]">REGISTRUL COMERȚULUI:</span>
                    {LEGAL_CONFIG.entity.tradeRegisterNumber}
                  </div>
                  <div>
                    <span className="text-[var(--color-text-muted)] block text-[10px]">COD FISCAL / CUI:</span>
                    {LEGAL_CONFIG.entity.taxIdNumber}
                  </div>
                  <div>
                    <span className="text-[var(--color-text-muted)] block text-[10px]">SEDIUL SOCIAL:</span>
                    {LEGAL_CONFIG.entity.registeredOffice}
                  </div>
                  <div>
                    <span className="text-[var(--color-text-muted)] block text-[10px]">CONTACT LEGAL:</span>
                    <a href={`mailto:${LEGAL_CONFIG.entity.legalEmail}`} className="text-amber-500 hover:underline">
                      {LEGAL_CONFIG.entity.legalEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Authorities Box */}
              <div className="p-8 rounded-3xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-4">
                <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block">
                  AUTORITĂȚI COMPETENTE & SUPRAVEGHERE
                </span>
                <div className="space-y-3 text-xs text-[var(--color-text-secondary)] font-sans">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] block">
                      SUPRAVEGHERE PROTECȚIA DATELOR (GDPR):
                    </span>
                    <strong className="text-[var(--color-text-primary)]">
                      {LEGAL_CONFIG.regulatory.supervisoryAuthorityGdpr.name}
                    </strong>
                    <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                      {LEGAL_CONFIG.regulatory.supervisoryAuthorityGdpr.address} •{" "}
                      <a
                        href={LEGAL_CONFIG.regulatory.supervisoryAuthorityGdpr.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-500 hover:underline"
                      >
                        dataprotection.ro
                      </a>
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] block">
                      SUPRAVEGHERE AERONAUTICĂ:
                    </span>
                    <p className="text-xs">
                      {LEGAL_CONFIG.regulatory.aviationAuthority.name}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] block">
                      PROTECȚIA CONSUMATORILOR:
                    </span>
                    <p className="text-xs">
                      {LEGAL_CONFIG.regulatory.consumerProtectionAuthority.name} (Infocons: {LEGAL_CONFIG.regulatory.consumerProtectionAuthority.infocons}) •{" "}
                      <a
                        href={LEGAL_CONFIG.regulatory.consumerProtectionAuthority.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-500 hover:underline"
                      >
                        anpc.ro
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mandatory Lawyer Review Notice */}
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs font-mono text-[var(--color-text-muted)] space-y-1">
              <span className="text-amber-500 font-bold block">
                AVIZ JURIDIC PREALABIL // COMPLIANCE GOVERNANCE
              </span>
              <p className="font-sans text-xs">
                Toate politicile și termenii de mai sus reflectă arhitectura tehnică și operațională a platformei AIR la data de {LEGAL_CONFIG.versioning.effectiveDate}. Înainte de operarea de zboruri comerciale cu plată, documentele sunt auditate și validate final de avocați specializați în drept aeronautic și drept comercial din România și UE.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
