import { Metadata } from "next";
import Link from "next/link";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { LEGAL_CONFIG } from "@/lib/config/legal";

export const metadata: Metadata = {
  title: "Termeni și Condiții Generale — AIR",
  description:
    "Termenii și condițiile de utilizare a platformei AIR, solicitările de cotații de zbor privat, responsabilitățile părților și statutul juridic al operatorilor aerieni.",
};

const TOC = [
  { id: "preambul", label: "1. Preambul & Statutul AIR" },
  { id: "servicii", label: "2. Obiectul Serviciilor Platformei" },
  { id: "cotatii", label: "3. Tipuri de Cotații & Disponibilitate" },
  { id: "operatori", label: "4. Răspunderea Operatorilor Aerieni (AOC)" },
  { id: "utilizator", label: "5. Obligațiile & Răspunderea Utilizatorului" },
  { id: "preturi", label: "6. Prețuri, Monedă & Taxe Operaționale" },
  { id: "plati", label: "7. Statutul Plăților pe Website" },
  { id: "confirmare", label: "8. Procesul de Confirmare a Zborului" },
  { id: "anulare", label: "9. Anulări & Rambursări" },
  { id: "raspundere", label: "10. Limitarea Răspunderii AIR" },
  { id: "proprietate", label: "11. Proprietate Intelectuală & Mărci" },
  { id: "lege", label: "12. Legea Aplicabilă & Jurisdicție" },
];

