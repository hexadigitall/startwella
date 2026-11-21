/**
 * StartWella v1 — Pure Mathematical Calculation Engine
 * 
 * Free of side-effects, DOM references, or external libraries.
 * Tested across edge cases (zero costs, floating-point rounding, high waste).
 */

/**
 * Robust number parser that handles formatted text, commas, spaces, currency symbols.
 * @param {string|number} val 
 * @returns {number}
 */
export function parseNumber(val) {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  if (!val) return 0;
  // Strip everything except digits, decimal point, and minus sign
  const clean = String(val).replace(/[^0-9.-]/g, '');
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

/**
 * Calculates true cost per unit accounting for direct costs and waste/spillage loss.
 * Formula: (bulk + transport + packaging + labour + customTotal) / (1 - wastePct / 100)
 * 
 * @param {Object} params
 * @param {number} params.bulk - Stock purchase cost per unit
 * @param {number} [params.transport=0] - Transport cost allocated per unit
 * @param {number} [params.packaging=0] - Packaging & labeling per unit
 * @param {number} [params.labour=0] - Manual cleaning/sorting/packing labour per unit
 * @param {number} [params.customTotal=0] - Sum of any other custom direct unit costs
 * @param {number} [params.wastePct=0] - Percentage lost during cleaning/sorting (0 to 95%)
 * @returns {{ directCost: number, wastePct: number, trueCost: number }}
 */
export function trueCostPerUnit({
  bulk = 0,
  transport = 0,
  packaging = 0,
  labour = 0,
  customTotal = 0,
  wastePct = 0
}) {
  const b = Math.max(0, parseNumber(bulk));
  const t = Math.max(0, parseNumber(transport));
  const p = Math.max(0, parseNumber(packaging));
  const l = Math.max(0, parseNumber(labour));
  const c = Math.max(0, parseNumber(customTotal));
  
  // Safe clamping for waste percentage: cannot equal or exceed 100%
  const w = Math.min(Math.max(parseNumber(wastePct), 0), 95);
  
  const directCost = b + t + p + l + c;
  const yieldFactor = 1 - (w / 100);
  const trueCost = yieldFactor > 0 ? (directCost / yieldFactor) : directCost;

  return {
    directCost,
    wastePct: w,
    trueCost: Math.round(trueCost * 100) / 100
  };
}

/**
 * Recommended selling price based on desired profit markup.
 * @param {number} trueCost 
 * @param {number} profitPct 
 * @returns {number}
 */
export function recommendedPrice(trueCost, profitPct) {
  const tc = Math.max(0, parseNumber(trueCost));
  const pct = Math.max(0, parseNumber(profitPct));
  return Math.round(tc * (1 + pct / 100));
}

/**
 * Generates low (10%), standard (25%), and premium (40%) price tiers.
 * @param {number} trueCost 
 * @returns {{ cheapest: number, normal: number, premium: number }}
 */
export function priceTiers(trueCost) {
  const tc = Math.max(0, parseNumber(trueCost));
  return {
    cheapest: Math.round(tc * 1.10),
    normal: Math.round(tc * 1.25),
    premium: Math.round(tc * 1.40)
  };
}

/**
 * Net profit per unit sold.
 * @param {number} price 
 * @param {number} trueCost 
 * @returns {number}
 */
export function profitPerUnit(price, trueCost) {
  return parseNumber(price) - parseNumber(trueCost);
}

/**
 * Gross margin percentage: (Profit / Price) * 100
 * @param {number} price 
 * @param {number} trueCost 
 * @returns {number}
 */
export function marginPct(price, trueCost) {
  const p = parseNumber(price);
  const tc = parseNumber(trueCost);
  if (p <= 0) return 0;
  return Math.round(((p - tc) / p) * 1000) / 10;
}

/**
 * Total startup capital needed including buffer/contingency.
 * @param {Array<{ amount: number, isChecked?: boolean }>} items 
 * @param {number} contingencyPct 
 * @returns {{ subtotal: number, contingencyPct: number, contingencyAmount: number, grandTotal: number }}
 */
export function startupTotal(items = [], contingencyPct = 0) {
  const subtotal = items.reduce((sum, item) => {
    if (item && item.isChecked !== false) {
      return sum + Math.max(0, parseNumber(item.amount));
    }
    return sum;
  }, 0);
  
  const pct = Math.max(0, parseNumber(contingencyPct));
  const contingencyAmount = Math.round(subtotal * (pct / 100));
  const grandTotal = subtotal + contingencyAmount;

  return {
    subtotal,
    contingencyPct: pct,
    contingencyAmount,
    grandTotal
  };
}

/**
 * Units needed to recover startup costs.
 * @param {number} startupCost 
 * @param {number} profitPerUnitVal 
 * @returns {number}
 */
export function breakEvenUnits(startupCost, profitPerUnitVal) {
  const s = Math.max(0, parseNumber(startupCost));
  const p = parseNumber(profitPerUnitVal);
  if (p <= 0) return Infinity;
  return Math.ceil(s / p);
}

/**
 * Estimated calendar weeks to break even based on weekly sales rate.
 * @param {number} units 
 * @param {number} unitsPerWeek 
 * @returns {number}
 */
export function breakEvenWeeks(units, unitsPerWeek) {
  const u = parseNumber(units);
  const upw = parseNumber(unitsPerWeek);
  if (!isFinite(u) || upw <= 0) return Infinity;
  return Math.ceil(u / upw);
}

/**
 * Converts a batch/shared expense into a per-unit cost.
 * @param {number} totalPaid - Total expense for the batch
 * @param {number} batchUnits - Total units covered by this expense
 * @returns {number}
 */
export function batchToUnitCost(totalPaid, batchUnits) {
  const tot = Math.max(0, parseNumber(totalPaid));
  const units = Math.max(1, parseNumber(batchUnits));
  return Math.round((tot / units) * 100) / 100;
}

/**
 * Units needed per month to cover ongoing monthly fixed costs/overheads.
 * @param {number} monthlyOverhead - Monthly rent, salaries, utilities
 * @param {number} profitPerUnitVal - Profit per unit sold
 * @returns {number}
 */
export function monthlyBreakEvenUnits(monthlyOverhead, profitPerUnitVal) {
  const o = Math.max(0, parseNumber(monthlyOverhead));
  const p = parseNumber(profitPerUnitVal);
  if (p <= 0) return Infinity;
  return Math.ceil(o / p);
}

/**
 * Evaluates whether a multi-item bundle is profitable.
 * Supports both an array of numbers [2579, 2649] and item objects [{ unitCost, qty }].
 * @param {number} bundlePrice 
 * @param {Array<number|{ unitCost?: number, cost?: number, qty?: number, quantity?: number }>} itemTrueCosts 
 * @returns {{ cost: number, profit: number, isLoss: boolean, isSafe: boolean }}
 */
export function bundleCheck(bundlePrice, itemTrueCosts = []) {
  const bp = parseNumber(bundlePrice);
  const cost = itemTrueCosts.reduce((acc, item) => {
    if (typeof item === 'object' && item !== null) {
      const uCost = Math.max(0, parseNumber(item.unitCost ?? item.cost));
      const qty = Math.max(1, parseNumber(item.qty ?? item.quantity ?? 1));
      return acc + (uCost * qty);
    }
    return acc + Math.max(0, parseNumber(item));
  }, 0);
  const profit = bp - cost;
  return {
    cost,
    profit,
    isLoss: profit < 0,
    isSafe: profit >= 0
  };
}

/**
 * Evaluates discount profitability against unit true cost.
 * @param {number} price - Original selling price
 * @param {number} trueCost - True unit cost
 * @param {number} discountPct - Discount percentage (0-100)
 * @returns {{ discounted: number, profit: number, isLoss: boolean, isSafe: boolean }}
 */
export function discountCheck(price, trueCost, discountPct) {
  const p = Math.max(0, parseNumber(price));
  const tc = Math.max(0, parseNumber(trueCost));
  const dPct = Math.min(Math.max(0, parseNumber(discountPct)), 100);
  
  const discounted = Math.round(p * (1 - dPct / 100));
  const profit = discounted - tc;
  return {
    discounted,
    profit,
    isLoss: profit < 0,
    isSafe: profit >= 0
  };
}

/**
 * Multi-currency configuration dictionary.
 */
export const CURRENCY_CONFIG = {
  NGN: { symbol: '₦', code: 'NGN', locale: 'en-NG', precision: 0 },
  USD: { symbol: '$', code: 'USD', locale: 'en-US', precision: 2 },
  GHS: { symbol: 'GH₵', code: 'GHS', locale: 'en-GH', precision: 2 }
};

/**
 * Formats a number as a localized currency string.
 * @param {number} n 
 * @param {string} [currency='NGN'] 
 * @returns {string}
 */
export function formatCurrency(n, currency = 'NGN') {
  const val = parseNumber(n);
  const cfg = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.NGN;
  
  if (cfg.precision === 0) {
    return `${cfg.symbol}${Math.round(val).toLocaleString(cfg.locale)}`;
  }
  return `${cfg.symbol}${val.toLocaleString(cfg.locale, {
    minimumFractionDigits: cfg.precision,
    maximumFractionDigits: cfg.precision
  })}`;
}

export const formatNGN = (n) => formatCurrency(n, 'NGN');
