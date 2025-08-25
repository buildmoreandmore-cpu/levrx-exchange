// src/components/dashboard/AIMatches.tsx
import { mockMatches } from "@/lib/mockMatches";
import { pct } from "@/lib/format";

export default function AIMatches() {
  return (
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">AI Matches</h3>
        <span className="text-sm text-gray-500">{mockMatches.length} suggestions</span>
      </div>
      <ul className="space-y-4">
        {mockMatches.map((m) => (
          <li key={m.id} className="rounded-xl border p-4 hover:shadow">
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-sm font-medium text-emerald-700">
                {pct(m.score)} Match
              </span>
              <span className="text-xs text-gray-400">#{m.id}</span>
            </div>
            <ul className="ml-4 list-disc space-y-1 text-sm text-gray-700">
              {m.rationaleBullets.slice(0, 3).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {m.suggestedStructures.slice(0, 2).map((s, i) => (
                <div key={i} className="rounded-lg border p-3">
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="mt-1 text-xs text-gray-600">{s.how_it_works}</div>
                  <div className="mt-2 flex gap-2">
                    <a className="text-xs font-medium text-blue-600 hover:underline" href="#">
                      View terms
                    </a>
                    <a className="text-xs font-medium text-blue-600 hover:underline" href="#">
                      Generate LOI
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}