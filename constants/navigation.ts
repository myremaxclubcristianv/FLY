export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  isImplemented?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "ROUTES", href: "/routes", isImplemented: true },
  { label: "AIRCRAFT", href: "/aircraft", isImplemented: true },
  { label: "AVIATION", href: "/aviation", isImplemented: true },
  { label: "DESTINATIONS", href: "/destinations", isImplemented: true },
  { label: "BĂNEASA", href: "/baneasa", isImplemented: true },
  { label: "EXPERIENCES", href: "/experiences", isImplemented: true },
  { label: "JOURNAL", href: "/journal", isImplemented: true },
  { label: "ROMANIA FROM ABOVE", href: "/romania-from-above", isImplemented: true },
];

export const PRIMARY_CTA = {
  label: "PLAN A FLIGHT",
  href: "/plan",
};

export const FOOTER_SECTIONS = [
  {
    title: "PLATFORM WORLDS",
    items: [
      { label: "DECISION ENGINE", href: "/#decision-engine", isImplemented: true },
      { label: "ROUTE INTELLIGENCE", href: "/routes", isImplemented: true },
      { label: "AIRCRAFT EXPLORER", href: "/aircraft", isImplemented: true },
      { label: "OWNERSHIP MATRIX", href: "/aircraft/ownership", isImplemented: true },
      { label: "AVIATION DIRECTORY", href: "/aviation", isImplemented: true },
    ],
  },
  {
    title: "REGIONAL HUBS & DISCOVERY",
    items: [
      { label: "BĂNEASA GATEWAY (LRBS / BBU)", href: "/baneasa", isImplemented: true },
      { label: "ROMANIA FROM ABOVE", href: "/romania-from-above", isImplemented: true },
      { label: "EUROPEAN DESTINATIONS", href: "/destinations", isImplemented: true },
      { label: "CURATED EXPERIENCES", href: "/experiences", isImplemented: true },
      { label: "AVIATION JOURNAL", href: "/journal", isImplemented: true },
      { label: "FLIGHT PLANNER", href: "/plan", isImplemented: true },
    ],
  },
  {
    title: "SERVICES & DISCLOSURES",
    items: [
      { label: "AVIATION FINANCE", href: "/aviation/finance", isImplemented: true },
      { label: "AVIATION INSURANCE", href: "/aviation/insurance", isImplemented: true },
      { label: "DATA INTEGRITY & STATUS", href: "/#data-status", isImplemented: true },
      { label: "DATA AUDIT DASHBOARD", href: "/admin", isImplemented: true },
    ],
  },
  {
    title: "LEGAL & COMPLIANCE",
    items: [
      { label: "LEGAL CENTER", href: "/legal", isImplemented: true },
      { label: "TERMS & CONDITIONS", href: "/legal/terms", isImplemented: true },
      { label: "PRIVACY POLICY (GDPR)", href: "/legal/privacy", isImplemented: true },
      { label: "COOKIE POLICY", href: "/legal/cookies", isImplemented: true },
      { label: "AVIATION DISCLAIMER", href: "/legal/aviation-disclaimer", isImplemented: true },
      { label: "CHARTER DISCLAIMER", href: "/legal/charter-disclaimer", isImplemented: true },
      { label: "CANCELLATION & REFUNDS", href: "/legal/cancellation-refunds", isImplemented: true },
    ],
  },
];

