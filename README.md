# Portfolio Next.js Starter

This is a one-page portfolio starter built with Next.js and React. It uses a componentized structure and translation files under `locales/`.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app at `http://localhost:3000`

## Translations

This project uses `locales/en.json` and `locales/pt.json`.
Each translation file follows the same key structure so new languages can be added without missing values.

The translation helper falls back to English if a key is missing in the selected language.

## Menu and layout

- Static header with desktop navigation
- Mobile hamburger menu on smaller screens
- Language switcher with flag labels
- Scroll-snap sections for each page area
- The first section fills the viewport under the fixed header

## Sections

The page is split into these sections:

- Home
- About
- Contact
- Projects
- Work
- Footer

## Local API example

The contact section includes an example fetch from `http://localhost:8000`.
If you want to connect to your own API, start it on port 8000 or change the URL in `components/SectionContact.jsx`.

## Deployment

You can deploy this app to Vercel, Netlify, or any platform that supports Next.js.

### Architecture

- Website (React / Next.js)
- API (hosted online or locally for development)
- Database (behind the API)
