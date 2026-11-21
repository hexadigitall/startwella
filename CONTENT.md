# StartWella — Content, Copy Deck & Business Catalog (CONTENT.md)

This document is the **authoritative reference** for all user-facing text, business category templates, mathematical formulas, WhatsApp sharing scripts, marketing broadcasts, and legal disclaimers.

---

## 1. Brand Voice & Communication Principles

StartWella speaks like a wise, supportive business mentor who explains numbers over tea or WhatsApp.

- **Tone:** Empathetic, practical, grounded, honest, encouraging.
- **Style:** Short sentences, active verbs, plain English.
- **Rule:** If a term requires an accounting diploma to understand, rewrite it.

### Plain English Translation Guide
| Finance / Accounting Jargon | StartWella Plain English | Contextual Explainer |
|---|---|---|
| Cost of Goods Sold (COGS) | Money you spent | All direct expenses to make or buy one unit |
| Gross Margin / Markup | Money left after selling | What you keep before personal expenses |
| Contingency Reserve | Money for surprises | Cushion for price spikes, spillage, torn bags |
| Shrinkage / Spillage / Yield Loss | Lost in cleaning or sorting | Difference between bulk bought and good quantity sold |
| Break-Even Point | Getting your starting money back | When total profit equals your initial investment |
| Minimum Viable Product (MVP) | Lean Start | The bare minimum needed to sell day one |
| Working Capital | First stock & running cash | Money to buy stock and keep lights on |

---

## 2. Core Calculators Copy Deck

### Calculator 1: What should I charge? (Price Calculator)
- **Header:** `1. Price Calculator — What should I charge?`
- **Subtitle:** `Calculate what one unit really costs you so you never sell at a loss.`
- **Fields:**
  - `Product Name`
    - *Label:* What are you selling?
    - *Placeholder:* e.g. Oloyin Beans — 1kg
  - `Bulk Cost`
    - *Label:* 1. Cost of the stock itself — for ONE unit
    - *Helper text:* Example: Bag ₦100,000 gave 50kg. For 1kg, type ₦2,000.
  - `Transport`
    - *Label:* 2. Transport — for ONE unit
    - *Helper text:* Bus, bike, dispatch, or fuel cost to get ONE unit to you.
  - `Packaging`
    - *Label:* 3. Packaging — for ONE unit
    - *Helper text:* Bag, pouch, seal, container, and label for just this ONE pack.
  - `Labour`
    - *Label:* 4. Labour to clean / sort / pack ONE unit
    - *Helper text:* Pay someone, or pay yourself. Never work for free.
  - `Custom Unit Costs`
    - *Button:* `+ Add another cost for ONE unit`
    - *Examples:* Market levy, generator fuel, plastic spoon, branding ribbon.
  - `Waste Percentage`
    - *Label:* How much is lost when you clean / sort it? (out of 100)
    - *Helper text:* If you buy 100kg and only 95kg is good, type 5. If nothing lost, type 0.
  - `Desired Profit Margin`
    - *Label:* How much extra do you want on top of your cost? (%)
    - *Helper text:* Type 30 if you want ₦30 extra for every ₦100 you spent.
  - `Current Selling Price`
    - *Label:* What price are you charging now? (or thinking of charging)
    - *Helper text:* We will tell you if this price makes money or loses money.
- **Buttons:**
  - Primary: `Calculate my price`
  - WhatsApp: `Share on WhatsApp`
  - Save: `Save product`
  - Next: `Next: How much to start →`
- **Outcome States:**
  - **SAFE Banner (Green):** `SAFE — Your price [Price] is above your true cost [True Cost]. You keep [Profit] on every sale.`
  - **LOSS Banner (Red):** `LOSS — Your price [Price] is BELOW your true cost [True Cost]. You lose [Loss] on every sale. Raise your price to at least [True Cost].`
  - **Result Card Summary:**
    - `Charge [Recommended Price] for one unit`
    - `You spent [Direct Costs] for one unit. [Waste]% was lost in cleaning/sorting, so your true cost is [True Cost].`
    - `Tiers — Cheapest (10%): [P10] | Normal (25%): [P25] | Premium (40%): [P40]`
  - **Next Step Callout:**
    - `What to do next: Go to Calculator 2 to see how much money you need to start selling this at [Price].`

