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

const QUICK_NODES = [
  { label: "Băneasa (LRBS)", origin: "Bucharest Băneasa (LRBS)", dest: "Nice Côte d'Azur (LFMN)" },
  { label: "Nice (LFMN)", origin: "Nice Côte d'Azur (LFMN)", dest: "Bucharest Băneasa (LRBS)" },
  { label: "Mamaia Heliport", origin: "Bucharest Băneasa (LRBS)", dest: "Mamaia Beach Heliport" },
  { label: "Bran Castle Pad", origin: "Bucharest Băneasa (LRBS)", dest: "Bran Castle Helipad" },
  { label: "London (EGLF)", origin: "Bucharest Băneasa (LRBS)", dest: "London Farnborough (EGLF)" },
  { label: "Geneva (LSGG)", origin: "Bucharest Băneasa (LRBS)", dest: "Geneva Cointrin (LSGG)" },
];

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

  const handleApplyNode = (nodeOrigin: string, nodeDest: string) => {
    onChangeFrom(nodeOrigin);
    onChangeTo(nodeDest);
    setError({});
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
          STEP 01 // ROUTE & VECTOR
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-[var(--color-text-primary)]">
          WHERE ARE YOU GOING?
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
          Enter any city, airport code, private aerodrome, or remote landing pad. You do not need to know whether you need a jet, turboprop, or helicopter — AIR will determine the optimal flight solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="FROM // DEPARTURE POINT"
          placeholder="e.g. Bucharest Băneasa (LRBS), London, Zurich"
          value={from}
          onChange={(e) => onChangeFrom(e.target.value)}
          error={error.from}
          required
        />
        <Input
          label="TO // TARGET DESTINATION"
          placeholder="e.g. Nice (LFMN), Bran Castle Pad, Mamaia, Geneva"
          value={to}
          onChange={(e) => onChangeTo(e.target.value)}
          error={error.to}
          required
        />
      </div>

      {/* Quick Select Frequent Corridors */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[10px] font-data text-[var(--color-text-muted)] uppercase tracking-wider">
          FREQUENT EXECUTIVE CORRIDORS & HELIPADS
        </span>
        <div className="flex flex-wrap gap-2">
          {QUICK_NODES.map((node, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleApplyNode(node.origin, node.dest)}
              className="text-xs font-data px-3 py-1.5 rounded-lg bg-[var(--color-surface)] hover:bg-neutral-800 border border-[var(--color-border)] hover:border-amber-400/40 text-[var(--color-text-secondary)] hover:text-white transition"
            >
              {node.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" variant="primary" size="lg">
          CONTINUE TO FLIGHT SCHEDULE →
        </Button>
      </div>
    </form>
  );
}
