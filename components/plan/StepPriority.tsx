import React from "react";
import { FlightPriority, SpecialRequirement } from "../../types/flight-request";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

export interface StepPriorityProps {
  priority: FlightPriority;
  requirements: SpecialRequirement[];
  onChangePriority: (val: FlightPriority) => void;
  onToggleRequirement: (req: SpecialRequirement) => void;
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
    description: "Minimizes door-to-destination time, prioritizing high-speed cruise jets (450+ KTS) and direct helicopter vectors.",
  },
  {
    id: "BEST_VALUE",
    title: "BEST VALUE",
    code: "PRIORITY // 02",
    description: "Optimizes fuel burn economics, single/twin turboprop efficiency, and regional airfield access.",
  },
  {
    id: "MOST_COMFORTABLE",
    title: "MOST COMFORTABLE",
    code: "PRIORITY // 03",
    description: "Prioritizes stand-up cabin height, wide club seating, low cabin pressurization altitude, and quiet noise levels.",
  },
  {
    id: "MOST_PRIVATE",
    title: "MOST PRIVATE",
    code: "PRIORITY // 04",
    description: "Emphasizes private FBO lounges, discreet ramp car transfers directly to aircraft stairs, and zero public interaction.",
  },
  {
    id: "MOST_MEMORABLE",
    title: "MOST MEMORABLE",
    code: "PRIORITY // 05",
    description: "Curated panoramic flight paths over alpine passes, coastal bays, or dramatic estate helipad landings.",
  },
];

const SPECIAL_REQUIREMENTS: { id: SpecialRequirement; label: string; desc: string }[] = [
  { id: "HELIPAD_DIRECT", label: "HELIPAD DIRECT ARRIVAL", desc: "Land directly at private estate, hotel, or mountain pad" },
  { id: "PET_FRIENDLY", label: "PET IN CABIN", desc: "Accommodate pets in main passenger cabin" },
  { id: "SKI_BULKY_LUGGAGE", label: "SKI GEAR / BULKY LUGGAGE", desc: "Large cargo hold capacity for sporting gear" },
  { id: "WIFI_ONBOARD", label: "HIGH-SPEED WI-FI", desc: "In-flight satellite internet for productivity" },
  { id: "CABIN_HOSTESS", label: "FLIGHT ATTENDANT & HOT VIP CATERING", desc: "Dedicated in-flight hospitality and dining service" },
  { id: "VIP_TARMAC_TRANSFER", label: "DISCREET TARMAC LIMOUSINE", desc: "Direct ramp vehicle to plane stairs without terminal walk" },
];

export function StepPriority({
  priority,
  requirements,
  onChangePriority,
  onToggleRequirement,
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
        <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
          STEP 04 // PRIORITIES & BESPOKE REQUIREMENTS
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-[var(--color-text-primary)]">
          WHAT MATTERS MOST FOR THIS MISSION?
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
          AIR balances aircraft performance envelope, direct routing capabilities, and cabin comfort against your core objective.
        </p>
      </div>

      {/* Primary Priority Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRIORITIES.map((p) => {
          const isSelected = priority === p.id;
          return (
            <div
              key={p.id}
              onClick={() => onChangePriority(p.id)}
              className={cn(
                "p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col gap-3 relative",
                isSelected
                  ? "bg-amber-500/10 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/50"
                  : "glass-surface glass-surface-hover border-white/10"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-data text-amber-400 font-semibold tracking-wider">
                  {p.code}
                </span>
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                    isSelected ? "border-amber-400 bg-amber-400" : "border-white/20"
                  )}
                >
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                </div>
              </div>

              <h3 className="text-base font-light text-[var(--color-text-primary)]">
                {p.title}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {p.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Special Requirements Toggles */}
      <div className="flex flex-col gap-3 pt-2">
        <span className="text-xs font-data text-[var(--color-text-muted)] uppercase tracking-wider">
          OPTIONAL BESPOKE REQUIREMENTS
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SPECIAL_REQUIREMENTS.map((req) => {
            const isChecked = requirements.includes(req.id);
            return (
              <div
                key={req.id}
                onClick={() => onToggleRequirement(req.id)}
                className={cn(
                  "p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3",
                  isChecked
                    ? "bg-amber-500/10 border-amber-400/70 text-white"
                    : "glass-surface border-white/10 hover:border-white/20 text-[var(--color-text-secondary)]"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded mt-0.5 border flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors",
                    isChecked
                      ? "border-amber-400 bg-amber-400 text-black"
                      : "border-white/30 text-transparent"
                  )}
                >
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-data font-semibold text-white tracking-wide uppercase">
                    {req.label}
                  </h4>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                    {req.desc}
                  </p>
                </div>
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
          GENERATE AIR RECOMMENDATION →
        </Button>
      </div>
    </form>
  );
}
