# StartWella v1 Application Codebase

This directory contains the production-ready Version 1.0 codebase for **StartWella**.

## Quickstart

```bash
# Run unit tests
npm test

# Launch local development server
npm run dev
```

## Structure
- `index.html`: Mobile-first standalone web app and PWA interface.
- `manifest.json`: Web App Manifest with full-bleed and maskable icons.
- `sw.js`: Service worker for 100% offline functionality.
- `src/lib/calculations.js`: Mathematical engine (pure functions, fully tested).
- `tests/calculations.test.js`: 20 unit test cases verifying formulas, edge cases, and currency formatting.
- `capacitor.config.json`: Mobile container configuration (iOS & Android).
- `src-tauri/tauri.conf.json`: Desktop container configuration (Windows, macOS, Linux).

For master product documentation, architecture, and phase roadmaps, see:
- [Root README.md](file:///D:/projects/startwella/README.md)
- [AGENTS.md](file:///D:/projects/startwella/AGENTS.md)
- [CONTENT.md](file:///D:/projects/startwella/CONTENT.md)
- [PHASES.md](file:///D:/projects/startwella/PHASES.md)
- [ARCHITECTURE.md](file:///D:/projects/startwella/ARCHITECTURE.md)
