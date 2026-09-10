import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { LEGAL_CONFIG } from "@/lib/config/legal";

export const metadata: Metadata = {
  title: "Proprietate Intelectuală & Drepturi de Autor — AIR",
  description:
    "Protecția mărcii AIR, software-ului, algoritmilor de decizie, conținutului editorial, bazei de date și recunoașterea mărcilor comerciale ale producătorilor de aeronave.",
};

const TOC = [
  { id: "proprietate-air", label: "1. Drepturile Exclusive ale Platformei AIR" },
  { id: "software-algoritmi", label: "2. Software, Algoritmi & Baze de Date" },
  { id: "continut-editorial", label: "3. Conținut Editorial & Fotografie Aeronautică" },
  { id: "marci-terte", label: "4. Mărci Comerciale Terțe (Producători & Operatori)" },
  { id: "utilizare-neautorizata", label: "5. Interdicția Extragerii & Reutilizării Neautorizate" },
];

export default function IntellectualPropertyPage() {
  return (
    <LegalDocumentLayout
      titleRo="Proprietate Intelectuală & Mărci Înregistrate"
      titleEn="Intellectual Property, Copyright & Trademark Notice"
      documentNumber="DOC-07 // INTELLECTUAL-PROPERTY"
      category="PROPRIETATE INTELECTUALĂ"
      tableOfContents={TOC}
    >
      {/* 1. Drepturi AIR */}
      <section id="proprietate-air" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          1. Drepturile Exclusive ale Platformei AIR
        </h2>
        <p>
          Denumirea „<strong>AIR</strong>”, elementele de identitate vizuală, logotipurile, sloganul „<em>The easiest way to fly</em>”, structura grafică editorială, paleta de culori și conceptul de prezentare a experiențelor aeronautice sunt protejate de legislația națională și internațională privind proprietatea industrială și dreptul de autor, aparținând <strong>{LEGAL_CONFIG.entity.legalName}</strong>.
        </p>
      </section>

      {/* 2. Software & Algoritmi */}
      <section id="software-algoritmi" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Software, Cod Sursă, Algoritmi de Decizie și Baze de Date
        </h2>
        <p>
          Arhitectura platformei digitale, codul sursă și compilat, algoritmii de calcul și optimizare a zborurilor (AIR Decision Engine), modelele de corelare a categoriilor de aeronave cu rutele aeroportuare și structura bazelor de date beneficiază de protecție integrală conform Legii nr. 8/1996 privind dreptul de autor și drepturile conexe, precum și a Directivei Europene 96/9/CE privind protecția juridică a bazelor de date.
        </p>
      </section>

      {/* 3. Continut editorial */}
      <section id="continut-editorial" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Conținut Editorial și Fotografie Aeronautică
        </h2>
        <p>
          Toate eseurile editoriale, ghidurile de destinație, dosarele aeronautice privind Aeroportul București Băneasa (LRBS), analizele de flotă și fotografiile de prezentare sunt opere originale protejate. Este strict interzisă reproducerea, distribuirea sau republicarea acestora fără acordul scris prealabil al titularului drepturilor.
        </p>
      </section>

      {/* 4. Marci terte */}
      <section id="marci-terte" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Mărci Comerciale Terțe (Producători Aeronautici & Operatori AOC)
        </h2>
        <p>
          Denumirile comerciale și mărcile producătorilor de aeronave menționate pe platformă — incluzând, dar fără a se limita la: <strong>Embraer</strong> (Phenom, Praetor), <strong>Bombardier</strong> (Challenger, Global), <strong>Gulfstream</strong>, <strong>Dassault Falcon</strong>, <strong>Cessna / Textron Aviation</strong> (Citation), <strong>Pilatus</strong> (PC-12, PC-24), <strong>Airbus Helicopters</strong>, <strong>Leonardo Helicopters</strong> și <strong>Bell</strong> — reprezintă mărcile înregistrate exclusive ale companiilor respective.
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          Prezentarea acestor modele pe platforma AIR se realizează strict în scop descriptiv, de catalogare tehnică și informare comparativă a utilizatorilor, fără a pretinde vreun drept de proprietate asupra respectivelor mărci. De asemenea, mărcile și denumirile operatorilor aerieni (precum <em>Ţiriac Air</em>, <em>Toyo Aviation</em>, <em>Regional Air Services</em>) aparțin deținătorilor legali ai acestora.
        </p>
      </section>

      {/* 5. Interdictii */}
      <section id="utilizare-neautorizata" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Interdicția Extragerii și Reutilizării Neautorizate (Anti-Scraping)
        </h2>
        <p>
          Sunt strict interzise: extragerea automată sau manuală a datelor (screen scraping, web scraping), copierea structurilor de baze de date, decompilarea codului sursă și crearea de produse derivate concurente utilizând datele, textele sau logica de calcul dezvoltată de AIR.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
