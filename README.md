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

## Getting started

```bash
npm install
npm run dev      # dev server at http://localhost:3000
```

Other scripts:

```bash
npm run build    # static production build → out/  (the only correctness gate)
npm start        # serve the production build
```

> There is no linter, test runner, or TypeScript config — `npm run build` is the
> only correctness gate.

## How it works

- **`pages/index.jsx`** holds the only app-wide state: the active `locale`
  (`'en'` | `'pt'`) in `useState`, passed down to `PortfolioPage`. It is **not**
  persisted — a refresh resets to English.
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

- `lib/locales.js` resolves dot-paths (e.g. `getMessage(locale, 'contact.title')`)
  against `locales/<locale>.json`, falling back to English, then to the raw path.
- `PortfolioPage` builds `t = (path) => getMessage(locale, path)` and passes it to
  every section as the `t` prop — sections never import the locale system directly.
- `locales/en.json` and `locales/pt.json` must keep **identical key structures**.
  To add a language: create `locales/<code>.json`, register it in `LOCALES`
  (`lib/locales.js`), and add an entry to `languages` in `PortfolioPage.jsx`.

### Local weather badge

The home avatar shows a small badge with the **visitor's local weather** (icon +
temperature). `lib/weather.js` uses two keyless, CORS-friendly public APIs with
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
real content, all six sections (Home, About, Skills, Projects, Work, Contact) +
footer, local-weather badge on the home avatar (Open-Meteo + wttr.in fallback),
static export & GitHub Pages deploy.

**Next:** persist the chosen language (localStorage), SEO `<Head>` / Open Graph,
accessibility pass, a working contact form, theme toggle, deck progress
indicator + hash deep-linking, and project thumbnails.

## Project structure

```
pages/            index.jsx (state) · _app.jsx (global CSS only)
components/       PortfolioPage.jsx + Section*.jsx + Footer.jsx + HomeWeatherBadge.jsx
lib/locales.js    getMessage() dot-path resolver
lib/weather.js    local-weather lookup (Open-Meteo primary + wttr.in fallback)
locales/          en.json · pt.json (identical key trees)
styles/           globals.css (whole design system)
public/           avatar.svg
.github/          deploy.yml — GitHub Pages deploy workflow
next.config.js    static export + basePath config
```

## Credits

Designed and built by Raffael de Castro Rodrigues, with development assistance
from [Claude AI](https://claude.ai) (Anthropic).
