"use client";

import Link from "next/link";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export default function BookingDetailView({ bookingReference }: { bookingReference: string }) {
  const mockBooking = {
    bookingReference: bookingReference.startsWith("AIR-BK-") ? bookingReference : `AIR-BK-2026-${bookingReference.toUpperCase()}`,
    missionRef: "AIR-2026-F982A1",
    origin: "Bucharest Băneasa (LRBS / BBU)",
    destination: "Nice Côte d'Azur (LFMN / NCE)",
    departureDate: "2026-09-24 at 10:30 EET",
    passengers: 4,
    aircraftModel: "Embraer Phenom 300E",
    tailNumber: "YR-TYA",
    operatorName: "Toyo Aviation SRL (AOC RO-014)",
    bookingStatus: "CONFIRMED" as const,
    paymentStatus: "DEPOSIT_PAID" as const,
    totalAmount: "€8,800 EUR",
    depositAmount: "€1,760 EUR",
    cancellationPolicy: "80% refund up to 48 hours prior to departure.",
    trackingStatus: "TRACKING NOT AVAILABLE (Radar Feed Not Connected)",
  };

  const steps = [
    { label: "01. REQUESTED", done: true },
    { label: "02. QUOTED", done: true },
    { label: "03. DEPOSIT PAID", done: true },
    { label: "04. OPERATOR CONFIRMED", done: true },
    { label: "05. FLIGHT DISPATCH", done: false },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <Link href="/account" className="text-xs text-amber-400 hover:underline font-mono block mb-3">
            ← Return to Account Dashboard
          </Link>

          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-400 bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                  {mockBooking.bookingReference}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                  {mockBooking.bookingStatus}
                </span>
                <ProvenanceBadge status="VERIFIED" />
              </div>
              <h1 className="text-2xl font-light text-white mt-2">
                {mockBooking.origin} → {mockBooking.destination}
              </h1>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Departure: <strong className="text-white">{mockBooking.departureDate}</strong> | Passengers: <strong className="text-white">{mockBooking.passengers} pax</strong>
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-neutral-500 block uppercase">Payment State</span>
              <span className="text-sm font-bold text-amber-300 font-mono">{mockBooking.paymentStatus}</span>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Flight Booking Lifecycle Tracker</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs text-center">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border ${
                  s.done ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-neutral-950 border-neutral-800 text-neutral-600"
                }`}
              >
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Flight Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider font-mono">Flight Vehicle & Operator</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Aircraft Model</span>
                <span className="text-white font-medium">{mockBooking.aircraftModel}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Tail Number</span>
                <span className="text-amber-300 font-mono font-bold">{mockBooking.tailNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-400">AOC Operator</span>
                <span className="text-white font-medium">{mockBooking.operatorName}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-neutral-400">Mission Reference</span>
                <span className="text-neutral-300 font-mono">{mockBooking.missionRef}</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider font-mono">Financials & Terms</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Total Charter Amount</span>
                <span className="text-white font-bold">{mockBooking.totalAmount}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-800">
                <span className="text-neutral-400">Deposit Paid (20%)</span>
                <span className="text-amber-300 font-bold">{mockBooking.depositAmount}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-neutral-400">Cancellation Terms</span>
                <span className="text-neutral-300 text-right">{mockBooking.cancellationPolicy}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 8 Operational Status & Data Minimization Manifest */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider font-mono">Passenger Manifest & Privacy</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Passenger Count</span>
                <span className="text-white font-mono font-bold">{mockBooking.passengers} Pax</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Manifest Status</span>
                <span className="text-green-400 font-mono font-bold">VERIFIED</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400">Data Minimization Policy</span>
                <span className="text-neutral-400 text-right font-mono">Passport numbers & scans NOT stored</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider font-mono">Customs & Border Clearance</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Customs Clearance Status</span>
                <span className="text-amber-400 font-mono font-bold">PENDING / NOT AVAILABLE</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400">Authority Note</span>
                <span className="text-neutral-400 text-right">AIR does not claim government customs clearance authority.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Radar Tracking Abstraction */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase font-bold">
            <span>📡 ADS-B LIVE RADAR TRACKING</span>
          </div>
          <p className="text-xs text-neutral-400 font-mono">{mockBooking.trackingStatus}</p>
        </div>
      </div>
    </div>
  );
}
