import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const robotoMono = Roboto_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LevrX - The Leverage Exchange",
  description:
    "Leverage what you have to get what you want. A marketplace where assets and opportunities find each other, powered by AI.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.className} ${robotoMono.className}`}>
        <head>
          <style>{`
html {
  --font-sans: ${inter.style.fontFamily};
  --font-mono: ${robotoMono.style.fontFamily};
}
          `}</style>
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
