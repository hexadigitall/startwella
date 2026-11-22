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
│          │ Architecture Fix │             │ 23/23 unit tests pass      │
├──────────┼──────────────────┼─────────────┼────────────────────────────┤
│ Sprint 2 │ Vercel CI/CD &   │ Nov 26–Dec 2│ COMPLETED (Verified)       │
│          │ PWA Field Test   │             │ Live on startwella.vercel  │
├──────────┼──────────────────┼─────────────┼────────────────────────────┤
│ Sprint 3 │ Native Mobile &  │ Dec 3–10    │ ACTIVE (In Progress)       │
│          │ Desktop Bundling │             │ Capacitor & Tauri bridges  │
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

### Sprint 2: Vercel CI/CD, Deployment & Mobile Testing (Completed)
- **Goal:** Connect GitHub repository to Vercel, verify continuous deployment, test PWA installation on real Android and iOS devices, and validate in-app WhatsApp browser behavior.
- **Completed Deliverables:**
  - [x] Create root `vercel.json` routing matrix with canonical headers (`Cache-Control: public, max-age=0, must-revalidate` for HTML; `no-cache, no-store` for Service Workers).
  - [x] Initialize Git repository, configure `.gitignore`, and set remote to `https://github.com/hexadigitall/startwella.git`.
  - [x] Push `main` branch for Vercel production deployment.
  - [x] Push `v1` branch and tag `v1.0.0-beta` for milestone preservation.
  - [x] Connect repository to Vercel and verify production alias `https://startwella.vercel.app`.
  - [x] Eliminate stale PWA cache trap with network-first strategy, dynamic cache eviction, and interactive version badge.
  - [x] Make all calculations strictly on-demand: no surprise calculations, clear confirmation badges (`✓ Calculated from your numbers just now`), and dirty input detection (`⚠️ Numbers changed`).
- **Exit Gate 2 Status:** **PASSED** (Live URL verified on Vercel edge network).

---

### Sprint 3: Native Containerization (Mobile & Desktop) (Active)
- **Goal:** Package web application into native mobile (Capacitor) and desktop (Tauri) binaries with native hardware bindings and data export capabilities.
- **Deliverables & Progress:**
  - [x] Initialize Capacitor Android/iOS wrappers (`capacitor.config.json` at root and `startwella-v1/`).
  - [x] Implement native hardware back-button listener for Android (`initNativeAppBridge` with modal dismissal & step back navigation).
  - [x] Connect native share bridge (`shareContent`) utilizing `@capacitor/share` and `navigator.share` with fallback to WhatsApp.
  - [x] Initialize Tauri 2.0 desktop scaffold (`src-tauri/tauri.conf.json`) with constrained $380 \times 600\text{px}$ minimum viewport.
  - [x] Implement local file export for PDFs (`exportPDF`) and spreadsheets (`exportPriceListCSV`, `exportStartupCSV`).
  - [x] Create root `package.json` with scripts for testing, dev server, Capacitor (`cap:sync`, `cap:android`), and Tauri (`tauri:dev`, `tauri:build`).
  - [ ] Package debug Android APK via Capacitor CLI.
  - [ ] Build Windows desktop executable via Tauri CLI.
- **Exit Gate 3 Criteria:** Signed Android `.apk` installs on test phone; Windows `.msi` / `.exe` installs on test PC.

---

### Sprint 4: Soft Launch & Commercial Validation
- **Goal:** Conduct closed beta with 20 real sellers and obtain first 10 paid sales of the Starter Kit / Pro plan.
- **Work Items:**
  - [ ] Onboard 20 target users (foodstuff sellers, home bakers, thrift dealers).
  - [ ] Monitor top used calculators and friction points via feedback forms.
  - [ ] Validate pricing sensitivity (₦7,500 one-time vs ₦2,500/month).
  - [ ] Log customer feedback and prioritize v1.1 refinement sprint.
- **Exit Gate 4 Criteria:** 50 unique active users + 10 verified transactions.
