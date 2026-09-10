import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import { LEGAL_CONFIG } from "@/lib/config/legal";

export const metadata: Metadata = {
  title: "Declarație de Accesibilitate Web — AIR",
  description:
    "Angajamentul AIR pentru un web accesibil, conformitate tipografică, navigație semantică și modalități de feedback pentru îmbunătățirea experienței digitale.",
};

const TOC = [
  { id: "angajament", label: "1. Angajamentul Nostru pentru Accesibilitate" },
  { id: "standarde", label: "2. Măsuri Tehnice Implementate" },
  { id: "stadiu-conformitate", label: "3. Stadiul Curent & Principii de Accesibilitate" },
  { id: "feedback", label: "4. Feedback & Raportarea Barierelor de Accesibilitate" },
];

export default function AccessibilityPage() {
  return (
    <LegalDocumentLayout
      titleRo="Declarație de Accesibilitate Web"
      titleEn="Digital Web Accessibility Statement"
      documentNumber="DOC-09 // ACCESSIBILITY"
      category="ACCESIBILITATE & INCLUZIUNE"
      tableOfContents={TOC}
    >
      {/* 1. Angajament */}
      <section id="angajament" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          1. Angajamentul Nostru pentru Accesibilitate Digitală
        </h2>
        <p>
          Platforma AIR este dedicată asigurării unei experiențe digitale intuitive și accesibile pentru toți utilizatorii, aplicând principii moderne de design incluziv.
        </p>
      </section>

      {/* 2. Standarde */}
      <section id="standarde" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Măsuri Tehnice Implementate
        </h2>
        <p>Pentru sprijinirea accesibilității, platforma AIR integrează următoarele măsuri tehnice:</p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>Markup Semantic HTML5:</strong> structură logică a titlurilor (H1, H2, H3), elemente de reper (header, main, nav, footer, aside) ușor de parcurs cu tehnologii asistive;</li>
          <li><strong>Navigație prin tastatură:</strong> elementele interactive și formularele pot fi parcurse secvențial prin tasta Tab;</li>
          <li><strong>Contrast și Lizibilitate Tipografică:</strong> rapoarte de contrast optimizate între text și fundal, cu suport pentru moduri de înaltă lizibilitate;</li>
          <li><strong>Design Responsiv Fluid:</strong> redimensionare automată pe ecrane de smartphone, tabletă și monitoare desktop fără pierderea conținutului la mărirea textului până la 200%.</li>
        </ul>
      </section>

      {/* 3. Stadiu conformitate */}
      <section id="stadiu-conformitate" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Stadiul Curent & Principii de Accesibilitate
        </h2>
        <div className="p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-2 text-xs">
          <span className="font-mono text-amber-500 font-bold block uppercase">
            DECLARAȚIE PRIVIND PRINCIPIILE DE ACCESIBILITATE:
          </span>
          <p className="font-sans text-[var(--color-text-secondary)] leading-relaxed">
            {LEGAL_CONFIG.disclaimers.accessibilityPrinciples}
          </p>
          <p className="font-sans text-[var(--color-text-muted)] leading-relaxed">
            Platforma nu pretinde o certificare formală terță de conformitate completă WCAG, dar depune eforturi continue pentru remedierea oricăror deficiențe identificate în navigarea digitală.
          </p>
        </div>
      </section>

      {/* 4. Feedback */}
      <section id="feedback" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Feedback și Raportarea Barierelor de Accesibilitate
        </h2>
        <p>
          Dacă întâmpinați dificultăți în accesarea oricărei secțiuni a platformei, vă invităm să ne semnalați situația la canalul de contact:{" "}
          <span className="text-amber-500 font-mono">
            {LEGAL_CONFIG.entity.primaryContactEmail}
          </span>.
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          Vom analiza sesizarea dumneavoastră cu prioritate pentru a implementa ajustările tehnice necesare.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}

