import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BRAND } from "../constants/brand";
import { DEFAULT_SEO, getOrganizationJsonLd } from "../constants/seo";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ServicesTicker } from "../components/layout/ServicesTicker";
import { AlwaysOnContact } from "../components/contact/AlwaysOnContact";
import { VisitorTracker } from "../components/telemetry/VisitorTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_SEO.url),
  alternates: {
    canonical: "/",
  },
  title: {
    default: DEFAULT_SEO.title,
    template: DEFAULT_SEO.titleTemplate,
  },
  description: DEFAULT_SEO.description,
  keywords: [
    "Aviation Access",
    "Private Jet Charter",
    "Helicopter Charter Romania",
    "Baneasa Executive Flight",
    "Bucharest Private Aviation",
    "Transylvania Helipad",
    "Turboprop Charter",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  openGraph: {
    type: "website",
    locale: DEFAULT_SEO.locale,
    url: DEFAULT_SEO.url,
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    siteName: DEFAULT_SEO.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#090a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getOrganizationJsonLd();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] flex flex-col font-sans">
        {/* WCAG 2.2 AA Accessibility Skip to Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-bg-primary)] text-xs font-data font-semibold uppercase focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Operations Services Ticker (Persistent Aviation Status Strip) */}
        <ServicesTicker />

        <Header />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <AlwaysOnContact />
        <VisitorTracker />
      </body>
    </html>
  );
}
