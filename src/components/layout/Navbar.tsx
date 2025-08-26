"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-8 py-4 sticky top-0 bg-white z-50 shadow-sm">
      <div className="text-2xl font-bold">LevrX</div>
      <nav className="flex items-center gap-6">
        <Link href="/sign-in" className="text-gray-700 hover:text-black">
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}