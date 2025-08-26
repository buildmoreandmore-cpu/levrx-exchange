"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20 py-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.04),transparent_70%)]" />
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Live Marketplace Badge */}
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/60 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Live Marketplace
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 mb-8 leading-[1.1]">
            Leverage what you have
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              to get what you want
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto max-w-3xl text-xl sm:text-2xl md:text-3xl text-gray-700 leading-relaxed mb-12 font-medium">
            A marketplace where real estate assets and opportunities find each other, powered by AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button className="group flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
            
            <button className="group flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.743-1.378l-.742 2.852c-.269 1.041-1.001 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
              Sign up with Apple
            </button>
          </div>
          
          <div className="mb-16">
            <Link
              href="/sign-up"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Continue with Email
            </Link>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative max-w-5xl mx-auto">
            <div className="group relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
              {/* Mockup Header */}
              <div className="flex items-center gap-2 px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <div className="flex-1 text-center">
                  <div className="w-48 h-6 bg-gray-200 rounded-full mx-auto" />
                </div>
              </div>
              
              {/* Mockup Content */}
              <div className="p-8 space-y-6">
                {/* Top Row - Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="w-16 h-4 bg-blue-200 rounded mb-3" />
                    <div className="w-24 h-8 bg-blue-300 rounded" />
                  </div>
                  <div className="bg-green-50 rounded-xl p-6">
                    <div className="w-20 h-4 bg-green-200 rounded mb-3" />
                    <div className="w-28 h-8 bg-green-300 rounded" />
                  </div>
                  <div className="bg-purple-50 rounded-xl p-6">
                    <div className="w-18 h-4 bg-purple-200 rounded mb-3" />
                    <div className="w-32 h-8 bg-purple-300 rounded" />
                  </div>
                </div>
                
                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Chart */}
                  <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <div className="w-32 h-5 bg-gray-300 rounded" />
                    <div className="h-40 bg-gradient-to-t from-gray-200 to-gray-100 rounded-lg relative overflow-hidden">
                      <div className="absolute bottom-0 left-4 w-8 h-20 bg-blue-300 rounded-t" />
                      <div className="absolute bottom-0 left-16 w-8 h-32 bg-blue-400 rounded-t" />
                      <div className="absolute bottom-0 left-28 w-8 h-24 bg-blue-300 rounded-t" />
                      <div className="absolute bottom-0 right-28 w-8 h-36 bg-green-400 rounded-t" />
                      <div className="absolute bottom-0 right-16 w-8 h-28 bg-green-300 rounded-t" />
                      <div className="absolute bottom-0 right-4 w-8 h-32 bg-green-400 rounded-t" />
                    </div>
                  </div>
                  
                  {/* Right Column - List */}
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <div className="w-32 h-4 bg-gray-300 rounded" />
                          <div className="w-48 h-3 bg-gray-200 rounded" />
                        </div>
                        <div className="w-16 h-6 bg-green-100 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex justify-center gap-8 text-sm text-slate-600 font-medium">
            <span>2,847 Active Listings</span>
            <span>+156 Today</span>
            <span>94% Match Success</span>
          </div>
        </div>
      </div>
    </section>
  );
}