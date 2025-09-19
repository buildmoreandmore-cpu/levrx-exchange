// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock environment variables
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'test_clerk_publishable_key'
process.env.CLERK_SECRET_KEY = 'test_clerk_secret_key'
process.env.DATABASE_URL = 'postgresql://test'
process.env.SUPABASE_URL = 'https://test.supabase.co'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test_service_role_key'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test_anon_key'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    }
  },
  useParams() {
    return {}
  },
  usePathname() {
    return ''
  },
}))

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  useAuth: () => ({
    isSignedIn: true,
    userId: 'test-user-id',
    getToken: jest.fn(),
  }),
  useUser: () => ({
    user: {
      id: 'test-user-id',
      emailAddresses: [{ emailAddress: 'test@example.com' }],
    },
    isLoaded: true,
    isSignedIn: true,
  }),
  currentUser: jest.fn().mockResolvedValue({
    id: 'test-user-id',
    emailAddresses: [{ emailAddress: 'test@example.com' }],
  }),
  UserButton: () => null,
  SignInButton: ({ children }) => children,
  SignedIn: ({ children }) => children,
  SignedOut: ({ children }) => null,
}))