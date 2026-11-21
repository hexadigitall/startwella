# StartWella — Phased Roadmap & Implementation Masterplan (PHASES.md)

This document governs the phased execution of StartWella, detailing the work items, exit gates, deliverables, and the active punchlist required to close out Version 1.0 and expand into subsequent market releases.

---

## 1. Master Phase Matrix

```
┌──────────┬───────────────────────────────┬────────────┬─────────────────────────────┐
│ Phase    │ Focus Area                    │ Target     │ Exit Gate Criteria          │
├──────────┼───────────────────────────────┼────────────┼─────────────────────────────┤
│ Phase 0  │ Discovery & Market Validation │ 1–2 Days   │ 3 user interviews + 5 cases │
│ Phase 1  │ Spec, Formulas & Design System│ 2–3 Days   │ Spec & formulas hand-checked│
│ Phase 2  │ Mobile Prototype & Flow       │ 2–3 Days   │ 3 users complete unassisted │
│ Phase 3  │ Build: 4 Core Calculators     │ 4–5 Days   │ 100% unit tests pass        │
│ Phase 4  │ Build: Save, WhatsApp & PDF   │ 2–3 Days   │ Save + WA + PDF on device   │
│ Phase 5  │ QA, Hardening & Security      │ 2 Days     │ 20 test vectors + audit pass│
│ Phase 6  │ Launch, Sales & Customer Loop │ Ongoing    │ 50 users + 10 paying sales  │
│ Phase 7+ │ v2.0 SaaS & Multi-Platform    │ Post-v1    │ Cloud sync + subscriptions  │
└──────────┴───────────────────────────────┴────────────┴─────────────────────────────┘
```

---

## 2. Phase-by-Phase Deliverables & Exit Gates

