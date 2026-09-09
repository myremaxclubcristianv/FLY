import React from "react";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { verificationAuditService } from "../../../lib/services/verification-service";

export const metadata = {
  title: "AIR Verification Audit & Freshness Engine | Admin",
  description: "Internal verification audit trail, operator identity checks, freshness status badges, and data provenance reviews.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminVerificationPage() {
  const queue = await verificationAuditService.getPendingQueue();

  const freshnessSummary = [
    { label: "GREEN (Recent Verified)", count: 34, color: "bg-green-500/10 text-green-400 border-green-500/30" },
    { label: "AMBER (Aging Data)", count: 8, color: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
    { label: "RED (Stale / Review Required)", count: 2, color: "bg-red-500/10 text-red-400 border-red-500/30" },
  ];

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="flex flex-col gap-12 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                ADMIN INFRASTRUCTURE // VERIFICATION & FRESHNESS ENGINE
              </span>
              <DataStatusBadge status="VERIFIED" />
            </div>

            <SectionHeader
              title="SUPPLY VERIFICATION & FRESHNESS AUDIT."
              description="Monitor operational data freshness rules across aircraft models, operator AOCs, tail numbers, and airport handling status."
              titleAs="h1"
            />
          </div>

          {/* Freshness Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {freshnessSummary.map((item, i) => (
              <div key={i} className={`p-6 rounded-xl border ${item.color} flex flex-col justify-between`}>
                <span className="text-xs font-mono font-bold uppercase">{item.label}</span>
                <span className="text-3xl font-light font-mono mt-2">{item.count} Records</span>
              </div>
            ))}
          </div>

          {/* Verification Queue Table */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
              <h2 className="text-xl font-light text-[var(--color-text-primary)]">
                PROVENANCE & VERIFICATION AUDIT QUEUE
              </h2>
              <span className="text-xs font-data text-[var(--color-text-muted)] font-mono">
                {queue.length} ACTIVE AUDIT LOGS
              </span>
            </div>

            <div className="w-full overflow-x-auto bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
              <table className="w-full text-left text-xs font-data">
                <thead className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] text-[var(--color-text-muted)] uppercase">
                  <tr>
                    <th className="p-4 font-normal">Record ID</th>
                    <th className="p-4 font-normal">Entity Type</th>
                    <th className="p-4 font-normal">Entity Name</th>
                    <th className="p-4 font-normal">Verification Type</th>
                    <th className="p-4 font-normal">Status</th>
                    <th className="p-4 font-normal">Freshness</th>
                    <th className="p-4 font-normal">Verified By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-subtle)] text-[var(--color-text-secondary)] font-mono">
                  {queue.map((item) => (
                    <tr key={item.id} className="hover:bg-[var(--color-bg-primary)] transition-colors">
                      <td className="p-4 text-[var(--color-text-primary)]">{item.id}</td>
                      <td className="p-4">{item.entityType}</td>
                      <td className="p-4 font-medium text-white">{item.entityName}</td>
                      <td className="p-4">{item.verificationType}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 border border-amber-500/30 text-amber-300 bg-amber-500/10 rounded">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 border border-green-500/30 text-green-400 bg-green-500/10 rounded">
                          FRESH (GREEN)
                        </span>
                      </td>
                      <td className="p-4 text-[var(--color-text-muted)]">{item.verifiedBy || "AACR / OFFICIAL"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
            <Link href="/admin">
              <span className="text-xs font-data text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                ← RETURN TO ADMIN OVERVIEW
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
