import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Politica privind Modulele Cookie și Stocarea Tehnică — AIR",
  description:
    "Transparență privind stocarea tehnică locală, cookie-urile de sesiune strict necesare și absența tehnologiilor terțe de urmărire publicitară pe platforma AIR.",
};

const TOC = [
  { id: "definitie", label: "1. Ce sunt Cookie-urile & Stocarea Locală" },
  { id: "inventar", label: "2. Inventarul Mecanismelor Tehnice Utilizate" },
  { id: "necesare", label: "3. Cookie-uri Strict Necesare" },
  { id: "localstorage", label: "4. Stocare Locală în Browser (localStorage)" },
  { id: "terti", label: "5. Module Terțe & Urmărire Publicitară" },
  { id: "gestiune", label: "6. Controlul și Ștergerea Stocării din Browser" },
];

export default function CookiesPage() {
  return (
    <LegalDocumentLayout
      titleRo="Politica privind Modulele Cookie și Stocarea Tehnică"
      titleEn="Cookie & Technical Local Storage Policy"
      documentNumber="DOC-03 // COOKIES"
      category="POLITICĂ DE SECURITATE & TEHNICĂ"
      tableOfContents={TOC}
    >
      {/* 1. Definitie */}
      <section id="definitie" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          1. Ce sunt Cookie-urile și Stocarea Locală
        </h2>
        <p>
          Prezenta politică explică modul în care platforma <strong>AIR</strong> utilizează fișierele cookie și tehnologiile similare de stocare în browser (precum <code>localStorage</code> și <code>sessionStorage</code>) pentru a asigura funcționarea tehnică securizată a serviciilor.
        </p>
      </section>

      {/* 2. Inventar */}
      <section id="inventar" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Inventarul Mecanismelor Tehnice Utilizate
        </h2>
        <p>
          Platforma AIR este concepută după principiul minimizării datelor (Privacy by Design). În stadiul operațional actual, AIR utilizează <strong>exclusiv mecanisme tehnice esențiale</strong> pentru funcționarea aplicației:
        </p>
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border border-[var(--color-border)] rounded-xl overflow-hidden font-mono">
            <thead className="bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] uppercase text-[10px]">
              <tr>
                <th className="p-3 border-b border-[var(--color-border)]">Denumire Mecanism</th>
                <th className="p-3 border-b border-[var(--color-border)]">Tip</th>
                <th className="p-3 border-b border-[var(--color-border)]">Scop Tehnic</th>
                <th className="p-3 border-b border-[var(--color-border)]">Durată</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-secondary)] font-sans">
              <tr>
                <td className="p-3 font-mono text-xs">sb-*-auth-token</td>
                <td className="p-3 font-mono text-[10px]">Cookie / Session</td>
                <td className="p-3">Menținerea securizată a sesiunii de autentificare a utilizatorului</td>
                <td className="p-3 font-mono text-[10px]">Durata sesiunii</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">air_mission_requests</td>
                <td className="p-3 font-mono text-[10px]">localStorage</td>
                <td className="p-3">Păstrarea locală a istoricului solicitărilor de misiune pentru afișarea în cont</td>
                <td className="p-3 font-mono text-[10px]">Până la ștergerea cache-ului</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">air_mock_user</td>
                <td className="p-3 font-mono text-[10px]">localStorage</td>
                <td className="p-3">Identificarea stării de sesiune în modul de dezvoltare locală fără cloud</td>
                <td className="p-3 font-mono text-[10px]">Până la deconectare</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Necesare */}
      <section id="necesare" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Cookie-uri Strict Necesare (Strictly Necessary)
        </h2>
        <p>
          Aceste elemente sunt indispensabile pentru navigarea pe site și utilizarea funcționalităților sale de bază (de exemplu, accesul la panoul de control al misiunilor și păstrarea securității sesiunii). Conform Directivei ePrivacy 2002/58/CE și Legii nr. 506/2004 din România, <strong>stocarea acestor elemente strict tehnice nu necesită acordul prealabil al utilizatorului</strong>, fiind necesară furnizării serviciului solicitat.
        </p>
      </section>

      {/* 4. localStorage */}
      <section id="localstorage" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Utilizarea Mecanismului localStorage în Browser
        </h2>
        <p>
          Pentru o experiență de utilizare fluidă și rapidă, AIR memorează în <code>localStorage</code> parametrii zborurilor planificate recent și identificatorii de referință AIR. Aceste date rămân stocate local pe dispozitivul dumneavoastră și nu sunt partajate cu rețele publicitare externe.
        </p>
      </section>

      {/* 5. Terti */}
      <section id="terti" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Absența Cookie-urilor Terțe de Urmărire Publicitară
        </h2>
        <div className="p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-2">
          <strong className="text-[var(--color-text-primary)] block text-xs font-mono uppercase">
            DECLARAȚIE DE TRANSPARENȚĂ TEHNOLOGICĂ:
          </strong>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            Platforma AIR <strong>nu utilizează cookie-uri terțe de retargeting publicitar</strong>, pixeli de urmărire Facebook/Meta sau rețele de profilare comportamentală. Datele dumneavoastră de navigare nu sunt monetizate către brokeri de date.
          </p>
        </div>
      </section>

      {/* 6. Gestiune */}
      <section id="gestiune" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          6. Cum Puteți Șterge sau Bloca Stocarea Tehnică
        </h2>
        <p>
          Puteți configura în orice moment browserul dumneavoastră web (Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge) să șteargă toate cookie-urile și datele locale sau să blocheze salvarea acestora. Vă rugăm să aveți în vedere că blocarea completă a stocării locale poate afecta menținerea autentificării în contul AIR.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
