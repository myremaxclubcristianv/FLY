"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTelemetry } from "@/lib/telemetry/hooks";
import { telemetryClient } from "@/lib/telemetry/client";
import { useAutoScrollVisibility } from "@/lib/hooks/useAutoScrollVisibility";

const AIR_SERVICES = [
  "Private Flight",
  "Helicopter",
  "Business Aviation",
  "Aircraft",
  "Experience",
  "Corporate",
  "Other",
];

export function AlwaysOnContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isAutoVisible = useAutoScrollVisibility({
    disabled: isOpen,
    topThreshold: 80,
    deltaThreshold: 10,
  });

  const isVisible = isAutoVisible || isOpen || isHovered || isFocused;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [serviceInterest, setServiceInterest] = useState("Private Flight");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [formStatus, setFormStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const hasLoggedStart = useRef(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const initialInputRef = useRef<HTMLInputElement>(null);

  const { trackCustomEvent } = useTelemetry();

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
    setFormStatus("IDLE");
    setErrorMessage("");
    trackCustomEvent("contact_opened", { pagePath: window.location.pathname });
  }, [trackCustomEvent]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    hasLoggedStart.current = false;
  }, []);

  // Keyboard navigation: Close on Escape key & Listen for global open event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        handleClose();
      }
    };
    const handleGlobalOpen = () => {
      handleOpen();
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("air:open-contact", handleGlobalOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("air:open-contact", handleGlobalOpen);
    };
  }, [isOpen, handleOpen, handleClose]);

  // Focus trap & initial focus management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => initialInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleFieldInteraction = () => {
    if (!hasLoggedStart.current) {
      hasLoggedStart.current = true;
      trackCustomEvent("contact_form_started", {
        formName: "Always-On Contact",
        serviceInterest,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === "SUBMITTING") return;

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage("Please complete all required contact fields.");
      setFormStatus("ERROR");
      return;
    }

    setFormStatus("SUBMITTING");
    setErrorMessage("");

    try {
      const visitorId = telemetryClient.getVisitorId();
      const sessionId = telemetryClient.getSessionId();

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
          visitorId,
          sessionId,
          currentPage: window.location.pathname,
          landingPage: window.location.pathname,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || data.success !== true) {
        setErrorMessage(data?.error || "Unable to send inquiry. Please try again or call our operations desk.");
        setFormStatus("ERROR");
        return;
      }

      setReferenceId(data.referenceId || "L-CONFIRMED");
      setFormStatus("SUCCESS");
      trackCustomEvent("contact_form_submitted", {
        referenceId: data.referenceId,
        serviceInterest,
      });

      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
      setHoneypot("");
    } catch {
      setErrorMessage("Network connection error. Please verify your connection.");
      setFormStatus("ERROR");
    }
  };

  return (
    <>
      {/* Persistent Always-On Contact Trigger Control */}
      <div
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 transition-all duration-300 ease-in-out focus-within:translate-y-0 focus-within:opacity-100 ${
          isVisible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isVisible}
      >
        <button
          type="button"
          onClick={handleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="group flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-neutral-950/90 hover:bg-neutral-900 border border-amber-500/40 hover:border-amber-400 text-white shadow-[0_10px_35px_-5px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Contact AIR Flight Operations Desk"
          title="Direct Contact & Flight Inquiry (Always Available)"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="absolute w-4 h-4 rounded-full bg-amber-400/30 animate-ping" />
          </div>
          <div className="flex flex-col text-left font-mono">
            <span className="text-[11px] font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors uppercase">
              CONTACT AIR
            </span>
            <span className="text-[9px] text-neutral-400 tracking-tight hidden sm:inline">
              OPERATIONS DESK
            </span>
          </div>
        </button>
      </div>

      {/* Accessible Contact Modal / Sheet Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div
            ref={modalRef}
            className="w-full max-w-xl bg-[#0d0f12] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-neutral-100 my-auto overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Top Modal Header Ribbon */}
            <div className="flex items-start justify-between border-b border-white/10 pb-5 mb-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                    AIR FLIGHT OPERATIONS // DIRECT INQUIRY
                  </span>
                </div>
                <h2 id="contact-modal-title" className="text-xl sm:text-2xl font-light text-white tracking-tight">
                  How can AIR assist your mission?
                </h2>
                <p className="text-xs text-neutral-400 font-sans">
                  Direct dispatch for private flights, helicopter charter, and corporate travel.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-400"
                aria-label="Close Contact Dialog"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Success State */}
            {formStatus === "SUCCESS" ? (
              <div className="py-8 flex flex-col items-center text-center gap-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
                    REQUEST REGISTERED // {referenceId}
                  </span>
                  <h3 className="text-2xl font-light text-white">
                    Thank you. AIR has received your request.
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed pt-1">
                    Our flight operations desk at Băneasa (LRBS) is reviewing your mission parameters.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-mono text-xs font-bold transition-all shadow-lg"
                  >
                    RETURN TO AIR
                  </button>
                </div>
              </div>
            ) : (
              /* Input Form */
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-sm">
                {/* Honeypot Spam Trap (Hidden) */}
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
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      FULL NAME *
                    </label>
                    <input
                      id="contact-name"
                      ref={initialInputRef}
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Cristian Văduva"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        handleFieldInteraction();
                      }}
                      className="w-full bg-neutral-950/80 border border-white/10 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-white text-xs font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="e.g. client@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleFieldInteraction();
                      }}
                      className="w-full bg-neutral-950/80 border border-white/10 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-white text-xs font-sans focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      PHONE NUMBER *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="e.g. +40 700 000 000"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        handleFieldInteraction();
                      }}
                      className="w-full bg-neutral-950/80 border border-white/10 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-white text-xs font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-company" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      COMPANY / ENTITY (OPTIONAL)
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      autoComplete="organization"
                      placeholder="e.g. Executive Office"
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        handleFieldInteraction();
                      }}
                      className="w-full bg-neutral-950/80 border border-white/10 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-white text-xs font-sans focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-service" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    SERVICE OF INTEREST
                  </label>
                  <select
                    id="contact-service"
                    value={serviceInterest}
                    onChange={(e) => {
                      setServiceInterest(e.target.value);
                      handleFieldInteraction();
                    }}
                    className="w-full bg-neutral-950/80 border border-white/10 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-white text-xs font-sans focus:outline-none transition-colors"
                  >
                    {AIR_SERVICES.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    MISSION PROFILE & INQUIRY *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    required
                    placeholder="Describe your desired route, dates, passenger complement, or special aviation requirements..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      handleFieldInteraction();
                    }}
                    className="w-full bg-neutral-950/80 border border-white/10 focus:border-amber-400 rounded-xl p-3 text-white text-xs font-sans focus:outline-none resize-none transition-colors"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-mono">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Trigger & Disclaimer */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                  <span className="text-[10px] font-mono text-neutral-500">
                    AIR FLIGHT OPERATIONS // BĂNEASA (LRBS)
                  </span>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-white/10 text-neutral-300 hover:text-white hover:bg-white/5 font-mono text-xs transition-colors"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      disabled={formStatus === "SUBMITTING"}
                      className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-neutral-950 font-mono text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      {formStatus === "SUBMITTING" ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                          <span>TRANSMITTING...</span>
                        </>
                      ) : (
                        <span>TRANSMIT INQUIRY →</span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
