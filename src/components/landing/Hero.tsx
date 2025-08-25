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
        <div className="flex flex-col items-center justify-center text-center min-h-[85vh] px-6">
          {/* Live Marketplace Badge */}
          <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-3 py-1 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-medium text-sm">Live Marketplace</span>
          </div>

          {/* Headline with fade-in animation */}
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 animate-fade-in">
            Leverage what you have{' '}
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              to get what you want
            </span>
          </h1>
          
          {/* Subheadline with fade-in animation */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in animation-delay-200">
            A marketplace where real estate assets and opportunities find each other, powered by AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link 
                href="/dashboard"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started
              </Link>
            </SignedIn>
            
            <Link 
              href="/demo"
              className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:bg-gray-50"
            >
              Explore Demo
            </Link>
          </div>

          {/* Hero Media */}
          <div className="max-w-5xl mx-auto mt-16">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
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