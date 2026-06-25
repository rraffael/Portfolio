import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

// Flat-config ESLint setup for Next 16 (the legacy `next lint` command is gone).
// eslint-config-next ships a flat-config array, so we spread it and add our own
// global ignores plus a couple of project-specific rule tweaks.
const config = [
  ...nextCoreWebVitals,
  {
    ignores: ['out/**', '.next/**', 'node_modules/**', 'next-env.d.ts']
  },
  {
    rules: {
      // The site is a static export with the image optimizer disabled
      // (next.config.js → images.unoptimized), so plain <img> is intentional.
      '@next/next/no-img-element': 'off'
    }
  }
]

export default config
