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
  { id: "confirmare", label: "7. Procesul de Confirmare a Zborului" },
  { id: "anulare", label: "8. Anulări & Rambursări" },
  { id: "raspundere", label: "9. Limitarea Răspunderii AIR" },
  { id: "proprietate", label: "10. Proprietate Intelectuală" },
  { id: "lege", label: "11. Legea Aplicabilă & Jurisdicție" },
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
          Prezentele Condiții Generale reglementează accesul și utilizarea platformei digitale <strong>AIR</strong> (accesibilă prin interfața web și aplicațiile asociate), operată de <strong>{LEGAL_CONFIG.entity.legalName}</strong>, cu sediul în {LEGAL_CONFIG.entity.registeredOffice}, denumită în continuare „<strong>AIR</strong>” sau „<strong>Platforma</strong>”.
        </p>
        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs font-mono space-y-2">
          <strong className="text-amber-500 block">CLAUZĂ STATUTARĂ OBLIGATORIE:</strong>
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
          AIR oferă utilizatorilor săi o suită avansată de instrumente digitale de decizie aeronautică și conciergerie privată, permițând:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>Configurarea parametrilor de misiune (origine, destinație, dată, număr pasageri, preferințe de confort și bagaje);</li>
          <li>Generarea de recomandări algoritmice obiective privind categoriile și modelele optime de aeronave (avioane private ușoare, medii, ultra-long range, turbopropulsoare și elicoptere);</li>
          <li>Trimiterea solicitărilor de cotație către rețeaua de operatori aerieni autorizați;</li>
          <li>Centralizarea și compararea cotațiilor oficiale primite de la operatori;</li>
          <li>Asistență prin biroul operațional (Flight Operations Desk) pentru coordonarea detaliilor de handling VIP, acces FBO și servicii conexe la sol.</li>
        </ul>
      </section>

      {/* 3. Tipuri de Cotații */}
      <section id="cotatii" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Natura Cotațiilor și Absența Disponibilității Automate
        </h2>
        <p>
          Afișarea oricărei aeronave sau a oricărui operator pe platforma AIR nu constituie o garanție a disponibilității imediate a aeronavei pentru data sau ruta solicitată.
        </p>
        <div className="grid gap-3 pt-2">
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs space-y-1">
            <span className="font-mono text-amber-500 font-bold block">01 // STATUS „REQUEST”</span>
            <p className="font-sans">
              Misiunea a fost înregistrată în sistem. Nu există o cotație de preț validată; solicitarea este transmisă operatorilor compatibili pentru ofertare.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs space-y-1">
            <span className="font-mono text-amber-500 font-bold block">02 // STATUS „INDICATIVE”</span>
            <p className="font-sans">
              Valoare estimativă calculată pe baza mediei de cost orar istoric și a distanțelor ortodromice. Are caracter exclusiv informativ și nu obligă contractual nicio parte.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs space-y-1">
            <span className="font-mono text-emerald-400 font-bold block">03 // STATUS „LIVE”</span>
            <p className="font-sans">
              Cotație fermă emisă de un operator deținător de AOC, valabilă pentru intervalul de timp specificat în ofertă și condiționată de alocarea sloturilor aeroportuare și semnarea contractului de charter.
            </p>
          </div>
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
          Executarea fiecărui zbor este supusă normelor aeronautice aplicabile (EASA Part-CAT / Regulamentele AACR), condițiilor meteorologice, restricțiilor de trafic aerian (ATC), alocării sloturilor de decolare/aterizare și deciziei suverane a comandantului de echipaj (Pilot in Command - PIC) în privința siguranței zborului.
        </p>
      </section>

      {/* 5. Obligațiile Utilizatorului */}
      <section id="utilizator" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Obligațiile și Răspunderea Utilizatorului
        </h2>
        <p>Utilizatorul este pe deplin responsabil pentru:</p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>Furnizarea de informații exacte, complete și conforme cu documentele de călătorie (pașapoarte, cărți de identitate, vize valabile);</li>
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
          Toate prețurile sunt exprimate în Euro (EUR), cu excepția cazului în care se specifică altfel. Cotațiile ferme includ, de regulă, costul de operare al aeronavei, combustibilul de bază, echipajul și handlingul standard FBO.
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          Costurile variabile ce nu pot fi determinate anticipat (precum degivrarea/de-icing aeronavei în sezonul rece, taxe de prelungire program aeroport peste orele de operare, catering special sau transport terestru VIP nereglementat) vor fi facturate conform tarifelor reale comunicate de operator.
        </p>
      </section>

      {/* 7. Confirmare */}
      <section id="confirmare" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          7. Procesul de Confirmare a Zborului
        </h2>
        <p>
          Transmiterea unei solicitări prin intermediul AIR <strong>nu constituie o rezervare fermă</strong>. Zborul devine confirmat (status <code>CONFIRMED</code>) exclusiv în momentul îndeplinirii cumulative a următoarelor:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>Validarea de către AIR Flight Desk a disponibilității operatorului;</li>
          <li>Prezentarea cotației oficiale către client;</li>
          <li>Acceptarea formală a termenilor charter de către client;</li>
          <li>Încheierea contractului de transport aerian și achitarea avansului / prețului integral conform condițiilor stabilite.</li>
        </ol>
      </section>

      {/* 8. Anulări */}
      <section id="anulare" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          8. Politica de Anulări și Rambursări
        </h2>
        <p>
          Condițiile detaliate de anulare, termenele limită și penalitățile aplicabile sunt reglementate în documentul dedicat{" "}
          <Link href="/legal/cancellation-refunds" className="text-amber-500 underline font-mono">
            Politica de Anulare și Rambursare
          </Link>{" "}
          și în contractul de charter emis de operatorul de zbor.
        </p>
      </section>

      {/* 9. Limitarea Răspunderii */}
      <section id="raspundere" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          9. Limitarea Răspunderii Platformei
        </h2>
        <p>
          În limitele permise de legislația aplicabilă, AIR nu este răspunzătoare pentru întârzieri, anulări sau modificări de traseu cauzate de condiții meteorologice nefavorabile, decizii de control al traficului aerian (ATC), indisponibilități neprevăzute de sloturi, forță majoră sau fapte ale terților furnizori de servicii aeroportuare.
        </p>
      </section>

      {/* 10. Proprietate Intelectuală */}
      <section id="proprietate" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          10. Drepturi de Proprietate Intelectuală
        </h2>
        <p>
          Toate elementele platformei AIR (denumire, logo, design editorial, cod sursă, baze de date, algoritmi de decizie și conținut grafic) sunt proprietatea exclusivă a operatorului platformei și sunt protejate de legislația națională și internațională privind drepturile de autor.
        </p>
      </section>

      {/* 11. Legea Aplicabilă */}
      <section id="lege" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          11. Legea Aplicabilă și Soluționarea Litigiilor
        </h2>
        <p>
          Prezentele Condiții Generale sunt guvernate de legea română. Orice dispută decurgând din utilizarea platformei va fi soluționată pe cale amiabilă sau, în cazul în care acest lucru nu este posibil, de către instanțele judecătorești competente din București, România.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
