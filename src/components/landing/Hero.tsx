'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'

interface HeroProps {
  hasVideo?: boolean
}

export default function Hero({ hasVideo = false }: HeroProps) {
  const [videoError, setVideoError] = useState(false)

  return (
    <>
      {hasVideo && (
        <Head>
          <link rel="preload" href="/hero.mp4" as="video" type="video/mp4" />
        </Head>
      )}
      
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="flex flex-col items-center justify-center text-center min-h-[75vh] px-6 py-16">
          
          {/* Logo & Branding */}
          <div className="mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">L</span>
              </div>
              <span className="ml-3 text-3xl font-bold text-gray-900">LevrX</span>
            </div>
            {/* Accent line under logo */}
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto"></div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-4 py-2 mb-8">
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent font-semibold text-sm">
              Live Marketplace
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight animate-fade-in">
            <span className="text-gray-900">Leverage what you have </span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              to get what you want
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10 animate-fade-in animation-delay-200">
            A marketplace where assets and opportunities find each other, powered by AI.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-2xl">
            <SignedOut>
              {/* Google Sign Up */}
              <SignInButton mode="modal">
                <button className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto min-w-[200px]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign up with Google</span>
                </button>
              </SignInButton>

              {/* Apple Sign Up */}
              <SignInButton mode="modal">
                <button className="flex items-center justify-center space-x-3 bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto min-w-[200px]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span>Sign up with Apple</span>
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link 
                href="/dashboard"
                className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto min-w-[200px]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Go to Dashboard</span>
              </Link>
            </SignedIn>
          </div>

          {/* Secondary CTA */}
          <div className="mt-6">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900 font-medium transition-colors group">
                  <span>Continue with Email</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link 
                href="/demo"
                className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900 font-medium transition-colors group"
              >
                <span>Explore Demo</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </SignedIn>
          </div>

          {/* Hero Media */}
          <div className="max-w-5xl mx-auto mt-16 w-full">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {hasVideo && !videoError ? (
                <>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/hero-dashboard.png"
                    className="w-full h-full object-cover"
                    onError={() => setVideoError(true)}
                    aria-label="LevrX dashboard demo video"
                  >
                    <source src="/hero.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <noscript>
                    <Image
                      src="/hero-dashboard.png"
                      alt="LevrX Dashboard Preview"
                      fill
                      className="object-contain"
                      priority
                    />
                  </noscript>
                </>
              ) : (
                <Image
                  src="/hero-dashboard.png"
                  alt="LevrX Dashboard Preview"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
          animation-fill-mode: both;
        }
      `}</style>
    </>
  )
}