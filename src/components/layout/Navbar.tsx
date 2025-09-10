"use client";
import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { user, isSignedIn } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            LVRXchange
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link 
            href="/listings" 
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm lg:text-base"
          >
            Browse Listings
          </Link>
          <Link 
            href="/pricing" 
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm lg:text-base"
          >
            Pricing
          </Link>
          
          {!isSignedIn ? (
            // Not logged in
            <>
              <Link 
                href="/sign-in" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm lg:text-base"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors text-sm lg:text-base"
              >
                Get Started
              </Link>
            </>
          ) : (
            // Logged in
            <>
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm lg:text-base"
              >
                Dashboard
              </Link>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={user.fullName || 'Profile'}
                      className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                      {getInitials(user?.fullName)}
                    </div>
                  )}
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Account Settings
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <SignOutButton>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Sign Out
                      </button>
                    </SignOutButton>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Mobile Profile Avatar (if signed in) */}
          {isSignedIn && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || 'Profile'}
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {getInitials(user?.fullName)}
                  </div>
                )}
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Account Settings
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <SignOutButton>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              )}
            </div>
          )}
          
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link 
              href="/listings" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Listings
            </Link>
            <Link 
              href="/pricing" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            
            {!isSignedIn ? (
              <>
                <Link 
                  href="/sign-in" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center mt-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Link 
                href="/dashboard" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}