export default function TermsPage() {
  return (
    <LegalDocumentLayout
      titleRo="Termeni și Condiții Generale de Utilizare"
      titleEn="General Terms & Conditions of Platform Use"
      documentNumber="DOC-01 // TERMS"
      category="TERMENI CONTRACTUALI"
      tableOfContents={TOC}
    >
      {/* 1. Preambul */}
      <section id="preambul" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          1. Preambul și Statutul Juridic al Platformei AIR
        </h2>
        <p>
          Prezentele Condiții Generale reglementează accesul și utilizarea platformei digitale <strong>AIR</strong> (accesibilă prin interfața web și aplicațiile asociate), operată de entitatea <strong>{LEGAL_CONFIG.entity.legalName}</strong>, denumită în continuare „<strong>AIR</strong>” sau „<strong>Platforma</strong>”.
        </p>
        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs font-mono space-y-2">
          <strong className="text-amber-500 block">CLAUZĂ STATUTARĂ OBLIGATORIE (NON-CARRIER DISCLOSURE):</strong>
          <p className="font-sans text-xs leading-relaxed text-[var(--color-text-secondary)]">
            {LEGAL_CONFIG.carrierDisclosure}
          </p>
        </div>
      </section>

      {/* 2. Obiectul Serviciilor */}
      <section id="servicii" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Obiectul și Domeniul de Aplicare al Serviciilor
        </h2>
        <p>
          AIR oferă utilizatorilor săi o suită digitală de instrumente de analiză aeronautică, decizie și asistență de conciergerie privată, permițând:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>Configurarea parametrilor de misiune (origine, destinație, dată, număr pasageri, preferințe de confort și bagaje);</li>
          <li>Generarea de recomandări algoritmice obiective privind categoriile și modelele optime de aeronave (avioane private ușoare, medii, ultra-long range, turbopropulsoare și elicoptere);</li>
          <li>Transmiterea solicitărilor de explorare operațională către operatori aerieni autorizați independenți;</li>
          <li>Centralizarea și compararea cotațiilor oficiale primite de la operatori;</li>
          <li>Asistență prin biroul operațional (Flight Desk) pentru facilitarea transmiterii opțiunilor către clienți.</li>
        </ul>
      </section>

      {/* 3. Tipuri de Cotații & Disponibilitate */}
      <section id="cotatii" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Natura Cotațiilor și Rigurozitatea Disponibilității
        </h2>
        <p>
          Afișarea sau catalogarea oricărei aeronave sau a oricărui operator pe platforma AIR nu constituie o garanție a disponibilității imediate a aeronavei pentru o anumită dată sau rută.
        </p>
        <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs font-mono space-y-1 text-amber-500">
          <div>• Existența unui operator în baza de date ≠ Disponibilitate operațională confirmată</div>
          <div>• Existența unei aeronave în catalog ≠ Aeronava este liberă pentru zbor</div>
          <div>• Deținerea unui AOC de către operator ≠ Autorizație de zbor acordată automat pe rută</div>
          <div>• Solicitare înregistrată (REQUESTED) ≠ Rezervare (Booking)</div>
          <div>• Cotație primită (QUOTES_RECEIVED) ≠ Zbor confirmat (CONFIRMED)</div>
        </div>
      </section>

      {/* 4. Răspunderea Operatorilor */}
      <section id="operatori" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Răspunderea Operatorilor Aerieni Autorizați (AOC)
        </h2>
        <p>
          Zborul efectiv, siguranța operațională, calificarea echipajului, starea tehnică a aeronavei și executarea serviciului de transport aerian sunt în responsabilitatea exclusivă a operatorului aerian titular al AOC-ului indicat în cotația acceptată.
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          Executarea fiecărui zbor este supusă normelor aeronautice aplicabile (EASA Part-CAT / Regulamentele autorității naționale de aviație), condițiilor meteorologice, restricțiilor de trafic aerian (ATC), alocării sloturilor de decolare/aterizare și deciziei suverane a comandantului de echipaj (Pilot in Command - PIC) în privința siguranței zborului.
        </p>
      </section>

      {/* 5. Obligațiile Utilizatorului */}
      <section id="utilizator" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Obligațiile și Răspunderea Utilizatorului
        </h2>
        <p>Utilizatorul este pe deplin responsabil pentru:</p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>Furnizarea de informații exacte, complete și conforme cu documentele oficiale de călătorie ale pasagerilor;</li>
          <li>Respectarea normelor vamale, sanitare și de imigrare aplicabile în țările de plecare, tranzit și destinație;</li>
          <li>Declararea corectă a greutății și dimensiunilor bagajelor în limitele specifice modelului de aeronavă rezervat;</li>
          <li>Respectarea strictă a reglementărilor privind bunurile periculoase (Dangerous Goods / IATA DGR) și interdicția transportului de substanțe ilegale;</li>
          <li>Prezența pasagerilor la terminalul general aviation / FBO în intervalul agreat înainte de ora programată de decolare.</li>
        </ul>
      </section>

      {/* 6. Prețuri & Taxe */}
      <section id="preturi" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          6. Prețuri, Monedă și Taxe Operaționale Adiționale
        </h2>
        <p>
          Toate prețurile indicative sunt exprimate în Euro (EUR), cu excepția cazului în care se specifică altfel. Cotațiile ferme emise de operatori includ elementele convenite în propunerea comercială specifică.
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          Costurile variabile ce nu pot fi determinate anticipat (precum degivrarea/de-icing aeronavei în sezonul rece, taxe de prelungire program aeroport peste orele standard de operare sau servicii speciale solicitate ulterior) vor fi reglementate conform contractului de transport al operatorului.
        </p>
      </section>

      {/* 7. Plati */}
      <section id="plati" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          7. Statutul Plăților pe Website
        </h2>
        <div className="p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-2 text-xs">
          <strong className="text-amber-500 font-mono uppercase block">
            TRANSPARENȚĂ FINANCIARĂ: {LEGAL_CONFIG.payment.status}
          </strong>
          <p className="font-sans text-[var(--color-text-secondary)] leading-relaxed">
            {LEGAL_CONFIG.payment.disclosure}
          </p>
        </div>
      </section>

      {/* 8. Confirmare */}
      <section id="confirmare" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          8. Procesul de Confirmare a Zborului
        </h2>
        <p>
          Transmiterea unei solicitări prin intermediul AIR <strong>nu constituie o rezervare fermă</strong>. Zborul devine confirmat (status <code>CONFIRMED</code>) exclusiv în momentul îndeplinirii cumulative a următoarelor condiții:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>Verificarea tehnică și operațională a disponibilității operatorului AOC;</li>
          <li>Prezentarea cotației oficiale validate către client;</li>
          <li>Acceptarea formală a termenilor contractuali ai operatorului de către client;</li>
          <li>Încheierea contractului de transport aerian cu operatorul aerian titular de AOC și îndeplinirea condițiilor de plată agreate.</li>
        </ol>
      </section>

      {/* 9. Anulări */}
      <section id="anulare" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          9. Politica de Anulări și Rambursări
        </h2>
        <p>
          Condițiile de anulare și eventualele consecințe financiare sunt reglementate în documentul dedicat{" "}
          <Link href="/legal/cancellation-refunds" className="text-amber-500 underline font-mono">
            Politica de Anulare și Rambursare
          </Link>{" "}
          și în contractul direct de charter încheiat cu operatorul aerian titular de AOC.
        </p>
      </section>

      {/* 10. Limitarea Răspunderii */}
      <section id="raspundere" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          10. Limitarea Răspunderii Platformei
        </h2>
        <p>
          În limitele permise de legislația aplicabilă, AIR nu este transportator aerian și nu răspunde pentru întârzieri, devieri, reprogramări sau anulări cauzate de condiții meteo nefavorabile, decizii de control al traficului aerian (ATC), sloturi aeroportuare, forță majoră sau fapte ale terților furnizori de servicii aeroportuare și operatori aerieni independenți.
        </p>
      </section>

      {/* 11. Proprietate Intelectuală */}
      <section id="proprietate" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          11. Proprietate Intelectuală și Mărci
        </h2>
        <p>
          Denumirea „AIR” este un nume comercial și de brand utilizat de entitatea operatoare a platformei. Elementele grafice, codul sursă, algoritmii de optimizare și conținutul editorial sunt protejate conform legii. Mărcile comerciale ale producătorilor de aeronave (Embraer, Bombardier, Gulfstream, Cessna, Pilatus, Dassault, Airbus, Leonardo, Bell etc.) aparțin titularilor de drept și sunt menționate exclusiv în scop informativ și descriptiv.
        </p>
      </section>

      {/* 12. Legea Aplicabilă */}
      <section id="lege" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          12. Legea Aplicabilă și Jurisdicție
        </h2>
        <p>
          {LEGAL_CONFIG.regulatory.governingLaw}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          {LEGAL_CONFIG.regulatory.competentCourts}
        </p>
      </section>
    </LegalDocumentLayout>
  );
}

