import { Metadata } from "next";
import Link from "next/link";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { LEGAL_CONFIG } from "@/lib/config/legal";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate & Protecția Datelor (GDPR) — AIR",
  description:
    "Transparență privind prelucrarea datelor cu caracter personal conform Regulamentului (UE) 2016/679 (GDPR), drepturile pasagerilor și comunicarea cu operatorii aerieni.",
};

const TOC = [
  { id: "operator", label: "1. Operatorul Datelor cu Caracter Personal" },
  { id: "categorii", label: "2. Categorii de Date Prelucrate" },
  { id: "scopuri", label: "3. Scopurile și Temeiurile Prelucrării (Art. 6 GDPR)" },
  { id: "date-speciale", label: "4. Date din Categorii Speciale (Medical / Dietar)" },
  { id: "destinatari", label: "5. Destinatarii Datelor & Operatori Aerieni" },
  { id: "transferuri", label: "6. Transferuri Internaționale de Date" },
  { id: "retentie", label: "7. Perioada de Păstrare a Datelor" },
  { id: "drepturi", label: "8. Drepturile Persoanelor Vizate conform GDPR" },
  { id: "automat", label: "9. Recomandări Algoritmice & Profilare" },
  { id: "securitate", label: "10. Măsuri Tehnice de Securitate" },
  { id: "contact-gdpr", label: "11. Contact DPO & Autoritatea de Supraveghere" },
];

