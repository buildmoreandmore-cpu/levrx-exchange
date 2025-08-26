export default function Hero() {
  return (
    <main className="flex flex-col items-center justify-center text-center py-24 px-4">
      {/* Badge */}
      <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-50 text-blue-600 rounded-full">
        <span className="h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
        Live Marketplace
      </span>

      {/* Headline */}
      <h1 className="mt-6 text-5xl font-extrabold leading-tight max-w-4xl">
        Leverage what you have to{" "}
        <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          get what you want
        </span>
      </h1>

      {/* Subtext */}
      <p className="mt-4 text-gray-500 max-w-2xl">
        A marketplace where assets and opportunities find each other, powered by AI.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 shadow">
          <span className="text-lg">G</span> Sign up with Google
        </button>
        <button className="flex items-center gap-2 border px-6 py-3 rounded-md hover:bg-gray-100">
          <span className="text-lg"></span> Sign up with Apple
        </button>
        <button className="flex items-center gap-2 border px-6 py-3 rounded-md hover:bg-gray-100">
          Continue with Email →
        </button>
      </div>
    </main>
  );
}