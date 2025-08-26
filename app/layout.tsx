import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LevrX — Real Estate Exchange | AI-Powered Property Marketplace",
  description: "Leverage what you have to get what you want. Connect with real estate opportunities through AI-powered matching. Trade properties, find partnerships, and unlock deal flow. Start small, grow your leverage.",
  keywords: [
    "real estate exchange",
    "property marketplace",
    "real estate investment",
    "AI property matching", 
    "real estate partnerships",
    "property trading platform",
    "commercial real estate",
    "real estate deals",
    "property investment",
    "real estate networking",
    "1031 exchanges",
    "real estate leverage",
    "property opportunities"
  ],
  authors: [{ name: "LevrX Team" }],
  creator: "LevrX",
  publisher: "LevrX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://levrx-exchange.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LevrX — Real Estate Exchange | AI-Powered Property Marketplace",
    description: "Leverage what you have to get what you want. Connect with real estate opportunities through AI-powered matching. Start small, grow your leverage.",
    url: "https://levrx-exchange.vercel.app",
    siteName: "LevrX",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "LevrX - Real Estate Exchange Platform"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LevrX — Real Estate Exchange | AI-Powered Property Marketplace",
    description: "Leverage what you have to get what you want. AI-matched real estate opportunities.",
    images: ["/opengraph-image.png"],
    creator: "@levrx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
