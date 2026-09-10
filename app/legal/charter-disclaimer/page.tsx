import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { LEGAL_CONFIG } from "@/lib/config/legal";

export const metadata: Metadata = {
  title: "Declinare Cotații și Rezervări Charter — AIR",
  description:
    "Clarificarea etapelor de rezervare a zborurilor charter private: diferența dintre solicitare, cotație indicativă, ofertă fermă și confirmarea contractuală.",
};

const TOC = [
  { id: "statut-cerere", label: "1. Solicitarea de Zbor nu este o Rezervare" },
  { id: "etape", label: "2. Ciclul de Viață al Misiunii (Lifecycle State Machine)" },
  { id: "validitate-oferte", label: "3. Valabilitatea Ofertelor & Condiție Suspensivă" },
  { id: "contract-charter", label: "4. Contractul Direct de Charter Aerian cu Operatorul AOC" },
  { id: "statut-financiar", label: "5. Statutul Financiar & Absența Plăților Directe pe Site" },
];

export default function CharterDisclaimerPage() {
  return (
    <LegalDocumentLayout
      titleRo="Declinare Cotații și Rezervări Charter"
      titleEn="Charter Quotation & Flight Confirmation Disclaimer"
      documentNumber="DOC-05 // CHARTER-DISCLAIMER"
      category="DECLINARE CONTRACTUALĂ"
      tableOfContents={TOC}
    >
      {/* 1. Statut cerere */}
      <section id="statut-cerere" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          1. Transmiterea unei Solicitări nu Constituie o Rezervare Fermă
        </h2>
        <p>
          Utilizarea configuratorului de misiune (AIR Mission Planner) și transmiterea preferințelor de zbor generează exclusiv o <strong>solicitare de explorare operațională și cotație</strong>. Nicio obligație financiară și nicio rezervare fermă de aeronavă nu iau naștere prin simpla trimitere a formularului de căutare.
        </p>
      </section>

      {/* 2. Etape */}
      <section id="etape" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Etapele Riguroase ale Ciclului de Viață al Misiunii
        </h2>
        <p>
          Platforma AIR operează un flux transparent structurat în 6 stadii clare:
        </p>
        <div className="space-y-3 pt-2 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <span className="text-amber-500 font-bold block mb-1">01 // REQUESTED (Solicitare Înregistrată)</span>
            <p className="font-sans text-[var(--color-text-secondary)]">Cererea a fost înregistrată local cu identificator unic AIR. Nu implică nicio obligație financiară.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <span className="text-amber-500 font-bold block mb-1">02 // SOURCING (Căutare Activă în Flote AOC)</span>
            <p className="font-sans text-[var(--color-text-secondary)]">Dispeceratul AIR interoghează operatorii autorizați independenți compatibili cu ruta solicitată.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <span className="text-amber-500 font-bold block mb-1">03 // QUOTES_RECEIVED (Cotații Primite de la Operatori)</span>
            <p className="font-sans text-[var(--color-text-secondary)]">Ofertele primite de la operatorii independenți sunt centralizate pentru evaluare.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <span className="text-amber-500 font-bold block mb-1">04 // AIR_REVIEW (Audit Tehnic & Siguranță)</span>
            <p className="font-sans text-[var(--color-text-secondary)]">Se verifică validitatea AOC-ului, compatibilitatea pistei și cerințele operaționale ale zborului.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-amber-500/30">
            <span className="text-amber-400 font-bold block mb-1">05 // PRESENTED (Cotații Prezentate Clientului)</span>
            <p className="font-sans text-[var(--color-text-secondary)]">Ofertele validate sunt transmise clientului pentru consultare și eventuală selecție.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block mb-1">06 // CONFIRMED (Zbor Confirmat Contractual)</span>
            <p className="font-sans text-[var(--color-text-secondary)]">Clientul a acceptat oferta fermă, a semnat contractul de charter cu operatorul aerian și a achitat serviciul.</p>
          </div>
        </div>
      </section>

      {/* 3. Validitate */}
      <section id="validitate-oferte" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Valabilitatea Ofertelor și Condiție Suspensivă
        </h2>
        <p>
          Orice cotație de preț emisă de un operator are un termen determinat de valabilitate. Până la semnarea efectivă a contractului și blocarea aeronavei, capacitatea de zbor rămâne disponibilă pe piața liberă a aviației private (principiul disponibilității fluctuante).
        </p>
      </section>

      {/* 4. Contract charter */}
      <section id="contract-charter" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Încheierea Contractului Direct de Transport Aerian cu Operatorul AOC
        </h2>
        <p>
          La acceptarea unei oferte din platformă, zborul se contractează direct între client și operatorul aerian comercial autorizat deținător de AOC. AIR acționează exclusiv ca platformă tehnologică de căutare, decizie și conciergerie aeronautică.
        </p>
      </section>

      {/* 5. Statut financiar */}
      <section id="statut-financiar" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Statutul Financiar & Absența Plăților Directe pe Site
        </h2>
        <div className="p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-2 text-xs">
          <strong className="text-amber-500 font-mono uppercase block">
            {LEGAL_CONFIG.payment.status}
          </strong>
          <p className="font-sans text-[var(--color-text-secondary)] leading-relaxed">
            {LEGAL_CONFIG.payment.disclosure}
          </p>
        </div>
      </section>
    </LegalDocumentLayout>
  );
}

