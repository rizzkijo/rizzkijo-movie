import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/assets/images/icon-192.png" />
        {/* iOS support */}
        <link rel="apple-touch-icon" href="/assets/images/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <body className="antialiased dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
