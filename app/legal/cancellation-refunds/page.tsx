import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { LEGAL_CONFIG } from "@/lib/config/legal";

export const metadata: Metadata = {
  title: "Politica de Anulare și Rambursare — AIR",
  description:
    "Condițiile aplicabile anulării solicitărilor de zbor, dependența de contractul operatorului aerian AOC și transparența privind lipsa procesării plăților online pe website.",
};

const TOC = [
  { id: "solicitari-necontractate", label: "1. Solicitări Aflate în Curs de Căutare (Necontractate)" },
  { id: "contract-operator", label: "2. Anulare După Confirmarea Contractuală (Status CONFIRMED)" },
  { id: "costuri-operationale", label: "3. Costuri Operaționale Directe ale Operatorului" },
  { id: "siguranta-meteo", label: "4. Anulări Operaționale, Vreme & Forță Majoră" },
  { id: "statut-plati", label: "5. Statutul Procesării Plăților & Absența Decontărilor Online" },
];

export default function CancellationRefundsPage() {
  return (
    <LegalDocumentLayout
      titleRo="Politica de Anulare și Informare Privind Rambursările"
      titleEn="Cancellation & Refund Informational Framework"
      documentNumber="DOC-06 // CANCELLATION-REFUNDS"
      category="POLITICĂ COMERCIALĂ"
      tableOfContents={TOC}
    >
      {/* 1. Solicitari necontractate */}
      <section id="solicitari-necontractate" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          1. Solicitări de Zbor Aflate în Curs de Căutare (Necontractate)
        </h2>
        <p>
          Orice căutare sau solicitare de explorare operațională aflată în stadiile <code>REQUESTED</code>, <code>SOURCING</code>, <code>QUOTES_RECEIVED</code>, <code>AIR_REVIEW</code> sau <code>PRESENTED</code> nu generează obligații financiare de plată și poate fi abandonată sau anulată de către utilizator în orice moment, fără perceperea vreunui tarif de platformă.
        </p>
      </section>

      {/* 2. Contract operator */}
      <section id="contract-operator" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Anulare După Confirmarea Contractuală (Status CONFIRMED)
        </h2>
        <p>
          Odată ce o misiune a fost confirmată formal de către client și contractată cu operatorul aerian titular de Certificat de Operator Aerian (AOC), <strong>condițiile de anulare, termenele de notificare și eventualele drepturi sau rețineri financiare sunt guvernate exclusiv de contractul de charter încheiat cu respectivul operator aerian</strong>.
        </p>
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
          AIR nu stabilește grile arbitrare de penalizare și nu promite rambursări în nume propriu. Condițiile contractuale specifice fiecărui operator și fiecărei aeronave sunt comunicate transparent clientului înainte de confirmarea și semnarea contractului de transport.
        </p>
      </section>

      {/* 3. Costuri operationale */}
      <section id="costuri-operationale" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Costuri Operaționale Directe ale Operatorului Aerian
        </h2>
        <p>
          În aviația privată comercială, în funcție de momentul notificării anulării și de specificul misiunii, contractele operatorilor aerieni pot prevedea reținerea cheltuielilor operaționale deja angajate irevocabil, cum ar fi:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>Zboruri de poziționare a aeronavei către aeroportul de plecare (ferry flights deja efectuate sau inițiate);</li>
          <li>Taxe de slot aeroportuar, permise speciale de survol sau taxe de prelungire a orarului FBO;</li>
          <li>Servicii dedicate de catering VIP, handling special sau degivrare (de-icing) comandate ferm.</li>
        </ul>
        <p className="text-xs text-[var(--color-text-muted)] font-mono">
          Aceste aspecte sunt reglementate individual în contractul de charter aferent fiecărui zbor.
        </p>
      </section>

      {/* 4. Siguranta si meteo */}
      <section id="siguranta-meteo" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Anulări din Motive de Siguranță, Condiții Meteorologice & Forță Majoră
        </h2>
        <p>
          Siguranța zborului este prioritatea absolută. În situația în care un zbor nu poate fi operat din cauza condițiilor meteo sub minimele de siguranță ale aeronavei, restricțiilor emise de controlul traficului aerian (ATC / NOTAM) sau forței majore:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>Comandantul de echipaj (Pilot in Command - PIC) deține autoritatea legală finală privind decizia de operare;</li>
          <li>Reprogramarea zborului sau soluționarea contractuală a misiunii se realizează în conformitate strictă cu clauzele stipulate în contractul de charter emis de operatorul aerian;</li>
          <li>AIR acordă asistență de conciergerie operațională pentru identificarea soluțiilor alternative compatibile.</li>
        </ul>
      </section>

      {/* 5. Statut plati */}
      <section id="statut-plati" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Statutul Procesării Plăților & Absența Decontărilor Online pe Website
        </h2>
        <div className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-amber-500/30 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-amber-500 font-mono font-bold uppercase tracking-wider">
            <span>⚠ {LEGAL_CONFIG.payment.status}</span>
          </div>
          <p className="font-sans text-[var(--color-text-secondary)] leading-relaxed">
            {LEGAL_CONFIG.payment.disclosure}
          </p>
          <p className="font-sans text-[var(--color-text-muted)] leading-relaxed">
            Acest website nu colectează date de card bancar și nu procesează tranzacții sau rambursări financiare directe. Orice decontare comercială și eventuală rambursare aprobată conform contractului de transport se derulează exclusiv prin canalele financiare oficiale stabilite direct între părțile contractante înainte de zbor.
          </p>
        </div>
      </section>
    </LegalDocumentLayout>
  );
}

