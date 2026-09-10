import React from "react";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { MissionPurpose, BudgetPreference } from "../../types/flight-request";
import { cn } from "../../lib/utils";

export interface StepWhoProps {
  passengers: number;
  purpose: MissionPurpose;
  budgetPreference: BudgetPreference;
  onChangePassengers: (val: number) => void;
  onChangePurpose: (val: MissionPurpose) => void;
  onChangeBudgetPreference: (val: BudgetPreference) => void;
  onNext: () => void;
  onBack: () => void;
}

const PURPOSES: { id: MissionPurpose; title: string; desc: string }[] = [
  {
    id: "EXECUTIVE_BUSINESS",
    title: "EXECUTIVE / BUSINESS",
    desc: "Board meetings, roadshows, quiet in-flight productivity, and direct private FBO ramp car dispatch.",
  },
  {
    id: "PRIVATE_LEISURE",
    title: "PRIVATE LEISURE & FAMILY",
    desc: "Holiday travel, private villas, relaxed cabin environment, and generous luggage capacity.",
  },
  {
    id: "MOUNTAIN_ALPINE",
    title: "MOUNTAIN / ALPINE HELIPAD",
    desc: "Direct mountain lodge access, ski resort transfers, and high-altitude landing clearances.",
  },
  {
    id: "TIME_CRITICAL",
    title: "TIME-CRITICAL VIP TRANSFER",
    desc: "Urgent transit, immediate dispatch window, highest available cruise mach speed.",
  },
  {
    id: "SPECIAL_CELEBRATION",
    title: "CELEBRATION / PROPOSAL",
    desc: "Estate arrivals, scenic aerial panoramic vectors, customized luxury onboard touches.",
  },
  {
    id: "MEDICAL_REPATRIATION",
    title: "MEDICAL / REPATRIATION",
    desc: "Patient escort, pressurized smooth altitude profiles, and airport ambulance ramp access.",
  },
];

const BUDGETS: { id: BudgetPreference; label: string; desc: string }[] = [
  { id: "VALUE_OPTIMIZED", label: "OPTIMIZED VALUE", desc: "Prioritize fuel burn & turboprop efficiency" },
  { id: "STANDARD_CHARTER", label: "STANDARD CHARTER", desc: "Balanced light/midsize jet market rates" },
  { id: "SUPERIOR_COMFORT", label: "SUPERIOR CABIN", desc: "Super-midsize stand-up room & flight hostess" },
  { id: "ULTRA_LONG_RANGE", label: "FLAGSHIP HEAVY", desc: "Transcontinental 3-zone luxury jets" },
  { id: "FLEXIBLE", label: "FLEXIBLE // ADVISOR GUIDED", desc: "Let AIR advise based on operational best fit" },
];

export function StepWho({
  passengers,
  purpose,
  budgetPreference,
  onChangePassengers,
  onChangePurpose,
  onChangeBudgetPreference,
  onNext,
  onBack,
}: StepWhoProps) {
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
          STEP 03 // MANIFEST & MISSION PROFILE
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-[var(--color-text-primary)]">
          WHO IS FLYING & WHAT IS THE PURPOSE?
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
          Passenger count and flight purpose help AIR determine cabin cross-section, baggage hold requirements, and whether rotary or fixed-wing is best suited.
        </p>
      </div>

      {/* Passenger Count Selector */}
      <div className="max-w-md">
        <Select
          label="TOTAL PASSENGERS"
          value={passengers.toString()}
          onChange={(e) => onChangePassengers(parseInt(e.target.value, 10))}
          options={[
            { value: "1", label: "1 PASSENGER (SOLO EXECUTIVE)" },
            { value: "2", label: "2 PASSENGERS (COUPLE / PARTNERS)" },
            { value: "3", label: "3 PASSENGERS" },
            { value: "4", label: "4 PASSENGERS (STANDARD LIGHT JET FIT)" },
            { value: "5", label: "5 PASSENGERS" },
            { value: "6", label: "6 PASSENGERS (LIGHT / MIDSIZE JET)" },
            { value: "7", label: "7 PASSENGERS" },
            { value: "8", label: "8 PASSENGERS (SUPER-MIDSIZE STAND-UP)" },
            { value: "10", label: "10 PASSENGERS (HEAVY JET DELEGATION)" },
            { value: "14", label: "14+ PASSENGERS (LARGE CABIN AIRLINER)" },
          ]}
        />
      </div>

      {/* Mission Purpose Grid */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-data text-[var(--color-text-muted)] uppercase tracking-wider">
          MISSION PURPOSE / NATURE OF FLIGHT
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {PURPOSES.map((p) => {
            const isSelected = purpose === p.id;
            return (
              <div
                key={p.id}
                onClick={() => onChangePurpose(p.id)}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 relative",
                  isSelected
                    ? "bg-amber-500/10 border-amber-400 text-white ring-1 ring-amber-400/50 shadow-md"
                    : "glass-surface border-white/10 hover:border-white/20 text-[var(--color-text-secondary)]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-data font-bold text-amber-400 uppercase tracking-wider">
                    {p.title}
                  </span>
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full border",
                      isSelected ? "border-amber-400 bg-amber-400" : "border-white/20"
                    )}
                  />
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Preference */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-data text-[var(--color-text-muted)] uppercase tracking-wider">
          BUDGET & CABIN TIER PREFERENCE
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {BUDGETS.map((b) => {
            const isSelected = budgetPreference === b.id;
            return (
              <div
                key={b.id}
                onClick={() => onChangeBudgetPreference(b.id)}
                className={cn(
                  "p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col gap-1 text-center",
                  isSelected
                    ? "bg-amber-500/10 border-amber-400 text-amber-400 font-semibold ring-1 ring-amber-400/40"
                    : "glass-surface border-white/10 text-[var(--color-text-secondary)] hover:text-white"
                )}
              >
                <span className="text-[11px] font-data font-bold uppercase">{b.label}</span>
                <span className="text-[9px] text-[var(--color-text-muted)]">{b.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <Button type="button" variant="outline" size="md" onClick={onBack}>
          ← BACK
        </Button>
        <Button type="submit" variant="primary" size="lg">
          CONTINUE TO PRIORITY & REQUIREMENTS →
        </Button>
      </div>
    </form>
  );
}
