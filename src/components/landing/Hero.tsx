import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-white overflow-hidden flex items-center justify-center">
      {/* Subtle bottom fade background */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-24 w-full">
        <div className="text-center">
          {/* Live Marketplace Badge */}
          <div className="mb-8 md:mb-12 flex justify-center w-full">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-indigo-50 border border-indigo-200/60 px-4 py-2.5 shadow-sm mx-auto">
              {/* Activity/Heartbeat Icon */}
              <svg className="h-4 w-4 text-blue-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l2-6 4 12 2-6h6" />
              </svg>
              <span className="text-sm font-semibold text-blue-700 whitespace-nowrap">Live Marketplace</span>
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] text-center max-w-5xl mx-auto px-2">
            Leverage what you have to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              get what you want
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-8 md:mb-12 max-w-3xl text-lg md:text-xl text-slate-500 leading-relaxed text-center">
            A marketplace where assets and opportunities find each other, powered by AI.
          </p>

          {/* CTA Row - Three Buttons */}
          <div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-4xl mx-auto">
              {/* Google Sign-up Button */}
              <button 
                className="inline-flex h-12 sm:h-14 w-full sm:w-auto items-center justify-center gap-2 sm:gap-3 rounded-lg bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Sign up with Google"
              >
                {/* Google Icon */}
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>

              {/* Apple Sign-up Button */}
              <button 
                className="inline-flex h-12 sm:h-14 w-full sm:w-auto items-center justify-center gap-2 sm:gap-3 rounded-lg border border-gray-200 bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-gray-900 shadow-md transition-all duration-200 hover:border-gray-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Sign up with Apple"
              >
                {/* Apple Icon */}
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Sign up with Apple
              </button>

              {/* Email Sign-up Button */}
              <Link 
                href="/sign-up"
                className="inline-flex h-12 sm:h-14 w-full sm:w-auto items-center justify-center gap-2 sm:gap-3 rounded-lg border border-gray-200 bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-gray-900 shadow-md transition-all duration-200 hover:border-gray-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Sign up with Email
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}