import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Declinare a Răspunderii Aeronautice — AIR",
  description:
    "Clarificarea statutului informativ al specificațiilor aeronavelor, autonomiei de zbor, calculelor de pistă și factorilor operaționali independenți de platformă.",
};

const TOC = [
  { id: "caracter-informativ", label: "1. Caracterul Informativ al Specificațiilor" },
  { id: "variabilitate", label: "2. Variabilitatea Performanțelor de Zbor" },
  { id: "factori-operationali", label: "3. Factori Operaționali & Decizia Echipajului" },
  { id: "piste-aeroporturi", label: "4. Lungimi de Pistă & Cerințe Aeroportuare" },
  { id: "autoritate-pic", label: "5. Autoritatea Suverană a Comandantului (PIC)" },
];

export default function AviationDisclaimerPage() {
  return (
    <LegalDocumentLayout
      titleRo="Declinare a Răspunderii privind Specificațiile Aeronautice"
      titleEn="Aviation Technical & Operational Disclaimer"
      documentNumber="DOC-04 // AVIATION-DISCLAIMER"
      category="DECLINARE OPERAȚIONALĂ"
      tableOfContents={TOC}
    >
      {/* 1. Caracter informativ */}
      <section id="caracter-informativ" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          1. Caracterul Informativ al Specificațiilor și Calculelor
        </h2>
        <p>
          Toate datele tehnice prezentate pe platforma AIR — incluzând, dar fără a se limita la: viteza de croazieră (TAS/Mach), autonomia maximă teoretică (Range NM/km), capacitatea standard de pasageri, volumul calelor de bagaje, plafonul de zbor și distanțele minime de decolare/aterizare — reprezintă <strong>valori de referință ale producătorilor aeronautici (OEM benchmarks)</strong>.
        </p>
        <p>
          Aceste date sunt furnizate exclusiv în scop informativ și comparativ și nu constituie o garanție fermă a performanței pentru un zbor anume.
        </p>
      </section>

      {/* 2. Variabilitate */}
      <section id="variabilitate" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Factori de Variabilitate a Performanței Reale
        </h2>
        <p>Autonomia și durata reală a oricărui zbor privat depind direct de:</p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>Configurația specifică a cabinei și masa aeronavei:</strong> variații între numerele de serie ale aceluiași model de aeronavă;</li>
          <li><strong>Masa încărcăturii utile (Payload):</strong> numărul real de pasageri, greutatea bagajelor și a echipamentului de bord;</li>
          <li><strong>Condițiile meteorologice reale pe rută:</strong> viteza și direcția curenților de aer de mare altitudine (Jetstream / Headwind / Tailwind), temperaturi la nivelul solului și presiune atmosferică;</li>
          <li><strong>Rutele de navigație aeriană (ATC routings):</strong> devieri de la traseul ortodromic direct impuse de Eurocontrol sau autoritățile naționale de control al traficului aerian;</li>
          <li><strong>Rezervele obligatorii de combustibil (Fuel Reserves):</strong> cerințele legale EASA pentru combustibil de rezervă, zbor de așteptare (holding) și rutare către aeroporturi de rezervă (alternate airports).</li>
        </ul>
      </section>

      {/* 3. Factori operationali */}
      <section id="factori-operationali" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Factori Operaționali și Restricții Aeroportuare
        </h2>
        <p>
          Posibilitatea executării unui zbor către un anumit aeroport sau heliport este condiționată de:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>Alocarea sloturilor de decolare și aterizare (Airport Slots) de către autoritățile aeroportuare;</li>
          <li>Orarul oficial de funcționare a aeroportului (Airport Operating Hours) și restricțiile de zgomot pe timp de noapte (Curfews);</li>
          <li>Disponibilitatea serviciilor de salvare și stingere a incendiilor (RFFS Category) adecvate categoriei aeronavei;</li>
          <li>Condițiile de degivrare (De-icing) și disponibilitatea spațiului de parcare pe platforma aeroportuară (Apron Parking Clearance).</li>
        </ul>
      </section>

      {/* 4. Piste */}
      <section id="piste-aeroporturi" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Lungimi de Pistă și Calcule de Performanță la Decolare/Aterizare
        </h2>
        <p>
          Distanța de decolare necesară (Take-off Distance Required - TODR) și distanța de aterizare (Landing Distance Required - LDR) variază semnificativ în funcție de altitudinea aeroportului (Density Altitude), panta pistei, starea suprafeței pistei (uscată, umedă, contaminată cu zăpadă/gheață) și componenta de vânt. Doar dispeceratul de zbor al operatorului aerian și echipajul tehnic pot efectua calculul oficial de performanță aprobat.
        </p>
      </section>

      {/* 5. Autoritatea PIC */}
      <section id="autoritate-pic" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Autoritatea Suverană a Comandantului de Echipaj (PIC)
        </h2>
        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs font-mono space-y-2">
          <strong className="text-amber-500 block">PRINCIPIU AERONAUTIC FUNDAMENTAL (EASA PART-CAT):</strong>
          <p className="font-sans text-xs leading-relaxed text-[var(--color-text-secondary)]">
            Comandantul de aeronavă (Pilot in Command - PIC) deține autoritatea legală și operațională finală și absolută în privința pregătirii, inițierii, continuării, devierii sau anulării oricărui zbor din considerente ce țin de siguranța pasagerilor, a echipajului și a aeronavei. Nicio recomandare sau estimare generată de platforma AIR nu poate prevala asupra deciziei PIC.
          </p>
        </div>
      </section>
    </LegalDocumentLayout>
  );
}
