import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Declinare Cotații și Rezervări Charter — AIR",
  description:
    "Clarificarea etapelor de rezervare a zborurilor charter private: diferența dintre solicitare, cotație indicativă, ofertă fermă și confirmarea contractuală.",
};

const TOC = [
  { id: "statut-cerere", label: "1. Solicitarea de Zbor nu este o Rezervare" },
  { id: "etape", label: "2. Ciclul de Viață al Misiunii (State Machine)" },
  { id: "validitate-oferte", label: "3. Valabilitatea Ofertelor & Condiții Suspensivă" },
  { id: "contract-charter", label: "4. Contractul Direct de Charter Aerian" },
  { id: "preturi-finale", label: "5. Prețuri Finale & Ajustări Operaționale" },
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
          Utilizarea planificatorului de zbor (AIR Mission Planner) și completarea formularului de contact generează exclusiv o <strong>solicitare de explorare operațională și cotație</strong>. Nicio obligație de plată și nicio rezervare fermă de aeronavă nu iau naștere prin simpla trimitere a formularului.
        </p>
      </section>

      {/* 2. Etape */}
      <section id="etape" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Etapele Riguroase ale Ciclului de Viață al Misiunii
        </h2>
        <p>
          Platforma AIR operează un flux transparent în 6 stadii clare:
        </p>
        <div className="space-y-3 pt-2 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <span className="text-amber-500 font-bold block mb-1">01 // REQUESTED (Solicitare Înregistrată)</span>
            <p className="font-sans text-[var(--color-text-secondary)]">Cererea dumneavoastră a fost înregistrată cu identificator unic AIR. Nu există obligații financiare.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <span className="text-amber-500 font-bold block mb-1">02 // SOURCING (Căutare Activă în Flote AOC)</span>
            <p className="font-sans text-[var(--color-text-secondary)]">Dispeceratul AIR interoghează operatorii autorizați compatibili cu ruta și cerințele dumneavoastră.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <span className="text-amber-500 font-bold block mb-1">03 // QUOTES RECEIVED (Cotații Primite de la Operatori)</span>
            <p className="font-sans text-[var(--color-text-secondary)]">Ofertele primite de la operatori intră în faza de verificare tehnică prealabilă.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <span className="text-amber-500 font-bold block mb-1">04 // AIR REVIEW (Audit Tehnic & Siguranță)</span>
            <p className="font-sans text-[var(--color-text-secondary)]">AIR Flight Desk auditează conformitatea AOC, cerințele de pistă și timpii de serviciu ai echipajului.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-amber-500/30">
            <span className="text-amber-400 font-bold block mb-1">05 // PRESENTED (Cotații Prezentate Clientului)</span>
            <p className="font-sans text-[var(--color-text-secondary)]">Ofertele validate sunt afișate în contul clientului pentru analiză și selecție.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block mb-1">06 // CONFIRMED (Zbor Confirmat)</span>
            <p className="font-sans text-[var(--color-text-secondary)]">Clientul a acceptat oferta, a semnat contractul de charter și a îndeplinit condițiile de plată.</p>
          </div>
        </div>
      </section>

      {/* 3. Validitate */}
      <section id="validitate-oferte" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Valabilitatea Ofertelor și Condiții Suspensivă
        </h2>
        <p>
          Orice cotație fermă emisă de un operator are un <strong>termen limită de valabilitate</strong> (de regulă între 24 și 72 de ore de la emitere). Până la semnarea contractului și blocarea aeronavei, operatorul își rezervă dreptul de a vinde capacitatea de zbor către un alt client (piața de aviație privată funcționează pe principiul „first-come, first-served”).
        </p>
      </section>

      {/* 4. Contract charter */}
      <section id="contract-charter" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Încheierea Contractului Direct de Transport Aerian
        </h2>
        <p>
          La selectarea unei oferte din platformă, zborul se contractează conform termenilor contractuali emiși de operatorul aerian titular al AOC-ului indicat în ofertă. AIR asistă clientul în calitate de mandatar / platformă tehnologică de intermediere și conciergerie.
        </p>
      </section>

      {/* 5. Preturi finale */}
      <section id="preturi-finale" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Prețuri Finale și Ajustări Operaționale
        </h2>
        <p>
          Prețul confirmat acoperă parametrii specificați în contract. Orice modificare ulterioară cerută de client (modificare oră decolarare, adăugare pasageri suplimentari, schimbare aeroport de destinație) este supusă aprobării operatorului și recalculării eventualelor costuri adiționale.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
