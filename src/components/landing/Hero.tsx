import LiveBadge from "./LiveBadge";
import AuthButtons from "./AuthButtons";

// Constants for easy editing
const COPY = {
  headline: {
    line1: "Leverage what you have to",
    emphasis1: "get",
    line2: "what you want"
  },
  subheadline: "A marketplace where assets and opportunities find each other, powered by AI.",
  trustIndicators: [
    "2,847 Active Listings",
    "+156 Today", 
    "94% Match Success"
  ]
} as const;

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Subtle bottom fade background */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="text-center">
          {/* Live Badge */}
          <div className="mb-8 flex justify-center">
            <LiveBadge />
          </div>

          {/* Headline (2 lines) */}
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-[#0A1027] sm:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block leading-[1.15] sm:leading-[1.1] lg:leading-[1.05]">
              {COPY.headline.line1}{" "}
              <span className="text-blue-700">{COPY.headline.emphasis1}</span>
            </span>
            <span className="block leading-[1.15] sm:leading-[1.1] lg:leading-[1.05] text-blue-700">
              {COPY.headline.line2}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-12 max-w-[980px] text-base font-medium text-gray-500 sm:text-lg lg:text-xl xl:text-2xl">
            {COPY.subheadline}
          </p>

          {/* CTA Row (3 buttons) */}
          <div className="mb-16">
            <AuthButtons />
          </div>

          {/* Trust Strip */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-400 sm:gap-8">
            {COPY.trustIndicators.map((indicator, index) => (
              <span key={index}>{indicator}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}