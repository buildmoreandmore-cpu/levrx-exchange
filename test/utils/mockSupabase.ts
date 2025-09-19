import { jest } from '@jest/globals'

export const mockSupabaseStorage = {
  upload: jest.fn().mockResolvedValue({
    data: { path: 'test/path/image.jpg' },
    error: null,
  } as any),
  getPublicUrl: jest.fn().mockReturnValue({
    data: { publicUrl: 'https://test.supabase.co/storage/v1/object/public/listing-photos/test-image.jpg' },
  }),
  remove: jest.fn().mockResolvedValue({
    data: [],
    error: null,
  }),
  list: jest.fn().mockResolvedValue({
    data: [],
    error: null,
  }),
}

export const mockSupabaseClient = {
  storage: {
    from: jest.fn().mockReturnValue(mockSupabaseStorage),
  },
  auth: {
    getUser: jest.fn().mockResolvedValue({
      data: { user: { id: 'test-user-id' } },
      error: null,
    }),
  },
}

export const createMockSupabaseClient = () => mockSupabaseClient

// Mock for the Supabase module
export const mockSupabaseModule = {
  createClient: jest.fn().mockReturnValue(mockSupabaseClient),
}