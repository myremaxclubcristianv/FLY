"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAlternatePath, isRomanianPath } from "@/lib/i18n/routes";

/**
 * Switches to the equivalent translated page when one exists.
 * If the current page has no Romanian/English equivalent, it links to the
 * other language's homepage and says so (no links to non-existent translations).
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname() || "/";
  const isRo = isRomanianPath(pathname);
  const alternate = getAlternatePath(pathname);

  const enHref = isRo ? alternate ?? "/" : pathname;
  const roHref = isRo ? pathname : alternate ?? "/ro";
  const noEquivalent = !alternate;

  return (
    <div
      className={`inline-flex items-center rounded-xl p-0.5 bg-white/[0.06] border border-white/[0.12] text-[11px] font-mono tracking-wider backdrop-blur-md ${className}`}
      role="group"
      aria-label={isRo ? "Selectare limbă" : "Language selector"}
    >
      <Link
        href={enHref}
        prefetch={false}
        hrefLang="en"
        aria-current={!isRo ? "true" : undefined}
        title={isRo && noEquivalent ? "English homepage (this page is not translated)" : "English"}
        className={`px-2.5 py-1 rounded-lg transition-all font-semibold ${
          !isRo ? "bg-amber-500 text-neutral-950 shadow-sm" : "text-neutral-300 hover:text-white hover:bg-white/[0.05]"
        }`}
      >
        EN
      </Link>
      <Link
        href={roHref}
        prefetch={false}
        hrefLang="ro"
        aria-current={isRo ? "true" : undefined}
        title={!isRo && noEquivalent ? "Pagina principală în română (această pagină nu este tradusă)" : "Română"}
        className={`px-2.5 py-1 rounded-lg transition-all font-semibold ${
          isRo ? "bg-amber-500 text-neutral-950 shadow-sm" : "text-neutral-300 hover:text-white hover:bg-white/[0.05]"
        }`}
      >
        RO
      </Link>
    </div>
  );
}
