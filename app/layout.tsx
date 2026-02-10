
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// PREMIUM SEO METADATA
export const metadata: Metadata = {
  title: {
    template: '%s | ComplianceVault',
    default: 'ComplianceVault - #1 EU AI Act Audit Tool',
  },
  description: "Automated AI Governance & Compliance Platform. Audit your models against EU AI Act, ISO 42001 and GDPR in seconds. Trusted by Enterprise.",
  keywords: ["AI Governance", "EU AI Act Compliance", "AI Audit Tool", "GDPR AI", "High Risk AI Assessment"],
  authors: [{ name: 'ComplianceVault Inc' }],
  creator: 'ComplianceVault',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://compliance-vault.com',
    siteName: 'ComplianceVault',
    title: 'Secure your AI before Regulation Hits',
    description: 'Free Instant AI Compliance Audit powered by Gemini 2.0.',
    images: [
      {
        url: 'https://compliance-vault.com/og-image.jpg', // Placeholder for viral image
        width: 1200,
        height: 630,
        alt: 'AI Compliance Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Compliance Audit - Instant & Free',
    description: 'Check your AI risk level now.',
    creator: '@compliancevault',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}