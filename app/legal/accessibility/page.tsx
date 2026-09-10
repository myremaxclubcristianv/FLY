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
  { id: "stadiu-conformitate", label: "3. Stadiul Curent de Conformitate" },
  { id: "feedback", label: "4. Feedback & Raportarea Problemelor de Accesibilitate" },
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
          Platforma AIR este dedicată asigurării unei experiențe digitale accesibile, fluide și intuitive pentru toți utilizatorii, inclusiv pentru persoanele cu dizabilități vizuale, motorii sau cognitive, aplicând continuu bunele practici din domeniu.
        </p>
      </section>

      {/* 2. Standarde */}
      <section id="standarde" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          2. Măsuri Tehnice Implementate
        </h2>
        <p>Pentru atingerea acestui obiectiv, platforma AIR a integrat:</p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>Markup Semantic HTML5:</strong> structură logică a titlurilor (H1, H2, H3), elemente de reper (header, main, nav, footer, aside) ușor de parcurs cu cititoare de ecran (Screen Readers);</li>
          <li><strong>Navigație completă prin tastatură:</strong> toate butoanele, formularele și legăturile interactive pot fi accesate utilizând tasta Tab și tastele direcționale;</li>
          <li><strong>Contrast și Lizibilitate Tipografică:</strong> utilizarea de rapoarte de contrast optimizate între text și fundal, cu suport pentru moduri vizuale de înaltă claritate;</li>
          <li><strong>Design Responsiv Fluid:</strong> adaptare automată pe ecrane de smartphone, tabletă și monitoare de înaltă rezoluție, fără pierderea contextului sau a funcționalității la mărirea textului (zoom până la 200%).</li>
        </ul>
      </section>

      {/* 3. Stadiu conformitate */}
      <section id="stadiu-conformitate" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          3. Stadiul Curent de Conformitate (Declarație de Transparență)
        </h2>
        <div className="p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] space-y-2 text-xs">
          <span className="font-mono text-amber-500 font-bold block uppercase">
            EVALUARE CONTINUĂ WCAG 2.1:
          </span>
          <p className="font-sans text-[var(--color-text-secondary)] leading-relaxed">
            AIR urmărește alinierea la liniile directoare <strong>Web Content Accessibility Guidelines (WCAG) 2.1 nivel AA</strong>. Platforma se află într-un proces continuu de audit intern de optimizare și nu pretinde o certificare externă formală completă, prioritizând îmbunătățirea reală a experienței de utilizare.
          </p>
        </div>
      </section>

      {/* 4. Feedback */}
      <section id="feedback" className="space-y-4">
        <h2 className="text-2xl font-light text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-3">
          4. Feedback și Raportarea Problemelor de Accesibilitate
        </h2>
        <p>
          Dacă întâmpinați orice dificultate în accesarea conținutului sau în navigarea pe platformă, vă rugăm să ne semnalați problema la adresa de e-mail:{" "}
          <a href={`mailto:${LEGAL_CONFIG.entity.primaryContactEmail}`} className="text-amber-500 underline font-mono">
            {LEGAL_CONFIG.entity.primaryContactEmail}
          </a>.
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          Vom analiza sesizarea dumneavoastră în cel mai scurt timp și vom implementa măsurile tehnice corective necesare.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
