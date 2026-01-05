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

export const metadata: Metadata = {
  title: "Productivity Calculator | Free Online Tool for Any Industry",
  description:
    "Calculate your productivity instantly with our free online calculator. Measure output vs input efficiency for construction, sales, writing, and 20+ industries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${barlow.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
