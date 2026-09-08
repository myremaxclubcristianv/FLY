import React from "react";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";

export interface StepWhoProps {
  passengers: number;
  onChangePassengers: (val: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepWho({
  passengers,
  onChangePassengers,
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
        <span className="text-xs font-data text-[var(--color-accent)] uppercase">
          STEP 03 // MANIFEST
        </span>
        <h2 className="text-3xl font-light text-[var(--color-text-primary)]">
          WHO IS FLYING?
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Passenger count determines minimum seating capacity, cabin payload, and twin-engine helicopter or jet category sizing.
        </p>
      </div>

      <div className="max-w-md">
        <Select
          label="TOTAL PASSENGERS"
          value={passengers.toString()}
          onChange={(e) => onChangePassengers(parseInt(e.target.value, 10))}
          options={[
            { value: "1", label: "1 PASSENGER" },
            { value: "2", label: "2 PASSENGERS" },
            { value: "3", label: "3 PASSENGERS" },
            { value: "4", label: "4 PASSENGERS" },
            { value: "5", label: "5 PASSENGERS" },
            { value: "6", label: "6 PASSENGERS" },
            { value: "7", label: "7 PASSENGERS" },
            { value: "8", label: "8+ PASSENGERS (LARGE CABIN)" },
          ]}
        />
      </div>

      <div className="pt-4 flex items-center justify-between">
        <Button type="button" variant="outline" size="md" onClick={onBack}>
          ← BACK
        </Button>
        <Button type="submit" variant="primary" size="lg">
          CONTINUE TO PRIORITY →
        </Button>
      </div>
    </form>
  );
}
