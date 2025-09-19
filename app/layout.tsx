import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
})

export const metadata: Metadata = {
  title: "LVRXchange - The Leverage Exchange",
  description:
    "Leverage what you have to get what you want. A marketplace where assets and opportunities find each other, powered by AI.",
  generator: "v0.app",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    >
      <html lang="en" className={inter.className}>
        <head>
          <style dangerouslySetInnerHTML={{
            __html: `
html {
  font-family: ${inter.style.fontFamily}, system-ui, -apple-system, sans-serif;
}
* {
  font-family: inherit;
}
            `
          }} />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
