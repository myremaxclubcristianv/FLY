export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  isImplemented?: boolean;
}

export interface MegaMenuItem {
  label: string;
  href: string;
  badge?: string;
  description?: string;
}

export interface MegaMenuColumn {
  heading: string;
  items: MegaMenuItem[];
}

export interface MegaMenuSection {
  title: string;
  triggerHref: string;
  columns: MegaMenuColumn[];
}

export const PRIMARY_CTA = {
  label: "PLAN A FLIGHT",
  href: "/plan",
};

export const TOP_LEVEL_NAV_LINKS: NavItem[] = [
  { label: "ROUTES", href: "/routes", isImplemented: true },
  { label: "DESTINATIONS", href: "/destinations", isImplemented: true },
];

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

export const MEGA_MENU_DATA: MegaMenuSection[] = [
  {
    title: "FLY",
    triggerHref: "/plan",
    columns: [
      {
        heading: "ACCESS LAYER",
        items: [
          { label: "Plan a Flight", href: "/plan", badge: "CORE", description: "Direct mission calculator & fleet proposal" },
          { label: "Băneasa Executive Hub", href: "/baneasa", badge: "LRBS", description: "Bucharest VIP terminal & FBO dispatch" },
          { label: "Route Intelligence", href: "/routes", description: "Great-circle vectors & flight durations" },
          { label: "European Destinations", href: "/destinations", description: "Top luxury arrival gateways & FBOs" },
          { label: "Curated Flight Experiences", href: "/experiences", description: "Scenic alpine, coastal & vineyard flights" },
          { label: "Gift a Flight", href: "/gift", badge: "GIFT", description: "Bespoke aviation gift vouchers" },
        ],
      },
      {
        heading: "AIRCRAFT TYPES",
        items: [
          { label: "Explore Aircraft Fleet", href: "/aircraft", description: "Full verified performance catalog" },
          { label: "Compare Models", href: "/aircraft/compare", badge: "COMPARE", description: "Head-to-head mission suitability" },
          { label: "Aircraft Ownership", href: "/aircraft/ownership", description: "Whole vs. charter matrix & economics" },
          { label: "Aircraft For Sale", href: "/aircraft-for-sale", badge: "MARKET", description: "Pre-owned turbine & jet inventory" },
        ],
      },
    ],
  },
  {
    title: "MARKET",
    triggerHref: "/aircraft-for-sale",
    columns: [
      {
        heading: "AIRCRAFT MARKETPLACE",
        items: [
          { label: "Aircraft For Sale", href: "/aircraft-for-sale", badge: "AVBUYER", description: "Global aircraft listings" },
          { label: "Jets & Turboprops", href: "/aircraft-for-sale", description: "Turbine inventory & acquisition" },
          { label: "Executive Helicopters", href: "/aircraft-for-sale", description: "Rotorcraft for sale & operations" },
        ],
      },
      {
        heading: "FINANCE & OWNERSHIP",
        items: [
          { label: "Aircraft Ownership Matrix", href: "/aircraft/ownership", description: "Financial threshold calculator" },
          { label: "Aviation Finance", href: "/aviation/finance", description: "Structuring, leasing & loans" },
          { label: "Aviation Insurance", href: "/aviation/insurance", description: "Hull & third-party liability coverage" },
        ],
      },
    ],
  },
  {
    title: "AVIATION",
    triggerHref: "/aviation",
    columns: [
      {
        heading: "DIRECTORY & HUBS",
        items: [
          { label: "Airports & FBO Hubs", href: "/aviation/airports", badge: "FBO", description: "Runway data, PPR & handlers" },
          { label: "Aviation Companies", href: "/aviation", description: "Verified AOC operators & brokers" },
          { label: "EASA Flight Schools", href: "/aviation/schools", badge: "ATO", description: "Certified ATO/DTO academies" },
          { label: "Global Aviation Directory", href: "/directory", description: "Complete industry index" },
          { label: "Corporate Business Aviation", href: "/business", badge: "CORP", description: "Enterprise mobility & shuttle routes" },
        ],
      },
      {
        heading: "INTELLIGENCE & HERITAGE",
        items: [
          { label: "Aviation Careers & Professions", href: "/aviation/careers", badge: "CAREERS", description: "Pilots, dispatchers, engineers" },
          { label: "Aviation History & Pioneers", href: "/aviation/history", badge: "HERITAGE", description: "Romanian & European aviation legacy" },
          { label: "Aviation Rules & AOC", href: "/aviation/rules", description: "EASA Part-CAT & Part-NCO regulations" },
          { label: "Aviation Visual Explainers", href: "/aviation/explainers", description: "Infographics & aerospace guides" },
          { label: "Aviation Technology Journal", href: "/aviation/technology", badge: "eVTOL", description: "SAF, avionics & electric flight" },
        ],
      },
    ],
  },
  {
    title: "LEARN",
    triggerHref: "/aviation/learn",
    columns: [
      {
        heading: "KNOWLEDGE CENTER",
        items: [
          { label: "Aviation Knowledge Hub", href: "/aviation/learn", description: "Complete aeronautical primer" },
          { label: "How to Become a Pilot", href: "/aviation/learn/pilot-guide", badge: "EASA", description: "Step-by-step Part-FCL license roadmap" },
          { label: "Flight Schools Directory", href: "/aviation/schools", description: "Find certified flight training" },
          { label: "Aviation Rules & Regulations", href: "/aviation/rules", description: "Flight rules, air law & safety" },
        ],
      },
      {
        heading: "VISUAL EXPLAINERS",
        items: [
          { label: "What is an AOC?", href: "/aviation/explainers", description: "Air Operator Certificate explained" },
          { label: "What is an FBO?", href: "/aviation/explainers", description: "Fixed Base Operator handling services" },
          { label: "PPR & Slot Coordination", href: "/aviation/explainers", description: "Prior Permission Required rules" },
          { label: "What is an Empty Leg?", href: "/aviation/explainers", description: "One-way ferry flight economics" },
        ],
      },
    ],
  },
  {
    title: "JOURNAL",
    triggerHref: "/journal",
    columns: [
      {
        heading: "EDITORIAL GUIDES",
        items: [
          { label: "All Journal Articles", href: "/journal", description: "Dispatches & market insights" },
          { label: "Editorial Photo Essays", href: "/journal/photo-essays", badge: "PHOTO", description: "Visual aviation narratives" },
          { label: "Băneasa vs. Otopeni Report", href: "/journal/baneasa-vs-otopeni-comparative-report", description: "Airport comparison & time audit" },
        ],
      },
      {
        heading: "AERIAL DISCOVERY",
        items: [
          { label: "Romania From Above", href: "/romania-from-above", description: "Scenic helicopter routes & delta" },
          { label: "Helicopter Transfers", href: "/journal/helicopter-transfers-and-landing-access", description: "Point-to-point helipad access" },
        ],
      },
    ],
  },
];

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
      { label: "INTELLECTUAL PROPERTY", href: "/legal/intellectual-property", isImplemented: true },
      { label: "ACCEPTABLE USE", href: "/legal/acceptable-use", isImplemented: true },
      { label: "ACCESSIBILITY", href: "/legal/accessibility", isImplemented: true },
      { label: "GDPR RIGHTS REQUEST", href: "/legal/gdpr-requests", isImplemented: true },
    ],
  },
];
