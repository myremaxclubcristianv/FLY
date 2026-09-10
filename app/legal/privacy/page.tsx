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
  { id: "categorii", label: "2. Categorii de Date Colectate Efectiv" },
  { id: "necolectate", label: "3. Categorii de Date Necolectate pe Platformă" },
  { id: "scopuri", label: "4. Scopurile și Temeiurile Prelucrării (Art. 6 GDPR)" },
  { id: "destinatari", label: "5. Destinatarii Datelor & Operatori Aerieni" },
  { id: "transferuri", label: "6. Transferuri Internaționale de Date" },
  { id: "retentie", label: "7. Perioada de Păstrare a Datelor" },
  { id: "drepturi", label: "8. Drepturile Persoanelor Vizate conform GDPR" },
  { id: "automat", label: "9. Recomandări Algoritmice & Absența Profilării" },
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
          În sensul Regulamentului General privind Protecția Datelor (Regulamentul UE 2016/679 — „<strong>GDPR</strong>”), operatorul de date este entitatea: <strong>{LEGAL_CONFIG.entity.legalName}</strong>.
        </p>
        <p className="text-xs text-[var(--color-text-muted)] font-mono">
          Canal dedicat protecției datelor: {LEGAL_CONFIG.entity.privacyEmail}
        </p>
      </section>

      {/* 2. Categorii de Date Colectate */}
      <section id="categorii" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Categorii de Date cu Caracter Personal Colectate Efectiv
        </h2>
        <p>Platforma AIR colectează exclusiv datele transmise voluntar de utilizator în procesul de căutare și planificare a zborurilor:</p>
        <div className="space-y-3 pt-2 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <strong className="text-[var(--color-text-primary)] block mb-1">A. Date de Identificare și Contact ale Solicitantului:</strong>
            <span className="text-[var(--color-text-muted)]">Nume, prenume, adresă de e-mail, număr de telefon de contact, companie / organizație (furnizate voluntar în formularele de planificare sau solicitare).</span>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <strong className="text-[var(--color-text-primary)] block mb-1">B. Parametri de Misiune și Preferințe de Călătorie:</strong>
            <span className="text-[var(--color-text-muted)]">Aeroport de plecare, aeroport de destinație, dată și oră dorite, număr estimat de pasageri, preferințe de categorie de aeronavă, mențiuni operaționale.</span>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <strong className="text-[var(--color-text-primary)] block mb-1">C. Date Tehnice de Sesiune și Jurnale Server:</strong>
            <span className="text-[var(--color-text-muted)]">Adresă IP (în jurnalele standard de securitate server), identificatori de sesiune locală stocați în browser (localStorage) pentru recunoașterea istoricului solicitărilor pe dispozitiv.</span>
          </div>
        </div>
      </section>

      {/* 3. Categorii Necolectate */}
      <section id="necolectate" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Categorii de Date Necolectate pe Acest Website
        </h2>
        <div className="p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-2 text-xs">
          <strong className="text-amber-500 font-mono uppercase block">
            TRANSPARENȚĂ PRIVIND MINIMIZAREA DATELOR (PRIVACY BY DESIGN):
          </strong>
          <p className="font-sans text-[var(--color-text-secondary)] leading-relaxed">
            Platforma web AIR <strong>nu colectează și nu prelucrează</strong>: date biometrice, date privind sănătatea, date despre convingeri religioase sau politice, localizare geografică precisă prin GPS continuu, profile de marketing comportamental sau date ale instrumentelor de plată (carduri bancare).
          </p>
          <p className="font-sans text-[var(--color-text-muted)] leading-relaxed">
            În măsura în care un zbor este confirmat contractual, documentele de călătorie ale pasagerilor (pașapoarte / acte de identitate pentru manifestul de zbor) sunt colectate exclusiv conform cerințelor legale aeronautice și transmise direct operatorului aerian titular de AOC.
          </p>
        </div>
      </section>

      {/* 4. Scopuri & Temeiuri */}
      <section id="scopuri" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Scopurile și Temeiurile Juridice ale Prelucrării
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
                <td className="p-3">Configurarea cererii de zbor și interogarea operatorilor aerieni pentru cotații</td>
                <td className="p-3 font-mono text-xs">Art. 6(1)(b) — Demersuri la cererea persoanei vizate înainte de încheierea unui contract</td>
              </tr>
              <tr>
                <td className="p-3">Gestionarea contului de utilizator și afișarea istoricului misiunilor</td>
                <td className="p-3 font-mono text-xs">Art. 6(1)(b) — Executarea Termenilor și Condițiilor de utilizare</td>
              </tr>
              <tr>
                <td className="p-3">Securitatea platformei, prevenirea fraudelor și auditul operațional</td>
                <td className="p-3 font-mono text-xs">Art. 6(1)(f) — Interesul legitim de a asigura securitatea cibernetică a sistemului</td>
              </tr>
              <tr>
                <td className="p-3">Îndeplinirea obligațiilor legale aplicabile</td>
                <td className="p-3 font-mono text-xs">Art. 6(1)(c) — Îndeplinirea unei obligații legale</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Destinatari */}
      <section id="destinatari" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Destinatarii Datelor cu Caracter Personal
        </h2>
        <p>Datele transmise voluntar pot fi partajate strict conform necesității operaționale cu:</p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>Operatori Aerieni independenți deținători de AOC:</strong> strict pentru emiterea cotațiilor de preț solicitate;</li>
          <li><strong>Furnizori de Servicii Tehnice de Găzduire (Cloud):</strong> furnizori de infrastructură securizată localizați în Uniunea Europeană;</li>
          <li><strong>Autorități Publice:</strong> exclusiv în cazurile în care există o obligație legală expresă prevăzută de lege.</li>
        </ul>
      </section>

      {/* 6. Transferuri Internaționale */}
      <section id="transferuri" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          6. Transferuri Internaționale de Date
        </h2>
        <p>
          Pentru zborurile cu destinație sau escală în afara Spațiului Economic European (SEE), datele necesare operării zborului sunt transmise operatorului aerian și autorităților relevante din țara de destinație, în conformitate cu <strong>Art. 49(1)(b) GDPR</strong> (transfer necesar pentru executarea contractului încheiat în interesul pasagerului).
        </p>
      </section>

      {/* 7. Retenție */}
      <section id="retentie" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          7. Perioada de Păstrare a Datelor
        </h2>
        <p>
          Datele asociate solicitărilor de cotație nefinalizate printr-un contract sunt păstrate pentru o perioadă de maximum <strong>24 de luni</strong> de la data transmiterii solicitării sau până la solicitarea de ștergere de către utilizator. Datele aferente zborurilor contractate sunt păstrate pe durata impusă de legislația fiscală și aeronautică aplicabilă.
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
          Toate transmisiile de date sunt criptate utilizând protocoale TLS moderne. Accesul la bazele de date este restricționat pe baza rolurilor (RBAC) și protejat prin mecanisme Row Level Security (RLS).
        </p>
      </section>

      {/* 11. Contact GDPR */}
      <section id="contact-gdpr" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          11. Contact Protecția Datelor & Autoritatea de Supraveghere
        </h2>
        <p>
          Pentru orice solicitare privind datele dumneavoastră, puteți utiliza formularul dedicat sau canalul: <span className="text-amber-500 font-mono">{LEGAL_CONFIG.entity.privacyEmail}</span>.
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          De asemenea, aveți dreptul de a depune o plângere la autoritatea de supraveghere competentă în materie de date:
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

