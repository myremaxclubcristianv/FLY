import React from "react";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Card } from "../../components/ui/Card";
import { quoteService } from "../../lib/services/quote-service";

export const metadata = {
  title: "AIR Internal CRM & Supply Verification Portal | Admin Infrastructure",
  description: "Internal supply verification dashboard, operator registry review, and quote request lifecycle management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const quoteRequests = await quoteService.getAllQuoteRequests();

  const attentionItems = [
    { label: "VERIFICATION CHECKS PENDING", count: 12, code: "VERIFY // PENDING", color: "text-[var(--color-accent)]" },
    { label: "QUOTE REQUESTS AWAITING RESPONSE", count: quoteRequests.length + 3, code: "QUOTES // ACTIVE", color: "text-[#5a9e7c]" },
    { label: "STALE AIRCRAFT RECORDS", count: 3, code: "AIRCRAFT // STALE", color: "text-amber-400" },
    { label: "OPERATORS REREQUIRING REVIEW", count: 2, code: "OPERATORS // REVIEW", color: "text-blue-400" },
  ];

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                INTERNAL INFRASTRUCTURE // DEVELOPMENT CRM PORTAL
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <SectionHeader
              title="WHAT NEEDS ATTENTION?"
              description="Internal supply verification queue, quote request lifecycle monitoring, and operator provenance audit portal."
              titleAs="h1"
            />
          </div>

          {/* Attention Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {attentionItems.map((item) => (
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
                    <th className="p-4 font-normal">ACTION</th>
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
                      <td className="p-4">
                        <span className="text-[var(--color-accent)] hover:underline cursor-pointer">
                          REVIEW QUOTE →
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Development Boundary Disclaimer */}
          <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] leading-relaxed">
            <strong>DEVELOPMENT CRM NOTICE:</strong> This admin portal forms the internal data architecture for future operator verification and quote dispatch. It is isolated from public search indexing (`noindex`) and does not expose live customer PII.
          </div>
        </div>
      </Container>
    </div>
  );
}
