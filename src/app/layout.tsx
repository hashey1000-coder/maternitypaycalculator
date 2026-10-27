import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — Free UK SMP Calculator 2026/27`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "maternity pay calculator",
    "SMP calculator",
    "statutory maternity pay",
    "maternity leave calculator",
    "UK maternity pay",
    "maternity allowance",
    "maternity pay 2026",
    "how much maternity pay",
    "maternity pay calculator UK 2026",
    "maternity leave planner",
    "child benefit calculator",
    "maternity pay after tax",
    "maternity rights UK",
    "maternity pay self-employed",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  openGraph: {
    title: `${SITE_CONFIG.name} — Free UK SMP Calculator 2026/27`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — Free UK SMP Calculator 2026/27`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Lkz Ad Manager */}
        <link rel="preconnect" href="https://securepubads.g.doubleclick.net" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(d,b,c,s,u){c=d.querySelector('link[rel=canonical]');u=String(c&&c.href||location.href||'').split(/[?#]/)[0];s=d.createElement('script');s.async=1;s.src=b+'?u='+encodeURIComponent(u);(d.head||d.documentElement).appendChild(s)}(document,"https://yield.lkz.ai/s/1140.js")`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Maternity Pay Calculator",
              url: "https://maternitypaycalculator.co.uk/",
              description: SITE_CONFIG.description,
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Maternity Pay Calculator",
              url: "https://maternitypaycalculator.co.uk/",
              description: SITE_CONFIG.description,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://maternitypaycalculator.co.uk/guides?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
