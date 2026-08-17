import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

// Static-export default document. `lang` starts at the export default ('en') to
// match the server-rendered HTML; pages/index.jsx and pages/pixel.jsx sync it to
// the active locale on the client so assistive tech announces the right
// language after a switch.
//
// `data-world` is baked into the exported HTML per route (via getInitialProps'
// ctx.pathname), not set client-side, so styles/pixel.css and styles/pro.css
// scope correctly from first paint with no flash of the wrong world's styles.
export default function Document({ world }) {
  return (
    <Html lang="en" data-world={world}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

Document.getInitialProps = async (ctx) => {
  const initialProps = await NextDocument.getInitialProps(ctx)
  const world = ctx.pathname === '/pixel' ? 'pixel' : 'pro'
  return { ...initialProps, world }
}
