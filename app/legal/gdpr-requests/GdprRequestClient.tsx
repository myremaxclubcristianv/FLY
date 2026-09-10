"use client";

import React, { useState } from "react";
import { LEGAL_CONFIG } from "@/lib/config/legal";

export default function GdprRequestClient() {
  const [requestType, setRequestType] = useState<string>("ACCESS");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [details, setDetails] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const requestOptions = [
    { value: "ACCESS", label: "01 // Dreptul de Acces la Date (Art. 15 GDPR)" },
    { value: "RECTIFICATION", label: "02 // Dreptul la Rectificare (Art. 16 GDPR)" },
    { value: "ERASURE", label: "03 // Dreptul la Ștergere / Dreptul de a fi Uitat (Art. 17 GDPR)" },
    { value: "RESTRICTION", label: "04 // Dreptul la Restricționarea Prelucrării (Art. 18 GDPR)" },
    { value: "PORTABILITY", label: "05 // Dreptul la Portabilitatea Datelor (Art. 20 GDPR)" },
    { value: "OBJECTION", label: "06 // Dreptul la Opoziție (Art. 21 GDPR)" },
    { value: "CONSENT_WITHDRAWAL", label: "07 // Retragerea Consimțământului Anterior (Art. 7 GDPR)" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  const mailtoSubject = encodeURIComponent(`[GDPR REQUEST // ${requestType}] ${fullName || "Solicitant"}`);
  const mailtoBody = encodeURIComponent(
    `CĂTRE: Responsabil Protecția Datelor AIR (${LEGAL_CONFIG.entity.privacyEmail})\n\n` +
    `TIP SOLICITARE: ${requestType}\n` +
    `NUME COMPLET: ${fullName}\n` +
    `E-MAIL ASOCIAT CONTULUI: ${email}\n` +
    `TELEFON: ${phone || "Nespecificat"}\n` +
    `REFERINȚĂ MISIUNE AIR: ${referenceId || "N/A"}\n\n` +
    `DETALII SPECIFICE:\n${details || "Solicit exercitarea dreptului meu conform GDPR."}\n\n` +
    `Data transmiterii: ${new Date().toLocaleDateString("ro-RO")}`
  );

  return (
    <div className="space-y-10">
      {/* Intro Box */}
      <div className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-3">
        <h2 className="text-lg font-light text-[var(--color-text-primary)]">
          Protocol Oficial de Solicitare GDPR
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
          În conformitate cu Regulamentul (UE) 2016/679 (GDPR), puteți adresa oricând o cerere oficială privind datele dumneavoastră personale gestionate de platforma AIR. Termenul legal de soluționare și răspuns este de <strong>maximum 30 de zile calendaristice</strong> de la data recepționării solicitării și a validării identității.
        </p>
      </div>

      {/* Interactive Form */}
      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-6 shadow-md">
        <div className="border-b border-[var(--color-border)] pb-4">
          <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block">
            FORMULAR GENERARE CERERE FORMALĂ
          </span>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">
            Completați câmpurile pentru a genera cererea oficială securizată către Departamentul de Confidențialitate AIR.
          </p>
        </div>

        <div className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-[var(--color-text-muted)] block mb-1">SELECTAȚI TIPUL DREPTULUI EXERCITAT *</label>
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl p-3 text-[var(--color-text-primary)] focus:border-amber-500 focus:outline-none"
              required
            >
              {requestOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[var(--color-text-muted)] block mb-1">NUME ȘI PRENUME SOLICITANT *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ex. Alexandru Popescu"
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl p-3 text-[var(--color-text-primary)] focus:border-amber-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-[var(--color-text-muted)] block mb-1">E-MAIL ASOCIAT CONTULUI AIR *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@domeniu.ro"
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl p-3 text-[var(--color-text-primary)] focus:border-amber-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[var(--color-text-muted)] block mb-1">NUMĂR DE TELEFON PENTRU VALIDARE</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+40 7XX XXX XXX"
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl p-3 text-[var(--color-text-primary)] focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[var(--color-text-muted)] block mb-1">REFERINȚĂ MISIUNE AIR (DACĂ EXISTĂ)</label>
              <input
                type="text"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                placeholder="ex. AIR-2026-F982A1"
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl p-3 text-[var(--color-text-primary)] focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[var(--color-text-muted)] block mb-1">DETALII SUPLIMENTARE PRIVIND CEREREA</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              placeholder="Vă rugăm să specificați exact datele la care faceți referire sau motivele particulare ale solicitării..."
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl p-3 text-[var(--color-text-primary)] focus:border-amber-500 focus:outline-none font-sans"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
            * Câmpuri obligatorii pentru procesarea identificării.
          </p>
          <button
            type="submit"
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3 rounded-xl text-xs font-mono transition shadow"
          >
            Generează & Trimite Solicitarea Oficială →
          </button>
        </div>
      </form>

      {/* Generated Transmission Action */}
      {isGenerated && (
        <div className="p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-500 font-mono font-bold text-xs">
            <span>✓ CERERE GENERATĂ CU SUCCES</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            Pentru asigurarea confidențialității și autenticității, cererea dumneavoastră a fost formatată în protocol oficial. Puteți trimite solicitarea direct din clientul dumneavoastră de e-mail către Responsabilul de Protecție a Datelor (DPO).
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={`mailto:${LEGAL_CONFIG.entity.privacyEmail}?subject=${mailtoSubject}&body=${mailtoBody}`}
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono px-5 py-2.5 rounded-xl transition shadow"
            >
              Deschide E-mail Pre-completat ({LEGAL_CONFIG.entity.privacyEmail}) →
            </a>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(
                  `CĂTRE: ${LEGAL_CONFIG.entity.privacyEmail}\nSUBIECT: [GDPR REQUEST // ${requestType}]\n\nNume: ${fullName}\nE-mail: ${email}\nTelefon: ${phone}\nReferință: ${referenceId}\nDetalii: ${details}`
                );
                alert("Textul cererii a fost copiat în clipboard.");
              }}
              className="bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border)] text-xs font-mono px-4 py-2.5 rounded-xl transition"
            >
              Copiază Textul Cererii
            </button>
          </div>
        </div>
      )}

      {/* Security & Verification Notice */}
      <div className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] space-y-2 font-mono">
        <span className="font-bold text-[var(--color-text-primary)] block">
          PROCEDURĂ DE VERIFICARE A IDENTITĂȚII (ANTI-FRAUDĂ)
        </span>
        <p className="font-sans text-xs leading-relaxed">
          Pentru a preveni divulgarea neautorizată a datelor pasagerilor sau a manifestelor de zbor către terți neautorizați, AIR va proceda la verificarea rezonabilă a identității solicitantului prin transmiterea unui cod de confirmare către adresa de e-mail sau numărul de telefon înregistrat pe platformă, înainte de eliberarea oricărei copii a datelor personale.
        </p>
      </div>
    </div>
  );
}
