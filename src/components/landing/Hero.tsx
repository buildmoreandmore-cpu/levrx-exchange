"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32">
        {/* Status pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100/70 px-4 py-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-200">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
            Live Marketplace
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-8 text-center text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          Leverage what you have
          <br />
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            to get what you want
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-slate-600 sm:text-xl">
          A marketplace where real estate assets and opportunities find each other,
          powered by AI.
        </p>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}