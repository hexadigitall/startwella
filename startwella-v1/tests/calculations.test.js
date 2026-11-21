import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseNumber,
  trueCostPerUnit,
  recommendedPrice,
  priceTiers,
  profitPerUnit,
  marginPct,
  startupTotal,
  breakEvenUnits,
  breakEvenWeeks,
  bundleCheck,
  discountCheck,
  formatCurrency,
  formatNGN
} from '../src/lib/calculations.js';

test('1. parseNumber handles raw numbers, strings, commas, currency symbols', () => {
  assert.equal(parseNumber(2500), 2500);
  assert.equal(parseNumber('2,500'), 2500);
  assert.equal(parseNumber('₦3,350'), 3350);
  assert.equal(parseNumber(' $ 1,250.50 '), 1250.5);
  assert.equal(parseNumber(''), 0);
  assert.equal(parseNumber(null), 0);
  assert.equal(parseNumber(undefined), 0);
  assert.equal(parseNumber('invalid'), 0);
});

test('2. trueCostPerUnit — Worked Spec Example: 1kg Oloyin Beans', () => {
  // Bulk 2000 + Transport 150 + Packaging 180 + Labour 120 = 2450.
  // Waste 5% -> 2450 / 0.95 = 2578.947... -> round to 2578.95
  const result = trueCostPerUnit({
    bulk: 2000,
    transport: 150,
    packaging: 180,
    labour: 120,
    wastePct: 5
  });
  assert.equal(result.directCost, 2450);
  assert.equal(result.wastePct, 5);
  assert.equal(Math.round(result.trueCost), 2579);
});

test('3. trueCostPerUnit with zero waste', () => {
  const result = trueCostPerUnit({
    bulk: 1000,
    transport: 100,
    packaging: 50,
    labour: 50,
    wastePct: 0
  });
  assert.equal(result.directCost, 1200);
  assert.equal(result.trueCost, 1200);
});

test('4. trueCostPerUnit clamps high waste safely at 95% without crashing', () => {
  const result = trueCostPerUnit({
    bulk: 100,
    wastePct: 150 // Greater than 100%
  });
  assert.equal(result.wastePct, 95);
  assert.equal(result.trueCost, 2000); // 100 / (1 - 0.95) = 2000
});

test('5. trueCostPerUnit with custom additional unit costs', () => {
  const result = trueCostPerUnit({
    bulk: 1000,
    customTotal: 250, // e.g., market levy + delivery loss
    wastePct: 0
  });
  assert.equal(result.directCost, 1250);
  assert.equal(result.trueCost, 1250);
});

test('6. recommendedPrice calculates accurate profit markups', () => {
  // True cost 2579 with 30% profit markup = 2579 * 1.30 = 3352.7 -> 3353
  const price = recommendedPrice(2579, 30);
  assert.equal(price, 3353);
});

test('7. priceTiers returns Cheapest (10%), Normal (25%), Premium (40%)', () => {
  const tiers = priceTiers(1000);
  assert.equal(tiers.cheapest, 1100);
  assert.equal(tiers.normal, 1250);
  assert.equal(tiers.premium, 1400);
});

test('8. profitPerUnit accurately calculates positive, zero, and negative returns', () => {
  assert.equal(profitPerUnit(3350, 2579), 771);
  assert.equal(profitPerUnit(2500, 2500), 0);
  assert.equal(profitPerUnit(2000, 2579), -579); // Loss
});

test('9. marginPct calculates gross margin percentage correctly', () => {
  // Selling 100, Cost 80 -> Profit 20 -> Margin 20%
  assert.equal(marginPct(100, 80), 20);
  // Zero price boundary check
  assert.equal(marginPct(0, 100), 0);
});

test('10. startupTotal sums checked items and applies contingency buffer', () => {
  const items = [
    { label: 'Bags of stock', amount: 160000, isChecked: true },
    { label: 'Transport', amount: 12000, isChecked: true },
    { label: 'Scale (already owned)', amount: 15000, isChecked: false } // unticked
  ];
  // Subtotal = 172,000. Contingency 5% = 8,600. Grand = 180,600
  const result = startupTotal(items, 5);
  assert.equal(result.subtotal, 172000);
  assert.equal(result.contingencyAmount, 8600);
  assert.equal(result.grandTotal, 180600);
});

test('11. startupTotal handles empty list or 0% contingency', () => {
  const result = startupTotal([], 0);
  assert.equal(result.subtotal, 0);
  assert.equal(result.grandTotal, 0);
});

test('12. breakEvenUnits — Spec Example: ₦850,000 startup cost / ₦771 profit', () => {
  // 850,000 / 771 = 1102.46 -> Math.ceil -> 1103 units
  const units = breakEvenUnits(850000, 771);
  assert.equal(units, 1103);
});

test('13. breakEvenUnits returns Infinity when profit per unit is zero or negative', () => {
  assert.equal(breakEvenUnits(100000, 0), Infinity);
  assert.equal(breakEvenUnits(100000, -500), Infinity);
});

test('14. breakEvenWeeks calculates recovery duration in calendar weeks', () => {
  // 1103 units at 50 units/week = 22.06 -> 23 weeks
  const weeks = breakEvenWeeks(1103, 50);
  assert.equal(weeks, 23);
  assert.equal(breakEvenWeeks(100, 0), Infinity);
  assert.equal(breakEvenWeeks(Infinity, 50), Infinity);
});

test('15. bundleCheck flags SAFE when bundle price exceeds total costs', () => {
  // Bundle price 6050, costs: 2579 + 2649 = 5228 -> Profit 822
  const check = bundleCheck(6050, [2579, 2649]);
  assert.equal(check.cost, 5228);
  assert.equal(check.profit, 822);
  assert.equal(check.isSafe, true);
  assert.equal(check.isLoss, false);
});

test('16. bundleCheck flags LOSS when bundle price is below cost', () => {
  const check = bundleCheck(5000, [2579, 2649]);
  assert.equal(check.profit, -228);
  assert.equal(check.isSafe, false);
  assert.equal(check.isLoss, true);
});

test('17. discountCheck evaluates markdown margins and protects against loss', () => {
  // Normal 3350, 10% discount -> 3015. True cost 2579 -> Profit 436
  const safeDiscount = discountCheck(3350, 2579, 10);
  assert.equal(safeDiscount.discounted, 3015);
  assert.equal(safeDiscount.profit, 436);
  assert.equal(safeDiscount.isSafe, true);

  // Deep discount 30% on 3350 -> 2345. True cost 2579 -> Loss -234
  const lossDiscount = discountCheck(3350, 2579, 30);
  assert.equal(lossDiscount.discounted, 2345);
  assert.equal(lossDiscount.profit, -234);
  assert.equal(lossDiscount.isLoss, true);
});

test('18. formatCurrency formats NGN correctly with symbol and commas', () => {
  assert.equal(formatNGN(2579), '₦2,579');
  assert.equal(formatNGN(1000000), '₦1,000,000');
});

test('19. formatCurrency formats USD ($) and GHS (GH₵) with 2 decimals', () => {
  assert.equal(formatCurrency(49.95, 'USD'), '$49.95');
  assert.equal(formatCurrency(120, 'GHS'), 'GH₵120.00');
});

test('20. parseNumber and calculation resilience with dirty user input', () => {
  const dirtyResult = trueCostPerUnit({
    bulk: '₦ 2,000 ',
    transport: ' 150 ',
    packaging: '180.00',
    labour: '120',
    wastePct: '5%'
  });
  assert.equal(dirtyResult.directCost, 2450);
  assert.equal(Math.round(dirtyResult.trueCost), 2579);
});
