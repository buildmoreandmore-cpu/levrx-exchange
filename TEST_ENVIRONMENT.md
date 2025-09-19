# LVRXchange AI Matching Test Environment

## Test Configuration

### Production URL
- Live Site: https://levrx-exchange.vercel.app
- API Endpoints: https://levrx-exchange.vercel.app/api/*

### Test Accounts Setup

#### Account 1 - Primary HAVE Listing Owner
- Email: [Your primary Gmail]
- Role: Property owner with active listing
- Listing Type: HAVE
- Category: Property
- Status: Already has active listing

#### Account 2 - WANT Listing (Perfect Match)
- Email: [Gmail account #2]
- Role: Investor seeking property
- Listing Type: WANT
- Category: Property
- Match Strategy: Create listing with matching criteria to Account 1's HAVE

#### Account 3 - WANT Listing (Partial Match)
- Email: [Gmail account #3]
- Role: Investor with different requirements
- Listing Type: WANT
- Category: Property or Cash
- Match Strategy: Different geography or lower compatibility

#### Account 4 - Alternative HAVE Listing
- Email: [Gmail account #4]
- Role: Another property owner
- Listing Type: HAVE
- Category: Property or Paper
- Match Strategy: Test HAVE-to-HAVE scenarios

## Testing Checklist

### Phase 1: Account Setup
- [ ] Sign up Account 2 on production site
- [ ] Sign up Account 3 on production site
- [ ] Sign up Account 4 on production site
- [ ] Document user IDs for each account

### Phase 2: Listing Creation
- [ ] Account 1: Verify existing HAVE listing details
- [ ] Account 2: Create complementary WANT listing
- [ ] Account 3: Create partial match WANT listing
- [ ] Account 4: Create alternative HAVE listing

### Phase 3: Match Generation
- [ ] Trigger match from Account 1
- [ ] Trigger match from Account 2
- [ ] Trigger match from Account 3
- [ ] Trigger match from Account 4

### Phase 4: Results Verification
- [ ] Verify match scores (>0.6 threshold)
- [ ] Check AI-generated rationales
- [ ] Test messaging between matched accounts
- [ ] Verify agreement generation

## API Endpoints to Test

1. **Create Listing**: POST /api/listings
2. **Get Matches**: GET /api/match
3. **Generate Match**: POST /api/match
4. **Send Message**: POST /api/matches/[id]/message
5. **Generate Agreement**: POST /api/agreements

## Monitoring Points

- Anthropic API calls (check console logs)
- Database writes (new matches created)
- Match score calculations
- Error handling for edge cases

## Notes
- Update email addresses before testing
- Keep track of listing IDs for debugging
- Screenshot match results for documentation