# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server at http://localhost:3000
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- `npm run format` / `npm run format:check` — Prettier write / check
- `npm run typecheck` — `tsc --noEmit` over the TypeScript logic layer
- `npm test` — i18n key-parity check (`scripts/check-locales.mjs`)

Correctness gates: `npm run build`, `npm run lint`, `npm run typecheck` and `npm test`. Only the logic layer (`lib/*.ts`) is type-checked — components stay `.jsx` with `checkJs` off.

## Architecture

A single-page portfolio built on Next.js (Pages Router) and React 18. There is exactly one route.

- `pages/index.jsx` owns the only piece of app-wide state: the active `locale` (`'en'` | `'pt'`), held in `useState` and passed down. It initializes to `'en'` (to match the static-export HTML and avoid a hydration mismatch), then a mount-time `useEffect` restores the persisted choice from `localStorage` (`portfolio-locale`) or falls back to `navigator.languages` via `resolvePreferredLocale` in `lib/locales.ts`. Changing the language writes back to `localStorage`. There is no Next.js i18n routing.
- `pages/_app.jsx` only imports `styles/globals.css`. All styling is global CSS; there are no CSS modules or styled-components.
- `components/PortfolioPage.jsx` is the real top-level component. It renders the fixed header (desktop nav + mobile hamburger + language switcher) and a horizontal **deck** (`main.scroll-area`) holding all sections in fixed order: Home, About, Skills, Projects, Work, Contact — plus a fixed Footer. Each section is one full-viewport slide.
- The site is exported as a static build (`output: 'export'` in `next.config.js`) and deployed to GitHub Pages under `/Portfolio` via `NEXT_PUBLIC_BASE_PATH`. The Next.js image optimizer is disabled (`images.unoptimized`); asset paths that need the base path read `process.env.NEXT_PUBLIC_BASE_PATH` directly (e.g. the avatar in `SectionHome.jsx`).

### Sections and the `t` prop convention

Each section lives in `components/Section*.jsx` (plus `Footer.jsx`). `PortfolioPage` builds a translation function `t = (path) => getMessage(locale, path)` and passes it down as the `t` prop. Sections receive `t` and call `t('section.key')` — they do **not** import the locale system themselves. When adding a section, wire it into the `sections` array and the `sectionRefs.current[N]` list in `PortfolioPage.jsx`; deck tracking depends on the ref index order.

### Deck navigation

Navigation is a **horizontal deck**, not a vertical scroll-snap. `PortfolioPage` tracks `activeSection` in `handleScroll` by rounding `scrollLeft / clientWidth`. `goTo(index)` clamps the target and calls `container.scrollTo({ left, behavior: 'smooth' })`. Advancing happens via: the mouse wheel (one slide per gesture, with a 700ms lock; a slide's own overflowing content scrolls vertically first before the deck moves), the ← / → arrow keys, the on-screen ◄ / ► `deck-arrow` buttons, and the header / mobile menu items. Layout and per-slide styling live in CSS (`styles/globals.css`).

### i18n

- `lib/locales.ts` is the whole translation layer. `getMessage(locale, path)` resolves dot-paths (e.g. `'contact.title'`) against `locales/<locale>.json`, falling back to English, then to the raw path string if missing.
- `locales/en.json` and `locales/pt.json` must keep identical key structures (enforced by `npm test`). To add a language: add `locales/<code>.json`, register it in `LOCALES` in `lib/locales.ts`, and add an entry to the `languages` array in `PortfolioPage.jsx`.

### Contact

`components/SectionContact.jsx` renders static contact links — `mailto:`, LinkedIn and GitHub — read from the `contact` keys in the locale files. There is **no** live API call. `.env.example` advertises `NEXT_PUBLIC_API_URL`, but it is currently unused and reserved for a future contact form.
