import type { Metadata } from "next";
import { Orbitron, Barlow } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const BASE_URL = "https://productivitycalculator.work";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Productivity Calculator 2026: Free Tool for 20+ Industries",
    template: "%s | Productivity Calculator",
  },
  description:
    "Calculate your productivity instantly with our free online calculator. Measure output vs input efficiency for construction, sales, writing, and 20+ industries.",
  keywords: [
    "productivity calculator",
    "efficiency calculator",
    "output input calculator",
    "work productivity",
    "labor productivity",
  ],
  authors: [{ name: "Productivity Calculator" }],
  creator: "Productivity Calculator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Productivity Calculator",
    title: "Productivity Calculator 2026: Free Tool for 20+ Industries",
    description:
      "Calculate your productivity instantly. Measure output vs input efficiency for construction, sales, writing, and 20+ industries.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Productivity Calculator - Free Online Tool for 20+ Industries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productivity Calculator 2026: Free Tool for 20+ Industries",
    description:
      "Calculate your productivity instantly. Measure output vs input efficiency for any industry.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// WebSite Schema for SEO
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Productivity Calculator",
  url: BASE_URL,
  description:
    "Free online productivity calculator for measuring output vs input efficiency across 20+ industries.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/calculator/{search_term_string}`,
    },
    "query-input": "required name=search_term_string",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${orbitron.variable} ${barlow.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
