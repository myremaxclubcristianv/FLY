import React from "react";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { ProvenanceBadge } from "../../components/shared/ProvenanceBadge";
import { Card } from "../../components/ui/Card";
import { quoteService } from "../../lib/services/quote-service";
import { UnifiedAviationRepository } from "../../lib/repositories/unified-aviation-repo";

export const metadata = {
  title: "AIR Data Audit & Verification Portal | Admin Infrastructure",
  description: "Internal data provenance verification queue, operator registry review, and quote request lifecycle management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const quoteRequests = await quoteService.getAllQuoteRequests();
  const airports = await UnifiedAviationRepository.getAirports();
  const companies = await UnifiedAviationRepository.getCompanies();
  const aircraft = await UnifiedAviationRepository.getAircraftModels();
  const routes = await UnifiedAviationRepository.getRoutes();
  const journal = await UnifiedAviationRepository.getJournalArticles();
  const regions = await UnifiedAviationRepository.getAerialRegions();

  const baneasa = await UnifiedAviationRepository.getBaneasaAirport();
  const isBaneasaCorrect = baneasa.icao === "LRBS" && baneasa.iata === "BBU";

  const auditItems = [
    { label: "VERIFIED AIRPORTS & HELIPORTS", count: airports.length, code: "AIRPORTS // AACR/AIP", color: "text-emerald-400" },
    { label: "VERIFIED AVIATION COMPANIES", count: companies.length, code: "COMPANIES // AACR", color: "text-emerald-400" },
    { label: "AIRCRAFT MODELS IN CATALOG", count: aircraft.length, code: "AIRCRAFT // SPECS", color: "text-emerald-400" },
    { label: "ROUTE INTELLIGENCE PROFILES", count: routes.length, code: "ROUTES // AIR CALCULATED", color: "text-sky-400" },
    { label: "JOURNAL ARTICLES PUBLISHED", count: journal.length, code: "JOURNAL // ARTICLES", color: "text-purple-400" },
    { label: "AERIAL REGIONS DISCOVERED", count: regions.length, code: "ROMANIA // FROM ABOVE", color: "text-amber-400" },
  ];

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                INTERNAL DATA AUDIT // PHASE 4B MASTER PLATFORM AUDIT
              </span>
              <ProvenanceBadge status="OFFICIAL_SOURCE" />
            </div>

            <SectionHeader
              title="AVIATION DATA PROVENANCE AUDIT."
              description="Real-time monitoring of verified entities, AACR/EASA source attributions, quote requests, and data freshness."
              titleAs="h1"
            />
          </div>

          {/* Băneasa Identifier Health Check */}
          <Card variant="surface" className={`p-6 border-l-4 ${isBaneasaCorrect ? "border-l-emerald-500" : "border-l-rose-500"} flex flex-col gap-2`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-data text-[var(--color-text-primary)]">BĂNEASA IDENTIFIER FORENSIC STATUS</span>
              <span className={`text-xs font-data px-2 py-0.5 rounded ${isBaneasaCorrect ? "bg-emerald-950/40 text-emerald-300 border border-emerald-800" : "bg-rose-950 text-rose-300"}`}>
                {isBaneasaCorrect ? "PASS // LRBS / BBU VERIFIED" : "FAIL // INVALID IDENTIFIER"}
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] font-sans">
              Băneasa Aurel Vlaicu International Airport is strictly identified as ICAO: <strong>LRBS</strong> | IATA: <strong>BBU</strong>. Otopeni (LROP / OTP) is treated as a separate airport entity.
            </p>
          </Card>

          {/* Data Audit Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditItems.map((item) => (
              <Card key={item.label} variant="surface" className="flex flex-col gap-3 p-6 border-l-4 border-l-[var(--color-accent)]">
                <span className="text-[10px] font-data text-[var(--color-text-muted)] uppercase">{item.code}</span>
                <span className={`text-4xl font-light font-data ${item.color}`}>{item.count}</span>
                <span className="text-xs text-[var(--color-text-primary)] font-data tracking-wider uppercase">{item.label}</span>
              </Card>
            ))}
          </div>

          {/* Active Quote Requests Table */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
              <h2 className="text-xl font-light text-[var(--color-text-primary)]">
                ACTIVE QUOTE REQUESTS QUEUE
              </h2>
              <span className="text-xs font-data text-[var(--color-text-muted)]">
                {quoteRequests.length} REQUESTS LOGGED
              </span>
            </div>

            <div className="w-full overflow-x-auto bg-[var(--color-surface)] border border-[var(--color-border)]">
              <table className="w-full text-left text-xs font-data">
                <thead className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
                  <tr>
                    <th className="p-4 font-normal">REQUEST ID</th>
                    <th className="p-4 font-normal">CUSTOMER</th>
                    <th className="p-4 font-normal">STATUS</th>
                    <th className="p-4 font-normal">REQUESTED AT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-subtle)] text-[var(--color-text-secondary)]">
                  {quoteRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-[var(--color-bg-primary)] transition-colors">
                      <td className="p-4 text-[var(--color-text-primary)]">{req.id}</td>
                      <td className="p-4">{req.customerName} ({req.customerEmail})</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 border border-[var(--color-accent-muted)] text-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)]">
                          {req.status}
                        </span>
                      </td>
                      <td className="p-4 text-[var(--color-text-muted)]">{new Date(req.requestedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