---

### Calculator 2: How much to start? (Startup Cost Estimator)
- **Header:** `2. Startup Cost — How much money do I need to start?`
- **Subtitle:** `This is not the price of one pack. This is all the money you need to spend ONCE, before your first sale.`
- **Fields:**
  - `Business Template Selector:` Choose what kind of business you are starting.
  - `Checklist of Initial Startup Needs:` Pre-filled checkboxes with items, explainers, and cost inputs.
  - `Custom Startup Items:` Add custom one-time expenses (rent, licenses, equipment).
  - `Surprise Buffer (Contingency %):`
    - *Label:* Extra money for surprises — in %
    - *Helper text:* Prices go up. A bag tears. Type 5 for ₦5 extra per ₦100.
- **Buttons:**
  - Primary: `Add up — how much do I need?`
  - Next: `Next: When do I get my money back? →`
- **Result Card Summary:**
  - `You need [Grand Total] to start`
  - `Items added up: [Subtotal]. Money for surprises ([Contingency]%): [Contingency Amount].`
  - `What to do next: Go to Calculator 3 — it will tell you how many packs you must sell to get this [Grand Total] back.`

---

### Calculator 3: When do I get my money back? (Break-Even Calculator)
- **Header:** `3. Break-Even — When will I get my money back?`
- **Subtitle:** `Find out exactly how many units you must sell to recover your initial investment.`
- **Fields:**
  - `Total Money Spent to Start (₦):` Auto-populated from Calculator 2 or entered manually.
  - `Money You Keep from ONE Sale (₦):` Auto-populated from Calculator 1 profit or entered manually.
  - `Expected Sales per Week:` Realistic estimate of units sold weekly.
- **Buttons:**
  - Primary: `When will I break even?`
  - Next: `Next: Will this offer lose me money? →`
- **Outcome States:**
  - **Warning State (Zero / Negative Profit):** `You keep ₦0 or less from each sale, so you will never get your starting money back. Raise your price in Calculator 1 first.`
  - **Success Summary:**
    - `Sell [Units] units in about [Weeks] weeks`
    - `You spent [Startup Cost] to start. You keep [Profit] from each sale. [Startup Cost] ÷ [Profit] = [Units] sales.`
    - `What to do next: If [Weeks] weeks feels too long, raise your price slightly or start with a leaner budget in Calculator 2.`

---

### Calculator 4: Will this offer lose me money? (Bundle & Discount Checker)
- **Header:** `4. Bundle & Discount — Will this offer lose me money?`
- **Subtitle:** `Never offer a combo promo or discount that quietly wipes out your profit.`
- **Part A: Bundle / Combo Checker:**
  - `Bundle Selling Price (₦)`
  - `Item True Costs in Bundle (₦):` Item 1 + Item 2 + Item 3...
  - *Outcome:* `SAFE: Bundle keeps [Profit]` OR `LOSS: Bundle loses [Loss]. Do not sell at [Bundle Price]. Raise bundle price to at least [Sum Costs].`
- **Part B: Discount Checker:**
  - `Normal Price Before Discount (₦)`
  - `True Cost of ONE Unit (₦)`
  - `Discount Percentage (%):` e.g., 10%, 15%, 20%
  - *Outcome:* `SAFE: After [Discount]%, you still keep [Discounted Profit] per unit.` OR `LOSS: After [Discount]%, you lose [Discounted Loss] per unit. Lower the discount!`

---

## 3. Business Templates Catalog

These templates supply realistic starting costs and operational items for emerging market founders:

### Template 1: Foodstuff (Grains, Tubers, Spices)
- **Default Example:** 1kg Cleaned Oloyin Beans
- **Direct Unit Costs:**
  - Bulk stock: ₦2,000 / kg
  - Transport: ₦150 / kg
  - Packaging (thick pouch + branded label): ₦180 / unit
  - Cleaning / destoning labour: ₦120 / kg
  - Waste allowance: 5% (stones, chaff, bad beans)
- **Startup Checklist Items:**
  1. `First stock` — 2 bags of beans/rice (₦160,000)
  2. `Transport` — Logistics from wholesale market (₦12,000)
  3. `Packaging stock` — 200 branded pouches (₦36,000)
  4. `Measuring tools` — Digital table scale (₦18,000)
  5. `Sealing machine` — Manual impulse heat sealer (₦22,000)

