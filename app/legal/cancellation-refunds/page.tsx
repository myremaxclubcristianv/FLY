import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Politica de Anulare și Rambursare — AIR",
  description:
    "Condițiile aplicabile anulării zborurilor private charter, restituirii sumelor achitate, costurilor operaționale nerecuperabile și anulărilor cauzate de vreme sau forță majoră.",
};

const TOC = [
  { id: "inainte-confirmare", label: "1. Anulare Înainte de Confirmarea Zborului" },
  { id: "dupa-confirmare", label: "2. Anulare După Confirmarea Contractuală" },
  { id: "grile-operatori", label: "3. Grile Tipice de Penalizare ale Operatorilor AOC" },
  { id: "costuri-nerecuperabile", label: "4. Costuri Operaționale Directe Nerecuperabile" },
  { id: "anulare-meteo", label: "5. Anulări din Motive Meteorologice & Forță Majoră" },
  { id: "procesare-plati", label: "6. Modalități de Plată & Mecanismul de Rambursare" },
];

export default function CancellationRefundsPage() {
  return (
    <LegalDocumentLayout
      titleRo="Politica de Anulare și Rambursare a Zborurilor"
      titleEn="Flight Cancellation & Refund Policy"
      documentNumber="DOC-06 // CANCELLATION-REFUNDS"
      category="POLITICĂ COMERCIALĂ"
      tableOfContents={TOC}
    >
      {/* 1. Inainte de confirmare */}
      <section id="inainte-confirmare" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          1. Anularea Înainte de Confirmarea Formală a Zborului
        </h2>
        <p>
          Orice solicitare de zbor aflată în stadiile <code>REQUESTED</code>, <code>SOURCING</code>, <code>QUOTES_RECEIVED</code>, <code>AIR_REVIEW</code> sau <code>PRESENTED</code> poate fi <strong>anulată în mod gratuit și necondiționat</strong> de către utilizator în orice moment, fără a suporta nicio penalitate sau cost financiar.
        </p>
      </section>

      {/* 2. Dupa confirmare */}
      <section id="dupa-confirmare" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Anularea După Confirmarea Contractuală (Status CONFIRMED)
        </h2>
        <p>
          Odată ce zborul a fost confirmat de client și contractat cu operatorul aerian (prin blocarea aeronavei și emiterea planului de zbor), anularea din inițiativa clientului este guvernată strict de <strong>grila de penalizare specificată în contractul de charter</strong> semnat cu operatorul respectiv.
        </p>
      </section>

      {/* 3. Grile tipice */}
      <section id="grile-operatori" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Structura Tipică a Grilelor de Anulare din Industria Aviației Private
        </h2>
        <p>
          Fiecare operator deține propria politică de anulare comunicată transparent în cotația detaliată. Orientativ, grilele standard aplicabile în aviația de afaceri europeană urmează următoarele eșaloane:
        </p>
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border border-[var(--color-border)] rounded-xl overflow-hidden font-mono">
            <thead className="bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] uppercase text-[10px]">
              <tr>
                <th className="p-3 border-b border-[var(--color-border)]">Intervalul Notificării Anulării</th>
                <th className="p-3 border-b border-[var(--color-border)]">Nivel Penalitate Standard</th>
                <th className="p-3 border-b border-[var(--color-border)]">Procent Rambursabil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-secondary)] font-sans">
              <tr>
                <td className="p-3 font-mono text-xs">Cu mai mult de 7 zile înainte de plecare</td>
                <td className="p-3 font-mono text-amber-500">10% – 20% (sau taxa administrativă)</td>
                <td className="p-3 font-mono text-emerald-400">80% – 90%</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">Între 7 zile și 48 de ore înainte de plecare</td>
                <td className="p-3 font-mono text-amber-500">30% – 50% din prețul total</td>
                <td className="p-3 font-mono text-amber-400">50% – 70%</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">Între 48 de ore și 24 de ore înainte de plecare</td>
                <td className="p-3 font-mono text-amber-500">70% – 80% din prețul total</td>
                <td className="p-3 font-mono text-amber-400">20% – 30%</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">Cu mai puțin de 24 de ore sau No-Show la plecare</td>
                <td className="p-3 font-mono text-red-400">100% din prețul total</td>
                <td className="p-3 font-mono text-neutral-500">0% (nerambursabil)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Costuri nerecuperabile */}
      <section id="costuri-nerecuperabile" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Costuri Operaționale Directe Nerecuperabile
        </h2>
        <p>
          Indiferent de momentul anulării, dacă operatorul a efectuat deja cheltuieli operaționale directe și irevocabile pentru misiune (cum ar fi: zborul de repoziționare a aeronavei către aeroportul de plecare, plata sloturilor speciale, permise de survol speciale sau comenzi de catering de lux), aceste sume sunt <strong>integral reținute din cuantumul rambursat</strong>.
        </p>
      </section>

      {/* 5. Anulari meteo */}
      <section id="anulare-meteo" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Anulări Cauzate de Vreme, Restricții ATC și Forță Majoră
        </h2>
        <p>
          În situația în care un zbor nu poate fi operat din considerente meteorologice ce depășesc limitele de siguranță ale aeronavei, restricții neprevăzute de spațiu aerian (NOTAM) sau forță majoră:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>Operatorul și AIR vor depune toate eforturile pentru reprogramarea zborului la o oră compatibilă cu programul pasagerilor;</li>
          <li>Dacă reprogramarea nu este acceptabilă sau posibilă, se va proceda la restituirea sumelor achitate, deducând exclusiv eventualele segmente de zbor deja efectuate și costurile directe nerecuperabile justificate cu documente.</li>
        </ul>
      </section>

      {/* 6. Procesare plati */}
      <section id="procesare-plati" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          6. Modalități de Plată și Procedura de Rambursare
        </h2>
        <div className="p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-2 text-xs">
          <span className="font-mono text-amber-500 font-bold block uppercase">
            INFORMARE PRIVIND DECONTĂRILE FINANCIARE:
          </span>
          <p className="font-sans text-[var(--color-text-secondary)] leading-relaxed">
            În faza operațională actuală, plățile pentru zborurile charter intermediate se realizează prin transfer bancar direct (ordin de plată / transfer SEPA sau SWIFT) în baza facturii proforme emise conform contractului. Eventualele rambursări aprobate se efectuează în același cont bancar din care s-a efectuat plata inițială, în termen de maximum 14 zile calendaristice de la data agreării rambursării.
          </p>
        </div>
      </section>
    </LegalDocumentLayout>
  );
}
