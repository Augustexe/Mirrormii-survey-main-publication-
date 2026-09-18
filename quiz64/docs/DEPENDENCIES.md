# Frontend dependency notices

The shipped app uses the following open source packages. Versions are locked in `package-lock.json`; this note keeps the delivery boundary visible without copying `node_modules` into the repository.

| Package | Use | License / notice |
| --- | --- | --- |
| React, ReactDOM, Scheduler | UI runtime | MIT; copyright Meta Platforms, Inc. and contributors |
| Vite, `@vitejs/plugin-react`, esbuild transitives | Local development and production bundling | MIT; respective project notices apply |
| Motion | Page and state transitions | MIT |
| lucide-react | Interface icons | ISC |
| Satoshi | Self-hosted, unmodified variable font from Fontshare | ITF Free Font License 2.0; full notice in `public/fonts/FFL.txt` |
| @fontsource/manrope | Retained package from the preceding build, no longer imported | SIL Open Font License 1.1; Manrope copyright The Manrope Project |

The app does not call a remote font, analytics, account, survey, or model service at runtime. Satoshi is hosted locally with a system sans-serif fallback. Full package notices remain available in the installed dependency tree for local distribution review.

The exact applicable upstream license texts are shipped with the static app at `public/THIRD-PARTY-NOTICES.txt` and therefore are also present in the built `output/site/` delivery.
