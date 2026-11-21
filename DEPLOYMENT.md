# StartWella — Vercel & Production Deployment Guide (DEPLOYMENT.md)

This guide provides step-by-step instructions for deploying StartWella to **Vercel** via GitHub, ensuring seamless continuous integration and production deployment.

---

## 1. Architecture for Vercel Deployment

StartWella includes a root configuration file ([vercel.json](file:///D:/projects/startwella/vercel.json)) that seamlessly routes web traffic to the application assets inside `startwella-v1/`:

```
Incoming Request (e.g. / or /sw.js)
              │
              ▼
        vercel.json
  (Routes & Header Rules)
              │
              ├──> /              ==>  /startwella-v1/index.html
              ├──> /manifest.json ==>  /startwella-v1/manifest.json
              ├──> /sw.js         ==>  /startwella-v1/sw.js (Cache-Control: must-revalidate)
              └──> /assets/*      ==>  /startwella-v1/assets/*
```

---

## 2. Step-by-Step Vercel Setup

### Method A: Linking via Vercel Web Dashboard (Recommended)

1. **Log in to Vercel:** Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. **Add New Project:** Tap **"Add New..."** $\rightarrow$ **"Project"**.
3. **Select Repository:** Locate `hexadigitall/startwella` and click **"Import"**.
4. **Configure Project Settings:**
   - **Project Name:** `startwella`
   - **Framework Preset:** `Other`
   - **Root Directory:** Leave as `./` (Root directory) — our `vercel.json` automatically manages routing.  
     *(Alternatively, you can select `startwella-v1` if you want Vercel to serve strictly from that subfolder).*
   - **Build Command:** Leave empty (static site).
   - **Output Directory:** Leave empty.
5. **Deploy:** Tap **"Deploy"**.
6. **Result:** In under 30 seconds, Vercel will assign a production URL (e.g., `https://startwella.vercel.app`).

---

### Method B: Deploying via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# From repository root
cd D:\projects\startwella

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 3. Post-Deployment Verification Checklist

Once the Vercel deployment completes, verify the following:

- [ ] **HTTPS Live:** Ensure SSL certificate is active.
- [ ] **PWA Manifest:** Navigate to `https://<your-app>.vercel.app/manifest.json` and confirm it returns valid JSON with status 200.
- [ ] **Service Worker:** Open Chrome DevTools $\rightarrow$ Application $\rightarrow$ Service Workers. Confirm `sw.js` is registered and active.
- [ ] **Offline Mode:** Toggle Network to "Offline" in DevTools and refresh the page. The application should load instantly from cache.
- [ ] **Currency Switcher:** Toggle from NGN to USD and GHS. Confirm pricing recalculates and symbols update.
- [ ] **WhatsApp Sharing:** Calculate a sample product and tap "Share on WhatsApp". Confirm `wa.me` opens with formatted price card text.
- [ ] **PDF Export:** Tap "Print / Export as PDF" and verify clean, print-friendly formatting.
