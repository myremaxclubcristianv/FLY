import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { LEGAL_CONFIG } from "@/lib/config/legal";

export const metadata: Metadata = {
  title: "Proprietate Intelectuală & Mărci Comerciale — AIR",
  description:
    "Statutul de brand al AIR, protecția software-ului, algoritmilor de decizie, conținutului editorial și recunoașterea mărcilor comerciale ale producătorilor de aeronave.",
};

const TOC = [
  { id: "proprietate-air", label: "1. Statutul Mărcii & Drepturile Platformei AIR" },
  { id: "software-algoritmi", label: "2. Software, Algoritmi & Baze de Date" },
  { id: "continut-editorial", label: "3. Conținut Editorial & Materiale Vizuale" },
  { id: "marci-terte", label: "4. Mărci Comerciale Terțe (Producători Aeronautici)" },
  { id: "utilizare-neautorizata", label: "5. Interdicția Extragerii Neautorizate (Anti-Scraping)" },
];

export default function IntellectualPropertyPage() {
  return (
    <LegalDocumentLayout
      titleRo="Proprietate Intelectuală & Mărci Comerciale"
      titleEn="Intellectual Property & Trademark Framework"
      documentNumber="DOC-07 // INTELLECTUAL-PROPERTY"
      category="PROPRIETATE INTELECTUALĂ"
      tableOfContents={TOC}
    >
      {/* 1. Drepturi AIR */}
      <section id="proprietate-air" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          1. Statutul Mărcii și Drepturile Platformei AIR
        </h2>
        <p>
          Denumirea „<strong>AIR</strong>” reprezintă o denumire comercială și un brand utilizat de entitatea operatoare a platformei (<strong>{LEGAL_CONFIG.entity.legalName}</strong>).
        </p>
        <p>
          Elementele originale de identitate vizuală, structura grafică editorială, paleta de culori și conceptul de prezentare digitală a experiențelor aeronautice sunt protejate de legislația națională și internațională privind drepturile de autor și proprietatea industrială.
        </p>
      </section>

      {/* 2. Software & Algoritmi */}
      <section id="software-algoritmi" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Software, Cod Sursă, Algoritmi de Decizie și Baze de Date
        </h2>
        <p>
          Arhitectura platformei digitale, codul sursă, algoritmii de calcul și optimizare a opțiunilor de zbor (AIR Decision Engine), modelele de corelare tehnică a categoriilor de aeronave cu rutele aeroportuare și structura bazelor de date beneficiază de protecție conform Legii nr. 8/1996 privind dreptul de autor și drepturile conexe, precum și a Directivei Europene 96/9/CE privind protecția juridică a bazelor de date.
        </p>
      </section>

      {/* 3. Continut editorial */}
      <section id="continut-editorial" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Conținut Editorial și Materiale Vizuale
        </h2>
        <p>
          Eseurile editoriale, ghidurile de destinație, dosarele aeronautice privind Aeroportul București Băneasa (LRBS), analizele descriptive de flotă și compozițiile fotografice de prezentare sunt opere originale protejate. Este interzisă reproducerea, distribuirea sau republicarea acestora fără acordul scris prealabil al titularului drepturilor.
        </p>
      </section>

      {/* 4. Marci terte */}
      <section id="marci-terte" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Mărci Comerciale Terțe (Producători Aeronautici & Operatori AOC)
        </h2>
        <p>
          Denumirile comerciale și mărcile producătorilor de aeronave menționate pe platformă — incluzând, dar fără a se limita la: <strong>Embraer</strong> (Phenom, Praetor), <strong>Bombardier</strong> (Challenger, Global), <strong>Gulfstream</strong>, <strong>Dassault Aviation</strong> (Falcon), <strong>Cessna / Textron Aviation</strong> (Citation), <strong>Pilatus</strong> (PC-12, PC-24), <strong>Airbus</strong>, <strong>Leonardo</strong> și <strong>Bell</strong> — reprezintă mărcile înregistrate exclusive ale titularilor lor legali.
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          Prezentarea acestor modele pe platforma AIR se realizează exclusiv în scop descriptiv, de catalogare tehnică și informare comparativă a utilizatorilor, fără a revendica vreun drept de proprietate asupra respectivelor mărci. De asemenea, mărcile și denumirile operatorilor aerieni independenți aparțin deținătorilor de drept ai acestora.
        </p>
      </section>

      {/* 5. Interdictii */}
      <section id="utilizare-neautorizata" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Interdicția Extragerii și Reutilizării Neautorizate (Anti-Scraping)
        </h2>
        <p>
          Sunt strict interzise: extragerea automată sau sistematică a datelor (screen scraping, web scraping), copierea structurilor de baze de date, decompilarea codului sursă și crearea de servicii concurente utilizând datele agregate, textele sau logica de calcul dezvoltată de AIR.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}

