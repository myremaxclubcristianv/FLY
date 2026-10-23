/**
 * Registry of genuinely translated EN <-> RO page pairs.
 * Only pairs listed here receive hreflang alternates and a working language switch.
 * Do NOT add a pair unless the Romanian page has real, translated content.
 */

export const PRIORITY_ROUTE_SLUGS = [
  "bucharest-to-nice",
  "bucharest-to-paris",
  "bucharest-to-london",
  "bucharest-to-milan",
  "bucharest-to-geneva",
  "bucharest-to-vienna",
  "bucharest-to-dubai",
] as const;

const STATIC_PAIRS: Array<[en: string, ro: string]> = [
  ["/", "/ro"],
  ["/contact", "/ro/contact"],
  ["/heliports", "/ro/heliports"],
  ["/aviation/insurance", "/ro/aviation/insurance"],
  ["/aircraft/ownership", "/ro/aircraft/ownership"],
];

const ALL_PAIRS: Array<[string, string]> = [
  ...STATIC_PAIRS,
  ...PRIORITY_ROUTE_SLUGS.map((s): [string, string] => [`/routes/${s}`, `/ro/routes/${s}`]),
];

export function isRomanianPath(path: string): boolean {
  return path === "/ro" || path.startsWith("/ro/");
}

/** Returns the translated equivalent path, or null if no real translation exists. */
export function getAlternatePath(path: string): string | null {
  const clean = path.split("?")[0].replace(/\/+$/, "") || "/";
  for (const [en, ro] of ALL_PAIRS) {
    if (clean === en) return ro;
    if (clean === ro) return en;
  }
  return null;
}

export function getTranslatedPairs(): Array<[string, string]> {
  return [...ALL_PAIRS];
}
