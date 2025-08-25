export const PACKAGE_TYPES = [
  "Property",
  "Cash",
  "Paper (Note/Mortgage/CFD)",
  "Services (Construction/Management/Consulting)",
  "Equity/Partner",
] as const;

export const PROPERTY_TYPES = {
  Residential: [
    "Single-Family",
    "Small Multifamily (2–4 units)",
    "Multifamily (5+ units)",
    "Short-Term Rental",
  ],
  Commercial: [
    "Office",
    "Retail",
    "Industrial/Flex",
    "Hotel/Hospitality",
    "Gas Station/Auto",
  ],
  Land: [
    "Entitled Residential",
    "Entitled Commercial",
    "Raw Land",
  ],
  Specialty: [
    "Mixed-Use",
    "Self-Storage",
    "Mobile Home/RV Park",
    "Other",
  ],
} as const;

export const SELLER_URGENCY = ["Low", "Medium", "High"] as const;

export const SELLER_REASONS = [
  "1031 Exchange Timing",
  "Tired Landlord / Management Burden",
  "Equity Trapped",
  "Negative Cashflow",
  "Vacancy / Lease-up Risk",
  "Estate / Retirement / Divorce",
  "Partnership Dissolution",
  "Relocation",
  "CapEx / Property Condition",
] as const;

export const BENEFITS_SOUGHT = [
  "Cash Out (Full)",
  "Partial Cash + Partner",
  "Debt Relief / Assume Debt",
  "1031 / Tax Deferral",
  "Management Relief",
  "Development / Entitlement Partner",
  "Creative Finance (Sub-to/Wrap/Lease Option)",
  "Seller Carry / Note",
  "Trade for Income Property",
  "Trade for Land / Services / Equipment",
] as const;

export const BENEFITS_TO_NEW_OWNER = [
  "Below-Market Basis / Value-Add Upside",
  "Stabilized Income",
  "Assumable Financing",
  "Zoning / Entitlement Potential",
  "Development Density Opportunity",
  "Strong Tenant / Lease Profile",
  "Prime Location / Corridor",
] as const;

export const DEAL_STRUCTURES = [
  "For Sale",
  "For Rent/Lease",
  "1031 Exchange",
  "Subject-To",
  "Wrap",
  "Lease-Option",
  "Seller Carry (VTB)",
  "Joint Venture / Equity",
] as const;

export const CASH_SOURCES = [
  "Personal Cash",
  "IRA/Retirement Funds",
  "Other People's Money (Private Lenders)",
  "Fund/Entity",
] as const;

export const PAPER_TYPES = [
  "Performing Note",
  "Non-Performing Note",
  "Contract for Deed/CFD",
  "Other",
] as const;

export const PAYMENT_TYPES = [
  "Interest-Only",
  "Amortizing",
  "Balloon",
] as const;

export const ITEM_CONDITIONS = [
  "New",
  "Excellent",
  "Good",
  "Fair",
  "Needs Work",
] as const;

export const EXCHANGE_PREFERENCES = [
  "Sell",
  "Trade for Property",
  "Trade for Services",
  "Trade for Cash/Crypto",
] as const;

export const TIMELINES = [
  "ASAP",
  "30–60 days",
  "Flexible",
] as const;