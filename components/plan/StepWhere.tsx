import React from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export interface StepWhereProps {
  from: string;
  to: string;
  onChangeFrom: (val: string) => void;
  onChangeTo: (val: string) => void;
  onNext: () => void;
}

export function StepWhere({
  from,
  to,
  onChangeFrom,
  onChangeTo,
  onNext,
}: StepWhereProps) {
  const [error, setError] = React.useState<{ from?: string; to?: string }>({});

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { from?: string; to?: string } = {};
    if (!from.trim()) errs.from = "Please enter departure origin.";
    if (!to.trim()) errs.to = "Please enter target destination.";

    if (Object.keys(errs).length > 0) {
      setError(errs);
      return;
    }
    setError({});
    onNext();
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-data text-[var(--color-accent)] uppercase">
          STEP 01 // MISSION ROUTE
        </span>
        <h2 className="text-3xl font-light text-[var(--color-text-primary)]">
          WHERE ARE YOU GOING?
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Enter city names, airport codes, or regions. AIR will calculate optimal airfields and helipad access points.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="FROM // DEPARTURE ORIGIN"
          placeholder="e.g. Bucharest, OTP, Baneasa, Paris"
          value={from}
          onChange={(e) => onChangeFrom(e.target.value)}
          error={error.from}
          required
        />
        <Input
          label="TO // DESTINATION"
          placeholder="e.g. Bran, Brasov, Constanta, Transylvania"
          value={to}
          onChange={(e) => onChangeTo(e.target.value)}
          error={error.to}
          required
        />
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" variant="primary" size="lg">
          CONTINUE TO FLIGHT TIMING →
        </Button>
      </div>
    </form>
  );
}