### Template 2: Baking & Confectionery
- **Default Example:** 8-inch Decorated Vanilla Sponge Cake
- **Direct Unit Costs:**
  - Flour, sugar, butter, eggs, flavor: ₦4,500
  - Fondant / whipping cream: ₦3,000
  - Cake board & transparent luxury box: ₦2,200
  - Baking gas / power share: ₦1,000
  - Helper & decorating labour: ₦2,500
  - Waste & trimming loss: 4%
- **Startup Checklist Items:**
  1. `Baking pans & nozzles` — Set of 3 round pans + piping kit (₦35,000)
  2. `Hand/Stand mixer` — 5-speed hand mixer (₦45,000)
  3. `Oven thermometer & timer` (₦8,500)
  4. `First ingredient pack` — 25kg flour + butter carton (₦95,000)
  5. `Packaging starter pack` — 20 premium cake boxes (₦44,000)

### Template 3: Skincare & Cosmetics (Artisanal Formulators)
- **Default Example:** 250ml Whipped Shea Body Butter
- **Direct Unit Costs:**
  - Raw unrefined shea butter: ₦1,200
  - Essential oils & almond oil: ₦950
  - PET amber jar & waterproof label: ₦650
  - Whipping & filling labour: ₦400
  - Spillage & residual loss: 6%
- **Startup Checklist Items:**
  1. `First raw ingredients` — 10kg shea butter + carrier oils (₦65,000)
  2. `Jars & containers` — 100 amber PET jars (₦48,000)
  3. `High-speed immersion blender / whisk` (₦28,000)
  4. `Sanitization gear & measuring cylinders` (₦15,000)
  5. `NAFDAC / regulatory consultation reserve` (₦50,000)

### Template 4: Thrift & Fashion (Curated Pre-Loved Apparel)
- **Default Example:** 1 Grade-A Thrift Denim Jacket
- **Direct Unit Costs:**
  - Cost per selected piece from bale: ₦2,800
  - Transport & market runner fee: ₦400
  - Professional dry cleaning & stain removal: ₦700
  - Custom tag & ziplock delivery bag: ₦350
  - Sorting & photography labour: ₦500
  - Unsellable / damaged piece rate: 10%
- **Startup Checklist Items:**
  1. `First bale` — 1 Grade-A mixed jacket/dress bale (₦140,000)
  2. `Transport` — Dispatch from Katangua / Yaba market (₦15,000)
  3. `Steam iron / garment steamer` (₦32,000)
  4. `Mannequin / wooden hangers` (₦22,000)
  5. `Ring light & mini backdrop for phone shoot` (₦25,000)

### Template 5: Catering & Packaged Drinks
- **Default Example:** 500ml Bottled Zobo / Tigernut Drink
- **Direct Unit Costs:**
  - Dried hibiscus leaves / tigernuts & dates: ₦350
  - Flavor (ginger, pineapple, cloves): ₦200
  - PET bottle + cap + tamper seal: ₦180
  - Ice blocks & cooking gas share: ₦150
  - Bottling & labeling labour: ₦120
  - Filtration residue loss: 8%
- **Startup Checklist Items:**
  1. `Stock pots & fine mesh filtration cloths` (₦38,000)
  2. `PET bottles starter bundle` — 300 bottles (₦45,000)
  3. `Commercial cooler / ice chest` (₦42,000)
  4. `First bulk ingredients run` (₦55,000)
  5. `Branded waterproof stickers` — 500 pcs (₦25,000)

---

## 3. Mathematical Formula Sheet

All mathematical operations strictly adhere to the following formulas:

