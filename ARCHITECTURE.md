# StartWella — System Architecture & Technical Specifications (ARCHITECTURE.md)

This document details the architectural design, component hierarchy, data models, persistence strategies, security practices, and cross-platform distribution blueprints for StartWella.

---

## 1. High-Level Architecture Overview

StartWella follows a **local-first, modular architecture**. It operates seamlessly as a standalone web app, an installable Progressive Web App (PWA), a native desktop binary (Tauri), or a native mobile app (Capacitor).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                              │
│   Step Navigation Tabs (1. Price | 2. Startup | 3. Break-Even | 4. Bundle)   │
│   ┌───────────────────┬────────────────────┬───────────────────────┐   │
│   │ PriceCalculator   │ StartupEstimator   │ BreakEvenCalculator   │   │
│   └───────────────────┴────────────────────┴───────────────────────┘   │
│   ┌───────────────────┬────────────────────┬───────────────────────┐   │
│   │ BundleChecker     │ SavedProductsList  │ PriceListExportModal  │   │
│   └───────────────────┴────────────────────┴───────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       CORE APPLICATION SERVICES                        │
│   ┌────────────────────────┐  ┌────────────────────────────────────┐   │
│   │ calculations.js        │  │ storage.js                         │   │
│   │ (Pure math functions)  │  │ (LocalStorage & Schema Migrations) │   │
│   └────────────────────────┘  └────────────────────────────────────┘   │
│   ┌────────────────────────┐  ┌────────────────────────────────────┐   │
│   │ formatters.js          │  │ export.js                          │   │
│   │ (Currency & Numbers)   │  │ (WhatsApp text & PDF Generation)   │   │
│   └────────────────────────┘  └────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     PLATFORM ABSTRACTION LAYER                         │
│   ┌────────────────────────┐  ┌────────────────────────────────────┐   │
│   │ Web / PWA (Browser)    │  │ Tauri 2.0 (Desktop Windows/Mac)    │   │
│   │ ServiceWorker + Cache  │  │ SQLite + Native OS File Dialogs    │   │
│   └────────────────────────┘  └────────────────────────────────────┘   │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ Capacitor (iOS / Android)                                      │   │
│   │ Native Share Sheet + Haptics + Hardware Back Button            │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Calculation Engine Contract

The calculation engine located at `src/lib/calculations.js` is the single source of truth for all business math. It has **zero dependencies** and enforces the following input/output contracts:

### 2.1 True Unit Cost Calculation
```typescript
interface UnitCostParams {
  bulk: number;          // Direct raw material cost
  transport?: number;    // Inbound freight/logistics per unit
  packaging?: number;    // Pack, pouch, container, seal, label
  labour?: number;       // Direct manual preparation or assembly cost
  customCosts?: number[];// Array of optional custom per-unit costs
  wastePct?: number;     // Waste/spillage loss percentage (0 <= wastePct < 100)
}

function calculateTrueCost(params: UnitCostParams): {
  directCost: number;    // Sum of bulk + transport + packaging + labour + custom
  wastePct: number;      // Effective waste percentage applied
  trueCost: number;      // directCost / (1 - wastePct / 100)
}
```

### 2.2 Pricing Recommendation & Margins
```typescript
function calculatePrice(trueCost: number, profitPct: number, currentPrice?: number): {
  trueCost: number;
  recommendedPrice: number;    // trueCost * (1 + profitPct / 100)
  currentPrice: number;
  profitPerUnit: number;       // currentPrice - trueCost
  marginPct: number;           // (profitPerUnit / currentPrice) * 100
  isSafe: boolean;             // currentPrice >= trueCost
  tiers: {
    cheapest: number;          // trueCost * 1.10 (10% profit)
    normal: number;            // trueCost * 1.25 (25% profit)
    premium: number;           // trueCost * 1.40 (40% profit)
  }
}
```

### 2.3 Startup Capital Aggregation
```typescript
interface StartupItem {
  id: string;
  label: string;
  amount: number;
  isChecked: boolean;
}

function calculateStartupTotal(items: StartupItem[], contingencyPct: number): {
  subtotal: number;            // Sum of checked item amounts
  contingencyPct: number;
  contingencyAmount: number;   // Math.round(subtotal * contingencyPct / 100)
  grandTotal: number;          // subtotal + contingencyAmount
}
```

### 2.4 Break-Even Analysis
```typescript
function calculateBreakEven(startupTotal: number, profitPerUnit: number, unitsPerWeek: number): {
  unitsNeeded: number;         // Math.ceil(startupTotal / profitPerUnit) or Infinity
  weeksNeeded: number;         // Math.ceil(unitsNeeded / unitsPerWeek) or Infinity
  isAchievable: boolean;       // profitPerUnit > 0
}
```

### 2.5 Bundle & Discount Verification
```typescript
function checkBundle(bundlePrice: number, itemCosts: number[]): {
  totalCost: number;
  profit: number;              // bundlePrice - totalCost
  isSafe: boolean;             // profit >= 0
}

function checkDiscount(normalPrice: number, trueCost: number, discountPct: number): {
  discountedPrice: number;     // normalPrice * (1 - discountPct / 100)
  profit: number;              // discountedPrice - trueCost
  isSafe: boolean;             // profit >= 0
}
```

---

## 3. Data Models & JSON Schemas

