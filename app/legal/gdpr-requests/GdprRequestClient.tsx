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
  const [copied, setCopied] = useState(false);

  const requestOptions = [
    { value: "ACCESS", label: "01 // Dreptul de Acces la Date (Art. 15 GDPR)" },
    { value: "RECTIFICATION", label: "02 // Dreptul la Rectificare (Art. 16 GDPR)" },
    { value: "ERASURE", label: "03 // Dreptul la Ștergere / Dreptul de a fi Uitat (Art. 17 GDPR)" },
    { value: "RESTRICTION", label: "04 // Dreptul la Restricționarea Prelucrării (Art. 18 GDPR)" },
    { value: "PORTABILITY", label: "05 // Dreptul la Portabilitatea Datelor (Art. 20 GDPR)" },
    { value: "OBJECTION", label: "06 // Dreptul la Opoziție (Art. 21 GDPR)" },
    { value: "CONSENT_WITHDRAWAL", label: "07 // Retragerea Consimțământului Anterior (Art. 7 GDPR)" },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
    setCopied(false);
  };

  const formattedRequestText =
    `CĂTRE: Responsabil Protecția Datelor AIR\n` +
    `ADRESĂ DESTINATAR: ${LEGAL_CONFIG.entity.privacyEmail}\n` +
    `SUBIECT: [GDPR REQUEST // ${requestType}] ${fullName || "Solicitant"}\n\n` +
    `Subsemnatul/a, ${fullName},\n` +
    `Adresă de e-mail asociată: ${email}\n` +
    `Telefon de contact: ${phone || "Nespecificat"}\n` +
    `Referință solicitare AIR (dacă există): ${referenceId || "N/A"}\n\n` +
    `Prin prezenta, în temeiul Regulamentului (UE) 2016/679 (GDPR), solicit exercitarea dreptului de tip: ${requestType}.\n\n` +
    `DETALII SPECIFICE PRIVIND SOLICITAREA:\n` +
    `${details || "Vă rog să confirmați înregistrarea solicitării mele și măsurile întreprinse conform GDPR."}\n\n` +
    `Data redactării: ${new Date().toLocaleDateString("ro-RO")}`;

  const mailtoSubject = encodeURIComponent(`[GDPR REQUEST // ${requestType}] ${fullName || "Solicitant"}`);
  const mailtoBody = encodeURIComponent(formattedRequestText);

  return (
    <div className="space-y-10">
      {/* Intro Box */}
      <div className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-3">
        <div className="flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase tracking-wider">
          <span>ℹ GENERATOR LOCAL DE CERERI GDPR</span>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
          Acest instrument funcționează <strong>exclusiv local în browserul dumneavoastră</strong> pentru redactarea și formatarea unei cereri oficiale de exercitare a drepturilor prevăzute de Regulamentul (UE) 2016/679 (GDPR). Nicio dată din acest formular nu este salvată pe un server extern până la transmiterea efectivă a mesajului de către dumneavoastră.
        </p>
      </div>

      {/* Interactive Form */}
      <form onSubmit={handleGenerate} className="p-8 rounded-3xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-6 shadow-md">
        <div className="border-b border-[var(--color-border)] pb-4">
          <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block">
            REDACTARE CERERE FORMALĂ GDPR
          </span>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">
            Completați datele pentru a genera textul oficial gata de trimitere.
          </p>
        </div>

        <div className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-[var(--color-text-muted)] block mb-1">SELECTAȚI DREPTUL PE CARE DORIȚI SĂ ÎL EXERCITAȚI *</label>
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
              <label className="text-[var(--color-text-muted)] block mb-1">E-MAIL ASOCIAT SOLICITĂRII AIR *</label>
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
              <label className="text-[var(--color-text-muted)] block mb-1">NUMĂR DE TELEFON (OPȚIONAL)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+40 7XX XXX XXX"
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl p-3 text-[var(--color-text-primary)] focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[var(--color-text-muted)] block mb-1">REFERINȚĂ SOLICITARE AIR (DACĂ EXISTĂ)</label>
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
              placeholder="Specificați detaliile particulare ale cererii dumneavoastră..."
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl p-3 text-[var(--color-text-primary)] focus:border-amber-500 focus:outline-none font-sans"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
            * Câmpuri necesare pentru redactarea corectă a cererii.
          </p>
          <button
            type="submit"
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3 rounded-xl text-xs font-mono transition shadow"
          >
            Generează Textul Cererii Oficiale →
          </button>
        </div>
      </form>

      {/* Generated Result Output */}
      {isGenerated && (
        <div className="p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-amber-500 font-mono font-bold text-xs">
              ✓ CERERE GENERATĂ LOCAL CU SUCCES
            </span>
            {copied && (
              <span className="text-emerald-400 font-mono text-[11px]">
                Copiat în clipboard!
              </span>
            )}
          </div>

          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
            Textul cererii dumneavoastră a fost structurat conform cerințelor GDPR. Pentru a trimite cererea către departamentul de confidențialitate, puteți deschide clientul dumneavoastră de e-mail sau copia textul de mai jos.
          </p>

          <pre className="p-4 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] whitespace-pre-wrap overflow-x-auto">
            {formattedRequestText}
          </pre>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={`mailto:?subject=${mailtoSubject}&body=${mailtoBody}`}
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono px-5 py-2.5 rounded-xl transition shadow"
            >
              Deschide în Clientul de E-mail →
            </a>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(formattedRequestText);
                setCopied(true);
              }}
              className="bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border)] text-xs font-mono px-4 py-2.5 rounded-xl transition"
            >
              Copiază Textul Cererii
            </button>
          </div>
        </div>
      )}

      {/* Identity Verification Notice */}
      <div className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] space-y-2 font-mono">
        <span className="font-bold text-[var(--color-text-primary)] block">
          PROCEDURĂ DE VERIFICARE A IDENTITĂȚII
        </span>
        <p className="font-sans text-xs leading-relaxed">
          În conformitate cu Art. 12(6) GDPR, pentru a preveni divulgarea neautorizată a datelor personale către terți, operatorul poate solicita informații suplimentare necesare pentru confirmarea identității solicitantului înainte de a da curs cererii.
        </p>
      </div>
    </div>
  );
}

