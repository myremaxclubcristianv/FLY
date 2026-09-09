# AIR — The Easiest Way to Fly

> **Positioning**: AIR is an aviation access, discovery, and decision platform.  
> **Core Promise**: Tell us where you're going. We'll find the right way to fly.  
> **Location**: Bucharest, Romania // Primary access hub: Băneasa (LRBS / BBU).

---

## 1. What is AIR?

AIR is **NOT** simply a private jet charter website or generic SaaS booking tool. It is an intelligent aviation access platform designed to resolve the fundamental tension in private flight discovery:

1. **Simple enough** that someone who has never flown privately immediately understands how to get from point A to point B.
2. **Credible enough** that an experienced private aviation customer finds it precise, technical, and authoritative.

Instead of requiring customers to understand aircraft models, runway lengths, or operator jargon, the customer answers four basic questions:
- **WHERE?** (Origin & Destination)
- **WHEN?** (Schedule & Timing)
- **WHO?** (Passenger manifest)
- **WHAT MATTERS?** (Speed, Value, Comfort, Privacy, Experience)

AIR translates these parameters into the optimal flight vehicle profile—whether that is a twin-engine helicopter landing directly on a mountain pad, a high-performance turboprop, a light executive jet, or a chauffeured ground connection.

---

## 2. Phase 1 Scope

Phase 1 establishes the production-grade foundation of the platform:
- **Design System**: Quiet, cinematic, dark aesthetic (`#090A0B`), restrained typography (`Inter`, `Playfair Display`, `JetBrains Mono`), and custom token system.
- **Global Layout**: Editorial Header, Footer, and Mobile Navigation with drawer menu & sticky mobile CTA bar.
- **Homepage**: Hero with vector route geometry, integrated search form, Decision Engine showcase (`Bucharest → Bran`), 6-World platform grid (`FLY`, `EXPERIENCES`, `BUSINESS`, `AIRCRAFT`, `AVIATION`, `JOURNAL`), category previews, regional destinations, and brand statement.
- **Flight Planner (`/plan`)**: Multi-step decision flow (`Where`, `When`, `Who`, `Priority`, `Contact`) with interactive progress tracking and decision proposal confirmation state.
- **SEO & Accessibility**: Complete OpenGraph, Twitter, Organization JSON-LD schema, WCAG 2.2 AA skip links, keyboard navigation focus rings, and dynamic sitemap/robots.
- **Data Integrity Layer**: Typed data status badges (`LIVE`, `VERIFIED`, `INDICATIVE`, `REQUEST`, `UNAVAILABLE`) enforcing strict transparency.

### Explicitly Excluded from Phase 1 (Future Scope):
- No Supabase or database connections (state is managed cleanly in local client modules).
- No live operator booking, payment processing, or fake live flight availability.
- No fabricated aircraft photos or AI jet images disguised as real fleet assets.

---

## 3. Technology Stack

- **Framework**: Next.js 15 (App Router, React Server Components by default)
- **Language**: TypeScript 5.8 (Strict mode)
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"` with `@theme inline` tokens)
- **Typography**: `next/font` (`Inter`, `Playfair Display`, `JetBrains Mono`)
- **Linting & Code Quality**: ESLint 9 (`next/core-web-vitals`), zero heavy animation/WebGL dependencies.

---

## 4. Development Commands

```bash
# Install dependencies
npm install

# Start local development server (with Turbopack)
npm run dev

# Run linting check
npm run lint

# Run production build compilation
npm run build

# Start production server
npm run start
```

---

## 5. File Structure

