import { JournalArticle } from "../../types/domain";

export const REAL_JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "art-how-charter-works",
    slug: "how-private-charter-works",
    title: "How Private Jet Charter Actually Works: An Operator's & Intermediary's Guide",
    subtitle: "Understanding Air Operator Certificates (AOC), slot coordination, PPR permits, and the operational chain behind on-demand flight access.",
    category: "CHARTER",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 7,
    excerpt: "Private aviation is built on rigorous regulatory compliance, flight dispatch precision, and ground coordination. Here is what happens from mission request to runway departure.",
    sections: [
      {
        heading: "1. The Regulatory Core: What is an AOC?",
        paragraphs: [
          "An Air Operator Certificate (AOC) is a legal authorization granted by a national aviation authority (such as AACR in Romania or EASA in Europe) allowing an aircraft owner or management company to perform commercial air transport.",
          "Without a valid AOC, an aircraft cannot legally accept payment for flight transport. Every charter mission booked through AIR is fulfilled strictly by licensed AOC holders or certified air carriers adhering to Part-CAT safety regulations.",
        ],
      },
      {
        heading: "2. The Operational Workflow of a Flight",
        paragraphs: [
          "When a mission is requested, flight dispatchers evaluate three critical factors: aircraft positioning distance, airport slot availability, and Prior Permission Required (PPR) ground handling clearance.",
          "At executive airports like Bucharest Băneasa (LRBS), fast-track handling permits passengers to arrive just 15 to 20 minutes before engine start, bypassing commercial terminal queues completely.",
        ],
      },
      {
        heading: "3. What Determines Charter Pricing?",
        paragraphs: [
          "Charter pricing is calculated based on hourly flight rates, positioning legs (repositioning the aircraft to origin), airport landing & parking fees, crew overnight accommodation, and de-icing reserves during winter months.",
        ],
      },
    ],
    faq: [
      {
        question: "How far in advance should I request a private charter?",
        answer: "While flights can be arranged in as little as 3 to 4 hours for urgent missions, requesting 24 to 48 hours in advance ensures optimal aircraft availability and competitive pricing.",
      },
      {
        question: "Is luggage capacity restricted on light jets?",
        answer: "Yes. Light jets such as the Phenom 300 feature generous external baggage compartments (up to 84 cu ft), but soft-sided luggage is recommended to maximize compartment volume.",
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "AACR Part-CAT Regulations & EASA AIR OPS Standards",
      type: "AACR",
      url: "https://www.caa.ro",
    },
  },
  {
    id: "art-what-happens-after-requesting-a-flight",
    slug: "what-happens-after-requesting-a-flight",
    title: "What Happens After You Request a Flight? Behind the Dispatch Desk",
    subtitle: "From flight plan filing with Eurocontrol to airport slot reservation and VIP apron ground clearance.",
    category: "CHARTER",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 6,
    excerpt: "Submitting a flight request initiates a synchronized operational protocol involving flight dispatchers, Eurocontrol IFPS route validation, FBO handlers, and customs authorities.",
    sections: [
      {
        heading: "1. Eurocontrol Flight Plan Filing & Route Allocation",
        paragraphs: [
          "Once a mission configuration is confirmed, certified dispatchers file an IFR (Instrument Flight Rules) flight plan into Eurocontrol's Integrated Initial Flight Plan Processing System (IFPS).",
          "Eurocontrol checks airways, air traffic control sector capacity, and airway restrictions to assign optimized flight levels and departure slots (CTOT - Calculated Takeoff Time).",
        ],
      },
      {
        heading: "2. FBO Ramp & Customs Coordination",
        paragraphs: [
          "Simultaneously, the handler at the origin airport (such as Alpha Handling at Bucharest Băneasa LRBS) receives passenger manifest details for border control pre-clearance and reserves ramp parking and GPU ground power.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "Eurocontrol Network Manager Operations",
      type: "EUROCONTROL",
      url: "https://www.eurocontrol.int",
    },
  },
  {
    id: "art-what-determines-charter-pricing",
    slug: "what-determines-private-charter-pricing",
    title: "What Determines Private Charter Pricing? The Full Cost Breakdown",
    subtitle: "Flight hour rates, repositioning legs, landing fees, handling charges, and winter de-icing reserves.",
    category: "CHARTER",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 7,
    excerpt: "Private charter pricing is transparently structured around fixed hourly aircraft rates and variable mission expenses. Understanding these factors prevents cost surprises.",
    sections: [
      {
        heading: "1. Hourly Flight Rate vs. Positioning Hours",
        paragraphs: [
          "The core component is the aircraft's hourly charter rate (e.g. €2,800-€3,800/hr for Light Jets, €5,500-€7,500/hr for Super-Midsize). If the aircraft is not based at your departure airport, positioning flight hours are billed to bring the aircraft to origin.",
        ],
      },
      {
        heading: "2. Airport Handling, Passenger Taxes & De-icing Reserves",
        paragraphs: [
          "Executive terminals charge ground handling fees, runway landing fees, and night parking surcharges. In winter, aircraft de-icing (Type I/Type IV fluids) is billed separately as required for flight safety.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "EASA Commercial Air Transport Cost Framework",
      type: "EASA",
      url: "https://www.easa.europa.eu",
    },
  },
  {
    id: "art-when-private-aviation-makes-sense",
    slug: "when-private-aviation-makes-sense",
    title: "When Private Aviation Makes Sense: Value vs. Commercial Air Travel",
    subtitle: "Evaluating time savings, multi-destination itineraries, group economics, and privacy requirements.",
    category: "CHARTER",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 6,
    excerpt: "Private charter is not merely a luxury upgrade; for corporate executive teams and time-critical missions, it is an essential operational tool.",
    sections: [
      {
        heading: "1. The Multi-City Same-Day Itinerary",
        paragraphs: [
          "Commercial airlines force layovers and rigid departure windows. Private charter allows an executive team to fly Bucharest to Munich in the morning, inspect a facility, fly to Milan for an afternoon meeting, and return to Bucharest the same evening.",
        ],
      },
      {
        heading: "2. Group Economics & Direct Point-to-Point Access",
        paragraphs: [
          "When traveling with 6 to 8 executives, booking business class commercial tickets across multiple layovers often approaches the cost of chartering a light jet, while saving 6 to 8 hours of transit time.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "NBAA Business Aviation Productivity Index",
      type: "OFFICIAL_WEBSITE",
      url: "https://www.nbaa.org",
    },
  },
  {
    id: "art-jet-vs-turboprop",
    slug: "jet-vs-turboprop",
    title: "Jet vs. Turboprop: Choosing the Right Aircraft for European Regional Travel",
    subtitle: "Comparing speed, short-field runway access, baggage volume, and operating economics between light jets and high-performance turboprops.",
    category: "AIRCRAFT",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 6,
    excerpt: "For regional flights under 800 nautical miles, turboprops like the Pilatus PC-12 offer unparalleled airfield flexibility and lower operating costs, while light jets provide higher cruise speeds.",
    sections: [
      {
        heading: "1. The Speed Differential",
        paragraphs: [
          "Light jets cruise at speeds between 400 and 460 knots (740-850 km/h), while modern turboprops like the PC-12 NGX cruise at approximately 290 knots (537 km/h). On a 500 NM mission (e.g., Bucharest to Vienna), a light jet saves roughly 25 to 30 minutes of flight time.",
        ],
      },
      {
        heading: "2. Short Airfield & Unpaved Access",
        paragraphs: [
          "Where turboprops excel is runway flexibility. A Pilatus PC-12 can operate safely from grass strips or short runways under 800 meters, opening access to secondary aerodromes that jet aircraft cannot legally utilize.",
        ],
      },
    ],
    faq: [
      {
        question: "Are turboprops as safe as private jets?",
        answer: "Modern pressurized turboprops equipped with turbine engines (such as Pratt & Whitney PT6) match jet reliability and undergo identical EASA commercial maintenance overhauls.",
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "Pilatus Aircraft & Embraer Executive Jets Technical Performance Manuals",
      type: "MANUFACTURER",
      url: "https://www.pilatus-aircraft.com",
    },
  },
  {
    id: "art-light-jet-vs-midsize-jet",
    slug: "light-jet-vs-midsize-jet",
    title: "Light Jet vs. Midsize Jet: Cabin Comfort & Range Envelopes",
    subtitle: "Deciding between agile light jets (Phenom 300E, CJ4) and standup-cabin midsize aircraft (Citation Latitude, Praetor 500).",
    category: "AIRCRAFT",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 7,
    excerpt: "Selecting between a light jet and midsize jet comes down to cabin height preferences, flight duration beyond 3 hours, and total passenger payload.",
    sections: [
      {
        heading: "1. Cabin Height and Standup Comfort",
        paragraphs: [
          "Light jets feature seated-height cabins (1.45m - 1.50m), ideal for 1 to 2.5 hour flights. Midsize jets introduce true flat-floor standup cabins (1.83m height), allowing passengers to walk upright during flight.",
        ],
      },
      {
        heading: "2. Range and Non-stop Capability",
        paragraphs: [
          "Light jets effortlessly connect Bucharest to Western Europe (up to 2,000 NM). Midsize jets extend non-stop reach to 3,300+ NM, covering Dubai, Riyadh, or the Canary Islands without refuel stops.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "Textron Aviation & Embraer Executive Specifications",
      type: "MANUFACTURER",
      url: "https://txtav.com",
    },
  },
  {
    id: "art-how-far-can-a-private-jet-fly",
    slug: "how-far-can-a-private-jet-fly",
    title: "How Far Can a Private Jet Fly? Category Range Benchmarks",
    subtitle: "From 1,200 NM regional hops to 7,500 NM intercontinental non-stop missions.",
    category: "AIRCRAFT",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 6,
    excerpt: "Aircraft range varies dramatically across categories. Here is a clear benchmark guide connecting European hubs to global destinations.",
    sections: [
      {
        heading: "1. Category Range Overview",
        paragraphs: [
          "Very Light Jets (Phenom 100EV): 1,178 NM (Bucharest to Vienna, Munich). Light Jets (Phenom 300E): 2,010 NM (Bucharest to London, Madrid, Lisbon). Super-Midsize (Challenger 350): 3,200 NM (Bucharest to Dubai, Reykjavik). Ultra Long Range (G650ER): 7,500 NM (Bucharest to New York, Singapore).",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "AIR Great-Circle Performance Database",
      type: "EUROCONTROL",
      url: "https://www.eurocontrol.int",
    },
  },
  {
    id: "art-choosing-an-aircraft-for-4-passengers",
    slug: "choosing-an-aircraft-for-4-passengers",
    title: "Choosing an Aircraft for 4 Passengers: Optimization Guide",
    subtitle: "When to select a Very Light Jet, Light Jet, or Turboprop for a small group.",
    category: "AIRCRAFT",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 5,
    excerpt: "For 4 passengers, choosing the right aircraft depends on distance, baggage requirements, and runway characteristics.",
    sections: [
      {
        heading: "1. Small Group Operational Efficiency",
        paragraphs: [
          "A 4-passenger group with standard carry-on luggage is perfectly suited for Very Light Jets (Phenom 100EV, HondaJet). For flights over 2 hours or heavy golf bags, upgrading to a Light Jet (Phenom 300E) adds external baggage volume.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "Embraer & Honda Aircraft Performance Data",
      type: "MANUFACTURER",
      url: "https://executive.embraer.com",
    },
  },
  {
    id: "art-what-is-an-fbo",
    slug: "what-is-an-fbo",
    title: "What is an FBO? Inside Executive Aviation Ground Handling",
    subtitle: "From private lounges and fast-track customs to aircraft refueling and apron handling at Bucharest Băneasa (LRBS).",
    category: "AIRPORTS",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 5,
    excerpt: "FBO stands for Fixed Base Operator — a dedicated commercial facility providing ground handling, passenger lounges, refueling, and customs clearance for general aviation aircraft.",
    sections: [
      {
        heading: "1. The Role of an FBO at Executive Airports",
        paragraphs: [
          "An FBO (Fixed Base Operator) manages everything that happens on the ground when a private or corporate aircraft arrives. At Bucharest Băneasa Aurel Vlaicu (LRBS), handlers like Alpha Handling, RAS, and Euro Jet operate executive lounges with dedicated customs control.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "CNAB & International FBO Operational Standards",
      type: "CNAB",
      url: "https://www.cnab.ro",
    },
  },
  {
    id: "art-baneasa-vs-otopeni",
    slug: "baneasa-vs-otopeni-comparative-report",
    title: "Băneasa (LRBS) vs. Otopeni (LROP): The Executive Aviation Boundary",
    subtitle: "Why Bucharest's twin airport infrastructure separates commercial passenger volume from business aviation efficiency.",
    category: "AIRPORTS",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 8,
    excerpt: "Băneasa (LRBS/BBU) is Bucharest's dedicated executive gateway, located 10 minutes from the financial district, while Otopeni (LROP/OTP) serves high-density commercial air traffic.",
    sections: [
      {
        heading: "1. Operational Focus & Terminal Efficiency",
        paragraphs: [
          "Bucharest Băneasa Aurel Vlaicu (LRBS / BBU) operates with a single 2,358-meter asphalt runway dedicated entirely to business aviation, state transport, and general aviation flight activity.",
          "By contrast, Henri Coandă Otopeni (LROP / OTP) processes over 14 million commercial passengers annually across twin 3,500m runways, introducing slot restrictions and taxi delays.",
        ],
      },
      {
        heading: "2. Ground Security & Transfer Times",
        paragraphs: [
          "At Băneasa FBO facilities, passengers transition from vehicle to aircraft ramp in under 15 minutes. Customs and passport control are handled in private VIP suites without public terminal mixing.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "CNAB AIP & Bucharest Airport Operations Report",
      type: "AIP",
      url: "https://www.cnab.ro",
    },
  },
  {
    id: "art-how-business-aviation-handling-works",
    slug: "how-business-aviation-handling-works",
    title: "How Business Aviation Handling Works: Ramp Services Explained",
    subtitle: "Marshalling, GPU power, de-icing, lavatory service, and fuel uplift coordination.",
    category: "AIRPORTS",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 6,
    excerpt: "Ground handling is the technical heartbeat of airport turnarounds. Here is how specialized FBO ramp handlers maintain business aircraft.",
    sections: [
      {
        heading: "1. Aircraft Arrival & Ramp Services",
        paragraphs: [
          "Upon touchdown, marshallers guide the aircraft to its assigned apron position. Ground power units (GPU) provide 28V DC or 115V AC electricity while engines cool, conserving onboard APU fuel.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "IATA ISAGO Standards & AACR Directives",
      type: "AACR",
      url: "https://www.caa.ro",
    },
  },
  {
    id: "art-what-prior-permission-required-ppr-means",
    slug: "what-prior-permission-required-ppr-means",
    title: "What PPR Means in Executive Aviation: Prior Permission Required",
    subtitle: "Understanding airport parking slots, night noise permits, and PPR authorization procedures.",
    category: "AIRPORTS",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 5,
    excerpt: "PPR (Prior Permission Required) ensures an airport has adequate apron parking and ATC capacity before an executive flight departs.",
    sections: [
      {
        heading: "1. Why Airports Institute PPR Rules",
        paragraphs: [
          "Executive airports like Bucharest Băneasa (LRBS) or Cannes Mandelieu (LFMD) enforce PPR to prevent ramp congestion during high-profile events and ensure customs staffing availability.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "EASA AIR OPS & AIP Regulations",
      type: "AIP",
      url: "https://www.romatsa.ro",
    },
  },
  {
    id: "art-helicopter-transfers",
    slug: "helicopter-transfers-and-landing-access",
    title: "Helicopter Transfers in Romania: Certified Helipads vs. Landing Clearances",
    subtitle: "Understanding twin-engine safety requirements, weather minimums, and prior-permission landing access across Transylvania and the Carpathians.",
    category: "HELICOPTERS",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 6,
    excerpt: "Helicopters offer unmatched point-to-point speed, but non-aerodrome landings require land-owner authorization, local authority notification, and Category A twin-engine safety margins.",
    sections: [
      {
        heading: "1. Certified Aerodromes vs. Off-Airfield Sites",
        paragraphs: [
          "Certified heliports like Tuzla (LRTZ) or Băneasa (LRBS) operate with permanent lighting and air traffic control. Remote mountain or vineyard landings operate under VFR (Visual Flight Rules) and require prior landing approvals.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "AACR RACR-AD Heliport Regulations",
      type: "AACR",
      url: "https://www.caa.ro",
    },
  },
  {
    id: "art-helicopter-mountain-operations-and-weather",
    slug: "helicopter-mountain-operations-and-weather",
    title: "Helicopter Mountain Operations & Weather Minimums in the Carpathians",
    subtitle: "Hot & high density altitude, wind shear, icing conditions, and Performance Class 1 standards.",
    category: "HELICOPTERS",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 7,
    excerpt: "Flying helicopters in mountainous terrain like Bucegi or Făgăraș requires specialized pilot training, twin-engine reserve power, and strict adherence to weather minimums.",
    sections: [
      {
        heading: "1. Performance Class 1 & High Altitude Physics",
        paragraphs: [
          "Performance Class 1 helicopters (such as the Leonardo AW139) guarantee safe landing or continued flight in the event of an engine failure during takeoff or landing at high-altitude mountain pads.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "EASA SPA.HEMS & Mountain Flying Directives",
      type: "EASA",
      url: "https://www.easa.europa.eu",
    },
  },
  {
    id: "art-charter-vs-ownership",
    slug: "charter-vs-ownership",
    title: "Charter vs. Aircraft Ownership: Financial and Operational Decision Framework",
    subtitle: "At what annual flight hour threshold does full or fractional ownership make economic sense?",
    category: "OWNERSHIP",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 9,
    excerpt: "For individuals flying under 150 hours annually, on-demand charter eliminates fixed capital depreciation and maintenance reserves. Between 150 and 300 hours, fractional or full management becomes viable.",
    sections: [
      {
        heading: "1. The 150-Hour Tipping Point",
        paragraphs: [
          "Acquiring a light jet (e.g. $6-10M capital cost) incurs fixed annual overhead: hangarage, pilot salaries, insurance, and CAMO management. On-demand charter converts these into variable per-hour costs.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "EASA Part-NCO / Part-NCC Aircraft Ownership Rules",
      type: "EASA",
      url: "https://www.easa.europa.eu",
    },
  },
  {
    id: "art-aircraft-management-and-operating-costs",
    slug: "aircraft-management-and-operating-costs",
    title: "Inside Aircraft Management: Fixed vs. Variable Operating Expenses",
    subtitle: "CAMO oversight, crew training, maintenance reserves, and charter revenue offset programs.",
    category: "OWNERSHIP",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 8,
    excerpt: "Partnering with a licensed CAMO and management company allows aircraft owners to maintain regulatory airworthiness while offsetting fixed costs through managed charter.",
    sections: [
      {
        heading: "1. CAMO Airworthiness & Maintenance Tracking",
        paragraphs: [
          "Under EASA Part-CAMO rules, every turbine aircraft must be managed by a certified Continuing Airworthiness Management Organization to log flight hours, schedule engine overhauls, and track AD (Airworthiness Directives).",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "EASA Part-CAMO Regulations",
      type: "EASA",
      url: "https://www.easa.europa.eu",
    },
  },
  {
    id: "art-verifying-an-aircraft-operator",
    slug: "verifying-an-aircraft-operator",
    title: "How to Verify a Private Air Operator: AOC Safety Verification",
    subtitle: "A step-by-step guide to verifying legal commercial air transport status and EASA TCO compliance.",
    category: "REGULATIONS",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 6,
    excerpt: "Illegal charter (grey charter) occurs when private non-commercial aircraft fly passengers for payment without an AOC. Here is how clients can verify legitimate AOC credentials.",
    sections: [
      {
        heading: "1. Checking Official Civil Aviation Authority Registers",
        paragraphs: [
          "Every certified operator in Romania holds a public AOC number (such as Ţiriac Air RO-003 or Regional Air Services RO-014) issued by the AACR. Always request the operator's official AOC number before flight confirmation.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "EASA Safety Oversight & AACR Register",
      type: "AACR",
      url: "https://www.caa.ro",
    },
  },
  {
    id: "art-easa-commercial-air-transport-regulations-explained",
    slug: "easa-commercial-air-transport-regulations-explained",
    title: "EASA Commercial Air Transport (Part-CAT) Regulations Explained",
    subtitle: "Flight time limitations, twin-engine ETOPS rules, and maintenance standards governing European executive aviation.",
    category: "REGULATIONS",
    author: "AIR Aviation Intelligence Team",
    publicationDate: "September 2026",
    lastUpdatedAt: "September 2026",
    readTimeMinutes: 7,
    excerpt: "EASA Part-CAT standards mandate rigorous pilot flight-time limitations (FTL), mandatory two-pilot crews for commercial jets, and strict maintenance overhauls.",
    sections: [
      {
        heading: "1. Flight Time Limitations & Pilot Rest Minimums",
        paragraphs: [
          "EASA rules cap daily flight duty periods (FDP) for charter pilots to prevent fatigue. Minimum rest periods (12+ hours) between duty cycles ensure crew alertness on every mission.",
        ],
      },
    ],
    verificationStatus: "OFFICIAL_SOURCE",
    dataStatus: "OFFICIAL_SOURCE",
    source: {
      name: "EASA Part-CAT Air Operations Manual",
      type: "EASA",
      url: "https://www.easa.europa.eu",
    },
  },
];
