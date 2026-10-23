"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  isRo?: boolean;
  defaultService?: string;
}

export function ContactForm({ isRo = false, defaultService = "Private Flight" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [serviceInterest, setServiceInterest] = useState(defaultService);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");
  const [refId, setRefId] = useState("");

  const services = isRo
    ? [
        { value: "Private Flight", label: "Charter Avion Privat" },
        { value: "Helicopter", label: "Charter Elicopter & Acces Rotorcraft" },
        { value: "Aircraft", label: "Consultanță Achiziție & Vânzare Aeronave" },
        { value: "Business Aviation", label: "Consultanță Asigurări Aviație & Risc" },
        { value: "Corporate", label: "Management Flotă & Ownership Fracționat" },
        { value: "Other", label: "Alte Solicitări Executive" },
      ]
    : [
        { value: "Private Flight", label: "Private Jet Charter" },
        { value: "Helicopter", label: "Helicopter Charter & Rotor Access" },
        { value: "Aircraft", label: "Aircraft Acquisition & Sourcing" },
        { value: "Business Aviation", label: "Aviation Insurance & Risk Advisory" },
        { value: "Corporate", label: "Fleet Management & Fractional Access" },
        { value: "Other", label: "General Executive Inquiries" },
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "SUBMITTING") return;

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage(
        isRo
          ? "Vă rugăm să completați toate câmpurile obligatorii (nume, email, telefon, mesaj)."
          : "Please complete all required fields (name, email, phone, message)."
      );
      setStatus("ERROR");
      return;
    }

    if (!consent) {
      setErrorMessage(
        isRo
          ? "Vă rugăm să bifați acordul pentru prelucrarea datelor cu caracter personal."
          : "Please check the consent box to proceed with your inquiry."
      );
      setStatus("ERROR");
      return;
    }

    setStatus("SUBMITTING");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim() || undefined,
          serviceInterest,
          message: message.trim(),
          _air_hp_fax_ref: honeypot,
          currentPage: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || data.success !== true) {
        setErrorMessage(
          data?.error ||
            (isRo
              ? "Eroare la transmiterea mesajului. Vă rugăm reîncercați."
              : "Unable to send your inquiry. Please try again.")
        );
        setStatus("ERROR");
        return;
      }

      setRefId(data.referenceId || "AIR-CONCIERGE");
      setStatus("SUCCESS");
    } catch {
      setErrorMessage(
        isRo ? "Eroare de conexiune la rețea." : "A network connection error occurred."
      );
      setStatus("ERROR");
    }
  };

  if (status === "SUCCESS") {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 border border-amber-500/40 text-white text-center space-y-4 shadow-xl">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl font-bold">
          ✓
        </div>
        <h3 className="text-2xl sm:text-3xl font-light font-sans">
          {isRo ? "Mesaj Transmis cu Succes" : "Inquiry Transmitted Successfully"}
        </h3>
        <p className="text-sm text-neutral-300 max-w-lg mx-auto font-sans leading-relaxed">
          {isRo
            ? `Solicitarea dumneavoastră a fost înregistrată la biroul de concierge cu numărul de referință ${refId}. Un consultant vă va contacta în cel mai scurt timp.`
            : `Your inquiry has been received at the concierge desk under reference ${refId}. An aviation specialist will reach out promptly.`}
        </p>
        <span className="text-xs font-mono text-amber-400 font-bold block">REF: {refId}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-neutral-900 font-sans">
      {/* Anti-spam honeypot */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="_air_hp_fax_ref"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-700 font-bold uppercase tracking-wider block">
            {isRo ? "Nume Complet *" : "Full Name *"}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isRo ? "ex. Cristian Văduva" : "e.g. John Smith"}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-700 font-bold uppercase tracking-wider block">
            {isRo ? "Adresă Email *" : "Email Address *"}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="client@enterprise.com"
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-700 font-bold uppercase tracking-wider block">
            {isRo ? "Număr Telefon *" : "Phone Number *"}
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+40 700 000 000"
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-700 font-bold uppercase tracking-wider block">
            {isRo ? "Companie / Organizație (Opțional)" : "Company / Organization (Optional)"}
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={isRo ? "Numele companiei" : "Company name"}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-mono text-neutral-700 font-bold uppercase tracking-wider block">
          {isRo ? "Obiectul Solicitării *" : "Area of Interest *"}
        </label>
        <select
          value={serviceInterest}
          onChange={(e) => setServiceInterest(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          {services.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-mono text-neutral-700 font-bold uppercase tracking-wider block">
          {isRo ? "Detalii Misiune / Mesaj *" : "Mission Details / Message *"}
        </label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isRo
              ? "Specificați ruta, data estimată, numărul de pasageri sau cerințele specifice..."
              : "Specify route, dates, passenger count, or specific aircraft and advisory requirements..."
          }
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 leading-relaxed"
        />
      </div>

      <div className="flex items-start gap-3 pt-2">
        <input
          type="checkbox"
          id="contact-consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-neutral-300 text-amber-500 focus:ring-amber-400"
        />
        <label htmlFor="contact-consent" className="text-xs text-neutral-600 leading-relaxed">
          {isRo ? (
            <>
              Sunt de acord cu prelucrarea datelor mele cu caracter personal de către AIR by Cristian Văduva în conformitate cu{" "}
              <a href="/legal/privacy" className="text-neutral-900 underline font-medium">
                Politica de Confidențialitate
              </a>{" "}
              și Regulamentul GDPR, exclusiv în scopul soluționării acestei solicitări.
            </>
          ) : (
            <>
              I agree to the processing of my contact information by AIR by Cristian Văduva in accordance with the{" "}
              <a href="/legal/privacy" className="text-neutral-900 underline font-medium">
                Privacy Policy
              </a>{" "}
              and EU GDPR regulations, solely for resolving this inquiry.
            </>
          )}
        </label>
      </div>

      {status === "ERROR" && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-sans">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "SUBMITTING"}
        className="w-full py-4 text-sm font-bold tracking-wider uppercase shadow-xl"
      >
        {status === "SUBMITTING"
          ? isRo
            ? "SE TRANSMITE..."
            : "TRANSMITTING..."
          : isRo
          ? "TRANSMITE SOLICITAREA →"
          : "TRANSMIT INQUIRY →"}
      </Button>
    </form>
  );
}
