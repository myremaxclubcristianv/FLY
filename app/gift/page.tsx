"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { cn } from "../../lib/utils";

const GIFT_EXPERIENCES = [
  {
    id: "castles",
    title: "Transylvanian Castles & Alpine Helipad Tour",
    category: "Twin-Engine Helicopter",
    duration: "1h 45m Aerial Flight",
    location: "Departing Băneasa (LRBS) → Bran / Peleș Estates",
    description: "Low-altitude private flight over the Bucegi mountains, Peleș Castle, and direct landing at a private Transylvanian estate for wine tasting.",
  },
  {
    id: "black-sea",
    title: "Black Sea Coastal Heli-Dining Sunset Flight",
    category: "Twin-Engine Helicopter",
    duration: "2h 15m Total Experience",
    location: "Departing Băneasa (LRBS) → Mamaia Beach Resort",
    description: "Bypassing motorway congestion for an evening flight over the Danube Delta and direct beachfront helipad landing at private seafood venue.",
  },
  {
    id: "alps-jet",
    title: "Swiss Alps & St. Moritz Winter Jet Getaway",
    category: "Light Jet (Phenom 300E)",
    duration: "2h 20m Flight Time",
    location: "Bucharest (LRBS) → Samedan / St. Moritz (LSZS)",
    description: "High-altitude jet flight into Europe's highest airport with dedicated ski equipment handling and luxury champagne service onboard.",
  },
  {
    id: "pilot-discovery",
    title: "First Flight & Cockpit Co-Pilot Experience",
    category: "Single-Engine Executive Aircraft",
    duration: "60m Hands-on Flight + Ground Briefing",
    location: "Strejnic / Clinceni Aerodromes",
    description: "Hands-on flight under the supervision of a certified EASA flight instructor with full pre-flight briefing and logbook credit.",
  },
];

export default function GiftAFlightPage() {
  const [selectedExp, setSelectedExp] = useState(GIFT_EXPERIENCES[0].id);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [validityPeriod, setValidityPeriod] = useState("12_MONTHS");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const activeExp = GIFT_EXPERIENCES.find((e) => e.id === selectedExp) || GIFT_EXPERIENCES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const ref = `AIR-GIFT-${code}`;
    setSubmittedRef(ref);
  };

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="default">
        <div className="flex flex-col gap-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                GIFT A FLIGHT // BESPOKE AVIATION VOUCHER
              </span>
              <DataStatusBadge status="REQUEST" />
            </div>

            <SectionHeader
              title="GIFT AN UNFORGETTABLE FLIGHT."
              description="Give the ultimate gift of flight: scenic helicopter tours, private jet alpine escapes, or certified cockpit discovery flights with open 12-month voucher validity."
              titleAs="h1"
            />
          </div>

          {submittedRef ? (
            /* Confirmation View */
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/80 border border-amber-500/40 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-data text-emerald-400 font-bold uppercase tracking-widest">
                  GIFT REQUEST REGISTERED // CONCIERGE DISPATCH
                </span>
              </div>

              <div>
                <h2 className="text-3xl font-light text-white">
                  GIFT CERTIFICATE REQUEST INITIATED.
                </h2>
                <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                  AIR Flight Concierge has recorded your gift request for <strong>{recipientName}</strong> ({activeExp.title}). We will contact you at <strong>{senderEmail}</strong> to confirm the personalized presentation box and voucher issuance.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950 border border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                    GIFT REFERENCE IDENTIFIER
                  </span>
                  <span className="text-2xl font-mono font-bold text-white tracking-wider">
                    {submittedRef}
                  </span>
                </div>
                <Link href="/account">
                  <Button variant="primary" size="sm">
                    VIEW IN MY AIR PORTAL →
                  </Button>
                </Link>
              </div>

              <div className="pt-2">
                <Button variant="outline" size="md" onClick={() => setSubmittedRef(null)}>
                  ← Create Another Gift Request
                </Button>
              </div>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              {/* Step 1: Select Experience */}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-data text-amber-400 uppercase tracking-wider font-semibold">
                  01 // SELECT CURATED AVIATION EXPERIENCE
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {GIFT_EXPERIENCES.map((exp) => {
                    const isSelected = selectedExp === exp.id;
                    return (
                      <div
                        key={exp.id}
                        onClick={() => setSelectedExp(exp.id)}
                        className={cn(
                          "p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3",
                          isSelected
                            ? "bg-amber-500/10 border-amber-400 ring-1 ring-amber-400/50 shadow-md"
                            : "glass-surface border-white/10 hover:border-white/20 text-neutral-400"
                        )}
                      >
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase">
                              {exp.category}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400">
                              {exp.duration}
                            </span>
                          </div>
                          <h3 className="text-base font-medium text-white">{exp.title}</h3>
                          <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                            {exp.description}
                          </p>
                        </div>
                        <span className="text-[10px] font-data text-neutral-500 truncate">
                          {exp.location}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Recipient Details */}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-data text-amber-400 uppercase tracking-wider font-semibold">
                  02 // RECIPIENT & PERSONALIZED TOUCH
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="RECIPIENT FULL NAME"
                    placeholder="e.g. Elena Popescu"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    required
                  />
                  <Input
                    label="RECIPIENT EMAIL // OPTIONAL"
                    placeholder="Leave empty for private physical voucher"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Select
                    label="VOUCHER VALIDITY WINDOW"
                    value={validityPeriod}
                    onChange={(e) => setValidityPeriod(e.target.value)}
                    options={[
                      { value: "12_MONTHS", label: "12 MONTHS OPEN FLEXIBILITY" },
                      { value: "24_MONTHS", label: "24 MONTHS EXTENDED VALIDITY" },
                      { value: "FIXED_DATE", label: "SPECIFIC PLANNED DATE (COORDINATED BY CONCIERGE)" },
                    ]}
                  />
                  <Input
                    label="PERSONAL GIFT MESSAGE"
                    placeholder="e.g. Happy 40th Birthday, with love."
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                  />
                </div>
              </div>

              {/* Step 3: Sender Contact */}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-data text-amber-400 uppercase tracking-wider font-semibold">
                  03 // YOUR CONTACT DETAILS (FOR CONCIERGE DELIVERY)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <Input
                    label="YOUR FULL NAME"
                    placeholder="e.g. Andrei Ionescu"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required
                  />
                  <Input
                    label="YOUR EMAIL"
                    type="email"
                    placeholder="andrei@example.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    required
                  />
                  <Input
                    label="YOUR PHONE"
                    type="tel"
                    placeholder="+40 722 000 000"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <span className="text-xs font-data text-neutral-400">
                  Status: <strong className="text-amber-400">REQUEST</strong> (Zero commitment until flight verification)
                </span>
                <Button type="submit" variant="primary" size="lg">
                  SUBMIT GIFT FLIGHT REQUEST →
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
