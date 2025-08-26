export default function LiveBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        {/* Heartbeat/Activity Icon */}
        <svg 
          className="h-4 w-4 text-blue-700" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3 12h3l2-6 4 12 2-6h6" 
          />
        </svg>
        <span className="text-sm font-medium text-blue-700">Live Marketplace</span>
      </div>
      <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
    </div>
  );
}