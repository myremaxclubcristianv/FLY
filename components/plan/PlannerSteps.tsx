"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FlightMission, FlightOption, QuoteRequest, MissionPriority } from "../../types/domain";
import {
  TripType,
  DateFlexibility,
  BudgetPreference,
  MissionPurpose,
  SpecialRequirement,
} from "../../types/flight-request";
import { missionService } from "../../lib/services/mission-service";
import { quoteService } from "../../lib/services/quote-service";
import { missionRequestService } from "../../lib/services/mission-request-service";
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
  const [from, setFrom] = useState(searchParams.get("from") || "Bucharest Băneasa (LRBS)");
  const [to, setTo] = useState(searchParams.get("to") || "Nice Côte d'Azur (LFMN)");
  const [tripType, setTripType] = useState<TripType>("ONE_WAY");
  const [date, setDate] = useState(searchParams.get("date") || "2026-09-24");
  const [returnDate, setReturnDate] = useState("2026-09-28");
  const [time, setTime] = useState(searchParams.get("time") || "10:30");
  const [dateFlexibility, setDateFlexibility] = useState<DateFlexibility>("EXACT");
  const [passengers, setPassengers] = useState<number>(
    parseInt(searchParams.get("passengers") || "4", 10) || 4
  );
  const [purpose, setPurpose] = useState<MissionPurpose>("EXECUTIVE_BUSINESS");
  const [budgetPreference, setBudgetPreference] = useState<BudgetPreference>("STANDARD_CHARTER");
  const [priority, setPriority] = useState<MissionPriority>(
    (searchParams.get("priority") as MissionPriority) || "FASTEST"
  );
  const [requirements, setRequirements] = useState<SpecialRequirement[]>([]);
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
    if (searchParams.has("passengers")) {
      const p = parseInt(searchParams.get("passengers")!, 10);
      if (!isNaN(p)) setPassengers(p);
    }
  }, [searchParams]);

  const handleToggleRequirement = (req: SpecialRequirement) => {
    setRequirements((prev) =>
      prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
    );
  };

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

    // Register in client-side mission storage
    missionRequestService.createRequest({
      from,
      to,
      tripType,
      date,
      returnDate: tripType === "ROUND_TRIP" ? returnDate : undefined,
      time,
      dateFlexibility,
      passengers,
      budgetPreference,
      priority,
      purpose,
      requirements,
      name,
      email,
      phone,
      message,
      recommendedAircraft: selectedOption.aircraftName,
      recommendedCategory: selectedOption.aircraftCategory,
      estimatedFlightTime: selectedOption.estimatedDuration,
      recommendationReason: selectedOption.recommendationReason,
      constraints: ["Verified AOC operator dispatch", "Standard IFR/VFR minima"],
    });

    setQuoteRequest(qReq);
    setStep(7); // Confirmation
  };

  const stepsList = [
    { num: 1, label: "WHERE" },
    { num: 2, label: "WHEN" },
    { num: 3, label: "WHO & PURPOSE" },
    { num: 4, label: "PRIORITY" },
    { num: 5, label: "WAY TO FLY" },
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
            tripType={tripType}
            date={date}
            returnDate={returnDate}
            time={time}
            dateFlexibility={dateFlexibility}
            onChangeTripType={setTripType}
            onChangeDate={setDate}
            onChangeReturnDate={setReturnDate}
            onChangeTime={setTime}
            onChangeDateFlexibility={setDateFlexibility}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <StepWho
            passengers={passengers}
            purpose={purpose}
            budgetPreference={budgetPreference}
            onChangePassengers={setPassengers}
            onChangePurpose={setPurpose}
            onChangeBudgetPreference={setBudgetPreference}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <StepPriority
            priority={priority}
            requirements={requirements}
            onChangePriority={setPriority}
            onToggleRequirement={handleToggleRequirement}
            onNext={handleProceedToComparison}
            onBack={() => setStep(3)}
          />
        )}

        {step === 5 && (
          <FlightComparison
            options={options}
            selectedOptionId={selectedOption?.id}
            onSelectOption={handleSelectOption}
            onProceed={() => setStep(6)}
            onBack={() => setStep(4)}
          />
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
