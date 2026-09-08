import React from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export interface StepWhenProps {
  date: string;
  time: string;
  onChangeDate: (val: string) => void;
  onChangeTime: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepWhen({
  date,
  time,
  onChangeDate,
  onChangeTime,
  onNext,
  onBack,
}: StepWhenProps) {
  const [error, setError] = React.useState<string | null>(null);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setError("Please select a target flight date.");
      return;
    }
    setError(null);
    onNext();
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-data text-[var(--color-accent)] uppercase">
          STEP 02 // SCHEDULE
        </span>
        <h2 className="text-3xl font-light text-[var(--color-text-primary)]">
          WHEN DO YOU NEED TO FLY?
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Select target date and optional preferred departure hour.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="DATE // DEPARTURE"
          type="date"
          value={date}
          onChange={(e) => onChangeDate(e.target.value)}
          error={error || undefined}
          required
        />
        <Input
          label="PREFERRED TIME // OPTIONAL"
          type="time"
          value={time}
          onChange={(e) => onChangeTime(e.target.value)}
          helperText="Leave empty for flexible daytime departure."
        />
      </div>

      <div className="pt-4 flex items-center justify-between">
        <Button type="button" variant="outline" size="md" onClick={onBack}>
          ← BACK
        </Button>
        <Button type="submit" variant="primary" size="lg">
          CONTINUE TO PASSENGERS →
        </Button>
      </div>
    </form>
  );
}