### Phase 0: Discovery & Validation
- **Objective:** Confirm market appetite and baseline cost structures across target categories before heavy engineering.
- **Deliverables:**
  - `A0-01` Problem Statement (solopreneurs pricing blind, cash leaks in packaging/waste).
  - `A0-02` User Interview Summaries (foodstuff trader, home baker, fashion thrift reseller).
  - `A0-03` Real Pricing Case Studies (e.g., 1kg Oloyin beans, 8" vanilla cake).
  - `A0-04` Demand Signal Log.
  - `A0-05` Pricing Decision Note (₦7,500 one-time Starter Kit vs ₦2,500/mo Pro).
- **Exit Gate 0:** 3 documented interviews + 5 real pricing models + $\ge 10$ pre-launch user signups.

### Phase 1: Product Spec, Formulas & Design System
- **Objective:** Finalize mathematical models, plain-English copy deck, and visual brand identity.
- **Deliverables:**
  - `A1-01` Mathematical Formula Sheet (verified with 10 hand-calculated examples).
  - `A1-02` Plain-English Copy Deck (all labels, helpers, error messages in plain text).
  - `A1-03` Brand Identity System (v7 Official: Teal `#0EA47A`, Navy `#0F2A44`, Gold `#F2B705`).
  - `A1-04` Data Model Specification (Product, StartupEstimate, BreakEven, Bundle schemas).
  - `A1-05` Five Category Templates (Foodstuff, Baking, Skincare, Thrift, Catering).
- **Exit Gate 1:** Formulas verified by hand + copy deck locked + brand guidelines signed off.

### Phase 2: Design & Clickable Prototype
- **Objective:** Design intuitive mobile-first interface optimized for $360\text{px}$ viewports.
- **Deliverables:**
  - `A2-01` User Flow Map (Home $\rightarrow$ Price $\rightarrow$ Startup $\rightarrow$ Break-Even $\rightarrow$ Bundle $\rightarrow$ Save $\rightarrow$ Share).
  - `A2-02` Low-Fidelity Wireframes.
  - `A2-03` High-Fidelity UI Screens.
  - `A2-04` Clickable Prototype & Usability Test Report.
- **Exit Gate 2:** 3 independent micro-sellers complete a full product calculation in under 5 minutes without guidance.

### Phase 3: Build — Core Calculators Engine
- **Objective:** Build robust mathematical library and interactive calculation UI.
- **Deliverables:**
  - `A3-01` Modern codebase scaffold with build and testing toolchain.
  - `A3-02` `src/lib/calculations.js` with zero side-effects and 100% test coverage.
  - `A3-03` Interactive UI for all 4 calculators.
  - `A3-04` Preloaded example data (1kg Oloyin beans) + 5 category templates.
- **Exit Gate 3:** All 10 hand-worked math cases pass automated unit tests + all 4 calculators render on mobile screen.

### Phase 4: Build — Save, Share & Export
- **Objective:** Enable practical utility in daily commerce — saving catalogs and sharing to WhatsApp.
- **Deliverables:**
  - `A4-01` LocalStorage persistence manager (with corruption safeguards and schema versioning).
  - `A4-02` WhatsApp Price Card generator (direct `wa.me` integration with structured text).
  - `A4-03` Client-side PDF export (printable summary sheet).
  - `A4-04` Social Status image generation support.
- **Exit Gate 4:** User can calculate $\rightarrow$ save $\rightarrow$ generate WhatsApp text/PDF in under 5 minutes on a phone.

### Phase 5: QA, Security & Launch Readiness
- **Objective:** Ensure mathematical integrity, cross-browser stability, and security hardening.
- **Deliverables:**
  - `A5-01` QA Checklist signed off across Android Chrome, iOS Safari, desktop browsers.
  - `A5-02` 20 Edge-Case Test Vectors executed (zero costs, 90% waste, negative margins, large numbers).
  - `A5-03` Launch Assets (landing page, 60-second video demo, 3 launch social posts).
  - `A5-04` Feedback loop established (WhatsApp support link + Google Form).
- **Exit Gate 5:** Zero high/critical bugs + 100% QA test vector pass + demo video and landing page live.

### Phase 6: Commercial Launch & Feedback Loop
- **Objective:** Soft launch, validate paid conversion, and gather customer telemetry.
- **Deliverables:**
  - `A6-01` Launch execution log (dates, channels, metrics).
  - `A6-02` Customer feedback synthesis (first 10 reviews).
  - `A6-03` Sales log (first 10 paid sales recorded).
  - `A6-04` Post-v1 refinement list and v2 SaaS roadmap.
- **Exit Gate 6:** 50 active users + 10 paying customers + prioritized feature roadmap for v1.1/v2.0.

---

## 3. The Active v1 Close-Out Punchlist

The following tasks represent the exact delta between the current codebase state and a completed, production-ready Version 1.0:

```
[x] PUNCHLIST: CLOSING OUT VERSION 1.0
 │
 ├── [x] 1. Architecture & Documentation Foundations
 │    ├── [x] Create AGENTS.md (contributor & agent operating rules)
 │    ├── [x] Create CONTENT.md (copy deck, formulas, templates, legal disclaimers)
 │    ├── [x] Create README.md (master documentation & setup guide)
 │    ├── [x] Create PHASES.md (this implementation roadmap)
 │    ├── [x] Create ARCHITECTURE.md (technical system design & data contracts)
 │    ├── [x] Create SPRINTS.md (agile sprint cadence & milestone tracking)
 │    └── [x] Create DEPLOYMENT.md (Vercel deployment & verification guide)
 │
 ├── [x] 2. Core Codebase Modernization & Fixes
 │    ├── [x] Create package.json with standard scripts (dev, build, test)
 │    ├── [x] Fix header step index bug (STEP_LABELS[idx][idx] -> STEP_LABELS[idx])
 │    ├── [x] Remove duplicate renderTabs() declaration in index.html
 │    ├── [x] Refactor calculations engine into src/lib/calculations.js
 │    ├── [x] Add comma-tolerant number parsing (replace raw Number() with parseNumber())
 │    └── [x] Sanitize custom item inputs to eliminate XSS/HTML injection risks
 │
 ├── [x] 3. Fulfill Missing In-Scope v1 Features
 │    ├── [x] Feature F6: Add Client-Side PDF / Print Export
 │    ├── [x] Add Currency Switcher toggle in header (₦ NGN, $ USD, ₵ GHS)
 │    ├── [x] Implement PWA manifest.json and Service Worker (sw.js) for offline capability
 │    └── [x] Configure root vercel.json for continuous deployment
 │
 ├── [x] 4. Automated Testing & Verification
 │    ├── [x] Create tests/calculations.test.js
 │    ├── [x] Implement 20 standard automated test cases (edge cases, floating-point, waste limits)
 │    └── [x] Verify 100% test pass via npm test (20/20 tests passing)
 │
 └── [ ] 5. Distribution Preparation
      ├── [x] Configure Desktop bundle scaffold (src-tauri/tauri.conf.json)
      ├── [x] Configure Mobile bundle scaffold (capacitor.config.json)
      ├── [ ] Push main & v1 branch to GitHub (https://github.com/hexadigitall/startwella.git)
      └── [ ] Connect GitHub repository to Vercel for live deployment
```

---

## 4. Subsequent Version Roadmap (v1.1 $\rightarrow$ v2.0)

### Version 1.1: Polished Toolkit
- Dynamic WhatsApp Status Card generator (HTML5 Canvas export to PNG/JPEG image).
- Bulk recipe/batch-to-unit converter for bakers and caterers.
- Cloud backup export/import via encrypted JSON file.
- Multi-language support (English, Nigerian Pidgin English).

### Version 2.0: Connected Commercial SaaS
- **Backend & Authentication:** Supabase / PostgreSQL with passwordless WhatsApp OTP login.
- **Cloud Synchronization:** Real-time multi-device sync with offline-first local cache.
- **Recipe & Inventory Costing (BOM):** Link raw materials inventory directly to product pricing; changing bulk flour price auto-updates all cake margins.
- **Payment & Invoicing Gateway:** Built-in Paystack & Flutterwave integration to generate customer invoices, payment links, and receipts.
- **Multi-Tenant Team Accounts:** Multi-user access for bakery assistants, shop clerks, and managers with role-based permissions.
- **AI Pricing Assistant:** Benchmark pricing against real-time local market commodity indices.
