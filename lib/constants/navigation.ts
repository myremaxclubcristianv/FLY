export interface NavItem {
  label: string;
  href: string;
  description: string;
  available: boolean;
}

export const WORLDS: NavItem[] = [
  {
    label: "FLY",
    href: "#fly",
    description: "Private jets, helicopters, turboprops and charter.",
    available: false,
  },
  {
    label: "EXPERIENCES",
    href: "#experiences",
    description: "Scenic flights, first flights and aviation experiences.",
    available: false,
  },
  {
    label: "BUSINESS",
    href: "#business",
    description: "Executive travel, corporate charter and mobility.",
    available: false,
  },
  {
    label: "AIRCRAFT",
    href: "#aircraft",
    description: "Explore, compare and understand aircraft.",
    available: false,
  },
  {
    label: "AVIATION",
    href: "#aviation",
    description: "Airports, operators, FBO, MRO and services.",
    available: false,
  },
  {
    label: "JOURNAL",
    href: "#journal",
    description: "Guides, routes, aircraft explainers and intelligence.",
    available: false,
  },
];

export const FOOTER_LINKS = WORLDS;

export const PRIORITIES = [
  { value: "FASTEST", label: "Fastest" },
  { value: "BEST_VALUE", label: "Best value" },
  { value: "MOST_COMFORTABLE", label: "Most comfortable" },
  { value: "MOST_PRIVATE", label: "Most private" },
  { value: "MOST_MEMORABLE", label: "Most memorable" },
] as const;
