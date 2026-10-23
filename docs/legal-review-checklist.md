# INTERNAL LEGAL & REGULATORY COMPLIANCE REVIEW CHECKLIST
**Platform:** AIR by Cristian Văduva (`https://fly.cristianvaduva.com`)  
**Target Counsel:** Qualified Romanian Aviation & Commercial Legal Counsel  
**Document Purpose:** Internal issue-spotting matrix for formal legal review. This document does not constitute formal legal advice or attorney approval.

---

## 1. Charter Intermediation & Legal Classification
- [ ] **Broker vs. Concierge vs. Air Carrier Status:** Review platform positioning under Romanian Air Code (Law 21/2020) and Regulation (EC) No 1008/2008. Ensure marketing copy does not create statutory exposure as an unauthorized air carrier or air operator.
- [ ] **Aviation Intermediary Registration:** Verify whether Romanian aviation authorities (AACR / MT) require registration or notification for charter brokers/concierges operating in Romanian airspace.
- [ ] **Contractual Tripartite Structure:** Confirm that the charter agreement explicitly runs between the client and the certified AOC air carrier, with AIR positioned strictly as an authorized intermediary/mandatary or concierge.

## 2. Flight Availability & Price Advertising
- [ ] **Indicative vs. Binding Quotes:** Audit all public website prices. Confirm all prices are clearly labelled as *indicative mission estimates* and that binding contract prices are issued only following aircraft tail assignment and slot/crew feasibility review by the operating AOC holder.
- [ ] **Empty Leg Disclosures:** Review terms for one-way repositioning flights ("Empty Legs") regarding potential cancellation or time shifting if the primary charter mission changes.
- [ ] **Misleading Advertising:** Confirm compliance with Romanian Law 158/2008 on misleading advertising and unfair commercial practices (Ordinance 21/1992 on consumer protection).

## 3. Operating Carrier & AOC Disclosures
- [ ] **Carrier Identification:** Ensure compliance with Regulation (EC) No 2111/2005 (informing air passengers of the identity of the operating carrier). When an operator has not yet been selected, the state `OPERATOR NOT YET CONFIRMED` is displayed until contract signature.
- [ ] **EU Safety List / Blacklist Verification:** Verify automated or procedural checks ensuring no charter request is routed to carriers banned under the EU Safety List.
- [ ] **AOC Number Transparency:** Establish standard protocol for displaying AOC holder corporate name, registered country, and AOC certificate number on charter quote documents.

## 4. Customer Contracts, Cancellation & Force Majeure
- [ ] **Cancellation Fees & Penalties:** Review the tier structure for cancellation fees (e.g., > 14 days, 7–14 days, < 48 hours) against Romanian Civil Code provisions on liquidated damages and penalty clauses.
- [ ] **Weather, AOG & Force Majeure:** Ensure aircraft technical malfunction (Aircraft on Ground - AOG) or weather restrictions specify standard recovery protocols: replacement aircraft sourcing rules, differential charter costs, and refund conditions.
- [ ] **Subcharter & Aircraft Substitution:** Standardize contractual language permitting the substitution of an equivalent or superior category aircraft if the primary airframe is incapacitated.

## 5. Consumer Protection & Dispute Resolution
- [ ] **ANPC Mandatory Disclosures:** Ensure all Romanian public consumer-facing pages include the required ANPC (Autoritatea Națională pentru Protecția Consumatorilor) and SAL (Soluționarea Alternativă a Litigiilor) informational links.
- [ ] **Right of Withdrawal (Right to Cancel):** Clarify the application of Article 16(l) of Emergency Ordinance 34/2014 (transposing EU Directive 2011/83/EU), which exempts passenger transport and accommodation/leisure services provided on a specific date from the 14-day statutory cooling-off withdrawal right.

## 6. GDPR, ePrivacy & Lead Processing
- [ ] **Legal Basis for Processing:** Identify lawful basis under Article 6 GDPR for mission request lead ingestion (pre-contractual steps at data subject's request) vs marketing newsletter consent.
- [ ] **Honeypot Anti-Spam & Technical Telemetry:** Review anti-spam honeypot fields (`_air_hp_fax_ref`) and client IP/user-agent hashing to ensure compliance with ePrivacy Directive (Directive 2002/58/EC) and Romanian Law 506/2004.
- [ ] **Data Retention Periods:** Formalize retention policy for unconfirmed mission requests (e.g., purge after 180 days) vs confirmed flight manifests (retained for tax, safety, and accounting audits).
- [ ] **Data Processing Agreements (DPA):** Confirm DPAs are in place with hosting providers (Vercel), database infrastructure (Supabase), and notification services (Resend / Telegram).

## 7. Aircraft Sales Lead Generation & Intermediary Role
- [ ] **Brokerage vs. Advertising Portal:** Clarify legal role in aircraft transactions. The platform currently displays illustrative profiles and verified partner listings without acting as an escrow agent or title transfer escrow.
- [ ] **Anti-Money Laundering (AML / KYC):** Review AML obligations under Romanian Law 129/2019 (transposing 5th EU AML Directive) regarding luxury asset intermediation and aircraft acquisitions exceeding €10,000 threshold.
- [ ] **Commission & Success Fee Agreements:** Draft standard NDA and Buyer/Seller Mandate agreements for private aircraft acquisitions originating from platform introductions.

## 8. Aviation Insurance Distribution (IDD & ASF Compliance)
- [ ] **Insurance Distribution Directive (Directive (EU) 2016/97):** Confirm that the platform's role is strictly limited to providing informational/educational material and introducing aircraft owners to licensed insurance brokers, without conducting insurance mediation or binding coverage, which would trigger mandatory registration with the Romanian Financial Supervisory Authority (ASF).
- [ ] **EU Regulation 785/2004 Compliance:** Ensure educational copy accurately distinguishes third-party liability minimums indexed to MTOW in Special Drawing Rights (SDRs) from hull all-risks agreed-value underwriting.

## 9. Intellectual Property, Third-Party Data & Imagery
- [ ] **Aeronautical Data Sourcing:** Verify terms of service for references to ROMATSA eAIP Romania, EUROCONTROL, and public aerodrome publications.
- [ ] **Aircraft Manufacturer Imagery:** Confirm that stock photography is properly credited as illustrative and that manufacturer trademarks (Embraer, Gulfstream, Bombardier, Pilatus, Dassault) are used strictly under nominative fair use to describe aircraft models.
- [ ] **Partner & FBO Logos:** Audit any operator, FBO, or handling agent names to ensure no false sponsorship or authorized partnership is implied without an executed agreement.

## 10. Terms of Service, Disclaimers & Governing Law
- [ ] **Governing Law & Jurisdiction:** Specify Romanian law as the governing law and the competent courts of Bucharest, Romania, for commercial disputes.
- [ ] **Limitation of Liability:** Review enforceability of liability disclaimers regarding airport operational status, NOTAM delays, runway closures, third-party operator cancellations, and straight-line calculated flight-time estimates.
- [ ] **Website Terms & Privacy Notice Updates:** Ensure all legal links in the footer (`/legal/terms`, `/legal/privacy`, `/legal/cookies`, `/legal/aviation-disclaimer`) are consistently linked and accessible.
