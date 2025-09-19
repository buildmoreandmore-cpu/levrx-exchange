/**
 * API Upload Endpoint Tests
 *
 * These tests validate the photo upload API endpoint functionality
 * including authentication, file validation, and upload handling.
 */

import { NextRequest } from 'next/server'
import { POST } from '../route'
import { mockSupabaseModule } from '../../../../test/utils/mockSupabase'
import { validImageFiles, invalidFiles } from '../../../../test/fixtures/images'

// Mock Supabase
jest.mock('@supabase/supabase-js', () => mockSupabaseModule)

// Mock Clerk
jest.mock('@clerk/nextjs/server', () => ({
  currentUser: jest.fn(),
}))

const { currentUser } = require('@clerk/nextjs/server')

describe('POST /api/upload', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Authentication', () => {
    it('should reject unauthenticated requests with 401', async () => {
      currentUser.mockResolvedValue(null)

      const formData = new FormData()
      formData.append('file', validImageFiles.jpeg)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should accept authenticated requests', async () => {
      currentUser.mockResolvedValue({
        id: 'test-user-id',
        emailAddresses: [{ emailAddress: 'test@example.com' }],
      })

      const formData = new FormData()
      formData.append('file', validImageFiles.jpeg)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)

      // Should not be 401
      expect(response.status).not.toBe(401)
    })
  })

  describe('File Validation', () => {
    beforeEach(() => {
      currentUser.mockResolvedValue({
        id: 'test-user-id',
        emailAddresses: [{ emailAddress: 'test@example.com' }],
      })
    })

    it('should accept valid JPEG files', async () => {
      const formData = new FormData()
      formData.append('file', validImageFiles.jpeg)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })

    it('should accept valid PNG files', async () => {
      const formData = new FormData()
      formData.append('file', validImageFiles.png)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })

    it('should accept valid WebP files', async () => {
      const formData = new FormData()
      formData.append('file', validImageFiles.webp)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })

    it('should reject PDF files with 400', async () => {
      const formData = new FormData()
      formData.append('file', invalidFiles.pdf)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Invalid file type')
    })

    it('should reject text files with 400', async () => {
      const formData = new FormData()
      formData.append('file', invalidFiles.txt)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Invalid file type')
    })

    it('should reject executable files with 400', async () => {
      const formData = new FormData()
      formData.append('file', invalidFiles.exe)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Invalid file type')
    })

    it('should reject files over 5MB with 400', async () => {
      const formData = new FormData()
      formData.append('file', invalidFiles.oversized)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('File too large')
    })

    it('should handle missing file with 400', async () => {
      const formData = new FormData()
      // No file appended

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('No file uploaded')
    })
  })

  describe('Upload Processing', () => {
    beforeEach(() => {
      currentUser.mockResolvedValue({
        id: 'test-user-id',
        emailAddresses: [{ emailAddress: 'test@example.com' }],
      })
    })

    it('should return public URL after successful upload', async () => {
      const formData = new FormData()
      formData.append('file', validImageFiles.jpeg)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.url).toBeDefined()
      expect(data.url).toContain('https://test.supabase.co/storage/v1/object/public/listing-photos/')
      expect(data.success).toBe(true)
    })

    it('should generate unique filenames to prevent collisions', async () => {
      const formData1 = new FormData()
      formData1.append('file', validImageFiles.jpeg)

      const formData2 = new FormData()
      formData2.append('file', validImageFiles.jpeg)

      const request1 = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData1,
      })

      const request2 = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData2,
      })

      const response1 = await POST(request1)
      const response2 = await POST(request2)

      const data1 = await response1.json()
      const data2 = await response2.json()

      expect(data1.url).not.toBe(data2.url)
      expect(data1.url).toContain('test.jpg')
      expect(data2.url).toContain('test.jpg')
    })

    it('should include timestamp in filename', async () => {
      const formData = new FormData()
      formData.append('file', validImageFiles.jpeg)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      // Should contain timestamp pattern (numbers)
      expect(data.url).toMatch(/\d+.*\.jpg/)
    })
  })

  describe('Multiple File Upload', () => {
    beforeEach(() => {
      currentUser.mockResolvedValue({
        id: 'test-user-id',
        emailAddresses: [{ emailAddress: 'test@example.com' }],
      })
    })

    it('should handle multiple files in single request', async () => {
      const formData = new FormData()
      formData.append('files', validImageFiles.jpeg)
      formData.append('files', validImageFiles.png)
      formData.append('files', validImageFiles.webp)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.urls).toBeDefined()
      expect(Array.isArray(data.urls)).toBe(true)
      expect(data.urls).toHaveLength(3)
      expect(data.success).toBe(true)
    })

    it('should validate all files in multi-upload', async () => {
      const formData = new FormData()
      formData.append('files', validImageFiles.jpeg)
      formData.append('files', invalidFiles.pdf) // Invalid file
      formData.append('files', validImageFiles.png)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Invalid file type')
    })
  })

  describe('Error Handling', () => {
    beforeEach(() => {
      currentUser.mockResolvedValue({
        id: 'test-user-id',
        emailAddresses: [{ emailAddress: 'test@example.com' }],
      })
    })

    it('should handle Supabase upload errors gracefully', async () => {
      // Mock Supabase to return error
      const mockSupabaseStorage = require('../../../../test/utils/mockSupabase').mockSupabaseStorage
      mockSupabaseStorage.upload.mockResolvedValueOnce({
        data: null,
        error: { message: 'Storage error' },
      })

      const formData = new FormData()
      formData.append('file', validImageFiles.jpeg)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toContain('Upload failed')
    })

    it('should handle network errors gracefully', async () => {
      // Mock Supabase to throw error
      const mockSupabaseStorage = require('../../../../test/utils/mockSupabase').mockSupabaseStorage
      mockSupabaseStorage.upload.mockRejectedValueOnce(new Error('Network error'))

      const formData = new FormData()
      formData.append('file', validImageFiles.jpeg)

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBeDefined()
    })
  })

  describe('Rate Limiting', () => {
    beforeEach(() => {
      currentUser.mockResolvedValue({
        id: 'test-user-id',
        emailAddresses: [{ emailAddress: 'test@example.com' }],
      })
    })

    it('should handle concurrent upload requests', async () => {
      const promises = Array.from({ length: 5 }, (_, i) => {
        const formData = new FormData()
        formData.append('file', validImageFiles.jpeg)

        const request = new NextRequest('http://localhost:3000/api/upload', {
          method: 'POST',
          body: formData,
        })

        return POST(request)
      })

      const responses = await Promise.all(promises)

      // All should succeed (rate limiting implementation would be in middleware)
      responses.forEach(response => {
        expect(response.status).toBe(200)
      })
    })
  })
})