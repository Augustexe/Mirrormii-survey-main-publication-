# Frontend dependency notices

The shipped app uses the following open source packages. Versions are locked in `package-lock.json`; this note keeps the delivery boundary visible without copying `node_modules` into the repository.

| Package | Use | License / notice |
| --- | --- | --- |
| React, ReactDOM, Scheduler | UI runtime | MIT; copyright Meta Platforms, Inc. and contributors |
| Vite, `@vitejs/plugin-react`, esbuild transitives | Local development and production bundling | MIT; respective project notices apply |
| Motion | Page and state transitions | MIT |
| lucide-react | Interface icons | ISC |
| @fontsource/manrope | Bundled Manrope fallback font files | SIL Open Font License 1.1; Manrope copyright The Manrope Project |

The app does not call a remote font, analytics, account, survey, or model service at runtime. Avenir Next/Avenir is used when installed on the host; it is not copied into this project. Full package notices remain available in the installed dependency tree for local distribution review.
