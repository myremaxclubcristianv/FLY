import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Politica de Utilizare Acceptabilă — AIR",
  description:
    "Standardele de conduită, cerințele de integritate ale solicitărilor de zbor, interdicțiile privind utilizarea frauduloasă și măsurile de securitate ale platformei AIR.",
};

const TOC = [
  { id: "principii", label: "1. Principii Generale & Integritate" },
  { id: "conduite-interzise", label: "2. Conduite și Acțiuni Strict Interzise" },
  { id: "cereri-frauduloase", label: "3. Interdicția Solicitărilor Frauduloase sau Speculative" },
  { id: "securitate-cibernetica", label: "4. Protecția Sistemelor & Securitate Cibernetică" },
  { id: "sanctiuni", label: "5. Măsuri de Suspendare & Sesizarea Autorităților" },
];

export default function AcceptableUsePage() {
  return (
    <LegalDocumentLayout
      titleRo="Politica de Utilizare Acceptabilă a Platformei"
      titleEn="Acceptable Use Policy & Platform Conduct Standards"
      documentNumber="DOC-08 // ACCEPTABLE-USE"
      category="POLITICĂ DE CONDUITĂ & SECURITATE"
      tableOfContents={TOC}
    >
      {/* 1. Principii */}
      <section id="principii" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          1. Principii Generale și Integritate Operațională
        </h2>
        <p>
          Platforma AIR este destinată exclusiv persoanelor fizice și juridice de bună-credință care doresc să planifice, să compare și să solicite servicii reale de aviație privată, charter de afaceri și conciergerie aeronautică.
        </p>
      </section>

      {/* 2. Conduite interzise */}
      <section id="conduite-interzise" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Conduite și Acțiuni Strict Interzise
        </h2>
        <p>Este strict interzis utilizatorilor:</p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>Să utilizeze platforma în scopuri ilegale, contrare ordinii publice sau bunelor moravuri;</li>
          <li>Să transmită date false, fictive sau înșelătoare privind identitatea pasagerilor, documentele de călătorie sau natura zborului;</li>
          <li>Să solicite transportul de bunuri periculoase nedeclarate, substanțe interzise, armament neautorizat sau mărfuri de contrabandă;</li>
          <li>Să se dea drept o altă persoană fizică sau reprezentant neautorizat al unei companii (impersonare frauduloasă);</li>
          <li>Să eludeze procedurile oficiale de verificare și aprobare ale dispeceratului de zbor.</li>
        </ul>
      </section>

      {/* 3. Cereri frauduloase */}
      <section id="cereri-frauduloase" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Interdicția Solicitărilor Frauduloase, Abuzive sau Speculative
        </h2>
        <p>
          Generarea repetată de solicitări fictive de zbor fără intenție reală de contractare (spam de solicitări, testare automată abuzivă) suprasolicită dispeceratul operațional și resursele operatorilor aerieni parteneri. AIR își rezervă dreptul de a bloca instantaneu accesul conturilor care manifestă astfel de comportamente abuzive.
        </p>
      </section>

      {/* 4. Securitate cibernetica */}
      <section id="securitate-cibernetica" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Protecția Sistemelor și Securitate Cibernetică
        </h2>
        <p>Sunt strict interzise:</p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>Lansarea de atacuri cibernetice (DDoS, SQL injection, XSS, brute-force asupra mecanismelor de autentificare);</li>
          <li>Sondarea vulnerabilităților sau testarea neautorizată a securității fără acord scris prealabil (Responsible Disclosure);</li>
          <li>Utilizarea de boți, scripturi automate sau instrumente de scraping pentru interogarea masivă a platformei;</li>
          <li>Încercarea de a accesa datele altor utilizatori sau consolele interne de administrare operațională.</li>
        </ul>
      </section>

      {/* 5. Sanctiuni */}
      <section id="sanctiuni" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Măsuri de Suspendare, Reziliere și Sesizarea Autorităților
        </h2>
        <p>
          Încălcarea prezentei politici atrage după sine suspendarea imediată a contului, anularea oricăror solicitări în curs și, după caz, sesizarea organelor de urmărire penală și a autorităților aeronautice competente pentru investigarea tentativelor de fraudă sau compromitere a securității aviației civile.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
