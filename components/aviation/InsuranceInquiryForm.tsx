"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

interface InsuranceInquiryFormProps {
  isRo?: boolean;
}

export function InsuranceInquiryForm({ isRo = false }: InsuranceInquiryFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interestCategory, setInterestCategory] = useState("CURRENT_OWNER");
  const [aircraftType, setAircraftType] = useState("");
  const [operationType, setOperationType] = useState("PART_NCC_PRIVATE");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");
  const [refId, setRefId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "SUBMITTING") return;

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage(isRo ? "Vă rugăm să completați toate câmpurile obligatorii." : "Please fill in all required fields.");
      setStatus("ERROR");
      return;
    }

    if (!consent) {
      setErrorMessage(isRo ? "Vă rugăm să bifați acordul de prelucrare a datelor." : "Please check the consent box to proceed.");
      setStatus("ERROR");
      return;
    }

    setStatus("SUBMITTING");
    setErrorMessage("");

    try {
      const formattedMessage = `[INSURANCE ADVISORY INQUIRY]
Category: ${interestCategory}
Aircraft: ${aircraftType || "Not specified"}
Operation: ${operationType}
Inquiry Details:
${message.trim()}`;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          serviceInterest: "Aviation Insurance Advisory",
          message: formattedMessage,
          _air_hp_fax_ref: honeypot,
          currentPage: window.location.pathname,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || data.success !== true) {
        setErrorMessage(data?.error || (isRo ? "Eroare la transmitere. Vă rugăm reîncercați." : "Unable to send inquiry. Please try again."));
        setStatus("ERROR");
        return;
      }

      setRefId(data.referenceId || "INS-RECEIVED");
      setStatus("SUCCESS");
    } catch {
      setErrorMessage(isRo ? "Eroare de conexiune la rețea." : "Network connection error.");
      setStatus("ERROR");
    }
  };

  if (status === "SUCCESS") {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 border border-amber-500/40 text-white text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-xl font-bold">
          ✓
        </div>
        <h3 className="text-2xl font-light font-sans">
          {isRo ? "Solicitare de Consultanță Înregistrată" : "Insurance Advisory Inquiry Received"}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto font-sans leading-relaxed">
          {isRo
            ? `Echipa noastră de asistență a înregistrat cererea dumneavoastră cu numărul de referință ${refId}. Un consultant vă va contacta pentru a discuta detaliile tehnice ale aeronavei.`
            : `Our advisory desk has logged your request under reference ${refId}. An aviation specialist will reach out to review your airframe parameters.`}
        </p>
        <span className="text-[10px] font-mono text-neutral-500 block">REF // {refId}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-xl space-y-6 text-neutral-900 font-sans">
      <div className="border-b border-neutral-200 pb-4">
        <h3 className="text-2xl font-light font-sans text-neutral-900">
          {isRo ? "Formular Consultanță Asigurări Aeronautice" : "Aircraft Insurance Advisory Inquiry"}
        </h3>
        <p className="text-xs text-neutral-500 mt-1 font-sans">
          {isRo
            ? "Transmiteți parametrii aeronavei pentru consultanță orientativă privind riscul de fuzelaj (Hull) și răspundere civilă."
            : "Submit airframe parameters for preliminary advisory review regarding hull and statutory third-party liability."}
        </p>
      </div>

      {status === "ERROR" && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
          {errorMessage}
        </div>
      )}

      {/* Honeypot Anti-Spam (Hidden) */}
      <input
        type="text"
        name="_air_hp_fax_ref"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-700 uppercase font-bold">
            {isRo ? "Nume & Prenume *" : "Full Name *"}
          </label>
          <input
            type="text"
            required
            placeholder={isRo ? "ex. Alexandru Popescu" : "e.g. John Smith"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-xs font-mono px-3.5 py-2.5 bg-[#fafaf7] border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-700 uppercase font-bold">
            {isRo ? "Email de Contact *" : "Corporate / Personal Email *"}
          </label>
          <input
            type="email"
            required
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-xs font-mono px-3.5 py-2.5 bg-[#fafaf7] border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-700 uppercase font-bold">
            {isRo ? "Telefon de Contact *" : "Direct Phone / WhatsApp *"}
          </label>
          <input
            type="tel"
            required
            placeholder="+40 7..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full text-xs font-mono px-3.5 py-2.5 bg-[#fafaf7] border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-700 uppercase font-bold">
            {isRo ? "Profil Interes" : "Interest Profile"}
          </label>
          <select
            value={interestCategory}
            onChange={(e) => setInterestCategory(e.target.value)}
            className="w-full text-xs font-mono px-3 py-2.5 bg-[#fafaf7] border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="CURRENT_OWNER">{isRo ? "Proprietar Aeronavă Activ" : "Current Aircraft Owner"}</option>
            <option value="ACQUISITION_CANDIDATE">{isRo ? "În Curs de Achiziție" : "Acquisition Candidate"}</option>
            <option value="FLIGHT_DEPARTMENT">{isRo ? "Departament Zbor / Corporate" : "Corporate Flight Dept"}</option>
            <option value="CHARTER_OPERATOR">{isRo ? "Operator / Broker Charter" : "Charter Operator / Broker"}</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-700 uppercase font-bold">
            {isRo ? "Regim Operare" : "Operational Regime"}
          </label>
          <select
            value={operationType}
            onChange={(e) => setOperationType(e.target.value)}
            className="w-full text-xs font-mono px-3 py-2.5 bg-[#fafaf7] border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="PART_NCC_PRIVATE">{isRo ? "Part-NCC (Privat Corporate)" : "Part-NCC (Private Corporate)"}</option>
            <option value="PART_CAT_COMMERCIAL">{isRo ? "Part-CAT (AOC Comercial)" : "Part-CAT (Commercial AOC)"}</option>
            <option value="PART_NCO_GENERAL">{isRo ? "Part-NCO (Aviație Generală)" : "Part-NCO (General Aviation)"}</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-mono text-neutral-700 uppercase font-bold">
          {isRo ? "Tip Aeronavă / Model (dacă se cunoaște)" : "Aircraft Manufacturer & Model (if known)"}
        </label>
        <input
          type="text"
          placeholder={isRo ? "ex. Embraer Phenom 300E, Pilatus PC-12 NGX, Airbus H145..." : "e.g. Embraer Phenom 300E, Pilatus PC-12 NGX, Airbus H145..."}
          value={aircraftType}
          onChange={(e) => setAircraftType(e.target.value)}
          className="w-full text-xs font-mono px-3.5 py-2.5 bg-[#fafaf7] border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-mono text-neutral-700 uppercase font-bold">
          {isRo ? "Întrebări / Cerințe Specifice *" : "Specific Risk Questions or Requirements *"}
        </label>
        <textarea
          required
          rows={3}
          placeholder={isRo ? "Descrieți baza de operare, limitele de răspundere dorite sau particularitățile echipajului..." : "Describe operating base, desired liability limits, pilot open warranties, or specific questions..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full text-xs font-mono p-3 bg-[#fafaf7] border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Consent Checkbox */}
      <label className="flex items-start gap-3 cursor-pointer text-xs text-neutral-600 font-sans">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-amber-600 rounded"
          required
        />
        <span>
          {isRo
            ? "Confirm că solicit informații de consultanță orientativă și sunt de acord cu prelucrarea datelor în conformitate cu Politica de Confidențialitate AIR (GDPR)."
            : "I understand AIR provides educational advisory coordination and is not an insurance distributor. I agree to data processing under the AIR GDPR Privacy Policy."}
        </span>
      </label>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "SUBMITTING"}
        className="w-full text-sm font-mono tracking-wider font-bold py-3.5"
      >
        {status === "SUBMITTING"
          ? (isRo ? "SE TRANSMITE..." : "SUBMITTING INQUIRY...")
          : (isRo ? "TRANSMITE SOLICITAREA DE CONSULTANȚĂ →" : "SUBMIT ADVISORY INQUIRY →")}
      </Button>
    </form>
  );
}
