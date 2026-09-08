import React from "react";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { verificationAuditService } from "../../../lib/services/verification-service";

export const metadata = {
  title: "AIR Verification Audit Queue | Internal Operations",
  description: "Internal verification audit trail, operator identity checks, and data status provenance reviews.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminVerificationPage() {
  const queue = await verificationAuditService.getPendingQueue();

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                ADMIN INFRASTRUCTURE // VERIFICATION QUEUE
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <SectionHeader
              title="SUPPLY VERIFICATION & PROVENANCE AUDIT."
              description="Review operator legal identities, aircraft performance benchmarks, and source provenance logs before publishing verified status."
              titleAs="h1"
            />
          </div>

          {/* Verification Queue Table */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
              <h2 className="text-xl font-light text-[var(--color-text-primary)]">
                VERIFICATION AUDIT QUEUE
              </h2>
              <span className="text-xs font-data text-[var(--color-text-muted)]">
                {queue.length} RECORDS IN QUEUE
              </span>
            </div>

            <div className="w-full overflow-x-auto bg-[var(--color-surface)] border border-[var(--color-border)]">
              <table className="w-full text-left text-xs font-data">
                <thead className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
                  <tr>
                    <th className="p-4 font-normal">RECORD ID</th>
                    <th className="p-4 font-normal">ENTITY TYPE</th>
                    <th className="p-4 font-normal">ENTITY NAME</th>
                    <th className="p-4 font-normal">VERIFICATION TYPE</th>
                    <th className="p-4 font-normal">STATUS</th>
                    <th className="p-4 font-normal">VERIFIED BY</th>
                    <th className="p-4 font-normal">TIMESTAMP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-subtle)] text-[var(--color-text-secondary)]">
                  {queue.map((item) => (
                    <tr key={item.id} className="hover:bg-[var(--color-bg-primary)] transition-colors">
                      <td className="p-4 text-[var(--color-text-primary)]">{item.id}</td>
                      <td className="p-4">{item.entityType}</td>
                      <td className="p-4 font-medium text-[var(--color-text-primary)]">{item.entityName}</td>
                      <td className="p-4">{item.verificationType}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 border border-[var(--color-accent-muted)] text-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)]">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-[var(--color-text-muted)]">{item.verifiedBy || "SYSTEM"}</td>
                      <td className="p-4 text-[var(--color-text-muted)]">{new Date(item.verifiedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
            <Link href="/admin">
              <span className="text-xs font-data text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                ← RETURN TO ADMIN CRM OVERVIEW
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
