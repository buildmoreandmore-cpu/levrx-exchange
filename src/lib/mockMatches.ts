import { Match } from "@/types/exchange";

export const mockMatches: Match[] = [
  {
    id: "match-1",
    haveId: "have-1", // <-- from mockHaves
    wantId: "want-1", // <-- from mockWants
    score: 0.92,
    rationaleBullets: [
      "Seller seeks 1031/tax deferral; buyer comfortable with creative finance.",
      "Assumable debt on HAVE aligns with buyer's 'assume debt / sub-to' preference.",
      "Buyer target market within 4hr radius; Atlanta ↔ Charlotte corridor is viable.",
      "Multifamily income + value-add upside matches buyer's 'prime location / stabilized income' goal.",
    ],
    suggestedStructures: [
      {
        name: "Assumption + Equity Rollover (1031-Friendly)",
        how_it_works:
          "Buyer assumes existing loan; pays partial cash to seller; seller rolls equity into TIC or DST interest to defer taxes.",
        key_terms: [
          "Loan assumption subject to lender approval",
          "Equity rollover via TIC/DST within 180-day 1031 window",
          "60/40 net cashflow split until promote threshold",
          "Buyer funds CapEx plan; seller retains minority interest",
        ],
        risks: [
          "Lender may deny assumption; timing risk for 1031",
          "Equity rollover docs/structure complexity",
        ],
        next_steps: [
          "Request loan assumption package and estoppel",
          "Draft LOI outlining rollover % and cash to close",
          "Open escrow and start 1031 identification clock",
        ],
      },
      {
        name: "Wrap Note with Performance Kicker",
        how_it_works:
          "Seller carries a wrap note over existing debt; buyer pays down note and shares upside if NOI hits targets.",
        key_terms: [
          "Down payment 10–15%",
          "Interest-only wrap for 24 months, then amortize",
          "Kicker: +1% interest or profit share if NOI > pro-forma",
          "Buyer covers taxes/insurance/maintenance",
        ],
        risks: [
          "Due-on-sale/acceleration risk if lender objects",
          "Execution risk on NOI improvement",
        ],
        next_steps: [
          "Exchange rent roll, T-12, CapEx plan",
          "Draft wrap/assignability language with counsel",
          "Set KPI reporting cadence and inspection rights",
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
];