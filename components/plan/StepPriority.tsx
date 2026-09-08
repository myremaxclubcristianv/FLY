import React from "react";
import { FlightPriority } from "../../types/flight-request";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

export interface StepPriorityProps {
  priority: FlightPriority;
  onChangePriority: (val: FlightPriority) => void;
  onNext: () => void;
  onBack: () => void;
}

const PRIORITIES: {
  id: FlightPriority;
  title: string;
  code: string;
  description: string;
}[] = [
  {
    id: "FASTEST",
    title: "FASTEST FLIGHT",
    code: "PRIORITY // 01",
    description: "Minimizes door-to-destination time, prioritizing direct helipads and point-to-point speed.",
  },
  {
    id: "BEST_VALUE",
    title: "BEST VALUE",
    code: "PRIORITY // 02",
    description: "Optimizes fuel burn, turboprop efficiency, and regional airfield landings.",
  },
  {
    id: "MOST_COMFORTABLE",
    title: "MOST COMFORTABLE",
    code: "PRIORITY // 03",
    description: "Prioritizes cabin height, wide seating, quiet twin-engine turbofan noise levels.",
  },
  {
    id: "MOST_PRIVATE",
    title: "MOST PRIVATE",
    code: "PRIORITY // 04",
    description: "Emphasizes private FBO handling, direct ramp car access, and discreet terminal transfers.",
  },
  {
    id: "MOST_MEMORABLE",
    title: "MOST MEMORABLE",
    code: "PRIORITY // 05",
    description: "Curated aerial viewpoints over mountains, coastal bays, or estate arrivals.",
  },
];

export function StepPriority({
  priority,
  onChangePriority,
  onNext,
  onBack,
}: StepPriorityProps) {
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-data text-[var(--color-accent)] uppercase">
          STEP 04 // OBJECTIVE
        </span>
        <h2 className="text-3xl font-light text-[var(--color-text-primary)]">
          WHAT MATTERS MOST FOR THIS MISSION?
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          AIR balances vehicle performance envelope, ground transfer logistics, and cabin comfort against your core priority.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRIORITIES.map((p) => {
          const isSelected = priority === p.id;
          return (
            <div
              key={p.id}
              onClick={() => onChangePriority(p.id)}
              className={cn(
                "p-6 border transition-all duration-200 cursor-pointer flex flex-col gap-3 relative",
                isSelected
                  ? "bg-[var(--color-surface)] border-[var(--color-accent)]"
                  : "bg-[var(--color-bg-primary)] border-[var(--color-border)] hover:border-[var(--color-text-secondary)]"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-data text-[var(--color-accent)]">
                  {p.code}
                </span>
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                    isSelected
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                      : "border-[var(--color-border)]"
                  )}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-bg-primary)]" />
                  )}
                </div>
              </div>

              <h3 className="text-lg font-light text-[var(--color-text-primary)]">
                {p.title}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {p.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex items-center justify-between">
        <Button type="button" variant="outline" size="md" onClick={onBack}>
          ← BACK
        </Button>
        <Button type="submit" variant="primary" size="lg">
          CONTINUE TO CONTACT DETAILS →
        </Button>
      </div>
    </form>
  );
}
