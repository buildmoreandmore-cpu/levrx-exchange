import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center py-32">
          {/* Live Marketplace Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-gray-100 px-4 py-2 border border-gray-200">
              <span className="text-sm font-medium text-gray-700">Live Marketplace</span>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Leverage what you have to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              get what you want
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed">
            A marketplace where assets and opportunities find each other, powered by AI.
          </p>

          {/* Sign-up Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
            {/* Google Button */}
            <button className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-3.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto">
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>

            {/* Apple Button */}
            <button className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-6 py-3.5 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto">
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>

            {/* Email Button */}
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-6 py-3.5 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              Email
              <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}