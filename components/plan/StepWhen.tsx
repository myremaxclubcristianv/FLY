import React from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { TripType, DateFlexibility } from "../../types/flight-request";
import { cn } from "../../lib/utils";

export interface StepWhenProps {
  tripType: TripType;
  date: string;
  returnDate: string;
  time: string;
  dateFlexibility: DateFlexibility;
  onChangeTripType: (val: TripType) => void;
  onChangeDate: (val: string) => void;
  onChangeReturnDate: (val: string) => void;
  onChangeTime: (val: string) => void;
  onChangeDateFlexibility: (val: DateFlexibility) => void;
  onNext: () => void;
  onBack: () => void;
}

const FLEXIBILITY_OPTIONS: { id: DateFlexibility; label: string }[] = [
  { id: "EXACT", label: "EXACT DATE ONLY" },
  { id: "PLUS_MINUS_1_DAY", label: "± 1 DAY FLEXIBLE" },
  { id: "PLUS_MINUS_3_DAYS", label: "± 3 DAYS FLEXIBLE" },
  { id: "FLEXIBLE_MONTH", label: "FLEXIBLE MONTH WINDOW" },
];

export function StepWhen({
  tripType,
  date,
  returnDate,
  time,
  dateFlexibility,
  onChangeTripType,
  onChangeDate,
  onChangeReturnDate,
  onChangeTime,
  onChangeDateFlexibility,
  onNext,
  onBack,
}: StepWhenProps) {
  const [error, setError] = React.useState<string | null>(null);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setError("Please select a target flight departure date.");
      return;
    }
    if (tripType === "ROUND_TRIP" && !returnDate) {
      setError("Please select a return flight date for your round trip.");
      return;
    }
    setError(null);
    onNext();
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
          STEP 02 // TIMING & FLEXIBILITY
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-[var(--color-text-primary)]">
          WHEN DO YOU NEED TO FLY?
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
          Specify your departure schedule, round-trip requirements, and date flexibility. Flexibility allows AIR to check positioned aircraft and reduce positioning costs.
        </p>
      </div>

      {/* Trip Type Selector */}
      <div className="flex gap-4 p-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl max-w-sm">
        <button
          type="button"
          onClick={() => onChangeTripType("ONE_WAY")}
          className={cn(
            "flex-1 py-2 text-xs font-data uppercase tracking-wider rounded-lg transition-all",
            tripType === "ONE_WAY"
              ? "bg-[var(--color-accent)] text-black font-bold shadow-md"
              : "text-[var(--color-text-secondary)] hover:text-white"
          )}
        >
          ONE-WAY
        </button>
        <button
          type="button"
          onClick={() => onChangeTripType("ROUND_TRIP")}
          className={cn(
            "flex-1 py-2 text-xs font-data uppercase tracking-wider rounded-lg transition-all",
            tripType === "ROUND_TRIP"
              ? "bg-[var(--color-accent)] text-black font-bold shadow-md"
              : "text-[var(--color-text-secondary)] hover:text-white"
          )}
        >
          ROUND-TRIP
        </button>
      </div>

      {/* Date & Time Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="DEPARTURE DATE"
          type="date"
          value={date}
          onChange={(e) => onChangeDate(e.target.value)}
          error={error || undefined}
          required
        />

        {tripType === "ROUND_TRIP" ? (
          <Input
            label="RETURN DATE"
            type="date"
            value={returnDate}
            onChange={(e) => onChangeReturnDate(e.target.value)}
            required
          />
        ) : (
          <Input
            label="PREFERRED DEPARTURE TIME // OPTIONAL"
            type="time"
            value={time}
            onChange={(e) => onChangeTime(e.target.value)}
            helperText="Leave blank for flexible daytime dispatch."
          />
        )}
      </div>

      {/* Flexibility Radios */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-data text-[var(--color-text-muted)] uppercase tracking-wider">
          SCHEDULE FLEXIBILITY
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FLEXIBILITY_OPTIONS.map((opt) => {
            const isSelected = dateFlexibility === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => onChangeDateFlexibility(opt.id)}
                className={cn(
                  "p-3.5 rounded-xl border text-center cursor-pointer transition-all text-xs font-data uppercase",
                  isSelected
                    ? "bg-amber-500/10 border-amber-400 text-amber-400 font-semibold ring-1 ring-amber-400/40"
                    : "glass-surface border-white/10 text-[var(--color-text-secondary)] hover:text-white hover:border-white/20"
                )}
              >
                {opt.label}
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
          CONTINUE TO PASSENGERS & MISSION →
        </Button>
      </div>
    </form>
  );
}
