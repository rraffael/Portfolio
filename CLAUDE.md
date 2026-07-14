# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Code profile

<!-- claude-profile: Raffael (Projetos Pessoais) -->

Este projeto usa o perfil **Raffael (Projetos Pessoais)** (definido em `~/.claude/CLAUDE.md`). Ao abrir este projeto, use esse perfil diretamente — não pergunte qual perfil usar.

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
- `components/PortfolioPage.jsx` is the real top-level component. It renders the fixed header (desktop nav + mobile hamburger + language switcher) and a horizontal **deck** (`main.scroll-area`) holding all sections in fixed order: Home, About, Skills, Projects, Work, Contact — plus a fixed Footer. It also owns the **cookie-consent** state and renders the consent banner (see "Cookie consent" below).
- The site is exported as a static build (`output: 'export'` in `next.config.js`) and deployed to GitHub Pages under `/Portfolio` via `NEXT_PUBLIC_BASE_PATH`. The Next.js image optimizer is disabled (`images.unoptimized`); asset paths that need the base path read `process.env.NEXT_PUBLIC_BASE_PATH` directly (e.g. the avatar in `SectionHome.jsx`).

### Sections and the `t` prop convention

Each section lives in `components/Section*.jsx` (plus `Footer.jsx`). `PortfolioPage` builds a translation function `t = (path) => getMessage(locale, path)` and passes it down as the `t` prop. Sections receive `t` and call `t('section.key')` — they do **not** import the locale system themselves. When adding a section, wire it into the `sections` array and the `sectionRefs.current[N]` list in `PortfolioPage.jsx`; deck tracking depends on the ref index order.

### Deck navigation

