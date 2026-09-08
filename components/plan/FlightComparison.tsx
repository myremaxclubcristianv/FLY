import React from "react";
import { FlightOption } from "../../types/domain";
import { FlightOptionCard } from "./FlightOptionCard";

export interface FlightComparisonProps {
  options: FlightOption[];
  selectedOptionId?: string;
  onSelectOption: (option: FlightOption) => void;
}

export function FlightComparison({
  options,
  selectedOptionId,
  onSelectOption,
}: FlightComparisonProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
          AIR DECISION ENGINE // EVALUATION COMPARISON
        </span>
        <h3 className="text-2xl font-light text-[var(--color-text-primary)]">
          COMPARED MISSION VEHICLES
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Select an option below to request a verified operator quote. All options carry explicit data provenance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((opt) => (
          <FlightOptionCard
            key={opt.id}
            option={opt}
            isSelected={selectedOptionId === opt.id}
            onSelect={() => onSelectOption(opt)}
          />
        ))}
      </div>
    </div>
  );
}