export default function PrivacyPage() {
  return (
    <LegalDocumentLayout
      titleRo="Politica de Confidențialitate & Prelucrare a Datelor (GDPR)"
      titleEn="Privacy Policy & GDPR Compliance Framework"
      documentNumber="DOC-02 // PRIVACY"
      category="PROTECȚIA DATELOR (GDPR)"
      tableOfContents={TOC}
    >
      {/* 1. Operatorul Datelor */}
      <section id="operator" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          1. Operatorul Datelor cu Caracter Personal
        </h2>
        <p>
          În sensul Regulamentului General privind Protecția Datelor (Regulamentul UE 2016/679 — „<strong>GDPR</strong>”), operatorul de date este <strong>{LEGAL_CONFIG.entity.legalName}</strong>, cu sediul social în {LEGAL_CONFIG.entity.registeredOffice}, e-mail dedicat protecției datelor: <a href={`mailto:${LEGAL_CONFIG.entity.privacyEmail}`} className="text-amber-500 font-mono underline">{LEGAL_CONFIG.entity.privacyEmail}</a>.
        </p>
      </section>

      {/* 2. Categorii de Date */}
      <section id="categorii" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Categorii de Date cu Caracter Personal Prelucrate
        </h2>
        <p>Platforma AIR prelucrează exclusiv datele necesare configurării și intermedierii misiunilor de zbor:</p>
        <div className="space-y-3 pt-2 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <strong className="text-[var(--color-text-primary)] block mb-1">A. Date de Identificare și Contact ale Solicitantului:</strong>
            <span className="text-[var(--color-text-muted)]">Nume, prenume, adresă de e-mail profesională/personală, număr de telefon de contact, companie/organizație (dacă este cazul).</span>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <strong className="text-[var(--color-text-primary)] block mb-1">B. Parametri de Misiune și Preferințe de Călătorie:</strong>
            <span className="text-[var(--color-text-muted)]">Aeroport de origine, aeroport de destinație, dată și oră de zbor, flexibilitate calendaristică, număr de pasageri, preferințe de categorie de aeronavă, cerințe specifice de bagaj sau catering.</span>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <strong className="text-[var(--color-text-primary)] block mb-1">C. Date Manifest Pasageri (în faza de confirmare a zborului):</strong>
            <span className="text-[var(--color-text-muted)]">Nume complet, data nașterii, cetățenie, serie și număr pașaport/act de identitate, data expirării documentului (date solicitate strict de normele aeronautice internaționale pentru autorizarea planului de zbor și proceduri vamale/frontieră).</span>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <strong className="text-[var(--color-text-primary)] block mb-1">D. Date Tehnice & Jurnale de Navigare:</strong>
            <span className="text-[var(--color-text-muted)]">Adresă IP (în jurnalele de securitate server), tipul browserului, identificatori de sesiune locală necesari funcționării contului de utilizator.</span>
          </div>
        </div>
      </section>

      {/* 3. Scopuri & Temeiuri */}
      <section id="scopuri" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Scopurile și Temeiurile Juridice ale Prelucrării
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[var(--color-border)] rounded-xl overflow-hidden font-mono">
            <thead className="bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] uppercase text-[10px]">
              <tr>
                <th className="p-3 border-b border-[var(--color-border)]">Scopul Prelucrării</th>
                <th className="p-3 border-b border-[var(--color-border)]">Temei Juridic (GDPR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-secondary)] font-sans">
              <tr>
                <td className="p-3">Configurarea cererii de zbor și obținerea cotațiilor de la operatori</td>
                <td className="p-3 font-mono text-xs">Art. 6(1)(b) — Demersuri la cererea persoanei vizate înainte de încheierea unui contract</td>
              </tr>
              <tr>
                <td className="p-3">Gestionarea contului de utilizator și a istoricului misiunilor</td>
                <td className="p-3 font-mono text-xs">Art. 6(1)(b) — Executarea contractului / Termenilor de utilizare</td>
              </tr>
              <tr>
                <td className="p-3">Securitatea platformei, prevenirea fraudelor și auditul operațional</td>
                <td className="p-3 font-mono text-xs">Art. 6(1)(f) — Interesul legitim al operatorului de a proteja integritatea platformei</td>
              </tr>
              <tr>
                <td className="p-3">Îndeplinirea obligațiilor legale (fiscale, aeronautice, evidență contabilă)</td>
                <td className="p-3 font-mono text-xs">Art. 6(1)(c) — Îndeplinirea unei obligații legale</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Date Speciale */}
      <section id="date-speciale" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Date din Categorii Speciale (Medicale / Asistență Specială)
        </h2>
        <p>
          AIR nu solicită în mod activ date privind sănătatea. În cazul în care un pasager transmite voluntar cerințe de asistență specială (de ex. acces fotoliu rulant pe rampă, echipament medical la bord sau restricții alimentare severe), aceste date sunt prelucrate exclusiv în temeiul <strong>consimțământului explicit (Art. 9(2)(a) GDPR)</strong> și sunt transmise exclusiv operatorului aerian și echipei de handling FBO pentru acomodarea operațională necesară zborului.
        </p>
      </section>

      {/* 5. Destinatari */}
      <section id="destinatari" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Destinatarii Datelor cu Caracter Personal
        </h2>
        <p>Datele cu caracter personal pot fi transmise următoarelor categorii de destinatari:</p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>Operatori Aerieni deținători de AOC:</strong> strict pentru emiterea cotației și întocmirea manifestului de zbor;</li>
          <li><strong>Operatori de Bază Fixă (FBO) și Agenți de Handling Aeroportuar:</strong> pentru primirea pasagerilor la terminalul privat și acces pe platforma aeroportuară;</li>
          <li><strong>Furnizori de Servicii Tehnice și Cloud:</strong> furnizori de găzduire securizată din UE pentru infrastructura bazei de date;</li>
          <li><strong>Autorități Publice și de Frontieră:</strong> poliția de frontieră, autoritățile vamale și AACR, atunci când există o obligație legală expresă.</li>
        </ul>
      </section>

      {/* 6. Transferuri Internaționale */}
      <section id="transferuri" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          6. Transferuri Internaționale de Date
        </h2>
        <p>
          Pentru zborurile cu destinație sau escală în afara Spațiului Economic European (SEE), datele necesare manifestului de zbor sunt transmise autorităților aeronautice și de imigrare din țara de destinație, în conformitate cu <strong>Art. 49(1)(b) GDPR</strong> (transfer necesar pentru executarea contractului de transport aerian în interesul pasagerului).
        </p>
      </section>

      {/* 7. Retenție */}
      <section id="retentie" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          7. Perioada de Păstrare a Datelor
        </h2>
        <p>
          Datele asociate solicitărilor de cotație nefinalizate cu o rezervare fermă sunt șterse sau anonimizate în termen de <strong>24 de luni</strong> de la data solicitării. Datele aferente zborurilor confirmate și facturate sunt păstrate pe durata impusă de legislația fiscală și aeronautică aplicabilă din România (termen standard de 5 până la 10 ani pentru documente justificative contabile).
        </p>
      </section>

      {/* 8. Drepturile Persoanelor Vizate */}
      <section id="drepturi" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          8. Drepturile Persoanelor Vizate conform GDPR
        </h2>
        <p>În conformitate cu articolele 15-22 din GDPR, beneficiați de următoarele drepturi:</p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>Dreptul de acces:</strong> de a obține confirmarea prelucrării datelor și o copie a acestora;</li>
          <li><strong>Dreptul la rectificare:</strong> de a solicita corectarea datelor inexacte sau incomplete;</li>
          <li><strong>Dreptul la ștergerea datelor („dreptul de a fi uitat”):</strong> în condițiile prevăzute de art. 17 GDPR;</li>
          <li><strong>Dreptul la restricționarea prelucrării:</strong> în cazurile reglementate de art. 18 GDPR;</li>
          <li><strong>Dreptul la portabilitatea datelor:</strong> primirea datelor furnizate într-un format structurat;</li>
          <li><strong>Dreptul la opoziție:</strong> de a vă opune prelucrării întemeiate pe interesul legitim;</li>
          <li><strong>Dreptul de a retrage consimțământul:</strong> în orice moment, fără a afecta legalitatea prelucrării anterioare.</li>
        </ul>
        <div className="pt-2">
          <Link
            href="/legal/gdpr-requests"
            className="inline-flex items-center gap-2 bg-amber-500 text-neutral-950 px-4 py-2 rounded-xl text-xs font-mono font-bold hover:bg-amber-400 transition"
          >
            Formular Exercitare Drepturi GDPR →
          </Link>
        </div>
      </section>

      {/* 9. Recomandări Algoritmice */}
      <section id="automat" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          9. Recomandări Algoritmice și Absența Profilării cu Efecte Juridice
        </h2>
        <p>
          Motorul de decizie AIR (AIR Decision Engine) evaluează vectorii tehnici ai misiunii (distanță ortodromică, număr de pasageri, lungime necesară de pistă) pentru a sugera modele de aeronave compatibile. Această procesare este <strong>strict tehnică și consultativă</strong> și nu constituie o decizie automatizată cu efecte juridice sau similare semnificative în sensul art. 22 din GDPR.
        </p>
      </section>

      {/* 10. Securitate */}
      <section id="securitate" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          10. Măsuri Tehnice și Organizatorice de Securitate
        </h2>
        <p>
          Toate transmisiile de date sunt criptate utilizând protocoale TLS 1.3 moderne. Accesul la datele clienților este strict restricționat pe baza principiului rolului minim necesar (RBAC) și protejat prin mecanisme Row Level Security (RLS) la nivel de bază de date.
        </p>
      </section>

      {/* 11. Contact GDPR */}
      <section id="contact-gdpr" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          11. Contact Protecția Datelor & Dreptul de a Depune Plângere
        </h2>
        <p>
          Pentru orice solicitare privind datele dumneavoastră, ne puteți contacta direct la: <a href={`mailto:${LEGAL_CONFIG.entity.privacyEmail}`} className="text-amber-500 underline font-mono">{LEGAL_CONFIG.entity.privacyEmail}</a>.
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          De asemenea, aveți dreptul de a depune o plângere la autoritatea națională de supraveghere:
          <br />
          <strong>{LEGAL_CONFIG.regulatory.supervisoryAuthorityGdpr.name}</strong>
          <br />
          Adresă: {LEGAL_CONFIG.regulatory.supervisoryAuthorityGdpr.address} • Website:{" "}
          <a
            href={LEGAL_CONFIG.regulatory.supervisoryAuthorityGdpr.website}
            target="_blank"
            rel="noreferrer"
            className="text-amber-500 hover:underline"
          >
            {LEGAL_CONFIG.regulatory.supervisoryAuthorityGdpr.website}
          </a>{" "}
          • E-mail: {LEGAL_CONFIG.regulatory.supervisoryAuthorityGdpr.email}
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
