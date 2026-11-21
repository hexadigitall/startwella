# StartWella 🚀
**Start well. Price right. Grow steady.**

[![Version](https://img.shields.io/badge/version-1.0.0--beta-teal.svg)](file:///D:/projects/startwella/README.md)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](file:///D:/projects/startwella/README.md)
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20PWA%20%7C%20Desktop%20%7C%20Mobile-orange.svg)](file:///D:/projects/startwella/README.md)
[![Vercel Deployment](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](file:///D:/projects/startwella/DEPLOYMENT.md)
[![Repository](https://img.shields.io/badge/github-hexadigitall%2Fstartwella-181717?logo=github)](https://github.com/hexadigitall/startwella.git)

StartWella is a mobile-first **pricing, startup cost, and break-even toolkit** designed for small businesses, micro-entrepreneurs, and prospective founders in emerging markets (Nigeria first: ₦ NGN, with USD $ and GHS ₵ support).

In under 5 minutes, an entrepreneur can calculate their **true unit cost**, determine their **correct selling price**, estimate their **one-time startup capital**, and verify their **break-even sales targets** — entirely in plain English without confusing accounting jargon.

---

## 📑 Table of Contents
1. [Core Features](#-core-features)
2. [Project Architecture](#-project-architecture)
3. [The Four Core Calculators](#-the-four-core-calculators)
4. [Quickstart & Development](#-quickstart--development)
5. [Packaging & Distribution](#-packaging--distribution)
   - [Progressive Web App (PWA)](#progressive-web-app-pwa)
   - [Native Desktop (Tauri)](#native-desktop-tauri)
   - [Native Mobile (Capacitor)](#native-mobile-capacitor)
6. [Roadmap & Milestone Status](#-roadmap--milestone-status)
7. [Documentation Links](#-documentation-links)

---

## 🌟 Core Features

- **True Unit Cost Engine:** Accounts for bulk purchase, inbound transport, packaging, manual labour, and yield waste/spillage.
- **Smart Price Recommendation:** Generates Low (10%), Standard (25%), and Premium (40%) price tiers with instant SAFE/LOSS alerts.
- **Startup Capital Estimator:** Distinguishes one-time startup capital from unit costs, pre-configured with industry templates and contingency buffers.
- **Break-Even Recovery Timeline:** Calculates exact units and calendar weeks required to recoup initial investment.
- **Bundle & Discount Loss Protector:** Verifies multi-item combo packs and markdown discounts to prevent hidden losses.
- **Local-First & Offline Resilience:** Zero sign-up required; calculations and saved items persist in private device storage.
- **WhatsApp Integration:** Instant single-product price card sharing and customer-ready price list generation.

---

## 🏗️ Project Architecture

```
startwella/
├── AGENTS.md                  # Autonomous agent & contributor operating rules
├── CONTENT.md                 # Single source of truth for copy, formulas & templates
├── PHASES.md                  # Phased roadmap, milestone gates & punchlist
├── ARCHITECTURE.md            # Technical system design, schemas & cross-platform plan
├── README.md                  # Master project guide (this document)
├── StartWella-V1-Product-Documentation.pdf # Original specification PDF
├── assets/                    # Master brand assets (logos, icons, color palettes)
│   ├── BRAND-GUIDE.md         # Official v7 brand style rules
│   ├── logo-master-transparent.png # Master logo with transparent padding
│   └── logo-fullbleed-1024.png     # Full-bleed square icon for app stores
└── startwella-v1/             # Application codebase
    ├── index.html             # Mobile-first standalone web app
    ├── package.json           # Node.js project manifest & scripts
    ├── docs/                  # Product documentation archive
    └── src/
        └── lib/
            ├── calculations.js  # Pure mathematical calculation engine
            ├── storage.js       # LocalStorage wrapper & schema validator
            └── formatters.js    # Multi-currency and number sanitizers
```

---

## 🧮 The Four Core Calculators

```
Flow: Home -> 1. Price -> 2. Startup -> 3. Break-Even -> 4. Bundle/Discount -> Saved
```

1. **What should I charge? (Price Calculator):**
   $$\text{True Cost} = \frac{\text{Bulk} + \text{Transport} + \text{Packaging} + \text{Labour} + \text{Custom}}{1 - (\text{Waste \%} / 100)}$$
2. **How much to start? (Startup Cost Estimator):**
   $$\text{Startup Total} = \sum (\text{Initial Equipment, Stock, CAC, Branding}) \times (1 + \text{Contingency \%})$$
3. **When will I get my money back? (Break-Even Calculator):**
   $$\text{Break-Even Units} = \left\lceil \frac{\text{Startup Total}}{\text{Selling Price} - \text{True Cost}} \right\rceil$$
4. **Will this offer lose me money? (Bundle & Discount Checker):**
   $$\text{Bundle Margin} = \text{Bundle Price} - \sum \text{Item True Costs}$$

---

## ⚡ Quickstart & Development

### Prerequisites
- Modern web browser (Chrome, Safari, Firefox, Edge)
- Node.js $\ge 18$ (for testing, bundling, and local dev server)

### Running Locally
```bash
# Clone the repository
git clone https://github.com/your-org/startwella.git
cd startwella/startwella-v1

# Install development dependencies
npm install

# Start local development server
npm run dev

# Run automated calculation test suite
npm test
```

Alternatively, open `startwella-v1/index.html` directly in any web browser without build tools.

---

## 📦 Packaging & Distribution

### Progressive Web App (PWA)
StartWella is designed to be installed directly from mobile browsers onto home screens without going through app stores:
- Runs offline via Service Worker caching.
- Add to Home Screen support on Android Chrome and iOS Safari.
- Compliant Web App Manifest with adaptive maskable icons.

### Native Desktop (Tauri)
To compile StartWella as a lightweight, memory-efficient native desktop application for Windows, macOS, and Linux:
1. Initialize Tauri in the workspace: `npm run tauri:init`
2. Bundle native binary: `npm run tauri:build`
3. Generates `.msi` / `.exe` on Windows and `.dmg` on macOS.

### Native Mobile (Capacitor)
To publish StartWella to the Google Play Store and Apple App Store:
1. Add Capacitor platforms: `npx cap add android` and `npx cap add ios`
2. Sync web assets: `npx cap sync`
3. Open in Android Studio / Xcode to build release bundles.

---

## 🗺️ Roadmap & Milestone Status

| Phase | Description | Status | Exit Gate |
|---|---|---|---|
| **Phase 0** | Discovery, Target Seller Interviews & Validation | Completed | Gate 0 Passed |
| **Phase 1** | Product Spec, Copy Deck & Design System | Completed | Gate 1 Passed |
| **Phase 2** | Clickable Wireframes & Mobile Prototype | Completed | Gate 2 Passed |
| **Phase 3** | Core Mathematical Engine & UI Calculators | In Progress | Gate 3 Pending |
| **Phase 4** | Local Storage, WhatsApp Share & PDF Export | In Progress | Gate 4 Pending |
| **Phase 5** | QA Testing, Security Audit & Launch Assets | Scheduled | Gate 5 Pending |
| **Phase 6** | Commercial Launch (First 50 Users / 10 Sales) | Scheduled | Gate 6 Pending |

Detailed tasks, exit gate checklists, and status tracking can be found in [PHASES.md](file:///D:/projects/startwella/PHASES.md).

---

## 📚 Documentation Links

- **[AGENTS.md](file:///D:/projects/startwella/AGENTS.md):** Contributor & autonomous agent operating instructions.
- **[CONTENT.md](file:///D:/projects/startwella/CONTENT.md):** Complete copy deck, formula sheets, templates, and marketing scripts.
- **[PHASES.md](file:///D:/projects/startwella/PHASES.md):** Implementation phase breakdown, exit gates, and v1 close-out punchlist.
- **[ARCHITECTURE.md](file:///D:/projects/startwella/ARCHITECTURE.md):** Technical architecture, data models, and cross-platform bundling specs.
- **[BRAND-GUIDE.md](file:///D:/projects/startwella/assets/BRAND-GUIDE.md):** Visual identity, color codes, and logo guidelines.

---

## ⚖️ License & Disclaimer

StartWella is released under the [MIT License](LICENSE).  
*Disclaimer: StartWella provides mathematical estimates for educational and operational planning purposes. It does not constitute formal accounting or financial advisory services.*
