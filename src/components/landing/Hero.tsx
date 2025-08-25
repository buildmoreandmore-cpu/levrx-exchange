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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-lg">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto min-w-[220px]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Get Started Free</span>
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link 
                href="/dashboard"
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto min-w-[220px]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Go to Dashboard</span>
              </Link>
            </SignedIn>

            <Link 
              href="/demo"
              className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-6 py-4 rounded-lg font-medium transition-all duration-200 w-full sm:w-auto min-w-[160px] hover:shadow-sm"
            >
              <span>View Demo</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-4-8V3m0 3v3" />
              </svg>
            </Link>
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