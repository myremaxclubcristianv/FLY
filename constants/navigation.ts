export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  isImplemented?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "FLY", href: "/#fly", isImplemented: true },
  { label: "EXPERIENCES", href: "/experiences", isImplemented: true },
  { label: "BUSINESS", href: "/business", isImplemented: true },
  { label: "AIRCRAFT", href: "/aircraft", isImplemented: true },
  { label: "AVIATION", href: "/aviation", isImplemented: true },
  { label: "DESTINATIONS", href: "/destinations", isImplemented: true },
  { label: "BĂNEASA", href: "/baneasa", isImplemented: true },
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
      { label: "AIRCRAFT EXPLORER", href: "/aircraft", isImplemented: true },
      { label: "AIRCRAFT MATCHER", href: "/aircraft#matcher", isImplemented: true },
      { label: "OWNERSHIP MATRIX", href: "/aircraft/ownership", isImplemented: true },
      { label: "SUPPLY DIRECTORY", href: "/aviation", isImplemented: true },
    ],
  },
  {
    title: "REGIONAL HUBS & MISSIONS",
    items: [
      { label: "BĂNEASA GATEWAY (LROP)", href: "/baneasa", isImplemented: true },
      { label: "ROMANIA DESTINATIONS", href: "/destinations", isImplemented: true },
      { label: "CURATED EXPERIENCES", href: "/experiences", isImplemented: true },
      { label: "EXECUTIVE AVIATION", href: "/business", isImplemented: true },
      { label: "FLIGHT PLANNER", href: "/plan", isImplemented: true },
    ],
  },
  {
    title: "SERVICES & DISCLOSURES",
    items: [
      { label: "AVIATION FINANCE", href: "/aviation/finance", isImplemented: true },
      { label: "AVIATION INSURANCE", href: "/aviation/insurance", isImplemented: true },
      { label: "DATA INTEGRITY & STATUS", href: "/#data-status", isImplemented: true },
      { label: "PRIVACY POLICY", href: "/#privacy", isImplemented: false },
      { label: "TERMS OF ACCESS", href: "/#terms", isImplemented: false },
    ],
  },
];
