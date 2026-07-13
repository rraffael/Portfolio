import { Html, Head, Main, NextScript } from 'next/document'

// Static-export default document. `lang` starts at the export default ('en') to
// match the server-rendered HTML; pages/index.jsx syncs it to the active locale
// on the client so assistive tech announces the right language after a switch.
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
