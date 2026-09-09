export interface NavItem {
  label: string;
  href: string;
  description: string;
  available: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: "PLAN FLIGHT",
    href: "/plan",
    description: "Mission planner and decision engine.",
    available: true,
  },
  {
    label: "MARKETPLACE",
    href: "/aircraft-for-sale",
    description: "Executive aircraft for sale & listings.",
    available: true,
  },
  {
    label: "AIRCRAFT",
    href: "/aircraft",
    description: "Jets, turboprops, helicopters & specs.",
    available: true,
  },
  {
    label: "AIRPORTS",
    href: "/aviation/airports",
    description: "Certified business aviation hubs & FBOs.",
    available: true,
  },
  {
    label: "BĂNEASA",
    href: "/baneasa",
    description: "Bucharest executive airport hub.",
    available: true,
  },
  {
    label: "LEARN",
    href: "/aviation/learn",
    description: "Pilot training & aviation knowledge hub.",
    available: true,
  },
  {
    label: "SCHOOLS",
    href: "/aviation/schools",
    description: "Directory of EASA flight academies.",
    available: true,
  },
  {
    label: "TECHNOLOGY",
    href: "/aviation/technology",
    description: "eVTOL, SAF & future flight innovation.",
    available: true,
  },
  {
    label: "RULES",
    href: "/aviation/rules",
    description: "EASA, AOC & airport slot regulations.",
    available: true,
  },
  {
    label: "DIRECTORY",
    href: "/directory",
    description: "Global aviation ecosystem directory.",
    available: true,
  },
  {
    label: "JOURNAL",
    href: "/journal",
    description: "Articles, photo essays & intelligence.",
    available: true,
  },
];

export const WORLDS: NavItem[] = MAIN_NAV_ITEMS;
export const FOOTER_LINKS = MAIN_NAV_ITEMS;

export const PRIORITIES = [
  { value: "FASTEST", label: "Fastest" },
  { value: "BEST_VALUE", label: "Best value" },
  { value: "MOST_COMFORTABLE", label: "Most comfortable" },
  { value: "MOST_PRIVATE", label: "Most private" },
  { value: "MOST_MEMORABLE", label: "Most memorable" },
] as const;
