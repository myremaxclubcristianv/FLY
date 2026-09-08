import React from "react";
import Link from "next/link";
import { FlightMission, FlightOption, QuoteRequest } from "../../types/domain";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export interface PlannerConfirmationProps {
  mission: FlightMission;
  selectedOption: FlightOption;
  quoteRequest: QuoteRequest;
  onReset: () => void;
}

export function PlannerConfirmation({
  mission,
  selectedOption,
  quoteRequest,
  onReset,
}: PlannerConfirmationProps) {
  const statusSteps = [
    { key: "REQUESTED", label: "01. REQUESTED" },
    { key: "UNDER_REVIEW", label: "02. UNDER REVIEW" },
    { key: "SENT", label: "03. SENT TO OPERATOR" },
    { key: "PRESENTED", label: "04. OPTION PRESENTED" },
  ];

  return (
    <div className="flex flex-col gap-10 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-data text-[var(--color-accent)] tracking-widest uppercase">
            QUOTE REQUEST // ID: {quoteRequest.id}
          </span>
          <DataStatusBadge status="REQUEST" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl sm:text-4xl font-light text-[var(--color-text-primary)]">
            AIR IS PREPARING YOUR FLIGHT OPTIONS<span className="text-[var(--color-accent)]">.</span>
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            Thank you, <strong className="text-[var(--color-text-primary)]">{quoteRequest.customerName}</strong>. Your flight mission request for <strong className="text-[var(--color-text-primary)]">{mission.origin} → {mission.destination}</strong> has been logged in Phase 2 CRM infrastructure.
          </p>
        </div>

        {/* Quote Lifecycle Progress Indicator */}
        <div className="pt-4 border-t border-[var(--color-border-subtle)] flex flex-col gap-3">
          <span className="text-[10px] font-data text-[var(--color-text-muted)] uppercase">
            OPERATOR QUOTE LIFECYCLE TRACKER
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {statusSteps.map((st) => (
              <div
                key={st.key}
                className={`p-3 border text-xs font-data text-center ${
                  quoteRequest.status === st.key || st.key === "REQUESTED" || st.key === "UNDER_REVIEW"
                    ? "bg-[var(--color-bg-primary)] border-[var(--color-accent)] text-[var(--color-accent)]"
                    : "bg-[var(--color-surface)] border-[var(--color-border-subtle)] text-[var(--color-text-muted)]"
                }`}
              >
                {st.label}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[var(--color-bg-primary)] border-l-2 border-[var(--color-accent)] text-xs text-[var(--color-text-muted)]">
          <strong>PHASE 2 ARCHITECTURE NOTICE:</strong> Your quote request has been processed locally using Phase 2 CRM services. No live payment or binding charter contract has been finalized.
        </div>
      </div>

      {/* Selected Option Summary */}
      <Card variant="surface" className="flex flex-col gap-6 p-8 border-2 border-[var(--color-accent-muted)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
          <div>
            <span className="text-[10px] font-data text-[var(--color-accent)] uppercase">
              SELECTED VEHICLE PROFILE
            </span>
            <h3 className="text-2xl font-light text-[var(--color-text-primary)]">
              {selectedOption.aircraftName}
            </h3>
          </div>
          <span className="text-xs font-data text-[var(--color-text-primary)] bg-[var(--color-bg-primary)] px-3 py-1.5 border border-[var(--color-border)]">
            ESTIMATED: {selectedOption.estimatedDuration}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-data text-[var(--color-text-secondary)]">
          <div>
            <span className="block text-[10px] text-[var(--color-text-muted)]">ORIGIN</span>
            <span className="text-[var(--color-text-primary)]">{mission.origin}</span>
          </div>
          <div>
            <span className="block text-[10px] text-[var(--color-text-muted)]">DESTINATION</span>
            <span className="text-[var(--color-text-primary)]">{mission.destination}</span>
          </div>
          <div>
            <span className="block text-[10px] text-[var(--color-text-muted)]">DATE</span>
            <span className="text-[var(--color-text-primary)]">{mission.date}</span>
          </div>
          <div>
            <span className="block text-[10px] text-[var(--color-text-muted)]">PASSENGERS</span>
            <span className="text-[var(--color-text-primary)]">{mission.passengers} PASSENGERS</span>
          </div>
        </div>

        <div className="p-4 bg-[var(--color-bg-primary)] text-xs text-[var(--color-text-secondary)] leading-relaxed">
          <span className="text-[10px] font-data text-[var(--color-accent)] block mb-1">
            WHY THIS FITS YOUR MISSION
          </span>
          {selectedOption.recommendationReason}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--color-border)]">
        <Button variant="outline" size="md" onClick={onReset}>
          PLAN ANOTHER MISSION
        </Button>
        <Link href="/">
          <Button variant="primary" size="md">
            RETURN TO AIR HOMEPAGE
          </Button>
        </Link>
      </div>
    </div>
  );
}
