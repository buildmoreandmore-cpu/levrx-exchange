"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm" 
        : "bg-white/80 backdrop-blur-sm"
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Left - Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-white font-bold text-base">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">LevrX</span>
          </Link>

          {/* Center - Navigation (Desktop Only) */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm relative group"
            >
              How it works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm relative group"
            >
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </button>
          </div>

          {/* Right - Dashboard Button */}
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-200 text-sm z-[9999] relative border-2 border-blue-700 hover:border-blue-400"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}