import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export interface StepContactProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  onChangeName: (val: string) => void;
  onChangeEmail: (val: string) => void;
  onChangePhone: (val: string) => void;
  onChangeMessage: (val: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function StepContact({
  name,
  email,
  phone,
  message,
  onChangeName,
  onChangeEmail,
  onChangePhone,
  onChangeMessage,
  onSubmit,
  onBack,
}: StepContactProps) {
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; email?: string } = {};

    if (!name.trim()) errs.name = "Please enter your full name.";
    if (!email.trim() || !email.includes("@")) {
      errs.email = "Please enter a valid contact email address.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-data text-[var(--color-accent)] uppercase">
          STEP 05 // CONTACT & REQUEST
        </span>
        <h2 className="text-3xl font-light text-[var(--color-text-primary)]">
          WHERE SHOULD WE SEND YOUR DECISION PROPOSAL?
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Provide your contact details. AIR compiles your mission profile into an indicative decision summary.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="FULL NAME // CONTACT"
          placeholder="e.g. Alexander Vance"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          error={errors.name}
          required
        />
        <Input
          label="EMAIL ADDRESS"
          type="email"
          placeholder="e.g. alexander@company.com"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          error={errors.email}
          required
        />
        <Input
          label="PHONE NUMBER // OPTIONAL"
          type="tel"
          placeholder="e.g. +40 700 000 000"
          value={phone}
          onChange={(e) => onChangePhone(e.target.value)}
        />
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[11px] font-data text-[var(--color-text-secondary)] tracking-wider">
            MISSION NOTES // OPTIONAL
          </label>
          <textarea
            rows={3}
            className="w-full bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border)] p-3 text-sm focus:border-[var(--color-accent)] focus:outline-none placeholder:text-[var(--color-text-muted)] resize-none font-sans"
            placeholder="Luggage requirements, pet on board, ground transport preference..."
            value={message}
            onChange={(e) => onChangeMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <Button type="button" variant="outline" size="md" onClick={onBack}>
          ← BACK
        </Button>
        <Button type="submit" variant="primary" size="lg">
          GENERATE FLIGHT DECISION PROPOSAL
        </Button>
      </div>
    </form>
  );
}