Navigation is a **horizontal deck**, not a vertical scroll-snap. `PortfolioPage` tracks `activeSection` in `handleScroll` by rounding `scrollLeft / clientWidth`. `goTo(index)` clamps the target and calls `container.scrollTo({ left, behavior: 'smooth' })`. Advancing happens via: the mouse wheel (one slide per gesture, with a 700ms lock; a slide's own overflowing content scrolls vertically first before the deck moves), the ← / → arrow keys, the on-screen ◄ / ► `deck-arrow` buttons, and the header / mobile menu items. Layout and per-slide styling live in CSS (`styles/globals.css`).

### i18n

- `lib/locales.ts` is the whole translation layer. `getMessage(locale, path)` resolves dot-paths (e.g. `'contact.title'`) against `locales/<locale>.json`, falling back to English, then to the raw path string if missing.
- `locales/en.json` and `locales/pt.json` must keep identical key structures (enforced by `npm test`). To add a language: add `locales/<code>.json`, register it in `LOCALES` in `lib/locales.ts`, and add an entry to the `languages` array in `PortfolioPage.jsx`.

### Home weather scenes (day/night, animated)

The home avatar is a pixel-art **window** that reflects the visitor's live weather instead of a plain portrait.

- `components/SectionHome.jsx` calls `useWeather(enabled)` (`components/useWeather.js`), which fetches **once** and only when `enabled` is true. `enabled` is the visitor's weather cookie consent (see below), so with no consent it stays `'idle'` and the window falls back to `public/avatar.svg`.
- `lib/weather.ts` normalizes two keyless APIs to **7 conditions** plus an `isDay` flag: Open-Meteo returns `is_day`; the wttr.in backup and any fallback derive it from the visitor's local clock (`isDaytimeLocal`, 06:00–17:59 = day). `iconFor(condition, isDay)` picks the badge emoji (e.g. 🌙 for a clear night). Both `Weather.isDay` and the icon are set inside `lib/weather.ts`.
- The scene image is `` `${base}/window/${condition}${isDay ? '' : '-night'}.svg` `` — **14 hand-authored pixel SVGs** in `public/window/` (7 conditions × day/night). All share the same 96×64 skeleton (room, window frame, clipped sky region, mullions, sill); night variants darken the sky bands and swap sun→moon + add stars.
- The SVGs are **animated with inline CSS** (a `<style>` block per file) so motion plays inside `<img>` with no JS: clouds drift, stars twinkle, rain/snow fall, storm lightning flashes with a synced sky flash. Every file shares the same class vocabulary — `.drift`/`.drift-l` (cloud/fog drift), `.twinkle` (stars/sparkles), `.rain`, `.snow`, `.flash`/`.flash-sky` (lightning) — with per-element timing via the `--d` (duration) / `--b` (delay) CSS vars. Each file ends its `<style>` with `@media (prefers-reduced-motion: reduce) { … animation: none }`, which **freezes** the scene for visitors who ask for less motion (a media query inside an `<img>`-loaded SVG reflects the real OS setting; note DevTools emulation does **not** propagate into it, so test with the real setting). Lightning layers carry a base `opacity="0"` so the frozen state hides them. **Keep motion in whole pixels** (integer `translate` keyframe stops) so `shape-rendering="crispEdges"` stays crisp. When changing a condition, edit **both** the day and `-night` SVG and keep `CONDITIONS` in `lib/weather.ts` in sync.
- A dev-only mock picker in `SectionHome.jsx` (stripped from the production/export build via `process.env.NODE_ENV`) forces any condition and toggles a day/night preview.
- **Rolling shutter reveal:** the window is covered by a pure CSS/DOM exterior shutter ("estore") that is **closed by default** (including in the static HTML and before cookie consent). It's a `.home-shutter` overlay inside `.home-avatar-frame`, sized over the SVG glass region so the frame/sill stay visible on top. `SectionHome` sets `data-shutter="open"` only once there's a scene to show — `mockCondition`, `status === 'error'` (reveals the `avatar.svg` fallback), or `status === 'ready'` **and** the resolved scene has painted (`loadedSrc === windowSrc`, tracked via the `<img onLoad>`). The slats roll up (`translateY`) with a 0.9s transition on **open** only; closing is instant, and `prefers-reduced-motion` disables the roll. All shutter styling lives in `styles/globals.css` (`.home-window-inner` / `.home-shutter` / `.home-shutter-slats`).

### Cookie consent

- `lib/consent.ts` is the whole consent layer: `loadConsent()` / `saveConsent(weather)` persist a versioned record in `localStorage` (`portfolio-consent`). Two categories only: **necessary** (always on — the locale + consent storage) and **weather** (optional — the third-party weather/geolocation APIs `ipapi.co`, `open-meteo.com`, `wttr.in`).
- `PortfolioPage` reads consent on mount; if there is no prior decision it opens `<CookieConsent>` (`components/CookieConsent.jsx`), a subtle bottom-left banner with Accept all / Reject non-essential / Customize (per-category toggles + explanations). It passes `weatherConsent` down to `SectionHome`, so **the weather feature is strictly opt-in** — `useWeather` makes no network request until consent is granted. The Footer's "🍪 Cookies" button (`onManageCookies`) reopens the banner. All banner copy lives under the `cookies.*` i18n keys.

### Skills

`components/SectionSkills.jsx` renders `skills.groups` (an array of `{ title, items[] }`) as pixel badge cards. A group may also carry an optional `note` string — a small italic footnote rendered under that group's tags. It's currently used by the **AI & LLMs** group for its asterisked disclaimer (`* Used as an assistant tool…`). Keep the `groups` arrays structurally identical between `en.json`/`pt.json` (the parity test compares array shapes).

### Contact

`components/SectionContact.jsx` renders static contact links — `mailto:`, LinkedIn and GitHub — read from the `contact` keys in the locale files. There is **no** live API call. Because a bare `mailto:` does nothing when the visitor has no default mail client configured, clicking the email link/button also **copies the address to the clipboard** (`navigator.clipboard`) and shows a transient "copied" label (`contact.copied`); the `mailto:` navigation still fires for anyone who does have a client. `.env.example` advertises `NEXT_PUBLIC_API_URL`, but it is currently unused and reserved for a future contact form.

### Support ("Buy me a drink")

`components/Footer.jsx` renders a left-corner **"Buy me a drink 🍹"** button that toggles a small popover (`.tea-pop`, opens upward, dismissed by an invisible full-screen `.tea-pop-backdrop`). It offers a **Wise** payment link and a **random Pix key** (a click-to-copy `<button>`). Both values are constants at the top of `Footer.jsx` (`WISE_URL`, `PIX_KEY`) — deliberately **not** in the locale files, since they aren't translatable; only the popover's copy lives under the `support.*` i18n keys. The random Pix key exposes no personal data (no name/CPF/phone), so no new consent category is needed. The footer also keeps the "🍪 Cookies" reopen button.
