import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-20 items-center justify-between">
          {/* Left - Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900">LevrX</span>
          </Link>

          {/* Center - Empty */}
          <div></div>

          {/* Right - CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="hidden sm:inline-flex text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center px-5 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}