$$\begin{aligned}
\text{Direct Unit Costs} &= \text{Bulk} + \text{Transport} + \text{Packaging} + \text{Labour} + \sum \text{Custom Costs} \\
\text{Effective Yield Factor} &= 1 - \frac{\text{Waste \%}}{100} \quad (\text{Constraint: } 0 \le \text{Waste} < 100) \\
\text{True Cost per Unit} &= \frac{\text{Direct Unit Costs}}{\text{Effective Yield Factor}} \\
\text{Recommended Price} &= \text{True Cost} \times \left(1 + \frac{\text{Desired Profit \%}}{100}\right) \\
\text{Profit per Unit} &= \text{Selling Price} - \text{True Cost} \\
\text{Profit Margin \%} &= \left(\frac{\text{Profit per Unit}}{\text{Selling Price}}\right) \times 100 \\
\text{Startup Total} &= \left(\sum \text{Checked Startup Items} + \sum \text{Custom Startup Items}\right) \times \left(1 + \frac{\text{Contingency \%}}{100}\right) \\
\text{Break-Even Units} &= \left\lceil \frac{\text{Startup Total}}{\text{Profit per Unit}} \right\rceil \quad (\text{Valid when } \text{Profit per Unit} > 0) \\
\text{Break-Even Weeks} &= \left\lceil \frac{\text{Break-Even Units}}{\text{Expected Units Sold per Week}} \right\rceil \\
\text{Bundle Profit} &= \text{Bundle Price} - \sum \text{Item True Costs} \\
\text{Discounted Selling Price} &= \text{Normal Price} \times \left(1 - \frac{\text{Discount \%}}{100}\right) \\
\text{Discounted Profit per Unit} &= \text{Discounted Selling Price} - \text{True Cost}
\end{aligned}$$

---

## 4. WhatsApp Sharing & Export Templates

### 4.1 Plain-Text Single Product WhatsApp Card
```text
📦 *StartWella Price Card — [Product Name]*
------------------------------------
💰 *True Cost:* ₦[True Cost]
🎯 *Recommended Price:* ₦[Recommended Price]
🏷️ *Current Price:* ₦[Current Price]
💵 *Profit per Unit:* ₦[Profit] ([Margin]%)

📊 *Cost Breakdown:*
• Stock: ₦[Bulk]
• Transport: ₦[Transport]
• Packaging: ₦[Packaging]
• Labour: ₦[Labour]
• Waste Allowance: [Waste]%

_Calculated with StartWella — Start well. Price right. Grow steady._
```

### 4.2 Full Price List Export Format (WhatsApp & PDF)
```text
📋 *OFFICIAL PRICE LIST — [Business Name]*
Updated: [Date]
------------------------------------
1. [Product 1]: ₦[Price 1] (Min Order: 1)
2. [Product 2]: ₦[Price 2] (Min Order: 1)
3. [Product 3]: ₦[Price 3] (Min Order: 1)
------------------------------------
🚚 Delivery available nationwide.
📲 Reply to this message to place your order!
```

---

## 5. Marketing, Broadcasts & Demo Scripts

### 5.1 WhatsApp Broadcast Script (Targeting Market Groups)
> *"Hello fellow business owner! 👋*  
> *Are you tired of selling out your stock and wondering where all the profit went? Most of us forget to add nylon, bus transport, cleaning loss, and our own time into our prices!*  
> *I’m using a free, simple tool called **StartWella** that shows you your exact true cost and what to charge in under 3 minutes. No login required.*  
> *Try it on your phone: [Link]*  
> *Start well. Price right. Grow steady."*

### 5.2 60-Second Video Demo Script
- **0:00 - 0:10:** "You bought ₦100,000 bag of beans, sold it all, and have no money left. Why? You priced blind."
- **0:10 - 0:25:** "Open StartWella. Type your stock cost, transport, nylon bag, and your own labour. Add 5% for dirty beans lost in sorting."
- **0:25 - 0:40:** "Tap Calculate. StartWella instantly reveals your true cost: ₦2,579. To make 30% profit, charge ₦3,350."
- **0:40 - 0:50:** "Check your startup money and break-even in 2 taps. Save your price or share it straight to WhatsApp."
- **0:50 - 1:00:** "Never sell at a loss again. Start well. Price right. Grow steady."

---

## 6. Legal Notices & Disclaimers

### Financial Disclaimer (Mandatory on All Exports & Footers)
> *"StartWella provides calculation tools and mathematical estimates for informational and educational purposes only. StartWella is not a registered financial advisor or accounting firm. Calculations depend entirely on user inputs. Users must verify local regulatory costs, taxes, and supplier price volatility before making binding business commitments."*

### Privacy & Data Storage Notice
> *"StartWella Version 1 operates locally on your device. Your costs, products, and prices are stored inside your browser's private storage (`localStorage`). No personal financial data is uploaded to our servers without your consent."*
