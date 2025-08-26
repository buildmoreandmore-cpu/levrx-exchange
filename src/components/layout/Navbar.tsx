"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar (optional) */}
      <div className="hidden sm:block bg-sky-50 text-sky-700 text-sm py-2 text-center">
        LevrX v1 is live — <Link href="/demo" className="underline">Explore the demo</Link>
      </div>

      <div
        className={[
          "transition-colors duration-300",
          scrolled
            ? "backdrop-blur-md bg-white/70 supports-[backdrop-filter]:bg-white/60"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="relative mx-auto max-w-7xl px-6">
          {/* gradient hairline */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <nav className="flex h-16 items-center justify-between">
            {/* Left */}
            <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600" />
              <span>LevrX</span>
            </Link>

            {/* Center */}
            <div className="hidden md:flex items-center gap-8 text-slate-700">
              <Link href="#how-it-works" className="hover:text-slate-900">How it works</Link>
              <Link href="#pricing" className="hover:text-slate-900">Pricing</Link>
              {/* Status pill */}
              <span className="hidden lg:inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/60 px-3.5 py-1.5 text-sm font-medium text-emerald-700 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" className="text-emerald-600" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12h3l2-6 4 12 2-6h6" />
                </svg>
                <span className="font-semibold">Live Marketplace</span>
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-sm" />
                </span>
              </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-white font-semibold shadow-sm hover:opacity-90"
              >
                Dashboard
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}