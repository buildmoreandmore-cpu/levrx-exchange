/**
 * Listing API Integration Tests for Photos
 *
 * These tests validate that the listing API properly handles photo URLs
 * when creating and retrieving listings.
 */

import { NextRequest } from 'next/server'
import { POST, GET } from '../route'
import { mockSupabaseModule } from '../../../../test/utils/mockSupabase'
import { mockImageUrls } from '../../../../test/fixtures/images'

// Mock Supabase
jest.mock('@supabase/supabase-js', () => mockSupabaseModule)

// Mock Prisma
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  asset: {
    create: jest.fn(),
  },
  want: {
    create: jest.fn(),
  },
  listing: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
}

jest.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}))

// Mock Clerk
jest.mock('@clerk/nextjs/server', () => ({
  currentUser: jest.fn(),
}))

const { currentUser } = require('@clerk/nextjs/server')

describe('POST /api/listings - Photos Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    currentUser.mockResolvedValue({
      id: 'test-user-id',
      emailAddresses: [{ emailAddress: 'test@example.com' }],
    })

    mockPrisma.user.findUnique.mockResolvedValue({
      id: 'test-user-id',
      email: 'test@example.com',
    })
  })

  describe('Creating Listings with Photos', () => {
    it('should accept photos array in HAVE listing request', async () => {
      const mockAsset = {
        id: 'asset-id',
        userId: 'test-user-id',
        type: 'EQUITY',
        title: 'Property with Photos',
        description: 'A beautiful property',
        photos: mockImageUrls,
      }

      const mockListing = {
        id: 'listing-id',
        userId: 'test-user-id',
        mode: 'HAVE',
        assetId: 'asset-id',
        status: 'ACTIVE',
      }

      mockPrisma.asset.create.mockResolvedValue(mockAsset)
      mockPrisma.listing.create.mockResolvedValue(mockListing)

      const requestBody = {
        kind: 'HAVE',
        category: 'Property',
        title: 'Property with Photos',
        description: 'A beautiful property',
        packageType: 'Single Family',
        propertyType: 'Residential',
        city: 'San Francisco',
        state: 'CA',
        price: 1000000,
        photos: mockImageUrls,
      }

      const request = new NextRequest('http://localhost:3000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)

      // Verify photos were passed to asset creation
      expect(mockPrisma.asset.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            photos: mockImageUrls,
          }),
        })
      )
    })

    it('should accept photos array in WANT listing request', async () => {
      const mockWant = {
        id: 'want-id',
        userId: 'test-user-id',
        category: 'BUYER',
        title: 'Looking for Property',
        description: 'Want to see photos',
        photos: mockImageUrls.slice(0, 2),
      }

      const mockListing = {
        id: 'listing-id',
        userId: 'test-user-id',
        mode: 'WANT',
        wantId: 'want-id',
        status: 'ACTIVE',
      }

      mockPrisma.want.create.mockResolvedValue(mockWant)
      mockPrisma.listing.create.mockResolvedValue(mockListing)

      const requestBody = {
        kind: 'WANT',
        category: 'Property',
        title: 'Looking for Property',
        description: 'Want to see photos',
        packageType: 'Multifamily',
        propertyType: 'Commercial',
        city: 'Los Angeles',
        state: 'CA',
        photos: mockImageUrls.slice(0, 2),
      }

      const request = new NextRequest('http://localhost:3000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)

      // Verify photos were passed to want creation
      expect(mockPrisma.want.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            photos: mockImageUrls.slice(0, 2),
          }),
        })
      )
    })

    it('should handle listings without photos', async () => {
      const mockAsset = {
        id: 'asset-id',
        userId: 'test-user-id',
        type: 'EQUITY',
        title: 'Property without Photos',
        description: 'No photos provided',
        photos: null,
      }

      const mockListing = {
        id: 'listing-id',
        userId: 'test-user-id',
        mode: 'HAVE',
        assetId: 'asset-id',
        status: 'ACTIVE',
      }

      mockPrisma.asset.create.mockResolvedValue(mockAsset)
      mockPrisma.listing.create.mockResolvedValue(mockListing)

      const requestBody = {
        kind: 'HAVE',
        category: 'Property',
        title: 'Property without Photos',
        description: 'No photos provided',
        packageType: 'Single Family',
        propertyType: 'Residential',
        city: 'San Francisco',
        state: 'CA',
        price: 1000000,
        // photos field omitted
      }

      const request = new NextRequest('http://localhost:3000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })

    it('should handle empty photos array', async () => {
      const mockAsset = {
        id: 'asset-id',
        userId: 'test-user-id',
        type: 'EQUITY',
        title: 'Property with Empty Photos',
        description: 'Empty photos array',
        photos: [],
      }

      const mockListing = {
        id: 'listing-id',
        userId: 'test-user-id',
        mode: 'HAVE',
        assetId: 'asset-id',
        status: 'ACTIVE',
      }

      mockPrisma.asset.create.mockResolvedValue(mockAsset)
      mockPrisma.listing.create.mockResolvedValue(mockListing)

      const requestBody = {
        kind: 'HAVE',
        category: 'Property',
        title: 'Property with Empty Photos',
        description: 'Empty photos array',
        packageType: 'Single Family',
        propertyType: 'Residential',
        city: 'San Francisco',
        state: 'CA',
        price: 1000000,
        photos: [],
      }

      const request = new NextRequest('http://localhost:3000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(mockPrisma.asset.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            photos: [],
          }),
        })
      )
    })
  })

  describe('Photo URL Validation', () => {
    beforeEach(() => {
      mockPrisma.asset.create.mockResolvedValue({
        id: 'asset-id',
        userId: 'test-user-id',
        type: 'EQUITY',
        title: 'Test Property',
        description: 'Test description',
      })

      mockPrisma.listing.create.mockResolvedValue({
        id: 'listing-id',
        userId: 'test-user-id',
        mode: 'HAVE',
        assetId: 'asset-id',
        status: 'ACTIVE',
      })
    })

    it('should validate photo URLs are properly formatted', async () => {
      const requestBody = {
        kind: 'HAVE',
        category: 'Property',
        title: 'Test Property',
        description: 'Test description',
        packageType: 'Single Family',
        propertyType: 'Residential',
        city: 'San Francisco',
        state: 'CA',
        price: 1000000,
        photos: mockImageUrls,
      }

      const request = new NextRequest('http://localhost:3000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })

    it('should reject invalid photo URLs', async () => {
      const invalidUrls = ['not-a-url', 'http://invalid', '']

      const requestBody = {
        kind: 'HAVE',
        category: 'Property',
        title: 'Test Property',
        description: 'Test description',
        packageType: 'Single Family',
        propertyType: 'Residential',
        city: 'San Francisco',
        state: 'CA',
        price: 1000000,
        photos: invalidUrls,
      }

      const request = new NextRequest('http://localhost:3000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.message).toContain('Invalid photo URL')
    })

    it('should limit number of photos per listing', async () => {
      const tooManyPhotos = Array(15).fill(mockImageUrls[0])

      const requestBody = {
        kind: 'HAVE',
        category: 'Property',
        title: 'Test Property',
        description: 'Test description',
        packageType: 'Single Family',
        propertyType: 'Residential',
        city: 'San Francisco',
        state: 'CA',
        price: 1000000,
        photos: tooManyPhotos,
      }

      const request = new NextRequest('http://localhost:3000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.message).toContain('maximum of 10 photos')
    })
  })
})

describe('GET /api/listings - Photos Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return photos array with listing data', async () => {
    const mockListings = [
      {
        id: 'listing-1',
        mode: 'HAVE',
        status: 'ACTIVE',
        createdAt: new Date(),
        user: { name: 'Test User' },
        asset: {
          id: 'asset-1',
          title: 'Property with Photos',
          description: 'Beautiful property',
          type: 'EQUITY',
          photos: mockImageUrls,
        },
        want: null,
      },
      {
        id: 'listing-2',
        mode: 'WANT',
        status: 'ACTIVE',
        createdAt: new Date(),
        user: { name: 'Test User 2' },
        asset: null,
        want: {
          id: 'want-1',
          title: 'Looking for Property',
          description: 'Want photos included',
          category: 'BUYER',
          photos: mockImageUrls.slice(0, 2),
        },
      },
    ]

    mockPrisma.listing.findMany.mockResolvedValue(mockListings)

    const request = new NextRequest('http://localhost:3000/api/listings')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveLength(2)

    // Check HAVE listing has photos
    expect(data[0].asset.photos).toEqual(mockImageUrls)

    // Check WANT listing has photos
    expect(data[1].want.photos).toEqual(mockImageUrls.slice(0, 2))
  })

  it('should handle listings without photos gracefully', async () => {
    const mockListings = [
      {
        id: 'listing-1',
        mode: 'HAVE',
        status: 'ACTIVE',
        createdAt: new Date(),
        user: { name: 'Test User' },
        asset: {
          id: 'asset-1',
          title: 'Property without Photos',
          description: 'No photos',
          type: 'EQUITY',
          photos: null,
        },
        want: null,
      },
    ]

    mockPrisma.listing.findMany.mockResolvedValue(mockListings)

    const request = new NextRequest('http://localhost:3000/api/listings')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveLength(1)
    expect(data[0].asset.photos).toBeNull()
  })
})