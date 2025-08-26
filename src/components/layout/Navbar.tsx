import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Left - Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900">LevrX</span>
          </Link>

          {/* Center - Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              About
            </Link>
          </div>

          {/* Right - CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden sm:inline-flex text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-sm hover:shadow-md transition-all duration-200 text-sm"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}