/** @type {import('next').NextConfig} */

// Empty for local dev; set to "/Portfolio" by the GitHub Pages workflow so that
// assets resolve under https://rraffael.github.io/Portfolio/
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  output: 'export', // emit a static site into out/ on `next build`
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true, // directory-style URLs work better on static hosts
  images: {
    unoptimized: true // the Next.js image optimizer can't run on GitHub Pages
  }
}

module.exports = nextConfig
