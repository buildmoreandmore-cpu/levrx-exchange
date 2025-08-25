export type DealKind = "HAVE" | "WANT";

export type PackageType =
  | "Property"
  | "Cash"
  | "Paper (Note/Mortgage/CFD)"
  | "Services (Construction/Management/Consulting)"
  | "Equity/Partner";

export type PropertyType =
  | "Single-Family"
  | "Small Multifamily (2–4 units)"
  | "Multifamily (5+ units)"
  | "Short-Term Rental"
  | "Office"
  | "Retail"
  | "Industrial/Flex"
  | "Hotel/Hospitality"
  | "Gas Station/Auto"
  | "Entitled Residential Land"
  | "Entitled Commercial Land"
  | "Raw Land"
  | "Mixed-Use"
  | "Self-Storage"
  | "Mobile Home/RV Park"
  | "Other";

export type SellerUrgency = "Low" | "Medium" | "High";

export type SellerReasons =
  | "1031 Exchange Timing"
  | "Tired Landlord / Management Burden"
  | "Equity Trapped"
  | "Negative Cashflow"
  | "Vacancy/Lease-up Risk"
  | "Estate/Retirement/Divorce"
  | "Partnership Dissolution"
  | "Relocation"
  | "CapEx/Property Condition";

export type BenefitsSought =
  | "Cash Out (Full)"
  | "Partial Cash + Partner"
  | "Debt Relief / Assume Debt"
  | "1031 / Tax Deferral"
  | "Management Relief"
  | "Development/Entitlement Partner"
  | "Creative Finance (Sub-to/Wrap/Lease Option)"
  | "Seller Carry / Note"
  | "Trade for Income Property"
  | "Trade for Land/Services/Equipment";

export type BenefitsToNewOwner =
  | "Below-Market Basis / Value-Add Upside"
  | "Stabilized Income"
  | "Assumable Financing"
  | "Zoning / Entitlement Potential"
  | "Development Density Opportunity"
  | "Strong Tenant / Lease Profile"
  | "Prime Location / Corridor";

export interface Listing {
  id: string;
  kind: DealKind;
  packageType: PackageType;
  propertyType: PropertyType;
  city: string;
  state: string;
  price?: number;
  noiAnnual?: number;
  currentDebt?: number;
  sellerUrgency?: SellerUrgency;
  sellerReasons?: SellerReasons[];
  benefitsSought: BenefitsSought[];
  benefitsToNewOwner: BenefitsToNewOwner[];
  notes?: string;
  createdAt: string;
}

export interface SuggestedStructure {
  name: string;
  how_it_works: string;
  key_terms: string[];
  risks: string[];
  next_steps: string[];
}

export interface Match {
  id: string;
  haveId: string;
  wantId: string;
  score: number; // 0..1
  rationaleBullets: string[];
  suggestedStructures: SuggestedStructure[];
  createdAt: string;
}

// Property Type Groups for UI
export const PROPERTY_TYPE_GROUPS = {
  Residential: [
    "Single-Family",
    "Small Multifamily (2–4 units)",
    "Multifamily (5+ units)",
    "Short-Term Rental"
  ] as PropertyType[],
  Commercial: [
    "Office",
    "Retail",
    "Industrial/Flex",
    "Hotel/Hospitality",
    "Gas Station/Auto"
  ] as PropertyType[],
  Land: [
    "Entitled Residential Land",
    "Entitled Commercial Land",
    "Raw Land"
  ] as PropertyType[],
  Specialty: [
    "Mixed-Use",
    "Self-Storage",
    "Mobile Home/RV Park",
    "Other"
  ] as PropertyType[]
};

// Option arrays for forms
export const PACKAGE_TYPE_OPTIONS: PackageType[] = [
  "Property",
  "Cash",
  "Paper (Note/Mortgage/CFD)",
  "Services (Construction/Management/Consulting)",
  "Equity/Partner"
];

export const SELLER_URGENCY_OPTIONS: SellerUrgency[] = ["Low", "Medium", "High"];

export const SELLER_REASONS_OPTIONS: SellerReasons[] = [
  "1031 Exchange Timing",
  "Tired Landlord / Management Burden",
  "Equity Trapped",
  "Negative Cashflow",
  "Vacancy/Lease-up Risk",
  "Estate/Retirement/Divorce",
  "Partnership Dissolution",
  "Relocation",
  "CapEx/Property Condition"
];

export const BENEFITS_SOUGHT_OPTIONS: BenefitsSought[] = [
  "Cash Out (Full)",
  "Partial Cash + Partner",
  "Debt Relief / Assume Debt",
  "1031 / Tax Deferral",
  "Management Relief",
  "Development/Entitlement Partner",
  "Creative Finance (Sub-to/Wrap/Lease Option)",
  "Seller Carry / Note",
  "Trade for Income Property",
  "Trade for Land/Services/Equipment"
];

export const BENEFITS_TO_NEW_OWNER_OPTIONS: BenefitsToNewOwner[] = [
  "Below-Market Basis / Value-Add Upside",
  "Stabilized Income",
  "Assumable Financing",
  "Zoning / Entitlement Potential",
  "Development Density Opportunity",
  "Strong Tenant / Lease Profile",
  "Prime Location / Corridor"
];