'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-24 text-center">
            {/* Live Marketplace Badge */}
            <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-medium text-sm">Live Marketplace</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Leverage what you have<br />
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                to get what you want
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              A marketplace where real estate assets and opportunities find each other, powered by AI.
            </p>

            {/* Hero Media */}
            <div className="max-w-5xl mx-auto mb-12">
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
        </div>
      </section>
    </>
  )
}