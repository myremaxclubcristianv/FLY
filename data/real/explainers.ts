import { AviationExplainer } from "@/types/domain";

export const REAL_AVIATION_EXPLAINERS: AviationExplainer[] = [
  {
    id: "exp-1",
    slug: "what-is-an-aoc",
    title: "What is an Air Operator Certificate (AOC)?",
    category: "REGULATORY",
    shortDefinition:
      "An AOC is the official aviation license issued by a National Civil Aviation Authority (such as EASA or AACR) that authorizes a company to perform commercial air transport operations.",
    detailedExplanation: [
      "An Air Operator Certificate (AOC) represents the highest regulatory threshold in commercial aviation. Without an AOC, an aircraft owner or pilot cannot legally charge money for transporting passengers or cargo.",
      "Obtaining an AOC requires stringent compliance auditing: dedicated Accountable Managers, Safety Management Systems (SMS), Continuing Airworthiness Management Organizations (CAMO), pilot proficiency checks every 6 months, and rigorous insurance coverage.",
      "When flying with an AOC operator, passengers benefit from strict regulatory oversight that guarantees legal compliance, maintenance auditing, and crew duty-time limitations.",
    ],
    keyTakeaways: [
      "Mandatory for commercial passenger transport.",
      "Enforces EASA crew duty-time and fatigue management rules.",
      "Requires independent airworthiness auditing by CAMO.",
      "Distinguishes legal commercial charter from illegal grey market flights.",
    ],
    realWorldExample: "Toyo Aviation SRL operates under AACR certificate RO.AOC.024.",
    glossaryTerms: [
      { term: "EASA", definition: "European Union Aviation Safety Agency" },
      { term: "AACR", definition: "Autoritatea Aeronautică Civilă Română" },
      { term: "CAMO", definition: "Continuing Airworthiness Management Organization" },
    ],
    authoritativeSource: "EASA Regulation (EU) No 965/2012 on Air Operations",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "exp-2",
    slug: "what-is-an-fbo",
    title: "What is a Fixed-Base Operator (FBO)?",
    category: "OPERATIONS",
    shortDefinition:
      "An FBO is a specialized commercial terminal facility located at an airport that provides ground handling, VIP lounges, fueling, hangarage, and concierge services for business aviation.",
    detailedExplanation: [
      "Unlike main airline passenger terminals, an FBO is designed specifically for private jet passengers, flight crews, and executive aircraft.",
      "Passengers arriving at an FBO bypass public security lines, clearing dedicated customs and immigration in minutes before boarding directly on the ramp.",
      "FBOs also provide essential operational services for aircraft operators: Jet-A1 refueling, de-icing, GPU power units, crew rest lounges, and flight planning facilities.",
    ],
    keyTakeaways: [
      "Bypasses main airport congestion and long security lines.",
      "Provides rapid 5-minute passenger boarding and dedicated customs clearance.",
      "Offers Jet-A1 refueling, ground handling, and executive crew facilities.",
    ],
    realWorldExample: "Globe Ground Romania FBO at Bucharest Băneasa Airport (LRBS / BBU).",
    glossaryTerms: [
      { term: "FBO", definition: "Fixed-Base Operator" },
      { term: "GPU", definition: "Ground Power Unit" },
      { term: "Ramp", definition: "Apron area where aircraft park and load passengers" },
    ],
    authoritativeSource: "IBAC International Standard for Business Aircraft Handling (IS-BAH)",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "exp-3",
    slug: "what-is-ppr-and-slot-coordination",
    title: "What is PPR (Prior Permission Required) & Slot Coordination?",
    category: "OPERATIONS",
    shortDefinition:
      "PPR and Airport Slots are operational restrictions enforced by airports to manage ramp space, runway capacity, noise abatement, and customs clearance schedules.",
    detailedExplanation: [
      "PPR (Prior Permission Required) means an aircraft operator must request explicit authorization from airport operations before departing or landing.",
      "High-density airports (such as Nice LFMN, Cannes LFMD, or Mykonos LGMK) require strict arrival/departure slot allocation during peak season due to limited aircraft parking space.",
      "Failing to obtain a valid PPR or missing an assigned slot can result in heavy fines, mandatory positioning to alternate airports, or delayed departure.",
    ],
    keyTakeaways: [
      "Essential for peak season private jet travel to Mediterranean and Alpine destinations.",
      "Guarantees ramp parking space and ground handling availability.",
      "Managed server-side by AIR handling dispatch teams.",
    ],
    realWorldExample: "Nice Côte d'Azur (LFMN) enforces strict PPR parking slot allocations in summer.",
    glossaryTerms: [
      { term: "PPR", definition: "Prior Permission Required" },
      { term: "Slot", definition: "Allocated timeframe for aircraft arrival or departure" },
    ],
    authoritativeSource: "IATA Worldwide Airport Slots Guidelines (WASG)",
    image: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "exp-4",
    slug: "what-is-an-empty-leg",
    title: "What is an Empty Leg Flight?",
    category: "COMMERCIAL",
    shortDefinition:
      "An Empty Leg (or repositioning flight) occurs when a private aircraft flies without passengers to return to its home base or position for a booked charter mission.",
    detailedExplanation: [
      "When a customer charters a private jet one-way (e.g., Bucharest to Nice), the aircraft must fly back to base or position to another airport for its next mission.",
      "Operators offer these repositioning legs at discounts of up to 50%–75% compared to standard charter rates.",
      "Empty legs have fixed routes and departure windows; if the primary charter customer changes their schedule, the empty leg may be altered or canceled.",
    ],
    keyTakeaways: [
      "Offers up to 75% savings on private jet flights.",
      "Route and departure time depend strictly on the primary charter schedule.",
      "Ideal for flexible luxury travelers.",
    ],
    realWorldExample: "A repositioning flight on a Phenom 300E from Nice (LFMN) back to Bucharest Băneasa (LRBS).",
    glossaryTerms: [
      { term: "Repositioning", definition: "Flight flown to move an aircraft to where it is needed" },
      { term: "One-Way Charter", definition: "Charter booking where the customer does not return on the same aircraft" },
    ],
    authoritativeSource: "EBAA European Business Aviation Association Charter Guide",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
  },
];
