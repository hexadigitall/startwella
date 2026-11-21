# StartWella — Sprints & Agile Execution Tracker (SPRINTS.md)

This document maps the project phases from [PHASES.md](file:///D:/projects/startwella/PHASES.md) into concrete, trackable engineering sprints, assigning work items, velocity, deliverables, and acceptance criteria.

---

## Sprint Cadence Overview

- **Sprint Duration:** 1 Week (7 Calendar Days)
- **Primary Branch:** `main` (Continuous Deployment via Vercel)
- **Milestone Baseline Branch:** `v1` (Tag: `v1.0.0-beta`)
- **Remote Repository:** `https://github.com/hexadigitall/startwella.git`

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SPRINT TIMELINE & CADENCE                       │
├──────────┬──────────────────┬─────────────┬────────────────────────────┤
│ Sprint   │ Focus Area       │ Target Date │ Status                     │
├──────────┼──────────────────┼─────────────┼────────────────────────────┤
│ Sprint 1 │ V1 Core Polish & │ Nov 18–25   │ COMPLETED (Verified)       │
│          │ Architecture Fix │             │ 20/20 unit tests pass      │
├──────────┼──────────────────┼─────────────┼────────────────────────────┤
│ Sprint 2 │ Vercel CI/CD &   │ Nov 26–Dec 2│ ACTIVE                     │
│          │ PWA Field Test   │             │ GitHub link, offline test  │
├──────────┼──────────────────┼─────────────┼────────────────────────────┤
│ Sprint 3 │ Native Mobile &  │ Dec 3–10    │ PLANNED                    │
│          │ Desktop Bundling │             │ Capacitor & Tauri builds   │
├──────────┼──────────────────┼─────────────┼────────────────────────────┤
│ Sprint 4 │ Soft Launch &    │ Dec 11–18   │ PLANNED                    │
│          │ First 50 Users   │             │ WhatsApp merchant pilots   │
└──────────┴──────────────────┴─────────────┴────────────────────────────┘
```

---

## Detailed Sprint Logs

### Sprint 1: V1 Core Stabilization & Mathematical Engine (Completed)
- **Goal:** Resolve all prototype bugs, decouple calculation logic into pure testable functions, and produce complete project documentation.
- **Completed Deliverables:**
  - [x] Defined complete 5-document governance suite (`AGENTS.md`, `CONTENT.md`, `README.md`, `PHASES.md`, `ARCHITECTURE.md`).
  - [x] Fixed step indexing bug (`STEP_LABELS[idx]`) and duplicate `renderTabs()`.
  - [x] Modernized [src/lib/calculations.js](file:///D:/projects/startwella/startwella-v1/src/lib/calculations.js) with comma-tolerant `parseNumber` and margin protection.
  - [x] Implemented Step-Aware "Add Another..." Architecture: tailored modal forms, batch cost allocation (Step 1), Lean vs Proper checkboxes (Step 2), monthly running overheads (Step 3), and saved products + quantities (Step 4).
  - [x] Created [tests/calculations.test.js](file:///D:/projects/startwella/startwella-v1/tests/calculations.test.js) with 23 unit tests across zero, high waste, batch allocation, and bundle quantities (100% pass).
  - [x] Built multi-currency toggle supporting NGN (₦), USD ($), and GHS (GH₵).
  - [x] Added PDF/print engine with clean print stylesheets.
  - [x] Implemented PWA `manifest.json` and `sw.js` offline cache.
- **Exit Gate 1 Status:** **PASSED**

---

### Sprint 2: Vercel CI/CD, Deployment & Mobile Testing (Active)
- **Goal:** Connect GitHub repository to Vercel, verify continuous deployment, test PWA installation on real Android and iOS devices, and validate in-app WhatsApp browser behavior.
- **Work Items:**
  - [x] Create root `vercel.json` routing matrix for zero-config deployments.
  - [x] Initialize Git repository, configure `.gitignore`, and set remote to `https://github.com/hexadigitall/startwella.git`.
  - [x] Push `main` branch for Vercel production deployment.
  - [x] Push `v1` branch and tag `v1.0.0-beta` for milestone preservation.
  - [ ] Connect repository to Vercel via dashboard or CLI.
  - [ ] Perform Lighthouse audit on production URL ($\ge 90$ Performance, Accessibility, PWA).
  - [ ] Verify WhatsApp in-app browser responsiveness and "Add to Home Screen" prompt.
- **Exit Gate 2 Criteria:** Live HTTPS URL active on Vercel with automated continuous deployment on push.

---

### Sprint 3: Native Containerization (Mobile & Desktop)
- **Goal:** Package web application into native mobile (Capacitor) and desktop (Tauri) binaries.
- **Work Items:**
  - [ ] Initialize Capacitor Android/iOS wrappers (`capacitor.config.json`).
  - [ ] Implement native hardware back-button listener for Android.
  - [ ] Connect `@capacitor/share` to device native share sheets.
  - [ ] Initialize Tauri 2.0 desktop scaffold (`src-tauri/tauri.conf.json`).
  - [ ] Implement local file export for PDFs and spreadsheets.
- **Exit Gate 3 Criteria:** Signed Android `.apk` installs on test phone; Windows `.msi` installs on test PC.

---

### Sprint 4: Soft Launch & Commercial Validation
- **Goal:** Conduct closed beta with 20 real sellers and obtain first 10 paid sales of the Starter Kit / Pro plan.
- **Work Items:**
  - [ ] Onboard 20 target users (foodstuff sellers, home bakers, thrift dealers).
  - [ ] Monitor top used calculators and friction points via feedback forms.
  - [ ] Validate pricing sensitivity (₦7,500 one-time vs ₦2,500/month).
  - [ ] Log customer feedback and prioritize v1.1 refinement sprint.
- **Exit Gate 4 Criteria:** 50 unique active users + 10 verified transactions.
