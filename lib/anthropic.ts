import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export function buildMatchRationalePrompt(haveSummary: string, wantSummary: string, constraints?: any): string {
  return `Analyze this potential business match and provide a rationale in 3-5 bullet points explaining why this could be a good fit:

HAVE: ${haveSummary}
WANT: ${wantSummary}
${constraints ? `CONSTRAINTS: ${JSON.stringify(constraints)}` : ''}

Focus on:
- Complementary value exchange
- Strategic alignment
- Risk mitigation factors
- Market opportunity

Respond with concise bullet points only.`
}

export function buildDealStructuresPrompt(have: any, want: any): string {
  return `Given this potential business match, suggest 2 different deal structures:

HAVE: ${JSON.stringify(have)}
WANT: ${JSON.stringify(want)}

For each structure, provide:
1. Structure name (e.g., "Joint Venture", "Lease-to-Own", "Revenue Share")
2. How it works (2-3 sentences)
3. Key terms (3-5 bullet points)
4. Risk factors (2-3 key risks)
5. Next steps (2-3 immediate actions)

Format as JSON with structure: { "structures": [{ "name": "", "howItWorks": "", "keyTerms": [], "risks": [], "nextSteps": [] }] }`
}

export function buildAgreementDraftPrompt(structureChoice: any, parties: any, keyTerms: any): string {
  return `Create a Letter of Intent (LOI) template in Markdown format for this business arrangement:

STRUCTURE: ${JSON.stringify(structureChoice)}
PARTIES: ${JSON.stringify(parties)}
KEY TERMS: ${JSON.stringify(keyTerms)}

Include these sections:
1. Header with title and parties
2. Transaction overview
3. Key terms and conditions
4. Due diligence requirements
5. Timeline and milestones
6. Exclusivity period (if applicable)
7. Contingencies and conditions
8. Next steps
9. Legal disclaimer

Use placeholder format like [PARTY_A_NAME], [AMOUNT], [DATE] for terms to be filled in.
Include a clear disclaimer that this is not legal advice.`
}