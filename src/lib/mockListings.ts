import { Listing } from "@/types/exchange";

export const mockHaves: Listing[] = [
  {
    id: "have-1",
    kind: "HAVE",
    packageType: "Property",
    propertyType: "Multifamily (5+ units)",
    city: "Atlanta",
    state: "GA",
    price: 2200000,
    noiAnnual: 165000,
    currentDebt: 1200000,
    sellerUrgency: "High",
    sellerReasons: ["1031 Exchange Timing", "Tired Landlord / Management Burden"],
    benefitsSought: ["1031 / Tax Deferral", "Partial Cash + Partner"],
    benefitsToNewOwner: [
      "Below-Market Basis / Value-Add Upside",
      "Assumable Financing",
      "Strong Tenant / Lease Profile",
    ],
    notes: "20-unit building near Beltline. Seller wants to trade into larger property within 60 days.",
    createdAt: new Date().toISOString(),
  },
];

export const mockWants: Listing[] = [
  {
    id: "want-1",
    kind: "WANT",
    packageType: "Property",
    propertyType: "Single-Family",
    city: "Charlotte",
    state: "NC",
    price: 350000,
    noiAnnual: undefined,
    currentDebt: undefined,
    sellerUrgency: "Medium",
    sellerReasons: ["Equity Trapped"],
    benefitsSought: ["Creative Finance (Sub-to/Wrap/Lease Option)", "Debt Relief / Assume Debt"],
    benefitsToNewOwner: ["Stabilized Income", "Prime Location / Corridor"],
    notes: "Looking for turnkey SFR or duplex with assumable financing. Prefer sub-to opportunities.",
    createdAt: new Date().toISOString(),
  },
];

// Combined array for backwards compatibility
export const mockListings: Listing[] = [...mockHaves, ...mockWants];

// Function to get listings by kind
export const getListingsByKind = (kind: 'HAVE' | 'WANT'): Listing[] => {
  return kind === 'HAVE' ? mockHaves : mockWants;
}

// Function to add a new listing (for demo purposes - normally would save to database)
export const addListing = (newListing: Omit<Listing, 'id' | 'createdAt'>): Listing => {
  const listing: Listing = {
    ...newListing,
    id: `${newListing.kind.toLowerCase()}-${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  
  // In a real app, this would save to database
  // For demo, we add to the appropriate array
  if (listing.kind === 'HAVE') {
    mockHaves.push(listing)
  } else {
    mockWants.push(listing)
  }
  
  return listing
}