### 3.1 Saved Product Schema (`startwella:products:v1`)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "StartWellaProductList",
  "type": "array",
  "items": {
    "type": "object",
    "required": ["id", "name", "trueCost", "recommendedPrice", "sellingPrice", "createdAt"],
    "properties": {
      "id": { "type": "string", "format": "uuid" },
      "name": { "type": "string", "minLength": 1 },
      "category": { "type": "string" },
      "costs": {
        "type": "object",
        "properties": {
          "bulk": { "type": "number", "minimum": 0 },
          "transport": { "type": "number", "minimum": 0 },
          "packaging": { "type": "number", "minimum": 0 },
          "labour": { "type": "number", "minimum": 0 },
          "wastePct": { "type": "number", "minimum": 0, "maximum": 99 },
          "custom": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "label": { "type": "string" },
                "amount": { "type": "number", "minimum": 0 }
              }
            }
          }
        }
      },
      "trueCost": { "type": "number" },
      "profitPct": { "type": "number" },
      "recommendedPrice": { "type": "number" },
      "sellingPrice": { "type": "number" },
      "profitPerUnit": { "type": "number" },
      "createdAt": { "type": "string", "format": "date-time" },
      "updatedAt": { "type": "string", "format": "date-time" }
    }
  }
}
```

### 3.2 User Settings Schema (`startwella:settings:v1`)
```json
{
  "type": "object",
  "properties": {
    "currency": {
      "type": "string",
      "enum": ["NGN", "USD", "GHS"],
      "default": "NGN"
    },
    "defaultContingencyPct": { "type": "number", "default": 5 },
    "defaultProfitPct": { "type": "number", "default": 30 },
    "lowDataMode": { "type": "boolean", "default": false }
  }
}
```

---

## 4. Multi-Currency & Formatter Strategy

The formatters module (`src/lib/formatters.js`) encapsulates currency representations and prevents locale-specific parsing errors:

```javascript
export const CURRENCIES = {
  NGN: { symbol: '₦', code: 'NGN', locale: 'en-NG', precision: 0 },
  USD: { symbol: '$', code: 'USD', locale: 'en-US', precision: 2 },
  GHS: { symbol: 'GH₵', code: 'GHS', locale: 'en-GH', precision: 2 }
};

export function formatCurrency(amount, currencyCode = 'NGN') {
  const cfg = CURRENCIES[currencyCode] || CURRENCIES.NGN;
  const rounded = cfg.precision === 0 ? Math.round(amount) : amount.toFixed(cfg.precision);
  return `${cfg.symbol}${Number(rounded).toLocaleString(cfg.locale, {
    minimumFractionDigits: cfg.precision,
    maximumFractionDigits: cfg.precision
  })}`;
}

export function parseNumber(input) {
  if (typeof input === 'number') return isNaN(input) ? 0 : input;
  if (!input) return 0;
  // Strip commas, spaces, currency symbols
  const sanitized = String(input).replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(sanitized);
  return isNaN(parsed) ? 0 : parsed;
}
```

---

## 5. Security & Data Integrity

1. **DOM Injection Mitigation:**
   - Any dynamic content rendering must not inject unsanitized HTML into `.innerHTML`.
   - All text inputs (e.g., custom item names) must use `.textContent` or undergo HTML attribute escaping (`&`, `<`, `>`, `"`, `'`).
2. **Storage Error Handling:**
   - All `localStorage` read/write cycles are wrapped in safety envelopes:
     ```javascript
     export function safeStorageGet(key, fallback = null) {
       try {
         const raw = localStorage.getItem(key);
         return raw ? JSON.parse(raw) : fallback;
       } catch (err) {
         console.warn(`Storage read error for ${key}:`, err);
         return fallback;
       }
     }
     ```
3. **Data Quarantine:**
   - If corrupted data is detected in a storage key, quarantine it to a backup key (`<key>:corrupted:<timestamp>`) rather than crashing the application.

---

## 6. Cross-Platform Bundling Specifications

### 6.1 Progressive Web App (PWA)
- **Manifest (`manifest.json`):**
  - `name`: "StartWella — Pricing & Startup Toolkit"
  - `short_name`: "StartWella"
  - `display`: "standalone"
  - `theme_color`: "#0EA47A"
  - `background_color`: "#EEF2F5"
  - `icons`: Adaptive maskable icons (192x192, 512x512) sourced from `assets/logo-fullbleed-1024.png`.
- **Service Worker (`sw.js`):**
  - Cache-first strategy for static assets (HTML, CSS, JS, logos).
  - Background sync placeholder for future cloud updates.

### 6.2 Native Desktop Application (Tauri 2.0)
- **Runtime:** Rust core with lightweight webview (WebView2 on Windows, WebKit on macOS).
- **Configuration (`src-tauri/tauri.conf.json`):**
  - `identifier`: `com.startwella.app`
  - `windows`: Minimum size $400 \times 680$, initial size $480 \times 800$, resizable with responsive container.
- **Native Capabilities:**
  - File System export: Directly save generated PDF and CSV price lists to user's Documents folder.
  - Native print dialog for thermal receipt printers or standard desktop printers.

### 6.3 Native Mobile Application (Capacitor)
- **Runtime:** Native iOS (Swift/WebKit) & Android (Kotlin/Chromium) wrappers.
- **Configuration (`capacitor.config.json`):**
  - `appId`: `com.startwella.app`
  - `appName`: `StartWella`
  - `plugins`:
    - `@capacitor/share`: Direct sharing to WhatsApp, Instagram, Telegram, SMS.
    - `@capacitor/haptics`: Tactile feedback when calculation results update.
    - `@capacitor/status-bar`: Match brand theme `#0EA47A`.
- **App Store Compliance:**
  - Full adherence to Apple App Store Review Guideline 4.2 by integrating native sharing, offline storage, and push reminder notifications.
