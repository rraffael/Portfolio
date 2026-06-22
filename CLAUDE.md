# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server at http://localhost:3000
- `npm run build` — production build
- `npm start` — serve the production build

There is no linter, test runner, or TypeScript config in this project — `npm run build` is the only correctness gate.

## Architecture

A single-page portfolio built on Next.js (Pages Router) and React 18. There is exactly one route.

- `pages/index.jsx` owns the only piece of app-wide state: the active `locale` (`'en'` | `'pt'`), held in `useState` and passed down. It is **not** persisted (no localStorage, no Next.js i18n routing) — a refresh resets to `'en'`.
- `pages/_app.jsx` only imports `styles/globals.css`. All styling is global CSS; there are no CSS modules or styled-components.
- `components/PortfolioPage.jsx` is the real top-level component. It renders the fixed header (desktop nav + mobile hamburger + language switcher) and a single scroll container (`main.scroll-area`) holding all sections in fixed order: Home, About, Contact, Projects, Work, Footer.

### Sections and the `t` prop convention

Each section lives in `components/Section*.jsx` (plus `Footer.jsx`). `PortfolioPage` builds a translation function `t = (path) => getMessage(locale, path)` and passes it down as the `t` prop. Sections receive `t` and call `t('section.key')` — they do **not** import the locale system themselves. When adding a section, wire it into the `sections` array and the `sectionRefs.current[N]` list in `PortfolioPage.jsx`; scroll tracking depends on the ref index order.

### Scroll behavior

`PortfolioPage` tracks `activeSection` by comparing `scrollTop` against each section's `offsetTop` inside `handleScroll`. Nav clicks call `scrollToSection`, which uses `scrollIntoView` and sets an `isAutoScrolling` guard cleared after 550ms. Scroll-snapping is done in CSS (`styles/globals.css`).

### i18n

- `lib/locales.js` is the whole translation layer. `getMessage(locale, path)` resolves dot-paths (e.g. `'contact.title'`) against `locales/<locale>.json`, falling back to English, then to the raw path string if missing.
- `locales/en.json` and `locales/pt.json` must keep identical key structures. To add a language: add `locales/<code>.json`, register it in `LOCALES` in `lib/locales.js`, and add an entry to the `languages` array in `PortfolioPage.jsx`.

### Contact API call

`components/SectionContact.jsx` fetches `http://localhost:8000` on mount as a connectivity demo, rendering loading/error/success states. The URL is **hardcoded** — note that `.env.example` advertises `NEXT_PUBLIC_API_URL` but it is currently unused. To make the contact section configurable, switch the fetch to read `process.env.NEXT_PUBLIC_API_URL`.
