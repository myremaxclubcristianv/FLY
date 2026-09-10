"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FlightMission, FlightOption, QuoteRequest, MissionPriority } from "../../types/domain";
import { missionService } from "../../lib/services/mission-service";
import { quoteService } from "../../lib/services/quote-service";
import { StepWhere } from "./StepWhere";
import { StepWhen } from "./StepWhen";
import { StepWho } from "./StepWho";
import { StepPriority } from "./StepPriority";
import { StepContact } from "./StepContact";
import { FlightComparison } from "./FlightComparison";
import { PlannerConfirmation } from "./PlannerConfirmation";
import { cn } from "../../lib/utils";

function PlannerStepsContent() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState<number>(1);
  const [from, setFrom] = useState(searchParams.get("from") || "Bucharest");
  const [to, setTo] = useState(searchParams.get("to") || "Bran");
  const [date, setDate] = useState(searchParams.get("date") || "2026-09-12");
  const [time, setTime] = useState(searchParams.get("time") || "09:00");
  const [passengers, setPassengers] = useState<number>(
    parseInt(searchParams.get("passengers") || "4", 10) || 4
  );
  const [priority, setPriority] = useState<MissionPriority>(
    (searchParams.get("priority") as MissionPriority) || "FASTEST"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [mission, setMission] = useState<FlightMission | null>(null);
  const [options, setOptions] = useState<FlightOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<FlightOption | null>(null);
  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest | null>(null);

  useEffect(() => {
    if (searchParams.has("from")) setFrom(searchParams.get("from")!);
    if (searchParams.has("to")) setTo(searchParams.get("to")!);
    if (searchParams.has("date")) setDate(searchParams.get("date")!);
    if (searchParams.has("time")) setTime(searchParams.get("time")!);
  }, [searchParams]);

  // When step reaches step 5 (comparison / evaluation), generate mission options
  const handleProceedToComparison = async () => {
    const newMission = await missionService.createMission({
      origin: from,
      destination: to,
      date,
      preferredTime: time,
      passengers,
      priority,
      notes: message,
    });
    const computedOptions = await missionService.getOptionsForMission(newMission);
    setMission(newMission);
    setOptions(computedOptions);
    setSelectedOption(computedOptions[0] || null);
    setStep(5); // Comparison step
  };

  const handleSelectOption = (opt: FlightOption) => {
    setSelectedOption(opt);
  };

  const handleSubmitQuoteRequest = async () => {
    if (!mission || !selectedOption) return;

    const qReq = await quoteService.createQuoteRequest({
      missionId: mission.id,
      optionId: selectedOption.id,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      notes: message,
    });

    setQuoteRequest(qReq);
    setStep(7); // Confirmation
  };

  const stepsList = [
    { num: 1, label: "WHERE" },
    { num: 2, label: "WHEN" },
    { num: 3, label: "WHO" },
    { num: 4, label: "PRIORITY" },
    { num: 5, label: "COMPARE" },
    { num: 6, label: "CONTACT" },
  ];

  const handleReset = () => {
    setStep(1);
    setMission(null);
    setOptions([]);
    setSelectedOption(null);
    setQuoteRequest(null);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Editorial Progress Header Indicator */}
      {step < 7 && (
        <div className="w-full glass-instrument p-5 sm:p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-data">
            <span className="text-[var(--color-accent)] font-semibold flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              MISSION DISPATCH // STEP 0{step} OF 06
            </span>
            <span className="text-[var(--color-text-secondary)] font-medium tracking-wider">
              {stepsList[step - 1]?.label}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-2 w-full">
            {stepsList.map((s) => (
              <div
                key={s.num}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  step >= s.num
                    ? "bg-[var(--color-accent)] shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    : "bg-white/5"
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step Render Area */}
      <div className="w-full glass-elevated rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {step === 1 && (
          <StepWhere
            from={from}
            to={to}
            onChangeFrom={setFrom}
            onChangeTo={setTo}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <StepWhen
            date={date}
            time={time}
            onChangeDate={setDate}
            onChangeTime={setTime}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <StepWho
            passengers={passengers}
            onChangePassengers={setPassengers}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <StepPriority
            priority={priority}
            onChangePriority={setPriority}
            onNext={handleProceedToComparison}
            onBack={() => setStep(3)}
          />
        )}

        {step === 5 && (
          <div className="flex flex-col gap-8">
            <FlightComparison
              options={options}
              selectedOptionId={selectedOption?.id}
              onSelectOption={handleSelectOption}
            />
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="text-xs font-data text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                ← BACK TO MISSION PRIORITY
              </button>
              <button
                type="button"
                onClick={() => setStep(6)}
                className="px-6 py-3 bg-[var(--color-accent)] text-black font-data text-xs uppercase font-bold rounded-xl hover:bg-amber-400 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              >
                PROCEED TO QUOTE DETAILS →
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <StepContact
            name={name}
            email={email}
            phone={phone}
            message={message}
            onChangeName={setName}
            onChangeEmail={setEmail}
            onChangePhone={setPhone}
            onChangeMessage={setMessage}
            onSubmit={handleSubmitQuoteRequest}
            onBack={() => setStep(5)}
          />
        )}

        {step === 7 && mission && selectedOption && quoteRequest && (
          <PlannerConfirmation
            mission={mission}
            selectedOption={selectedOption}
            quoteRequest={quoteRequest}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}

export function PlannerSteps() {
  return (
    <Suspense
      fallback={
        <div className="w-full p-12 text-center text-xs font-data text-[var(--color-text-muted)] border border-[var(--color-border)]">
          LOADING DECISION ENGINE PARAMETERS...
        </div>
      }
    >
      <PlannerStepsContent />
    </Suspense>
  );
}