```
app/
├── layout.tsx                # Root layout with fonts, metadata, header, footer, skip link
├── page.tsx                  # Homepage assembling Hero, DecisionEngine, WorldsGrid, Previews, Editorial
├── globals.css               # Design system tokens, custom CSS layers, typography variables
├── opengraph-image.tsx       # Dynamic OG image generator using next/og
├── sitemap.ts                # Dynamic sitemap for active routes (/ and /plan)
├── robots.ts                 # SEO robots configuration
└── plan/
    ├── layout.tsx            # Planner layout
    └── page.tsx              # Multi-step decision engine planner (/plan)

components/
├── layout/
│   ├── Header.tsx            # Editorial navigation header
│   ├── Footer.tsx            # Platform footer with brand & Romania context
│   ├── MobileNav.tsx         # Mobile drawer menu & sticky mobile bottom bar
│   └── Container.tsx         # Max-width layout container
├── ui/
│   ├── Button.tsx            # Premium restrained buttons
│   ├── Input.tsx             # Accessible dark inputs
│   ├── Select.tsx            # Accessible select controls
│   ├── Label.tsx             # Form labels with data style options
│   ├── Badge.tsx             # Status & category badges
│   └── Card.tsx              # Architectural cards (restrained design)
├── home/
│   ├── Hero.tsx              # Quiet cinematic dark hero with route geometry
│   ├── FlightSearchForm.tsx  # Integrated simple search (FROM, TO, DATE, PASSENGERS)
│   ├── DecisionEngine.tsx    # "Bucharest -> Bran" conceptual recommendation showcase
│   ├── WorldsGrid.tsx        # 6-world editorial grid (FLY, EXPERIENCES, BUSINESS, etc.)
│   ├── AircraftPreview.tsx   # Fleet intelligence preview
│   ├── ExperiencesPreview.tsx # Curated mission preview
│   ├── DestinationsPreview.tsx # Romania access preview
│   ├── EditorialSection.tsx  # Brand statement
│   └── JournalPreview.tsx    # Aviation dispatch preview
├── plan/
│   ├── PlannerSteps.tsx      # Step orchestrator & subtle progress indicator
│   ├── StepWhere.tsx         # Step 1: Departure & Arrival
│   ├── StepWhen.tsx          # Step 2: Flight date & optional time
│   ├── StepWho.tsx           # Step 3: Passengers & mission details
│   ├── StepPriority.tsx      # Step 4: Priority selection
│   ├── StepContact.tsx       # Step 5: Contact details
│   └── PlannerConfirmation.tsx # Final decision preview state
└── shared/
    ├── DataStatusBadge.tsx   # Badge displaying DataStatus (LIVE, VERIFIED, INDICATIVE, REQUEST)
    ├── SectionHeader.tsx     # Typography hierarchy header block
    └── PlaceholderImage.tsx  # Abstract dark atmospheric vector visual placeholder

lib/
└── utils.ts                  # Classname merging & utility functions

constants/
├── brand.ts                  # Brand statements & positioning copy
├── navigation.ts             # Navigation hierarchy & links
└── seo.ts                    # SEO metadata defaults & JSON-LD structures

types/
├── flight-request.ts         # Multi-step state & query param types
├── demo-data.ts              # Types for decisions, worlds, previews, quotes
└── verification.ts           # Data status enum & verification types

data/
└── demo/
    ├── decision-example.ts   # Bucharest -> Bran helicopter decision payload
    ├── worlds.ts             # Six worlds definition & visual data
    └── experiences-preview.ts# Lightweight teaser preview data
```

---

## 6. Data Integrity & Status Rules

Every data point displayed in AIR must explicitly declare its status via `DataStatus`:
- `INDICATIVE`: Conceptually calculated benchmark or route duration.
- `REQUEST`: Mission or quote available by request; no real booking finalized.
- `VERIFIED`: Verified operator or airfield data point.
- `LIVE`: Real-time availability (future phases).

**Rule for Developers**: Never silently present demo data or estimated times as live, confirmed, or guaranteed. Always wrap calculations in `DataStatusBadge`.

---

## 7. Future Backend Roadmap

- **Phase 2**: Supabase integration for request persistence, user accounts, and operator directory.
- **Phase 3**: Live air charter API integrations, airport METAR/TAF weather feeds, and real-time aircraft positioning.
- **Phase 4**: Corporate flight management dashboard, MRO, aviation finance, and acquisition services ecosystem.
