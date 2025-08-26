"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Status pill */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100/70 px-4 py-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-200">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              Live Marketplace
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Leverage what you have
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              to get what you want
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto max-w-4xl text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed mb-10">
            A marketplace where real estate assets and opportunities find each other, powered by AI.
          </p>

          {/* CTA */}
          <div className="flex justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}