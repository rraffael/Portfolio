# Portfolio — Raffael de Castro Rodrigues

A single-page **pixel-art** developer portfolio built with **Next.js (Pages
Router) + React 18**, deployed as a static site to **GitHub Pages**. Bilingual
(English / Portuguese), one route, all styling in a single global stylesheet.

🔗 Live: https://rraffael.github.io/Portfolio/

## Tech stack

- **Next.js 16** (`output: 'export'` — static HTML export, no server)
- **React 18**
- Plain global CSS (`styles/globals.css`) — no CSS modules / styled-components
- Fonts: `Press Start 2P`, `VT323`, `Inter` (Google Fonts)
- Tooling: ESLint (flat config) + Prettier, TypeScript on the logic layer
  (`lib/*.ts`), and a dependency-free i18n parity test

## Getting started

```bash
npm install
npm run dev      # dev server at http://localhost:3000
```

Other scripts:

```bash
npm run build        # static production build → out/
npm start            # serve the production build
npm run lint         # ESLint (flat config, eslint-config-next)
npm run format       # Prettier --write
npm run format:check # Prettier --check
npm run typecheck    # tsc --noEmit over the TypeScript logic layer
npm test             # i18n key-parity check (en/pt locale trees)
```

> Correctness gates: `npm run build`, `npm run lint`, `npm run typecheck` and
> `npm test`. The app is mostly `.jsx`; only the logic layer (`lib/*.ts`) is
> type-checked (`checkJs` is off), and styling is one global stylesheet.

## How it works

- **`pages/index.jsx`** holds the only app-wide state: the active `locale`
  (`'en'` | `'pt'`) in `useState`, passed down to `PortfolioPage`. It starts at
  English to match the static HTML, then after mount restores the persisted
  choice from `localStorage` (`portfolio-locale`) or, failing that, falls back to
  the browser's preferred language (`navigator.languages`). Switching languages
  persists the choice.
- **`components/PortfolioPage.jsx`** is the real top-level component. It renders
  the fixed header (desktop nav + mobile hamburger + language switcher) and a
  horizontal **deck**: each section is one full-viewport slide inside
  `main.scroll-area`.
- **Navigation** is horizontal, not a vertical scroll-snap:
  - mouse wheel → one slide per gesture (700 ms lock); a slide's own content can
    still scroll vertically before the deck advances,
  - keyboard arrows (← / →),
  - on-screen ◄ / ► arrow buttons,
  - header / mobile menu items.
- **Sections**, in order: **Home → About → Skills → Projects → Work → Contact**,
  plus a fixed **Footer**. Each lives in `components/Section*.jsx` (+ `Footer.jsx`).

### Translations (i18n)

- `lib/locales.ts` resolves dot-paths (e.g. `getMessage(locale, 'contact.title')`)
  against `locales/<locale>.json`, falling back to English, then to the raw path.
- `PortfolioPage` builds `t = (path) => getMessage(locale, path)` and passes it to
  every section as the `t` prop — sections never import the locale system directly.
- `locales/en.json` and `locales/pt.json` must keep **identical key structures**
  (enforced by `npm test`). To add a language: create `locales/<code>.json`,
  register it in `LOCALES` (`lib/locales.ts`), and add an entry to `languages` in
  `PortfolioPage.jsx`.

### Local weather badge

The home avatar shows a small badge with the **visitor's local weather** (icon +
temperature). `lib/weather.ts` uses two keyless, CORS-friendly public APIs with
automatic fallback:

1. **Primary** — `ipapi.co` (IP → lat/lon/city) + **Open-Meteo** (coords → weather),
2. **Backup** — `wttr.in` (IP → city + weather in a single call), tried only if the
   primary chain throws or times out (`AbortController`).

Both APIs' numeric codes (WMO and WWO) are normalized to **7 conditions** —
☀️ clear, ⛅ partly cloudy, ☁️ cloudy, 🌫️ fog, 🌧️ rain, ❄️ snow, ⛈️ storm — each
with an `home.weather.*` translation. `components/HomeWeatherBadge.jsx` fetches on
mount, shows a ⏳ loading state, and **hides itself** if both APIs fail.

### Contact

`components/SectionContact.jsx` renders real links — `mailto:`, LinkedIn and
GitHub — pulled from the `contact` keys in the locale files. (There is no live
API call.) `.env.example` advertises `NEXT_PUBLIC_API_URL`, which is currently
unused and reserved for a future contact form.

## Deployment

`next build` exports a static site to `out/`. The GitHub Pages workflow builds
with `NEXT_PUBLIC_BASE_PATH=/Portfolio` so assets resolve under the project URL.
Static export means the Next.js image optimizer is disabled
(`images.unoptimized`).

## Roadmap (short)

Full checklist in [`ROADMAP.md`](./ROADMAP.md).

**Done:** pixel-art design system, horizontal deck navigation, EN/PT i18n with
real content (persisted language), all six sections (Home, About, Skills,
Projects, Work, Contact) + footer, local-weather badge on the home avatar
(Open-Meteo + wttr.in fallback), SEO `<head>` / Open Graph + favicon, tooling
(ESLint, Prettier, TypeScript, i18n test), static export & GitHub Pages deploy.

**Next:** accessibility pass, a working contact form, theme toggle, deck progress
indicator + hash deep-linking, and project thumbnails.

## Project structure

```
pages/            index.jsx (locale state) · _app.jsx (global CSS + SEO <head>)
components/       PortfolioPage.jsx + Section*.jsx + Footer.jsx + HomeWeatherBadge.jsx
lib/locales.ts    getMessage() dot-path resolver + locale helpers
lib/weather.ts    local-weather lookup (Open-Meteo primary + wttr.in fallback)
locales/          en.json · pt.json (identical key trees)
scripts/          check-locales.mjs (i18n parity test, `npm test`)
styles/           globals.css (whole design system)
public/           avatar.svg · favicon.svg
.github/          deploy.yml — GitHub Pages deploy workflow
eslint.config.mjs ESLint flat config · .prettierrc.json · tsconfig.json
next.config.js    static export + basePath config
```

## Credits

Designed and built by Raffael de Castro Rodrigues, with development assistance
from [Claude AI](https://claude.ai) (Anthropic).
