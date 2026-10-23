import React from "react";
import { AirportOperationalRecord } from "@/lib/services/airport-status-service";

interface AirportStatusCardProps {
  record: AirportOperationalRecord;
  className?: string;
  isRo?: boolean;
}

export function AirportStatusCard({ record, className = "", isRo = false }: AirportStatusCardProps) {
  const isUnverified = record.operationalStatus === "STATUS_UNVERIFIED";
  const isOpen = record.operationalStatus === "OPEN_VERIFIED";
  const isRestricted = record.operationalStatus === "RESTRICTION_REPORTED";
  const isClosed = record.operationalStatus === "CLOSED_VERIFIED";

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 bg-[#fafaf7] text-neutral-900 shadow-sm space-y-6 ${
        isUnverified
          ? "border-amber-300/80 bg-amber-50/20"
          : isOpen
          ? "border-emerald-300 bg-emerald-50/20"
          : isClosed
          ? "border-rose-300 bg-rose-50/20"
          : "border-neutral-200"
      } ${className}`}
    >
      {/* Top Header & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-500">
              {isRo ? "IDENTIFICATOR AEROPORT // STARE OPERAȚIONALĂ" : "AIRPORT IDENTIFIER // OPERATIONAL STATUS"}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 font-sans mt-1">
            {record.name} <span className="text-amber-600 font-mono font-normal">({record.icao}{record.iata ? ` / ${record.iata}` : ""})</span>
          </h3>
          <p className="text-xs text-neutral-500 font-sans mt-0.5">{record.officialName}</p>
        </div>

        <div>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${
              isUnverified
                ? "bg-amber-100/80 text-amber-900 border-amber-300"
                : isOpen
                ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                : isRestricted
                ? "bg-orange-100 text-orange-900 border-orange-300"
                : "bg-rose-100 text-rose-900 border-rose-300"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isUnverified ? "bg-amber-500 animate-pulse" : isOpen ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />
            <span>
              {isRo
                ? isUnverified
                  ? "STATUT OPERAȚIONAL NECONFIRMAT"
                  : isOpen
                  ? "DESCHIS — VERIFICAT"
                  : "RESTRICȚIE SEMNALATĂ"
                : record.statusLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Runway Measurements & Physical vs Declared Distinction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-3">
          <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider block">
            {isRo ? "DIMENSIUNI FIZICE PISTĂ (AIP ROMANIA AD 2.12)" : "PHYSICAL RUNWAY DIMENSIONS (AIP ROMANIA AD 2.12)"}
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-light text-neutral-900 font-sans">
              {record.runwayPhysical.dimensionsM}
            </span>
            <span className="text-xs font-mono text-amber-600 font-bold">
              RWY {record.runwayPhysical.designation}
            </span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            {record.runwayPhysical.clarification}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-3">
          <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider block">
            {isRo ? "DISTANȚE DECLA RATE (TORA, TODA, ASDA, LDA)" : "DECLARED DISTANCES (TORA, TODA, ASDA, LDA)"}
          </span>
          <p className="text-xs text-neutral-700 font-sans leading-relaxed">
            {record.declaredDistancesDisclaimer}
          </p>
          <div className="text-[11px] font-mono text-neutral-500 border-t border-neutral-100 pt-2 space-y-1">
            <div>• {isRo ? "Suprafață / Portanță" : "Surface / Strength"}: {record.runwayPhysical.surface} {record.runwayPhysical.pcn ? `(${record.runwayPhysical.pcn})` : ""}</div>
            <div>• {isRo ? "Procedură operare" : "Operating requirement"}: Prior Permission Required (PPR)</div>
          </div>
        </div>
      </div>

      {/* Operational Restrictions & NOTAM Notice */}
      <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider">
            {isRo ? "NOTĂ TRANSPARENȚĂ NOTAM & SIGURANȚĂ OPERAȚIONALĂ" : "NOTAM & OPERATIONAL SAFETY TRANSPARENCY NOTICE"}
          </span>
          <span className="text-[10px] font-mono text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded border border-amber-200">
            {isRo ? "FLUX LIVE NEINTEGRAT" : "LIVE FEED NOT CONNECTED"}
          </span>
        </div>
        <p className="text-xs text-neutral-700 font-sans leading-relaxed">
          {record.notamNotice}
        </p>

        <div className="pt-2">
          <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold block mb-1.5">
            {isRo ? "RESTRICȚII AERONAUTICE PUBLICATE:" : "PUBLISHED AERONAUTICAL LIMITATIONS:"}
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-neutral-600">
            {record.restrictions.map((r, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Source & Freshness Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono text-neutral-500 border-t border-neutral-200 pt-4">
        <div className="flex items-center gap-2">
          <span>{isRo ? "Sursă oficială" : "Authoritative Source"}:</span>
          <a
            href={record.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:underline font-bold"
          >
            {record.sourceName} ↗
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-neutral-500">
          <span>{record.publicationCycle}</span>
          <span>•</span>
          <span>{isRo ? "Verificat" : "Verified"}: {record.lastVerifiedAt}</span>
        </div>
      </div>
    </div>
  );
}
