/**
 * Database Schema Tests for Photos Feature
 *
 * These tests validate that the database schema properly supports photo storage
 * for both Asset and Want models.
 */

import { PrismaClient } from '@prisma/client'
import { mockSupabaseModule } from '../../test/utils/mockSupabase'
import { mockImageUrls } from '../../test/fixtures/images'

// Mock Supabase before importing Prisma
jest.mock('@supabase/supabase-js', () => mockSupabaseModule)

const prisma = new PrismaClient()

describe('Database Schema - Photos Field', () => {
  beforeAll(async () => {
    // Ensure we're connected to test database
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('Asset Model Photos Field', () => {
    it('should allow creating asset with photos array', async () => {
      const testUser = await prisma.user.create({
        data: {
          id: 'test-user-photos-1',
          email: 'test1@example.com',
          name: 'Test User 1',
        },
      })

      const asset = await prisma.asset.create({
        data: {
          userId: testUser.id,
          type: 'EQUITY',
          title: 'Test Property with Photos',
          description: 'A property with multiple photos',
          photos: mockImageUrls,
        },
      })

      expect(asset.photos).toEqual(mockImageUrls)
      expect(Array.isArray(asset.photos)).toBe(true)
      expect(asset.photos).toHaveLength(3)

      // Cleanup
      await prisma.asset.delete({ where: { id: asset.id } })
      await prisma.user.delete({ where: { id: testUser.id } })
    })

    it('should allow creating asset without photos (null)', async () => {
      const testUser = await prisma.user.create({
        data: {
          id: 'test-user-photos-2',
          email: 'test2@example.com',
          name: 'Test User 2',
        },
      })

      const asset = await prisma.asset.create({
        data: {
          userId: testUser.id,
          type: 'EQUITY',
          title: 'Test Property without Photos',
          description: 'A property without photos',
          // photos field omitted, should be null
        },
      })

      expect(asset.photos).toBeNull()

      // Cleanup
      await prisma.asset.delete({ where: { id: asset.id } })
      await prisma.user.delete({ where: { id: testUser.id } })
    })

    it('should allow creating asset with empty photos array', async () => {
      const testUser = await prisma.user.create({
        data: {
          id: 'test-user-photos-3',
          email: 'test3@example.com',
          name: 'Test User 3',
        },
      })

      const asset = await prisma.asset.create({
        data: {
          userId: testUser.id,
          type: 'EQUITY',
          title: 'Test Property with Empty Photos',
          description: 'A property with empty photos array',
          photos: [],
        },
      })

      expect(asset.photos).toEqual([])
      expect(Array.isArray(asset.photos)).toBe(true)
      expect(asset.photos).toHaveLength(0)

      // Cleanup
      await prisma.asset.delete({ where: { id: asset.id } })
      await prisma.user.delete({ where: { id: testUser.id } })
    })

    it('should allow updating asset photos', async () => {
      const testUser = await prisma.user.create({
        data: {
          id: 'test-user-photos-4',
          email: 'test4@example.com',
          name: 'Test User 4',
        },
      })

      const asset = await prisma.asset.create({
        data: {
          userId: testUser.id,
          type: 'EQUITY',
          title: 'Test Property for Update',
          description: 'A property to test photo updates',
          photos: [mockImageUrls[0]],
        },
      })

      // Update photos
      const updatedAsset = await prisma.asset.update({
        where: { id: asset.id },
        data: {
          photos: mockImageUrls,
        },
      })

      expect(updatedAsset.photos).toEqual(mockImageUrls)
      expect(updatedAsset.photos).toHaveLength(3)

      // Cleanup
      await prisma.asset.delete({ where: { id: asset.id } })
      await prisma.user.delete({ where: { id: testUser.id } })
    })
  })

  describe('Want Model Photos Field', () => {
    it('should allow creating want with photos array', async () => {
      const testUser = await prisma.user.create({
        data: {
          id: 'test-user-want-photos-1',
          email: 'testwant1@example.com',
          name: 'Test Want User 1',
        },
      })

      const want = await prisma.want.create({
        data: {
          userId: testUser.id,
          category: 'BUYER',
          title: 'Looking for Property with Photos',
          description: 'Want to see photos of the property',
          photos: mockImageUrls.slice(0, 2), // First 2 photos
        },
      })

      expect(want.photos).toEqual(mockImageUrls.slice(0, 2))
      expect(Array.isArray(want.photos)).toBe(true)
      expect(want.photos).toHaveLength(2)

      // Cleanup
      await prisma.want.delete({ where: { id: want.id } })
      await prisma.user.delete({ where: { id: testUser.id } })
    })

    it('should allow creating want without photos', async () => {
      const testUser = await prisma.user.create({
        data: {
          id: 'test-user-want-photos-2',
          email: 'testwant2@example.com',
          name: 'Test Want User 2',
        },
      })

      const want = await prisma.want.create({
        data: {
          userId: testUser.id,
          category: 'CASH',
          title: 'Looking for Investment',
          description: 'No photos needed for cash investment',
          // photos field omitted
        },
      })

      expect(want.photos).toBeNull()

      // Cleanup
      await prisma.want.delete({ where: { id: want.id } })
      await prisma.user.delete({ where: { id: testUser.id } })
    })
  })

  describe('Photos Field Validation', () => {
    it('should store photos as JSON array', async () => {
      const testUser = await prisma.user.create({
        data: {
          id: 'test-user-validation',
          email: 'testvalidation@example.com',
          name: 'Test Validation User',
        },
      })

      const asset = await prisma.asset.create({
        data: {
          userId: testUser.id,
          type: 'EQUITY',
          title: 'JSON Validation Test',
          description: 'Testing JSON storage',
          photos: mockImageUrls,
        },
      })

      // Fetch raw data to verify JSON storage
      const rawAsset = await prisma.$queryRaw`
        SELECT photos FROM assets WHERE id = ${asset.id}
      ` as any[]

      expect(rawAsset[0].photos).toBeDefined()

      // When retrieved through Prisma, should be parsed as array
      const retrievedAsset = await prisma.asset.findUnique({
        where: { id: asset.id }
      })

      expect(Array.isArray(retrievedAsset?.photos)).toBe(true)
      expect(retrievedAsset?.photos).toEqual(mockImageUrls)

      // Cleanup
      await prisma.asset.delete({ where: { id: asset.id } })
      await prisma.user.delete({ where: { id: testUser.id } })
    })
  })
})