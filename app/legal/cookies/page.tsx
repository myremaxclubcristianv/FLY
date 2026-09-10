import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Politica privind Modulele Cookie și Stocarea Tehnică — AIR",
  description:
    "Transparență privind stocarea tehnică locală, tokenurile de sesiune strict necesare și absența completă a modulelor terțe de urmărire publicitară pe platforma AIR.",
};

const TOC = [
  { id: "definitie", label: "1. Ce sunt Cookie-urile & Stocarea Locală" },
  { id: "inventar", label: "2. Inventarul Mecanismelor Tehnice Utilizate" },
  { id: "necesare", label: "3. Mecanisme Tehnice Strict Necesare" },
  { id: "localstorage", label: "4. Utilizarea Mecanismului localStorage în Browser" },
  { id: "terti", label: "5. Absența Cookie-urilor Terțe de Urmărire & Publicitate" },
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
          Prezenta politică oferă transparență totală privind modul în care platforma digitală <strong>AIR</strong> utilizează mecanismele tehnice locale ale browserului dumneavoastră (precum <code>localStorage</code> și cookie-uri tehnice de sesiune) pentru a asigura funcționarea performantă a serviciilor de planificare a zborurilor.
        </p>
      </section>

      {/* 2. Inventar */}
      <section id="inventar" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Inventarul Mecanismelor Tehnice Utilizate
        </h2>
        <p>
          Platforma AIR este construită pe principiul minimizării tehnologice a datelor. Aplicația utilizează <strong>exclusiv mecanisme tehnice locale</strong> esențiale pentru experiența utilizatorului:
        </p>
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border border-[var(--color-border)] rounded-xl overflow-hidden font-mono">
            <thead className="bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] uppercase text-[10px]">
              <tr>
                <th className="p-3 border-b border-[var(--color-border)]">Mecanism / Cheie</th>
                <th className="p-3 border-b border-[var(--color-border)]">Tehnologie</th>
                <th className="p-3 border-b border-[var(--color-border)]">Rol Tehnic & Funcțional</th>
                <th className="p-3 border-b border-[var(--color-border)]">Durată Stocare</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-text-secondary)] font-sans">
              <tr>
                <td className="p-3 font-mono text-xs">air_mission_requests</td>
                <td className="p-3 font-mono text-[10px]">localStorage</td>
                <td className="p-3">Păstrarea pe dispozitivul local a istoricului solicitărilor de misiune inițiate de utilizator</td>
                <td className="p-3 font-mono text-[10px]">Până la ștergerea manuală a datelor browserului</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">air_saved_aircraft</td>
                <td className="p-3 font-mono text-[10px]">localStorage</td>
                <td className="p-3">Memorarea aeronavelor favorite selectate în showroom-ul digital</td>
                <td className="p-3 font-mono text-[10px]">Până la ștergerea manuală a datelor browserului</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">air_saved_routes</td>
                <td className="p-3 font-mono text-[10px]">localStorage</td>
                <td className="p-3">Memorarea rutelor salvate în modulul de explorare a rutelor</td>
                <td className="p-3 font-mono text-[10px]">Până la ștergerea manuală a datelor browserului</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">air_mock_user</td>
                <td className="p-3 font-mono text-[10px]">localStorage</td>
                <td className="p-3">Menținerea stării de sesiune locale în mediul de dezvoltare / prototip</td>
                <td className="p-3 font-mono text-[10px]">Până la deconectare</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">sb-*-auth-token</td>
                <td className="p-3 font-mono text-[10px]">Cookie / Session</td>
                <td className="p-3">Token securizat de autentificare (în regim de integrare activă)</td>
                <td className="p-3 font-mono text-[10px]">Durata sesiunii securizate</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Necesare */}
      <section id="necesare" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Mecanisme Tehnice Strict Necesare (Strictly Necessary)
        </h2>
        <p>
          Aceste elemente tehnice sunt indispensabile pentru navigare și pentru persistența datelor introduse de dumneavoastră în formularele de planificare. Conform Directivei ePrivacy 2002/58/CE și Legii nr. 506/2004 din România, <strong>aceste mecanisme strict funcționale nu necesită consimțământ prealabil</strong>, fiind necesare exclusiv furnizării serviciului tehnic solicitat direct de utilizator.
        </p>
      </section>

      {/* 4. localStorage */}
      <section id="localstorage" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Utilizarea Mecanismului localStorage în Browser
        </h2>
        <p>
          Mecanismul <code>localStorage</code> permite aplicației să păstreze identificatorii solicitărilor dumneavoastră locale (de ex. referințe de misiune AIR) fără a transmite date inutile către rețele terțe. Aceste date rămân izolate exclusiv pe dispozitivul dumneavoastră.
        </p>
      </section>

      {/* 5. Terti */}
      <section id="terti" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          5. Absența Cookie-urilor Terțe de Urmărire & Publicitate
        </h2>
        <div className="p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-2 text-xs">
          <strong className="text-amber-500 font-mono uppercase block">
            DECLARAȚIE DE TRANSPARENȚĂ TEHNOLOGICĂ:
          </strong>
          <p className="font-sans text-[var(--color-text-secondary)] leading-relaxed">
            Platforma AIR <strong>nu integrează cookie-uri terțe de retargeting publicitar</strong>, pixeli de urmărire Facebook / Meta, scripturi analitice invazive sau rețele de profilare a utilizatorilor.
          </p>
        </div>
      </section>

      {/* 6. Gestiune */}
      <section id="gestiune" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          6. Controlul și Ștergerea Stocării din Browser
        </h2>
        <p>
          Puteți șterge în orice moment istoricul și datele salvate local din setările browserului dumneavoastră web (Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge) prin opțiunea „Ștergere date de navigare / Clear browsing data”.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}

